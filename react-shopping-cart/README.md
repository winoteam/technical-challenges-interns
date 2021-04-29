# react-shopping-cart

![](https://i.giphy.com/media/fyWfYThjb0Mpy/giphy.webp)

---

Ce projet a été démarré avec [Create React App](https://github.com/facebook/create-react-app).

## Démarrage

Pour initialiser l'application et la lancer dans un mode de développement :

```shell
$ yarn 
$ yarn start
```

Ouvrir la page [`http://localhost:3000`](http://localhost:3000) pour voir l'application dans votre navigateur.

La page se mettra à jour si vous faites une modification du code. Vous verrez également toutes les erreurs Eslint et Typescript dans la console.


## Prérequis

(choisir l'un des deux 😊)

### Pour Javascript/Typescript:

1. [ReactJS with Hooks](https://reactjs.org/)
2. [TypeScript](https://www.typescriptlang.org/)
 
### Pour ReScript:

1. [ReScript](https://rescript-lang.org/docs/manual/latest/introduction)
2. [ReScriptReact](https://rescript-lang.org/docs/react/latest/introduction)

## Explication

![React Shopping Cart](public/demo.png)

L'objectif de ce test est de recréer un système de panier comme l'on trouve sur de nombreux sites e-commerce. Vous trouverez en ouvrant le fichier `src/App.tsx` l'ossature de l'application avec un set de données présent et quelques balises `html` pour structurer la page.

Rien n'a encore été dynamisé dans l'interface, vous aurez donc l'objectif de :
* [ ] permettre l'ajout d'un produit au panier
* [ ] permettre la suppression d'un produit présent dans le panier
* [ ] calculer automatiquement le montant total du panier ainsi que les différentes TVA
* [ ] [ajouter un système de recherche dans les produits du catalogue](https://polaris.shopify.com/components/lists-and-tables/resource-list#all-examples)
* [ ] [et ajouter des fonctionnalités en plus de votre choix](#user-content-les-plus) (optionnel)
* [ ] refactorer le code pour utiliser les hooks (optionnel)

## Documentation

### Quelques points à prendre en compte

* L'équipe technique suit une **logique de développement `cross-platform`**. En effet, Wino propose à ses clients des outils pour différentes plateformes : iOS, Mac, Windows ... De ce fait, le développement technique de chaque fonctionnalité doit être réfléchi pour pouvoir être un maximum partageable entre chaque codebase.

* **La gestion comptable** est un élément clé des produits Wino. Ainsi, le développement des services de calcul de données comptables nécessite d'adopter une attitude de **rigueur extrême**. Aucune erreur n'est permise. Pour parvenir à cela, l'équipe Wino a mis en place un ensemble de procédures et défini un ensemble de bonnes pratiques.

* Afin de faciliter le développement technique de nos produits, nous nous basons sur la librairie **`Polaris` de Shopify** pour la création d'interfaces utilisateur web. Toute la documentation est accessible à l'adresse suivante : [polaris.shopify.com](https://polaris.shopify.com).

* **L'application a été initialisée avec [`Typescript`](https://www.typescriptlang.org/).** Cela permet de typer le code Javascript écrit pour ainsi le rendre plus sûr.

### Quelques astuces

* Le calcul des TVA répond à l'application de formules mathémathiques simples. Vous trouverez des exemples en accédant au site suivant [calculertva.com/](http://www.calculertva.com). Les quelques formules à connaître :
```
[Montant HT] x (1 + ([Taux TVA] / 100))=[Montant TTC] 
[Montant HT] x ([Taux TVA] / 100)=[Montant TVA] 
[Montant TTC] / (1 + ([Taux TVA] / 100))=[Montant HT] 
```

* [Javascript possède quelques "particularités" dans les calculs des décimales.](https://fr.wikipedia.org/wiki/IEEE_754) La gestion des arrondis est un élément central à prendre en compte lors de manipulations numériques. En jetant un coup d'oeil à l'exemple suivant, on comprend immédiatement les problématiques que cela peut engendrer :
```
$ 0.1+0.2
> 0.30000000000000004  🙃
```

## Les plus

Une fois avoir répondu avec soin aux objectifs de base de l'exercice, vous pourrez effectuer quelques améliorations supplémentaires, quelques idées :
* Gérer un système de devises (€, $ ...) 💰
* Transformer le code en [`ReScript`](http://rescript-lang.org) pour avoir une codebase plus secure
* Ajouter un système de remise 💳
* Créer un système de cache pour que les paniers ne soient pas perdus même après rafraichissement de la page 💾
* Relier l'application à une API externe qui retourne des produits au format JSON 🌍
* Ajouter un système de paiement 💸
* ...
