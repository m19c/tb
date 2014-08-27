var ObjectNode = require('./node/object');

function Tree() {
    this.main = new ObjectNode();
}

Tree.prototype.define = function define() {
    return this.main;
};

Tree.prototype.process = function process(config) {
    return this.main.process(config);
};

module.exports = Tree;