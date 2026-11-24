// Logik der Vierfeldertafel (Kapitel „Vierfeldertafel und bedingte Wahrscheinlichkeit“): vier Häufigkeiten, ihre
// Summen und derselbe Inhalt als zweistufiger Baum, wahlweise mit A oder mit B zuerst. Rein, ohne DOM.
import { bruch, type Bruch } from "./Bruch.ts";

export interface Tafel {
  /** A und B, A und nicht B, nicht A und B, nicht A und nicht B. */
  ab: number;
  anb: number;
  nab: number;
  nanb: number;
}

export interface Summen {
  a: number;
  na: number;
  b: number;
  nb: number;
  alle: number;
}

export function summen(t: Tafel): Summen {
  return {
    a: t.ab + t.anb,
    na: t.nab + t.nanb,
    b: t.ab + t.nab,
    nb: t.anb + t.nanb,
    alle: t.ab + t.anb + t.nab + t.nanb,
  };
}

/** Gültig, wenn alle Zahlen ganz und nicht negativ sind und die Summe nicht 0 ist. */
export function istGueltig(t: Tafel): boolean {
  const zahlen = [t.ab, t.anb, t.nab, t.nanb];
  return zahlen.every((z) => Number.isInteger(z) && z >= 0) && zahlen.some((z) => z > 0);
}

export type Reihenfolge = "A" | "B";

export interface Zweig {
  /** Anzahl im Zähler und im Nenner des Bruchs am Zweig. */
  z: number;
  n: number;
}

export interface Baum {
  /** Die zwei Zweige der ersten Stufe: erst das Merkmal (A oder B), dann das Gegenteil. */
  stufe1: [Zweig, Zweig];
  /** Die vier Zweige der zweiten Stufe: unter dem ersten Knoten zuerst „gleiches Merkmal 2“, dann das Gegenteil; ebenso unter dem zweiten. */
  stufe2: [Zweig, Zweig, Zweig, Zweig];
}

/** Der Baum der Tafel; mit „B“ zuerst wird die Tafel gelesen, als wären A und B vertauscht. */
export function baum(t: Tafel, zuerst: Reihenfolge): Baum {
  const s = summen(t);
  if (zuerst === "A") {
    return {
      stufe1: [
        { z: s.a, n: s.alle },
        { z: s.na, n: s.alle },
      ],
      stufe2: [
        { z: t.ab, n: s.a },
        { z: t.anb, n: s.a },
        { z: t.nab, n: s.na },
        { z: t.nanb, n: s.na },
      ],
    };
  }
  return {
    stufe1: [
      { z: s.b, n: s.alle },
      { z: s.nb, n: s.alle },
    ],
    stufe2: [
      { z: t.ab, n: s.b },
      { z: t.nab, n: s.b },
      { z: t.anb, n: s.nb },
      { z: t.nanb, n: s.nb },
    ],
  };
}

/** Der Bruch eines Zweigs, gekürzt; ein Nenner 0 gibt 0. */
export function zweigBruch(z: Zweig): Bruch {
  return z.n === 0 ? bruch(0) : bruch(z.z, z.n);
}

/** Dezimalzahl mit Komma auf drei Stellen, ohne überflüssige Nullen: `0,25`. */
export function komma(x: number): string {
  return String(Math.round(x * 1000) / 1000).replace(".", ",");
}

/** Die Zellen der Tafel in der Reihenfolge ab, anb, nab, nanb. */
export const ZELLEN = ["ab", "anb", "nab", "nanb"] as const;
export type Zelle = (typeof ZELLEN)[number];

/** Der Satz zu einer Zelle: „In dieser Zelle: 12 von 200 Fällen sind krank und positiv. Das sind 0,06 aller Fälle.“ */
export function zellenSatz(t: Tafel, zelle: Zelle, namen: { a: string; na: string; b: string; nb: string }): string {
  const s = summen(t);
  const [m1, m2] = {
    ab: [namen.a, namen.b],
    anb: [namen.a, namen.nb],
    nab: [namen.na, namen.b],
    nanb: [namen.na, namen.nb],
  }[zelle];
  return `In dieser Zelle: ${t[zelle]} von ${s.alle} Fällen sind ${m1} und ${m2}. Das sind ${komma(t[zelle] / s.alle)} aller Fälle.`;
}
