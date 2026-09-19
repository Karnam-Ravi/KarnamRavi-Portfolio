/**
 * Placeholder imagery pulled from Unsplash (free to hotlink).
 * Every URL below was checked and matched to the section it sits in —
 * swap the ids for your own screenshots when you have them.
 */

const unsplash = (id: string, w = 1280) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * Ambient hero video — a dark animated data-network graph (Pexels, free to use).
 *
 * Note the filenames overstate the resolution: the "sd" file is really 426x240
 * (1.4 MB) and the "hd" one is 1280x720 (6.8 MB). We hand phones the light file
 * — it sits at low opacity behind a vignette, and a slight blur hides the
 * upscaling — and only pay for the larger file on screens big enough to show it.
 */
export const HERO_VIDEO_LIGHT =
  'https://videos.pexels.com/video-files/3129671/3129671-sd_960_540_30fps.mp4';

export const HERO_VIDEO =
  'https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4';

/** Shown before the video has buffered, and instead of it under reduced motion. */
export const HERO_VIDEO_POSTER =
  'https://images.pexels.com/videos/3129671/free-video-3129671.jpg?auto=compress&cs=tinysrgb&w=1280';

/**
 * Hero slideshow — your own photos, cropped to a shared 2:3 frame and encoded to
 * WebP. These files are now the ONLY copies: the camera originals were removed
 * from the project root, so back up public/portrait-*.webp before editing them.
 */
/**
 * BASE_URL is "/" locally and "/Karnam-Ravi-Portfolio/" on GitHub Pages. Vite
 * cannot rewrite absolute paths written inside strings, so files in public/ have
 * to be prefixed by hand or they 404 once the site is served from a sub-path.
 */
const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;

export const PORTRAIT_SLIDES = [
  { src: asset('portrait-1.webp'), alt: 'Karnam Ravi, formal headshot' },
  { src: asset('portrait-2.webp'), alt: 'Karnam Ravi standing against a red backdrop' },
  { src: asset('portrait-3.webp'), alt: 'Karnam Ravi seated in front of a large sun' },
  { src: asset('portrait-4.webp'), alt: 'Karnam Ravi outdoors wearing sunglasses' },
];

/**
 * Row 1 — the numbers themselves: dashboards, spreadsheets, charts, reports.
 * Row 2 — the work around them: reviews, workshops, desks, teams.
 *
 * Deliberately no source code, circuit boards or robots in here: this is a data
 * analyst's world, not a software engineer's.
 */
export const MARQUEE_ROW_ONE = [
  unsplash('1551288049-bebda4e38f71', 800), // dark analytics dashboard
  unsplash('1526628953301-3e589a6a8b74', 800), // KPI tiles on a monitor
  unsplash('1460925895917-afdab827c52f', 800), // laptop analytics dashboard
  unsplash('1591696205602-2f950c417cb9', 800), // line chart close-up
  unsplash('1518186285589-2f7649de83e0', 800), // spreadsheet graph
  unsplash('1611974789855-9c2a0a7236a3', 800), // candlestick chart
  unsplash('1587401511935-a7f87afadf2f', 800), // data table of figures
  unsplash('1579532537598-459ecdaf39cc', 800), // business pages, market tables
  unsplash('1543286386-713bdd548da4', 800), // hand-drawn growth chart
  unsplash('1554224155-6726b3ff858f', 800), // paperwork and calculator
  unsplash('1533750349088-cd871a92f312', 800), // strategy notes on a desk
];

export const MARQUEE_ROW_TWO = [
  unsplash('1542744173-8e7e53415bb0', 800), // boardroom review
  unsplash('1531482615713-2afd69097998', 800), // team reviewing a screen
  unsplash('1552664730-d307ca884978', 800), // workshop, sticky-note planning
  unsplash('1519389950473-47ba0277781c', 800), // desks covered in laptops
  unsplash('1454165804606-c3d57bc86b40', 800), // note-taking beside a laptop
  unsplash('1517245386807-bb43f82c33c4', 800), // walking through numbers
  unsplash('1600880292203-757bb62b4baf', 800), // a result worth celebrating
  unsplash('1606857521015-7f9fcf423740', 800), // open-plan floor of monitors
  unsplash('1573164713988-8665fc963095', 800), // data centre walkthrough
  unsplash('1563986768609-322da13575f3', 800), // laptop and phone
];

/** One image per service row in the Expertise list, keyed by its number. */
export const SERVICE_IMAGES: Record<string, string> = {
  '01': unsplash('1587401511935-a7f87afadf2f', 700), // a table of raw figures
  '02': unsplash('1551288049-bebda4e38f71', 700), // the dashboard it becomes
  '03': unsplash('1552664730-d307ca884978', 700), // mapping out a workflow
  '04': unsplash('1542744173-8e7e53415bb0', 700), // reviewing process metrics
  '05': unsplash('1573164713988-8665fc963095', 700), // the machines doing the work
};

/** Three images per project: two stacked on the left, one tall on the right. */
export const PROJECT_IMAGES: Record<string, [string, string, string]> = {
  automation: [
    unsplash('1526628953301-3e589a6a8b74'),
    unsplash('1531482615713-2afd69097998'),
    unsplash('1551288049-bebda4e38f71'),
  ],
  chatbot: [
    unsplash('1517180102446-f3ece451e9d8'),
    unsplash('1563986768609-322da13575f3'),
    unsplash('1461749280684-dccba630e2f6'),
  ],
  vision: [
    unsplash('1516116216624-53e697fedbea'),
    unsplash('1581091226825-a6a2a5aee158'),
    unsplash('1620712943543-bcc4688e7485'),
  ],
};
