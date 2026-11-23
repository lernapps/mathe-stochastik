<script setup lang="ts">
// Die Zufallsmaschine: ein Gerät werfen, die Ergebnisse zählen und zusehen, wie sich die relative Häufigkeit eines
// Ergebnisses einpendelt. Keine Aufgabe: nichts wird gezählt oder gespeichert. Zufall nur nach einem Klick.
import { computed, ref } from "vue";
import {
  beobachtetIndex,
  GERAETE,
  type Geraet,
  komma,
  linie,
  MAX_WUERFE,
  neuerStand,
  relativ,
  verlaufText,
  wahrscheinlichkeit,
  werfen,
} from "./ZufallMaschine.ts";

const props = defineProps<{
  /** Das Gerät: wuerfel, muenze, gluecksrad, reisszwecke oder legostein. */
  geraet: "wuerfel" | "muenze" | "gluecksrad" | "reisszwecke" | "legostein";
  /** Der Name des Ergebnisses, dessen relative Häufigkeit die Linie zeigt. */
  beobachte: string;
  /** Ob die gestrichelte Linie der berechneten Wahrscheinlichkeit gezeigt wird (nur wo man sie berechnen kann). */
  zeigeWert?: boolean;
}>();

const geraet = props.geraet as Geraet;
const beschreibung = GERAETE[geraet];
const index = beobachtetIndex(geraet, props.beobachte);
const stand = ref(neuerStand(geraet));
const schritte = [1, 10, 100, 1000];
const breite = 300;
const hoehe = 120;

const wert = computed(() => (props.zeigeWert ? wahrscheinlichkeit(geraet, index) : undefined));
const wertY = computed(() => (wert.value ? hoehe - (wert.value.z / wert.value.n) * hoehe : undefined));
const punkte = computed(() => linie(stand.value.verlauf, breite, hoehe));
const satz = computed(() => verlaufText(stand.value, props.beobachte));
const voll = computed(() => stand.value.n >= MAX_WUERFE);
const alt = computed(
  () =>
    `Linie der relativen Häufigkeit von ${beschreibung.ergebnisse[index]!.name}. ${satz.value}` +
    (wert.value ? ` Gestrichelt: der berechnete Wert ${wert.value.z} von ${wert.value.n}.` : ""),
);

function wirf(anzahl: number) {
  stand.value = werfen(stand.value, anzahl, props.beobachte, Math.random);
}
function zuruecksetzen() {
  stand.value = neuerStand(geraet);
}
</script>

<template>
  <div class="maschine">
    <p class="maschine-geraet">
      Gerät: <strong>{{ beschreibung.name }}</strong
      >. Beobachtet wird: <strong>{{ beschreibung.ergebnisse[index]!.name }}</strong
      >.
    </p>
    <div class="maschine-knoepfe">
      <button v-for="k in schritte" :key="k" type="button" :disabled="voll" @click="wirf(k)">
        {{ k === 1 ? "1 Wurf" : `${k} Würfe` }}
      </button>
      <button type="button" class="maschine-zurueck" @click="zuruecksetzen">Zurücksetzen</button>
    </div>
    <table class="maschine-tabelle">
      <caption>
        Häufigkeiten nach
        {{
          stand.n
        }}
        {{
          stand.n === 1 ? "Wurf" : "Würfen"
        }}
      </caption>
      <thead>
        <tr>
          <th scope="col">Ergebnis</th>
          <th scope="col">absolute Häufigkeit</th>
          <th scope="col">relative Häufigkeit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(e, i) in beschreibung.ergebnisse" :key="e.name" :class="{ beobachtet: i === index }">
          <th scope="row">{{ e.name }}</th>
          <td>{{ stand.zaehler[i] }}</td>
          <td>{{ stand.n === 0 ? "–" : komma(relativ(stand, i)) }}</td>
        </tr>
      </tbody>
    </table>
    <svg class="maschine-bild" :viewBox="`-2 -2 ${breite + 4} ${hoehe + 4}`" role="img" :aria-label="alt">
      <rect x="0" y="0" :width="breite" :height="hoehe" class="maschine-rahmen" />
      <line v-if="wertY !== undefined" x1="0" x2="300" :y1="wertY" :y2="wertY" class="maschine-wert" />
      <polyline v-if="punkte" :points="punkte" class="maschine-linie" />
    </svg>
    <p class="maschine-satz" aria-live="polite">
      {{ satz }}
      <span v-if="voll"> Mehr als {{ MAX_WUERFE }} Würfe sind nicht möglich: setze zurück.</span>
    </p>
  </div>
</template>

<style scoped>
.maschine {
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
}

.maschine-knoepfe {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.maschine-knoepfe button {
  min-height: 44px;
  padding: 0 1rem;
  border: 1px solid var(--page-accent);
  border-radius: 0.3rem;
  background: var(--page-accent);
  color: var(--page-on-accent);
  font: inherit;
  cursor: pointer;
}

.maschine-knoepfe button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.maschine-knoepfe .maschine-zurueck {
  background: transparent;
  color: var(--page-text);
  border-color: var(--page-border);
}

.maschine-tabelle {
  border-collapse: collapse;
  margin: 0.5rem 0;
}

.maschine-tabelle caption {
  text-align: left;
  color: var(--page-muted);
}

.maschine-tabelle th,
.maschine-tabelle td {
  border: 1px solid var(--page-border);
  padding: 0.25rem 0.6rem;
  text-align: left;
}

.maschine-tabelle .beobachtet th::after {
  content: " ◄";
}

.maschine-bild {
  display: block;
  width: 100%;
  max-width: 24rem;
  height: auto;
}

.maschine-rahmen {
  fill: none;
  stroke: var(--page-border);
}

.maschine-wert {
  stroke: var(--page-muted);
  stroke-dasharray: 6 4;
}

.maschine-linie {
  fill: none;
  stroke: var(--page-accent);
  stroke-width: 2;
}

.maschine-satz {
  min-height: 1.5rem;
  margin: 0.5rem 0 0;
}
</style>
