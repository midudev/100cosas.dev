import type { APIRoute, GetStaticPaths } from "astro"
import { getCollection, getEntry } from "astro:content"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import sharp from "sharp"

const ROOT = process.cwd()

const geistRegular = readFileSync(
  join(ROOT, "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf")
)
const geistBold = readFileSync(
  join(ROOT, "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf")
)
const geistMonoBold = readFileSync(
  join(ROOT, "node_modules/geist/dist/fonts/geist-mono/GeistMono-Bold.ttf")
)

async function getAvatarDataUri(authorId: string): Promise<string | null> {
  try {
    const webpBuffer = readFileSync(join(ROOT, `public/authors/${authorId}.webp`))
    const pngBuffer = await sharp(webpBuffer).resize(80, 80).png().toBuffer()
    return `data:image/png;base64,${pngBuffer.toString("base64")}`
  } catch {
    return null
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allTips = await getCollection("tips")
  return allTips.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props as { entry: Awaited<ReturnType<typeof getCollection>>[number] }
  const { id, title, category, author: authorId } = entry.data

  const authorEntry = await getEntry("authors", authorId)
  const authorName = authorEntry?.data.name ?? authorId
  const avatarUri = await getAvatarDataUri(authorId)

  const fontSize = title.length > 40 ? 44 : title.length > 30 ? 50 : 56

  const authorChildren: unknown[] = []
  if (avatarUri) {
    authorChildren.push({
      type: "img",
      props: {
        src: avatarUri,
        width: 44,
        height: 44,
        style: { borderRadius: 22 },
      },
    })
  }
  authorChildren.push({
    type: "span",
    props: {
      style: { fontSize: 22, color: "#a3a3a3" },
      children: authorName,
    },
  })

  const markup = {
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
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
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
            style: {
              display: "flex",
              flex: 1,
              alignItems: "center",
              paddingRight: "40px",
            },
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
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 20,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    height: 1,
                    width: "100%",
                    backgroundColor: "#262626",
                  },
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
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                        },
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

  const svg = await satori(markup as React.ReactNode, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Geist", data: geistRegular, weight: 400 as const, style: "normal" as const },
      { name: "Geist", data: geistBold, weight: 700 as const, style: "normal" as const },
      { name: "Geist Mono", data: geistMonoBold, weight: 700 as const, style: "normal" as const },
    ],
  })

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } })
  const pngBuffer = resvg.render().asPng()
  const jpgBuffer = await sharp(pngBuffer).jpeg({ quality: 85 }).toBuffer()

  return new Response(jpgBuffer, {
    headers: { "Content-Type": "image/jpeg" },
  })
}
