---
id: "43"
title: "Convention over configuration: fewer decisions, more productivity"
category: "Productivity"
categoryColor: "text-lime-400 bg-lime-900/20"
author: "dhh"
---

David Heinemeier Hansson (DHH), creator of Ruby on Rails, popularized a principle that changed the way we think about frameworks: **"Convention over configuration"**.

## The problem of infinite configuration

Before Rails, configuring a web project was a nightmare:

```xml
<!-- struts-config.xml in Java circa 2004 -->
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

Each endpoint required explicit configuration. Each table needed manual mapping. Every decision fell on the developer.

## The Rails revolution

Rails proposed something radical: **if you follow the conventions, you don't need to configure anything**:

```ruby
# This is ALL you need
class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end
end
```

Rails assumes:
- The table is called `users` (plural of the model)
- The view is at `app/views/users/show.html.erb`
- The route is `GET /users/:id`

**Zero configuration**. If you don't like the convention, you can change it. But 90% of the time, the convention is exactly what you need.

## Applying the principle today

### Next.js: file system based routing

```
pages/
├── index.js        → /
├── about.js        → /about
└── users/
    ├── index.js    → /users
    └── [id].js     → /users/:id
```

No route configuration. The folder structure **is** the configuration.

### Vite: zero config to start

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

It works. No 500-line webpack.config.js.

### Tailwind: classes with predictable names

```html
<!-- The convention is obvious: {property}-{value} -->
<div class="mt-4 p-6 bg-blue-500 text-white rounded-lg">
```

You don't need to memorize anything because the pattern is consistent.

## When to break convention

DHH doesn't say "never configure". He says "**configure only when you need to**":

```ruby
# The convention doesn't apply here: my legacy table is called "tbl_usr_data"
class User < ApplicationRecord
  self.table_name = "tbl_usr_data"
end
```

Convention is the happy path. Configuration is the escape hatch.

## The hidden cost of "maximum flexibility"

Some frameworks boast about being "flexible" and "unopinionated":

```javascript
// "You can organize your code however you want"
// 6 months later: every file in a different place
// Every developer with their own "architecture"
```

Flexibility without guidance becomes chaos. Strong conventions create productive teams.

## Final reflection

DHH understood something fundamental: **decisions have a cognitive cost**. Every configuration you have to write is time not spent solving real problems. The best frameworks reduce decisions without eliminating flexibility. They give you a default path that works, and let you deviate when you really need to.
