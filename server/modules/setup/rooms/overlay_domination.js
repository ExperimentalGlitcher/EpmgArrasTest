let { contested } = require('../tiles/dominators.js'),

room = Array(15).fill(() => Array(15).fill()).map(x => x());

room[7][2] = room[2][7] = room[12][7] = room[7][12] = room[7][7] = contested;

module.exports = room;