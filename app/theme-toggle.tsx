"use client";

// Stateless on purpose: the theme lives on <html data-theme>, so there is nothing to hydrate.
export function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Switch between dark and light theme"
      className="grid size-9 place-items-center rounded-md text-muted hover:text-foreground"
      onClick={() => {
        const root = document.documentElement;
        const next = root.dataset.theme === "light" ? "dark" : "light";
        root.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {
          // Private mode: the choice just won't be remembered.
        }
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
      </svg>
    </button>
  );
}
