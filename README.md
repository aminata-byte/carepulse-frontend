# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

````js

# Carepulse Frontend - Application de Gestion de Rendez-vous Médicaux

Application React/TypeScript moderne pour la prise de rendez-vous médicaux.

## 🚀 Stack Technique

- **Framework** : React 19 + TypeScript
- **Build Tool** : Vite
- **Styling** : Tailwind CSS
- **Routing** : React Router v7
- **State Management** : Zustand
- **HTTP Client** : Axios
- **Testing** : Vitest + Testing Library
- **Code Quality** : ESLint + Prettier

## 📁 Structure du Projet (Feature-Based)
SRC
│   App.css
│   App.tsx
│   index.css
│   main.tsx
│
├───app
├───assets
│       react.svg
│
├───components
│   ├───Avatar
│   ├───Button
│   ├───Input
│   ├───Modal
│   └───Table
├───features
│   ├───appointments
│   │   ├───components
│   │   ├───hooks
│   │   ├───services
│   │   └───types
│   ├───auth
│   │   ├───components
│   │   ├───hooks
│   │   ├───services
│   │   └───types
│   ├───doctors
│   │   ├───components
│   │   ├───hooks
│   │   ├───services
│   │   └───types
│   └───profile
│       ├───components
│       ├───hooks
│       ├───services
│       └───types
├───lib
│       api.ts
│       validators.ts
│
└───store


## ✅ Setup Complet Réalisé

### **1. Installation des Dépendances** ✅
```cmd
npm create vite@latest carepulse-frontend -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npm install -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install react-router-dom zustand axios

:: Création de l'architecture feature-based
mkdir src\app

:: Composants réutilisables
mkdir src\components\Button
mkdir src\components\Input
mkdir src\components\Modal
mkdir src\components\Avatar
mkdir src\components\Table

:: Features organisées par domaine
mkdir src\features\auth\components
mkdir src\features\auth\hooks
mkdir src\features\auth\services
mkdir src\features\auth\types

mkdir src\features\appointments\components
mkdir src\features\appointments\hooks
mkdir src\features\appointments\services
mkdir src\features\appointments\types

mkdir src\features\profile\components
mkdir src\features\profile\hooks
mkdir src\features\profile\services
mkdir src\features\profile\types

mkdir src\features\doctors\components
mkdir src\features\doctors\hooks
mkdir src\features\doctors\services
mkdir src\features\doctors\types

:: Utilitaires et state management
mkdir src\lib
mkdir src\store
mkdir src\test

Comment Démarrer
npm run dev

````
