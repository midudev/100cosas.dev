#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { gzipSync } from "node:zlib"

const DIST = "dist/client"
const KB = 1024

const budgets = [
  { label: "home HTML", path: "index.html", maxGzip: 30 * KB },
  { label: "ES home HTML", path: "es/index.html", maxGzip: 30 * KB },
  { label: "EN home HTML", path: "en/index.html", maxGzip: 30 * KB },
  { label: "ES search index", path: "search-index.json", maxGzip: 100 * KB },
  { label: "EN search index", path: "en/search-index.json", maxGzip: 55 * KB },
]

function gzipSize(path) {
  return gzipSync(readFileSync(path)).length
}

function format(bytes) {
  return `${(bytes / KB).toFixed(1)} KB`
}

let failed = false

for (const budget of budgets) {
  const fullPath = join(DIST, budget.path)
  if (!existsSync(fullPath)) {
    console.error(`[budget] missing ${budget.label}: ${fullPath}`)
    failed = true
    continue
  }

  const size = gzipSize(fullPath)
  const ok = size <= budget.maxGzip
  console.log(
    `[budget] ${ok ? "ok" : "fail"} ${budget.label}: ${format(size)} / ${format(
      budget.maxGzip
    )}`
  )
  failed ||= !ok
}

const astroDir = join(DIST, "_astro")
if (existsSync(astroDir)) {
  const files = readdirSync(astroDir)
  const cssGzip = files
    .filter((file) => file.endsWith(".css"))
    .reduce((total, file) => total + gzipSize(join(astroDir, file)), 0)
  const jsGzip = files
    .filter((file) => file.endsWith(".js"))
    .reduce((total, file) => total + gzipSize(join(astroDir, file)), 0)

  const cssOk = cssGzip <= 20 * KB
  const jsOk = jsGzip <= 10 * KB

  console.log(`[budget] ${cssOk ? "ok" : "fail"} CSS: ${format(cssGzip)} / 20.0 KB`)
  console.log(`[budget] ${jsOk ? "ok" : "fail"} external JS: ${format(jsGzip)} / 10.0 KB`)

  failed ||= !cssOk || !jsOk
}

const authorThumbDir = join(DIST, "authors/thumbs")
if (existsSync(authorThumbDir)) {
  const totalThumbBytes = readdirSync(authorThumbDir)
    .filter((file) => file.endsWith(".webp"))
    .reduce((total, file) => total + statSync(join(authorThumbDir, file)).size, 0)
  const thumbsOk = totalThumbBytes <= 300 * KB

  console.log(
    `[budget] ${thumbsOk ? "ok" : "fail"} author thumbs: ${format(
      totalThumbBytes
    )} / 300.0 KB`
  )
  failed ||= !thumbsOk
}

if (failed) {
  process.exit(1)
}
