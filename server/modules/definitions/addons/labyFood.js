module.exports = ({ Config }) => {

// To enable this addon, simply comment out the line below.
return console.log('[labyFood.js] Addon disabled by default');

const disableCrashers = true

if (disableCrashers) {
Config.ENEMY_CAP_NEST = 0;
}

let shinys = [ "", "Shiny", "Legendary", "Shadow", "Rainbow", "Trans" ],
	polys = [ "Egg", "Square", "Triangle", "Pentagon", "Hexagon" ];

// good luck debugging this
Config.FOOD_TYPES      = Array(6).fill().map((_, i, a) => [i ? 10 ** (a.length - i - 1) : 200_000_000, Array(4).fill().map((_, j, b) => [5 ** (b.length - j), Array(3).fill().map((_, k, c) => [4 ** (c.length - k), `laby${j}${shinys[i]}${polys[k]}`])])]);
Config.FOOD_TYPES_NEST = Array(6).fill().map((_, i, a) => [i ? 10 ** (a.length - i - 1) : 200_000_000, Array(4).fill().map((_, j, b) => [5 ** (b.length - j), Array(2).fill().map((_, k, c) => [4 ** (c.length - k), `laby${j}${shinys[i]}${polys[k+3]}`])])]);

console.log('[labyFood.js] Using Labyrinth Food.');
};