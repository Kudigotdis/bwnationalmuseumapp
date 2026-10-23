---
title: "Move Botswana Map button out of accordion"
created: 2026-10-23T12:40:13+02:00
status: executing
model: "kilo/reflection/beam-free"
session: "smvkj9k39ost5"
steps: 3
files:
  - "index.html"
---

# Move Botswana Map button out of accordion

> **Request** — okay the button should not be in the accordion. it should be under as in above 'class="section-label"Trivia Games' and below 'class="acc-btn orange"' (remove '🌍' so it just read 'Around Botswana' and remove '▾')

## Reading

The Botswana Map button should sit below the Around Botswana accordion (not inside it), and the accordion header should read "Around Botswana" with no emoji or chevron.

## Steps

- [ ] Remove the acc-interactive-map tile from inside the accordion body
  - Files: `index.html`
  - Evidence: index.html:10405-10411 contains the tile inside acc-body
  - Verify: grep shows tile no longer inside acc-body
- [ ] Change accordion button text to 'Around Botswana' (remove 🌍 and ▾)
  - Files: `index.html`
  - Evidence: index.html:10402 <span>🌍 Around Botswana</span><span class="chev">▾</span>
  - Verify: button text is 'Around Botswana'
- [ ] Insert the acc-interactive-map tile just before the Trivia Games section label
  - Files: `index.html`
  - Evidence: index.html:10418-10419 html += ` <div class="section-label">Trivia Games</div>`
  - Verify: tile appears above Trivia Games label
