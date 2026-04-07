# Linee Guida SEO - Efraim Church

## Come funziona il sito

Il sito e' **statico**: i contenuti vengono letti al momento della build, non in tempo reale.
Quando modifichi un evento o un articolo dal CMS (pannello admin), viene creato un commit su GitHub, che fa partire automaticamente una nuova build su Vercel. Il sito si aggiorna in circa 1-2 minuti.

---

## 1. Google Business Profile (Priorita' massima)

Il profilo Google "Centro Cristiano Efraim" e' il primo punto di contatto per chi cerca "chiesa evangelica messina" su Google. Ha gia' 4.9 stelle con 21 recensioni.

**Azioni:**
- Verificare che il profilo sia aggiornato con l'indirizzo corretto (Via B. Colleoni 43, zona Minissale)
- Aggiungere gli orari: Domenica 10:00, Mercoledi' 18:00, Venerdi' 19:00 (HolyDay)
- Caricare foto reali della chiesa, dei culti, degli eventi, del team
- Aggiungere il link al sito web quando sara' sul dominio definitivo
- Chiedere ai membri di lasciare recensioni su Google (piu' recensioni = piu' visibilita')
- Rispondere a TUTTE le recensioni entro 24 ore (Google premia l'engagement)

---

## 2. Parole chiave target

### Parole chiave principali (da usare nei titoli e nei testi)
- "chiesa evangelica messina"
- "chiesa cristiana messina"
- "efraim church"
- "chiesa efraim messina"
- "service evangelico messina"

### Parole chiave missioni (per le pagine missioni e il blog)
- "missione kenya"
- "missioni umanitarie kenya"
- "adozione a distanza kenya"
- "missione india"
- "adozione a distanza india"
- "missioni umanitarie india"
- "chiesa evangelica missioni"

### Parole chiave eventi
- "eventi chiesa messina"
- "pasqua solidale messina"
- "holyday giovani messina"

---

## 3. Contenuti blog (1 articolo a settimana)

Il blog e' lo strumento piu' potente per la SEO. Ogni articolo porta nuove visite e migliora il posizionamento.

### Temi suggeriti per i primi 3 mesi:

**Settimana 1-4 (Marzo-Aprile):**
- "Cosa aspettarsi al primo Service alla Chiesa Efraim"
- "Pasqua Solidale 2026: come donare un uovo e cambiare una vita"
- "La nostra missione in Kenya: 13 anni a Kasue"
- "HolyDay: il venerdi' sera dei giovani a Messina"

**Settimana 5-8 (Aprile-Maggio):**
- "Mission Party 2026: una serata per le missioni"
- "La storia della Chiesa Efraim di Messina"
- "Come funziona l'adozione a distanza in Kenya"

**Settimana 9-12 (Maggio-Giugno):**
- "Perche' la chiesa fa missioni umanitarie"
- "Vita di comunita': le famiglie di Efraim"
- "5x1000 alla Chiesa Efraim: come funziona"
- "I valori della Chiesa Efraim"

### Come scrivere un buon articolo per la SEO:
1. **Titolo**: includi la parola chiave principale (es. "Chiesa Efraim Messina")
2. **Descrizione**: max 160 caratteri, riassumi il contenuto
3. **Primo paragrafo**: menziona subito l'argomento principale
4. **Sottotitoli (H2, H3)**: usa parole chiave correlate
5. **Lunghezza**: almeno 300-500 parole
6. **Immagine**: aggiungi sempre un'immagine con alt text descrittivo
7. **Link interni**: linka ad altre pagine del sito (es. /missioni/kenya/, /dona/)

---

## 4. Social Media (amplificazione)

I social non influenzano direttamente la SEO, ma portano traffico al sito.

**Instagram (@efraim.church):**
- Ogni articolo del blog va condiviso nelle stories con link
- Usare hashtag locali: #MessinaChiesa #ChiesaEvangelica #Efraim
- Postare foto degli eventi e dei culti

**YouTube (@EfraimChurch):**
- Le dirette dei culti sono gia' un ottimo contenuto
- Aggiungere link al sito nella descrizione di ogni video
- Creare playlist tematiche (culti, missioni, eventi)

**Facebook:**
- Condividere ogni articolo del blog
- Creare eventi Facebook per ogni evento del sito

---

## 5. Link building (medio termine)

I link da altri siti verso il nostro migliorano l'autorita' del dominio.

**Azioni:**
- Registrare il sito su directory di chiese evangeliche italiane
- Collegare missionekenya.com al nuovo sito con link prominenti
- Registrarsi su Google Maps e Bing Places

---

## 6. Monitoraggio

**Strumenti gratuiti da configurare:**
- Google Search Console (per monitorare le parole chiave e l'indicizzazione)
- Google Analytics (per monitorare il traffico)
- Google Business Profile Insights (per le ricerche locali)

**Metriche da controllare mensilmente:**
- Posizionamento per "chiesa evangelica messina" (obiettivo: primi 3 risultati)
- Numero di visite al sito
- Numero di click da Google Maps
- Numero di recensioni Google

---

## 7. Checklist tecnica (gia' implementata)

- [x] Sitemap XML generata automaticamente
- [x] robots.txt configurato
- [x] Meta tags (title, description) su ogni pagina
- [x] Open Graph tags per condivisione social
- [x] HTML semantico (nav, main, article, section, footer)
- [x] Alt text sulle immagini
- [x] URL puliti e descrittivi (/missioni/kenya/, /eventi/, etc.)
- [x] Sito responsive (mobile-first)
- [x] Pagine statiche (performance massima, Core Web Vitals ottimi)
- [x] HTTPS attivo
- [ ] Schema.org structured data (Church, Event, Organization) - da aggiungere
- [ ] Google Search Console collegata - da configurare
- [ ] Google Analytics collegata - da configurare

---

## Note sul CMS

**Accesso admin:** /admin/ (password: efraim2026)
**Autenticazione:** GitHub Personal Access Token
**Come creare un token:** github.com/settings/tokens → "Generate new token" → scope "repo" → copia e incolla nel CMS

Quando salvi un contenuto dal CMS:
1. Il CMS crea un commit su GitHub
2. Vercel rileva il commit e ricostruisce il sito
3. Il sito si aggiorna in 1-2 minuti

---

*Documento creato il 18 marzo 2026 per la Chiesa Cristiana Evangelica Efraim di Messina.*
