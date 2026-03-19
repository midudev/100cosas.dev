const LANGS = {
  javascript: { name: 'JavaScript', icon: 'javascript', color: 'F7DF1E' },
  js: { name: 'JavaScript', icon: 'javascript', color: 'F7DF1E' },
  typescript: { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
  ts: { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
  python: { name: 'Python', icon: 'python', color: '3776AB' },
  py: { name: 'Python', icon: 'python', color: '3776AB' },
  html: { name: 'HTML', icon: 'html5', color: 'E34F26' },
  css: { name: 'CSS', localIcon: '/icons/langs/css.svg' },
  java: { name: 'Java', icon: 'openjdk', color: 'ED8B00' },
  go: { name: 'Go', icon: 'go', color: '00ADD8' },
  rust: { name: 'Rust', icon: 'rust', color: 'DEA584' },
  bash: { name: 'Bash', icon: 'gnubash', color: '4EAA25' },
  shell: { name: 'Shell', icon: 'gnubash', color: '4EAA25' },
  sh: { name: 'Shell', icon: 'gnubash', color: '4EAA25' },
  zsh: { name: 'Zsh', icon: 'gnubash', color: '4EAA25' },
  json: { name: 'JSON', icon: 'json', color: '999999' },
  sql: { name: 'SQL', icon: 'postgresql', color: '4169E1' },
  jsx: { name: 'React', icon: 'react', color: '61DAFB' },
  tsx: { name: 'React', icon: 'react', color: '61DAFB' },
  ruby: { name: 'Ruby', localIcon: '/icons/langs/ruby.svg' },
  rb: { name: 'Ruby', localIcon: '/icons/langs/ruby.svg' },
  php: { name: 'PHP', icon: 'php', color: '777BB4' },
  swift: { name: 'Swift', icon: 'swift', color: 'F05138' },
  kotlin: { name: 'Kotlin', icon: 'kotlin', color: '7F52FF' },
  csharp: { name: 'C#', icon: 'csharp', color: '512BD4' },
  cs: { name: 'C#', icon: 'csharp', color: '512BD4' },
  cpp: { name: 'C++', icon: 'cplusplus', color: '00599C' },
  c: { name: 'C', localIcon: '/icons/langs/c.svg' },
  yaml: { name: 'YAML', icon: 'yaml', color: 'CB171E' },
  yml: { name: 'YAML', icon: 'yaml', color: 'CB171E' },
  markdown: { name: 'Markdown', icon: 'markdown', color: 'ffffff' },
  md: { name: 'Markdown', icon: 'markdown', color: 'ffffff' },
  mdx: { name: 'MDX', icon: 'mdx', color: 'FCB32C' },
  docker: { name: 'Docker', icon: 'docker', color: '2496ED' },
  dockerfile: { name: 'Docker', icon: 'docker', color: '2496ED' },
  graphql: { name: 'GraphQL', icon: 'graphql', color: 'E10098' },
  vue: { name: 'Vue', icon: 'vuedotjs', color: '4FC08D' },
  svelte: { name: 'Svelte', localIcon: '/icons/langs/svelte.svg' },
  astro: { name: 'Astro', icon: 'astro', color: 'BC52EE' },
  dart: { name: 'Dart', icon: 'dart', color: '0175C2' },
  lua: { name: 'Lua', icon: 'lua', color: '2C2D72' },
  r: { name: 'R', icon: 'r', color: '276DC3' },
  scala: { name: 'Scala', icon: 'scala', color: 'DC322F' },
  elixir: { name: 'Elixir', icon: 'elixir', color: '4B275F' },
  haskell: { name: 'Haskell', icon: 'haskell', color: '5D4F85' },
  toml: { name: 'TOML', icon: 'toml', color: '9C4121' },
  nginx: { name: 'Nginx', icon: 'nginx', color: '009639' },
  xml: { name: 'XML' },
  diff: { name: 'Diff' },
  plaintext: null,
  text: null,
  txt: null,
}

export function codeLangBadge() {
  return {
    name: 'code-lang-badge',
    pre(node) {
      const lang = this.options.lang
      if (!lang) return

      const meta = LANGS[lang]
      if (meta === null) return

      const displayName = meta?.name || lang
      const children = []

      const iconSrc = meta?.localIcon
        || (meta?.icon && meta?.color ? `https://cdn.simpleicons.org/${meta.icon}/${meta.color}` : null)

      if (iconSrc) {
        children.push({
          type: 'element',
          tagName: 'img',
          properties: {
            src: iconSrc,
            alt: '',
            width: 16,
            height: 16,
          },
          children: [],
        })
      }

      children.push({
        type: 'text',
        value: displayName,
      })

      node.children.unshift({
        type: 'element',
        tagName: 'span',
        properties: {
          class: 'code-lang-badge',
        },
        children,
      })
    },
  }
}
