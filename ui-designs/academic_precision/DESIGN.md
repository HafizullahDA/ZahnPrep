```markdown
# Design System Document: The Academic Architect

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Dean’s Office"**
The objective of this design system is to move beyond the "SaaS-dashboard-in-a-box" aesthetic. We are building a space that feels authoritative, quiet, and intellectually stimulating. Instead of loud marketing colors and rigid grids, we employ **Editorial Sophistication**. 

We break the "template" look through:
*   **Intentional Asymmetry:** Off-center hero layouts and staggered content cards that guide the eye like a high-end academic journal.
*   **Breathable Authority:** Utilizing expansive white space (using the `20` and `24` spacing tokens) to allow complex AI data to settle without overwhelming the student.
*   **Tonal Depth:** Replacing 1px borders with layered surfaces to create a sense of physical, architectural space.

---

## 2. Colors & Surface Logic
The palette is rooted in a deep, nocturnal Navy (`#001F3F`), evoking the "midnight oil" of serious study, contrasted against a crisp, paper-like background.

### The "No-Line" Rule
**Strict Directive:** 1px solid borders are prohibited for sectioning. Boundaries must be defined solely through background color shifts or tonal transitions. 
*   *Correct:* A `surface-container-low` (`#f3f4f5`) sidebar sitting against a `surface` (`#f8f9fa`) main content area.
*   *Incorrect:* Using `outline` to draw a box around a sidebar.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked sheets of fine vellum.
1.  **Base:** `surface` (`#f8f9fa`) - The primary canvas.
2.  **Sectioning:** `surface-container-low` (`#f3f4f5`) - Use for large structural backgrounds.
3.  **Elevation:** `surface-container-lowest` (`#ffffff`) - Use for the "active" card or workspace to make it pop forward.

### Signature Textures & Glass
*   **The AI Pulse:** For main CTAs and Hero sections, use a subtle linear gradient transitioning from `primary_container` (`#001f3f`) to `primary` (`#000613`) at a 135-degree angle.
*   **Glassmorphism:** For floating navigation or AI modal overlays, use `surface_container_lowest` at 80% opacity with a `backdrop-filter: blur(12px)`. This ensures the academic context remains visible underneath the active task.

---

## 3. Typography
We utilize a dual-sans-serif pairing to distinguish between "The Guide" (Manrope) and "The Content" (Inter).

*   **Display & Headlines (Manrope):** These are our "Editorial" voices. `display-lg` (3.5rem) should be used with tight letter-spacing (-0.02em) to create a bold, authoritative impact.
*   **Body & Labels (Inter):** Inter provides the high-legibility required for long-form exam questions. 
*   **Hierarchy Tip:** Use `on_surface_variant` (`#43474e`) for `body-md` secondary information to create a natural typographic contrast without shifting font weights.

---

## 4. Elevation & Depth

### The Layering Principle
Avoid "Drop Shadow" presets. Depth is achieved via **Tonal Layering**. 
*   **Nested Elevation:** To highlight an AI-generated explanation, place a `surface_container_highest` (`#e1e3e4`) block inside a `surface_container_low` (`#f3f4f5`) section. The shift in value creates focus more effectively than a line.

### Ambient Shadows
If a "floating" element (like a FAB or Popover) is required:
*   **Value:** `0px 20px 40px rgba(0, 31, 63, 0.06)`. 
*   **Logic:** The shadow color must be a tinted version of our `primary_container`, never pure black. It should feel like an ambient glow rather than a harsh drop shadow.

### The "Ghost Border" Fallback
Where accessibility requires a container boundary (e.g., Input Fields):
*   Use `outline_variant` at **20% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons (The "Scholar" Variant)
*   **Primary:** Gradient of `primary_container` to `primary`. Roundedness: `md` (`0.375rem`). No border. High contrast white text.
*   **Secondary:** `surface_container_high` background with `on_primary_fixed_variant` text.
*   **Tertiary/Ghost:** No background. Text uses `primary` with an underline that only appears on hover.

### AI Insight Cards
*   **Style:** No borders. Background: `surface_container_lowest`. 
*   **Spacing:** Use `8` (2rem) internal padding. 
*   **Accents:** A 4px vertical "accent bar" on the left using `tertiary_container` (`#001d45`) to mark AI-generated content.

### Input Fields
*   **Style:** Minimalist. `surface_container_low` background. 
*   **Focus State:** Transition background to `surface_container_lowest` and add a "Ghost Border" of `primary` at 20%.

### Progress Indicators (Academic Mastery)
*   Instead of thin lines, use thick, architectural bars. 
*   **Track:** `surface_container_high`.
*   **Indicator:** `primary_container`.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins (e.g., `ml-24`, `mr-12`) in desktop layouts to create an editorial feel.
*   **Do** use `display-sm` for section headers instead of just bolding body text.
*   **Do** leverage `primary_fixed_dim` for subtle icons to maintain the "Navy" theme without the weight of the darkest tones.

### Don't
*   **Don't** use dividers or horizontal rules (`<hr>`). Use a `12` (3rem) vertical gap to separate content blocks.
*   **Don't** use pure black (`#000000`) for text. Use `on_surface` (`#191c1d`) to maintain a premium, ink-on-paper feel.
*   **Don't** use "Alert Red" for errors unless critical. For validation, use `error` (`#ba1a1a`) but keep the container `error_container` very light to avoid breaking the "Calm" aesthetic.

---

## 7. Spacing Philosophy
We use a **Soft Grid**. While the system uses a 4px-based scale, the *application* should favor larger steps. 
*   **Mobile:** Standardize on `4` (1rem) for edge margins.
*   **Desktop:** Standardize on `16` (4rem) for section breathing room. 
*   **Pro Tip:** If a layout feels "crowded," do not reduce the font size; increase the spacing token by two levels (e.g., move from `8` to `12`).```