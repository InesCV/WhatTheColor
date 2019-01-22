# WhatTheColor
Game made in IronHack to test my skills on JavaScript.

## Description
The main idea is to direct the small moving objects (from now on Main Ball) into the corresponding fixed big objects (from now on Homes) before they disappear of the canvas. 

In __the game__ screen of the canvas you will find a Home in three of the corners and Balls will be randomly entering in the gaming zone. 
__The player__ must click on every ball and then it’s home in order to show them where to go. 
__The game is over__ once a Main ball cross the canvas or have reached the wrong home.

* * *

## MVP

### The Game
  * Will start when you press play
  * Game Over will be once a ball leaves the canvas or touches the wrong home
  * Points will be added when a Ball gets into the right Home
  
### The Main Ball
  * Must appear randomly
  * Must have one of the colors of the Home
  * Must have an selector click event waiting for a second selector click event to change direction
  * Will disappear once it touches one of the homes or leaves the canvas
  * Must turn red if it is abbout to disappear

### The Home
  * There has to be a Home in 3 corners.
  * Must have one color each
  * Must turn red if it touches a ball of the wrong color


* * *

## Backlog  

### The Game
  * If you reach a certain amount of points, you will get the ability to clear the canvas once

### The Main Ball
  * If the Main Ball touches another Main Ball it will switch color
  
### The Enemy Ball
  * Enemy Balls will appear too after the player reaches certain points
  * The Enemy Balls will inherit some of the Main Ball properies. They will be different as they:
    * Might be able to colide with Main Balls, removing the Main Ball as well as a life.
    * Won't be able to be directed

### The Home
  * Will grow every time gets a ball of it's colur


## The ultimate Backlog
  * The Game theme will be related to the reproductive sistem, Main Balls will be Sperm and Homes, Ovules. 
  
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
  * _Will include a Story (for better storytelling)_

### Game Screen: 
When Play Button is clicked
  * **Canvas of the Game**
  * _Should addapt the canvas to your screen_

### Game Over Screen: 
When there are no lifes left
  * **Play again button**
  * **Points will be shown**
  * **Go to start screen button**
  * _Will show the Highest scores_

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
