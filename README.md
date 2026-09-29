# nesetk

My personal site. SvelteKit, prerendered to static HTML.

```sh
npm install
npm run dev      # local dev server
npm run build    # static site in build/
```

## Editing content

- **Projects and links:** `src/lib/data.ts`. Each project has a color, tags, a description, links, and an optional `images` list (files in `static/`). A project with no images shows a generated quarter-circle pattern.
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

## Things to try

- Click the big quarter circle at the top of any page.
- Hover the projects, the blog titles, and each link.
- Hover or click the generated project patterns.
