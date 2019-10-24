# graphql-server

![](https://i.giphy.com/media/l1IY5NRhxdCJYxsmA/giphy.webp)

---

## Prérequis Javascript

1. [`js-xlsx`](https://github.com/SheetJS/js-xlsx)
2. [GraphQL](https://graphql.org/) ou [Koa](https://koajs.com/)
3. [TypeScript](https://www.typescriptlang.org/)
4. [PostgreSQL](https://www.postgresql.org/)
5. [Knex.js](http://knexjs.org/)
 
## Explication

> ⚠️ Si vous n'avez jamais utilisé GraphQL, vous avez la possibilité de créer une API Rest plutôt qu'une API GraphQL. Vous avez le choix ! 😊

L'objectif de ce test est de recréer un micro serveur GraphQL qui permet deux choses :

1. **récupérer une liste de ventes depuis une base de données PostgreSQL par l'intermédiaire d'une [`query`](https://graphql.org/learn/queries/) GraphQL** :

La query suivante :

```graphql
query sales(page: 1) {
  id
  name
  amount
}
```

Retourne le résultats suivants :
```json
{
  "data": {
    "sales": [
      {
        "id:" 1,
        "name": "0001",
        "amount": 12.30
      },
      {
        "id:" 2,
        "name": "0002",
        "amount": 7.51
      }
    ]
  }
}
```

2. **créer une query qui retourne le montant total des ventes**


La query suivante :

```graphql
query getSalesTotal {
  amount
  count
}
```

Retourne le résultat suivant :
```json
{
  "data": {
    "getSalesTotal": {
      "amount": 19.81,
      "count": 2
    }
}
```

3. **retourner le lien d'un fichier `.xlsx` générer le serveur qui contient les ventes de la base de données:**

La query suivante :

```graphql
mutation exportSales {
  filePath
}
```

Retourne le résultat suivant :
```json
{
  "data": {
    "exportSales": {
      "filePath": "xx/xx/sales.xlsx"
    }
  }
}
```

Le fichier `xx/xx/sales.xlsx` que vous allez générer par l'intermédiaire de votre API avec [`xlsx`](https://www.npmjs.com/package/xlsx) contient la liste des ventes par ordre chronologique. En plus de cela, le fichier contienda une ligne supplémetaire avec une cellule calculant de façon dynamique le total des ventes avec une formule Excel de type `SUM`.

Exemple :

```
| ID | Name  | Amount     |
|----|-------|------------|
| 1  | 0001  | 12,30€     |
| 2  | 0002  | 7,51€      |
|    | Total | SUM(C2+C3) |
```

## Documentation

### Quelques points à prendre en compte

* L'équipe technique suit les principes de *functional programming* pour développer ses services, vous devez suivre des principes de programmation.

* **L'application doit être initialis avec [`Typescript`](https://www.typescriptlang.org/).** Cela permet de typer le code Javascript écrit pour ainsi le rendre plus sûr.

### Quelques astuces

* Javascript, comme d'autres languages, possède [quelques "particularités" dans la gestion des calculs décimaux](https://fr.wikipedia.org/wiki/IEEE_754). La gestion des arrondis est un élément central à prendre en compte lors de manipulations numériques. En jetant un coup d'oeil à l'exemple suivant, on comprend immédiatement les problématiques que cela peut engendrer :
```
$ 0.1+0.2
> 0.30000000000000004  🙃
```

## Les plus

Une fois avoir répondu avec soin aux objectifs de base de l'exercice, vous pourrez effectuer quelques améliorations supplémentaires, quelques idées :

* utiliser les bonnes pratiques pour gérer la [pagination avec GraphQL](http://graphql.github.io/learn/pagination/#pagination-and-edges) (avec les `edges` et les `nodes`).
* ajouter des relations aux ventes comme des clients (=utilisateurs)
* montrer de quoi vous êtes capables avec SQL (utilisez des `window functions` par exemple)

