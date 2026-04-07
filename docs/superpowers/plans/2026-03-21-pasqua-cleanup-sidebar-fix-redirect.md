# Pasqua Cleanup + Sidebar Fix + missionekenya.com Redirect

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove Pasqua Solidale event/banner, add blog categories, fix mission sidebar overlap, create redirect page for missionekenya.com, configure pasqua.missionekenya.com redirect.

**Architecture:** Direct file edits on existing Astro site. Sidebar fix requires reworking MissionNav component positioning. missionekenya.com redirect is a standalone HTML file to upload via WordPress admin.

**Tech Stack:** Astro, Tailwind CSS, Sveltia CMS, WordPress (for missionekenya.com)

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/layouts/BaseLayout.astro` | Modify | Remove EasterBanner import + component |
| `src/components/EasterBanner.astro` | Delete | Easter promotional banner |
| `src/content/eventi/pasqua-solidale-2026.md` | Delete | Past event (blog article already exists) |
| `src/components/MissionNav.astro` | Rewrite | Fix sidebar overlap, add toggle for medium screens |
| `public/admin/index.html` | Modify | Add category field to blog collection |
| `public/admin/config.yml` | Modify | Add category field to blog collection |
| `src/content.config.ts` | Modify | Add category to blog schema |
| `src/pages/blog/index.astro` | Modify | Show category, add filter if present |
| `LINEE-GUIDA-SEO.md` | Modify | Remove pasqua.missionekenya.com reference |
| `public/redirect-missionekenya.html` | Create | Standalone redirect page for missionekenya.com |

---

### Task 1: Remove EasterBanner and Pasqua event

**Files:**
- Modify: `src/layouts/BaseLayout.astro:3,97`
- Delete: `src/components/EasterBanner.astro`
- Delete: `src/content/eventi/pasqua-solidale-2026.md`
- Modify: `LINEE-GUIDA-SEO.md`

- [ ] **Step 1: Remove EasterBanner from BaseLayout**

In `src/layouts/BaseLayout.astro`, remove line 3:
```
import EasterBanner from '../components/EasterBanner.astro';
```
And remove line 97:
```
    <EasterBanner />
```

- [ ] **Step 2: Delete EasterBanner component**

```bash
rm src/components/EasterBanner.astro
```

- [ ] **Step 3: Delete Pasqua event**

```bash
rm src/content/eventi/pasqua-solidale-2026.md
```

The blog article `src/content/blog/pasqua-2026-insieme.md` stays as historical record.

- [ ] **Step 4: Remove pasqua.missionekenya.com from SEO guidelines**

In `LINEE-GUIDA-SEO.md`, find and remove the line:
```
- Collegare pasqua.missionekenya.com al sito principale
```

- [ ] **Step 5: Build and verify**

```bash
npm run build
```
Expected: 19 pages (was 20, minus the pasqua event page... actually events are dynamic, page count stays same). No errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Remove Pasqua Solidale: banner, event, SEO reference

Pasqua Solidale 2026 concluded successfully. EasterBanner component
removed from layout. Event deleted. Blog article kept as historical
record. pasqua.missionekenya.com reference removed from SEO guide."
```

---

### Task 2: Add category field to blog

**Files:**
- Modify: `public/admin/index.html` (blog collection fields)
- Modify: `public/admin/config.yml` (blog collection fields)
- Modify: `src/content.config.ts` (blog schema)

- [ ] **Step 1: Add category to CMS inline config**

In `public/admin/index.html`, find the blog collection fields array. After the `image` field, add:

```javascript
{ label: 'Categoria', name: 'category', widget: 'select', options: ['Missioni', 'Iniziative', 'Comunità', 'Testimonianze', 'Novità'], default: 'Novità', required: false },
```

- [ ] **Step 2: Add category to CMS YAML config**

In `public/admin/config.yml`, in the blog collection fields, after `image`, add:

```yaml
      - { label: "Categoria", name: "category", widget: "select", options: ["Missioni", "Iniziative", "Comunità", "Testimonianze", "Novità"], default: "Novità", required: false }
```

- [ ] **Step 3: Add category to Astro content schema**

In `src/content.config.ts`, find the blog schema. Add:

```typescript
category: z.enum(['Missioni', 'Iniziative', 'Comunità', 'Testimonianze', 'Novità']).default('Novità').optional(),
```

- [ ] **Step 4: Add default category to existing blog articles**

Add `category: "Iniziative"` to `pasqua-2026-insieme.md` frontmatter.
Add `category: "Missioni"` to `missione-kenya-aggiornamento-2026.md` frontmatter.
Add `category: "Novità"` to `benvenuti-sul-nuovo-sito.md` frontmatter.

- [ ] **Step 5: Build and verify**

```bash
npm run build
npx astro check 2>&1 | grep "error"
```
Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add category dropdown to blog (Missioni, Iniziative, Comunità, etc.)"
```

---

### Task 3: Fix MissionNav sidebar overlap

**Files:**
- Rewrite: `src/components/MissionNav.astro`

The current sidebar is `fixed left-6` which overlaps content on screens between 1024px-1536px. The fix:

- **2xl+ (1536px+):** Show sidebar in the left margin (plenty of space)
- **lg to 2xl (1024-1536px):** Show a small floating toggle button on the left edge. Clicking it slides out the nav panel, pushing nothing — it overlays with a semi-transparent backdrop
- **Below lg:** Keep existing fixed tab bar (unchanged)

- [ ] **Step 1: Rewrite MissionNav.astro**

Rewrite the full component. Desktop nav changes:
- Default class: `hidden 2xl:block fixed left-6 ...` (only visible on 2xl+)
- Add a toggle button: `hidden lg:flex 2xl:hidden fixed left-3 top-1/2 ...` (visible on lg to 2xl only)
- Add a slide-out panel: `hidden fixed left-0 top-0 h-full w-56 bg-warm/98 backdrop-blur-md shadow-xl z-50 ...` that appears when toggle is clicked

The toggle button should be a small round button with a list/menu icon, positioned in the left margin.

When clicked:
- Panel slides in from left
- Backdrop appears (click backdrop to close)
- Links inside work the same (scroll spy, smooth scroll)

Mobile tab bar: unchanged (keep fixed positioning and all current behavior).

- [ ] **Step 2: Test on multiple viewport widths**

Verify manually:
- 1920px: sidebar visible in margin, no overlap
- 1400px: toggle button visible, sidebar hidden, click opens panel
- 768px: tab bar at top works

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/MissionNav.astro
git commit -m "Fix mission sidebar: margin on 2xl+, toggle panel on lg-2xl"
```

---

### Task 4: Create redirect page for missionekenya.com

**Files:**
- Create: `public/redirect-missionekenya.html`

This is a standalone HTML file that will be uploaded to the WordPress site to replace the homepage. It shows a "Ci siamo trasferiti" message with the Efraim branding and auto-redirects after 5 seconds.

- [ ] **Step 1: Create the redirect HTML page**

Create `public/redirect-missionekenya.html` — standalone HTML (no dependencies), same style as coming-soon.html:
- Dark green background, Efraim branding
- "Ci siamo trasferiti!" heading
- "Il sito Missione Kenya si è trasferito su efraimchurch.com" 
- Prominent button "Vai al nuovo sito" linking to `https://efraimchurch.com/missioni/kenya/`
- Auto-redirect via `<meta http-equiv="refresh" content="8;url=https://efraimchurch.com/missioni/kenya/">`
- Countdown text "Sarai reindirizzato automaticamente tra X secondi..."
- Contact emails shown

- [ ] **Step 2: Commit**

```bash
git add public/redirect-missionekenya.html
git commit -m "Add redirect page for missionekenya.com migration"
```

---

### Task 5: Push all changes

- [ ] **Step 1: Push to main**

```bash
git push origin main
```

---

### Task 6: Manual steps (utente)

These cannot be done by code — require manual dashboard/admin access.

- [ ] **Step 6a: Redirect pasqua.missionekenya.com**

1. Vai su Vercel Dashboard → progetto `pasqua-missionekenya`
2. Settings → Domains
3. Click Edit su `pasqua.missionekenya.com`
4. Seleziona "Redirect to Another Domain"
5. Scrivi: `efraimchurch.com/missioni/kenya/`
6. Seleziona `301 Moved Permanently`
7. Salva

- [ ] **Step 6b: Sostituire missionekenya.com con pagina redirect**

1. Accedi al pannello WordPress admin di missionekenya.com
2. Vai su Aspetto → Editor del tema (o Personalizza)
3. Alternativa più semplice: installa il plugin "Safe Redirect Manager" o "Redirection"
4. Configura un redirect 301 da `/` (homepage) a `https://efraimchurch.com/missioni/kenya/`
5. Oppure: se vuoi la pagina con messaggio, vai su Pagine → crea nuova pagina "Ci siamo trasferiti", imposta come homepage, inserisci il contenuto con link al nuovo sito

**Opzione alternativa (più radicale):**
Se vuoi spegnere completamente WordPress e mostrare solo il redirect:
1. Accedi al File Manager di Aruba (pannello hosting, non WordPress)
2. Rinomina `index.php` in `index.php.bak`
3. Carica il file `redirect-missionekenya.html` rinominandolo `index.html`
4. Il server mostrerà la pagina di redirect al posto di WordPress

---

## Riepilogo

| Task | Chi | Tempo stimato |
|------|-----|---------------|
| Task 1: Rimuovi Pasqua | Claude | 2 min |
| Task 2: Categorie blog | Claude | 3 min |
| Task 3: Fix sidebar | Claude | 10 min |
| Task 4: Pagina redirect | Claude | 3 min |
| Task 5: Push | Claude | 1 min |
| Task 6a: Redirect pasqua Vercel | Utente | 2 min |
| Task 6b: Redirect missionekenya | Utente | 10 min |
