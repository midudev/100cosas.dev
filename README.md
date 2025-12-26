# 🚀 100cosas.dev

A collection of 100 development tips, best practices, and wisdom from world-renowned programmers. This project aims to provide a curated list of insights to help developers of all levels improve their craft and build better software.

Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and ❤️ by the community.

## 🌟 Features

- **100 Curated Tips:** Essential wisdom from software engineering legends.
- **Multilingual Support:** Available in both Spanish and English.
- **Community Driven:** Anyone can contribute their favorite tips or improve existing ones.
- **High Performance:** Optimized for speed and accessibility using Astro.

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Content Management:** Astro Content Collections
- **Deployment:** Vercel / Netlify (or any static hosting)

## 🚀 Getting Started

To run the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/midudev/100cosas.dev.git
   ```

2. **Install dependencies:**
   This project uses `pnpm`. If you don't have it installed, you can get it [here](https://pnpm.io/installation).

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   ```
   Open [http://localhost:4321](http://localhost:4321) in your browser.

## 🤝 Contributing

We welcome contributions! Whether it's adding a new tip, correcting a translation, or improving the UI, your help is appreciated.

### How to Add a New Tip

1. **Fork the repository** on GitHub.
2. **Create a new branch** for your changes:
   ```bash
   git checkout -b feat/add-new-tip
   ```
3. **Add the content:**
   - **Spanish tips:** Add a `.md` or `.mdx` file to `src/content/tips/es/`.
   - **English tips:** Add a `.md` or `.mdx` file to `src/content/tips/en/`.
   - Ensure you follow the frontmatter format (check existing files for reference).
4. **Author Information:**
   - If the author isn't already in the project, add their JSON profile to `src/content/authors/`.
   - Add their profile picture (WebP format) to `public/authors/`.
5. **Verify your changes:**
   Run `pnpm dev` and check the tip detail page.
6. **Submit a Pull Request** with a clear description of your changes.

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**. 

- **Attribution:** You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- **NonCommercial:** You may not use the material for commercial purposes.

See the [LICENSE](LICENSE) file or visit [https://creativecommons.org/licenses/by-nc/4.0/](https://creativecommons.org/licenses/by-nc/4.0/) for more details.

---

Made with passion for the developer community.
