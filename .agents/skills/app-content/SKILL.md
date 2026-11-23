---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

## Curriculum

- Hessen, Gymnasium (G9); Kerncurriculum Mathematik Sekundarstufe I (Hessisches Kultusministerium, 2021). Die
  Zuordnung je Bundesland steht im Katalog (Lernlandkarte, `map/mathematik/curricula/`), nicht hier.
- Wahrscheinlichkeit: Klasse 7 und 8 (Kapitel `experimente` und `zufall`), Vierfeldertafel und bedingte Wahrscheinlichkeit: Klasse 9 und 10 (`vierfeldertafel`).
- Die gemeinsamen Regeln der Mathe-Apps stehen in `docs/mathe-epic/regeln.md` von lernapps/apps (Schreibweisen, Aufgaben, Quellen, Recap); bei Widerspruch gelten sie vor diesem Leitfaden nur, soweit hier nichts anderes steht.
- Die App gehört zum Strang `mathematik/stochastik` der Lernlandkarte (`strand` in `src/app.yaml`, Format 2). Jede
  Seite nennt in `competencies` die Bausteine, die sie übt: ids aus `map/mathematik.yaml` in lernapps/apps, nur aus
  diesem Strang. Ein neues Kapitel kommt nur dazu, wenn seine Bausteine im Strang `stochastik` stehen; fehlt ein
  Baustein, wird er dem Katalog vorgeschlagen, nicht in der App erfunden.
- Die App entstand aus der Mathe-Karte (Kapitel `zufall`); Seiten-ids und Adressen sind von dort übernommen.

## Competencies

Je Seite eine Kompetenz, Datei `src/<kapitel>/<seite>.yaml`. Drei Kapitel in dieser Reihenfolge: `experimente`, `zufall`, `vierfeldertafel`.

- Experimente (`src/experimente/`, Klasse 7-8): Ich kann Zufallsversuche beschreiben (`zufallserscheinungen`), relative Häufigkeiten als Schätzwert deuten (`haeufigkeit-als-schaetzwert`), erklären, was Wahrscheinlichkeit bedeutet, und sie auf der Skala von 0 bis 1 einordnen (`wahrscheinlichkeitsbegriff`) und einfache Versuche simulieren (`simulationen`, mit der Zufallsmaschine; eine Tabellenkalkulation hat die App nicht, die Seite sagt das). Die Seite `start` ist die Sammel-Wiederholung (`recap`) zu `haeufigkeiten`.
- Vierfeldertafel (`src/vierfeldertafel/`, Klasse 9-10): Ich kann zwei Ereignisse in einer Vierfeldertafel darstellen und Wahrscheinlichkeiten ablesen (`tafel` → `vierfeldertafel`) und bedingte Wahrscheinlichkeiten erkennen und berechnen (`bedingt` → `bedingte-wahrscheinlichkeit`). Kein Recap: alle Voraussetzungen stehen im Strang.
- Die Seite `start` im Kapitel `zufall` ist die Sammel-Wiederholung zu `zaehlprinzip`, `brueche-multiplizieren-dividieren` und `prozent-grundbegriffe`.

- Zufall (`src/zufall/`): Ich kann die Laplace-Formel anwenden (`laplace`), ein Baumdiagramm zeichnen
  (`baumdiagramm`), die erste und zweite Pfadregel anwenden (`pfadregel-1`, `pfadregel-2`), mit dem Gegenereignis
  rechnen (`gegenereignis`), ohne Zurücklegen rechnen (`ohne-zuruecklegen`), Wahrscheinlichkeiten als Produkt, Summe
  oder Potenz angeben (`ergebnisformen`) und Ereignisse in Pfade übersetzen (`pfade-uebersetzen`).
- Bausteine je Seite im Kapitel `experimente`: `zufallserscheinungen` → `zufallserscheinungen`, `haeufigkeit-als-schaetzwert` → `haeufigkeit-als-schaetzwert`, `wahrscheinlichkeitsbegriff` → `wahrscheinlichkeitsbegriff`, `simulationen` → `simulationen`.
- Bausteine je Seite (`competencies`) im Kapitel `zufall`: `laplace` → `zufall-laplace`, `baumdiagramm` → `zufall-baumdiagramm`,
  `pfadregel-1` → `zufall-pfadregel-1`, `gegenereignis` → `zufall-gegenereignis`, `ohne-zuruecklegen` →
  `zufall-ohne-zuruecklegen`, `pfadregel-2` → `zufall-pfadregel-2`, `ergebnisformen` → `zufall-ergebnisform`,
  `pfade-uebersetzen` → `zufall-ereignis-uebersetzen`.

## Content structure

Jede Seite des Kapitels `zufall` hat diese Abschnitte, in dieser Reihenfolge und mit diesen ids (öffentlicher Vertrag, nie umbenennen):

1. `warum` – „Warum?“: ein Absatz aus dem Alltag oder der Klassenarbeit.
2. `regel` – „Regel“: `formula`-Blöcke, Fachbegriffe als `definition`, eine `note` „Merke“.
3. `beispiel` – „Beispiel“: eine `example`-Box mit `table` (gegeben, Rechnung, Ergebnis).
4. `bild` – „Bild“: das Beispielbild, ohne JavaScript sichtbar (siehe Figures).
5. `uebung` – „Übung“: die Übungen (siehe Exercise patterns).

Die Seiten der Kapitel `experimente` und `vierfeldertafel` haben `warum` (Einstieg mit erster Aufgabe oder Maschine), `regel`, `beispiel`, `uebung` und, wo es einen Rückblick gibt, `abschluss`; Recap-Seiten (`start`) haben `kopf`, je Baustein einen Abschnitt und `checkliste`.

`description` und `summary` sind reiner Text ohne `$…$`.

## Ids, addresses and the tutor

- Seiten-, Abschnitts- und Übungs-ids und die Adresse `/<kapitel>/<seite>/?<übung>=<n>#<übung>` sind ein öffentlicher
  Vertrag: Der KI-Tutor und geteilte Links nennen sie. Nie umbenennen; eine Seite zieht nicht um.
- Die Regeln für den Tutor stehen in `src/app.yaml` (`tutor.rules`), nicht in den Seiten.

## Terminology

- Du-Anrede, kurze Sätze, Ton einer Lehrkraft, nicht der App („die App akzeptiert“ ist verboten). Kein „NICHT“ in
  Großbuchstaben, keine Verweise wie „Kompetenz 3“: ein Link mit Namen.
- Zufall: $P(E)$, „günstige“ und „mögliche“ Ergebnisse, „Pfad“, „mit/ohne Zurücklegen“; Brüche gekürzt oder ungekürzt
  erlaubt.

## Exercise patterns

- Bezeichner: deutsche Fachbegriffe (`Grundwert`, `Pfad`), englisch nur für allgemeine Struktur. Jede Komponente
  trägt das Präfix ihres Kapitels (`Zufall…`). Gemeinsamer Code steht einmal in
  `src/components/Bruch.ts` (exakte Brüche, Runden) und `src/components/Zufallszahlen.ts` (mulberry32); nie in ein
  Kapitel kopieren.

- Zufallsmaschine (`ZufallMaschine`, Logik in `ZufallMaschine.ts`): Würfel, Münze, Glücksrad, Reißzwecke, Steckstein (kein Markenname); 1, 10, 100 oder 1000 Würfe, Tabelle der Häufigkeiten, Linie der relativen Häufigkeit eines beobachteten Ergebnisses, auf Wunsch gestrichelt der berechnete Wert. Keine Aufgabe; Reißzwecke und Legostein haben verdeckte Wahrscheinlichkeiten. Vor jeder Maschine steht, was man tut und wonach man schaut, danach eine Frage.
- Vierfeldertafel (`Vierfeldertafel`): Tafel mit Summen, anklickbare Zellen, derselbe Inhalt als Baum mit A oder B zuerst; Kürzel der Merkmale über `ka`, `kna`, `kb`, `knb`.
- Kurztest (`Kurztest`): Selbsttest in einer Recap-Seite, eine Frage, Auswahl, Grund bei jeder Option, `nojs`-Text.
- Je Seite des Kapitels `zufall` eine Übungskomponente mit „Bild zur Aufgabe“, Tipp, Rechenweg und den typischen Fehlern der alten App:
  - Zufall: `ZufallLaplace`, `ZufallBaumLuecken`, `ZufallPfad`, `ZufallGegen`, `ZufallOhne`, `ZufallPfade`,
    `ZufallTerm`; Brüche in `ZufallBruch.ts`, Modelle in `ZufallModell.ts`, Bäume in `ZufallBaum.vue`.
- Dazu je Seite mindestens vier Aufgaben von verschiedener Art (`generated`, `number`, `single-choice`, `true-false`, `matching`, `ordering`, Komponente); die erste braucht kein Vorwissen aus dem Kapitel, dann steigend. Keine `links:` an Aufgaben.
- Selbsteinschätzung (`selfAssessment` in `chapter.yaml`): so viele Seiten wie sinnvoll, je abgefragte Seite 2
  Aufgaben, Schritte zu 3, je Kapitel 12. Bevorzugt die Übungskomponente der Seite (sie zeigt ihre Aufgabe
  selbst und zieht jede Runde eine neue), dazu die `generated`-Übung, sonst die Komponente zweimal.
  - Zufall: Komponente und `generated` auf `laplace`, `pfadregel-1`, `gegenereignis`, `ohne-zuruecklegen`,
    `pfadregel-2` (`pfade-addieren`); `baumdiagramm` die Komponente zweimal (`baumdiagramm-nenner` gehört zum Ziehen
    ohne Zurücklegen). `ergebnisformen` fehlt: es hat nur Auswahl zwischen drei Termen, die man raten kann;
    `pfade-uebersetzen` fehlt: es übt mit derselben Komponente wie `pfadregel-2` und hielte das Kapitel über 12.
- Text und Optionen einer Quiz-Frage sind reiner Text ohne `$…$` (die Laufzeit-Tests vergleichen ungesetzten Text):
  Hochzahlen als `²`, Malpunkt `·`.

## Figures

- Die Seiten der Kapitel `experimente` und `vierfeldertafel` haben keinen Abschnitt `bild`: die Zufallsmaschine und die Vierfeldertafel sind das Bild; Textalternative (`aria-label`) und `nojs` sagen, was man sieht.

- Was kein Block zeichnet (Flächenbild, Baum, Urne), zeichnet die Komponente der Übung; das Beispielbild entsteht
  daraus als SVG (gerendert mit `scripts/bilder.mjs`, das bis `8b229e9` im Repo lag und in der Git-Historie steht;
  `<svg>` mit `viewBox`, sonst schneidet der Browser die Datei zu), auf der Seite ein `figure` mit
  `image: images/<kapitel>-<seite>.svg`, `alt` aus dem `aria-label`, `caption` mit der genauen Beschreibung,
  `source: Eigene Darstellung der Mathe-Karte`, `licence: MIT`. Nie von Hand gezeichnete SVGs.
- Farben: Mathe-Blau `#1d4ed8`, Hervorhebung Orange `#ff8f00`; Kugeln rot/blau/gelb mit Buchstaben R/B/G.

## Sources

- Keine Videos, kein serlo.org, keine Dritt-Inhalte (Regeln des Mathe-Epics, Abschnitt 4). Fachfakten dürfen nachgeschlagen werden, stehen aber nicht im Explainer; verlangt das Werkzeug einen Link an einer Frage, zeigt er auf die Kartenseite des Bausteins.
- Texte und Aufgaben sind eigene Arbeit (MIT), übernommen aus den alten Apps des Repos.

## Adding a chapter or round

1. Kompetenzen als „Ich kann …“ hier eintragen; Seiten-ids festlegen (nie wieder ändern).
2. `src/<kapitel>/chapter.yaml` und je Seite die YAML-Datei mit den fünf Abschnitten und `competencies` (Bausteine
   des Strangs); Kapitel in `src/app.yaml`.
3. Übungen nach den Mustern oben, Test zuerst (`src/components/<Name>.test.ts`).
4. Beispielbilder nach Figures.
5. 1 bis 3 ihrer Übungen in `selfAssessment` aufnehmen, wie Skill `lernapps-explainer-self-assessment` sagt.
6. `npx vp test run`, `npm run build`, `npx lernapps check`; dann Commit und Pull Request.

## Rules learned from mistakes

- Formeln in `description` erschienen roh im Inhaltsverzeichnis → reiner Text.
- Formeln in Quiz-Fragen ließen die Laufzeit-Tests scheitern und hatten keinen zugänglichen Namen → reiner Text.
- Bilder als Komponente waren ohne JavaScript unsichtbar → statische SVGs aus `scripts/bilder.mjs`.
- Ein wählbares Feld mit sichtbarem Text braucht diesen Text am Anfang seines Namens (axe
  label-content-name-mismatch).
