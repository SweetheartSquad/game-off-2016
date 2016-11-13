# server.hack() #
a cyberpunk board game for 2-4 players

made for [PROCJAM 2016](https://itch.io/jam/procjam) and [GitHub Game-off 2016](https://github.com/github/game-off-2016)

# How To Play #
## Setup ##
- Generate, print, and cut up a game page.
- Shuffle character cards and have each player choose one randomly. Look at your own, but keep these secret from other players until the end of the game.
- Shuffle the file cards and place the deck facedown by the board.
- Shuffle the program cards and place the deck facedown by the board.
- Place an avatar token for each player on the "start" positions on the board.
- Decide who goes first.

## Cards ##
- Characters have a set of 1-3 implants/traits which affect their final score.
- Files have a point value (0-3) and one of three filetypes. Once drawn, a file remains face-up for the rest of the game.
- Abilities have text which explains what they do. 

## Playing ##
- Each player gets 2 actions per turn.
- Actions:
 - Move your avatar 1 space
 - Draw an program card facedown
 - Use an program card
 - If on the node, draw a file faceup
- Once a player has used both of their actions, the next player starts their turn.
- When program cards are used, they are taken out of the game (don't put them back in the program deck).

## Game Over ##
- As soon as the last file is drawn, the game is over. Each player reveals their character card, and points are tallied. You may not use any remaining abilities.
- A player's points are calculated as the sum of all the files they hold, plus any bonuses/modifiers from their character card.
### Ties ###
- If two or more players are tied for first place, continue the game by drawing/playing abilities until the tie is broken.

## Misc. ##
- You can move forwards or backwards. For example: if a player uses the program "target player moves up to 2 spaces", they could A) target themselves and move forwards, or B) target another player and move them backwards.
- You can choose to do the same action twice on your turn. For example, you could draw two program cards.

- maybe reshuffle cards in

# Libraries Used #
[jsPDF](https://github.com/MrRio/jsPDF)