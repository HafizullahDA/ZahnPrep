# Design System Strategy: The Focused Academic Editorial

## 1. Overview & Creative North Star: "The Digital Mentor"
This design system moves away from the cluttered, high-anxiety aesthetic typical of exam prep platforms. Instead, it adopts **"The Digital Mentor"** as its Creative North Star. The goal is to create an environment of "Quiet Authority"—a space that feels as prestigious as a high-end university library and as clear as a one-on-one tutoring session.

To break the "template" look, we utilize **Intentional Asymmetry**. Rather than a perfectly centered grid, we lean into a sophisticated editorial layout: wide margins, staggered content blocks, and a high-contrast typography scale that guides the student's eye through complex information without fatigue. We treat the interface as a living document, prioritizing "breathing room" (white space) as a functional tool for cognitive focus.

---

## 2. Color Theory & Atmospheric Depth
Our palette is anchored in a sophisticated Deep Teal (`primary: #006067`), evoking trust and intellectual depth without the aggressive coldness of a dark navy.

### The "No-Line" Rule
Standard UI relies on 1px borders to separate content. In this system, **borders are prohibited for sectioning.** Boundaries must be defined solely through tonal shifts. 
- Use a `surface-container-low` (`#f1f4f4`) section sitting on a `surface` (`#f6fafa`) background to define a sidebar or a content block. 

### Surface Hierarchy & Nesting
Think of the UI as physical layers of fine paper. 
- **Base Layer:** `surface` (`#f6fafa`)
- **Secondary Content Layer:** `surface-container-low` (`#f1f4f4`)
- **Active Interactive Layer:** `surface-container-lowest` (`#ffffff`)
By nesting a `surface-container-lowest` card inside a `surface-container-low` section, you create a natural lift that looks premium and "built-in" rather than "pasted on."

### The "Glass & Gradient" Rule
To add soul to the "Trustworthy" mandate, main CTAs and Hero sections should utilize a subtle **Linear Gradient**:
- **Direction:** 135deg
- **From:** `primary` (`#006067`) to `primary_container` (`#007b83`)
For floating navigation or overlays, use **Glassmorphism**: 
- Background: `surface` at 80% opacity.
- Effect: `backdrop-blur: 12px`.

---

## 3. Typography: The Editorial Voice
We use **Inter** as our sole typeface, relying on a drastic scale and weight variation to create an authoritative hierarchy.

*   **Display Scale (`display-lg` 3.5rem):** Reserved for high-impact motivation or primary landing headers. Use `on_surface` with a `-0.02em` letter spacing for a "tight," professional look.
*   **Headline Scale (`headline-md` 1.75rem):** Use for subject headings (e.g., "Quantitative Aptitude"). This is the student's primary anchor.
*   **Title Scale (`title-md` 1.125rem):** Medium weight. Used for card headers and important labels.
*   **Body Scale (`body-md` 0.875rem):** The workhorse for exam questions and explanations. High line-height (1.6) is mandatory to ensure readability during long study sessions.
*   **Labels (`label-sm` 0.6875rem):** All-caps with `0.05em` letter spacing for metadata (e.g., "TIME REMAINING," "DIFFICULTY").

---

## 4. Elevation & Tonal Layering
Traditional drop shadows are too "software-heavy." We use **Ambient Depth**.

*   **The Layering Principle:** To highlight a specific module (like a Mock Test results card), place a `surface-container-lowest` (`#ffffff`) card on a `surface-dim` (`#d7dbdb`) background.
*   **Ambient Shadows:** If a shadow is required for a floating Modal:
    *   Blur: `32px`
    *   Color: `on_surface` (`#181c1d`) at **4% opacity**.
*   **The "Ghost Border" Fallback:** For input fields where a boundary is functional, use `outline_variant` (`#bdc9ca`) at **20% opacity**. Never use a 100% opaque border.

---

## 5. Component Logic

### Buttons (The "Call to Action")
*   **Primary:** Gradient (`primary` to `primary_container`), `lg` roundedness (`0.5rem`). No border. White text (`on_primary`).
*   **Secondary:** `surface_container_high` background. No border. `primary` text.
*   **Tertiary:** Ghost style. No background. `primary` text with an underline appearing only on hover.

### Input Fields & Search
*   Background: `surface_container_low`. 
*   Shape: `md` roundedness (`0.375rem`).
*   Focus State: Transition background to `surface_container_lowest` and add a 2px "Ghost Border" using `primary`.

### Study Cards & Lists
*   **Strict Rule:** No divider lines between list items. Use vertical spacing `2.5` (`0.85rem`) to separate list elements.
*   **Progress Indicators:** Use the `tertiary` (`#834718`) color for accents like "In Progress" or "Needs Review" to provide a sophisticated contrast to the Teal primary.

### Specialized Component: The "Focus Block"
A large-scale container for exam questions. 
- Background: `surface_container_lowest`.
- Padding: `8` (`2.75rem`) to ensure the student feels no "visual claustrophobia."
- Edge: A soft `xl` (`0.75rem`) corner radius.

---

## 6. Do's and Don'ts

### Do
*   **Use the Spacing Scale Religiously:** Stick to the `3` (1rem), `5` (1.7rem), and `8` (2.75rem) values to maintain rhythmic balance.
*   **Embrace the "Dead Zone":** Leave large areas of the screen empty (using the `24` spacing value) to signify a transition between study topics.
*   **Subtle Animation:** Use 200ms ease-in-out transitions for background color shifts.

### Don't
*   **Don't use Dark Navy:** It feels too corporate and heavy. Stick to the Teal-based `primary`.
*   **Don't use 1px Dividers:** They cut the layout into "boxes." We want a "flow." Use `surface` color shifts instead.
*   **Don't Overuse the Tertiary Orange:** It is an accent for "Warning" or "Action Required" only. If used too much, it loses its authoritative punch.
*   **Don't Center-Align Everything:** High-end editorial design is often left-aligned with generous, asymmetrical right margins.