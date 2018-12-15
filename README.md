# WhatTheColor
Game made in IronHack to test my skills on JavaScript.

## Description
The main idea is to direct the small moving objects (from now on Main Ball) into the corresponding fixed big objects (from now on Homes) before they disappear of the canvas. 

In __the game__ screen of the canvas you will find a Home in every corner and Balls will be randomly entering in the gaming zone. 
__The player__ must click on every ball and then it’s home in order to show them where to go. 
__The game is over__ once too many balls cross the canvas or have reached the wrong home.

* * *

## MVP

### The Game
  * Will start when you press play
  * The player will have lifes
  * Lifes will be removed once a ball leaves the canvas or touches the wrong home
  * Points will be added when a Ball gets into the right Home
  * Game will be over when there are no lifes left
  
### The Main Ball
  * Must appear randomly
  * Must have one of the colors of the Home
  * Must have an selector click event waiting for a second selector click event to change direction
  * Will disappear once it touches one of the homes or leaves the canvas
  * Must turn red if it is abbout to disappear

### The Home
  * There has to be a Home in at least 3 corners.
  * Must have one color each
  * Must turn red if it touches a ball of the wrong color


* * *

## Backlog  

### The Game
  * The ball will bounce back when reaching the end of the canvas
  * If you reach a certain amount of points, you will get the ability to clear the canvas once

### The Main Ball
  * If the Main Ball touches another Main Ball it will switch color
  
### The Enemy Ball
  * Enemy Balls will appear too after the player reaches certain points
  * The Enemy Balls will inherit some of the Main Ball properies. They will be different as they:
    * Might be able to colide with Main Balls, removing the Main Ball as well as a life.
    * Won't be able to bounce back
    * Won't be able to be directed

### The Home
  * Will grow every time gets a ball of it's colur


## The ultimate Backlog
  * The Game theme will be related to the reproductive sistem, Main Balls will be Sperm and Homes Ovules. 
  
* * *

## Data structure
Classes and methods definition.

### Documents
 * index.html
 * style.css
 * main.js
 * balls.js
 * home.js
 * player.js

### Classes 
 * Game
 * Ball
   * Main Ball
   * Enemy Ball
  * Home
  * Player

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

## Task Order for MVP

### 1. Ball to home movement:
1. Create the Documents we will be using first: **index.html, main.js, game.js and ball.js**
2. Create the canvas
3. Create a Ball class of a moving ball. Should include:
   * Propieties: Color, size, position, direction
   * Methods: Move, changeDirection
4. Create the **player.js** and _Console log the position of the ball when clicking it_
5. Create the document **home.js** and create a Home class. Should include:
   * Propieties: Color, size, position
   * Methods: Move, changeDirection
6. _Console log the home _center_ position when clicking it_
7. If you click the ball and then a position, _console log _"The ball is moving to ${position}, it's ${colorHome} home"_ _
8. Make a function that will move the ball to the Home position
9. _Console log "Sir, the Ball is in the Zone"_
10. Remove the ball when coliding with home
11. Add 1 point when coliding with home

### 2. Create more balls and homes:
1. Create a new Ball every X interval
2. Create 3 homes instead of one
3. Every home should have a color
4. Every ball should have one of the home colors
5. There should only be a +1 point if the ball gets to a Home of the same color 
5. Create a life vaiable with x lifes
6. A life should be removed if it gets into the wrong home or it leaves the canvas

### 3. Integrate the DOM
1. There should be a panel with the points and the lifes of the player
2. There should be a game over screen once there are no lifes left
3. There should be a intro before playing the game


## Links


### Trello
[Trello url link](https://trello.com/b/PXDvTRtn/whatthecolor)


### Git
URls for the project: repo and deploy

[Repository Link](https://github.com/InesCV/WhatTheColor)

[Deploy Link](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://slides.com/inescv/deck)

Made by Ines Castelltort
