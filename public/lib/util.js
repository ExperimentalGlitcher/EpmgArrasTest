import { global } from "./global.js";
import { settings } from "./settings.js";
const util = {
    submitToLocalStorage: name => {
        localStorage.setItem(name + 'Value', document.getElementById(name).value);
        localStorage.setItem(name + 'Checked', document.getElementById(name).checked);
        return false;
    },
    retrieveFromLocalStorage: name => {
        document.getElementById(name).value = localStorage.getItem(name + 'Value');
        document.getElementById(name).checked = localStorage.getItem(name + 'Checked') === 'true';
        return false;
    },
    handleLargeNumber: (a, cullZeroes = false) => {
        if (cullZeroes && a == 0) {
            return '';
        }
        if (a < Math.pow(10, 3)) {
            return '' + a.toFixed(0);
        }
        if (a < Math.pow(10, 6)) {
            return (a / Math.pow(10, 3)).toFixed(2) + "k";
        }
        if (a < Math.pow(10, 9)) {
            return (a / Math.pow(10, 6)).toFixed(2) + "m";
        }
        if (a < Math.pow(10, 12)) {
            return (a / Math.pow(10, 9)).toFixed(2) + "b";
        }
        if (a < Math.pow(10, 15)) {
            return (a / Math.pow(10, 12)).toFixed(2) + "t";
        }
        return (a / Math.pow(10, 15)).toFixed(2) + "q";
    },
    timeForHumans: x => {
        // ought to be in seconds
        let seconds = x % 60;
        x /= 60;
        x = Math.floor(x);
        let minutes = x % 60;
        x /= 60;
        x = Math.floor(x);
        let hours = x % 24;
        x /= 24;
        x = Math.floor(x);
        let days = x;
        let y = '';

        function weh(z, text) {
            if (z) {
                y = y + ((y === '') ? '' : ', ') + z + ' ' + text + ((z > 1) ? 's' : '');
            }
        }
        weh(days, 'day');
        weh(hours, 'hour');
        weh(minutes, 'minute');
        weh(seconds, 'second');
        if (y === '') {
            y = 'less than a second';
        }
        return y;
    },
    addArticle: string => {
        return (/[aeiouAEIOU]/.test(string[0])) ? 'an ' + string : 'a ' + string;
    },
    formatLargeNumber: x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    pullJSON: fileName => {
        return new Promise((resolve, reject) => {
            const url = `${location.protocol}//${window.serverAdd}/lib/json/${fileName}.json`;
            console.log("Loading JSON from " + url);
            fetch(url).then(response => response.json()).then(json => {
                console.log("JSON load from " + url + " complete");
                resolve(json);
            }).catch(error => {
                console.log("JSON load from " + url + " complete");
                reject(error);
            });
        });
    },
    lerp: (a, b, x, syncWithFps = false) => {
        if (syncWithFps) {
            if (global.fps < 20) global.fps = 20;
            x /= global.fps / 120;
        }
        return a + x * (b - a);
    },
    lerpAngle: (is, to, amount, syncWithFps) => {
        var normal = {
            x: Math.cos(is),
            y: Math.sin(is)
        };
        var normal2 = {
            x: Math.cos(to),
            y: Math.sin(to)
        };
        var res = {
            x: util.lerp(normal.x, normal2.x, amount, syncWithFps),
            y: util.lerp(normal.y, normal2.y, amount, syncWithFps)
        };
        return Math.atan2(res.y, res.x);
    },
    getRatio: () => Math.max(global.screenWidth, 16 * global.screenHeight / 9) / global.player.renderv,
    getScreenRatio: () => Math.max(global.screenWidth, 16 * global.screenHeight / 9) / global.screenSize,
    Smoothbar: (value, speed, sharpness = 3, lerpValue = .025) => {
        let time = Date.now();
        let display = value;
        let oldvalue = value;
        return {
            set: val => {
                if (value !== val) {
                    oldvalue = display;
                    value = val;
                    time = Date.now();
                }
            },
            get: (round = false) => {
                display = util.lerp(display, value, lerpValue);
                if (Math.abs(value - display) < 0.1 && round) display = value;
                return display;
            },
        };
    },
    isInView: (x, y, r, mid = false) => {
        let ratio = util.getRatio();
        r += settings.graphical.borderChunk;
        if (mid) {
            ratio *= 2;
            return x > -global.screenWidth / ratio - r && x < global.screenWidth / ratio + r && y > -global.screenHeight / ratio - r && y < global.screenHeight / ratio + r;
        }
        return x > -r && x < global.screenWidth / ratio + r && y > -r && y < global.screenHeight / ratio + r;
    },
    getEntityImageFromMockup: (index, color) => {
        let firstIndex = parseInt(index.split("-")[0]),
            mainMockup = global.mockups[firstIndex],
            guns = [],
            turrets = [],
            name = "",
            upgradeTooltip = "",
            rerootUpgradeTree = [],
            allRoots = [],
            trueColor = mainMockup.color.split(' ');
        if ((trueColor[0] == '-1' || trueColor[0] == 'mirror') && color) trueColor[0] = color.split(' ')[0];
        let finalColor = trueColor.join(' ');
        
        for (let i of index.split("-")) {
            let mockup = global.mockups[parseInt(i)];
            guns.push(...mockup.guns);
            turrets.push(...mockup.turrets);
            name += mockup.name.length > 0 ? "-" + mockup.name : "";
            upgradeTooltip += mockup.upgradeTooltip ? "\n" + mockup.upgradeTooltip : "";
            if (mockup.rerootUpgradeTree) allRoots.push(...mockup.rerootUpgradeTree.split("\\/"));
        }
        for (let root of allRoots) {
            if (!rerootUpgradeTree.includes(root))
                rerootUpgradeTree.push(root);
        }
        turrets.sort(a => a.layer);
        return {
            time: 0,
            index: index,
            x: mainMockup.x,
            y: mainMockup.y,
            vx: 0,
            vy: 0,
            size: mainMockup.size,
            realSize: mainMockup.realSize,
            color: finalColor,
            borderless: mainMockup.borderless,
            drawFill: mainMockup.drawFill,
            upgradeColor: mainMockup.upgradeColor,
            glow: mainMockup.glow,
            render: {
                status: {
                    getFade: () => {
                        return 1;
                    },
                    getColor: () => {
                        return '#FFFFFF';
                    },
                    getBlend: () => {
                        return 0;
                    },
                    health: {
                        get: () => {
                            return 1;
                        },
                    },
                    shield: {
                        get: () => {
                            return 1;
                        },
                    },
                },
            },
            facing: mainMockup.facing,
            shape: mainMockup.shape,
            name: name.substring(1),
            upgradeTooltip: upgradeTooltip.substring(1),
            upgradeName: mainMockup.upgradeName,
            score: 0,
            tiggle: 0,
            layer: mainMockup.layer,
            position: mainMockup.position,
            rerootUpgradeTree,
            guns: {
                length: guns.length,
                getPositions: () => Array(guns.length).fill(0),
                getConfig: () => guns.map(g => {
                    return {
                        color: g.color,
                        alpha: g.alpha,
                        strokeWidth: g.strokeWidth,
                        borderless: g.borderless, 
                        drawFill: g.drawFill,
                        drawAbove: g.drawAbove,
                        length: g.length,
                        width: g.width,
                        aspect: g.aspect,
                        angle: g.angle,
                        direction: g.direction,
                        offset: g.offset,
                    };
                }),
                update: () => {},
            },
            turrets: turrets.map((t) => {
                let o = util.getEntityImageFromMockup(t.index);
                o.color = t.color;
                o.borderless = t.borderless;
                o.drawFill = t.drawFill;
                o.realSize = o.realSize / o.size * mainMockup.size * t.sizeFactor;
                o.size = mainMockup.size * t.sizeFactor;
                o.sizeFactor = t.sizeFactor;
                o.angle = t.angle;
                o.offset = t.offset;
                o.direction = t.direction;
                o.facing = t.direction + t.angle;
                o.render.f = o.facing;
                o.layer = t.layer;
                o.mirrorMasterAngle = t.mirrorMasterAngle;
                return o;
            }),
        };
    },
}
export { util }