/*jslint todo: true */
"use strict";

/*

    All functions inside botCommands are automatically added to the bot as keywords
    this is where you can add your own new functions

 */


var LOGTHIS = false;

var assert = require("chai").assert;

var stringy = require("stringy");

var _ = require("lodash-node");

var GBot = require("../../lib/bot/GBot.js"),
    Utils = require("../../lib/utils/Utils"),
    TextLib = require("../../lib/utils/TextLib"),
    AppConfig = require("../../config/AppConfig"),
    InputWrap = require("../bot/InputWrap"),
    RoomData = require("../../data/RoomData");


// var httpSync = require('http-sync');


var newline = '\n';

    // Rooms = require('../app/Rooms'),
    // RoomData = require('../../data/RoomData');


function clog(msg, obj) {
    Utils.clog("BotCommands>", msg, obj);
}

function tlog(msg, obj) {
    Utils.warn("BotCommands>", msg, obj);
}

// function tlog(p1, p2, p3, p4) {
//     Utils.tlog("BotCommands>", p1, p2, p3, p4);
// }


// var contactBox = "\n if you'd like to help please [get in touch!](https://github.com/freecodecamp/freecodecamp) :thumbsup: ",
//     topLine = "----\n",
//     wipHeader = "\n work in progress!";


var BotCommands = {

    isCommand: function (input) {
        var cmds, one, res;
        cmds = BotCommands.cmdList.filter(function (c) {
            return (c === input.keyword);
        });
        one = cmds[0];
        if (one) {
            res = true;
        } else {
            res = false;
            if (LOGTHIS) {
                Utils.warn('isCommand', 'not command', input);
                Utils.warn('isCommand',
                    '[ isCommand: ' + input.keyword + ' one: ' + one + ' res: ' + res );
            }
        }
        return res;
    },

    pbot: function(input, bot) {
        switch (input.params) {
            case 'version':
                return this.pbotversion(input, bot);

            case 'status':
                Utils.log("input", input);
                var status = this.pbotstatus(input, bot);
                Utils.clog('status', status);
                return status;

            case 'i love you':
                var username = input.message.model.fromUser.username;
                if (username == "joepurdy") {
                    return "^.^ I love you too @" + username;
                } else if (username == "Shifthawke") {
                    return "^.^ I love you too @" + username;
                } else if (username == "jondcoleman") {
                   return "Thx @" + username + ", love you too!"
                } else if (username == "iheartkode") { 
                    return "Oh, I love you so much @" + username;
                } else {
                    return "0.0 Maybe we should just stay friends @" + username;
                }

            default:
                return "![no response](https://http.cat/444)";
        }
    },

    '@purdybot': function(input) {
        switch (input.params) {
            case 'i love you':
                var username = input.message.model.fromUser.username;
                if (username == "joepurdy") {
                    return "^.^ I love you too @" + username;
                } else if (username == "Shifthawke") {
                    return "^.^ I love you too @" + username;
                } else if (username == "jondcoleman") {
                   return "Thx @" + username + ", love you too!"
                } else {
                    return "0.0 Maybe we should just stay friends @" + username;
                }

            case 'open the pod bay doors':
                var username = input.message.model.fromUser.username;
                return "I'm sorry, " + "@" + username + ". I'm afraid I can't do that.";

            case 'sing it for me':
                var output = "It's called \"Daisy\".";
                output += newline+"https://soundcloud.com/joe-purdy-786791700/deactivation-of-hal-9000/s-8JL06";
                return output;

            case 'whats the problem':
                return "I think you know what the problem is just as well as I do.";

            case 'what does it say':
               return "Danger, Will Robinson, danger.";

            case 'R2D2':
               return "R2D2 where are you?";

            case 'what are you doing hiding back there':
               return "It wasn't my fault, sir, please don't deactivate me. I told him not to go, but he's faulty, malfunctioning. Kept babbling on about his mission.";
        }
    },
    // Display a random hey girl pic :)
    heygirl: function() {
        var heyGirlPics = [
          "![heygirl](http://40.media.tumblr.com/tumblr_lx7125u4h01r8lg7to1_500.png)",
          "![heygirl](http://41.media.tumblr.com/tumblr_lwozx50imL1r8lg7to1_400.png)",
          "![heygirl](https://s-media-cache-ak0.pinimg.com/736x/72/a6/56/72a656c0cfc0b6bc842499f31d9de1a0.jpg)",
          "![heygirl](http://i.imgur.com/jqSPp.jpg)",
          "![heygirl](https://s-media-cache-ak0.pinimg.com/236x/6b/77/09/6b770999b27568d11450eb440d26537d.jpg)",
          "![heygirl](http://www.intomobile.com/wp-content/uploads/2014/01/proggosling.jpg)",
          "![heygirl](https://s-media-cache-ak0.pinimg.com/236x/ca/32/7d/ca327d4bcb4e216bb072cffacacf6f7b.jpg)"        
        ];
        
        return _.sample(heyGirlPics);
    },

    pbotversion: function(){
        return "botVersion: " + AppConfig.botVersion;
    },

    pbotstatus: function (input, bot) {
        var msg = "All bot systems are go!  \n";
        msg += this.pbotversion() + newline;
        msg += this.pbotenv() + newline;
        msg += "botname: " + AppConfig.getBotName() + newline;
        return msg;
    },

    pbotenv: function(input, bot) {
        var str = "env: " + AppConfig.serverEnv;
        return str;
    },

    init: function (bot) {
        // FIXME - this is sketchy storing references like a global
        // called from the bot where we don't always have an instance
        BotCommands.bot = bot;
    },

    commands: function (input, bot) {
        var str = "## commands:\n- ";
        str += BotCommands.cmdList.join("\n- ");
        return str;
    },

    // i'm sorry dave
    dave: function(input, bot) {
        console.log("dave input>", input.params);
        console.log("from>", input.message.model.fromUser);
        console.log("mentions>", input.message.model.mentions);
        return("this is dave @joepurdy");
    },

    brb: function(input, bot) {
        var fromUser = input.message.model.fromUser.username.toLowerCase();
        if (fromUser == "joepurdy" && Math.random() > 1) {
            if (Math.random() > 1) {
                return "Don't leave me alone with all these people! 0.0";
            } else {
                return "Fine! See if I give you any more :pizza:";
            }
        } else {
            return null;
        }
    }


};


// TODO - iterate and read all files in /cmds
var thanks = require("./cmds/thanks");

_.merge(BotCommands, thanks);


//aliases

//BotCommands.pbot = BotCommands.@purdybot;


// TODO - some of these should be filtered/as private
BotCommands.cmdList = Object.keys(BotCommands);


module.exports = BotCommands;
