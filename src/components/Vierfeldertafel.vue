<script setup lang="ts">
// Die Vierfeldertafel und derselbe Inhalt als Baum, mit A oder mit B zuerst. Keine Aufgabe: nichts wird gezählt oder
// gespeichert. Ein Klick auf eine Zelle sagt in einem Satz, was sie bedeutet.
import { computed, ref } from "vue";
import { baum, istGueltig, komma, type Reihenfolge, summen, type Zelle, zellenSatz } from "./Vierfeldertafel.ts";

const props = defineProps<{
  /** Die vier Merkmale als Wort: A, nicht A, B, nicht B (zum Beispiel krank, gesund, positiv, negativ). */
  a: string;
  na: string;
  b: string;
  nb: string;
  /** Die Häufigkeiten: A und B, A und nicht B, nicht A und B, nicht A und nicht B. */
  ab: number;
  anb: number;
  nab: number;
  nanb: number;
  /** Die Kürzel im Baum für A, nicht A, B, nicht B (ein bis zwei Zeichen); ohne Angabe der erste Buchstabe des Worts. */
  ka?: string;
  kna?: string;
  kb?: string;
  knb?: string;
}>();

const tafel = computed(() => ({ ab: props.ab, anb: props.anb, nab: props.nab, nanb: props.nanb }));
const gueltig = computed(() => istGueltig(tafel.value));
const s = computed(() => summen(tafel.value));
const zuerst = ref<Reihenfolge>("A");
const gewaehlt = ref<Zelle | null>(null);
const namen = computed(() => ({ a: props.a, na: props.na, b: props.b, nb: props.nb }));
const satz = computed(() =>
  gewaehlt.value && gueltig.value ? zellenSatz(tafel.value, gewaehlt.value, namen.value) : "",
);
const kuerzel = (w: string) => {
  const eigene: Record<string, string | undefined> = {
    [props.a]: props.ka,
    [props.na]: props.kna,
    [props.b]: props.kb,
    [props.nb]: props.knb,
  };
  return eigene[w] ?? w.charAt(0).toUpperCase();
};

const bd = computed(() => baum(tafel.value, zuerst.value));
const pfade = computed(() =>
  [0, 1, 2, 3].map((i) => {
    const e = bd.value.stufe1[Math.floor(i / 2)]!;
    const z = bd.value.stufe2[i]!;
    return komma((e.z / e.n) * (z.n === 0 ? 0 : z.z / z.n));
  }),
);
const oben = computed(() => (zuerst.value === "A" ? [props.a, props.na] : [props.b, props.nb]));
const unten = computed(() => (zuerst.value === "A" ? [props.b, props.nb] : [props.a, props.na]));
const knotenX = [80, 240];
const blattX = [40, 120, 200, 280];

const alt = computed(
  () =>
    `Baum mit zwei Stufen. Erste Stufe: ${oben.value[0]} und ${oben.value[1]}. Zweite Stufe: ${unten.value[0]} und ${unten.value[1]}. ` +
    `Die Zahlen an den Zweigen stehen auch in der Tafel.`,
);

const blattIndex = computed(() => {
  if (!gewaehlt.value) return -1;
  const a: Record<Zelle, number> = { ab: 0, anb: 1, nab: 2, nanb: 3 };
  const b: Record<Zelle, number> = { ab: 0, nab: 1, anb: 2, nanb: 3 };
  return (zuerst.value === "A" ? a : b)[gewaehlt.value];
});
const kopf = computed(() => [props.b, props.nb, "Summe"]);
const zeilen = computed(() => [
  { name: props.a, zellen: [props.ab, props.anb] as number[], summe: s.value.a, ids: ["ab", "anb"] as Zelle[] },
  { name: props.na, zellen: [props.nab, props.nanb] as number[], summe: s.value.na, ids: ["nab", "nanb"] as Zelle[] },
]);
</script>

<template>
  <div v-if="gueltig" class="tafel">
    <table class="tafel-tabelle">
      <caption>
        Vierfeldertafel: Zeilen
        {{
          a
        }}
        und
        {{
          na
        }}, Spalten
        {{
          props.b
        }}
        und
        {{
          nb
        }}
      </caption>
      <thead>
        <tr>
          <td></td>
          <th v-for="k in kopf" :key="k" scope="col">{{ k }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="z in zeilen" :key="z.name">
          <th scope="row">{{ z.name }}</th>
          <td v-for="(n, i) in z.zellen" :key="i">
            <button
              type="button"
              class="tafel-zelle"
              :class="{ gewaehlt: gewaehlt === z.ids[i] }"
              :aria-pressed="gewaehlt === z.ids[i]"
              @click="gewaehlt = gewaehlt === z.ids[i] ? null : z.ids[i]!"
            >
              {{ n }}
            </button>
          </td>
          <td class="summe">{{ z.summe }}</td>
        </tr>
        <tr class="summe">
          <th scope="row">Summe</th>
          <td>{{ s.b }}</td>
          <td>{{ s.nb }}</td>
          <td>{{ s.alle }}</td>
        </tr>
      </tbody>
    </table>
    <p class="tafel-satz" aria-live="polite">{{ satz || "Tippe auf eine Zelle der Tafel." }}</p>
    <fieldset class="tafel-wahl">
      <legend>Baum lesen mit</legend>
      <label><input v-model="zuerst" type="radio" value="A" /> {{ a }} zuerst</label>
      <label><input v-model="zuerst" type="radio" value="B" /> {{ props.b }} zuerst</label>
    </fieldset>
    <svg class="tafel-baum" viewBox="0 0 320 210" role="img" :aria-label="alt">
      <g class="kante">
        <line x1="160" y1="22" :x2="knotenX[0]" y2="88" />
        <line x1="160" y1="22" :x2="knotenX[1]" y2="88" />
        <line v-for="i in 4" :key="i" :x1="knotenX[Math.floor((i - 1) / 2)]" y1="104" :x2="blattX[i - 1]" y2="170" />
      </g>
      <g
        v-for="(z, i) in bd.stufe1"
        :key="'z1' + i"
        :transform="`translate(${(160 + knotenX[i]!) / 2}, 55)`"
        class="bruch"
      >
        <rect x="-16" y="-17" width="32" height="34" class="hinter" />
        <text y="-4" text-anchor="middle">{{ z.z }}</text>
        <line x1="-11" x2="11" y1="1" y2="1" />
        <text y="13" text-anchor="middle">{{ z.n }}</text>
      </g>
      <g
        v-for="(z, i) in bd.stufe2"
        :key="'z2' + i"
        :transform="`translate(${(knotenX[Math.floor(i / 2)]! + blattX[i]!) / 2}, 137)`"
        class="bruch"
      >
        <rect x="-16" y="-17" width="32" height="34" class="hinter" />
        <text y="-4" text-anchor="middle">{{ z.z }}</text>
        <line x1="-11" x2="11" y1="1" y2="1" />
        <text y="13" text-anchor="middle">{{ z.n }}</text>
      </g>
      <g class="knoten">
        <circle cx="160" cy="16" r="9" />
        <g v-for="(x, i) in knotenX" :key="'k' + i">
          <circle :cx="x" cy="96" r="12" />
          <text :x="x" y="100" text-anchor="middle">{{ kuerzel(oben[i]!) }}</text>
        </g>
        <g v-for="(x, i) in blattX" :key="'b' + i">
          <circle :cx="x" cy="178" r="12" :class="{ hervor: blattIndex === i }" />
          <text :x="x" y="182" text-anchor="middle">{{ kuerzel(unten[i % 2]!) }}</text>
        </g>
      </g>
      <g class="pfad">
        <text
          v-for="(x, i) in blattX"
          :key="'p' + i"
          :x="x"
          y="204"
          text-anchor="middle"
          :class="{ hervor: blattIndex === i }"
        >
          {{ pfade[i] }}
        </text>
      </g>
    </svg>
    <p class="tafel-legende">
      Buchstaben im Baum: {{ kuerzel(a) }} = {{ a }}, {{ kuerzel(na) }} = {{ na }}, {{ kuerzel(props.b) }} =
      {{ props.b }}, {{ kuerzel(nb) }} = {{ nb }}. Die Zahl unter jedem Blatt ist der Anteil an allen {{ s.alle }}.
    </p>
  </div>
</template>

<style scoped>
.tafel {
  box-sizing: border-box;
  max-width: 100%;
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  border: 1px solid var(--page-border);
  border-radius: 0.4rem;
}

.tafel-tabelle {
  border-collapse: collapse;
  margin: 0.5rem 0;
}

.tafel-tabelle caption {
  text-align: left;
  color: var(--page-muted);
}

.tafel-tabelle th,
.tafel-tabelle td {
  border: 1px solid var(--page-border);
  padding: 0.2rem 0.3rem;
  text-align: center;
}

.tafel-tabelle tr.summe td,
.tafel-tabelle td.summe {
  font-weight: 600;
}

.tafel-zelle {
  min-width: 44px;
  min-height: 44px;
  border: 1px solid var(--page-accent);
  border-radius: 0.3rem;
  background: transparent;
  color: var(--page-text);
  font: inherit;
  cursor: pointer;
}

.tafel-zelle.gewaehlt {
  background: var(--page-accent);
  color: var(--page-on-accent);
  font-weight: 700;
}

.tafel-satz {
  min-height: 1.5rem;
  margin: 0.5rem 0;
}

.tafel-wahl {
  border: 0;
  padding: 0;
  margin: 0.5rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
}

.tafel-wahl label {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.tafel-baum {
  display: block;
  width: 100%;
  max-width: 24rem;
  height: auto;
}

.kante line {
  stroke: var(--page-muted);
  stroke-width: 1.5;
}

.knoten circle {
  fill: var(--page-surface);
  stroke: var(--page-accent);
  stroke-width: 2;
}

.knoten text,
.bruch text,
.pfad text {
  fill: var(--page-text);
  font-size: 12px;
}

.bruch line {
  stroke: var(--page-text);
}

.hinter {
  fill: var(--page-background);
}

.pfad text {
  font-size: 11px;
}

.pfad text.hervor {
  font-weight: 700;
  text-decoration: underline;
}

.knoten circle.hervor {
  stroke: #ff8f00;
  stroke-width: 4;
}

.tafel-legende {
  margin: 0.25rem 0 0;
  color: var(--page-muted);
}
</style>
