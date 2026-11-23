// Vierfeldertafel: Summen, Baum in beide Richtungen und die Sätze zu den Zellen.
import fc from "fast-check";
import { expect, test } from "vite-plus/test";
import { baum, istGueltig, komma, summen, type Tafel, zellenSatz, zweigBruch } from "./Vierfeldertafel.ts";

const tafel = fc.record({
  ab: fc.integer({ min: 0, max: 500 }),
  anb: fc.integer({ min: 0, max: 500 }),
  nab: fc.integer({ min: 0, max: 500 }),
  nanb: fc.integer({ min: 1, max: 500 }),
});

test("die Zeilen- und Spaltensummen ergeben beide die Gesamtzahl", () => {
  fc.assert(
    fc.property(tafel, (t) => {
      const s = summen(t);
      expect(s.a + s.na).toBe(s.alle);
      expect(s.b + s.nb).toBe(s.alle);
    }),
  );
});

test("beide Bäume haben dieselben vier Pfade: die Zahl der Fälle je Zelle bleibt gleich", () => {
  fc.assert(
    fc.property(tafel, (t) => {
      for (const zuerst of ["A", "B"] as const) {
        const b = baum(t, zuerst);
        expect(b.stufe1[0].z + b.stufe1[1].z).toBe(summen(t).alle);
        // Pfad = Anteil der ersten Stufe mal Anteil der zweiten Stufe: ergibt die Zelle geteilt durch alle.
        const pfade = [0, 1, 2, 3].map(
          (i) =>
            (b.stufe1[Math.floor(i / 2)]!.z / b.stufe1[0].n) *
            (b.stufe2[i]!.n === 0 ? 0 : b.stufe2[i]!.z / b.stufe2[i]!.n),
        );
        expect(pfade.reduce((x, y) => x + y, 0)).toBeCloseTo(1, 9);
      }
    }),
  );
});

test("Beispiel: 200 Personen, 12 krank und positiv: P(positiv unter den Kranken) und P(krank unter den Positiven) sind verschieden", () => {
  const t: Tafel = { ab: 12, anb: 8, nab: 24, nanb: 156 };
  const a = baum(t, "A");
  const b = baum(t, "B");
  expect(zweigBruch(a.stufe2[0]!)).toEqual({ z: 3, n: 5 });
  expect(zweigBruch(b.stufe2[0]!)).toEqual({ z: 1, n: 3 });
  expect(summen(t)).toEqual({ a: 20, na: 180, b: 36, nb: 164, alle: 200 });
});

test("ein Zweig ohne Fälle im Nenner gibt 0, ungültige Tafeln werden erkannt", () => {
  expect(zweigBruch({ z: 0, n: 0 })).toEqual({ z: 0, n: 1 });
  expect(istGueltig({ ab: 0, anb: 0, nab: 0, nanb: 0 })).toBe(false);
  expect(istGueltig({ ab: 1.5, anb: 0, nab: 0, nanb: 1 })).toBe(false);
  expect(istGueltig({ ab: -1, anb: 0, nab: 0, nanb: 1 })).toBe(false);
  expect(istGueltig({ ab: 1, anb: 0, nab: 0, nanb: 1 })).toBe(true);
});

test("Dezimalzahlen mit Komma, Sätze mit Zahlen", () => {
  expect(komma(0.06)).toBe("0,06");
  expect(komma(1 / 3)).toBe("0,333");
  expect(
    zellenSatz({ ab: 12, anb: 8, nab: 24, nanb: 156 }, "ab", { a: "krank", na: "gesund", b: "positiv", nb: "negativ" }),
  ).toBe("In dieser Zelle: 12 von 200 Fällen sind krank und positiv. Das sind 0,06 aller Fälle.");
});
