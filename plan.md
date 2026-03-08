ARCADEWAVE — MASTER PLANMASTER BUSINESS PLAN v1.0 Page 1

# ARCADE

# WAVE

###### La plateforme de jeux navigateur qui fait de l'argent

## 172M+

```
Leader du secteurVisites/mois
```
## 10B+

```
mots-clés ciblésVolume global
```
## $55K

```
à 10M de pages vuesPotentiel mensuel
```
## 6 langs

```
internationaleCouverture
```
```
SOMMAIRE
01 Vision & Concept 02 Architecture Technique
03 Stratégie SEO Complète 04 Keywords & Trafic
05 Monétisation 06 Roadmap & Milestones
07 Content Marketing 08 Social Media & Growth
09 Analytics & KPIs 10 Budget & Projections
```
```
Confidentiel — Document stratégique interne 2025 — ArcadeWave Studio
```

## 01

#### Vision & Concept

##### Le Positionnement

```
ArcadeWave est une plateforme de jeux navigateur qui combine la nostalgie des jeux Flash des années 2000 avec
les standards modernes du jeu HTML5. L'objectif est double : capturer un trafic nostalgique massif via le SEO, et
retenir les utilisateurs grâce à une bibliothèque de jeux HTML5 de qualité. Le tout monétisé de façon optimale via
plusieurs streams de revenus complémentaires.
```
### 172M+

```
Visites/mois du leader Poki
```
### 62M+

```
Visites/mois CrazyGames
```
### 1.8M

```
Visites/mois 1001jeux.fr (FR)
```
### 0

```
Budget de départ nécessaire
```
##### Analyse Concurrentielle

Site Trafic/mois Points forts Notre avantage
Poki.com 172M UX mobile top, catalogue énorme SEO nostalgie + FR/ES dès J
CrazyGames 62M Qualité jeux, GameDistrib SDK Angle Flash + blog SEO actif
1001jeux.fr 1.8M Leader FR Design moderne + multilangue
Friv.com 15.7M Brand nostalgie forte Contenu frais + technique Next.js
CoolMathGames 13.3M Niche éducation Cible 18-35 + monétisation +

##### Notre Niche Différenciante

```
n Nostalgie Flash
Cibler explicitement les recherches 'jeux flash', 'jeux années 2000' via Ruffle
n Multilingue dès le lancement
FR + EN + ES + PT + DE + JA — couvrir 80% du trafic gaming mondial
n Mobile-first design
60%+ du trafic gaming casual est mobile. Priorité absolue au responsive.
```

n Performance extreme
Core Web Vitals dans le vert = meilleur ranking Google garanti


## 02

#### Architecture Technique

##### Stack Recommandé

Chaque choix technique est justifié par des impératifs SEO, performance et scalabilité. La stack choisie permet un
démarrage à budget zéro et une montée en charge sans refactoring.
Couche Technologie Raison Coût
Frontend Next.js 14 (App Router) SSG/ISR = SEO natif parfait, pages statiques ultra-rapidesGratuit
Base de données Supabase (PostgreSQL) Gratuit jusqu'à 500MB, API REST auto, Row Level SecurityGratuit
Hosting Vercel Edge network mondial, deploy automatique, analytics intégrésGratuit
CDN Jeux GameDistribution API 1000+ jeux HTML5 + monétisation SDK intégrée Revenue share
Flash Emu Ruffle.rs (npm) Package officiel WebAssembly, charge .swf directement Open Source
Analytics Plausible / GA4 RGPD-compliant, données en temps réel, heatmaps Gratuit/11€
Search Algolia / Fuse.js Recherche instantanée sur 1000+ jeux, autocomplete Gratuit (Fuse)
Images Next/Image + Cloudinary Optimisation automatique WebP, lazy loading natif Gratuit
i18n next-intl Routing multilingue /fr/ /en/ /es/ avec hreflang auto Open Source
SEO Meta next-seo Open Graph, Schema.org VideoGame, sitemap XML autoOpen Source

##### Architecture des Pages

Chaque type de page a un rôle SEO précis :
/ Homepage
Showcase des jeux featured, hero section, catégories, SEO brand
/play/[slug] Page Jeu
H PAGE LA PLUS IMPORTANTE — 1 URL par jeu = 1 keyword
/genre/[genre] Catégorie
Jeux d'action, puzzle, plateforme... — SEO mid-tail
/nostalgie/flash-classics Section Flash
SEO 'jeux flash', 'flash games', Ruffle emu


```
/unblocked/[slug] Unblocked
Mot-clé massif 500K+/mois EN — lycéens/collégiens
/new-games Nouveautés
Trafic direct + indexation fraîche pour Google
/top-games Top Charts
Engagement + SEO 'meilleurs jeux en ligne'
/blog/[slug] Blog SEO
Articles long-form pour mots-clés informationnels
/[lang]/... Versions i18n
Duplication structurée FR/EN/ES/PT/DE/JA
```
##### Schéma Base de Données (Supabase)

Tables principales et leurs colonnes clés :

```
Table games id, slug, title, description_fr, description_en, description_es,description_pt, description_de, thumbnail_url, genre_id, is_flash,
is_featured, play_count, rating, embed_url, source
(gamedistrib|ruffle|itch), created_at, updated_at, seo_title,
seo_description, schema_json
Table genres id, slug, name_fr, name_en, name_es, game_count, icon, color_hex
Table blog_posts id, slug, title, content_mdx, lang, published_at, seo_keywords,views
```
```
Table game_stats game_id, date, play_count, avg_session_seconds, bounce_rate
Table users
(optionnel)
```
```
id, email, favorites[], preferred_lang, created_at
```

## 03

#### Stratégie SEO Complète

##### Les 7 Piliers du SEO ArcadeWave

## 1

```
SEO Technique
Core Web Vitals dans le vert (LCP <2.5s, CLS <0.1, FID <100ms). Next.js SSG garantit des pages
statiques ultra-rapides. Sitemap XML automatique via next-sitemap. Robots.txt optimisé. Canonical
tags sur toutes les pages. Pagination SEO-friendly.
```
## 2

```
On-Page SEO
H1 unique par page contenant le keyword principal. Meta title <60 chars, meta description <155 chars.
Schema.org VideoGame sur chaque page jeu. Open Graph pour les réseaux sociaux. Images
optimisées avec alt text descriptif. Internal linking structuré.
```
## 3

```
Content SEO
Blog SEO avec articles de 1500-3000 mots ciblant les keywords informationnels. Descriptions de jeux
uniques (150 mots min, jamais de copie). Pages catégories avec contenu éditorial. FAQ schema sur
les pages clés.
```
## 4

```
Keyword Strategy
Clustering sémantique : regrouper les keywords par intent. Long-tail first : commencer par les
keywords faible difficulté. Tracking top 500 keywords via Google Search Console. Optimisation
trimestrielle des pages qui rankent en position 5-20.
```
## 5

```
International SEO
Hreflang sur toutes les pages (/fr/ /en/ /es/ /pt/ /de/ /ja/). Sous-domaines ou sous-dossiers —
sous-dossiers recommandés pour consolider l'autorité. Traductions natives (pas Google Translate)
pour les métas et descriptions. Google Search Console configurée pour chaque locale.
```
## 6

```
Link Building
Soumission sur des directories gaming (Arcade Prehacks, GameFlare, etc.). Partenariats avec des
YouTubers gaming nostalgie pour des mentions. Guest posts sur des blogs gaming FR/EN. Création
de ressources linkables : 'Top 100 Flash Games', listes nostalgiques.
```

## 7

```
Core Web Vitals
Lazy loading des iframes de jeux (charger seulement au clic). Service Worker pour le cache des assets
statiques. Images en WebP avec next/image. Code splitting automatique Next.js. CDN Vercel Edge
pour la distribution mondiale.
```
##### Structure des URLs SEO

Les URLs doivent être courtes, descriptives et contenir le mot-clé principal. Voici la convention à respecter
absolument :
/play/bloons-tower-defense → Optimisé pour 'bloons tower defense en ligne'
/play/super-mario-flash → Optimisé pour 'super mario flash'
/genre/jeux-de-plateforme → Optimisé pour 'jeux de plateforme navigateur'
/nostalgie/meilleurs-jeux-flash-2000 → Optimisé pour 'meilleurs jeux flash 2000'
/unblocked/run-3 → Optimisé pour 'run 3 unblocked'
/blog/jeux-flash-classic-liste → Optimisé pour 'jeux flash classic liste'
/es/juegos/bloons-tower-defense → Version ES — hreflang es
/en/play/bloons-tower-defense → Version EN — hreflang en

##### Schema.org VideoGame — Template

```
{ "@context": "https://schema.org", "@type": "VideoGame", "name": "[Nom du jeu]",
"description": "[Description 150 mots]", "genre": ["Action", "Platformer"], "gamePlatform":
"Web Browser", "applicationCategory": "Game", "operatingSystem": "Any", "offers": { "@type":
"Offer", "price": "0", "priceCurrency": "EUR" }, "aggregateRating": { "@type":
"AggregateRating", "ratingValue": "4.5", "ratingCount": "1250" }, "image": "[thumbnail_url]",
"url": "https://arcadewave.gg/play/[slug]" }
```

## 04

#### Keywords & Analyse du Trafic

##### Master Keyword List — Français

```
Keyword FR Volume/mois Difficulté Intent Priorité
jeux en ligne 200K–500K Haute Navigational HHH
jeux gratuits 100K–300K Haute Transactionnel HHH
jeux flash 50K–150K Moyenne Nostalgie HHHHH
jeux navigateur 20K–80K Moyenne Informationnel HHHH
jeux en ligne sans téléchargement 10K–50K Faible Transactionnel HHHHH
jeux flash gratuits 15K–50K Faible Transactionnel HHHHH
jeux flash années 2000 5K–20K Très faible Nostalgie HHHHH
jouer en ligne gratuit 30K–100K Moyenne Transactionnel HHHH
meilleurs jeux navigateur 5K–20K Faible Informationnel HHHH
jeux d'action en ligne 10K–30K Faible Genre HHHH
jeux de plateforme en ligne 5K–15K Faible Genre HHHH
jeux puzzle gratuits 8K–25K Faible Genre HHHHH
jouer à [jeu] en ligne variable Très faible Direct HHHHH
```
##### Master Keyword List — Anglais

```
Keyword EN Volume/mois Difficulté Intent Priorité
free games 1M–5M Très haute Transactionnel HH
online games 2M–10M Très haute Navigational HH
flash games 200K–500K Haute Nostalgie HHHH
unblocked games 500K–2M Haute Evade filter HHHH
free browser games 50K–200K Haute Transactionnel HHH
games to play when bored 100K–400K Moyenne Informationnel HHHH
old flash games 30K–100K Faible Nostalgie HHHHH
```

```
browser games no download 20K–80K Faible Transactionnel HHHHH
play [game name] online free variable Très faible Direct HHHHH
unblocked games at school 100K–300K Moyenne Evade HHHH
flash games that still work 10K–40K Très faible Nostalgie HHHHH
best browser games 2025 20K–60K Faible Informationnel HHHH
```
##### Keywords Internationaux

Langue Keyword Principal Volume/mois Compétition locale Opportunité
nn Espagnol juegos gratis / juegos flash 1M–3M Haute (1001juegos) Fort — peu de sites modernes
nn Portugais jogos online grátis / jogos flash 500K–2M Faible HHHHH GOLDMINE
nn Allemand kostenlose Spiele online 200K–500K Faible HHHH Bon potentiel
nn Japonais nnnnn nnnn 200K–800K Moyenne HHH Compétition locale
nn Italien giochi gratis online 100K–300K Faible HHHH Sous-exploité
nn Polonais gry online za darmo 100K–200K Faible HHHH RPM €0.

##### Long-Tail Strategy — La Vraie Mine d'Or

```
Les keywords long-tail représentent 70% du trafic organique total. Chaque page de jeu individuelle est une
opportunité de ranker sur un keyword ultra-spécifique avec quasi zéro concurrence. Avec 500 jeux = 500 pages
SEO potentielles.
Long-tail Keyword Volume KD Action
jouer à bloons tower defense en ligne gratuit ~2K/mois Très faible Créer page /play/bloons-tower-defense
super mario flash jouer maintenant ~3K/mois Très faible Page nostalgie + Ruffle
jeux flash qui marchent encore 2025 ~5K/mois Très faible Article blog dédié
run 3 unblocked school ~50K/mois Faible Page /unblocked/run-3 EN
happy wheels full version unblocked ~30K/mois Faible Page dédiée EN
jeux de plateforme navigateur sans téléchargement~3K/mois Très faible Catégorie optimisée
flash games 2000s list nostalgia ~10K/mois Très faible Article blog EN
jogos de navegador grátis sem download ~20K/mois Très faible Page catégorie PT
```

## 05

#### Monétisation — Stack Complet

La monétisation est multi-couche. Chaque stream est complémentaire et ne cannibale pas les autres. L'objectif est
d'atteindre un RPM global de $3–8 selon le mix de trafic.

##### Stream 1 — GameDistribution SDK (Principal)

GameDistribution est LA plateforme de référence pour les sites de jeux navigateur. Ils fournissent à la fois les jeux
et la monétisation. Le SDK permet d'afficher des publicités pre-roll, mid-game et rewarded directement dans les
jeux.
3 Catalogue de 1000+ jeux HTML5 avec SDK publicitaire intégré
3 Revenue share automatique — pas besoin de gérer AdSense pour les jeux
3 Formats : pre-roll (avant le jeu), rewarded (monnaie virtuelle), interstitiel
3 eCPM gaming spécialisé > AdSense générique dans ce contexte
3 Intégration via npm package ou script tag — 30 minutes pour déployer

##### Stream 2 — Google AdSense (Display)

AdSense pour les zones display autour des jeux (sidebar, header, footer, entre les jeux).
Zone de placement Format RPM estimé Notes
Header page jeu Leaderboard 728x90 $1.5–4 Haute visibilité
Sidebar liste jeux Rectangle 300x250 $1–3 Long session
Entre les jeux (liste) In-content 336x280 $2–5 Intent élevé
Footer Leaderboard 728x90 $0.5–1.5 Faible intent
Page blog In-article $3–8 Meilleur RPM
Page blog Anchor bottom $2–5 Non-intrusif

##### Stream 3 — Réseaux Premium Gaming (Post-100K PV)

Une fois 100K+ pages vues/mois, des réseaux spécialisés offrent de bien meilleurs RPM :
Réseau Seuil minimum RPM estimé Spécialité
Venatus 100K PV/mois $4–10 Gaming & entertainment
Playwire 200K PV/mois $5–12 Gaming, ex-leader WoW ads
Publisher Collective 100K PV/mois $4–9 Gaming & esports
Ad4Game Aucun $2–6 MMO, RPG, browser games


```
CPMStar 50K PV/mois $3–8 Game developers audience
Ezoic 10K PV/mois $2–5 ML optimization, tout trafic
```
##### Stream 4 — Premium Membership (Mois 3+)

```
n Abonnement €4.99/mois — suppression totale des publicités
n Accès à des jeux exclusifs ou en avant-première
n Profil utilisateur avec favoris synchronisés
n Estimation : 0.5–2% des users paient = $500–$5000/mois à 100K MAU
```
##### Projections de Revenus

Estimations basées sur des données réelles de sites similaires (RPM mix AdSense + GameDistrib) :
Trafic mensuel AdSense Display GameDistrib SDK Premium (0.5%) Total estimé
50K pages vues $75–200 $25–75 $0 $100–275/mois
100K pages vues $150–400 $50–150 $0 $200–550/mois
250K pages vues $375–1000 $125–375 $125 $625–1500/mois
500K pages vues $750–2000 $250–750 $250 $1250–3000/mois
1M pages vues $1500–4000 $500–1500 $500 $2500–6000/mois
2M pages vues $3000–8000 $1000–3000 $1000 $5000–12000/mois
10M pages vues $15K–40K $5K–15K $5000 $25K–60K/mois


## 06

#### Roadmap & Milestones

La roadmap est structurée en sprints de 2 semaines. Chaque sprint a des livrables clairs et des KPIs de validation
avant de passer au suivant.

```
PHASE 1 — MVP Semaines 1–
3 Setup Next.js 14 + Supabase + Vercel (2h)
3 Intégration GameDistribution API — premier batch de 100 jeux
3 Pages : Homepage, /play/[slug], /genre/[genre]
3 SEO de base : sitemap.xml, robots.txt, meta tags, OG tags
3 Schema.org VideoGame sur toutes les pages jeux
3 Google Search Console + Analytics configurés
3 Design responsive mobile-first validé
3 KPI de validation : 100 jeux en ligne, Core Web Vitals vert
PHASE 2 — SEO Foundation Semaines 3–
3 Intégration Ruffle.rs — section Nostalgie avec 30 jeux Flash classiques
3 Blog SEO : 3 premiers articles (1500 mots min) ciblant keywords prioritaires
3 Pages : /nostalgie, /unblocked, /top-games, /new-games
3 Soumission manuelle à Google : requête d'indexation pour toutes les pages
3 Setup next-intl pour le routing i18n /fr/ /en/
3 Traduction EN des métas et descriptions (200 jeux minimum)
3 KPI de validation : 200 pages indexées, premiers clics Google Search Console
PHASE 3 — International Expansion Mois 2
3 Ajout langues ES + PT (juegos gratis / jogos online) — marché ÉNORME
3 100 jeux supplémentaires = 300 total (100 Flash + 200 HTML5)
3 5 articles blog EN ciblant 'unblocked games', 'flash games list', 'browser games'
3 Setup Ezoic (minimum 10K PV) pour optimiser placement AdSense
3 Création compte TikTok + premiers 10 shorts 'tu te souviens de ce jeu ?'
3 Backlinks : soumission sur 20 directories gaming
3 KPI de validation : 500+ clics/jour Search Console, 10K pages vues/mois
```

PHASE 4 — Growth & Monetization Mois 3–
3 Ajout DE + JA + IT — couverture mondiale complète
3 500 jeux total — toutes les catégories représentées
3 Launch du Premium Membership (€4.99/mois)
3 Application Venatus/Playwire si 100K+ PV/mois
3 Campagne TikTok : 50 vidéos, objectif 100K followers
3 Partenariats avec 3-5 YouTubers gaming nostalgie FR/EN
3 A/B testing placement ads pour maximiser RPM
3 KPI de validation : 100K PV/mois, RPM > $3, 1K+ sessions/jour

PHASE 5 — Scale Mois 5–
3 1000+ jeux — catalogue aussi large que les leaders mid-tier
3 20+ articles blog — domination topicale sur les keywords gaming
3 Feature : profils utilisateurs, leaderboards, tournis amicaux
3 Newsletter gaming nostalgie (list building pour trafic direct)
3 Exploration : jeux exclusifs développés en interne (Phaser.js)
3 Partenariats B2B : écoles, salles d'attente, espaces publics
3 KPI de validation : 500K PV/mois, $3000+/mois de revenus


## 07

#### Content Marketing & Blog SEO

Le blog est le moteur SEO le plus puissant à long terme. Des articles bien optimisés peuvent générer des milliers
de visites mensuelles sur des keywords informationnels qui convertissent en pages vues de jeux.

##### Top 20 Articles Blog à Créer (Par Priorité)

```
# Titre / Sujet Cible Volume estimé Prio
1 Les 50 meilleurs jeux Flash des années 2000 que tu as forcément jouésNostalgie 15K–50K/mois HHHHH
2 Jeux Flash qui marchent encore en 2025 (sans téléchargement)Nostalgie 5K–20K/mois HHHHH
3 Top 30 unblocked games to play at school in 2025 School games EN30K–100K/mois HHHHH
4 Meilleurs jeux de navigateur gratuits sans téléchargement Transactionnel 10K–30K/mois HHHHH
5 Games to play when bored — 50 best options 2025 Informationnel EN20K–80K/mois HHHH
6 Liste complète des jeux flash nostalgiques à rejouer Nostalgie FR 5K–15K/mois HHHHH
7 Los 40 mejores juegos flash gratis que nunca olvidarás Nostalgie ES 10K–30K/mois HHHHH
8 Best browser games like Miniclip you can still play Brand competitor EN5K–20K/mois HHHH
9 Os melhores jogos de navegador gratuitos do Brasil 2025 PT Brésil 10K–40K/mois HHHHH
10 Jeux en ligne gratuits jouables sur mobile sans app Mobile intent 5K–20K/mois HHHH
11 Flash games alternatives — the best HTML5 replacements Informationnel EN5K–15K/mois HHHH
12 Top jeux idle / clicker navigateur 2025 Genre niche 3K–10K/mois HHHH
13 Jeux multijoueur en ligne gratuits sans téléchargement Genre 5K–15K/mois HHHH
14 Happy Wheels, Run 3, Bloons — les icônes du web gaming Nostalgie 5K–20K/mois HHHH
15 Kostenlose Browserspiele — die 30 besten Online-Spiele 2025DE 5K–15K/mois HHHH
16 Top strategy games you can play in your browser Genre EN 5K–15K/mois HHH
17 Jeux de réflexion en ligne — les meilleurs puzzle games FR Genre FR 3K–10K/mois HHHH
18 I giochi flash migliori da giocare ancora nel 2025 IT 3K–10K/mois HHHH
19 Best tower defense browser games — ranked 2025 Genre EN 5K–15K/mois HHH
20 Retro web games hall of fame — 25 legendary titles Nostalgie EN 5K–20K/mois HHHH
```

##### Template d'Article SEO Optimal

```
H1 Keyword principal exact — 50-60 chars max
Intro (
mots) Inclure keyword + variante sémantique. Accrocher l'user.
Table des
matières Liens ancrés HTML — améliore les featured snippets
Corps (H2 +
H3) Chaque H2 = un keyword secondaire. Contenu 1500-3000 mots total.
FAQ schema 5-10 questions liées au keyword — capturer les 'People Also Ask'
CTA interne Lien vers pages jeux liées — augmente pages vues/session
Meta title [Keyword] — [Bénéfice] | ArcadeWave
Meta
description 155 chars max. Inclure keyword + call to action + chiffre si possible.
```

## 08

#### Social Media & Growth Hacking

##### TikTok — Le Canal Principal

TikTok est le canal d'acquisition organique le plus puissant pour ce type de contenu. La nostalgie des jeux flash
est un format viral naturel — des milliers de personnes cherchent ces jeux après une vidéo. C'est du trafic de
marque gratuit.

```
Format 1 — Nostalgie Pure
'Tu te souviens de ce jeu ?'
```
```
Montrer le gameplay d'un vieux jeu flash. Sous-titres 'comment y
jouer en 2025' → lien bio. Durée : 15-30s. Hook : 3 secondes max.
Résultat attendu : 10K-500K vues.
Format 2 — Top X Games
'Top 5 jeux flash qu'on jouait pendant
les cours'
```
```
Compilation rapide de 5 jeux avec transitions. Son nostalgie en
fond. Durée : 45-60s. CTA : 'Tous dispo sur arcadewave.gg'.
Potentiel viral élevé.
```
```
Format 3 — Challenge
'Peux-tu battre ce score en 60
secondes ?'
```
```
Capture d'écran d'un jeu, défi lancé. Encourage les commentaires
et reshares. Durée : 30s. Engagement boosté par l'interactivité.
```
```
Format 4 — Réaction
'J'ai rejoué au jeu que j'avais pas
touché depuis 2009'
```
```
Réaction authentique. Le plus humain des formats. Durée : 60-90s.
Emotional connection = retention élevée = boost algo.
```
```
Format 5 — Tutorial
'Comment jouer aux vieux jeux Flash en
2025 (sans plugin)'
```
```
Montre Ruffle en action. Valeur pratique + trafic organique. Durée :
60s. Sauvegardes élevées = signal positif TikTok.
```
##### Calendrier de Publication

```
Plateforme Fréquence Meilleurs horaires Objectif 3 mois
TikTok 1 vidéo/jour 18h–21h FR 10K followers, 100K vues cumulées
YouTube Shorts 3–4/semaine 16h–20h 2K subscribers, 50K vues
Instagram Reels 3/semaine 12h et 19h 5K followers
Reddit 2–3 posts/semaine Morning US time Karma + backlinks gratuits
Facebook Groups 1 post/semaine Weekend Communautés gaming nostalgie
```

```
Twitter/X 2–3 tweets/jour 9h, 12h, 18h 2K followers, trafic direct
```
##### Reddit — Stratégie Organique

```
3 r/WebGames — Communauté dédiée aux jeux navigateur (100K+ members)
3 r/nostalgia — Partager des screenshots d'époque avec lien de jeu
3 r/gaming — Flash nostalgie thread — potentiel très viral
3 r/FlashGames — Subreddit dédié, très actif post-mort-de-Flash
3 r/jeux (FR) — Communauté gaming francophone
3 r/indiegaming — Pour les jeux HTML5 modernes du catalogue
```

## 09

#### Analytics & KPIs

##### Dashboard de Suivi — Métriques Clés

SEO & Trafic
Métrique Objectif Source
Sessions organiques/mois Base de mesure principale Search Console
Clics Google / Impressions CTR moyen cible : >3% Search Console
Pages indexées Objectif : 100% des pages jeux Search Console
Positions moyennes top keywords Objectif : top 10 sur 50+ keywords Search Console
Trafic par langue/pays Pour optimiser i18n GA4 / Plausible

Engagement
Métrique Objectif Source
Pages vues / session Objectif : >3 PV/session GA
Durée moyenne de session Objectif : >4 minutes GA
Bounce rate Objectif : <50% sur pages jeux GA
Jeux les plus joués Pour prioriser le contenu Supabase + GA
Taux de retour (returning users) Objectif : >30% GA

Monétisation
Métrique Objectif Source
RPM global (AdSense + GameDistrib) Objectif : $3–8 AdSense + GD Dashboard
Revenus/mois KPI financier principal Toutes sources agrégées
eCPM par format Optimiser les placements AdSense Dashboard
Conversions Premium % users Premium Supabase
Revenue par langue Prioriser les langues rentables Calcul manuel

Technique


```
Métrique Objectif Source
Core Web Vitals (LCP, CLS, INP) Objectif : tout au vert PageSpeed Insights
Temps de chargement moyen Objectif : <2.5s Vercel Analytics
Erreurs 404 / crawl errors Objectif : 0 Search Console
Couverture d'indexation % pages indexées vs soumises Search Console
Mobile vs Desktop ratio Objectif : >60% mobile ready GA
```
##### Objectifs par Trimestre

```
Période Sessions/mois Pages indexées Revenus/mois Jeux dispo Langues
T1 (M1–M3) 10K–50K 200–500 $200–$800 200–300 FR + EN
T2 (M4–M6) 50K–200K 500–1000 $800–$3000 400–500 +ES +PT
T3 (M7–M9) 200K–500K 1000–2000 $3000–$8000 600–800 +DE +JA
```
T4 (M10–M12) 500K–1M+ 2000+ $8000–$20K+ 1000+ 6 langues


## 10

#### Budget & Projections Financières

##### Budget de Lancement — Zéro à Minimal

L'un des points forts de ce projet est qu'il peut démarrer à budget quasi nul. Voici la décomposition honnête des
coûts :
Poste Coût mensuel Coût annuel Obligatoire? Alternative gratuite
Domaine (.gg ou .io) ~$2/mois ~$20/an Oui —
Vercel (hosting) $0 $0 Oui —
Supabase (DB) $0 (500MB) $0 Oui —
Plausible (analytics) $9/mois $108/an Non GA4 gratuit
Algolia (search) $0 (10K req) $0 Non Fuse.js gratuit
Cloudinary (CDN img) $0 (25GB) $0 Non Next/Image natif
TikTok ads (optionnel) $0–$50 $0–$600 Non 100% organique
Design (Figma) $0 (gratuit) $0 Non —
TOTAL MINIMAL $2/mois ~$24/an — —
TOTAL CONFORTABLE $11/mois ~$132/an — —

##### Projection Financière — Scénario Réaliste vs Optimiste

Basé sur des données réelles de sites comparables (200K–400K PV/mois, RPM AdSense ~$3 pour 84% US
traffic, GameDistribution en complément).
Mois Sessions Revenus Réaliste Revenus Optimiste Coûts Profit Net
M1 5K $20 $50 $2 $18–
M2 15K $60 $150 $2 $58–
M3 40K $160 $400 $2 $158–
M6 150K $600 $1500 $11 $589–
M9 400K $1600 $4000 $11 $1589–
M12 800K $3200 $8000 $11 $3189–
M18 2M $8000 $20K $50 $7950–
M24 5M+ $20K+ $55K+ $100 $20K–55K/mois


```
» Break-even point : ~Mois 3 si RPM $3+ avec 50K pages vues. À partir du Mois 6, le projet
devient auto-financé et peut s'autoscaler.
```
##### Checklist de Lancement

```
n Domaine enregistré (.gg ou .io) nSupabase Premier batch de 50 jeux GD importés dans
n Repository GitHub créé (Next.js 14) n 10 jeux Flash nostalgie via Ruffle testés
n Supabase project créé + table games seedée n Sitemap soumis sur Search Console
n GameDistribution account créé n Core Web Vitals validés (PageSpeed 90+)
n Google Search Console property ajoutée n Schema.org VideoGame sur 10 pages test
n Google Analytics 4 configuré n Premier article blog rédigé et publié
n Ruffle.rs npm installé et testé n Compte TikTok créé, première vidéo postée
n next-seo + next-sitemap configurés
n next-intl routing /fr/ /en/ en place
```
Ce document constitue le master plan complet pour le lancement et la croissance d'ArcadeWave. Chaque décision
technique, SEO et business est justifiée par des données réelles du marché. Le potentiel de revenus est réel et
atteignable avec une exécution rigoureuse de cette roadmap.
ArcadeWave Studio — 2025 — Confidentiel


