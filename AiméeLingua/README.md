# AiméeLingua — Fall in love with French.

A self-contained A1 French learning website built in HTML, CSS, and vanilla JavaScript.

## Start

Unzip the folder and open `index.html` in a modern browser. There is no server, account, build command, or external API required for core features. The site works offline with fallback system fonts; Google Fonts may load when online.

## Included

- Home, Lessons, Progress, Settings
- 12 vocabulary lessons and 4 grammar lessons, each with objectives, explanations, reference cards, examples, mini-dialogues and practice
- Distinct Vocabulary and Grammar tabs with independent advancement
- Five click-based grammar activity formats (choose, build, transform, fix, conversation) across applicable lessons, and vocabulary matching/selection
- Randomized 10-question quizzes (70% to pass, unlimited retries)
- Optional staged placement test (5 questions per lesson, 4 correct required, prerequisite-aware credit)
- Saved scores, completion methods, placement attempts, and themes via localStorage
- Four named themes plus custom colors
- Responsive, keyboard-usable controls
- No text-to-speech, hint buttons, typed French exercise or A2+ curriculum

## Files

- `index.html` — Application entry and local script loading
- `styles.css` — Responsive styling and theme palette
- `lessons.js` — 16 lessons and educational material
- `activities.js` — Interactive practice content
- `quizzes.js` — Question banks and quiz selection logic
- `placement.js` — Staged placement and credit policy
- `storage.js` — Progress, theme, and placement persistence
- `app.js` — Page rendering, navigation, and interactions

## Extending lessons

Add a lesson with a stable `vN` or `gN` ID in `lessons.js`, with vocabulary, examples, and conversation. Provide contextual question prompts in `CONTEXTS` or grammar questions in `GRAMMAR_EXTRA` within `quizzes.js`. Add matching activity configurations in `activities.js`. Preserve IDs once learners have saved progress. Version the storage format if its shape changes.

## Placement policy

Placement checks five randomized questions for each lesson in order within each track. At least four of five correct are required for credit. A failed lesson stops placement in that track to avoid skipping prerequisites; the other track is assessed independently. Repeated placement cannot remove previously earned credit. This is **curriculum placement**, not CEFR certification.

## Storage and limitations

Progress remains in the same browser and origin, not across devices. Storage for `file://` documents varies by browser: if persistence does not work, use a simple local static server or host the site on a static web host. Theme selection is saved separately from learning progress. No server data is collected.

## QA suggestions

Use a fresh browser profile or clear localStorage to test first-run onboarding. Check both Lessons tabs, run practice on a phone-width display, confirm that 6/10 fails and 7/10 passes, ensure previously passed lessons remain complete after a failed retake, verify localStorage persistence, and retake placement to confirm credits remain. See `qa_report.txt` for automated static checks.
