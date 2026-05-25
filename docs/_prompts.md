# FloWedding Copilot Prompts

Use these prompts in VSCode Copilot Chat.

--------------------------------------------------

## 1. Architecture Update Prompt

Analyze the selected code change in this React project.

Update ONLY if needed:
docs/01-architecture.md

Focus:
- folder responsibility changes
- new/removed layers
- component/section boundary changes
- structural decisions

Rules:
- do NOT rewrite full doc
- only patch affected section
- keep explanation concise and architecture-level

Output:
- summary of change
- impacted architecture layer
- markdown patch only

--------------------------------------------------

## 2. State Flow Update Prompt

Analyze state changes in this code.

Update ONLY:
docs/03-state-flow.md

Focus:
- state ownership (who owns state)
- state update flow (who triggers change)
- UI impact (what re-renders)
- interaction flow (user action → state → UI)

Rules:
- ignore trivial local UI state
- focus only on shared/important state
- keep flow diagram style

Output:
- state flow diagram
- ownership mapping
- updated markdown section only

--------------------------------------------------

## 3. Animation System Prompt

Analyze animation-related code changes.

Update ONLY:
docs/04-animation-system.md

Focus:
- scroll animations
- parallax logic
- reveal behavior
- timing/easing consistency

Rules:
- separate logic vs CSS
- avoid describing code line-by-line
- focus on system behavior

Output:
- animation flow explanation
- system impact
- markdown patch only

--------------------------------------------------

## 4. Technical Debt Prompt

Analyze current or changed code for architectural risks.

Update ONLY:
docs/07-technical-debt.md

Focus:
- duplication
- tight coupling
- oversized components
- animation inconsistency
- state scattering
- scalability risks

Rules:
- only meaningful risks
- no nitpicks
- prioritize impact severity

Output:
- risk list
- impact explanation
- suggested fix
- markdown patch only

--------------------------------------------------

## 5. Refactor Log Prompt

If refactor is detected:

Update ONLY:
docs/08-refactors.md

Focus:
- structural refactors
- hook extraction
- architecture changes
- system improvements

Rules:
- record WHY, not HOW
- avoid code details
- keep history chronological

Output:
- refactor summary
- reason
- impact
- markdown entry only