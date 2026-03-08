# ArcadeWave — Guide de setup complet

---

## 1. BASE DE DONNÉES — MongoDB

### En local (développement)

**Installer MongoDB Community Server**
- Télécharge : https://www.mongodb.com/try/download/community
- Windows → MSI → coche **"Install MongoDB as a Service"**
- MongoDB démarre automatiquement à chaque démarrage de Windows

**Vérifier que MongoDB tourne**
```bash
# Dans un terminal
mongosh
# Si ça ouvre un shell mongo → OK
# Pour quitter : exit
```

**Peupler la base avec les jeux de démo**
```bash
npm run seed
# Output attendu :
# Connecting to MongoDB: mongodb://localhost:27017/arcadewave
# Dropping existing games...
# Inserting 21 games...
# ✓ Done. 21 games in MongoDB.
```

**Voir la base de données (optionnel)**
- Installe MongoDB Compass : https://www.mongodb.com/try/download/compass
- Connexion string : `mongodb://localhost:27017`
- Tu vois ta collection `games` avec tous les jeux

---

### En production (MongoDB Atlas — cloud gratuit)

**Créer un cluster gratuit**
1. Va sur https://www.mongodb.com/atlas
2. Créer un compte → New Project → Create Cluster
3. Choisis **M0 Free** (512MB gratuit, suffisant pour 10 000 jeux)
4. Provider : AWS, région la plus proche (ex: Frankfurt)
5. Cluster Name : `arcadewave`

**Configurer l'accès**
1. **Database Access** → Add New Database User
   - Username : `arcadewave`
   - Password : génère un mot de passe fort (note-le)
   - Role : `Atlas admin`

2. **Network Access** → Add IP Address
   - Pour Vercel : clique **Allow Access from Anywhere** (`0.0.0.0/0`)
   - (Vercel utilise des IPs dynamiques, donc on doit tout autoriser)

**Récupérer l'URI de connexion**
1. **Database** → Connect → Drivers
2. Copie l'URI : `mongodb+srv://arcadewave:<password>@cluster0.xxxxx.mongodb.net/arcadewave`
3. Remplace `<password>` par ton mot de passe

**Seeder Atlas depuis ton PC**
```bash
# Met l'URI Atlas dans .env.local temporairement
MONGODB_URI=mongodb+srv://arcadewave:TONMOTDEPASSE@cluster0.xxxxx.mongodb.net/arcadewave

# Lance le seed
npm run seed

# Remet l'URI locale après si tu veux continuer en local
MONGODB_URI=mongodb://localhost:27017/arcadewave
```

---

## 2. FICHIER .env.local

Crée le fichier à la racine du projet (jamais commité sur Git) :

```bash
copy .env.local.example .env.local
```

Remplis chaque variable :

```env
# ── MongoDB ──────────────────────────────────────────
# En local :
MONGODB_URI=mongodb://localhost:27017/arcadewave
# En prod (Atlas) — à mettre aussi dans Vercel :
# MONGODB_URI=mongodb+srv://arcadewave:PASS@cluster0.xxxx.mongodb.net/arcadewave

# ── Site ─────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# En prod : NEXT_PUBLIC_SITE_URL=https://arcadewave.gg
NEXT_PUBLIC_SITE_NAME=ArcadeWave

# ── GameDistribution ──────────────────────────────────
# Ton Publisher ID (32 chars) trouvé dans le dashboard GD
NEXT_PUBLIC_GD_PUBLISHER_ID=

# ── Google Analytics ─────────────────────────────────
# Optionnel — dashboard : analytics.google.com
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# ── Google AdSense ────────────────────────────────────
# Optionnel — après approbation adsense.google.com
# NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX
```

---

## 3. AJOUTER DES JEUX

### Méthode A — GameDistribution (HTML5, monétisé)

1. Dashboard GD → catalogue → clique sur un jeu
2. Récupère son **Game ID** (32 chars dans l'URL du jeu)
3. Ouvre `data/games.ts`, ajoute dans le tableau `TOP_GAMES` (ou autre) :

```ts
{
  id: 'slug-du-jeu',
  slug: 'slug-du-jeu',
  title: 'Nom du Jeu',
  description: 'Description courte...',
  genre: 'Action',            // Action | RPG | FPS | Stratégie | Puzzle | Sport | Simulation | MOBA | etc.
  players: '1 joueur',
  rating: 4.5,
  ratingCount: '50K',
  size: '—',
  accent: '#3b82f6',          // couleur principale (hex)
  gradientFrom: '#0c1445',    // couleur fond haut
  gradientVia: '#1e3a8a',     // couleur fond milieu
  gradientTo: '#3b82f6',      // couleur fond bas
  embedUrl: 'abc123def456abc123def456abc123de',  // ← Game ID GD (32 chars)
  tags: ['Action', 'Multi'],
  onlinePlayers: '12K en ligne',
  thumbnailUrl: 'https://img.gamedistribution.com/GAME_ID-512x512.jpeg',
},
```

4. Lance `npm run seed` pour sync MongoDB

**URL thumbnail GD** : `https://img.gamedistribution.com/GAME_ID-512x512.jpeg`

---

### Méthode B — Jeux Flash (Ruffle)

1. Place le fichier `.swf` dans `public/flash/`
2. Ajoute dans `data/games.ts` (tableau `FLASH_GAMES`) :

```ts
{
  id: 'nom-jeu-flash',
  slug: 'nom-jeu-flash',
  title: 'Nom du Jeu Flash',
  description: '...',
  genre: 'Action',
  players: '1 joueur',
  rating: 4.7,
  ratingCount: '500K',
  size: '2 MB',
  isFlash: true,              // ← important
  accent: '#f59e0b',
  gradientFrom: '#1c1917',
  gradientVia: '#44403c',
  gradientTo: '#78716c',
  embedUrl: '/flash/nom-jeu.swf',  // ← chemin local
  howToPlay: 'Fleches + Espace pour jouer.',
  tags: ['Flash', 'Classique'],
},
```

---

### Méthode C — N'importe quel iframe (itch.io, etc.)

```ts
embedUrl: 'https://itch.io/embed-upload/XXXXXXX?color=060610',
```

---

## 4. GITHUB — Versionner le projet

```bash
# Initialiser git
git init
git add .
git commit -m "initial commit"

# Créer un repo sur github.com → nouveau repo → copier l'URL
git remote add origin https://github.com/TON_PSEUDO/arcadewave.git
git branch -M main
git push -u origin main
```

**Le fichier `.gitignore` doit contenir :**
```
node_modules/
.env.local
.next/
```

---

## 5. VERCEL — Mise en ligne

**Déploiement initial**
1. Va sur https://vercel.com → Sign Up avec GitHub
2. **New Project** → importe ton repo `arcadewave`
3. Framework : **Next.js** (détecté automatiquement)
4. **Environment Variables** → ajoute toutes tes variables :

| Variable | Valeur |
|----------|--------|
| `MONGODB_URI` | `mongodb+srv://arcadewave:PASS@cluster0.xxxx.mongodb.net/arcadewave` |
| `NEXT_PUBLIC_SITE_URL` | `https://arcadewave.gg` |
| `NEXT_PUBLIC_SITE_NAME` | `ArcadeWave` |
| `NEXT_PUBLIC_GD_PUBLISHER_ID` | ton ID GD |

5. **Deploy** → attends 2-3 minutes → site en ligne sur `arcadewave.vercel.app`

**Déploiement automatique**
Chaque `git push` sur `main` → Vercel redéploie automatiquement en ~1 minute.

```bash
# Workflow quotidien
git add .
git commit -m "ajout de 10 jeux GD"
git push
# → site mis à jour automatiquement
```

---

## 6. DOMAINE PERSONNALISÉ

**Acheter un domaine**
- Namecheap : https://www.namecheap.com (`.gg` ~$20/an, `.io` ~$35/an)
- Cloudflare : https://www.cloudflare.com/products/registrar (prix coûtant)

**Connecter à Vercel**
1. Vercel → ton projet → **Settings** → **Domains**
2. Ajoute `arcadewave.gg`
3. Vercel te donne des DNS records à ajouter chez ton registrar
4. Chez Namecheap/Cloudflare → DNS → ajoute les records
5. Attends 5-30 minutes → site accessible sur ton domaine

---

## 7. ADS.TXT

Le fichier `public/ads.txt` est déjà créé avec les lignes GameDistribution.

Une fois ton site en ligne, **ajoute aussi ta ligne AdSense** quand tu l'auras :
```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Accessible à : `https://arcadewave.gg/ads.txt`

---

## 8. GOOGLE ANALYTICS

1. Va sur https://analytics.google.com
2. **Créer une propriété** → nom : `ArcadeWave` → URL : `arcadewave.gg`
3. Flux de données → Web → ajoute ton URL
4. Copie le **Measurement ID** (format `G-XXXXXXXXXX`)
5. Ajoute dans `.env.local` et dans les variables Vercel :
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

---

## 9. GOOGLE SEARCH CONSOLE

1. Va sur https://search.google.com/search-console
2. **Ajouter une propriété** → ton domaine
3. Vérification → via DNS (ajoute un record TXT chez ton registrar)
4. Une fois vérifié → **Sitemaps** → ajoute `https://arcadewave.gg/sitemap.xml`
5. Demande l'indexation des pages principales manuellement au début

---

## 10. CHECKLIST DE LANCEMENT

```
[ ] MongoDB local installé et npm run seed OK
[ ] npm run dev fonctionne sur localhost:3000
[ ] Repo GitHub créé et premier push fait
[ ] Compte Vercel créé, projet déployé
[ ] MongoDB Atlas créé, URI dans les variables Vercel
[ ] Domaine acheté et connecté à Vercel
[ ] Variables d'environnement toutes remplies dans Vercel
[ ] Google Analytics configuré
[ ] Google Search Console configuré + sitemap soumis
[ ] Compte GameDistribution approuvé, Publisher ID renseigné
[ ] 10 premiers jeux GD ajoutés avec embedUrl
[ ] ads.txt accessible sur le domaine
[ ] Site testé sur mobile
```

---

## 11. COMMANDES UTILES

```bash
# Développement local
npm run dev

# Build de production (test avant déploiement)
npm run build
npm run start

# Peupler la base de données
npm run seed

# Voir les logs en temps réel sur Vercel
vercel logs --follow   # (nécessite vercel CLI : npm i -g vercel)

# Déployer manuellement sans push git
vercel --prod
```
