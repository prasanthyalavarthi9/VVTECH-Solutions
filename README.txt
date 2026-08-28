VVTech Solutions Website - Responsive Update

Updated files:
- index.html
- styles.css
- script.js
- script-required.js (compatibility stub; no longer loaded by index.html)
- styles-requird.css (legacy compatibility stub; no longer loaded by index.html)
- sitemap.xml (lastmod updated to 2026-08-28)

Key updates:
- Preserved the existing visual design and content.
- Removed Font Awesome 4.7 CDN dependency; the local Font Awesome 6 CSS remains.
- Moved Hero Card styling out of index.html into styles.css.
- Consolidated Approach, Services and AI JavaScript into script.js.
- Mobile navigation now locks page scrolling while open and closes on Escape/resize.
- Approach/Services auto-rotation is disabled on touch/mobile and reduced-motion devices.
- Added mobile-safe viewport sizing using svh/dvh and safe-area insets.
- Prevented horizontal page overflow.
- Made Hero Card and contact layouts fluid on small screens.
- Reduced 360-degree wheel sizing on small phones without changing the design.
- Removed the malformed duplicate closing braces in the contact CSS section.
- Removed rigid mobile contact heights and the 9000px contact feature-grid workaround.
- Standardized production filenames and cache-busting references.

Deployment:
1. Replace the existing index.html, styles.css and script.js with the updated versions.
2. Keep script-required.js/styles-requird.css only if another page or old deployment references them.
3. Keep all existing assets and all.min.css unchanged.
4. Upload sitemap.xml and keep the existing CNAME/robots.txt.
