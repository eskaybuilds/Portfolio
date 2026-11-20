"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

type Item = { label: string; href: string };

type Props = { name: string; index: Item[]; links: Item[]; tagline: string; location: string };

const mono = "font-mono text-xs uppercase tracking-widest text-muted";

// Native modal <dialog> gives the focus trap, Esc-to-close and inert page for free.
export function SiteMenu({ name, index, links, tagline, location }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const path = usePathname().replace(/(.)\/$/, "$1");
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="site-menu"
        className="grid size-9 place-items-center rounded-md text-muted hover:text-foreground"
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 9h18M3 15h18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <dialog
        ref={dialog}
        id="site-menu"
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-background p-0 text-foreground backdrop:bg-transparent"
      >
        <div className="mx-auto flex min-h-full max-w-6xl flex-col px-5 sm:px-10">
          <div className="flex items-center justify-between border-b border-line py-4">
            <Link href="/" onClick={close} className="font-serif text-lg">
              {name}
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="grid size-9 place-items-center rounded-md text-muted hover:text-foreground"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <div className="grid flex-1 gap-12 py-12 md:grid-cols-[1fr_auto_auto] md:gap-20 md:py-16">
            <nav aria-label="Main" className="md:order-3">
              <p className={mono}>Index</p>
              <ol className="mt-6">
                {index.map((item, i) => (
                  <li key={item.href} className="flex items-baseline gap-4">
                    <span className="w-5 font-mono text-[0.65rem] text-muted">{String(i).padStart(2, "0")}</span>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={item.href === path ? "page" : undefined}
                      className={`font-serif text-5xl leading-tight hover:text-foreground sm:text-6xl ${
                        item.href === path ? "text-foreground" : "text-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="md:order-2">
              <p className={mono}>Elsewhere</p>
              <ul className="mt-5 space-y-2 text-muted">
                {links.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} rel="noopener" onClick={close} className="hover:text-foreground">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="max-w-xs self-end font-serif text-2xl leading-snug sm:text-3xl md:order-1">{tagline}</p>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-line py-4">
            <p className={mono}>{location}</p>
            <div className="flex items-center gap-1">
              <span className={mono}>Colour</span>
              <ThemeToggle />
            </div>
            <p className={`${mono} hidden sm:block`}>
              <kbd className="text-foreground">Esc</kbd> closes
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
