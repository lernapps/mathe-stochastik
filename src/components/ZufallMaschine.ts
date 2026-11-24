// Logik der Zufallsmaschine (Kapitel „Experimentieren mit dem Zufall“): ein Gerät wird ein-, zehn-, hundert- oder
// tausendmal geworfen, die Maschine zählt die Ergebnisse und merkt sich den Verlauf der relativen Häufigkeit eines
// beobachteten Ergebnisses. Rein, ohne DOM; der Zufall kommt als Funktion herein (im Test mit festem Startwert).
import { bruch, type Bruch } from "./Bruch.ts";

export type Geraet = "wuerfel" | "muenze" | "gluecksrad" | "reisszwecke" | "legostein";

export interface Ergebnis {
  name: string;
  /** Gewicht als ganze Zahl: Summe aller Gewichte eines Geräts ist die Zahl der gleich wahrscheinlichen Fälle. */
  gewicht: number;
}

export interface GeraetBeschreibung {
  name: string;
  /** Die Maschine kennt die Wahrscheinlichkeiten, die Lernenden nicht: kein Rechnen möglich (Reißzwecke, Steckstein). */
  verdeckt: boolean;
  ergebnisse: Ergebnis[];
}

export const GERAETE: Record<Geraet, GeraetBeschreibung> = {
  wuerfel: {
    name: "Würfel",
    verdeckt: false,
    ergebnisse: ["1", "2", "3", "4", "5", "6"].map((name) => ({ name, gewicht: 1 })),
  },
  muenze: {
    name: "Münze",
    verdeckt: false,
    ergebnisse: [
      { name: "Kopf", gewicht: 1 },
      { name: "Zahl", gewicht: 1 },
    ],
  },
  gluecksrad: {
    name: "Glücksrad",
    verdeckt: false,
    // Vier gleich große Felder: zwei rot, eins blau, eins gelb.
    ergebnisse: [
      { name: "Rot", gewicht: 2 },
      { name: "Blau", gewicht: 1 },
      { name: "Gelb", gewicht: 1 },
    ],
  },
  reisszwecke: {
    name: "Reißzwecke",
    verdeckt: true,
    ergebnisse: [
      { name: "Spitze oben", gewicht: 35 },
      { name: "Spitze unten", gewicht: 65 },
    ],
  },
  legostein: {
    name: "Steckstein",
    verdeckt: true,
    ergebnisse: [
      { name: "Noppen oben", gewicht: 46 },
      { name: "Noppen unten", gewicht: 34 },
      { name: "Auf der Seite", gewicht: 20 },
    ],
  },
};

/** Obergrenze der Würfe einer Maschine; danach hilft nur „Zurücksetzen“. */
export const MAX_WUERFE = 5000;

export interface Stand {
  geraet: Geraet;
  /** Absolute Häufigkeit je Ergebnis, in der Reihenfolge von `GERAETE[geraet].ergebnisse`. */
  zaehler: number[];
  /** Zahl der Würfe. */
  n: number;
  /** Relative Häufigkeit des beobachteten Ergebnisses nach dem 1., 2., … Wurf. */
  verlauf: number[];
  /** Name des Ergebnisses des letzten Wurfs; leer vor dem ersten Wurf. */
  letzter: string;
}

export function neuerStand(geraet: Geraet): Stand {
  return { geraet, zaehler: GERAETE[geraet].ergebnisse.map(() => 0), n: 0, verlauf: [], letzter: "" };
}

/** Index des Ergebnisses, das zu der Zufallszahl `u` in [0, 1) gehört. */
export function ergebnisIndex(geraet: Geraet, u: number): number {
  const liste = GERAETE[geraet].ergebnisse;
  const summe = liste.reduce((s, e) => s + e.gewicht, 0);
  let grenze = 0;
  for (let i = 0; i < liste.length; i++) {
    grenze += liste[i]!.gewicht;
    if (u * summe < grenze) return i;
  }
  return liste.length - 1;
}

/** Index des beobachteten Ergebnisses; ein unbekannter Name beobachtet das erste Ergebnis. */
export function beobachtetIndex(geraet: Geraet, beobachte: string): number {
  const i = GERAETE[geraet].ergebnisse.findIndex((e) => e.name === beobachte);
  return i < 0 ? 0 : i;
}

/** Wirft `anzahl`-mal (höchstens bis `MAX_WUERFE`) und gibt den neuen Stand zurück; der alte bleibt unverändert. */
export function werfen(stand: Stand, anzahl: number, beobachte: string, zufall: () => number): Stand {
  const zaehler = [...stand.zaehler];
  const verlauf = [...stand.verlauf];
  const ziel = beobachtetIndex(stand.geraet, beobachte);
  let n = stand.n;
  let letzter = stand.letzter;
  const schritte = Math.max(0, Math.min(anzahl, MAX_WUERFE - n));
  for (let k = 0; k < schritte; k++) {
    const i = ergebnisIndex(stand.geraet, zufall());
    zaehler[i]!++;
    letzter = GERAETE[stand.geraet].ergebnisse[i]!.name;
    n++;
    verlauf.push(zaehler[ziel]! / n);
  }
  return { geraet: stand.geraet, zaehler, n, verlauf, letzter };
}

/** Relative Häufigkeit als Dezimalzahl in [0, 1]; ohne Wurf 0. */
export function relativ(stand: Stand, index: number): number {
  return stand.n === 0 ? 0 : (stand.zaehler[index] ?? 0) / stand.n;
}

/** Dezimalzahl mit Komma auf `stellen` Stellen: `0,167`. */
export function komma(x: number, stellen = 3): string {
  return x.toFixed(stellen).replace(".", ",");
}

/** Die Wahrscheinlichkeit des Ergebnisses als Bruch, wo die Lernenden sie berechnen können; sonst `undefined`. */
export function wahrscheinlichkeit(geraet: Geraet, index: number): Bruch | undefined {
  const g = GERAETE[geraet];
  if (g.verdeckt) return undefined;
  const summe = g.ergebnisse.reduce((s, e) => s + e.gewicht, 0);
  return bruch(g.ergebnisse[index]?.gewicht ?? 0, summe);
}

/** Die Punkte der Linie des Verlaufs in einem Feld der Breite `b` und Höhe `h`; y = 0 ist unten. */
export function linie(verlauf: number[], b: number, h: number): string {
  const n = verlauf.length;
  if (n === 0) return "";
  const breite = Math.max(n, 10);
  return verlauf.map((v, i) => `${(((i + 1) / breite) * b).toFixed(1)},${(h - v * h).toFixed(1)}`).join(" ");
}

/** Der Satz über den Verlauf für die Textalternative und die Rückmeldung unter der Maschine. */
export function verlaufText(stand: Stand, beobachte: string): string {
  if (stand.n === 0) return "Noch kein Wurf.";
  const i = beobachtetIndex(stand.geraet, beobachte);
  const name = GERAETE[stand.geraet].ergebnisse[i]!.name;
  return `Nach ${stand.n} ${stand.n === 1 ? "Wurf" : "Würfen"}: ${name} kam ${stand.zaehler[i]}-mal vor, relative Häufigkeit ${komma(relativ(stand, i))}.`;
}
