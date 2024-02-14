// Seed math
exports.random = x => x * Math.random()

exports.randomAngle = () => Math.PI * 2 * Math.random()

exports.randomRange = (min, max) => Math.random() * (max - min) + min

exports.irandom = i => {
    let max = Math.floor(i)
    return Math.floor(Math.random() * (max + 1)) //Inclusive
}

exports.irandomRange = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //Inclusive
}

// does not clump the points in the middle
exports.pointInUnitCircle = () => {
    let angle = exports.randomAngle(),
        distance = Math.sqrt(Math.random());
    return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
    };
};

exports.gauss = (mean=0, stdev=1) => {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    // Transform to the desired mean and standard deviation:
    return z * stdev + mean;
}

exports.gaussInverse = (min, max, clustering) => {
    let range = max - min
    let output = exports.gauss(0, range / clustering)

    while (output < 0) output += range;
    while (output > range) output -= range;
    return output + min
}

exports.gaussRing = (radius, clustering) => {
    let r = exports.random(Math.PI * 2)
    let d = exports.gauss(radius, radius * clustering)
    return {
        x: d * Math.cos(r),
        y: d * Math.sin(r),
    }
}

exports.chance = prob => exports.random(1) < prob

exports.dice = sides => exports.random(sides) < 1

exports.choose = (arr) => arr[exports.irandom(arr.length - 1)]

exports.chooseN = (arr, n) => {
    let o = []
    for (let i = 0; i < n; i++) o.push(arr.splice(exports.irandom(arr.length - 1), 1)[0])
    return o
}

exports.chooseChance = (...arg) => {
    let totalProb = 0
    for (let value of arg)
        totalProb += value

    let answer = exports.random(totalProb)
    for (let i = 0; i < arg.length; i++) {
        if (answer < arg[i]) return i
        answer -= arg[i]
    }
}

exports.chooseBotName = () => {
    return exports.choose([ "Alice", "Bob", "Carmen", "David", "Edith", "Freddy", "Gustav", "Helga", "Janet", "Lorenzo", "Mary", "Nora", "Olivia", "Peter", "Queen", "Roger", "Suzanne", "Tommy", "Ursula", "Vincent", "Wilhelm", "Xerxes", "Yvonne", "Zachary", "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Hotel", "India", "Juliet", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-Ray", "Yankee", "Zulu" ])
}

exports.chooseBossName = code => {
    switch (code) {
        case "a":
            return exports.choose([ "Archimedes", "Akilina", "Anastasios", "Athena", "Alkaios", "Amyntas", "Aniketos", "Artemis", "Anaxagoras", "Apollon" ]);
        case "castle":
            return exports.choose([ "Berezhany", "Lutsk", "Dobromyl", "Akkerman", "Palanok", "Zolochiv", "Palanok", "Mangup", "Olseko", "Brody", "Isiaslav", "Kaffa", "Bilhorod" ]);
        case "legion":
            return exports.choose([ "Vesta", "Juno", "Orcus", "Janus", "Minerva", "Ceres" ]);
    }
}
