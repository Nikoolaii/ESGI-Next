# MétéoScope

Application météo web développée avec **Next.js**, **TypeScript** et l'**App Router**. Permet de rechercher une ville, consulter les conditions météorologiques et les prévisions, gérer une liste de favoris, et comparer deux destinations.

## Fonctionnalités implémentées

### Fonctionnalités attendues

- **Page d'accueil** : recherche avec suggestions en temps réel (géocodage Open-Meteo), aperçu météo des favoris, liste des favoris, historique des recherches
- **Page de détail** (`/ville/[coords]`) : conditions actuelles (température, ressenti, humidité, pression, vent, UV), prévisions sur 7 jours avec lever/coucher du soleil, carte OpenStreetMap
- **Gestion des favoris** : ajout/suppression via icône étoile, persistance `localStorage`, indicateurs visuels sur toutes les pages
- **États de chargement** : `loading.tsx` à la racine et sur la route ville
- **Gestion des erreurs** : `error.tsx` et `not-found.tsx` personnalisés

### Fonctionnalités originales

1. **Comparaison météo** (`/comparer`) — comparez côte à côte deux villes (température, ressenti, vent, UV, min/max du jour) avec calcul automatique de l'écart
2. **Qualité de l'air** — indice AQI européen et polluants (PM2.5, PM10, O₃, NO₂) sur la page de détail via l'API Air Quality d'Open-Meteo
3. **Historique des recherches** — accès rapide aux 8 dernières villes consultées

## Technologies utilisées

| Technologie | Usage |
|---|---|
| Next.js 16 (App Router) | Framework, routage, SSR, cache fetch |
| TypeScript | Typage statique strict |
| Tailwind CSS 4 | Styles responsive |
| Open-Meteo Geocoding API | Recherche et auto-complétion de villes |
| Open-Meteo Forecast API | Météo actuelle et prévisions |
| Open-Meteo Air Quality API | Qualité de l'air |
| OpenStreetMap | Carte embarquée |

## Installation et lancement

```bash
git clone <url-du-depot>
cd ESGI-Next
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Vérification ESLint
```

## Variables d'environnement

Aucune clé API n'est requise — Open-Meteo est gratuit et sans authentification.

Un fichier `.env.example` est fourni à titre documentaire :

```env
# Optionnel — URL de base personnalisée (non utilisée par défaut)
# NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Architecture

```
src/
├── app/                    # App Router
│   ├── page.tsx            # Accueil (Server Component)
│   ├── loading.tsx         # Skeleton global
│   ├── error.tsx           # Erreur globale (Client)
│   ├── not-found.tsx       # 404
│   ├── ville/[slug]/       # Route dynamique ville
│   ├── comparer/           # Comparaison (feature originale)
│   └── api/                # Routes API (cache + proxy)
├── components/             # Composants réutilisables
├── hooks/                  # Hooks client (favoris, historique)
└── lib/
    ├── api/                # Appels Open-Meteo avec cache Next.js
    ├── types.ts            # Types TypeScript
    └── slug.ts             # Helpers URL dynamiques
```

### Server vs Client Components

| Composant | Type | Raison |
|---|---|---|
| `page.tsx` (accueil) | Server | Pas de state, composition de composants |
| `ville/[slug]/page.tsx` | Server | Fetch météo côté serveur avec cache |
| `SearchBar`, `FavoriteButton` | Client | Interactivité, localStorage, debounce |
| `useFavorites`, `useSearchHistory` | Client | Accès `localStorage` |
| API routes | Server | Cache centralisé, pas de duplication |

### Cache API

Les appels Open-Meteo utilisent `fetch` avec `next: { revalidate }` :
- Géocodage : 1 h
- Météo : 30 min
- Qualité de l'air : 1 h

## Captures d'écran

> À ajouter après lancement local : accueil, détail ville, favoris, comparaison, qualité de l'air.

## Auteur

Projet réalisé dans le cadre du mini-projet Next.js — ESGI.
