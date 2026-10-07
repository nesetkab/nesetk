# nesetk

My personal site. SvelteKit, prerendered to static HTML.

```sh
npm install
npm run dev      # local dev server
npm run build    # static site in build/
```

## Editing content

- **Projects and links:** `src/lib/data.ts`. Each project has a color, tags, a description, links, and an optional `images` list (files in `static/`). A project with no images shows a generated quarter-circle pattern.
- **Resume:** the PDF is `static/resume.pdf`, and the `/resume` page reads its text from `src/lib/resume.ts`. Update both together.
- **Blog posts:** one Markdown file per post in `src/lib/posts/`. The file name is the URL slug. Front matter:

  ```md
  ---
  title: Everything is slop
  lines: Everything | is slop   # how the title breaks on the home page
  color: #ff8a4b
  date: 2026-09-02              # posts are sorted by this
  tldr: one or two sentences.
  ---
  ```

## notch studio

The web design page lives at `/studio`, with its content in `src/lib/studio.ts` and the logo in `static/notch/`. The wordmark is set in [Fraunces](https://fonts.google.com/specimen/Fraunces) ExtraBold.

The inquiry form opens the visitor's email app until a form service is connected. To get submissions without that step, make a free form on [Formspree](https://formspree.io), copy its endpoint (like `https://formspree.io/f/abcdwxyz`), and set `INQUIRY_ENDPOINT` in `src/lib/studio.ts`.

## Things to try

- Click the big quarter circle at the top of any page.
- Switch between light and dark with the toggle in the top-right corner.
- Hover the projects, the blog titles, and each link.
- Hover or click the generated project patterns.
