# Exercice technique — Développeur alternant

Bienvenue ! Cet exercice comporte **4 étapes** et dure environ 30 minutes.  
L'objectif est d'évaluer tes compétences sur des tâches concrètes du quotidien.

---

## Stack

| Couche    | Technologie                    |
|-----------|--------------------------------|
| Frontend  | React 18 + TypeScript + Vite   |
| Backend   | Express + TypeScript           |
| Base de données | SQLite (better-sqlite3) |
| Paquets   | pnpm (monorepo workspace)      |

---

## Étape 1 — Installer les dépendances

Installe toutes les dépendances du projet en **une seule commande** depuis la racine.

> Conseil : consulte le fichier `pnpm-workspace.yaml` et la documentation pnpm.

---

## Étape 2 — Lancer l'application

Lance le **backend** puis le **frontend** dans deux terminaux séparés.

Les commandes disponibles sont dans les fichiers `package.json` de chaque workspace.

| Service  | URL par défaut              |
|----------|-----------------------------|
| Backend  | http://localhost:3001       |
| Frontend | http://localhost:5173       |

> Avant de lancer le backend, pense à alimenter la base de données :  
> `pnpm --filter backend seed`

---

## Étape 3 — Débugger une erreur au démarrage

Le backend **plante au démarrage** avec une erreur.

1. Lis le message d'erreur dans le terminal.
2. Trouve le fichier concerné dans `backend/src/`.
3. Corrige le problème.

---

## Étape 4 — Améliorer la recherche

La route `GET /api/products/search?q=<terme>` fonctionne, mais son implémentation est **inefficace**.

Ouvre `backend/src/routes/products.ts` et améliore la fonction de recherche.

**Critère d'évaluation** : la recherche ne doit pas charger l'ensemble des données en mémoire.

---

## Structure du projet

```
.
├── backend/
│   ├── src/
│   │   ├── index.ts          # Point d'entrée Express
│   │   ├── database.ts       # Initialisation de la base de données
│   │   ├── seed.ts           # Script d'alimentation (10 000 produits)
│   │   ├── routes/
│   │   │   └── products.ts   # Routes /api/products
│   │   └── types.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   └── SearchBar.tsx
│   │   └── api/
│   │       └── products.ts   # Appels vers le backend
│   └── package.json
└── pnpm-workspace.yaml
```

Bon courage !
