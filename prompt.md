# NT2 Exam Preparation Platform - Professional SaaS Architecture

## Project Overview
You are acting as a Senior Full-Stack Engineer. Build a production-ready, mobile-first Web Application (PWA) for NT2 Staatsexamen preparation. The app strictly focuses on Programma I (B1) and Programma II (B2) across 4 skills: Spreken, Schrijven, Lezen, and Luisteren.

## Tech Stack
- **Framework:** React with Vite (Strict Mode enabled).
- **Language:** TypeScript (Strict typing is mandatory).
- **Styling:** Tailwind CSS.
- **State Management:** Zustand (Separate stores for `UserProgress` and `ExamContent`).
- **Internationalization (i18n):** `react-i18next` for all UI elements.
- **Icons:** Lucide React.

## Core Architectural Rules
1. **Internationalization Readiness (i18n):** - Never hardcode UI strings (e.g., buttons, navigation) in Turkish or English. Use `react-i18next`.
   - Data contracts must use a dynamic dictionary for translations (e.g., `translations: Record<string, string>`) instead of a specific language key.
2. **Separation of Concerns:** - `ExamContent` (Words, phrases, exam tasks) is READ-ONLY. 
   - `UserProgress` (Scores, completed days, audio blobs, failed flashcards) is READ/WRITE.
3. **Smart Flashcards (Spaced Repetition Ready):** - Vocabulary items have an `isConcreteWord` boolean. The UI must highlight these visually (neon/cyberpunk accent) as they represent stress-induced memory blanks.
4. **Media Handling:** - The `Spreken` module requires a robust Web Audio API implementation with visual timers (20s/30s/120s). Audio should be stored in memory for immediate playback.

## UI/UX Guidelines
- **Theme:** Professional Dark / Dutch-Navy Mode — inspired by the NT2 Dutch national palette.
  - Backgrounds: `#04080f` (midnight navy-black), `#080f1e` (dark navy surface), `#0d1a2a` (card)
  - Borders: `#172840` (blue-tinted border), `#2060d0/25` (royal accent border)
  - Accents: `#f5c432` (warm amber-gold, spreken), `#58b2ff` (sky blue, schrijven), `#30d080` (emerald green, lezen), `#b46aff` (purple, luisteren)
  - Royal accent: `#2060d0` (Dutch royal blue) — used for gradients, dividers, hover highlights
  - Text: `#d8ebff` (cool moonlight), muted: `#6d8faa` (readable blue-gray)
  - Header: `linear-gradient(135deg, #04080f → #091a32 → #050e1a)` — subtle depth gradient
  - Grid: `rgba(32,96,208,0.06)` lines at 40px — visible but refined
- **Layout:** Mobile-first, bottom navigation bar for the 4 core skills, and a top app bar for Level Switcher (B1 <-> B2) and Language Switcher.

## Initial Task
1. Initialize the React+Vite TypeScript project.
2. Create the exact TypeScript interfaces provided in `types.ts`.
3. Set up `react-i18next` with basic EN and TR translation files.
4. Set up the Zustand store (`store.ts`).
5. Build the main Dashboard layout focusing on the "Spreken" module.