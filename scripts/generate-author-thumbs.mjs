#!/usr/bin/env node
import {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const AUTHORS_DIR = join(ROOT, "public/authors")
const OUTPUT_DIR = join(AUTHORS_DIR, "thumbs")

function isFresh(inputPath, outputPath) {
  return (
    existsSync(outputPath) &&
    statSync(outputPath).mtimeMs >= statSync(inputPath).mtimeMs
  )
}

async function main() {
  if (!existsSync(AUTHORS_DIR)) {
    console.warn(`[authors] directory not found at ${AUTHORS_DIR}; skipping`)
    return
  }

  mkdirSync(OUTPUT_DIR, { recursive: true })

  const files = readdirSync(AUTHORS_DIR)
    .filter((file) => file.endsWith(".webp"))
    .sort()

  let generated = 0
  let skipped = 0

  await Promise.all(
    files.map(async (file) => {
      const inputPath = join(AUTHORS_DIR, file)
      const outputPath = join(OUTPUT_DIR, file)

      if (isFresh(inputPath, outputPath)) {
        skipped += 1
        return
      }

      await sharp(inputPath)
        .resize(64, 64, { fit: "cover" })
        .webp({ quality: 72, effort: 4 })
        .toFile(outputPath)

      generated += 1
    })
  )

  console.log(
    `[authors] thumbnails: ${generated} generated, ${skipped} skipped → ${OUTPUT_DIR}`
  )
}

main().catch((error) => {
  console.error("[authors] thumbnail generation failed:", error)
  process.exit(1)
})
