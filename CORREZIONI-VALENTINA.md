# Correzioni e aggiornamenti — Valentina Smeraldi (21/03/2026)

## Stato: In lavorazione

---

## Correzioni da applicare

### 1. Orfanotrofio femminile Myriam La Spada
- **Prima**: "in fase di completamento"
- **Dopo**: **completato**. A gennaio 2026 installati pannelli solari e rivestimento bagni.
- **File coinvolti**: `src/data/missione-kenya.json` (descrizione), `src/pages/missioni/kenya.astro` (se hardcoded)

### 2. FAQ adozioni — rimuovere "Posso incontrare il bambino?"
- I viaggi missionari attuali non sono adatti ai visitatori
- Si lavorera su questo in futuro
- **File**: `src/pages/adozioni.astro`

### 3. Aggiornamenti adozioni — rimuovere "incluse foto"
- Lasciar generico: "Riceverai aggiornamenti periodici sul bambino adottato"
- Lo staff sta definendo come interfacciarsi con gli sponsor
- **File**: `src/pages/adozioni.astro` (checklist + FAQ)

### 4. Focus comunicazione
- Spingere su: sostegno alla missione + adozioni **dentro gli orfanotrofi**
- Ridurre enfasi su: adozioni "completamente a distanza" (difficili per lo staff Kenya)
- **Impatto**: toni e CTA nelle pagine adozioni e missioni

---

## Nuova sezione: Obiettivi missione Kenya

### Obiettivi raggiunti
- Costruzione del pozzo con acqua potabile
- Costruzione orfanotrofio maschile (dedicato a Gianluca Chiliberti)
- Costruzione orfanotrofio femminile (dedicato a Myriam La Spada) + pannelli solari + bagni rivestiti
- Mucche e capre
- Coltivazione di verdure locali e alberi da frutto
- Piccolo ambulatorio clinico per first aid

### Obiettivi da raggiungere
- Costruzione di 2 sale da pranzo e stanze polifunzionali per attivita ricreative
- Pollaio
- Scuola dei mestieri
- Costruzione di una chiesa
- Nuovi bagni maschili
- Ampliamento orfanotrofio maschile
- Casa del custode
- Acquisto di un van

### Note di Valentina
- "Questa sara una pagina importante perche da qui prenderemo spunto per far partire le campagne di raccolta fondi"
- Ogni obiettivo futuro potra avere un link Stripe dedicato per raccolta fondi

---

## Decisioni architetturali

- Obiettivi inseriti come **sezione nella pagina `/missioni/kenya/`** (non pagina separata)
- Navigazione interna missione: sidebar desktop + tab bar mobile
- In futuro: possibilita di estrarre gli obiettivi in una pagina dedicata se necessario
