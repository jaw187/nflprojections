'use strict';

// Load modules

const Code = require('code');
const Insync = require('insync');
const Lab = require('lab');
const NFLProjections = require('../lib');

// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('NFL Projections', () => {

    it('loads without options', (done) => {

        const throws = () => {

            new NFLProjections();
        };

        expect(throws).not.to.throw();
        done();
    });

    it('loads with options', (done) => {

        const throws = () => {

            new NFLProjections({ baseUrl: 'http://foo.bar' });
        };

        expect(throws).not.to.throw();
        done();
    });

    it('gets projections', (done) => {

        const getProjections = (position) => {

            return (next) => {

                const nflprojections = new NFLProjections();
                nflprojections.get(position, (err, result) => {

                    next(err, result);
                });
            };
        };

        Insync.auto({
            dst: getProjections('dst'),
            qb: getProjections('qb'),
            wr: getProjections('wr'),
            rb: getProjections('rb'),
            te: getProjections('te')
        }, (err, results) => {

            expect(err).to.not.exist();
            expect(results).to.exist();

            const reviewResults = (result) => {

                expect(result).to.exist();
                expect(Object.keys(result).length).to.be.above(0);
            };

            reviewResults(results.dst);
            reviewResults(results.qb);
            reviewResults(results.wr);
            reviewResults(results.rb);
            reviewResults(results.te);

            done();
        });
    });



    it('gets projections for specific week', (done) => {

        const getProjections = (position) => {

            return (next) => {

                const nflprojections = new NFLProjections({ week: 1 });
                nflprojections.get(position, (err, result) => {

                    next(err, result);
                });
            };
        };

        Insync.auto({
            dst: getProjections('dst'),
            qb: getProjections('qb'),
            wr: getProjections('wr'),
            rb: getProjections('rb'),
            te: getProjections('te')
        }, (err, results) => {

            expect(err).to.not.exist();
            expect(results).to.exist();

            const reviewResults = (result) => {

                expect(result).to.exist();
                expect(Object.keys(result).length).to.be.above(0);
            };

            reviewResults(results.dst);
            reviewResults(results.qb);
            reviewResults(results.wr);
            reviewResults(results.rb);
            reviewResults(results.te);

            done();
        });
    });
});
