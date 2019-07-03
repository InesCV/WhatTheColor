# WhatTheColor
Game made in IronHack to test my skills on JavaScript.

## Description
It's a fecundation oriented game, the main idea is to guide sperms (from now on Main Ball) into their corresponding ovules (from now on Homes) before they disappear of the canvas. 

In __the game__ screen of the canvas you will find a Home in three of the corners and Balls will be randomly entering in the gaming zone. 

__The player__ must click on every ball and then it’s home in order to show them where to go. 

__The game is over__ once a Main ball crosses the entire canvas or reaches the wrong home. 
Every __5 zyogots__ an __Enemy ball__ will appear with a magenta color, if the Main ball collides with it will bounce back.
  
* * *

## Data structure
Classes and methods definition.

### Documents
 * index.html
 * style.css
 * main.js 
 * game.js
 * ball.js
 * home.js
 * tail.js

### Classes 
 * Game
 * Ball
 * Home
 * Tail

* * *


## States y States Transitions
Definition of the different states and their transition (transition functions). **Those in bold will be on the MVP**, the others will be part of the _State Backlog_.

### Start Screen
When the page is uploaded
  * **Title**
  * **Play button**
  <!-- * _Will include a Story (for better storytelling)_ -->

### Game Screen: 
When Play Button is clicked
  * **Canvas of the Game, responsive for every kinf of screen**
  
### Game Over Screen: 
When there are no lifes left
  * **Play again button**
  * **Points will be shown**
  * **Go to start screen button**
  <!-- * _Will show the Highest scores_ -->

* * *

## Links

### Trello
[Trello url link](https://trello.com/b/PXDvTRtn/whatthecolor)


### Git
URls for the project: repo and deploy

[Repository Link](https://github.com/InesCV/WhatTheColor)

[Deploy Link](https://inescv.github.io/WhatTheColor/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://slides.com/inescv/deck)

Made by © Ines Castelltort
