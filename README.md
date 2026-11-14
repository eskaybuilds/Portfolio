# Portfolio

Static Next.js site for Sikiru Razak.

- Site facts (links, experience, skills): `content/site.ts`
- Case studies: one `.mdx` file each in `content/case-studies/`. Adding a file adds the card and the page.
- Blog posts: one `.mdx` file each in `content/blog/`, starting with `export const meta = { title, summary, date: "YYYY-MM-DD" }`. Copy `content/blog/example.mdx` to start one; posts with `draft: true` are never built. The Blog section and nav link appear once there is a published post.
- CV: `public/sikiru-razak-cv.pdf`. Optional portrait: `public/portrait.jpg`.

```bash
npm run dev
```
