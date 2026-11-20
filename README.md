# Portfolio

Static Next.js site for Sikiru Razak.

- Site facts (links, experience, skills): `content/site.ts`
- Case studies: one `.mdx` file each in `content/case-studies/`. Adding a file adds the card and the page.
- Blog posts: one `.mdx` file each in `content/blog/`, starting with `export const meta = { title, summary, date: "YYYY-MM-DD" }`. Copy `content/blog/example.mdx` to start one; posts with `draft: true` are never listed. The Blog section and nav link appear once there is a published post.
- Portrait (About page only): `public/portrait.jpg`.

```bash
npm run dev
```

## Deploying

`npm run build` writes the static site to `out/`. On every push to `main`, `.github/workflows/deploy.yml` builds it and pushes `out/` to the `eskaybuilds/eskaybuilds.github.io` repo, which GitHub Pages serves at https://eskaybuilds.github.io. To preview locally: `python3 -m http.server 3210 -d out`.
