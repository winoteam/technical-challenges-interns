# curry-and-pipe

![Mind blowing](https://i.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.webp)

(L'introduction suivante provient de l'article [use-function-composition-in-javascript](https://www.codementor.io/michelre/use-function-composition-in-javascript-gkmxos5mj))

> Function composition is a mechanism of combining multiple simple functions to build a more complicated one. The result of each function is passed to the next one. In mathematics, we often write something like: f(g(x)). So this is the result of g(x) that is passed to f. In programing we can achieved the composition by writing something similar. Let's take a quick example. Suppose I need to make some arithmetic by doing the following operation: 2 + 3 * 5. As you may know, the multiplication has the priority over the addition. So you start by calculating 3 * 5 and then when add 2 to the result. Let's write this in JavaScript. The primary and certainly the most simple approach could be:

```js
const add = (a, b) => a + b;
const mult = (a, b) => a * b;
add(2, mult(3, 5))
```

> This is a form of function composition since this is the result of the multiplication that is passed to the add function. Let's go a step further and see another case where function composition can be very useful.

Contrairement à ce qui a été écrit précédemment, on va préférer l'écrire de la manière suivante :

```js
const add = (a, b) => a + b;
const mult = (a, b) => a * b;
pipe(
  add(2),
  mult(3),
  // ... it's easier that way :)
)(5)
```

La fonction `pipe` permet d'écrire un code bien plus lisible. Prenons un autre exemple :

Au lieu d'écrire cela :

```js
const color = lighten(0.2, saturate(0.4, darken(0.6, '#ccc')))
```

Il est préférable d'avoir un code prenant la forme suivante :

```js
const color = pipe(
  lighten(0.2),
  saturate(0.4),
  darken(0.6),
)('#ccc')
```

Ou mieux encore :

```js
const tone = pipe(
  lighten(0.2),
  saturate(0.4),
  darken(0.6),
)
const color = tone('#ccc')
```

L'objectif de ce test va être de réécrire la fonction `pipe` et d'introduire une deuxième fonction cachée `curry`.

Chaque fonction fait en réalité quelques lignes. Toute la complexité de ce test réside dans la compréhension de l'abstraction offerte par ces deux fonctions.

Une version simplifiée de la fonction `pipe` s'écrit de la façon suivante :
```js
const pipe = (f, g) => x => f(g(x));
pipe(f, g)(1)
```
