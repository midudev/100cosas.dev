---
id: "68"
title: "El README es tu primera impresión"
category: "Documentación"
categoryColor: "text-slate-400 bg-slate-900/20"
author: "tania-rascia"
---

Tania Rascia, conocida por su documentación clara y accesible, tiene una regla para sus proyectos: **si alguien no puede entender y ejecutar tu proyecto en 5 minutos leyendo el README, has fallado**.

## El README mínimo viable

```markdown
# Nombre del Proyecto

Una línea que explica qué hace.

## Instalación

\`\`\`bash
npm install mi-proyecto
\`\`\`

## Uso rápido

\`\`\`javascript
import { cosa } from 'mi-proyecto';
cosa.hazAlgo();
\`\`\`

## Licencia

MIT
```

Esto es mejor que nada. Pero puedes hacer más.

## El README que convierte

```markdown
# 🚀 SuperAuth

Autenticación para Next.js que funciona. Sin configuración. Sin dolor.

![npm](https://img.shields.io/npm/v/superauth)
![downloads](https://img.shields.io/npm/dm/superauth)

## ¿Por qué SuperAuth?

- ⚡ **30 segundos para empezar** - No necesitas entender OAuth
- 🔒 **Seguro por defecto** - PKCE, tokens rotativos, todo incluido
- 🎨 **UI lista** - Componentes de login que puedes personalizar

## Instalación

\`\`\`bash
npm install superauth
\`\`\`

## Uso básico

\`\`\`jsx
// 1. Envuelve tu app
import { AuthProvider } from 'superauth';

function App() {
  return (
    <AuthProvider>
      <MiApp />
    </AuthProvider>
  );
}

// 2. Usa el hook
function Profile() {
  const { user, login, logout } = useAuth();

  if (!user) return <button onClick={login}>Login</button>;
  return <p>Hola, {user.name}</p>;
}
\`\`\`

## Ejemplos

- [Next.js + Google](./examples/nextjs-google)
- [Next.js + GitHub](./examples/nextjs-github)
- [Remix + Email/Password](./examples/remix-email)

## Documentación completa

👉 [Leer la documentación](https://superauth.dev/docs)

## Contribuir

¡PRs bienvenidos! Lee [CONTRIBUTING.md](./CONTRIBUTING.md) primero.

## Licencia

MIT © [Tu Nombre](https://tu-web.com)
```

## Lo que debe tener un buen README

### 1. Hook inmediato

```markdown
❌ "Este es un proyecto para..."
✅ "Autenticación que funciona. Sin dolor."

La primera línea vende el proyecto.
```

### 2. Instalación copy-pasteable

```markdown
❌ "Primero asegúrate de tener Node 18+, luego..."
✅
\`\`\`bash
npm install cosa
\`\`\`

Una línea que funciona.
```

### 3. Ejemplo que funciona

```markdown
❌ Pseudocódigo que nadie puede ejecutar
✅ Código real que copy-pasteas y funciona
```

### 4. Screenshots/GIFs para UI

Si tu proyecto tiene interfaz, muéstrala:

```markdown
![Demo](./demo.gif)
```

## Para proyectos personales/portfolio

```markdown
# 🌟 Mi Proyecto

> Un clon de Twitter construido para aprender React y Node.

## Demo en vivo

👉 [Ver demo](https://mi-proyecto.vercel.app)

## Tecnologías

- React 18 + TypeScript
- Node.js + Express
- PostgreSQL + Prisma
- Tailwind CSS

## Lo que aprendí

- Implementación de autenticación JWT
- Real-time con WebSockets
- Deploy en Vercel y Railway
```

Tania trata cada README como si fuera la landing page de un producto. El README es lo primero que ven recruiters, colaboradores, y usuarios. Invierte tiempo en él: es tu carta de presentación.
