---
id: "47"
title: "The best documentation is code that doesn't need it"
category: "Readability"
categoryColor: "text-teal-400 bg-teal-900/20"
author: "kelsey-hightower"
---

Kelsey Hightower, principal engineer at Google Cloud and one of the most respected voices in DevOps, is famous for his minimalist demos and direct philosophy: **if your code needs a lot of documentation to be understood, the problem is probably the code**.

## The problem with separate documentation

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
# See docs/deployment-guide.md to understand these values
# Last updated: 6 months ago (probably outdated)
metadata:
  name: my-app
  labels:
    # Don't change this label, breaks the service (see JIRA-1234)
    app: legacy-name-dont-change
```

Separate documentation has a fundamental problem: **it gets out of sync with the code**.

## Kelsey's approach

In his legendary demos, Kelsey shows complex Kubernetes systems without slides. The code speaks for itself:

```yaml
# Self-explanatory
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-frontend
  labels:
    app: web-frontend
    team: platform
    environment: production
spec:
  replicas: 3  # Same number as availability zones
  selector:
    matchLabels:
      app: web-frontend
```

The names, the structure, the values - everything tells a clear story.

## Self-documenting code

### Meaningful variables

```javascript
// ❌ Needs comment
const d = 7; // days until expiration

// ✅ Self-explanatory
const daysUntilExpiration = 7;
```

### Functions that describe their purpose

```javascript
// ❌ What does this do?
function proc(u, f) {
  if (f) return u.filter(x => x.a);
  return u;
}

// ✅ The name is the documentation
function getActiveUsers(users, includeInactiveUsers = false) {
  if (includeInactiveUsers) return users;
  return users.filter(user => user.isActive);
}
```

### Declarative configuration

```javascript
// ❌ Cryptic config
const config = {
  rt: 3,
  to: 5000,
  mx: 100
};

// ✅ Self-explanatory config
const config = {
  maxRetries: 3,
  timeoutMs: 5000,
  maxConcurrentRequests: 100
};
```

## When TO document

Kelsey doesn't say "never document". Document:

### 1. The "why", not the "what"

```javascript
// The "what" is obvious from code
// The "why" needs explanation
const TIMEOUT_MS = 30000; // Stripe webhook can take up to 25s in extreme cases

// Workaround for bug in library X (issue #1234)
// TODO: Remove when we upgrade to v3.0
```

### 2. Architecture decisions

```markdown
# ADR-001: Using PostgreSQL over MongoDB

## Context
We need persistence for user data...

## Decision
PostgreSQL because...

## Consequences
- Positive: ACID, mature tooling...
- Negative: Less flexible for changing schemas...
```

### 3. Public APIs

```typescript
/**
 * Sends a welcome email to the newly registered user.
 *
 * @param userId - User ID (must exist in database)
 * @throws {UserNotFoundError} If user doesn't exist
 * @throws {EmailServiceError} If sending fails
 */
async function sendWelcomeEmail(userId: string): Promise<void>
```

## Final reflection

Documentation is a patch. Sometimes necessary, but a patch. Clear code, descriptive names, and obvious structure are the real cure. Kelsey demonstrates in every demo that the most complex systems can be understandable if they're well designed.
