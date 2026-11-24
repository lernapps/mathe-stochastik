// Zufallsmaschine: Zählung, Grenzen, Verlauf, Wahrscheinlichkeiten und der Satz unter der Maschine.
import fc from "fast-check";
import { expect, test } from "vite-plus/test";
import {
  ergebnisIndex,
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
import { mulberry32 } from "./Zufallszahlen.ts";

const geraete = Object.keys(GERAETE) as Geraet[];

test("die Zahl der Würfe und die Häufigkeiten stimmen: die Summe der absoluten Häufigkeiten ist n", () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...geraete),
      fc.integer({ min: 0, max: 2 ** 32 - 1 }),
      fc.integer({ min: 0, max: 300 }),
      (g, s, k) => {
        const stand = werfen(neuerStand(g), k, "", mulberry32(s));
        expect(stand.n).toBe(k);
        expect(stand.zaehler.reduce((a, b) => a + b, 0)).toBe(k);
        expect(stand.verlauf).toHaveLength(k);
      },
    ),
  );
});

test("derselbe Startwert wirft dieselbe Reihe; der alte Stand bleibt unverändert", () => {
  const a = neuerStand("wuerfel");
  const b = werfen(a, 100, "6", mulberry32(7));
  const c = werfen(a, 100, "6", mulberry32(7));
  expect(a.n).toBe(0);
  expect(b).toEqual(c);
});

test("die Zufallszahl wählt das Ergebnis nach den Gewichten: Glücksrad hat Rot auf der Hälfte", () => {
  expect(ergebnisIndex("gluecksrad", 0)).toBe(0);
  expect(ergebnisIndex("gluecksrad", 0.49)).toBe(0);
  expect(ergebnisIndex("gluecksrad", 0.5)).toBe(1);
  expect(ergebnisIndex("gluecksrad", 0.74)).toBe(1);
  expect(ergebnisIndex("gluecksrad", 0.75)).toBe(2);
  expect(ergebnisIndex("gluecksrad", 0.999999)).toBe(2);
  expect(ergebnisIndex("wuerfel", 5 / 6)).toBe(5);
});

test("viele Würfe: die relative Häufigkeit liegt nahe an der Wahrscheinlichkeit (fester Startwert)", () => {
  const stand = werfen(neuerStand("muenze"), 5000, "Kopf", mulberry32(42));
  expect(stand.n).toBe(MAX_WUERFE);
  expect(Math.abs(relativ(stand, 0) - 0.5)).toBeLessThan(0.03);
  const rad = werfen(neuerStand("gluecksrad"), 4000, "Rot", mulberry32(3));
  expect(Math.abs(relativ(rad, 0) - 0.5)).toBeLessThan(0.04);
});

test("mehr als die Obergrenze wird nicht geworfen", () => {
  const stand = werfen(werfen(neuerStand("muenze"), 4000, "Kopf", mulberry32(1)), 4000, "Kopf", mulberry32(2));
  expect(stand.n).toBe(MAX_WUERFE);
  expect(werfen(stand, 10, "Kopf", mulberry32(3)).n).toBe(MAX_WUERFE);
});

test("der letzte Wurf wird mit seinem Namen gemerkt", () => {
  expect(neuerStand("wuerfel").letzter).toBe("");
  expect(werfen(neuerStand("wuerfel"), 1, "6", () => 0).letzter).toBe("1");
  expect(werfen(neuerStand("muenze"), 3, "Kopf", () => 0.99).letzter).toBe("Zahl");
});

test("der Verlauf endet bei der relativen Häufigkeit des beobachteten Ergebnisses", () => {
  const stand = werfen(neuerStand("wuerfel"), 60, "6", mulberry32(5));
  expect(stand.verlauf.at(-1)).toBeCloseTo(relativ(stand, 5), 12);
});

test("die Wahrscheinlichkeit gibt es nur, wo man sie berechnen kann", () => {
  expect(wahrscheinlichkeit("wuerfel", 5)).toEqual({ z: 1, n: 6 });
  expect(wahrscheinlichkeit("muenze", 0)).toEqual({ z: 1, n: 2 });
  expect(wahrscheinlichkeit("gluecksrad", 0)).toEqual({ z: 1, n: 2 });
  expect(wahrscheinlichkeit("reisszwecke", 0)).toBeUndefined();
  expect(wahrscheinlichkeit("legostein", 2)).toBeUndefined();
});

test("Dezimalzahlen haben ein Komma, die Linie hat einen Punkt je Wurf und bleibt im Feld", () => {
  expect(komma(1 / 6)).toBe("0,167");
  expect(komma(0.5, 1)).toBe("0,5");
  expect(linie([], 100, 50)).toBe("");
  const punkte = linie([1, 0.5, 1 / 3], 100, 50).split(" ");
  expect(punkte).toHaveLength(3);
  expect(punkte[0]).toBe("10.0,0.0");
});

test("der Satz unter der Maschine nennt Würfe, Ergebnis, absolute und relative Häufigkeit", () => {
  expect(verlaufText(neuerStand("muenze"), "Kopf")).toBe("Noch kein Wurf.");
  const eins = werfen(neuerStand("muenze"), 1, "Kopf", () => 0);
  expect(verlaufText(eins, "Kopf")).toBe("Nach 1 Wurf: Kopf kam 1-mal vor, relative Häufigkeit 1,000.");
  const zehn = werfen(neuerStand("muenze"), 10, "Zahl", () => 0.99);
  expect(verlaufText(zehn, "Zahl")).toBe("Nach 10 Würfen: Zahl kam 10-mal vor, relative Häufigkeit 1,000.");
});
