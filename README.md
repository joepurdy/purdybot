
# Purdybot!

This is a bot for Gitter.
Main features:
- wrapper for commands


[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/joepurdy/purdybot?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The PBot is integrated into FreeCodeCamp

Join us in Gitter to discuss!
https://gitter.im/joepurdy/purdybot

# Introducing PurdyBot!

PurdyBot is a full featured bot for Gitter.im Forked from the GitterBot developed [for FreeCodeCamp, the largest online bootcamp in the world.](http://gitter.im/FreeCodeCamp/FreeCodeCamp)

### Points system

Allow your users to send pizza to each other to say 'givepizza @friend'!

### Fixed messages

Based on scannable expressions, send messages into the chat.

### Extensible

Custom functions can easily be added. Check the [System overview](https://github.com/dcsan/purdybot#system-overview)
 or contact [Joe Purdy](mailto:joe@poweredbypurdy.com?subject="Purdybot extension help").

## Installation instructions

To run PurdyBot, you need [Node.js](https://nodejs.org/) before downloading the app.


### Mac / Linux

- To install Node, [follow the instructions here](http://blog.teamtreehouse.com/install-node-js-npm-mac)

- To make your file changes update the local server automatically, install nodemon (you may need sudo)

        sudo npm install -g nodemon

- To download the app, clone the repository the bot is in:

        git clone git@github.com:joepurdy/purdybot.git

- Run the following commands to run the app:

        cd purdybot
        cd nap
        cp dot-EXAMPLE.env dot.env
        nodemon app.js

- That's it! The app should be running at [http://localhost:7891](http://localhost:7891).

You can now chat to your gitterbot via Gitter at
[https://gitter.im/demobot/test](https://gitter.im/demobot/test)


### Windows

To install Node.js on Windows, [follow these instructions](http://blog.teamtreehouse.com/install-node-js-npm-windows).

- To make your file changes update the local server automatically, install nodemon in an administrator console.

        npm install -g nodemon


- To download the app, clone the repository the bot is in:

        git clone https://github.com/joepurdy/purdybot.git

-  Run the following commands to run the app:

        cd purdybot
        cd nap
        ren dot-EXAMPLE.env dot.env
        nodemon app.js

- That's it! The app should be running at [http://localhost:7891](http://localhost:7891).

You can now chat to your gitterbot via Gitter at
[https://gitter.im/demobot/test](https://gitter.im/demobot/test)



# Getting your own appID
The `dot.env` file you copied above contains login info. This is using shared "demobot" account so you may find yourself in a chatroom with other people using the same ID!

To setup this up and use your own gitter login info, you should create your own Gitter API key on their developer site, and replace the info in that `.env` file. Get your own API keys for gitter from: [https://developer.gitter.im/apps](https://developer.gitter.im/apps)

For more settings info, checkout the `AppConfig.js` and `RoomData.js` files. These define which rooms the bot will listen in to. You can ping us in the Dev Chatroom if you have problems [gitterbot chatroom](https://gitter.im/dcsan/gitterbot) .


# Running tests

There are other commands in `bin` for running tests with the right config files etc
To run the tests with the right configs

    $ bin/test.sh

# System Overview

### data/RoomData.js
The list of rooms your bot is going to join.
Very starting your own bot, create a test room to enter and debug with.
This needs to be changed so you would only join your own rooms, otherwise developers will get into a situation where everyone is joining the same rooms and the bots go crazy talking to each other!

### lib/bot/BotCommands.js
This is where you add things that the bot can do. Some commands are broken into separate files such as `cmds/thanks` and `cmds/about`.
Each command gets a `input` which is a blob of data including what the user entered, and a bot instance.

### RoomMessages.js

This is for static messages that are fired based on regex matches. If you just want to add some basic responses, this is the place to edit.

### How to add a new Bot Command

Look at BotCommands `echo` function. This is an example of a command being called. Anytime a user types a line starting with `echo` that will get passed to this function in input.

```js
    echo: function(input, bot) {
        var username = input.message.model.fromUser.username;
        return "@" + username + " said: " + input.message.model.text;
    },
```

The input object contains `keyword` and `params` fields. If you type `echo this` you'll get

```js
//input
{   
    keyword: 'echo',
    params: 'this'
}
```

From any command you just return the new string you want to output. 
So you can add new commands with this knowledge.

### More detail on how commands are found and called

In GBot.js

        if (input.command) {
            // this looks up a command and calls it
            output = BotCommands[input.keyword](input, this);
        } else {

BotCommands is a list of functions, eg

    BotCommands.thanks = function() { ... }

where `input.keyword` is `thanks` then

`BotCommands[input.keyword]` is like saying `BotCommands.thanks()`

so then the params get also added in `(input, this)` so its


    BotCommands[input.keyword](input, this);
    //becomes
    BotCommands.thanks(input, bot);

All of the botCommands expect these two params eg in thanks.js

    var commands = {
        thanks: function (input, bot) {


In `RoomMessages.js` we also have a table of regex and matching functions, and may switch all to just use this method in future. Would you like to help?

```
    {
        regex: /\bth?a?n?[xk]s?q?\b/gim,
        func: BotCommands.thanks
    }
```


## environment notes

### ES6 and iojs

We downgraded the app to use basic node, so it should run even without iojs.
But its recommended to run on iojs rather than the older node (until they merge the projects)
To do this:


```bash
# ubuntu
sudo apt-get upgrade
sudo apt-get install build-essential
```

we're using n to update node [article](http://davidwalsh.name/upgrade-nodejs)
We use n to manage iojs and node:
```
sudo npm install -g n
sudo n io latest
iojs -v
    // should be at least v2.4.0
```

# Chat to us!

Ping me @joepurdy in the [purdybot chatroom](https://gitter.im/joepurdy/purdybot) if you get stuck.
