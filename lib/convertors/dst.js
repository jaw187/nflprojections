'use strict';

// Load modules


// Declare internals

const internals = {};


module.exports = function (results) {

    const players = {};

    for (let i = 0; i < results.length; i = i + 11) {
        const stats = {
            defensive: {
                sacks: +results[i + 1],
                interceptions: +results[i + 2],
                fumbles: {
                    recovered: +results[i + 3],
                    forced: +results[i + 4]
                },
                touchdowns: +results[i + 5],
                safties: +results[i + 7],
                pointsAgainst: +results[i + 8],
                yardsAgainst: +results[i + 9]
            }
        };

        const nameParts = results[i].replace(/ Out\: [A-z ]+/,'').replace(' Injured Reserve').split(' ');
        const name = nameParts.splice(0, nameParts.length - 2).join(' ');

        players[name] = stats;
        players[nameParts.join('')] = stats;
    };

    return players;
};
