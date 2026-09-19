# Karnam Ravi — Portfolio

React + TypeScript + Vite + Tailwind + Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

## Where the content lives

| What | File |
|------|------|
| Name, role, contact details, skills, experience | `src/data/profile.ts` |
| Every image and video URL | `src/data/media.ts` |

Edit those two files and the whole site follows — no component changes needed.

## Hero slideshow

Four photos cross-fade every 4.2s (`src/components/PortraitSlideshow.tsx`), served
from `public/portrait-1..4.webp`, all cropped to a shared 2:3 frame. The photo is
deliberately static — no hover motion — so it stays put while you read.

> **These WebP files are the only copies.** The camera originals (`IMG_*.JPG`) are
> no longer in the project. Back up `public/` before regenerating anything.

To change the order, reorder `PORTRAIT_SLIDES` in `src/data/media.ts`; the first
entry is what visitors see on load.

To add a new photo, drop the original in the project root and crop it to 2:3:

```bash
# a 673x866 source: trim the sides to 577 wide, then scale to the shared size
ffmpeg -y -i IMG_4712.JPG -vf "crop=577:866:48:0,scale=800:1200:flags=lanczos"   -c:v libwebp -quality 86 public/portrait-1.webp
```

`crop` is `width:height:x:y`. For a 2:3 frame use `width = height * 0.667` and
set `x` to re-centre the subject. Then add the file to `PORTRAIT_SLIDES`.

## Notes

- Hero background video streams from Pexels. Phones get a 1.4 MB file, desktops
  a 6.8 MB one; both pause off-screen and are skipped under `prefers-reduced-motion`.
- Marquee and project images hotlink Unsplash. Download them into `public/` before
  a production deploy if you want guaranteed uptime.
- The contact form opens a pre-filled Gmail draft — no backend required.
