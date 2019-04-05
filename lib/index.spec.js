'use strict';

const path = require('path');
require('chai').should();
const manager = new (require('./index'))();

describe('index', () => {
    describe('getAbstraction', () => {
        describe('if called with name of existent contract abstraction', () => {
            it('should successfully return the matching contract abstraction', async () => {
                const abstn = manager.getAbstraction('NahmiiToken');
                abstn.contractName.should.equal('NahmiiToken');
                abstn.abi.should.be.an('array').that.is.not.empty;
            });
        });

        describe('if called with name of non-existent contract abstraction', () => {
            it('should throw an instance of Error', async () => {
                (() => manager.getAbstraction('NonExistentContract')).should.throw(Error);
            });
        });
    });

    describe('getAbstractionNames', () => {
        it('should list the set of abstractions obtained from JSON file names', async () => {
            const names = manager.getAbstractionNames();
            names.should.be.an('array').that.is.not.empty;
        });
    });

    describe('getEvent', () => {
        describe('if called with name of existent contract and event', () => {
            it('should successfully return the matching event', async () => {
                const ev = manager.getEvent('SomeContract', 'SomeEvent');
                ev.topics.should.be.an('array').that.is.not.empty;
            });
        });

        describe('if called with name of non-existent contract', () => {
            it('should throw an instance of Error', async () => {
                (() => manager.getEvent('NonExistentContract', 'SomeEvent')).should.throw(Error);
            });
        });

        describe('if called with name of non-existent event', () => {
            it('should throw an instance of Error', async () => {
                (() => manager.getEvent('SomeContract', 'NonExistentEvent')).should.throw(Error);
            });
        });
    });

    describe('dataRoot', () => {
        describe('get', () => {
            it('should successfully get the current data root', async () => {
                path.basename(manager.dataRoot).should.equal('contract-abstractions-manager');
            });
        })

        describe('set', () => {
            it('should successfully set the data root', async () => {
                manager.dataRoot = 'some-root';
                path.basename(manager.dataRoot).should.equal('some-root');
            });
        })
    });
});
