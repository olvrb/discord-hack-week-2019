# Discord hack week 2019
### **Note:** This bot uses boilerplate code from another project, [janet](https://github.com/janetbot/bot). This was done to improve efficiency, to avoid wasting time rewriting a command handler. To see all the code written during Discord hack week, see commits from the 24th to the 28th of june.

# About
## Base idea
The idea behind this project is based off of basic trivia. However, a trivia bot is not very original, in my opinion. To get around my problem of originality, I thought it would be cool to make the trivia based off sound. 

By doing this, I can both take advantage of Discord's full potential using voice channels, as well as have a more original idea.

## Execution
My original thought would have been to fetch a random song from YouTube. However, this posed a handful of problems, the video could be:
* Not an actual song
* A song from a very niche genre, which not many people would know of


Thankfully, Spotify provides [Spotify Charts](https://spotifycharts.com/), which allows me to fetch a song from the top 200 charts. This increases the likelihood of anyone knowing which song is playing, while not making it easy to simply guess. Spotify only made it easier by having an easily accessible API which returns a csv file, for anyone to fetch data from.

Once we have a song title and an artist, we can simply search for the song on YouTube, using their API. From there, it is as simple as using a tool like youtube-dl to stream the audio to Discord. 

Unfortunately we have to do this detour (Spotify -> YouTube) because Spotify doesn't allow for third party clients, even if the account is paying for premium...

## What could me improved
Code. Right now, the code itself is very hacky and uses many bad practices including: 
* Nested callbacks
* Callbacks
* Logging to console
* Insufficient types, meaning that the application is prone to runtime errors
* Untrusted external modules, such as yt-search

After all, it is a *hack* week. There's gonna be some hacky code submitted.


# Thanks to
* discord.js for a robust and complete library for interacting with the Discord API.
* Spotify for their excellent charts API.
* TypeORM for a great TypeScript centered ORM. It makes dealing with databases a joy.

