'use strict';

// Load modules

const Hoek = require('hoek');
const Xray = require('x-ray');
const Convertors = require('./convertors');


// Declare internals

const internals = {};


internals.defaults = {
    baseUrl: 'http://www.fantasypros.com/nfl/projections/'
};


// Mappings of FantasyPro player names to Draftkings player names

internals.differentName = {
    'Christopher Ivory': 'Chris Ivory',
    'Steve Smith': 'Steve Smith Sr.',
    'Duke Johnson': 'Duke Johnson Jr.',
    'Steve Johnson': 'Stevie Johnson',
    'Ted Ginn': 'Ted Ginn Jr.',
    'Josh Bellamy': 'Joshua Bellamy',
    'Cecil Shorts': 'Cecil Shorts III',
    'Devante Parker': 'DeVante Parker',
    'Marvin Jones': 'Marvin Jones Jr.',
    'Terrelle Pryor': 'Terrelle Pryor Sr.'
};


module.exports = internals.Projections = function (options) {

    this.settings = Hoek.applyToDefaults(internals.defaults, options || {});
};


internals.Projections.prototype.get = function (position, callback) {

    const xray = Xray();
    const url = `${this.settings.baseUrl}${position}.php${this.settings.week ? '?week=' + this.settings.week : ''}`;
    const selector = ['tr[class^=mpb-player-] td'];

    return xray(url, selector)(this.convertResult(position, callback));
};


internals.Projections.prototype.convertResult = function (position, callback) {

    return function (err, results) {

        if (err) {
            return callback(err);
        }

        const projections = Convertors[position](results);

        const names = Object.keys(projections);
        names.map((name) => {

            if (internals.differentName[name]) {
                projections[internals.differentName[name]] = projections[name];
            }
        });

        return callback(null, projections);
    };
};
