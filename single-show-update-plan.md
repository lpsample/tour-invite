# Plan: Update Tour Invite to Single Show

## Overview

Convert the existing "SAM SAMPLE SEPTEMBER" tour invitation experience into a single-show invite for **December 5 at Nublu**. The ticket link is: `https://shotgun.live/en/events/welcome-to-the-sa-mily?utm_source=bandsintown`

No structural or interaction changes are needed — only copy, config, and URL updates across two files.

---

## Sub-Tasks

---

### Sub-Task 1: Update `index.html` copy and ticket link

**Intent**  
Replace all tour-specific copy in the HTML with single-show messaging, and swap the placeholder ticket URL with the real Shotgun link.

**Expected Outcomes**
- Page `<title>` no longer references a tour
- The intro screen copy references a single show, not a tour
- The revealed invitation subtitle reflects the December 5 Nublu show
- The personal message body copy refers to a single show instead of a tour rollout
- The ticket button `href` points to the Shotgun link

**Todo List**
1. In `<title>` (line 6): change `Break the Mirror - Homecoming Tour Invitation` → `Break the Mirror - Show Invitation`
2. In intro screen (line 90): change `unlock your exclusive tour invitation from Sam` → `unlock your exclusive show invitation from Sam`
3. In invitation subtitle (line 66): change `SAM SAMPLE SEPTEMBER` → `WELCOME TO THE SAMILY`
4. In personal message (line 67): rewrite to reference the single show at Nublu on December 5 instead of a tour
5. In ticket button `href` (line 68): replace `https://www.submithub.com/link/sam-sample-sept-tour` with `https://shotgun.live/en/events/welcome-to-the-sa-mily?utm_source=bandsintown`

**Relevant Context**
- File: `index.html`
- Lines 6, 66–68, 90

**Status:** [ ] pending

---

### Sub-Task 2: Update `mirror-break.js` show config and easter eggs

**Intent**  
Fill in the `config` object with the real show date and venue, and update the two easter egg strings that reference the tour.

**Expected Outcomes**
- `this.config.showDate` is `'December 5'`
- `this.config.showVenue` is `'Nublu'`
- `this.config.showTime` remains `'TBA'` (no time was provided)
- Easter eggs "Homecoming awaits..." and "The tour begins..." are replaced with show-appropriate phrases

**Todo List**
1. Update `showDate` (line 43): `'TBA'` → `'December 5'`
2. Update `showVenue` (line 45): `'TBA'` → `'Nublu'`
3. Update easter egg (line 31): `"Homecoming awaits..."` → `"You're invited on December 5..."`
4. Update easter egg (line 32): `"Get ready to dance..."` → `"Nublu is calling..."`

**Relevant Context**
- File: `mirror-break.js`
- Lines 29–46

**Status:** [ ] pending

---

### Sub-Task 3: Update the custom domain in `CNAME`

**Intent**
Point the GitHub Pages custom domain from `tour-invite.samsamplemusic.com` to `show-invite.samsamplemusic.com`.

**Expected Outcomes**
- `CNAME` contains `show-invite.samsamplemusic.com` as the only line

**Todo List**
1. Replace the single line in `CNAME`: `tour-invite.samsamplemusic.com` → `show-invite.samsamplemusic.com`

**Relevant Context**
- File: `CNAME` (root of repo, line 1)
- Note: after this change, the DNS CNAME record at the domain registrar/DNS provider for `show-invite.samsamplemusic.com` must also be pointed to `<username>.github.io` for the domain to resolve. That's outside the codebase but worth doing at the same time.

**Status:** [ ] pending

---

## Notes

- The `updateShowDetails()` method in `mirror-break.js` (lines 370–374) references `show-date`, `show-time`, and `show-venue` element IDs that do **not exist** in `index.html`. This is a pre-existing bug and is out of scope for this update — the show info is conveyed through the invitation copy text, not those missing elements.
- No changes needed to `styles.css`, `camera-handler.js`, `audio-engine.js`, or any other files.
