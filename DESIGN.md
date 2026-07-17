---
name: Chapinismos
description: Bilingual Guatemalan slang dictionary — cultural bridge between Guatemala's voice and the world
colors:
  primary: "#4997d0"
  primary-light: "#5fa8dc"
  primary-dark: "#3885bd"
  primary-deep: "#1f5e9c"
  primary-hover: "#2973c1"
  link-dark: "#60a5fa"
  link-light: "#1f5e9c"
  dark-bg: "#0a0e13"
  dark-bg-accent: "#0f1419"
  dark-card: "#16202a"
  dark-card-hover: "#1c2832"
  dark-text: "#e8f2ff"
  dark-text-secondary: "#d1e3f5"
  dark-muted: "#a0b8d1"
  dark-border: "#1e2937"
  light-bg: "#f8fafc"
  light-bg-accent: "#eff6fc"
  light-card: "#ffffff"
  light-card-hover: "#f1f5f9"
  light-text: "#0f172a"
  light-text-secondary: "#1e293b"
  light-muted: "#334155"
  light-border: "#e2e8f0"
  amber-accent: "#f59e0b"
typography:
  display:
    fontFamily: "Alice, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "'Baloo 2 Variable', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  heading:
    fontFamily: "Alice, Georgia, serif"
    fontSize: "clamp(1.8rem, 2.4vw, 2.6rem)"
    fontWeight: 700
    lineHeight: 1.2
  label:
    fontFamily: "'Baloo 2 Variable', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary-deep}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.dark-card}"
    textColor: "{colors.dark-text}"
    rounded: "{rounded.xl}"
    padding: "24px"
  card-hover:
    backgroundColor: "{colors.dark-card-hover}"
    textColor: "{colors.dark-text}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input:
    backgroundColor: "{colors.dark-card}"
    textColor: "{colors.dark-text}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: Chapinismos

## 1. Overview

**Creative North Star: "The Cultural Bridge"**

This is a design system built for a living dictionary — a place where Guatemalan words come alive, where language is celebration, not cataloguing. Every surface exists to make a visitor feel the warmth of Guatemalan culture while navigating with the confidence of a well-organized reference. The design bridges two worlds: scholarly rigor (validated content, structured data, clean hierarchy) and cultural playfulness (animated ticker, glowing accents, gradient word headings). It bridges two languages: Spanish and English are treated as native equals, never primary-and-translation. It bridges two moods: the authority of a reference work and the delight of discovering your abuela's favorite expression in a beautiful interface.

The system rejects four aesthetic families with equal force: generic dictionary sterility (Merriam-Webster, RAE), SaaS dashboard soullessness, poverty-as-aesthetic favela-chic, and the generic AI look of cream backgrounds and gradient text headers. Chapinismos looks like someone who has actually been to Guatemala designed it — vibrant, warm, opinionated, and proud.

**Key Characteristics:**

- Dark-first dual theme with blue glow accents that feel like Guatemalan sky
- Serif display headings (Alice) paired with a warm rounded sans (Baloo 2) — editorial warmth, not clinical precision
- Tonal layering over shadows: depth through color contrast, not drop shadows
- Animated word ticker as signature interaction — language in motion
- Bilingual-native: every component works in both languages without layout breaks

## 2. Colors

The palette is built around a single signature hue — Guatemalan Sky Blue — supported by a deep dark foundation and clean light alternative. The blue carries cultural identity, not just brand recognition.

### Primary

- **Guatemalan Sky Blue** (#4997d0): The brand signature. Used for primary actions, links, focus rings, the glowing ticker dots, and the badge accents. This is the color of a clear Guatemala City afternoon — warm, bright, unapologetic.
- **Sky Blue Light** (#5fa8dc): Hover states, lighter accents, gradient endpoints. A breath of air above the primary.
- **Sky Blue Dark** (#3885bd): Active states, pressed buttons. The primary's shadow side.
- **Sky Blue Deep** (#1f5e9c): Button backgrounds, CTA surfaces. Dense, confident, always with white text.
- **Sky Blue Hover** (#2973c1): Button hover state. Slightly brighter than deep, never jarring.

### Neutral (Dark Theme)

- **Night** (#0a0e13): Body background. The deep dark canvas that makes blue accents glow.
- **Midnight** (#0f1419): Background accent, radial gradient endpoints. Slightly lifted from body.
- **Slate Card** (#16202a): Card surfaces, input backgrounds. The default content container.
- **Slate Hover** (#1c2832): Card hover state. Subtle lift through warmth.
- **Arctic Text** (#e8f2ff): Primary text on dark. High contrast, slightly blue-tinted for harmony.
- **Frost Secondary** (#d1e3f5): Secondary text on dark. Softer, still readable.
- **Mist** (#a0b8d1): Muted text, timestamps, labels. The quietest voice on dark.
- **Border Dark** (#1e2937): Dividers, card borders, input borders. Structural, never decorative.

### Neutral (Light Theme)

- **Cloud** (#f8fafc): Body background. Clean, true off-white with the faintest cool cast.
- **Ice Accent** (#eff6fc): Background accent for highlighted sections.
- **White Card** (#ffffff): Card surfaces. Pure white against the tinted body.
- **Pebble Hover** (#f1f5f9): Card hover on light. Warm gray shift.
- **Ink** (#0f172a): Primary text on light. Maximum contrast, near-black.
- **Charcoal** (#1e293b): Secondary text on light. Dark but not black.
- **Slate** (#334155): Muted text on light. Reserved for labels and timestamps.
- **Border Light** (#e2e8f0): Dividers and borders on light surfaces.

### Named Rules

**The Sky Blue Rule.** The primary blue is used on ≤15% of any given screen. Its power comes from its restraint against the dark canvas. When every accent is sky blue, none of them stand out.

**The Glow Rule.** Blue glow (box-shadow with primary rgba) is reserved for interactive focus states and the ticker's signature dots. It is never used as ambient decoration.

## 3. Typography

**Display Font:** Alice (with Georgia, serif fallback)
**Body Font:** Baloo 2 Variable (with system sans-serif fallback)

**Character:** The pairing is deliberate contrast — Alice's elegant serif strokes carry cultural weight and editorial authority, while Baloo 2's rounded, warm geometry feels approachable and distinctly Latin American. This is not a neutral corporate stack; it has personality. The serif says "this is a real reference work," the sans says "and it's for everyone."

### Hierarchy

- **Display** (700 weight, clamp(2rem, 5vw, 3rem), line-height 1.15): Word detail page headings — the hero moment for each entry. Used with gradient text treatment (blue-to-purple).
- **Headline** (700 weight, clamp(1.8rem, 2.4vw, 2.6rem), line-height 1.2): Section headings on the home page — "Featured Words," "Latest Added," etc. Always Alice.
- **Title** (700 weight, 1.5rem, line-height 1.3): Subsection headings within articles and cards.
- **Body** (400 weight, 1rem, line-height 1.7): All prose content — definitions, examples, about text. Max line length 65ch for readability.
- **Label** (600 weight, 0.75rem, letter-spacing normal): Category badges, timestamps, navigation items. Always Baloo 2.

### Named Rules

**The Alice Rule.** Alice is reserved for headings that introduce content (h1, h2). It is never used for body text, labels, or UI chrome. When in doubt, Baloo 2.

**The Gradient Accent Rule.** Gradient text (background-clip: text) is used only on the primary h1 — the word heading on detail pages and the hero title. It is never applied to section headings, body text, or navigation. One gradient moment per page, maximum.

## 4. Elevation

This system uses tonal layering, not shadows, as its primary depth language. Cards sit on the surface through color contrast (dark card #16202a on dark bg #0a0e13; white card #ffffff on cloud #f8fafc), not through drop shadows. Shadows exist but are reserved for two specific roles: structural card lift on hover, and the signature blue glow on interactive focus.

### Shadow Vocabulary

- **Card Default** (`box-shadow: 0 1px 2px rgba(0,0,0,0.1)`): Nearly invisible. The card's border does the work.
- **Card Hover** (`box-shadow: 0 2px 8px rgba(0,0,0,0.15)`): Subtle lift on hover. Structural, not decorative.
- **Card Elevated** (`box-shadow: 0 4px 12px rgba(0,0,0,0.2)`): Modal-like surfaces. Rare.
- **Primary Glow** (`box-shadow: 0 2px 8px rgba(73,151,208,0.08)`): Focus rings, active states. The blue glow that defines the brand's interactive feel.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (hover, elevation, focus). The exception is the primary glow, which is reserved for interactive focus and never used as ambient decoration.

## 5. Components

### Buttons

- **Shape:** Gently curved (12px radius). Not pill-round, not sharp.
- **Primary:** Sky Blue Deep background (#1f5e9c), white text, 12px 24px padding. Box-shadow with blue tint for depth.
- **Hover:** Sky Blue Hover background (#2973c1), slight upward shift (-translate-y-0.5), shadow deepens. Transition: 200ms ease.
- **Active:** Scale down to 0.95. Tactile feedback without bounce.
- **Secondary / Ghost:** Card background with border, text uses link color. No fill, no shadow.

### Cards

- **Corner Style:** Gently rounded (20px radius for article cards, 16px for word cards).
- **Background:** Dark card (#16202a) on dark theme, white (#ffffff) on light. The card-with-gradient variant uses a linear gradient from card to bg-accent.
- **Shadow Strategy:** Flat by default. Hover lifts with 2px shadow. Blue border appears on hover for interactive cards.
- **Border:** 1px solid, using the theme's border token. Structural, never decorative.
- **Internal Padding:** 24px (standard), 16px (compact word cards).

### Inputs / Fields

- **Style:** Dark card background, border in theme border color, 12px radius. Clean and integrated.
- **Focus:** Blue border highlight, subtle primary glow. The search box is the hero input — full-width, prominent.
- **Error:** Amber accent (#f59e0b) border-left stripe on correction links. Used sparingly.

### Navigation

- **Style:** Horizontal nav on desktop, hamburger on mobile. Navigation items use the nav-link utility: transparent background, border on hover, card-hover background shift.
- **Typography:** Baloo 2, 14px, font-weight 600. Same weight as body, slightly smaller.
- **Active State:** Primary color text, no background fill.
- **Mobile:** Slide-in menu with full-width items. Language switcher and theme toggle always visible.

### Ticker (Signature Component)

The animated word ticker is the site's most distinctive element. Rows of words scroll horizontally at different speeds, each word a clickable card with a glowing blue dot. On hover, words lift and scale. The vibrant variant adds a conic-gradient sheen animation and gradient text treatment on the words. This is language in motion — the dictionary literally moves.

- **Word Chip:** Card background, border, 12px radius, 4px 16px padding. Hover: lift + scale + blue border.
- **Glowing Dot:** 8px circle with radial gradient (white center to primary blue), animated pulse. The ticker's visual heartbeat.
- **Scroll:** CSS keyframe translateX, 22-28s per row. Reverses on alternate rows. Pauses on hover.
- **Fade Edges:** Gradient masks on left/right edges for clean scroll-off.

### Search Box

- **Style:** Full-width, card background, prominent border, generous padding (12px 16px). The hero input.
- **Keyboard Shortcut Hint:** Inline kbd element showing "/" shortcut. Subtle, useful.
- **Results:** Word cards appear below as a grid. No dropdown — results expand the page.

## 6. Do's and Don'ts

### Do:

- **Do** use the dark theme as the default canvas. It's the brand's native habitat. Light theme exists as an alternative, not the primary.
- **Do** let the blue do the talking. The primary accent is Guatemalan Sky Blue (#4997d0) — use it on links, focus rings, badges, and the ticker's glowing dots. Its restraint is its power.
- **Do** treat Spanish and English as native equals. Both languages get the same visual weight, the same typography care, the same layout treatment. Neither is "secondary."
- **Do** use Alice serif for headings that introduce content. It carries cultural weight and editorial authority.
- **Do** use tonal layering for depth. Cards sit on the surface through color contrast, not drop shadows. Shadows appear only on hover or focus.
- **Do** animate the ticker. It's the site's signature. Words should scroll, glow, and respond to hover. Language in motion.
- **Do** use gradient text on the primary h1 only — the word heading on detail pages and the hero title. One gradient moment per page, maximum.
- **Do** respect reduced motion. Every animation has a `prefers-reduced-motion: reduce` alternative — typically a crossfade or instant transition.
- **Do** use the contribution form as a first-class feature. It says "this dictionary belongs to everyone."

### Don't:

- **Don't** use generic dictionary aesthetics — sterile grids, clinical typography, academic gray. Chapinismos is alive, not encyclopedic. This is not Merriam-Webster or RAE.
- **Don't** use SaaS dashboard patterns — card grids with icon + heading + text repeated endlessly, metric templates, corporate palettes. This is a cultural reference, not a productivity tool.
- **Don't** use poverty-as-aesthetic — grungy textures, "authentic" rough edges, or patronizing design that treats "Guatemalan" as a license for lo-fi. Guatemala is vibrant, not a charity case.
- **Don't** use the generic AI aesthetic — cream/sand/beige backgrounds, warm neutral palettes, gradient text headers on every section, numbered section markers (01/02/03), identical card grids, tiny uppercase tracked eyebrows. This site must look like someone who has actually been to Guatemala designed it.
- **Don't** use border-left or border-right greater than 1px as a colored accent on cards, list items, or callouts. Use full borders, background tints, or nothing.
- **Don't** apply gradient text to section headings, body text, or navigation. The gradient is reserved for the h1 hero moment only.
- **Don't** use glassmorphism, backdrop-blur cards, or frosted glass effects decoratively. The ticker's vibrant variant uses backdrop-blur functionally, not as a style statement.
- **Don't** animate layout properties (width, height, margin, padding) unless truly needed. Stick to transform, opacity, and box-shadow.
- **Don't** use bounce or elastic easing curves. Ease-out with exponential curves (quart, quint, expo). Premium, not playful.
- **Don't** add numbered section markers (01 / 02 / 03) above sections. The one numbered sequence on one page is voice; numbered eyebrows on every section is AI grammar.
