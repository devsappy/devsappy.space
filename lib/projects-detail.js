// Case-study detail for each project, keyed by the asset slug in lib/content.js.
// Filled from the live sites: stills captured at 1440×900, specs read from the
// rendered pages (fonts, colours, section headings), copy limited to what is visible.
//
//   coffee3d: {
//     pageTitle: "The site's own <title>",
//     overview: ['paragraph', 'paragraph'],
//     highlights: [{ title: 'Two-to-four words', text: 'One or two sentences.' }, ...3],
//     stills: [{ src: '/work/coffee3d/still-1.webp', alt: '…', caption: '…' }, ...4],
//     specs: { typefaces: ['Family', ...], palette: ['#hex', ...], sections: ['Heading', ...] },
//   }
export const projectDetails = {
  coffee3d: {
    pageTitle: 'BLOCK & BREW — Coffee, Cubed.',
    overview: [
      'Block & Brew is presented as a small east-side roastery, and the whole site is built around one voxel scene: a blocky street corner with the shop, its bar, chairs and plants, rendered live in the browser. The hero sets the tone with “Coffee, Cubed.” in heavy capitals over the 3D street, a roast-lot badge and three stat cards for origins, rating and daily hours.',
      'Scrolling drives the camera rather than just moving the page. It pushes in through the shop to the menu board, then keeps the scene running behind the content while panels slide over it: the roastery story with an equipment spec card, a visit section with address, hours and a drawn street map, and an order panel. It is built with React and Vite, with the scene in Three.js r160.',
    ],
    highlights: [
      {
        title: 'Scroll-driven camera',
        text: 'Scrolling moves the camera through the voxel shop and up to the menu board, so the first scroll reads as walking in.',
      },
      {
        title: 'Menu in the scene',
        text: 'Prices live on the 3D menu board above the bar instead of in a separate list.',
      },
      {
        title: 'Panels over 3D',
        text: 'The story, visit and order sections are cream panels layered over the live scene, set in Archivo Black and Space Mono.',
      },
    ],
    stills: [
      {
        src: '/work/coffee3d/still-1.webp',
        alt: 'Voxel coffee bar with a menu board reading Built for the bar, listing espresso, flat white, cortado and drip prices',
        caption: 'The camera reaches the menu board.',
      },
      {
        src: '/work/coffee3d/still-2.webp',
        alt: 'Story panel headed We roast in a concrete box, beside a spec card listing the roaster, grinder and espresso machine',
        caption: 'The story, with the bar’s kit list.',
      },
      {
        src: '/work/coffee3d/still-3.webp',
        alt: 'Visit section headed Find the block, with address, hours and phone cards above a drawn street map',
        caption: 'Address, hours and a street map.',
      },
      {
        src: '/work/coffee3d/still-4.webp',
        alt: 'Order panel headed Skip the queue. Collect in ten., with a Call the bar button, over the voxel street',
        caption: 'Order ahead, over the 3D street.',
      },
    ],
    specs: {
      typefaces: ['Archivo Black', 'Space Mono'],
      palette: ['#F1E6CE', '#F8F2E2', '#1E120A', '#D2653A', '#6B8269'],
      sections: ['Coffee, Cubed.', 'Built for the bar', 'We roast in a concrete box.', 'Find the block.', 'Skip the queue. Collect in ten.'],
    },
  },

  vanta: {
    pageTitle: 'VANTA — Run Beyond',
    overview: [
      'Vanta is a brand site for a running label, written as a manifesto. It opens on “Run beyond the line.” in heavy capitals over an aerial photograph of runners on a red track, and every scroll after that is a new chapter: a full-bleed photograph, a large serif headline and one short paragraph, such as “Built for the mile nobody sees.” for a carbon-plated racer.',
      'A stack of sneakers stays pinned to the right edge while the photographs change behind it, and a column of dots tracks progress through the chapters. The final screen reports how many pixels you scrolled to reach it. Headlines mix Instrument Serif with Archivo Black, body copy is set in Inter and labels in JetBrains Mono. It is built with React and Vite.',
    ],
    highlights: [
      {
        title: 'Chapters, not sections',
        text: 'Each scroll lands on a full-bleed photograph with one headline and one short paragraph, so the page reads like a run of posters.',
      },
      {
        title: 'Pinned product',
        text: 'A stack of sneakers stays fixed on the right while the chapters change behind it.',
      },
      {
        title: 'A closing counter',
        text: 'The last screen turns the scroll itself into the message, reporting the pixels travelled “toward a faster version of you.”',
      },
    ],
    stills: [
      {
        src: '/work/vanta/still-1.webp',
        alt: 'Headline Built for the mile nobody sees. over a blue-lit close-up of a running shoe, with the pinned sneaker stack on the right',
        caption: 'The product chapter.',
      },
      {
        src: '/work/vanta/still-2.webp',
        alt: 'Headline Thinner air. Thicker reasons. over a photograph of a mountain valley',
        caption: 'The altitude chapter.',
      },
      {
        src: '/work/vanta/still-3.webp',
        alt: 'Headline We don’t sponsor athletes. We hire them. over silhouettes of runners against a bright sky',
        caption: 'The crew chapter.',
      },
      {
        src: '/work/vanta/still-4.webp',
        alt: 'Closing screen reading You’ve scrolled 11,842 pixels toward a faster version of you, in lime on black',
        caption: 'The closing pixel counter.',
      },
    ],
    specs: {
      typefaces: ['Instrument Serif', 'Archivo Black', 'Inter', 'JetBrains Mono'],
      palette: ['#0A0A0A', '#F4F2ED', '#D7FF3A', '#8E5048', '#4DA1DF'],
      sections: [
        'Run beyond the line.',
        'Built for the mile nobody sees.',
        '63% of a runner’s best miles happen in the dark.',
        'The legs know before the head.',
        'Thinner air. Thicker reasons.',
        'We don’t sponsor athletes. We hire them.',
        'Silence is a training tool.',
        '“I only race against the version of me that quit yesterday.”',
      ],
    },
  },

  kilnforge: {
    pageTitle: 'Kilnforge — Instruments for the Dark Art of Coffee Roasting',
    overview: [
      'Kilnforge is presented as a maker of shop roasters, afterburners, destoners and green-handling equipment for specialty roasteries. The site treats it like a technical dossier: a warm-black page, line drawings of the machines with numbered callouts, and an editorial serif headline, “Instruments for the dark art of coffee roasting,” set against mono-spaced labels and copper accents. A strip under the navigation reads like a file stamp, with a dossier number, a founding year and Tarragona as the workshop.',
      'Below the hero, a tabbed catalog walks through five equipment families with spec tables and quote buttons. The flagship M/12 gets its own section with a batch-size selector, a plotted roast curve and detail plates for the drum, controller and serial plate, before a foundry story, a build timeline and a contact form. Type is Fraunces, Archivo and JetBrains Mono; it is built with React and Vite.',
    ],
    highlights: [
      {
        title: 'Blueprint illustration',
        text: 'Machines are drawn as thin line schematics with numbered callouts, so the catalog reads like engineering drawings rather than product photography.',
      },
      {
        title: 'A plotted roast curve',
        text: 'The M/12 section charts bean and environment temperature against time, marking charge, turnaround, dry end, first crack and drop.',
      },
      {
        title: 'Dossier details',
        text: 'Mono-spaced metadata, dossier numbers and spec tables sit beside an editorial serif, giving the page the feel of a printed catalog.',
      },
    ],
    stills: [
      {
        src: '/work/kilnforge/still-1.webp',
        alt: 'Catalog entry for Afterburners with a line drawing of the unit, a spec table and quote buttons',
        caption: 'Catalog: the afterburner family.',
      },
      {
        src: '/work/kilnforge/still-2.webp',
        alt: 'Section for the M/12 roaster with a large M/12 numeral, a headline about twelve kilograms of calm heat and a row of specs',
        caption: 'The flagship M/12.',
      },
      {
        src: '/work/kilnforge/still-3.webp',
        alt: 'Roast profile chart titled The curve in question, plotting bean and environment temperature over time',
        caption: 'A plotted roast curve.',
      },
      {
        src: '/work/kilnforge/still-4.webp',
        alt: 'Section titled The parts that earn the stamp, with line drawings of a drum, controller, sample trier and serial plate',
        caption: 'Detail plates for the M/12.',
      },
    ],
    specs: {
      typefaces: ['Fraunces', 'Archivo', 'JetBrains Mono'],
      palette: ['#0E0B08', '#14100C', '#F3ECE1', '#D9D1C3', '#E8823F'],
      sections: [
        'Instruments for the dark art of coffee roasting.',
        'The working range',
        'A closer look',
        'The curve in question.',
        'The parts that earn the stamp.',
        'Hand-built, not automated.',
        'Ten weeks, one machine, one signature.',
        'Start the conversation.',
      ],
    },
  },

  pixelforge: {
    pageTitle: 'gptshopexpert — get your business cited by ai',
    overview: [
      'Pixel Forge is the site for GPTShopExpert, an agency working on generative engine optimisation: getting businesses found and quoted by ChatGPT, Perplexity, Gemini and Google AI Overviews. The page opens with “Your customers now ask AI. We make it cite you.” beside a slowly turning satellite, framed by HUD-style corner brackets and readouts, on a near-black grid with an acid-lime accent.',
      'Further down, twelve service cards set out the agency’s disciplines, a sideways-scrolling gallery shows case cards, and three pricing tiers lead into a process section, headline numbers and an audit form. The satellite is built from CSS 3D transforms rather than WebGL, so the hero needs no canvas. Type is Inter with Instrument Serif italics and JetBrains Mono labels; it is built with React and Vite.',
    ],
    highlights: [
      {
        title: 'CSS 3D satellite',
        text: 'The hero satellite is a cube of HTML faces turned with CSS 3D transforms, so it moves in three dimensions without a canvas or WebGL.',
      },
      {
        title: 'HUD framing',
        text: 'Corner brackets, an object ID and orbital readouts frame the hero, carrying the satellite idea into the interface itself.',
      },
      {
        title: 'Sideways case gallery',
        text: 'One section switches the scroll axis, sliding case cards horizontally while you keep scrolling down.',
      },
    ],
    stills: [
      {
        src: '/work/pixelforge/still-1.webp',
        alt: 'Section headed Built for the AI frontier, with a services ticker above and HUD readouts around a satellite illustration',
        caption: 'The mission section and its readouts.',
      },
      {
        src: '/work/pixelforge/still-2.webp',
        alt: 'Wireframe study card titled Graphite before pixels, above service cards for AI citability, technical SEO and schema',
        caption: 'Service cards and a wireframe study.',
      },
      {
        src: '/work/pixelforge/still-3.webp',
        alt: 'Horizontally scrolling case cards, with Helios SaaS in view and the next card entering from the right',
        caption: 'The sideways-scrolling case gallery.',
      },
      {
        src: '/work/pixelforge/still-4.webp',
        alt: 'Process section headed Calm on the outside. Relentless on the inside., with discover, design, forge and launch around a line graphic',
        caption: 'Process: discover, design, forge, launch.',
      },
    ],
    specs: {
      typefaces: ['Inter', 'Instrument Serif', 'JetBrains Mono'],
      palette: ['#0A0A0A', '#121212', '#ECE3CF', '#FFFFFF', '#D4FF3A'],
      sections: [
        'Your customers now ask AI. We make it cite you.',
        'Built for the AI frontier.',
        'A full GEO stack. From audit to AI citation.',
        'Scroll sideways. See who AI now cites.',
        'Three ways to work with GPTShopExpert.',
        'Calm on the outside. Relentless on the inside.',
        'Want AI to recommend you?',
      ],
    },
  },

  cafekaleido: {
    pageTitle: 'CAFE KALEIDO — Bold Brews, Brighter Mornings',
    overview: [
      'Cafe Kaleido is a site for a neighbourhood cafe that wants to be heard from across the street. The hero stacks “Brew bold. Eat bright. Live loud.” in black capitals on colour-blocked labels, with a ticker of opening hours and specials running across the top, an open-today badge, and cards for a new mango cardamom latte, all-day brunch and in-house roasting.',
      'Everything follows one neo-brutalist rule: thick black outlines, hard offset shadows and flat pink, yellow, blue and orange blocks on a cream page. Below the hero come a colour-coded menu with category tabs and rupee prices, the cafe’s story in big numbers, an illustrated gallery, reviews, and a visit section with a table-booking form. Type is Archivo Black, Space Grotesk and DM Mono; it is built with React and Vite.',
    ],
    highlights: [
      {
        title: 'Colour-coded menu',
        text: 'Each drink card carries its own flat colour, a price in rupees and an order button, filtered by tabs for coffee, food, sweets, and tea and cold drinks.',
      },
      {
        title: 'Hard shadows everywhere',
        text: 'Buttons, cards and headline labels share thick black outlines and offset shadows, so the whole page holds to one loud visual rule.',
      },
      {
        title: 'Two tickers',
        text: 'A ticker of hours and specials runs along the top, and a second band of menu items cuts across the page below the hero.',
      },
    ],
    stills: [
      {
        src: '/work/cafekaleido/still-1.webp',
        alt: 'Menu section headed Pick your color, with category tabs and colour-coded drink cards showing rupee prices',
        caption: 'The colour-coded menu.',
      },
      {
        src: '/work/cafekaleido/still-2.webp',
        alt: 'Story section headed A little cafe with a loud opinion, with stat cards reading 2019, 64K, 12 and 100%',
        caption: 'The story, in big numbers.',
      },
      {
        src: '/work/cafekaleido/still-3.webp',
        alt: 'Gallery section headed A room that wakes you up, with bold illustrated tiles in pink, yellow and blue',
        caption: 'An illustrated gallery.',
      },
      {
        src: '/work/cafekaleido/still-4.webp',
        alt: 'Visit section headed Come by. Stay a while., with address and hours beside a Book a table form',
        caption: 'Visit details and table booking.',
      },
    ],
    specs: {
      typefaces: ['Archivo Black', 'Space Grotesk', 'DM Mono'],
      palette: ['#FFF4E0', '#0A0A0A', '#FF3D7F', '#FFD23F', '#3BB4F2'],
      sections: [
        'Brew bold. Eat bright. Live loud.',
        'Pick your color.',
        'A little cafe with a loud opinion.',
        'A room that wakes you up.',
        'What people actually say.',
        'Come by. Stay a while.',
      ],
    },
  },

  chatterify: {
    pageTitle: 'Chatterify Mail — Outreach, refined.',
    overview: [
      'Chatterify Mail Studio is presented as a workspace for writing, previewing and sending outbound email through your own SMTP server. The landing page opens with “Outbound email, rendered classy.” on a dark, star-flecked background where 3D envelopes drift, followed by chips for TLS encryption, keeping credentials out of the browser, and a fast preview-to-send round trip. A pill above the headline names it “the outbound studio.”',
      'A paper plane flies through its own panel to introduce the product, then a mock of the composer shows a connected SMTP account, saved templates and a draft passing its readiness checks. Six feature cards and a three-step workflow lead to a final call to open the studio. Type is Inter with Instrument Serif italics; it is built with React and Vite, with the 3D elements in Three.js r160.',
    ],
    highlights: [
      {
        title: 'A paper-plane metaphor',
        text: 'Envelopes and a paper plane rendered in Three.js carry the idea of sending through the page, in place of stock illustration.',
      },
      {
        title: 'The product, shown',
        text: 'A composer mock with SMTP status, templates and a readiness count explains the tool before any feature list does.',
      },
      {
        title: 'Serif accents',
        text: 'Single words such as “classy”, “well” and “sending” switch to Instrument Serif italic, softening an otherwise all-Inter interface.',
      },
    ],
    stills: [
      {
        src: '/work/chatterify/still-1.webp',
        alt: 'Dark panel headed One plane. One trail. Zero noise., with a 3D paper plane and envelopes, above the composer mock',
        caption: 'The paper-plane panel.',
      },
      {
        src: '/work/chatterify/still-2.webp',
        alt: 'Composer mock showing SMTP live, saved templates and a draft titled A quick idea for your website',
        caption: 'A mock of the composer.',
      },
      {
        src: '/work/chatterify/still-3.webp',
        alt: 'Feature grid headed Everything you need to send well., with six feature cards',
        caption: 'Six features in one grid.',
      },
      {
        src: '/work/chatterify/still-4.webp',
        alt: 'Workflow steps Connect SMTP, Compose and preview, and Send with confidence, above a call to open the studio',
        caption: 'Three steps, then the studio.',
      },
    ],
    specs: {
      typefaces: ['Inter', 'Instrument Serif', 'JetBrains Mono'],
      palette: ['#0B0B0D', '#1A1A1D', '#FAFAF7', '#9EA0A8', '#E8E2D2'],
      sections: [
        'Outbound email, rendered classy.',
        'One plane. One trail. Zero noise.',
        'Everything you need to send well.',
        'Three steps. Then you’re sending.',
        'Open the studio. Ship something good.',
      ],
    },
  },
};
