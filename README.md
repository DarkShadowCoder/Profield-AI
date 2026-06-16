# ProField AI — Application Mobile Terrain

**Votre assistant intelligent pour le terrain** — Rapports, Devis, Formation, Capture, IA.

---

## 🏗️ Architecture

```
profield-ai/
├── src/
│   ├── app/                     # Expo Router (file-based routing)
│   │   ├── _layout.tsx          # Root layout + AuthGuard
│   │   ├── (auth)/              # Auth route group
│   │   │   ├── welcome.tsx      # Écran de bienvenue
│   │   │   ├── login.tsx        # Connexion
│   │   │   ├── register.tsx     # Inscription (2 étapes)
│   │   │   ├── verify.tsx       # Vérification OTP
│   │   │   ├── onboarding.tsx   # Onboarding initial
│   │   │   └── forgot-password.tsx
│   │   ├── (tabs)/              # Navigation principale
│   │   │   ├── index.tsx        # Tableau de bord
│   │   │   ├── missions.tsx     # Liste des missions
│   │   │   ├── capture.tsx      # Sélecteur de capture
│   │   │   ├── academy.tsx      # Académie de formation
│   │   │   └── documents.tsx    # Bibliothèque documentaire
│   │   ├── mission/
│   │   │   ├── [id].tsx         # Détail mission
│   │   │   └── new.tsx          # Création mission
│   │   ├── capture/
│   │   │   ├── [missionId].tsx  # Capture terrain (photo/vidéo/voix/note)
│   │   │   └── free.tsx         # Capture sans mission
│   │   ├── report/
│   │   │   ├── [id].tsx         # Visualisation rapport
│   │   │   └── new.tsx          # Génération rapport IA
│   │   ├── quote/
│   │   │   ├── [id].tsx         # Visualisation devis
│   │   │   └── new.tsx          # Création devis IA
│   │   ├── document/
│   │   │   └── [id].tsx         # Visualisation + Q&A document
│   │   ├── academy/
│   │   │   └── [id].tsx         # Formation + Quiz IA
│   │   ├── profile/
│   │   │   ├── settings.tsx     # Profil utilisateur
│   │   │   ├── company.tsx      # Informations entreprise
│   │   │   ├── team.tsx         # Gestion d'équipe
│   │   │   └── subscription.tsx # Plans & abonnements
│   │   ├── ai-assistant.tsx     # Assistant IA général
│   │   └── notifications.tsx    # Centre de notifications
│   ├── components/
│   │   └── ui/index.tsx         # Button, Input, Card, Badge, etc.
│   ├── constants/
│   │   └── theme.ts             # Design system (couleurs, typo, spacing)
│   ├── hooks/
│   │   └── index.ts             # useMissions, useReports, useAI, etc.
│   ├── lib/
│   │   ├── supabase.ts          # Client Supabase + schema SQL
│   │   └── ai.ts                # Claude API + Whisper + photo analysis
│   ├── store/
│   │   └── index.ts             # Zustand stores (auth, missions, AI, etc.)
│   ├── types/
│   │   └── index.ts             # TypeScript types complets
│   └── utils/
│       └── index.ts             # Formatters, validators, PDF/HTML builders
├── app.json                     # Config Expo
├── eas.json                     # Config EAS Build
├── package.json
├── babel.config.js
└── tsconfig.json
```

---

## 🚀 Démarrage rapide

### 1. Prérequis

- Node.js 18+
- Expo CLI : `npm install -g expo-cli`
- EAS CLI : `npm install -g eas-cli`
- Compte [Expo](https://expo.dev)
- Compte [Supabase](https://supabase.com)
- Compte [Clerk](https://clerk.com)
- Clés API [Anthropic](https://console.anthropic.com) et [OpenAI](https://platform.openai.com)

### 2. Installation

```bash
git clone https://github.com/votre-org/profield-ai
cd profield-ai
npm install
```

### 3. Configuration des variables d'environnement

Créez un fichier `.env` à la racine :

```env
EXPO_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-xxxxx
EXPO_PUBLIC_OPENAI_API_KEY=sk-xxxxx
```

Mettez à jour `app.json` → section `extra` avec les mêmes valeurs.

### 4. Configuration Supabase

Dans votre tableau de bord Supabase :

1. **SQL Editor** → Collez et exécutez le schema complet depuis `src/lib/supabase.ts` (section commentée)
2. **Storage** → Créez les buckets : `media`, `documents`, `reports`, `avatars`, `company-logos`
3. **Authentication** → Activez Email, SMS (optionnel)

### 5. Configuration Clerk

1. Créez une application dans le dashboard Clerk
2. Activez : Email/Password, Google, Apple, Microsoft OAuth
3. Récupérez votre `Publishable Key`
4. Configurez le schéma JWT pour Supabase (voir doc Clerk)

### 6. Lancement en développement

```bash
npx expo start
```

Puis :
- **iOS** : Appuyez sur `i` ou scannez le QR avec l'app Expo Go
- **Android** : Appuyez sur `a` ou scannez avec Expo Go
- **Web** : Appuyez sur `w`

---

## 📱 Fonctionnalités complètes

### Authentification & Sécurité
- ✅ Inscription avec vérification email OTP
- ✅ Connexion email + mot de passe
- ✅ OAuth Google / Apple / Microsoft
- ✅ Authentification biométrique (Face ID / Empreinte)
- ✅ Récupération mot de passe
- ✅ Sessions sécurisées avec SecureStore
- ✅ RLS Supabase pour l'isolation des données

### Onboarding
- ✅ Choix du domaine d'activité
- ✅ Sélection des usages souhaités
- ✅ Personnalisation entreprise & logo
- ✅ Mission de démonstration

### Tableau de bord (Accueil)
- ✅ Statistiques du jour (missions, rapports, en attente)
- ✅ Accès rapides aux actions fréquentes
- ✅ Missions du jour
- ✅ Activité récente
- ✅ Suggestion IA contextuelle
- ✅ Pull-to-refresh

### Gestion des Missions
- ✅ 9 types de missions (inspection, intervention, audit, visite, etc.)
- ✅ Priorités (faible/normale/haute/urgente)
- ✅ Filtres par statut
- ✅ Recherche full-text
- ✅ Barre de progression
- ✅ Observations, médias, documents par mission
- ✅ Gestion d'équipe et assignation
- ✅ Realtime via Supabase

### Capture Terrain
- ✅ **Photo** : Prise de vue + analyse IA automatique (détection anomalies)
- ✅ **Vidéo** : Enregistrement court
- ✅ **Dictée vocale** : Transcription Whisper + reformulation IA
- ✅ **Notes rapides** : Texte avec niveau de gravité
- ✅ Géolocalisation automatique
- ✅ Annotations sur photos
- ✅ Choix type d'observation et sévérité
- ✅ Sauvegarde en temps réel

### Génération de Rapports IA
- ✅ 9 types de rapports (inspection, intervention, HSE, etc.)
- ✅ Génération automatique depuis les observations
- ✅ Résumé exécutif + sections structurées
- ✅ Recommandations automatiques
- ✅ Édition section par section
- ✅ Export PDF professionnel
- ✅ Partage direct

### Devis Automatiques
- ✅ Génération IA à partir du rapport
- ✅ Lignes de devis éditables (qté, unité, prix)
- ✅ Calcul TVA automatique (19,25% FCFA par défaut)
- ✅ Statuts : brouillon / envoyé / accepté / refusé
- ✅ Export PDF professionnel
- ✅ Partage email / WhatsApp

### Bibliothèque Documentaire IA
- ✅ Import PDF, Word, images, textes
- ✅ Upload Supabase Storage
- ✅ Résumé IA automatique
- ✅ Recherche sémantique
- ✅ Filtre par catégorie
- ✅ Q&A sur document avec IA
- ✅ Vue liste / grille

### Assistant IA
- ✅ Chat contexte-aware (mission, document, général)
- ✅ Analyse photos en direct
- ✅ Historique de conversation persisté
- ✅ Suggestions rapides
- ✅ Attachements (images, documents)
- ✅ Intégré Claude Sonnet 4.6

### Académie de Formation
- ✅ Catalogue de formations par catégorie
- ✅ Lecteur vidéo avec chapitres
- ✅ Q&A IA pendant la formation
- ✅ Points clés et résumés
- ✅ Quiz adaptatifs avec explications IA
- ✅ Suivi de progression
- ✅ Certifications

### Profil & Paramètres
- ✅ Édition profil utilisateur
- ✅ Informations entreprise + logo
- ✅ Gestion d'équipe (invitations, rôles)
- ✅ Plans d'abonnement (Free/Pro/Entreprise)
- ✅ Notifications push configurables
- ✅ Authentification biométrique toggle
- ✅ Déconnexion sécurisée

### Notifications
- ✅ Centre de notifications
- ✅ Realtime Supabase
- ✅ Marquer comme lu / tout lire
- ✅ Badge de comptage

---

## 🛠️ Build & Déploiement

### Build de développement

```bash
eas build --platform android --profile development
eas build --platform ios --profile development
```

### Build de preview (test interne)

```bash
eas build --platform all --profile preview
```

### Build de production

```bash
# Configurer EAS
eas login
eas build:configure

# Build
eas build --platform android --profile production
eas build --platform ios --profile production

# Soumettre aux stores
eas submit --platform android --profile production
eas submit --platform ios --profile production
```

### OTA Updates (sans rebuilder)

```bash
eas update --branch production --message "Fix: amélioration rapport IA"
```

---

## 🔑 APIs utilisées

| Service | Usage | Docs |
|---------|-------|------|
| **Anthropic Claude** | Génération rapports, devis, analyse photos, Q&A | [docs.anthropic.com](https://docs.anthropic.com) |
| **OpenAI Whisper** | Transcription audio → texte | [platform.openai.com](https://platform.openai.com) |
| **Supabase** | Base de données, Auth, Storage, Realtime | [supabase.com/docs](https://supabase.com/docs) |
| **Clerk** | Auth avancée, OAuth, OTP, biométrique | [clerk.com/docs](https://clerk.com/docs) |
| **Expo** | Framework mobile cross-platform | [docs.expo.dev](https://docs.expo.dev) |

---

## 💳 Paiements & Abonnements

L'application supporte les plans :
- **Gratuit** : 5 missions/mois, 3 rapports, 500 Mo
- **Pro Mensuel** : 15 000 FCFA/mois — illimité
- **Pro Annuel** : 144 000 FCFA/an (économie 17%)
- **Entreprise** : Sur devis

**Intégrations paiement recommandées pour l'Afrique** :
- MTN Mobile Money
- Orange Money  
- CinetPay
- Stripe (cartes internationales)

→ Intégrer via une **Supabase Edge Function** qui déclenche l'activation du plan après confirmation de paiement.

---

## 🌍 Localisation

L'application est disponible en **français** (langue principale).
Pour ajouter d'autres langues, installer `expo-localization` et `i18n-js`.

---

## 🔒 Sécurité

- Row Level Security (RLS) activé sur toutes les tables Supabase
- Sessions JWT stockées dans SecureStore (chiffré)
- Clés API backend uniquement côté Supabase Edge Functions (production)
- Authentification biométrique optionnelle
- Pas de données sensibles dans AsyncStorage

> ⚠️ **En production** : Les clés API Anthropic et OpenAI doivent être appelées depuis des **Supabase Edge Functions** (serveur) et non directement depuis le client mobile pour éviter leur exposition.

---

## 📞 Support

- Email : support@profield.ai
- Documentation : https://docs.profield.ai
- Enterprise : enterprise@profield.ai

---

*ProField AI — Conçu pour les professionnels de terrain en Afrique et dans le monde entier.*
