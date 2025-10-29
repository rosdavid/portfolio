---
title: "Web Performance Checklist 2025 for React/Next.js (with Practical Examples)"
excerpt: "An actionable guide to improve Core Web Vitals (LCP, CLS, INP) in React/Next.js projects: images, fonts, JS, data, caching, third-parties, CI, and performance budgets."
date: "2025-10-21"
readTime: "12 min read"
tags: ["Performance", "Next.js", "React", "Core Web Vitals", "TypeScript"]
category: "blog"
featured: false
author: "David Ros"
authorBio: "Full stack developer who optimizes before scaling."
---

# Web Performance Checklist 2025 for React/Next.js (with Practical Examples)

Performance isn’t optional anymore—it impacts SEO, conversion, and UX. This condensed guide gives you an **actionable** list to optimize **Core Web Vitals** (LCP, CLS, INP) in React/Next.js projects without rewriting your architecture.

> Baselines to target: **LCP ≤ 2.5s**, **CLS ≤ 0.1**, **INP ≤ 200ms**.

---

## 1) Measure first (and in CI)

Before touching code, measure. Set up Lighthouse CI to prevent regressions.

```bash
npm i -D @lhci/cli
npx lhci wizard
```

Minimal `.lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "staticDistDir": ".next/static",
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["warn", { "maxNumericValue": 2000 }],
        "interactive": ["warn", { "maxNumericValue": 4000 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

> Tip: pair **PageSpeed Insights** for field data with **WebPageTest** for network diagnostics.

---

## 2) Images: LCP first

Use `next/image` with proper sizes, placeholders, and priority only on the hero.

```tsx
// app/(marketing)/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Hero image drives LCP */}
      <div className="relative h-[60vh]">
        <Image
          src="/hero.jpg"
          alt="Hero"
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,..." // tiny blur
          sizes="(max-width: 768px) 100vw, 1200px" // Prevents CLS
        />
      </div>

      {/* Below-the-fold: no priority */}
      <Image
        src="/gallery-1.webp"
        alt="Gallery"
        width={800}
        height={600}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 800px"
      />
    </main>
  );
}
```

**Images checklist**

- [ ] Prefer **AVIF/WebP** where possible
- [ ] Define `sizes` and dimensions to avoid **CLS**
- [ ] Use `priority` **only** on the image affecting **LCP**
- [ ] Defer offscreen images

---

## 3) Fonts: fast and stable

Reduce FOUT/CLS and font payload with `next/font`.

```tsx
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevent layout shift
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

**Fonts checklist**

- [ ] `display: swap`
- [ ] Minimal subsets (latin, latin-ext if needed)
- [ ] CSS variables for stable rendering
- [ ] Only necessary weights/styles

---

## 4) JavaScript: less is more

Defer, split, and favor **Server Components** by default.

```tsx
// app/dashboard/page.tsx (Server Component by default)
// Keep heavy work on the server to ship less JS to the client.
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("./Chart"), {
  ssr: false, // Client-only for heavy libs like charting
  loading: () => <div className="h-40 animate-pulse rounded-lg" />,
});

export default async function Dashboard() {
  // Fetch on the server → no client JS for data fetching
  const stats = await getStats(); // Server-side
  return (
    <section>
      <h1>Dashboard</h1>
      <Chart data={stats} />
    </section>
  );
}
```

**JS checklist**

- [ ] Prefer **Server Components** to reduce shipped JS
- [ ] `dynamic()` for heavy client-only libraries
- [ ] Avoid `use client` unless required
- [ ] Inspect bundles with `next build` and `ANALYZE=true`

---

## 5) Data & cache: stable and revalidatable

Avoid recomputing on every request. Use **ISR** and **revalidate**.

```ts
// app/products/page.tsx
export const revalidate = 60; // ISR: rebuild this page at most once per minute

async function getProducts() {
  // Tag-based revalidation enables targeted cache invalidation
  const res = await fetch(`${process.env.API_URL}/products`, {
    next: { revalidate: 60, tags: ["products"] },
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  return <Grid products={products} />;
}
```

Tag invalidation in a mutation route:

```ts
// app/api/admin/revalidate/route.ts
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST() {
  // Invalidate all cache entries with "products"
  revalidateTag("products");
  return NextResponse.json({ revalidated: true });
}
```

**Data checklist**

- [ ] Use `revalidate` and **tags** for granular caching
- [ ] Avoid duplicate fetches (per-request memoization)
- [ ] For critical content, prefer CDN **stale-while-revalidate**

---

## 6) HTTP headers & connection hints

Improve TTFB and reduce latency with hints and caching.

```tsx
// app/layout.tsx
export const metadata = {
  other: {
    // Preconnect to critical origins
    link: [
      { rel: "preconnect", href: "https://cdn.example.com", crossOrigin: "" },
      { rel: "dns-prefetch", href: "//cdn.example.com" },
    ],
  },
};
```

In **Route Handlers**, set resource cache headers:

```ts
// app/api/avatar/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const buffer = await fetchAvatar(params.id);
  return new NextResponse(buffer, {
    headers: {
      // Cache at the edge with SWR semantics
      "Cache-Control":
        "public, max-age=60, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Type": "image/png",
    },
  });
}
```

---

## 7) INP: snappy interactions

Keep handlers short and deferred.

```tsx
// app/(shop)/add-to-cart.tsx
"use client";
import { useTransition } from "react";

// Keep UI responsive during async mutations
export function AddToCart({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  const onAdd = () => {
    // Do not block the main thread
    startTransition(async () => {
      await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
    });
  };

  return (
    <button onClick={onAdd} disabled={pending} aria-busy={pending}>
      {pending ? "Adding..." : "Add to cart"}
    </button>
  );
}
```

**INP checklist**

- [ ] Avoid **long tasks** (>50ms) on the main thread
- [ ] Use `useTransition` for non-urgent updates
- [ ] Debounce/throttle intensive inputs
- [ ] Measure INP with the Web Vitals API in production

---

## 8) CLS: zero visual jumps

**Golden rules**

- [ ] Reserve space for images (`width/height` or `fill` + `sizes`)
- [ ] Don’t inject banners above content without reserved space
- [ ] Use consistent placeholders (skeletons)
- [ ] Control `line-height` and font swaps

---

## 9) Third-parties: control and defer

Load third-party scripts with `next/script` and appropriate strategies.

```tsx
// app/layout.tsx
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        {/* Load analytics after the main thread is free */}
        <Script
          src="https://analytics.example.com/analytics.js"
          strategy="lazyOnload"
          onLoad={() => {
            /* Instrument load time */
          }}
        />
      </body>
    </html>
  );
}
```

**Third-party checklist**

- [ ] Evaluate real cost (ms/KB) and remove what you don’t need
- [ ] Use `strategy="lazyOnload"` where possible
- [ ] Self-host and reduce cross-domain requests when applicable

---

## 10) Performance budgets

Prevent regressions with size and timing limits.

```json
// performance-budgets.json
{
  "resourceSizes": [
    { "resourceType": "script", "budget": 180 },
    { "resourceType": "image", "budget": 350 },
    { "resourceType": "font", "budget": 100 }
  ],
  "timings": [
    { "metric": "first-contentful-paint", "budget": 2000 },
    { "metric": "largest-contentful-paint", "budget": 2500 },
    { "metric": "cumulative-layout-shift", "budget": 0.1 },
    { "metric": "interaction-to-next-paint", "budget": 200 }
  ]
}
```

Wire validation into CI (e.g., Lighthouse CI plus a step that checks budgets).

---

## 11) Quick pre-publish list

- [ ] **LCP** optimized: hero with `next/image`, `sizes`, `priority`
- [ ] **CLS** stable: reserved space and fonts with `swap`
- [ ] **INP** low: short handlers, `useTransition`
- [ ] **JS** minimal: Server Components, `dynamic()` for heavy bits
- [ ] **Cache**: `revalidate`, tags, proper headers
- [ ] **Third-parties**: `next/script` strategies and auditing
- [ ] **CI**: Lighthouse CI + budgets
- [ ] **Monitoring**: PSI + your own RUM in production

---

## Conclusion

You don’t need a rewrite to improve Core Web Vitals. Apply this checklist in layers: **measure → fix → automate in CI**. You’ll see real gains in SEO, conversion, and—most importantly—user satisfaction.
