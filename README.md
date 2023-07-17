# Anidle

anidle is a wordle-like guessing game where each guess uncovers more clues about the daily mystery anime. each guess gives you information about the genres, tags, average score, year, and more so you can narrow down each guess. 

anidle has a React front end and a Node back end.

# Website

The website hosting anidle is http://www.anidle.net

# Daily Game Mode

The daily game mode is the default game mode. It updates the mystery anime and the anime pool once a day at midnight PST. The anime pool consists of the top 1000 animes by average score from anilist.co, and the mystery anime is a randomly chosen anime from that pool

# Unlimited Game Mode

The Unlimited game mode allows the player to reset and get a new random mystery game. The player can choose to play with a pool of the tom 1000 anime similar to the daily, or they can choose to import their anilist account.

## Anilist Account Integration

In the unlimited game mode, the user can enter their anilist account and choose to make a pool out of their anilist. Only shows that they have completed will show up in the pool

# Spoilers

In some cases, some tags can be seen as spoilers (Such as Tragedy, Disability, or Memory Manipulation). In these cases it would not be ideal to show these tags so as not to spoil anyone on any major plot twists or details. Because of this, any tag that is considered a general spoiler or a media spoiler by they anilist database will not be displayed at all
