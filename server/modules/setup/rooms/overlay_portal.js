let { portal } = require('../tiles/portal.js'),

    room = Array(15).fill(() => Array(15).fill()).map(x => x());

room[2][2] = room[2][12] = room[12][2] = room[12][12] = room[7][7] = portal;

module.exports = room;