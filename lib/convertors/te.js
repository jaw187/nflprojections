'use strict';

// Load modules


// Declare internals

const internals = {};


module.exports = function (results) {

    const players = {};

    for (let i = 0; i < results.length; i = i + 6) {
        const stats = {
            receiving: {
                receptions: +results[i + 1],
                yards: +results[i + 2],
                tds: +results[i + 3]
            }
        };

        const nameParts = results[i].replace(/ Out\: [A-z ]+/,'').replace(' Injured Reserve').split(' ');
        const name = nameParts.splice(0, nameParts.length - 2).join(' ');

        players[name] = stats;
    };

    return players;
};
