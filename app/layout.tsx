import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import Link from "next/link";
import { projects, site } from "@/content/site";
import { getPosts } from "@/lib/blog";
import { SiteMenu } from "./site-menu";
import { ThemeToggle } from "./theme-toggle";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"] });

// Runs before first paint so a saved light theme never flashes dark.
const applySavedTheme =
  'try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}';

const fullTitle = `${site.name} | ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: fullTitle, template: `%s | ${site.name}` },
  description: site.positioning,
  authors: [{ name: "Sikiru Razak" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: fullTitle,
    description: site.positioning,
  },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const nav = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    ...(projects.length > 0 ? [{ label: "Projects", href: "/projects" }] : []),
    // The blog is linked only once content/blog has a published post.
    ...((await getPosts()).length > 0 ? [{ label: "Blog", href: "/blog" }] : []),
    { label: "About", href: "/about" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    // suppressHydrationWarning: the inline script may set data-theme before React hydrates.
    <html lang="en" className={`${inter.variable} ${newsreader.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: applySavedTheme }} />
      </head>
      <body className="bg-background font-sans text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-surface focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <header className="border-b border-line">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-5 py-4">
            <Link href="/" className="font-serif text-lg">
              {site.name}
            </Link>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <SiteMenu
                name={site.name}
                index={nav}
                links={[{ label: "Email", href: `mailto:${site.email}` }, ...site.links]}
                tagline={site.title}
                location={site.location}
              />
            </div>
          </div>
        </header>
        <main id="main" className="mx-auto max-w-3xl px-5">
          {children}
        </main>
        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-3xl flex-wrap justify-between gap-4 px-5 py-8 text-sm text-muted">
            <p>© {new Date().getFullYear()} Sikiru Razak</p>
            <ul className="flex flex-wrap gap-5">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-foreground">
                  Email
                </a>
              </li>
              {site.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} rel="noopener" className="hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
