# ProcJam/GitHub Game-off 2016 entry #
## hack the planet: the card game ##
### by planet, I mean the node in the center of the game ###
#### (it's not the planet) ####
##### (the game's also more accurately a board game I guess) #####

# How To Play #
## Setup ##
- Generate, print, and cut up a game page
- Shuffle the file cards and place the deck on the "file" slot on the game board
- Shuffle the ability cards and place the deck on the "ability" slot on the game board
- Shuffle character cards and have each player choose one randomly without showing the other players (these will be secret until the end of the game)
- Place an avatar token for each player on the "start" positions on the game board
- Decide who goes first (youngest player, roll a die, etc.)

## Playing ##
- 2 actions per turn (you can do the same action twice)
- actions:
 - move your avatar 1 tile
 - draw an ability card
 - use an ability card
 - if on the node, draw a file
- once a player has used both of their actions, next player starts their turn
- when ability cards are used, they are taken out of the game (don't put they back in the ability deck)

## Game Over ##
- as soon as the last file is drawn, the game is over. each player reveals their character+implants, and points are tallied.
- a player's points are calculated as the sum of all the files they hold, plus any bonuses from their implants.


# random gameplay ideas + procgen notes #
- look at files (one player peeks at facedown)
- reveal 2-3/all files (all your current facedown become faceup) (mp only?)
- steal 1-2 files
- look + steal 1 file
- destroy 1-2 files
- discard 1-2 files
- look + destroy 1 file
- trade files
- everyone discard their highest/lowest 
- draw 1-2 files
- move player up tod 2-3 tiles
- everyone move back 1 tile (mp only?)
-


prefix
- everyone on/not on the node
- the person with the most/least
- person with the most/least ability cards
- everyone with/without revealed (only negative)
[filetype]
-


character
- all [filetype] are worth double/+1
- +(1-3) if you have/don't have [filetype]
- play ability after last file drawn
- each ability counts for 1 file point
- if you have more type than type

- maybe reshuffle cards in

4 characters, 2 abilities come off full body diagram, text on bottom
20 files, 3 types, worth 0-3 distributed towards 1/2, file explorer aesthetic
30 abilities, moves more common, complex/powerful cards more rare, virus/program category, CL aesthetic
map

filetypes: classified, restricted, top-secret, personnel, foreign intel, project plans, surveillance, encrypted, satellite imaging, evidence, private sector, meteorology, internal documents, redacted info, black ops., budget, payroll, email, weapons orders, corporate



dimensions (w h):
character - x/4 y/4
file - x/10 y/8 (maybe swap?)
ability - y/8 x/12
board - x/2 y/8*3

smallest px size for a letter page:
character - 51 66
file - 34 55 (maybe swap?)
ability - 33 17
board - 34 33

# Libraries Used #
jsPDF: https://github.com/MrRio/jsPDF