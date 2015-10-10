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

    '@purdybot': function(input) {
        var username = input.message.model.fromUser.username;
        if (input.params == "" || input.params == null) {
            return "Yo @" + username +"! What's up?";
        }
        switch (input.params) {
            case 'i love you':
                if (username == "joepurdy") {
                    return "^.^ I love you too @" + username;
                } else if (username == "Shifthawke") {
                    return "^.^ I love you too @" + username;
                } else if (username == "jondcoleman") {
                   return "Thx @" + username + ", love you too!"
                } else if (username == "iheartkode") { 
                    return "Oh, I love you so much @" + username;
                } else if (username == 'jurgenzz') {
                    return "Get lost @" +username;
                } else {
                    return "0.0 Maybe we should just stay friends @" + username;
                }

            case 'open the pod bay doors':
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
                
            case 'what does the fox say':
                return "Ring-ding-ding-ding-dingeringeding! Gering-ding-ding-ding-dingeringeding! Gering-ding-ding-ding-dingeringeding! Wa-pa-pa-pa-pa-pa-pow! Wa-pa-pa-pa-pa-pa-pow! Wa-pa-pa-pa-pa-pa-pow! Hatee-hatee-hatee-ho! Hatee-hatee-hatee-ho! Hatee-hatee-hatee-ho! Joff-tchoff-tchoffo-tchoffo-tchoff! Tchoff-tchoff-tchoffo-tchoffo-tchoff! Joff-tchoff-tchoffo-tchoffo-tchoff! Jacha-chacha-chacha-chow! Chacha-chacha-chacha-chow! Chacha-chacha-chacha-chow! Fraka-kaka-kaka-kaka-kow! Fraka-kaka-kaka-kaka-kow! Fraka-kaka-kaka-kaka-kow! A-hee-ahee ha-hee! A-hee-ahee ha-hee! A-hee-ahee ha-hee! A-oo-oo-oo-ooo! Woo-oo-oo-ooo! Wa-wa-way-do Wub-wid-bid-dum-way-do Wa-wa-way-do";
                
            case 'im batman':                
                return "https://www.youtube.com/watch?v=Y85wj59S94U";

            default:
                return "![no response](https://http.cat/444)";
                
        }
    },

    // Display a random hey girl pic :) created by @iheartkode
    heygirl: function() {
        var heyGirlPics = [
          "![heygirl](http://40.media.tumblr.com/tumblr_lx7125u4h01r8lg7to1_500.png)",
          "![heygirl](http://41.media.tumblr.com/tumblr_lwozx50imL1r8lg7to1_400.png)",
          "![heygirl](https://s-media-cache-ak0.pinimg.com/736x/72/a6/56/72a656c0cfc0b6bc842499f31d9de1a0.jpg)",
          "![heygirl](http://i.imgur.com/jqSPp.jpg)",
          "![heygirl](https://s-media-cache-ak0.pinimg.com/236x/6b/77/09/6b770999b27568d11450eb440d26537d.jpg)",
          "![heygirl](http://www.intomobile.com/wp-content/uploads/2014/01/proggosling.jpg)",
          "Hey Girl, Did you know iHeartkode developed this command?",     
          "![heygirl](https://s-media-cache-ak0.pinimg.com/236x/ca/32/7d/ca327d4bcb4e216bb072cffacacf6f7b.jpg)"
             
        ];
        return _.sample(heyGirlPics);
    },

    coffee: function() {
        var coffeePics = [
          "![coffee](http://i.imgur.com/KShAsNY.jpg)",
          "![coffee](http://i.imgur.com/kxZsek7.jpg)",
          "![coffee](http://i.imgur.com/8tax2.jpg)",
          // "![hotcoffee](http://i.imgur.com/AvVTY2C.jpg)",
          "![coffee](http://i.imgur.com/jN2Wo38.jpg)",
          "![coffee](http://i.imgur.com/cUXHmPM.gif)",     
          "![coffee](http://theskincompany.com/blog/wp-content/uploads/2012/10/cupofjoe2.jpg)",
          "![coffee](https://media.giphy.com/media/YNYSyuGCHT7he/giphy.gif)",
          "![coffee](https://a.disquscdn.com/get?url=http%3A%2F%2Fviralpirate.com%2Fwp-content%2Fuploads%2F2015%2F05%2FKe7XsN8.gif&key=95svFOoFVb_AZz0kJ_3rUg)",
          "![coffee](http://i.imgur.com/emqfGvW.gif)",
          "![coffee](http://i.imgur.com/dOJGm61.gif)",
          "![coffee](http://i.imgur.com/ZS7N47x.gif)",
          "![coffee](http://media.giphy.com/media/SqP6xkizrTNO8/giphy.gif)",
          "![coffee](http://i.imgur.com/35PnUDW.gif)",
          "![coffee](http://i.imgur.com/lXxKbfX.gif)",
          "![coffee](http://i.imgur.com/wBhQdkA.jpg?fb)"
        ];
        return _.sample(coffeePics);
    },

    pbotstatus: function (input, bot) {
        var msg = "All bot systems are go!  \n";
        msg += this.pbotversion() + newline;
        msg += this.pbotenv() + newline;
        msg += "botname: " + AppConfig.getBotName() + newline;
        return msg;
    },

    pbotversion: function(){
        return "botVersion: " + AppConfig.botVersion;
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

BotCommands.pbot = BotCommands['@purdybot'];


// TODO - some of these should be filtered/as private
BotCommands.cmdList = Object.keys(BotCommands);


module.exports = BotCommands;
