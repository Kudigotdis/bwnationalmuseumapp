---
title: "Create offline Botswana heritage map with mobile info panel and touch zoom"
created: 2026-10-23T08:10:40+02:00
status: executing
model: "kilo/reflection/beam-free"
session: "smvkj9k39ost5"
steps: 8
files:
  - "Learn Botswana Interactive Map/Learn-Botswana-Interactive-Map.html"
---

# Create offline Botswana heritage map with mobile info panel and touch zoom

> **Request** — make sure the svg is preloaded. i don't know what files in 'C:\Users\Kudzanai\Documents\2025\App Developments\BW Museum App\Learn Botswana Interactive Map\bw_shp' are used for. suggest. at the end i want you to make sure the interactive file you're making is usable and appears on a mobile device portait layout with the map on top and a section below where the information loads when a user taps and icon. The section above where the map is also needs a feature where use finger gestures to zoom in/out and touch screen. No text on the map, the text info appears only in the section below

## Reading

Create a new single-file offline HTML app that inlines the Botswana SVG, shows a touch-zoomable/pannable map on top with a persistent info panel below on mobile portrait, updates that panel (not a popup) when a marker is tapped, and keeps all map labels off the map.

## Decisions

- **For the mobile portrait layout, should the bottom info panel be a persistent section that updates when you tap a marker (recommended), or a collapsible drawer that slides up only on tap?** — persistant keep in mind i need you to create an html because its going to be a section accessible from the main app. when user hasn't selected a place it shows short instruction to select place above.
- **When pinch-zooming the map, should the markers scale with the map (zoom in = bigger icons) or stay a constant on-screen size?** — Scale with map (recommended)
- **The bw_shp folder contains a world shapefile set (every country). Only the bw.* files are Botswana; bw.json is the GeoJSON export of Botswana's 16 districts. For the offline single-file app only bw.svg is needed. How should I handle bw_shp?** — Leave it as-is (recommended)

## Steps

- [ ] Builds a new single-file offline app `Learn-Botswana-Interactive-Map.html` that inlines `bw.svg`, replaces the floating popup with a persistent info panel below the map (mobile portrait), adds touch pinch-zoom/pan with markers scaling, and shows an instruction until a marker is tapped. `bw_shp/` is left untouched.
- [ ] Create the new HTML file by copying the existing template and inlining bw.svg's inner markup (strip XML declaration/DOCTYPE/outer <svg>), preserving every path/g/id/class; set wrapper viewBox 0 0 1000 1000.
  - Files: `Learn Botswana Interactive Map/Learn-Botswana-Interactive-Map.html`
  - Evidence: bw.svg line 7 declares viewbox 0 0 1000 1000
  - Verify: grep -c 'PASTE YOUR BOTSWANA SVG HERE' returns 0
- [ ] Restructure layout: remove floating popup/backdrop/loader; add a persistent section class info-panel below the map that swaps content on marker tap and shows an instruction when nothing is selected.
  - Files: `Learn Botswana Interactive Map/Learn-Botswana-Interactive-Map.html`
  - Evidence: Botswana-Interactive-Map.html line 578 stage and 947 openPopup
  - Verify: No popup or backdrop elements remain; info panel present
- [ ] Add responsive CSS: mobile portrait stacks map above a scrollable info panel about 38vh; desktop keeps the same vertical stack with a larger map.
  - Files: `Learn Botswana Interactive Map/Learn-Botswana-Interactive-Map.html`
  - Evidence: Botswana-Interactive-Map.html line 86 stage flex and 387 bottom-sheet CSS
  - Verify: Mobile portrait shows map on top and info panel below; panel scrolls
- [ ] Implement touch and mouse gesture handling on the map viewport: single-finger drag to pan, two-finger pinch to zoom 1x-4x, wheel zoom; apply transform to the map frame so markers scale with the map; clamp pan to viewport.
  - Files: `Learn Botswana Interactive Map/Learn-Botswana-Interactive-Map.html`
  - Evidence: Botswana-Interactive-Map.html line 888 renderMarkers positions buttons with left/top percent
  - Verify: Pinch zoom scales both SVG and markers together; pan keeps map in view
- [ ] Rewire marker clicks to populate the info panel (name, one-sentence description, coloured category pill, coordinates) instead of a popup; keep legend as a compact category filter.
  - Files: `Learn Botswana Interactive Map/Learn-Botswana-Interactive-Map.html`
  - Evidence: Botswana-Interactive-Map.html line 918 marker click binding and 1047 legend
  - Verify: Tapping a marker updates the info panel; tapping elsewhere keeps last selection or resets to instruction
- [ ] Hide the SVG's label_points group via CSS so no labels appear on the map; keep all geometry paths.
  - Files: `Learn Botswana Interactive Map/Learn-Botswana-Interactive-Map.html`
  - Evidence: bw.svg line 27 label_points group with district circles
  - Verify: No district label circles or text visible on the map
- [ ] Remove the loader/file-picker/drag-drop fallback since the SVG is inlined; init calls afterMapLoaded directly.
  - Files: `Learn Botswana Interactive Map/Learn-Botswana-Interactive-Map.html`
  - Evidence: Botswana-Interactive-Map.html line 1093 loader and 1268 init
  - Verify: App runs offline with no file picker; SVG renders immediately
