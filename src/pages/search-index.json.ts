import { getCollection, getEntry } from "astro:content"
import { normalizeSearchText, stripMarkdownForSearch } from "../utils/search"

export const prerender = true

export async function GET() {
  const tips = await getCollection("tips", ({ id }) => id.startsWith("es/"))

  const records = await Promise.all(
    tips.map(async (tip) => {
      const author = await getEntry("authors", tip.data.author)
      const text = normalizeSearchText(
        [
          tip.data.id,
          tip.data.title,
          tip.data.category,
          author?.data.name,
          stripMarkdownForSearch(tip.body ?? ""),
        ]
          .filter(Boolean)
          .join(" ")
      )

      return {
        id: tip.data.id,
        text,
      }
    })
  )

  records.sort((a, b) => parseInt(a.id) - parseInt(b.id))

  return new Response(JSON.stringify({ records }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
