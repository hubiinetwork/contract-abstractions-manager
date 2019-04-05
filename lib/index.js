'use strict';

const glob = require('glob');
const path = require('path');

const findUpperDir = (bottomDir, relatives) => {
    let searchDir = bottomDir;
    let foundDir = null;
    while (searchDir != '/') {
        if (relatives.every((rel) => glob.sync(rel, {cwd: searchDir}).length))
            foundDir = searchDir;
        searchDir = path.normalize(`${searchDir}/..`);
    }
    return foundDir;
};

class Manager {
    constructor(dataRoot) {
        this._dataRoot = dataRoot || findUpperDir(__dirname, ['build/contracts/*.json', 'events']);
    }

    get dataRoot() {
        return this._dataRoot;
    }

    // getDataRoot() {
    //     return this._dataRoot;
    // }

    set dataRoot(dataRoot) {
        this._dataRoot = dataRoot;
    }

    // setDataRoot(dataRoot) {
    //     this._dataRoot = dataRoot;
    // }

    getAbstraction(name) {
        return require(`${this._dataRoot}/build/contracts/${name}.json`);
    }

    getAbstractionNames() {
        return glob.sync(`${this._dataRoot}/build/contracts/*.json`).map((f) => path.basename(f, '.json'));
    }

    getEvent(contractName, eventName) {
        const json = require(`${this._dataRoot}/events/${contractName}.json`);
        if (!json.hasOwnProperty(eventName))
            throw new Error(`Unknown event '${eventName}'`);
        return json[eventName];
    }
}

module.exports = Manager;
