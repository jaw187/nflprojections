'use strict';

// Load modules


// Declare internals

const internals = {};


module.exports = function (results) {

    const players = {};

    for (let i = 0; i < results.length; i = i + 9) {
        const stats = {
            rushing: {
                attempts: +results[i + 1],
                yards: +results[i + 2],
                tds: +results[i + 3]
            },
            receiving: {
                receptions: +results[i + 4],
                yards: +results[i + 5],
                tds: +results[i + 6]
            }
        };

        const nameParts = results[i].replace(/ Out\: [A-z ]+/,'').replace(' Injured Reserve').split(' ');
        const name = nameParts.splice(0, nameParts.length - 2).join(' ');

        players[name] = stats;
    };

    return players;
};
