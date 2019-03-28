# synchronization-data

![supermaket](https://i.giphy.com/media/uzglgIsyY1Cgg/giphy.webp)

---

## Introduction

Les équipes de Wino font face à plusieurs défis techniques, l'un deux concerne la synchronisation des données entre l'application offline installée sur les iPads et le tableau de bord. Ce test va vous permettre d'avoir un aperçu de l'enjeu technique que cela représente.

## Explication

Le schéma suivant présente l'interconnexion entre deux appareils du point de vente d'un commerçant par l'intermédiaire d'un serveur :

```
_________________                   _________________                    ________________ 
|               |                   |                |                   |               |
|    Device A   |  <  PULL/PUSH  >  |     SERVER     |  <  PULL/PUSH  >  |    Device B   |
| with local DB | (synchronisation) | with remote DB | (synchronisation) | with local DB |
|_______________|                   |________________|                   |_______________|

```

Chaque client possède un iPad (*device*) avec l'application WinoPOS installée. L'application embarque une base de données [`realm`](https://github.com/realm/realm-js) qui tourne en local. L'application est donc ***offline-first***, toute les données sont sauvegardés dans l'appareil et l'application n'a pas besoin d'Internet pour fonctionner.

Dans le cas présenté ci-dessus, le point de vente du commerçant possède deux appareils :
* `Device A`
* `Device B`

Par défaut, les *devices* sont isolés mais peuvent être connectés entre eux par l'intermédiaire d'un serveur qui gère le processus de synchronsation des données (pour l'échange et la récupération de données). Le transfert des données fonctionne à la manière de [`git`](https://git-scm.com/), avec des méthodes de *pull* et de *push* de données ainsi qu'un système interne de [`diff`](https://en.wikipedia.org/wiki/Data_differencing). Le fonctionnement est le suivant :
* Le `Device A` crée un produit `Crozes Hermitage`
* Le `Device A` lance une synchronisation des données :
  * Lors du `push`, le produit est envoyé au serveur.
  * Lors du `pull`, rien ne se passe, aucune donnée n'est à récupérer.
* Le `Device B` lance une synchronisation des données :
  * Lors du `push`, rien ne se passe, aucuune donnée n'est à envoyer au serveur.
  * Lors du `pull`, le produit `Crozes Hermitage` est récupéré.
* Bien que distantes et isolées, les bases de données de `Device A` et `Device B` possèdent maintenant toutes deux le produit `Crozes Hermitage`.

## Les enjeux

### Explication

La perte ou l'écrasement de données doivent être évitées au maximum pendant les procédures de synchronisation. Voici un exemple plus complexe de synchronisationn de données :

* à l'instant `t`, le serveur et les appareils possèdent un produit A dans le même état et qui prend la forme suivante :
```js
const productA = {
  name: 'Crozes Hermitage',
  categories_ids: [1, 2, 3],
  archivedAt: new Date('1996-05-13'),
}
```
* à l'instant `t+1`, `Device A` modifie le produit :
```js
const productA = {
  name: 'Crozes Hermitage',
  categories_ids: [1, 2, 3, 4], // Add a new category with id 4
  archivedAt: null, // Publish the product
}
```
* à l'instant `t+2`, `Device B` modifie le produit :
```js
const productA = {
  name: 'Crozes Hermitage',
  categories_ids: [1, 3], // Delete category with id 2
  archivedAt: new Date('1996-05-13'),
}
```
* à l'instant `t+3`, chacun des appareils synchronisent leurs données l'un après l'autre, le produit devient :
```js
const productA = {
  name: 'Crozes Hermitage',
  categories_ids: [1, 3, 4],
  archivedAt: null,
}
```

### Diff

Lorsqu'un appareil *pull* les données depuis le serveur, il va recevoir un `diff` des données mutées : uniquement les champs modifiés par un device. Cela permet d'éviter l'écrasement des données qui auraient mal été *push* au préalable. 

Un exemple du fonctionnement d'un ***diff* basique** :
```js
const oldProduct = { name: 'Ferrari', color: 'red' }
const newProduct = { name: 'Ferrari', color: 'yellow' }
const diff = createDiff(oldProduct, newProduct)
// { color: 'yellow' }
```

## Objectifs

L'objectif de ce test consiste à la réalisation d'un système de diff en reprenant l'exemple présenté dans la section [Les enjeux](#les-enjeux). La création de deux méthodes sont attendues :
* `createDiff(remoteDatum: Datum, ...mutatedData: Datum[]): Diff` : permet de créer un diff entre la donnée inscrite en remote (la base de données du serveur) et les données envoyées depuis les différents appareils du point de vente. 
* `applyDiff(datum: Datum, diff: Diff): Datum` : permet d'appliquer un *diff* sur une donnée.

### `createDiff`

```js
const diff = createDiff(
  { // The remote datum
    name: 'Crozes Hermitage',
    categories_ids: [1, 2, 3],
    archivedAt: new Date('1996-05-13'),
  },
  { // A local datum mutated at t+1
    name: 'Hermitage',
    categories_ids: [1, 3],
    archivedAt: new Date('1996-05-13'),
  },
  { // A local datum mutated at t+2 by another device
    name: 'Crozes Hermitage',
    categories_ids: [1, 2, 4, 4],
    archivedAt: null,
  },
)
```

Le résultat sorti par la fonction `createDiff` :

```diff
{
  name: 'Crozes Hermitage',
  categories_ids: [
    1,
-   2,
    3,
+   4,
  ],
-  archivedAt: new Date('1996-05-13'),
+  archivedAt: null,
}
```

Tu es libre de choisir le format de l'objet retourné par la fonction `createDiff`, il doit être le plus simple, léger et scalable possible.

### `applyDiff`


```js
// The product A saved in local database
const initialProductA = {
  name: 'Crozes Hermitage',
  categories_ids: [1, 2, 3],
  archivedAt: null,
}

// The diff provided by the function createDiff
const diff = { ... }

// Apply the diff
const finalProductA = applyDiff(initialProductA, diff)

// Log results
console.log(finalProductA)
// {
//   name: 'Crozes Hermitage',
//   categories_ids: [1, 3, 4],
//   archivedAt: null,
// }

```

### Les contraintes

* Le code écrit doit pouvoir être executé dans un environnement [`Node.js`](https://nodejs.org).
* Tu es libre de t'inspirer des ressources que tu trouves sur le sujet pour parvenir à tes fins.
* Idéalement, le code écrit doit suivre les principes de *functional programming*.

Bon courage 🎊
