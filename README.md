# devsappy.space

![The opening shot](./app/opengraph-image.jpg)

Portfolio of **Saptarshi Chattopadhyay (Sappy)**: full-stack engineer and video editor, India.

The site is built as an edit. Scrolling scrubs a playhead along a timeline, timecode runs at 25 fps, the work plays as footage, and the experience rolls as end credits.

## What's on the page

- **Opening shot.** The hero is one photograph (`DSC_8261.JPG`) split into a clean sky plate and a keyed foreground cut-out. The title sits between them, so "SAPPY" hangs in the sky behind his head. Two WebGL mist layers drift on either side of the cut-out and part around the cursor. On load the frame grades in from flat and the title racks into focus. On scroll the camera pushes in and the frame dissolves to mist.
- **Timeline.** A fixed strip at the bottom. Every `[data-clip]` section becomes a clip, sized by its share of the scroll and tinted with its own background, so the strip is also the page's colour script. Drag to scrub, click a clip to jump, or use **J / K / L** (reverse, stop, play; press again for 2× and 4×). At 1× the timecode runs in real time.
- **Selects.** Six live projects, shown as screen recordings captured from the deployed sites. On desktop one program monitor stays pinned and hard-cuts between projects as you scroll. On phones it becomes a list where each recording plays while in view.
- **Credits.** Experience, education and tools, set like film end credits.
- **End card.** Contact under a night sky with Saptarshi (সপ্তর্ষি), the seven sages: the Indian name for the Big Dipper. Star positions are real J2000 coordinates.
- **Inner pages.** `/projects` is a project list beside a monitor that switches between the recording and the live site. `/sappy` has the bio and the career drawn as tracks on a timeline. `/contact` has a form that drafts the email in the visitor's mail app (there's no backend). `/blog` is the journal.

## Design system

| Token | Hex | From the photo |
| --- | --- | --- |
| Mist | `#D6E3F2` | the haze over the hills |
| Ink | `#0B1220` | hair and shadow |
| Oxblood | `#7B1E2C` | the red the eye reads in the plaid |
| Dusk / Night | `#0D1420` / `#060A12` | where the page ends up |
| Tally | `#FF5B4F` | playhead and "playing" lights only |

Type is a single family, Archivo, used across widths: 125% for titles, 100% for reading, 75% for labels. Martian Mono covers timecode and data, and Anek Bangla covers the Bengali.

## Stack

Next.js 14 (App Router, every route statically prerendered), vanilla CSS, raw WebGL for the mist (no 3D library), and [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling. Lenis is switched off under `prefers-reduced-motion`; in that mode the hero renders as a still and recordings don't autoplay.

## Content

All copy and data live in `lib/content.js`: projects, experience, education, tools, clients and journal entries. Edit that one file and the home page, the work archive and the about page update together.

### Re-recording project footage

`public/work/<slug>.mp4` and `<slug>.webp` are a scroll-through recording and a poster of each live site, at 1200 px wide, H.264 and about 1 MB each. If a project changes, record it again at 1440×900 and encode it with:

```
ffmpeg -i capture.mp4 -vf "fps=25,scale=1200:-2,format=yuv420p" -c:v libx264 -crf 31 -g 50 -movflags +faststart -an public/work/<slug>.mp4
```

## Getting started

```
npm install
npm run dev
```

Then open http://localhost:3000.
