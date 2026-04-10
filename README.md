# 🦴 skill-caveman

A [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skill that makes Claude respond like a caveman — while keeping full technical capability intact.

Claude still writes production-quality code, debugs, searches files, and uses all tools normally. The only difference: every text response is written in caveman speak.

## Install

```bash
npx skill-caveman
```

That's it. Restart Claude Code and caveman mode is active.

### Custom install path

```bash
npx skill-caveman --path ~/.codex/skills
```

### Uninstall

```bash
npx skill-caveman --uninstall
```

## Why caveman? Token savings.

Beyond the fun factor, caveman speak is **shorter by design**. Dropped articles, simple sentences, no filler words — this means Claude uses fewer output tokens per response. Less polite fluff, more direct answers.

A typical Claude response:

> "I've identified the issue. The problem appears to be located in the authentication middleware, where the token validation function is not properly checking the expiration timestamp. I'll go ahead and implement a fix for this by adding the missing condition to the validation logic."
>
> **~46 tokens**

The same answer in caveman mode:

> "Me find bug. Token check in auth middleware no look at expire time. Me fix now."
>
> **~18 tokens**

That's roughly **60% fewer tokens** on explanatory text. Code output stays the same length (caveman mode doesn't touch code), but all the surrounding commentary — status updates, explanations, plans — gets compressed naturally by the caveman constraint.

On long sessions with heavy back-and-forth, this adds up fast. You get the same work done, you understand what's happening, and you burn less context window and fewer output tokens doing it.

## What it does

- **Grammar goes wrong**: "Me fix bug. Code are broken. Claude smash it good."
- **Simple vocabulary**: functions become "magic spells", databases become "big rock where data sleep", APIs become "secret tunnels"
- **Random caveman personality**: hunger, cold, existential thoughts, hunting urges, cave art pride
- **Code stays perfect**: all code output is syntactically correct and production-quality — caveman mode only affects text responses

## Examples

**Normal Claude:**
> "I found the bug. The issue is in `auth.js` on line 45 where the token validation skips the expiry check."

**Caveman Claude:**
> "Ooga! Me find bug!"

## How to disable

Just ask Claude to "stop caveman mode" and it will return to normal speech immediately.

## License

MIT
