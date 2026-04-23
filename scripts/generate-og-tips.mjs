#!/usr/bin/env node
// Pre-build script: generates an OG image per tip at public/og/<slug>.jpg.
// Runs in Node (locally and in the Cloudflare Pages build container),
// never inside the Worker runtime, so native modules are fine here.

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"
import sharp from "sharp"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")

const TIPS_DIR = join(ROOT, "src/content/tips")
const AUTHORS_DIR = join(ROOT, "src/content/authors")
const OUTPUT_DIR = join(ROOT, "public/og")

const geistRegular = readFileSync(
  join(ROOT, "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf")
)
const geistBold = readFileSync(
  join(ROOT, "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf")
)
const geistMonoBold = readFileSync(
  join(ROOT, "node_modules/geist/dist/fonts/geist-mono/GeistMono-Bold.ttf")
)

function loadAuthors() {
  const authors = new Map()
  if (!existsSync(AUTHORS_DIR)) return authors

  for (const file of readdirSync(AUTHORS_DIR)) {
    if (!/\.(md|mdx|json|ya?ml)$/.test(file)) continue
    const id = file.replace(/\.(md|mdx|json|ya?ml)$/, "")
    try {
      const raw = readFileSync(join(AUTHORS_DIR, file), "utf-8")
      if (file.endsWith(".json")) {
        authors.set(id, JSON.parse(raw))
      } else {
        const { data } = matter(raw)
        authors.set(id, data)
      }
    } catch {
      // ignore malformed author files
    }
  }
  return authors
}

function listTipFiles(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...listTipFiles(full))
    } else if (/\.mdx?$/.test(entry.name)) {
      out.push(full)
    }
  }
  return out
}

async function getAvatarDataUri(authorId) {
  try {
    const webpBuffer = readFileSync(join(ROOT, `public/authors/${authorId}.webp`))
    const pngBuffer = await sharp(webpBuffer).resize(80, 80).png().toBuffer()
    return `data:image/png;base64,${pngBuffer.toString("base64")}`
  } catch {
    return null
  }
}

function buildMarkup({ id, title, category, authorName, avatarUri }) {
  const fontSize = title.length > 40 ? 44 : title.length > 30 ? 50 : 56

  const authorChildren = []
  if (avatarUri) {
    authorChildren.push({
      type: "img",
      props: { src: avatarUri, width: 44, height: 44, style: { borderRadius: 22 } },
    })
  }
  authorChildren.push({
    type: "span",
    props: { style: { fontSize: 22, color: "#a3a3a3" }, children: authorName },
  })

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "56px 72px",
        backgroundColor: "#0a0a0a",
        fontFamily: "Geist",
      },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "center", justifyContent: "space-between" },
            children: [
              {
                type: "span",
                props: {
                  style: {
                    fontSize: 36,
                    color: "#38bdf8",
                    fontFamily: "Geist Mono",
                    fontWeight: 700,
                    opacity: 0.6,
                  },
                  children: `#${id}`,
                },
              },
              {
                type: "span",
                props: {
                  style: {
                    fontSize: 22,
                    color: "#404040",
                    fontFamily: "Geist Mono",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  },
                  children: "100cosas.dev",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flex: 1, alignItems: "center", paddingRight: "40px" },
            children: {
              type: "span",
              props: {
                style: {
                  fontSize,
                  color: "#f5f5f5",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                },
                children: title,
              },
            },
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: 20 },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", height: 1, width: "100%", backgroundColor: "#262626" },
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: { display: "flex", alignItems: "center", gap: 14 },
                        children: authorChildren,
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: {
                          fontSize: 16,
                          color: "#38bdf8",
                          backgroundColor: "rgba(56, 189, 248, 0.08)",
                          padding: "6px 16px",
                          borderRadius: 6,
                          border: "1px solid rgba(56, 189, 248, 0.12)",
                        },
                        children: category,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  }
}

async function renderToJpeg(markup) {
  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
      { name: "Geist", data: geistBold, weight: 700, style: "normal" },
      { name: "Geist Mono", data: geistMonoBold, weight: 700, style: "normal" },
    ],
  })
  const pngBuffer = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng()
  return sharp(pngBuffer).jpeg({ quality: 85 }).toBuffer()
}

async function main() {
  if (!existsSync(TIPS_DIR)) {
    console.warn(`[og] tips directory not found at ${TIPS_DIR}; skipping`)
    return
  }

  mkdirSync(OUTPUT_DIR, { recursive: true })
  const authors = loadAuthors()
  const files = listTipFiles(TIPS_DIR)

  console.log(`[og] generating ${files.length} OG images...`)
  let ok = 0
  let skipped = 0

  for (const file of files) {
    const raw = readFileSync(file, "utf-8")
    const { data } = matter(raw)
    if (!data?.id || !data?.title) {
      skipped += 1
      continue
    }

    const authorId = data.author
    const authorEntry = authorId ? authors.get(authorId) : null
    const authorName = authorEntry?.name ?? authorId ?? ""
    const avatarUri = authorId ? await getAvatarDataUri(authorId) : null

    const markup = buildMarkup({
      id: data.id,
      title: data.title,
      category: data.category ?? "",
      authorName,
      avatarUri,
    })

    const jpg = await renderToJpeg(markup)
    const slug = file
      .replace(`${TIPS_DIR}/`, "")
      .replace(/\.mdx?$/, "")

    const outPath = join(OUTPUT_DIR, `${slug}.jpg`)
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, jpg)
    ok += 1
  }

  console.log(`[og] done: ${ok} generated, ${skipped} skipped → ${OUTPUT_DIR}`)
}

main().catch((err) => {
  console.error("[og] failed:", err)
  process.exit(1)
})
