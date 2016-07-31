'use strict';

// Load modules


// Declare internals

const internals = {};


module.exports = function (results) {

    const players = {};

    for (let i = 0; i < results.length; i = i + 11) {
        const stats = {
            passing: {
                attempts: +results[i + 1],
                completions: +results[i + 2],
                yards: +results[i + 3],
                tds: +results[i + 4],
                interceptions: +results[i + 5]
            },
            rushing: {
                attempts: +results[i + 6],
                yards: +results[i + 7],
                tds: +results[i + 8]
            }
        };

        const nameParts = results[i].replace(/ Out\: [A-z ]+/,'').replace(' Injured Reserve').split(' ');
        const name = nameParts.splice(0, nameParts.length - 2).join(' ');

        players[name] = stats;
    };

    return players;
};
