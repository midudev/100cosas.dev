---
id: "43"
title: "Convención sobre configuración: menos decisiones, más productividad"
category: "Productividad"
categoryColor: "text-lime-400 bg-lime-900/20"
author: "dhh"
---

David Heinemeier Hansson (DHH), creador de Ruby on Rails, popularizó un principio que cambió la forma de pensar sobre frameworks: **"Convención sobre configuración"**.

## El problema de la configuración infinita

Antes de Rails, configurar un proyecto web era una pesadilla:

```xml
<!-- struts-config.xml en Java circa 2004 -->
<action-mappings>
  <action path="/users/show"
          type="com.app.actions.users.ShowAction"
          name="userForm"
          scope="request"
          validate="false">
    <forward name="success" path="/WEB-INF/views/users/show.jsp"/>
  </action>
</action-mappings>
```

Cada endpoint requería configuración explícita. Cada tabla necesitaba mapeo manual. Cada decisión recaía en el desarrollador.

## La revolución de Rails

Rails propuso algo radical: **si sigues las convenciones, no necesitas configurar nada**:

```ruby
# Esto es TODO lo que necesitas
class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end
end
```

Rails asume:
- La tabla se llama `users` (plural del modelo)
- La vista está en `app/views/users/show.html.erb`
- La ruta es `GET /users/:id`

**Cero configuración**. Si no te gusta la convención, puedes cambiarla. Pero el 90% del tiempo, la convención es exactamente lo que necesitas.

## Aplicando el principio hoy

### Next.js: rutas basadas en sistema de archivos

```
pages/
├── index.js        → /
├── about.js        → /about
└── users/
    ├── index.js    → /users
    └── [id].js     → /users/:id
```

No hay configuración de rutas. La estructura de carpetas **es** la configuración.

### Vite: configuración cero para empezar

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

Funciona. Sin webpack.config.js de 500 líneas.

### Tailwind: clases con nombres predecibles

```html
<!-- La convención es obvia: {propiedad}-{valor} -->
<div class="mt-4 p-6 bg-blue-500 text-white rounded-lg">
```

No necesitas memorizar nada porque el patrón es consistente.

## Cuándo romper la convención

DHH no dice "nunca configures". Dice "**configura solo cuando lo necesites**":

```ruby
# La convención no aplica aquí: mi tabla legacy se llama "tbl_usr_data"
class User < ApplicationRecord
  self.table_name = "tbl_usr_data"
end
```

La convención es el camino feliz. La configuración es la escotilla de escape.

## El coste oculto de "máxima flexibilidad"

Algunos frameworks presumen de ser "flexibles" y "no opinionados":

```javascript
// "Puedes organizar tu código como quieras"
// 6 meses después: cada archivo en un lugar diferente
// Cada desarrollador con su propia "arquitectura"
```

La flexibilidad sin guía se convierte en caos. Las convenciones fuertes crean equipos productivos.

DHH entendió algo fundamental: **las decisiones tienen un coste cognitivo**. Cada configuración que tienes que escribir es tiempo no dedicado a resolver problemas reales. Los mejores frameworks reducen las decisiones sin eliminar la flexibilidad. Te dan un camino por defecto que funciona, y te dejan desviarte cuando realmente lo necesitas.
