---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, as in the app's first plan. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: explore
# prePushFailures: failed pre-push runs of this increment, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: {}
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

- Branch `increment/01-stochastik-ausbau` von `main`; Plan 02, weil die offenen Commit-Aufgaben von Plan 01 einem anderen Branch gehören.
- Kapitel-, Seiten- und Übungs-ids und alle Adressen des Bestands bleiben (öffentlicher Vertrag). Kapitel `zufall` bleibt für Kapitel 2 und 3 des Issues; neu kommen `experimente` (Kap. 1, Klasse 7-8) und `vierfeldertafel` (Kap. 4, Klasse 9-10). Reihenfolge in `app.yaml`: experimente, zufall, vierfeldertafel.
- Erster Commit ist `lernapps update` (0.18.5 / 0.14.0) allein; Befunde zuerst beheben (Orchestrator-Freigabe).
- YouTube und serlo ersatzlos raus (Seiten, `sources`, Tutor-Regeln); `fitness` wird am Ende im Katalogeintrag neu gefasst.
- Voraussetzungen von außen als `recap`-Seite (Begriffe, Beispiele, Kopf, Checkliste) plus eigene Kurztest-Seite direkt dahinter (regeln.md 7.6); Bausteine laut Karte: zaehlprinzip (#386), brueche-multiplizieren-dividieren, prozent-grundbegriffe (#389), haeufigkeiten (#400). Gebaut wird gegen die Karte, die Apps der anderen werden nicht gelesen.
- Baumdiagramm als tragende Darstellung (gleiche Begriffe wie #386): Kapitel 3 greift sie für mehrstufige Versuche auf.
- Die Vierfeldertafel ist neu und läuft als eigene Komponente neben dem Baum (dieselben Zahlen in zwei Darstellungen).
- Musterseite ist eine neue Seite aus Kapitel 1: `experimente/zufallsversuche` mit der Zufallsmaschine (guess: Name der Seite).

## Notes

**Bestand → Baustein** (vorhanden / fehlt)

| Baustein | Stand | Seite |
|---|---|---|
| zufallserscheinungen (Zufallsversuche) | fehlt | experimente/zufallsversuche |
| haeufigkeit-als-schaetzwert | fehlt | experimente/relative-haeufigkeit |
| simulationen | fehlt | experimente/simulationen |
| wahrscheinlichkeitsbegriff | fehlt | experimente/wahrscheinlichkeit |
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
- [ ] **Checkpoint:** research. Show in plain words: the new competencies by chapter, the didactic approach, the
      scope, every "(guess)", the sources and what is unchecked. Stop and wait. Changes: change them, then ask again.

### Answers

<!-- The creator's answers, in their words, one bullet each. -->

## Plan

<!--
- Map the new content onto the app with the guide's patterns. The creator confirms the plan in one read.
- After the yes you work on your own.
-->

### Tasks

- [ ] Load skill `lernapps-content-growth`. Add the tasks of Code as slices, one per competency, in the guide's
      order, one call each: `npx --no -- lernapps plan add --at slices "<task>"`. Say in each which sub-agent may
      write it in parallel, if any.
- [ ] Write "Content method": the guide's patterns, figures and components per slice. Anything new: map it as skill
      `lernapps-explainer-design` says, and say why the guide's patterns do not fit.
- [ ] Draw a sketch of each new component or interactive exercise, in `.vibe/sketches/`.
- [ ] Show the creator, short: goal, new competencies by chapter, slices; in plain words what learners see and do and
      what is new. At most 2 questions.
- [ ] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.

### Content method

<!-- One line each: the guide's patterns, figures and components used, and where; anything new, what it does and
cannot. Something new goes into the guide in the slice that adds it. -->
<!-- An explainer: per figure, model and component its learning action in two to four sentences
(`explainer-representation-explained`); per page its prerequisites the app does not practise, and which get a recap
page, which a link. -->

## Code

<!--
- Build locally on the branch, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first.
-->

### Tasks

- [ ] `git switch -c increment/<NN>-<short name>` from `main`. Commit this plan on it.
- [ ] Load skill `lernapps-cli`. Update the app as its section "Update" says. Commit the update alone and fix its
      findings before any content. The update replaces the `lernapps-*` skills: read again those you use.
- [ ] Load skill `lernapps-explainer` and the content guide.
- [ ] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [ ] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
<!-- tasks: slices: one per competency, as written in Plan -->
- [ ] **Checkpoint:** the pattern page, after the first slice. A slice in a pattern the app already has: show it to
      the creator and go on. A new pattern: load skill `lernapps-learner-check`, do its learner check, fix what it
      finds, then ask the creator whether the others may follow it, and wait.
- [ ] Update the content guide so that it describes the app as it is now (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every changed screen, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.

## Commit

<!--
- Publish with the creator's yes. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
-->

### Tasks

- [ ] If pages or exercises changed, load skill `lernapps-explainer-self-assessment` and update the self-assessment
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

## Retrospective

<!-- At the end of Commit. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, content guide, messages or answers, and your choice. "None" if none. -->
