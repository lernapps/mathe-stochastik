---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, as in the app's first plan. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: commit
# prePushFailures: failed pre-push runs of this increment, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: { accessible: 3, checks-pass: 3, plan-file: 1 }
---

# Increment: stochastik-ausbau

<!--
For you, the assistant. One increment of a published app: new competencies, chapters, pages, rounds, questions, or a
correction. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Content method and Retrospective, in the creator's
  language. Delete the comment of a section once the section is filled.
- The first version's decisions stand: archetype, content method, content guide. Never change an earlier plan.
- Work on the branch `increment/<NN>-<short name>`. Until Commit everything is local: push nothing.
-->

*Started 2026-11-23. Explore, Plan, Code, Commit.*

## Goal

Lernende der Klassen 7 bis 10 verstehen Wahrscheinlichkeit als Prognose für relative Häufigkeiten auf lange Sicht
und bestimmen sie mit Laplace-Formel, Baumdiagramm und Vierfeldertafel. Der Ausbau (Issue lernapps/apps#401, Schicht 2)
ergänzt die 6 fehlenden von 14 Bausteinen und bringt die 8 vorhandenen Seiten auf die gemeinsamen Regeln
(`/tmp/epic/docs/mathe-epic/regeln.md`).

## Key decisions

- Kein `scope` in `app.yaml`: keine `open-task`, kein Material des Creators; der Bestand hat auch keinen.
- Die Seite `zufallserscheinungen` hat keinen Abschnitt `bild`: Die Zufallsmaschine ist das Bild; Textalternative (aria-label der Linie, Erklärungstext) und Version ohne JavaScript (`nojs` mit Beispielreihe) sagen, was man sieht (Orchestrator-Freigabe).
- `simulationen`: Die Karte nennt Tabellenkalkulation; die App kann das nicht. Simulation läuft mit der Zufallsmaschine, die Grenze steht auf der Seite und hier (kein Versprechen, das die App nicht hält).
- Branch `increment/01-stochastik-ausbau` von `main`; Plan 02, weil die offenen Commit-Aufgaben von Plan 01 einem anderen Branch gehören.
- Kapitel-, Seiten- und Übungs-ids und alle Adressen des Bestands bleiben (öffentlicher Vertrag). Kapitel `zufall` bleibt für Kapitel 2 und 3 des Issues; neu kommen `experimente` (Kap. 1, Klasse 7-8) und `vierfeldertafel` (Kap. 4, Klasse 9-10). Reihenfolge in `app.yaml`: experimente, zufall, vierfeldertafel.
- Erster Commit ist `lernapps update` (0.18.5 / 0.14.0) allein; Befunde zuerst beheben (Orchestrator-Freigabe).
- YouTube und serlo ersatzlos raus (Seiten, `sources`, Tutor-Regeln); `fitness` wird am Ende im Katalogeintrag neu gefasst.
- Voraussetzungen von außen als `recap`-Seite (Begriffe, Beispiele, Kopf, Checkliste) plus eigene Kurztest-Seite direkt dahinter (regeln.md 7.6); Bausteine laut Karte: zaehlprinzip (#386), brueche-multiplizieren-dividieren, prozent-grundbegriffe (#389), haeufigkeiten (#400). Gebaut wird gegen die Karte, die Apps der anderen werden nicht gelesen.
- Baumdiagramm als tragende Darstellung (gleiche Begriffe wie #386): Kapitel 3 greift sie für mehrstufige Versuche auf.
- Die Vierfeldertafel ist neu und läuft als eigene Komponente neben dem Baum (dieselben Zahlen in zwei Darstellungen).
- Musterseite ist eine neue Seite aus Kapitel 1: `experimente/zufallserscheinungen` mit der Zufallsmaschine (Seiten-id wie Karten-id, vom Orchestrator bestätigt).

## Notes

**Bestand → Baustein** (vorhanden / fehlt)

| Baustein | Stand | Seite |
|---|---|---|
| zufallserscheinungen (Zufallsversuche) | fehlt | experimente/zufallserscheinungen |
| haeufigkeit-als-schaetzwert | fehlt | experimente/relative-haeufigkeit |
| simulationen | fehlt | experimente/simulationen |
| wahrscheinlichkeitsbegriff | fehlt | experimente/wahrscheinlichkeitsbegriff |
| zufall-laplace | vorhanden | zufall/laplace (überarbeiten) |
| zufall-ergebnisform | vorhanden | zufall/ergebnisformen (überarbeiten) |
| zufall-gegenereignis | vorhanden | zufall/gegenereignis (überarbeiten) |
| zufall-baumdiagramm | vorhanden | zufall/baumdiagramm (überarbeiten) |
| zufall-pfadregel-1 | vorhanden | zufall/pfadregel-1 (überarbeiten) |
| zufall-pfadregel-2 | vorhanden | zufall/pfadregel-2 (überarbeiten) |
| zufall-ohne-zuruecklegen | vorhanden | zufall/ohne-zuruecklegen (überarbeiten) |
| zufall-ereignis-uebersetzen | vorhanden | zufall/pfade-uebersetzen (überarbeiten) |
| vierfeldertafel | fehlt | vierfeldertafel/tafel |
| bedingte-wahrscheinlichkeit | fehlt | vierfeldertafel/bedingt |

**Voraussetzungen von außen (Karte, `requires`):** haeufigkeiten (vor Kap. 1), zaehlprinzip, brueche-multiplizieren-dividieren, prozent-grundbegriffe (vor Kap. 2/3). Kapitel 4 braucht nichts von außen. Ein Recap je Kapitelanfang.

**Abweichungen im Bestand, die behoben werden:** YouTube-Videos (5 Seiten), serlo (Quelle, 7 Textlinks, ein `links:`), Brüche als `3/5` im Text (`baumdiagramm.yaml`; Stellen mit `a/b` in Komponenten-Rückmeldungen und `mistakes` zählen wir hier nach W28), je Seite zu wenige und zu gleichartige Aufgaben (mindestens 3 je Baustein, steigend, nicht überall `generated`), Klassenangabe „7 und 8“ statt „Klasse 8“, Textwände (laplace, ohne-zuruecklegen, pfadregel-2; `explainer-text-load` darf bleiben, wenn Kürzen die Erklärung schwächt), fehlende `recap`-Seiten.

**Didaktik:** Die Zufallsmaschine (Würfel, Münze, Glücksrad, Urne, Reißzwecke/Legostein) läuft einzeln und tausendfach; die relative Häufigkeit pendelt sich ein. Kapitel 2 prognostiziert vorher und bestätigt mit der Simulation. Kapitel 3 erweitert die Maschine auf mehrere Stufen. Kapitel 4: Tafel und Baum mit denselben Zahlen; der Schnelltest zeigt, warum die Richtung der Bedingung zählt. Wiederkehrend: der Spieleabend, an dem geprüft wird, ob ein Spiel fair ist.

**Umfang:** drin: alle 14 Bausteine, Recaps, Bereinigung. Draußen: Häufigkeiten und Umfragedaten (#400), Zählprinzip (#386), Lernlandkarte ändern.

**Quellen:** Karte, KMK-Bildungsstandards 2022, Hessisches Kerncurriculum Sek I, eigene Herleitungen. Nachschlagen ohne Übernahme; fachlicher Prüfer rechnet nach.

**Quelle Kerncurriculum:** der alte Link (`kultusministerium.hessen.de/…/mathematik`) lieferte hier 404 (Proxy oder tot, ungeklärt); ersetzt durch das PDF `kultus.hessen.de/…/kerncurriculum_mathematik_gymnasium.pdf` (200, application/pdf, hier geprüft).

**Funde fürs Werkzeug (an den Orchestrator):** `recap` hat keine Übungen, Selbsttests daher auf eigener Seite (geklärt); Node 22 hier, CI 26.

## Explore

<!--
- All content questions belong here; Plan maps the answers onto the app. Ask; write no code.
- Skip what earlier answers or the app already tell. At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Read the README of the archetype's template (its path is in skill `lernapps-app`): what the app can do now.
      Tell the creator what is new, if it matters for this increment.
- [x] Load the content guide `.agents/skills/app-content/SKILL.md` and read the earlier plans in `.vibe/plans/`: what
      the app teaches, how its content is made, what is open.
- [x] (skipped: Der Auftrag liegt als Issue 401 vor (Bausteine, Stufen, Didaktik); keine Rückfragen nötig.) Interview, one topic per question, the creator's words under "Answers": which competencies, chapters or rounds,
      for which school years; hurdles and examples; the amount; any change of look and feel or of terms. No answer:
      ask once more, then write your assumption with "(guess)".
- [x] Load skill `lernapps-content-research`. Research what the content guide does not cover. Write under "Notes":
      the new competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" the didactic approach per competency and the scope (in, out, data range).
- [x] The increment needs a kind of content the guide does not cover (a new page structure, screen, component or kind
      of exercise): load skills `lernapps-explainer-design` and `lernapps-exercise-patterns`. Else skip this task.
- [x] **Checkpoint:** research. Show in plain words: the new competencies by chapter, the didactic approach, the
      scope, every "(guess)", the sources and what is unchecked. Stop and wait. Changes: change them, then ask again.
      Creator: Recherche vom Orchestrator in Vertretung des Menschen angenommen (Bestand, Abweichungen, Update, Plan 02, Recap mit Kurztest); der Mensch hat npx freigegeben.

### Answers

<!-- The creator's answers, in their words, one bullet each. -->

## Plan

<!--
- Map the new content onto the app with the guide's patterns. The creator confirms the plan in one read.
- After the yes you work on your own.
-->

### Tasks

- [x] Load skill `lernapps-content-growth`. Add the tasks of Code as slices, one per competency, in the guide's
      order, one call each: `npx --no -- lernapps plan add --at slices "<task>"`. Say in each which sub-agent may
      write it in parallel, if any.
- [x] Write "Content method": the guide's patterns, figures and components per slice. Anything new: map it as skill
      `lernapps-explainer-design` says, and say why the guide's patterns do not fit.
- [x] Draw a sketch of each new component or interactive exercise, in `.vibe/sketches/`.
- [x] Show the creator, short: goal, new competencies by chapter, slices; in plain words what learners see and do and
      what is new. At most 2 questions.
- [x] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.
      Creator: Plan vom Orchestrator in Vertretung des Menschen bestätigt (Kapitelreihenfolge, 11 Scheiben, Komponenten, Kurztest); der Mensch hat npx freigegeben.

### Content method

Je Seite: erste Aufgabe vor der Erklärung (Zufallsmaschine laufen lassen, vorhersagen), Wechsel Sehen/Tun/Lesen, Rückblick am Kapitelende, roter Faden Spieleabend („Ist das Spiel fair?“).

- **Zufallsmaschine** (neu, Komponente `ZufallMaschine`): Würfel, Münze, Glücksrad, Urne, Reißzwecke/Legostein; ein Wurf, 10, 100, 1000 Würfe; Tabelle der absoluten und relativen Häufigkeit und eine Linie, die sich einpendelt. Lernhandlung: erst schätzen, dann laufen lassen und vergleichen. Grund: kein Block zieht zufällig und zeichnet (`prefer-built-in-block`). Grenzen: Zufallszahlen aus dem Seed (`Zufallszahlen.ts`), nichts wird gespeichert; ohne JavaScript steht eine feste Beispielreihe als Tabelle mit Text da.
- **Vorhersage-Aufgabe:** erst schätzen oder rechnen, dann die Maschine, Rückmeldung mit Grund. Typische Fehler: „nach 6 Würfen muss eine 6 kommen“, „es gleicht sich aus“.
- **Vierfeldertafel** (neu, Komponente `Vierfeldertafel`): Tafel mit Lücken füllen, daneben der Baum mit denselben Zahlen (bestehende `ZufallBaum`), in beide Richtungen lesbar. Eingabe als Bruch, Dezimalzahl oder Prozent. Fehlertypen: Bedingung in der falschen Richtung, Zeilen- statt Spaltensumme.
- **Kurztest** (aus `/tmp/epic/docs/mathe-epic/components/`): in jedem Recap, eine Frage, eine Auswahl, Grund bei jeder Option, `nojs`-Text.
- **Bestehend, wiederverwendet:** `ZufallBaum`, `ZufallBaumLuecken`, `ZufallPfad`, `ZufallGegen`, `ZufallOhne`, `ZufallPfade`, `ZufallTerm`, `generated`, `single-choice`, `table`, `formula`, `figure`. Bruchsatz nur mit `formula`; `a/b` nur in Komponenten-Rückmeldungen und `mistakes` (W28, gezählt).
- **Aufgabenarten je Baustein (mindestens 3, steigend):** Rechnen mit Eingabe (`generated`), Komponente mit Bild, Auswahl mit Begründung, Ablesen aus Bild oder Tafel; nicht alle Seiten gleich (`explainer-page-variety`).
- **Recap-Seiten** (`recap:`, beschreibend): Kopf („Das brauchst du für dieses Kapitel“), je Baustein Begriffe fett mit Beispiel, Kurztest, Schluss als Checkliste; Begriffe auch im Glossar. Kapitel `experimente`: haeufigkeiten. Kapitel `zufall`: zaehlprinzip, brueche-multiplizieren-dividieren, prozent-grundbegriffe (Kartenseite als Hinweis, nie Link in fremde Apps). Kapitel `vierfeldertafel`: keine.
- **Bilder:** SVG aus den Komponenten gerendert, mit Alt-Text; Mathe-Blau `#1d4ed8`, Orange `#ff8f00`; nie Farbe allein.
- **Keine Videos, keine externen Links;** Quellen nur Karte, KMK 2022, Hessisches Kerncurriculum, eigene Herleitungen.

## Code

<!--
- Build locally on the branch, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first.
-->

### Tasks

- [x] `git switch -c increment/<NN>-<short name>` from `main`. Commit this plan on it.
- [x] Load skill `lernapps-cli`. Update the app as its section "Update" says. Commit the update alone and fix its
      findings before any content. The update replaces the `lernapps-*` skills: read again those you use.
- [x] Load skill `lernapps-explainer` and the content guide.
- [x] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [x] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
- [x] Bestand A (ich allein): YouTube und serlo ersatzlos raus (Video-Abschnitte, Textlinks, links:, sources, Tutor-Regeln), Klassenangabe "7 und 8" in app.yaml und chapter.yaml; check und Tests grün.
- [x] Bestand B (Unteragent, nur Kapitel zufall, eigene Worktree): je Seite mindestens 3 Aufgaben je Baustein, steigend und nicht überall generated, Brüche gesetzt statt 3/5 (a/b in Komponenten-Rückmeldungen zählen, W28), Textwände kürzen oder teilen, Abschnitt-Ids unverändert.
- [x] Kurztest + Recap Kapitel experimente (ich allein): Kurztest-Dateien aus /tmp/epic nach src/components kopieren und anpassen, Recap-Seite haeufigkeiten (Begriffe fett, Beispiel, Kopf, Checkliste, Kurztest), Glossar.
- [x] Zufallsmaschine + Musterseite experimente/zufallsversuche (zufallserscheinungen), ich allein: Komponente mit Test, Bild, drei Aufgaben; danach Lernenden-Prüfer (Klasse 7) und Checkpoint Musterseite.
- [x] Seite experimente/relative-haeufigkeit (haeufigkeit-als-schaetzwert): Unteragent nach der Musterseite, eigene Datei, nutzt die Zufallsmaschine.
- [x] Seite experimente/simulationen (simulationen): Unteragent nach der Musterseite, eigene Datei.
- [x] Seite experimente/wahrscheinlichkeit (wahrscheinlichkeitsbegriff) und chapter.yaml experimente: ich allein.
- [x] Recap zu Kapitelanfang zufall (zaehlprinzip, brueche-multiplizieren-dividieren, prozent-grundbegriffe) mit Kurztests; Baumdiagramm-Begriffe wie in der Karte; chapter.yaml, app.yaml Reihenfolge: ich allein.
- [x] Kapitel vierfeldertafel, Seite tafel (vierfeldertafel): Komponente Vierfeldertafel mit Test, Baum und Tafel mit denselben Zahlen, drei Aufgaben; Unteragent möglich nach der Musterseite.
- [x] Seite vierfeldertafel/bedingt (bedingte-wahrscheinlichkeit): Schnelltest mit falsch positiven Ergebnissen, Richtung der Bedingung; Unteragent möglich nach der Musterseite.
- [x] Selbsteinschätzung je Kapitel (selfAssessment), Spieleabend als roter Faden, Kapitelrückblick: ich allein.
<!-- tasks: slices (11 added): one per competency, as written in Plan -->
- [x] **Checkpoint:** the pattern page, after the first slice. A slice in a pattern the app already has: show it to
      the creator and go on. A new pattern: load skill `lernapps-learner-check`, do its learner check, fix what it
      finds, then ask the creator whether the others may follow it, and wait.
      Creator: Musterseite vom Orchestrator in Vertretung des Menschen angenommen (Weiter nach diesem Muster); der Mensch hat npx freigegeben.
- [x] Update the content guide so that it describes the app as it is now (`app-content-matches`).
- [x] Run `npx --no -- lernapps check` until it passes.
- [x] Look at every changed screen, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.

## Commit

<!--
- Publish with the creator's yes. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
-->

### Tasks

- [x] If pages or exercises changed, load skill `lernapps-explainer-self-assessment` and update the self-assessment
      as it says. Commit.
- [ ] Load skill `lernapps-github`. Push the branch, open the preview pull request and see its checks to green, as it
      says.
- [ ] **Checkpoint:** publish. Show what the increment adds and the preview link. Ask whether it may go online. Stop
      and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: the pull request squash-merged into
      `main`, the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm the new content. Never use a derived address.
- [ ] The app is listed and its entry changes (school years, summary): load skill `lernapps-listing` and write the
      changed entry. Else skip this task.
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it. A push of only `.vibe/` publishes nothing.
- [ ] **Checkpoint:** list. The entry changed: open the pull request to the catalog as skill `lernapps-listing`
      says, without asking first, see it to "bestanden", then show the creator the pull request and its result. The
      entry did not change: tell the creator that the catalog updates the app by itself.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

## Review

### Fachlicher Prüfer (zwei Läufe)

- Lauf 1 über alle Seiten und Komponenten-Logik: Fehler behoben: Wahr-Falsch-Aufgabe `summen-doppelt` war mit den Zahlen der Tafel nicht eindeutig (Tafel 12/18/10/10 statt 12/18/8/12), Steckstein-Zahlen passten nicht zur Maschine (jetzt 0,458 und 0,467 bei 1000 Würfen, Aufgaben mit „Stein aus ihrer Kiste“), Option „2,85“ (60 : 21 ≈ 2,86), „Ergebnis“-Widerspruch zwischen Kapitel 1 und `laplace`, „Zeilen- und Spaltensummen“-Satz, Aussagen zu bedingter Wahrscheinlichkeit („meist verschieden“, „kann viel kleiner sein“), Baustein `zufall-ergebnisform` ohne Formwechsel (neue Aufgabe `ergebnisform-wechseln`), Recap ohne Division, Marke „Legostein“ (jetzt „Steckstein“), Leerzeichen vor `%` und `€` (U+00A0). Offen gelassen, bewusst: Vorgriff „ohne Zurücklegen“ in Komponenten von `pfadregel-1` und `gegenereignis` (Bestand, ändert die Reihenfolge der veröffentlichten Seiten nicht), `a/b` in Komponenten-Rückmeldungen (W28, 8 Stellen in `Zufall*.ts` laut Prüfer, in `mistakes` der YAML keine), interne Ids `legostein`.
- Lauf 2 nur auf die Änderungen (`git diff f1afb3a HEAD`): Fehler behoben: `nojs` des Prozent-Kurztests passte nicht zur Frage, „unten rechts“ zweideutig, „Linie unter der Tabelle“ nach Umbau falsch, uneinheitliches „Drehs“, Leerzeichen in `ergebnisform-wechseln`, Satz zu Farben in `laplace` (1/3 stimmt nur für Blau), Fehlermeldung zur Antwort 15. Nicht geprüft vom Prüfer: Tests, Build, Browser, SVG-Dateien (die Tests, Build und `lernapps check` habe ich selbst gelaufen: grün).
- Stichprobe auf wörtliche Übernahme: keine wörtlichen Treffer; allgemeine Merksätze („entlang des Pfades mal, über mehrere Pfade plus“).

### Lernenden-Prüfer (Klasse 7 an der Musterseite, Klasse 8 über alle Seiten, Klasse 9-10 für Kapitel 4, zwei Läufe)

- Musterseite: über 20 Befunde, umgesetzt (letzter Wurf, Diagramm erklärt, Tabelle gab Antworten, Reißzwecke ohne Abschluss, Zuordnung mit unpassender Option).
- Lauf über alle Seiten: umgesetzt: Zufallsmaschine (Linie größer, Achsen 0 und 1, Linie direkt unter den Knöpfen, Vergleichslinie erst nach 100 Würfen), Zelle in der Tafel markiert das Blatt im Baum, Tabellen auf 360 px gekürzt (laplace, pfadregel-2, ohne-zuruecklegen, tafel, bedingt, haeufigkeit, zufallserscheinungen), ersetzte schwache erste Aufgaben (`tafel-gesamt`), neue Aufgaben (`tafel-ergaenzen` mit Material-Tabelle, `zeilen-summe` als wahre Aussage), zweiter Kurztest im Recap, Definitionen Zweig, Knoten, Potenz, Division im Recap.
- Lauf 2 auf die geänderten Stellen: alle Tabellen auf 360 px sichtbar, Tafel-Blatt-Markierung richtig; umgesetzt: die drei Tabellen mit abgeschnittener Summenspalte (jetzt zweispaltige Material-Tabellen), Frage zur Linie, härtere Zuordnung. Nicht umgesetzt: Randsummen der Tafel nicht anklickbar (Absicht, steht auf der Seite), Achsenmarken klein (11 px), Maschinen-Knöpfe „Wurf“ beim Glücksrad.
- **Nach dem letzten Prüferlauf noch geändert:** Satz „Wie verläuft die Linie der Sechsen?“ (Frage umformuliert) und die Aufgaben-Tabellen der Tafel-Seite (inhaltlich: Zuordnung `tafel-zuordnen` nutzt jetzt 20 + 25 = 45, 20 + 15 = 35, 80 − 20 = 60). Diese Stellen hat ein dritter, kurzer Prüflauf (fachlich und als Klasse 9) gelesen: keine Rechenfehler, drei Hinweise zur Formulierung (Zeile „schwimmen“ missverständlich, „Tafel“ und „Rand“ ohne Tafel im Material, Fehlermeldung zur 15), alle umgesetzt. Nach diesem dritten Lauf geändert: nur diese Formulierungen (Zeilenbezeichnungen in der Material-Tabelle, Erklärungstexte); Zahlen und Antworten blieben, ich habe sie nachgerechnet.

### Offen

- Funde zur Laufzeit und zum Werkzeug (nicht behoben, Orchestrator): keine Rückmeldung bei falscher Antwort in Baum-Komponenten (Prüfen grau, nur „Lösung zeigen“); Bruch, Potenz oder „75 Prozent“ im Zahlenfeld gibt „Antworte zuerst: Wähle, tippe oder ordne alles zu“; generische „Lies dazu noch einmal den Text“-Meldung für true-false, ordering, number ohne passende Fehler; „Neue Aufgabe“ nur Symbol; Tipp und Lösung ohne JavaScript sofort sichtbar; Tabellen mit zu breiten Spalten haben keinen Hinweis auf Seitwärts-Wischen; `recap:` hat keine Aufgaben (Kurztest als Komponente); `links:` verlangt das Schema nicht (`lernapps check` besteht ohne); Los-Aufgabe in `laplace` („10 Lose, 2 Gewinne, klick an“) nennt nicht, welche Lose gewinnen; Singular „1 Gewinne“ in der Laplace-Komponente; zwei `mistakes` können denselben Wert haben; Node 22 hier, CI 26.
- Nicht geprüft: SVG-Dateien in `src/images/`, Kontrast im dunklen Modus, Tutor-Seiten.

## Retrospective

<!-- At the end of Commit. Facts, short, no names. Read by review and evals. -->

### Phases reached

Code, Commit offen: Checkpoints Recherche, Plan und Musterseite sind bestanden (vom Orchestrator in Vertretung des Menschen beantwortet, der Mensch hat `npx` freigegeben, damit `plan done --answer` lief). Vorschau-PR #20 offen, Checks laufen. „Veröffentlichen“ noch nicht gemeldet.

### Creator turns after the plan

Menschliche Nachrichten nach der Planbestätigung: 1 (Freigabe für `npx`, vorher eine Frage, ob es die App schon gibt). Rückmeldungen des Orchestrators in Vertretung: 5 (Musterseite, Kurztest-Vorlage, Seiten-ids, Quellen-Link und Simulationsgrenze, Rückmeldungen des Menschen zu #385 als Abschnitt 9 der Regeln).

### Where I had to guess

- Seiten-ids: erst `zufallsversuche` und `wahrscheinlichkeit`, vom Orchestrator auf die Karten-ids korrigiert.
- Tafel-Beispiele (Spieleabend 50 Gäste, Schulfest 80 Gäste, Klassenfahrt 60 Kinder, Schnelltest 1000 Personen) und Steckstein-/Reißzwecken-Gewichte der Maschine (46/34/20 und 35/65 von 100) sind erfunden.
- Begriff „Schätzwert“ vor der Definition von Wahrscheinlichkeit; Notation `P_T(K)` für bedingte Wahrscheinlichkeit (Karte vermerkt „HE: not named“).
- Phasen: Der Unteragent für Bestand B brauchte etwa 20 Minuten, zwei Seiten-Unteragenten brachen am 5-Stunden-Limit ab und mussten fortgesetzt werden; der erste Entwurf der Seiten kam vor den Regeln aus Abschnitt 9 und wurde danach angepasst.
- Ein Befehl (`plan done`) hakte eine Aufgabe ab, obwohl der Schritt davor (Skill ganz lesen) noch fehlte; ich habe es nachgeholt und hier vermerkt. Die `video`-Abschnitte der acht Bestandsseiten sind entfallen (Anker `#video` gibt es nicht mehr).
