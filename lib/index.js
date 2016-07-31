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
    'Chris Ivory': 'Christopher Ivory',
    'Steve Smith Sr.': 'Steve Smith',
    'Duke Johnson Jr.': 'Duke Johnson',
    'Stevie Johnson': 'Steve Johnson',
    'Ted Ginn Jr.': 'Ted Ginn',
    'Joshua Bellamy': 'Josh Bellamy',
    'Cecil Shorts III': 'Cecil Shorts',
    'DeVante Parker': 'Devante Parker'
};


module.exports = internals.Projections = function (options) {

    this.settings = Hoek.applyToDefaults(internals.defaults, options || {});
};


internals.Projections.prototype.get = function (position, callback) {

    const xray = Xray();
    const url = this.settings.baseUrl + position + '.php';
    const selector = ['tr.mpb-available td'];

    return xray(url, selector)(this.convertResult(position, callback))
};


internals.Projections.prototype.convertResult = function (position, callback) {

    return function (err, results) {

        if (err) {
            return callback(err);
        }

        const projections = Convertors[position](results);
        return callback(null, projections);
    };
};


internals.Projections.prototype.nameLookup = function (name) {

    return internals.differentName[name] || name;
};
