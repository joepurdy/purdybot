"use strict";

// This file needs to be edited to comment out
// rooms you want to join

// TODO - move to lib/ dir?

var AppConfig = require('../config/AppConfig');

// from the webapp
// users enter the rooms with a topic=XXX url
// we find a matching room here with that topic
// and redirect them

/*
 * Returns a prefixed room(s) with a common channel name.
 * e.g. <code>prefixChannelName("FreeCodeCamp", ["Help", "Bonfire"]);</code>
 * would output <code>["FreeCodeCamp/Help", "FreeCodeCamp/Bonfire"]</code>
 * and <code>prefixChannelName("FreeCodeCamp", "DataScience"]);</code>
 * would output <code>"FreeCodeCamp/DataScience"</code>
 *
 * @param {string} name Channel name in Gitter
 * @param {string|Array<string>} roomNames List of room names or a single room name
 * @return {string|Array<string>} The prefixed string or array of string
 */
function prefixChannelName(name, roomNames) {
    if (roomNames instanceof Array) {
        return roomNames.map(function (room) {
            return name + '/' + room;
        });
    }
    return name + '/' + roomNames;
}

var RoomData;

if (AppConfig.serverEnv == 'demobot') {
    var BotRoomData = {

        // this controls which rooms you can access
        demobot: [{
            title: "demobot",
            name: "demobot/test",
            icon: "star",
            topics: ["getting started"]
        }]
    };

} else if (AppConfig.serverEnv == 'local') {
    var BotRoomData = {

        // this controls which rooms you can access
        purdybot: [
            // change this to be a room your user is already in
            {
                name: "joepurdy/purdybot"
            }
        ]
    };

} else if (AppConfig.serverEnv == 'prod') {
    var BotRoomData = {

        // this controls which rooms you can access
        purdybot: [
            // change this to be a room your user is already in
            {
                name: "FreeCodeCamp/FreeCodeCamp"
            },
            {
                name: "joepurdy/purdybot"
            }
        ]
    };
}

var botname = null;

RoomData = {
    rooms: function (botname) {
        botname = botname || AppConfig.getBotName();
        return BotRoomData[botname];
    },

    defaultRoom: function () {
        return RoomData.rooms().rooms[0];
    }

};

module.exports = RoomData;
