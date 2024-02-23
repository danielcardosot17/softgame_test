# Hello! I'm Daniel Cardoso from Brazil. This is a test for Junior developer for SoftGames!

## Introduction:

I picked the project template from the tutorial:  https://www.pixijselementals.com/

 Other great references were: 
  - https://github.com/pixijs/open-games/blob/main/puzzling-potions/README.md  <-- The LargeButton and Sfx assets came from this one
  - https://pixijs.com/examples/basic/particle-container
  - https://github.com/pixijs/particle-emitter
  - https://github.com/kittykatattack/learningPixi?tab=readme-ov-file#spritebatch


## FPS Display

On the UpperLeft of the screen there is the FPS Display. It uses a **BitmapText** to display the **Ticker.FPS**.
It updates every Tick (update()). I don't think updating every Tick is necessary, but for simplicity, I let it pass.

I decided to use **BitmapText** because, according to the documentation, it has a better performance when changing the Text multiple times at runtime.

## Task 1: Cards

I've made 2 scenes fot Task 1.
In the first scene (Cards Sprites Scene) I made every card use an individual PIXI.Sprite.
In the second scene (Cards Particle Scene) I used a ParticleContainer.
According to the documentation, ParticleContainer is the ideal choice to render a large amount of Sprites. Unfortunately, ParticleContainer can only have 1 Texture.
144 cards is not a "large amount", but I decided to make both scene to compare the performance of each approach.
To move each card, a add them to a list of CardMoverComponents, which are used by a "Moving System" (ECS archtecture influence). In every "update()" call all MoverComponents are updated. The movement is made using a simple LERP function with the elapsed time as variable.

## Task 2: Text

Unfortunately, I did not achieve what I wanted in this task. 

What I wanted:
 - To add my Emotes Textures, at runtime, to the **BitmapFont.chars** so I could use a predefined text format (for example, **"Hello ::emote_happy:: !"**) to pass to the **BitmapText.text** and convert it automatically.
 - I wanted to add it at **runtime** because in this case I could make the BitmapFont of any available font using the **BitmapFont.from()** function, and then add any images I would need.
 - For this I also would need to parse the string using a Regex to substitute the emote tag **::emote_happy::** at runtime.
 - The Asset loader already gives us a nice way to make a Map of imageNames -> textures. In my code that is: **this.reservedEmotesTextures  =  Assets.cache.get('emoticons').textures;**

But, I could not find much info on how to change the BitmapFont data at runtime, and the alternative was to make my own Bitmap Font, which defeats the purpose.

In the end I just made a Container class which receives a random text and random texture and displays it on the screen.

## Task 3: Particles

In the Fire Scene there are 2 "fire Effects".
The first effect uses an AnimatedSprite. Its just a simple loop of Sprites.
The second effect uses a [Particle Emitter](https://github.com/pixijs/particle-emitter).
I decided to use both to see the difference.
I thought making another using a ParticleContainer, but decided it would e to similar to the Particle Emitter one.

## Final

The final code is full of duplication (CardMoverComponent vs CardMoverSpriteComponet / CardsParticleScene vs CardsSpriteScene) and disorganization.
That is because I made it fast and was learning on the go. Given time, of course I'd clean it up.
Please, give me any feedback.
Any questions feel free to contact me!

Thanks


### The game:  https://calangognalac.itch.io/softgames-junior-dev-test-pixijs?password=123123
### The github:  https://github.com/danielcardosot17/softgame_test
