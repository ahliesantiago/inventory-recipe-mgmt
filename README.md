# RHIGSLI (Recipes, Home Inventory, and Grocery/Shopping Lists)

A web application for organizing your kitchen and household items and inventory, with and recipe and grocery or shopping list management features. RHIGSLI helps you keep track of what you have at home, find recipes based on available ingredients, create smart shopping lists, and streamline meal planning. This all-in-one solution is meant to simplify your household management by connecting your inventory with your cooking and shopping activities.

Other titles being workshopped:
- HINGES (Home INventory, Grocery/Shopping (Lists))
- RIGSLI (Recipes, Inventory, and Grocery/Shopping Lists)
- HIREL (Home Inventory, REcipes, and Lists)
- GIRL (Grocery, Inventory, Recipes, Lists)
- TARGL (Things At Home, Recipes, Grocery Lists)
- TAGRIH (Things, Groceries, Recipes - Inventory At Home)
- HORELI (HOme, REcipes, LIsts)
- HOMNIS (HOme Management: Nventory, Ingredients, Shopping)
- REGIS (REcipes, Grocery, Inventory System)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

The below commands will install all dependencies, initialize the database tables, and initialize content of some tables with starting categories and ingredients.

```sh
npm install
npm run migrate
npm run seed
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npx vue-tsc --noEmit # type-checking only
npm run build
```

#### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
