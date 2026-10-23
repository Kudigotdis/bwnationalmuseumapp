---
title: "Make bottom nav background orange"
created: 2026-10-23T12:12:16+02:00
status: executing
model: "kilo/dots-studio/dots-3-note-preview:free"
session: "smvkj9k39ost5"
steps: 2
files:
  - "Learn Botswana Interactive Map/Learn-Botswana-Interactive-Map.html"
---

# Make bottom nav background orange

> **Request** — the bottom nav background on 'Learn-Botswana-Interactive-Map.html' needs to be orange [Mode changed: agent → plan. This mode governs from now on, whatever earlier messages in this conversation did. You can read and run read-only commands, but NOT edit files. Produce a plan, do not implement it.]

## Reading

The bottom navigation bar background in Learn-Botswana-Interactive-Map.html should be orange instead of dark.

## Steps

- [ ] Change the bottom navigation bar background in Learn-Botswana-Interactive-Map.html from dark rgba to the app's terracotta orange (#D17226).
- [ ] Replace the background property of #bottomNav with #D17226
  - Files: `Learn Botswana Interactive Map/Learn-Botswana-Interactive-Map.html`
  - Evidence: background: rgba(18,15,12,.96) on line 130
  - Verify: grep shows #bottomNav background is now #D17226
