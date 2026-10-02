// Journal post: Design Systems: Why You Need One. Data only — rendered by app/blog/[slug].
export const post = {
  "slug": "design-systems-why-you-need-one",
  "title": "Design Systems: Why You Need One",
  "description": "A design system for a one-person site: a palette sampled from a single photograph, one type family across three widths, and structure that carries meaning.",
  "date": "2026-10-02",
  "updated": "2026-10-02",
  "category": "Design",
  "tags": [
    "design systems",
    "design tokens",
    "css custom properties",
    "typography",
    "colour",
    "accessibility"
  ],
  "summary": "A design system is a small set of named decisions — colours, type, spacing and structure — written down once and reused everywhere. Even a one-person site gains from one: consistent pages, faster decisions and fixes that land everywhere at once. This site's palette comes from a single photograph, and one type family covers every role.",
  "sections": [
    {
      "id": "what-it-is",
      "heading": "What a design system is at personal-site scale",
      "clip": "Definition",
      "blocks": [
        {
          "type": "p",
          "text": "A design system is the set of decisions a site is built from — its colours, type, spacing and structural devices — named once and reused everywhere. At company scale that means component libraries and documentation. For a personal site it can be one block of CSS custom properties, a handful of type roles and a few rules about what each element is allowed to mean."
        },
        {
          "type": "p",
          "text": "A **design token** is one of those named decisions: a colour, a font, a size or an easing curve stored under a name such as `--ink` and referenced everywhere instead of being retyped. On this site the core palette lives in a single `:root` block in the stylesheet, and components read from it."
        },
        {
          "type": "p",
          "text": "Even with one designer and one developer — often the same person — a system pays off in three ways:"
        },
        {
          "type": "list",
          "ordered": false,
          "items": [
            "**Consistency across pages.** The home page, the work archive, the about page and the journal share one palette and one set of type roles, so they read as one site.",
            "**Faster decisions.** A new page starts from existing roles instead of fresh choices about colour and size.",
            "**Fewer one-off fixes.** When something is wrong, the fix goes into a token or a role and lands everywhere at once."
          ]
        }
      ]
    },
    {
      "id": "palette",
      "heading": "Sample the palette from something real",
      "clip": "Palette",
      "blocks": [
        {
          "type": "p",
          "text": "The most reliable source for a palette is a real image that belongs to the subject. This site has one photograph — a portrait on a misty hillside — and its colours were sampled from it, so the page and the picture share the same light."
        },
        {
          "type": "figure",
          "src": "/journal/design-systems-why-you-need-one/palette.webp",
          "alt": "Eight colour swatches labelled with names and hex values: Sky #BED5F0, Mist #D6E3F2, Frost #E4ECF5, Ink #0B1220, Oxblood #7B1E2C, Dusk #0D1420, Night #060A12 and Tally #FF5B4F.",
          "caption": "The core tokens, rendered from the stylesheet's values.",
          "width": 1400,
          "height": 340
        },
        {
          "type": "table",
          "head": [
            "Token",
            "Hex",
            "Role",
            "Where it comes from"
          ],
          "rows": [
            [
              "Mist",
              "`#D6E3F2`",
              "Ground for the day sections; the colour of the hero's mist",
              "The haze over the hills, a little lighter than the sampled sky (`#BED5F0`)"
            ],
            [
              "Ink",
              "`#0B1220`",
              "Text on mist",
              "The darkest values in the frame: hair and shadow"
            ],
            [
              "Oxblood",
              "`#7B1E2C`",
              "The hero title and accents on light grounds",
              "The red the eye reads in the plaid shirt"
            ],
            [
              "Dusk, Night, Black",
              "`#0D1420`, `#060A12`, `#040507`",
              "Grounds for the work, the credits and the contact card",
              "Day turning to night down the page"
            ],
            [
              "Frost",
              "`#E4ECF5`",
              "Text on dark grounds",
              "A cool white in the mist's blue family"
            ],
            [
              "Tally",
              "`#FF5B4F`",
              "The playhead, live and 'now' indicators, and form errors",
              "The red tally light on a camera"
            ]
          ]
        },
        {
          "type": "p",
          "text": "One measurement changed the choice of accent. To the eye, the shirt in the photograph is maroon. Sampled pixels say otherwise: blue-purple values such as `#423D5B` and `#48455E`, because the whole frame carries a strong blue cast — the raw sky sampled around `#B6D4F9`. People discount a colour cast automatically, an effect called colour constancy; a colour picker does not. So the oxblood was chosen for what people perceive, and it became the one warm note in a cool frame."
        },
        {
          "type": "p",
          "text": "A palette also has to work as text. Measured with the WCAG contrast formula, every text pairing clears the 4.5:1 minimum for normal text by a wide margin ([web.dev on colour and contrast](https://web.dev/articles/color-and-contrast-accessibility)):"
        },
        {
          "type": "table",
          "head": [
            "Text on ground",
            "Contrast ratio"
          ],
          "rows": [
            [
              "Ink on mist",
              "14.4 : 1"
            ],
            [
              "Secondary ink (`#3A4A62`) on mist",
              "6.9 : 1"
            ],
            [
              "Oxblood on mist",
              "7.8 : 1"
            ],
            [
              "Frost on dusk",
              "15.5 : 1"
            ],
            [
              "Secondary frost (`#95A3B8`) on dusk",
              "7.2 : 1"
            ]
          ]
        }
      ]
    },
    {
      "id": "type",
      "heading": "One type family, three widths",
      "clip": "Type",
      "blocks": [
        {
          "type": "p",
          "text": "This site uses one variable family, Archivo, across its width axis: 125 percent for titles, 100 percent for reading and 75 percent for labels, the way footage runs across aspect ratios."
        },
        {
          "type": "table",
          "head": [
            "Role",
            "Setting",
            "Used for"
          ],
          "rows": [
            [
              "Display",
              "Archivo 900, width 125%, uppercase, −0.035em tracking",
              "Page titles, section titles, project names"
            ],
            [
              "Reading",
              "Archivo at width 100%, 17 px base size",
              "Body text, summaries, forms"
            ],
            [
              "Label",
              "Archivo 650, width 75%, uppercase, +0.18em tracking",
              "Eyebrows, credit roles, field labels"
            ],
            [
              "Timecode",
              "Martian Mono at width 87.5%, tabular figures",
              "The timeline, the monitor bar, dates"
            ],
            [
              "Bengali",
              "Anek Bangla 500",
              "The name সপ্তর্ষি"
            ]
          ]
        },
        {
          "type": "p",
          "text": "Width does the job a second display family usually does. Expanded capitals feel like a film title, condensed capitals read as captions, and the normal width stays comfortable for paragraphs. Because it is one variable font, the three roles share letterforms and a single file: Archivo's Latin subset, with both its width and weight axes, is about 88 KB."
        },
        {
          "type": "code",
          "lang": "css",
          "code": ".label {\n  font-stretch: 75%;\n  font-weight: 650;\n  font-size: 0.74rem;\n  letter-spacing: 0.18em;\n  text-transform: uppercase;\n  opacity: 0.72;\n}\n.display {\n  font-weight: 900;\n  font-stretch: 125%;\n  text-transform: uppercase;\n  letter-spacing: -0.035em;\n  line-height: 0.86;\n}",
          "caption": "app/globals.css — two roles, one family"
        }
      ]
    },
    {
      "id": "structure",
      "heading": "Structure that encodes real information",
      "clip": "Structure",
      "blocks": [
        {
          "type": "p",
          "text": "Structural devices — rules, labels, numbering, layouts — should say something true about the content rather than decorate it. Three devices on this site carry real information."
        },
        {
          "type": "h3",
          "text": "A timeline that doubles as a colour script"
        },
        {
          "type": "p",
          "text": "Every section marked as a clip becomes a block on the page timeline, sized by its share of the scroll and tinted with that section's background. Read left to right, the strip is the site's colour script — the film term for a row of colour keys that shows how a palette changes from scene to scene. Labels stay legible on every tint because their ink is picked by luminance:"
        },
        {
          "type": "code",
          "lang": "js",
          "code": "// Clips are tinted with their section's grade, so the strip doubles as the\n// page's colour script; pick legible label ink for each.\nfunction inkFor(hex) {\n  const n = parseInt((hex || '#2b3e5e').replace('#', ''), 16);\n  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;\n  return lum > 0.55 ? '#0B1220' : '#E4ECF5';\n}\n// …\nconst color = el.dataset.clipColor || '#2B3E5E';",
          "caption": "components/Timeline.js"
        },
        {
          "type": "figure",
          "src": "/journal/design-systems-why-you-need-one/colour-script.webp",
          "alt": "The page timeline from the home page: a play button, the timecode 00:00:00:00, and five coloured clips labelled Opening, Logline, Selects, Credits and Contact, with a red playhead at the start.",
          "caption": "The home page's timeline, read as a colour script.",
          "width": 1192,
          "height": 62
        },
        {
          "type": "h3",
          "text": "Experience set as end credits"
        },
        {
          "type": "p",
          "text": "The experience section is laid out like film end credits: each role is right-aligned to the left of a centre gutter and each name is left-aligned to its right. That layout exists to pair a job with a name at a glance, which is exactly what a list of roles and employers needs."
        },
        {
          "type": "figure",
          "src": "/journal/design-systems-why-you-need-one/credits.webp",
          "alt": "The credits section on a black background: 'Designed, built and cut by', the name Saptarshi Chattopadhyay in large capitals with the Bengali name beneath, then roles paired with employers across a centre gutter.",
          "caption": "Experience set as end credits.",
          "width": 1400,
          "height": 875
        },
        {
          "type": "h3",
          "text": "A sky drawn from real coordinates"
        },
        {
          "type": "p",
          "text": "Saptarshi — the seven sages — is the Indian name for the Big Dipper, and it is also Sappy's given name. The end card draws those stars from their J2000 coordinates, projected when the site is built, and labels Mizar and its faint companion Alcor together as Vashistha and Arundhati. Because the positions are real, the device carries meaning instead of decoration."
        },
        {
          "type": "p",
          "text": "Structure can mislead, too: projects carry no 01/02 numbering, because they are not a sequence."
        }
      ]
    },
    {
      "id": "tokens-in-code",
      "heading": "Keep tokens in code, not in a document",
      "clip": "Tokens",
      "blocks": [
        {
          "type": "p",
          "text": "For a site maintained by one person, the most reliable home for a design system is the stylesheet itself: tokens as [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), roles as a few classes, and components that only reference them. A separate document drifts out of date; the code cannot."
        },
        {
          "type": "code",
          "lang": "css",
          "code": ":root {\n  --mist: #D6E3F2;\n  --mist-deep: #BFD2E8;\n  --sky: #BED5F0;\n  --ink: #0B1220;\n  --ink-soft: #3A4A62;\n  --ox: #7B1E2C;\n  --dusk: #0D1420;\n  --night: #060A12;\n  --black: #040507;\n  --frost: #E4ECF5;\n  --frost-soft: #95A3B8;\n  --tally: #FF5B4F;\n  /* … */\n  --f-sans: var(--font-archivo), 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif;\n  --f-mono: var(--font-mono), ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;\n  /* Archivo first: Latin characters (even a space) never pull in Anek's Latin file */\n  --f-bn: var(--font-archivo), var(--font-bangla), sans-serif;\n}",
          "caption": "app/globals.css"
        },
        {
          "type": "p",
          "text": "Two fixes on this site show why this matters. The Bengali font stack is a single token, `--f-bn`; reordering it once fixed every Bengali span on every page and stopped an unneeded download of about 97 KB, as described in [The Future of Web Development with Next.js](/blog/the-future-of-web-development-with-nextjs). And when long words such as CHATTOPADHYAY overflowed small phones, the fix went into the minimum sizes of the display roles, so every page using those roles was fixed at once."
        },
        {
          "type": "p",
          "text": "Tokens can cross into JavaScript when they must: the hero's WebGL mist uses the `--mist` colour, so the scroll dissolve ends exactly on the next section's background."
        }
      ]
    },
    {
      "id": "restraint",
      "heading": "What the system leaves out",
      "clip": "Restraint",
      "blocks": [
        {
          "type": "p",
          "text": "A design system is also a list of things you agree not to do, which keeps a site from collecting effects one page at a time:"
        },
        {
          "type": "list",
          "ordered": false,
          "items": [
            "**No decorative gradients.** Gradients only do jobs: the day-to-night transitions between sections, the scrim that keeps the hero's captions legible and the hatching that marks future dates on the career chart.",
            "**One alarm colour, used sparingly.** The tally red marks the playhead, things that are live or playing, and form errors.",
            "**No numbering without order.** Index numbers appear only where sequence carries information.",
            "**No custom cursor, marquee or loading counter.** Each would add motion without adding meaning.",
            "**Motion with a reason.** The grade-in, the focus pull, the scroll dissolve and the cuts each borrow a real editing gesture. Under reduced motion the hero renders as a still, transitions drop to near zero and recordings wait for a click."
          ]
        }
      ]
    },
    {
      "id": "start-small",
      "heading": "How to start one",
      "clip": "Start",
      "blocks": [
        {
          "type": "p",
          "text": "A useful system for a personal site fits on one screen. Here is a practical order of work:"
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Pick a source — a photograph, a product, a material — and sample five or six colours from it.",
            "Check every text pairing against the WCAG contrast minimum before using it.",
            "Choose one type family with a width or weight axis and give it three roles: display, reading and label.",
            "Write the tokens into `:root` and the roles into a few classes, and let components reference only those.",
            "Add a structural device only when it encodes something true.",
            "Write down what the system will not do."
          ]
        },
        {
          "type": "p",
          "text": "The rest of this site's making-of covers the pieces in detail: [keying the hero title behind a portrait](/blog/keying-a-title-behind-a-portrait), [building the page timeline](/blog/building-a-scrubbable-page-timeline) and [video for the web](/blog/mastering-video-editing-for-the-web). For a site built on a system like this one, see [website development](/services/website-development)."
        }
      ]
    }
  ]
};
