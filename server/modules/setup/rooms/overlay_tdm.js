let bases = require('../tiles/tdm.js'),
	teams = require('../gamemodeconfigs/tdm.js').TEAMS,
	room = Array(15).fill(() => Array(15).fill()).map(x => x()),
locations = [
	[
		[[ 0,  0], [ 1,  0], [ 0,  1]],
		[[ 1,  1]]
	],[
		[[14, 14], [13, 14], [14, 13]],
		[[13, 13]]
	],[
		[[ 0, 14], [ 1, 14], [ 0, 13]],
		[[ 1, 13]]
	],[
		[[14,  0], [14,  1], [13,  0]],
		[[13,  1]]
	],[
		[[0,  6], [1,  7], [0,  8]],
		[[0,  7]]
	],[
		[[6,  14], [7,  13], [8,  14]],
		[[7,  14]]
	],[
		[[14,  6], [13,  7], [14,  8]],
		[[14,  7]]
	],[
		[[6,  0], [7,  1], [8,  0]],
		[[7,  0]]
	]
];

for (let i = 1; i <= teams; i++) {
	let [ spawns, protectors ] = locations[i - 1];
	for (let [y, x] of spawns) room[y][x] = bases[`base${i}`];
	for (let [y, x] of protectors) room[y][x] = bases[`base${i}protected`];
}

module.exports = room;
