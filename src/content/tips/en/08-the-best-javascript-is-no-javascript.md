---
id: "08"
title: "The best JavaScript is no JavaScript"
category: "Performance"
categoryColor: "text-rose-400 bg-rose-900/20"
author: "una-kravets"
---

Una Kravets, Developer Advocate at Google Chrome, often says a phrase that might sound contradictory for a web developer: **"The best JavaScript is no JavaScript"**.

It's not that Una hates JavaScript; she understands that JavaScript is the most expensive resource we ship to the browser. It has to be downloaded, parsed, compiled, and executed. Every time we can replace JS logic with a native HTML or CSS capability, we win in performance, accessibility, and robustness.

## The Declarative Revolution: Invoker Commands API

Historically, for a button to open a modal or a popover, we needed JavaScript to listen for the `click` event and call the corresponding method.

The new **Invoker Commands API** changes the game by allowing us to define this behavior declaratively directly in HTML.

### The "Legacy" Approach: JavaScript as Glue

```typescript
// We need to wait for JS to load for the button to work
const btn = document.querySelector('#open-dialog');
const dialog = document.querySelector('#my-dialog');

btn.addEventListener('click', () => {
  dialog.showModal();
});
```

### The "Native" Approach: Declarative and JS-free

With `commandfor` and `command` attributes, the browser handles everything. It works instantly, even before any scripts load.

```html
<!-- Without a single line of JavaScript -->
<button commandfor="my-dialog" command="show-modal">
  Open Modal
</button>

<dialog id="my-dialog">
  <p>Modal Content</p>
  <button commandfor="my-dialog" command="close">Close</button>
</dialog>
```

## Popover: Goodbye to Heavy Dependencies

How many times have we installed a 20kb library just to show a tooltip or a dropdown menu? The native `popover` attribute solves this brilliantly.

```html
<button popovertarget="my-popover">Show menu</button>

<div id="my-popover" popover>
  <p>This is a native popover that handles:</p>
  <ul>
    <li>Light dismiss (closing on outside click)</li>
    <li>Closing with the Escape key</li>
    <li>Automatic layering (infinite z-index management)</li>
  </ul>
</div>
```

## Why Choose Native?

1.  **Performance:** The browser executes native code (C++) much faster than any JS engine.
2.  **Resilience:** If your page's JavaScript fails or is slow to load (due to a poor connection), native HTML still works.
3.  **Accessibility (A11y):** Native elements like `<dialog>` or `popover` come with correct keyboard behavior and ARIA roles "out of the box."
4.  **Less Code is Less Liability:** As Rich Harris would say, if you don't write the JS, you don't have to maintain or test it.

The next time you're about to write an `addEventListener`, stop for a second. Look around. It's very likely that the web standard has already evolved so that you don't need that code.

**Embrace the platform. Use native. Write less JavaScript.**
