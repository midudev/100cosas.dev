// Atajos para document.querySelector / querySelectorAll.
// Por defecto tipan como HTMLElement (dataset, style...) y con un tag conocido infieren su tipo: $("input") → HTMLInputElement
type TagMap = HTMLElementTagNameMap

export function $<K extends keyof TagMap>(selector: K, root?: ParentNode): TagMap[K] | null
export function $<E extends Element = HTMLElement>(selector: string, root?: ParentNode): E | null
export function $(selector: string, root: ParentNode = document) {
  return root.querySelector(selector)
}

// Devuelve un array (no un NodeList) para poder usar map, filter, some...
export function $$<K extends keyof TagMap>(selector: K, root?: ParentNode): TagMap[K][]
export function $$<E extends Element = HTMLElement>(selector: string, root?: ParentNode): E[]
export function $$(selector: string, root: ParentNode = document) {
  return [...root.querySelectorAll(selector)]
}
