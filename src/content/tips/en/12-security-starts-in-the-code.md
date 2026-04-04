---
id: "12"
title: "Security starts in the code"
category: "Security"
categoryColor: "text-red-400 bg-red-900/20"
author: "parisa-tabriz"
---

In 2007, a young security engineer was hired by Google as a "hired hacker." Her job: find vulnerabilities in Google's web applications before attackers did. That person was **Parisa Tabriz**, who would go on to become VP of Chrome and lead one of the most significant security transformations on the Internet.

Her business card read **"Security Princess"** — a title she chose herself to demystify security and make it more approachable. Her philosophy is clear: **security isn't bolted on at the end, it's built from the very first line of code.**

## The HTTPS lesson: changing the entire web

When Parisa began leading Chrome security, less than half of web pages used HTTPS. Most traffic traveled in plain text — passwords, banking data, private messages, all visible to anyone intercepting the connection.

Instead of waiting for sites to migrate voluntarily, Parisa made a bold call: Chrome would display a "Not Secure" warning next to the address bar on HTTP pages. The industry pushed back, but it worked. Within a few years, HTTPS adoption went from 50% to over 90%.

The deeper lesson: **making the secure path the easy path** is more effective than any audit. If your framework, linter, or CI/CD pipeline catches security issues automatically, your team will avoid them effortlessly.

## Think like an attacker: threat modeling

Parisa manages **Project Zero**, Google's offensive security research team that hunts zero-day vulnerabilities across all kinds of software. Their approach isn't "wait for something bad to happen" — it's **attack your own system before someone else does**.

You don't need to be a security expert. Before writing a feature, ask yourself three questions:

1. **What data am I handling?** Personal, financial, or authentication data demands the highest level of protection.
2. **Who might want access?** A curious user, an automated bot, an experienced attacker — each requires a different defense.
3. **What's the worst-case scenario?** If the answer is "all my users' passwords leak," invest more time in that part of the code.

## CSRF: the attack that impersonates you

While SQL injection and XSS are the most well-known attacks, **Cross-Site Request Forgery (CSRF)** is equally dangerous and far more subtle. The attacker doesn't need your password — they make your own browser perform actions on your behalf.

```html
<!-- ❌ An "innocent" email with a hidden image -->
<img src="https://your-bank.com/api/transfer?to=attacker&amount=5000" />
<!-- Your browser sends the request with your active session cookie -->
```

```javascript
// ✅ CSRF token protection
app.use((req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const token = req.headers['x-csrf-token'];
    if (!token || token !== req.session.csrfToken) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }
  }
  next();
});
```

The `SameSite` cookie attribute is another effective barrier that costs a single line:

```javascript
// ✅ Cookies with SameSite to prevent CSRF
res.cookie('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
});
```

## Make the secure choice the default

Parisa's philosophy boils down to one idea: **if the secure option requires extra effort, nobody will use it**. That's why her greatest impact wasn't finding bugs — it was changing Chrome's defaults for millions of users.

Apply the same principle in your code:

```javascript
// ❌ Security as an optional parameter
function createServer(port, { https = false } = {}) {
  // Most developers won't even notice this option
}

// ✅ Secure by default, insecure only when explicitly requested
function createServer(port, { disableHTTPS = false } = {}) {
  if (disableHTTPS) {
    console.warn('⚠️ Running without HTTPS. Only use in development.');
  }
}
```

## Security is everyone's responsibility

Parisa insists on something many companies overlook: **security isn't just the security team's job**. Every developer writing a form, every person configuring a server, every designer deciding what data to request — they're all part of the security chain.

This translates into concrete habits:

1. Validate on the server, never only on the client. Frontend validation is UX; backend validation is security.
2. Use `Content-Security-Policy` to control which scripts run on your page.
3. Set `Strict-Transport-Security` to enforce HTTPS without exceptions.
4. Review your dependencies regularly: `npm audit` or `pnpm audit` are not optional.
5. Rate-limit login attempts and API endpoints.

You don't need to be Google's "Security Princess" to write secure code. You just need to accept that every line of code is a security decision — and that the best defense starts the moment you open your editor. As Parisa proved by transforming the entire web: **when you make the secure path the easy path, everyone wins.**
