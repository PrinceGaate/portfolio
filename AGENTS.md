# PRINCE.OS — AI DEVELOPMENT INSTRUCTIONS

## 1. PROJECT IDENTITY

PRINCE.OS is a personal developer portfolio built as an interactive fictional operating system / CRT terminal.

The portfolio is simultaneously:

1. A production portfolio.
2. A practical Web Development learning project.
3. A demonstration of React, TypeScript, UI engineering, state management and frontend architecture.

The visual identity is intentionally:

- CRT terminal
- monochrome green phosphor
- retro operating system
- technical
- minimal
- dark
- terminal-driven
- keyboard-friendly

Do NOT redesign this into a conventional modern portfolio.

---

# 2. CURRENT STACK

The project currently uses:

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Custom CSS

Existing architecture includes:

src/
├── assets/
├── components/
│   ├── layout/
│   └── terminal/
├── hooks/
├── screens/
├── App.tsx
├── App.css
├── index.css
└── main.tsx

Existing important components include:

- AnalogLayout
- CRTOverlay
- Footer
- OSLayout
- SideNavBar
- TopAppBar
- BootSequence
- CommandPrompt
- TerminalShell

Existing hook:

- useTerminal

Do not replace working architecture without a clear technical reason.

---

# 3. CURRENT PRODUCT STATE

The project already has:

- boot experience
- hero/landing experience
- terminal aesthetic
- CRT overlay
- OS layout
- sidebar
- top bar
- footer
- home screen
- terminal components
- basic navigation/state
- terminal command handling

Several portfolio modules are currently placeholders or incomplete.

The purpose of the current development session is to complete the portfolio around those existing foundations.

---

# 4. IMPORTANT DEVELOPMENT DECISION

## PROJECTS ARE NOT BEING BUILT TODAY.

The Projects module is intentionally postponed.

I am currently following a 7-day Web Development learning plan.

After that plan, the Projects section will be populated with stronger technical projects.

Therefore:

PROJECTS TODAY:

STATUS: UNDER DEVELOPMENT

Do not build:

- project cards
- project filtering
- project detail pages
- project CMS
- project search
- project animations
- project data architecture

unless specifically requested later.

Keep the module structurally ready.

---

# 5. TODAY'S OBJECTIVE

Complete and polish:

1. Home / Directory
2. About Me
3. Skills / Diagnostics
4. Methods / Development Workflow
5. Contact
6. Resume
7. User Manual
8. Navigation
9. Keyboard interaction
10. Accessibility
11. Responsive/mobile layout
12. CRT polish
13. Production cleanup
14. Production build
15. Deployment preparation

Goal:

Deploy PRINCE.OS today.

---

# 6. USER PROFILE

The portfolio must represent the developer honestly.

Current positioning:

Software Developer / Full-Stack Developer in active development.

Current focus includes:

- JavaScript
- Python
- SQL
- HTML/CSS
- React
- Node.js
- Express
- backend engineering
- AI/LLM applications
- Machine Learning

The portfolio should communicate:

- active learning
- practical development
- backend/full-stack direction
- AI interest
- continuous improvement
- project-oriented development

DO NOT invent:

- senior-level experience
- 10+ years experience
- companies
- clients
- employment history
- internships that do not exist
- fake achievements
- fake awards
- fake statistics
- fake testimonials

Do not copy fake profile information from visual references.

---

# 7. VISUAL REFERENCES

Reference screenshots establish the visual direction only.

They are NOT sources of factual portfolio content.

Use them for:

- layout
- information density
- CRT style
- typography
- green phosphor aesthetic
- terminal panels
- system diagnostics
- directory presentation
- visual hierarchy

Do not copy:

- fake names
- fake companies
- fake experience
- fake skill percentages
- fake education
- fake project claims

---

# 8. ARCHITECTURE RULES

Before modifying code:

1. Inspect the existing implementation.
2. Understand the current architecture.
3. Reuse existing components.
4. Reuse existing hooks.
5. Reuse existing state/navigation where reasonable.
6. Avoid unnecessary dependencies.
7. Avoid unnecessary rewrites.

Prefer:

- small components
- reusable components
- typed data
- clear props
- component composition
- existing styling patterns
- data-driven rendering

Avoid:

- giant components
- duplicated JSX
- unnecessary global state
- unnecessary context
- unnecessary routing
- unnecessary dependencies
- `any`
- magic values scattered throughout components

Do not introduce React Router unless the current architecture genuinely requires routing.

Do not introduce Redux/Zustand unless genuinely necessary.

---

# 9. LEARNING-FIRST DEVELOPMENT

This project is also my Web Development practice.

Every meaningful feature must be classified as:

### 🟢 YOU CODE

I should implement the important learning concept myself.

Examples:

- useState
- props
- map()
- conditional rendering
- event handlers
- basic components
- TypeScript interfaces
- basic hooks
- basic responsive CSS

### 🟡 PAIR

I implement the core concept with guidance.

Examples:

- navigation state
- modal behavior
- keyboard navigation
- custom hooks
- component composition
- TypeScript architecture

### 🔵 AGENT

AI can implement the work.

Examples:

- repetitive CSS
- CRT effects
- visual polish
- accessibility cleanup
- repetitive markup
- refactoring
- debugging
- build fixes
- deployment configuration

IMPORTANT:

If a task is 🟢 YOU CODE:

DO NOT silently implement it.

Instead explain:

1. What concept is involved.
2. What I need to write.
3. Where I need to write it.
4. What behavior should result.

Then wait for my implementation.

After I implement it, review it.

---

# 10. DEVELOPMENT LOOP

Every feature follows:

PLAN
↓
LEARN
↓
IMPLEMENT
↓
REVIEW
↓
TEST
↓
POLISH

Before implementation provide:

FEATURE
FILES
CONCEPTS
WORK TYPE

After implementation provide:

WHAT CHANGED
WHY
IMPORTANT CODE
TESTS
PRACTICE TASK

Do not provide unnecessary explanations of trivial syntax.

---

# 11. HOME / DIRECTORY

The root directory should expose:

PROJECTS
SKILLS
ABOUT_ME
METHODS
CONTACT
RESUME

Projects:

STATUS: UNDER DEVELOPMENT

The Home screen should feel like the root filesystem of PRINCE.OS.

---

# 12. ABOUT ME

Create a concise professional developer profile.

Possible structure:

IDENTITY
CURRENT FOCUS
TECHNICAL DIRECTION
LEARNING
INTERESTS

Do not create a conventional long biography.

The content should fit the operating-system metaphor.

---

# 13. SKILLS / DIAGNOSTICS

Categories:

## CORE

JavaScript
Python
SQL
HTML/CSS

## BACKEND

Node.js
Express
REST APIs
FastAPI

## FRONTEND

React
Vite
Tailwind

## AI / DATA

Machine Learning
PyTorch
LLM / AI integration
AI-assisted development

IMPORTANT:

Do not use fake objective percentages such as:

95%
90%
85%

Instead use:

- learning status
- exposure
- qualitative levels
- non-deceptive visual indicators

The screen should look like a diagnostic system without making false claims.

---

# 14. METHODS

Create a developer workflow module.

Core flow:

UNDERSTAND
↓
PLAN
↓
IMPLEMENT
↓
TEST
↓
DEBUG
↓
DEPLOY
↓
ITERATE

Make it feel like a system process rather than a blog post.

---

# 15. CONTACT

Use only real information available in the project.

Never invent:

- email
- phone
- GitHub
- LinkedIn
- social accounts

If information is unavailable:

use a clear placeholder.

---

# 16. RESUME

If a real resume PDF exists:

connect it.

If no real resume exists:

do not fabricate one.

Display:

RESUME.TXT

STATUS:
RESOURCE NOT CONNECTED

Provide a clear location for connecting the real resume later.

---

# 17. USER MANUAL

Create a reusable UserManual component.

Suggested:

src/components/system/UserManual.tsx

The manual should explain:

## NAVIGATION

Mouse
Enter
Escape
F1
Terminal commands

## MODULES

Directory
About
Skills
Methods
Contact
Resume
Projects

Projects:

STATUS: UNDER DEVELOPMENT

## SYSTEM

Explain:

PRINCE.OS is an interactive developer portfolio designed as a fictional operating system.

The modal must:

- open from visible UI
- close with close button
- close with Escape
- be keyboard accessible
- have dialog semantics
- have reasonable focus handling
- work on mobile
- match CRT styling

The modal's state management is a learning task.

---

# 18. TERMINAL COMMANDS

Review useTerminal.ts.

Ensure commands match actual modules.

At minimum:

help
home
about
skills
methods
contact
resume
projects
clear
exit

Do not leave commands that point to nonexistent modules.

---

# 19. KEYBOARD

Preserve:

ESC = BACK

Add where practical:

F1 = USER MANUAL

Do not create unnecessary keyboard complexity.

---

# 20. RESPONSIVE DESIGN

Must work on:

desktop
laptop
tablet
mobile

Do not merely shrink desktop.

Check:

- sidebar
- terminal windows
- modal
- typography
- buttons
- touch targets
- overflow
- text wrapping

No accidental horizontal scrolling.

---

# 21. ACCESSIBILITY

Use:

- semantic buttons
- keyboard-accessible controls
- visible focus
- appropriate aria labels
- dialog semantics
- Escape handling
- reduced-motion support

Do not sacrifice the CRT aesthetic unnecessarily.

---

# 22. CRT

Preserve:

- scanlines
- green phosphor glow
- terminal borders
- cursor
- subtle flicker
- dark background
- CRT overlay

Do not overdo effects.

Text must remain readable.

Respect:

prefers-reduced-motion

where practical.

---

# 23. CODE QUALITY

Before committing changes:

Check:

- TypeScript
- imports
- unused code
- duplicate components
- console errors
- accessibility
- responsive behavior
- runtime behavior

Prefer strict typing.

Avoid `any`.

Do not create unnecessary abstractions.

---

# 24. PROJECT HYGIENE

Inspect:

package.json
index.html
.gitignore

Remove obvious template leftovers where appropriate.

Examples:

tmp_app
Vite favicon
Vite metadata

Do not delete required assets without checking usage.

Ensure:

node_modules
dist
.env
environment secrets

are not committed.

---

# 25. TESTING

Before deployment:

npm run build

Then verify:

BOOT
HOME
DIRECTORY
ABOUT
SKILLS
METHODS
CONTACT
RESUME
USER MANUAL
PROJECTS PLACEHOLDER

Also verify:

ESC
F1
buttons
keyboard
mobile
responsive layout
external links
console errors

---

# 26. DEPLOYMENT

Do not claim deployment succeeded unless it actually succeeded.

Build first.

Fix errors.

Preview production.

Then deploy using the configured provider.

If provider configuration is missing:

tell me exactly what is required.

Do not make unnecessary infrastructure changes.

---

# 27. WORK ORDER

PHASE 0
Audit

PHASE 1
Home + Navigation

PHASE 2
About

PHASE 3
Skills

PHASE 4
Methods

PHASE 5
Contact + Resume

PHASE 6
User Manual

PHASE 7
Keyboard + Accessibility

PHASE 8
Responsive

PHASE 9
CRT Polish

PHASE 10
Production Testing

PHASE 11
Deployment

Do not execute all phases at once.

---

# 28. FIRST ACTION

Perform PHASE 0 only.

Inspect the existing project.

DO NOT modify application code yet.

Return:

1. Architecture
2. Working features
3. Missing features
4. Existing reusable components
5. Existing hooks
6. Navigation/state architecture
7. Problems
8. Exact Phase 1 plan
9. 🟢 YOU CODE
10. 🟡 PAIR
11. 🔵 AGENT
12. Concepts I should learn

STOP.

Wait for further instruction.