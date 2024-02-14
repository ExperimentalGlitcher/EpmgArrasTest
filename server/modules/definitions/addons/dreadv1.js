const { combineStats, makeAuto } = require('../facilitators.js');
const { gunCalcNames, smshskl } = require('../constants.js');
const g = require('../gunvals.js');
const dreadnoughtBody = {
    ACCEL: 1.6,
    SPEED: 1.4,
    HEALTH: 400,
    DAMAGE: 10,
    RESIST: 1,
    PENETRATION: 2,
    SHIELD: 40,
    REGEN: 0.025,
    FOV: 1.5,
    DENSITY: 3,
};

// Comment out the line below to enable this addon, uncomment it to disable this addon.
//return console.log('--- Dreadnoughts v1 addon [dreadv1.js] is disabled. See lines 32-33 to enable it. ---');;

// Misc
Class.genericDreadnought1 = {
	PARENT: ["genericTank"],
	BODY: dreadnoughtBody,
	SHAPE: 6,
	COLOR: 9,
	SIZE: 30,
	SKILL_CAP: Array(10).fill(smshskl+3),
	REROOT_UPGRADE_TREE: "dreadOfficialV1",
};
Class.mechanismMainTurret = {
	PARENT: ["genericTank"],
	LABEL: "Turret",
	CONTROLLERS: ["nearestDifferentMaster"],
	INDEPENDENT: true,
	BODY: {
		FOV: 0.8,
	},
	COLOR: 16,
	GUNS: [{
		POSITION: [22, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, g.pounder, { speed: 1.3, maxSpeed: 1.3 }, { reload: 0.75 }, { reload: 0.5 }]),
			TYPE: "bullet"
		}
	}]
};
Class.automationMainTurret = {
	PARENT: ["genericTank"],
	LABEL: "Turret",
	CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
	INDEPENDENT: true,
	BODY: {
		FOV: 0.8,
	},
	COLOR: 16,
	GUNS: [{
		POSITION: [22, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, { reload: 0.75 }]),
			TYPE: "bullet"
		}
	}]
};
Class.automationSecondaryTurret = {
	PARENT: ["genericTank"],
	LABEL: "Turret",
	CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
	INDEPENDENT: true,
	BODY: {
		FOV: 0.8,
	},
	COLOR: 16,
	GUNS: [{
		POSITION: [22, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, { recoil: 1.15 }, g.turret, { reload: 0.75 }]),
			TYPE: "bullet"
		}
	}]
};
Class.medicareTurret = {
	PARENT: ["genericTank"],
	LABEL: "Turret",
	CONTROLLERS: [ ["spin", {speed: 0.04}] ],
	INDEPENDENT: true,
	COLOR: 16,
	GUNS: [],
	TURRETS: [{
		POSITION: [13, 0, 0, 0, 360, 1],
		TYPE: "healerSymbol",
	}],
};
for(let i = 0; i < 3; i++) {
	Class.medicareTurret.GUNS.push({
		POSITION: [8, 9, -0.5, 12.5, 0, 120*i, 0],
	},
	{
		POSITION: [18, 10, 1, 0, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.pounder, { speed: 0.5, maxSpeed: 0.5 }, g.healer]),
			TYPE: "healerBullet",
			AUTOFIRE: true,
		},
	})
}
Class.medicaidTurret = {
	PARENT: ["genericTank"],
	LABEL: "Turret",
	CONTROLLERS: [ ["spin", {speed: 0.04}] ],
	INDEPENDENT: true,
	COLOR: 16,
	GUNS: [],
	TURRETS: [{
		POSITION: [13, 0, 0, 0, 360, 1],
		TYPE: "healerSymbol",
	}],
};
for(let i = 0; i < 5; i++) {
	Class.medicaidTurret.GUNS.push({
		POSITION: [8, 9, -0.5, 12.5, 0, 72*i, 0],
	},
	{
		POSITION: [18, 10, 1, 0, 0, 72*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flankGuard, g.flankGuard, g.flankGuard, g.pounder, { speed: 0.5, maxSpeed: 0.5 }, g.healer]),
			TYPE: "healerBullet",
			AUTOFIRE: true,
		},
	})
}
Class.turretedTrap = makeAuto(Class.trap);

// T0
Class.dreadOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Dreadnought",
	UPGRADE_LABEL: "Dreads V1",
	LEVEL: 150,
	EXTRA_SKILL: 47,
}

// T1
Class.swordOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Sword",
	UPGRADE_TOOLTIP: "Snipers",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.swordOfficialV1.GUNS.push({
		POSITION: [18, 7, 1, 0, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.sniper, { reload: 0.75 }]),
			TYPE: "bullet"
		}
	});
}

Class.pacifierOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Pacifier",
	UPGRADE_TOOLTIP: "Bullet Spam",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.pacifierOfficialV1.GUNS.push({
		POSITION: [15, 7, 1, 0, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pounder, { reload: 0.75 }]),
			TYPE: "bullet"
		}
	});
}

Class.invaderOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Invader",
	UPGRADE_TOOLTIP: "Drones",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.invaderOfficialV1.GUNS.push({
		POSITION: [5.5, 7.5, 1.3, 7.5, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.overseer, { speed: 1.3, maxSpeed: 1.3 }]),
			TYPE: "drone",
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 4,
		}
	});
}

Class.centaurOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Centaur",
	UPGRADE_TOOLTIP: "Traps",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.centaurOfficialV1.GUNS.push({
		POSITION: [12, 7, 1, 0, 0, 120*i, 0],
	}, {
		POSITION: [2.5, 7, 1.6, 12, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.pounder, { reload: 0.75 }, {range: 3}]),
			TYPE: ["trap", {HITS_OWN_TYPE: "never"} ],
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	});
}

Class.automationOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Automation",
	UPGRADE_TOOLTIP: "Auto Turrets",
	TURRETS: [],
}
for (let i = 0; i < 6; i++) {
	Class.automationOfficialV1.TURRETS.push({
		POSITION: [4, 8.7, 0, 60*i+30, 180, 1],
		TYPE: "automationSecondaryTurret",
	});
}
Class.automationOfficialV1.TURRETS.push({
	POSITION: [7, 0, 0, 0, 360, 1],
	TYPE: "automationMainTurret",
});

Class.juggernautOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Juggernaut",
	UPGRADE_TOOLTIP: "Health Buff",
	BODY: {
		HEALTH: 2,
		SHIELD: 3,
		REGEN: 1.5,
		SPEED: 0.7,
	},
	TURRETS: [{
		POSITION: [22, 0, 0, 0, 0, 0],
		TYPE: ["smasherBody", {INDEPENDENT: false} ]
	}]
}
Class.medicareOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Medicare",
	UPGRADE_TOOLTIP: "Healing",
	TURRETS: [{
		POSITION: [8, 0, 0, 0, 360, 1],
		TYPE: "medicareTurret",
	}],
}

// T2
Class.sabreOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Sabre",
	UPGRADE_TOOLTIP: "Assassins",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.sabreOfficialV1.GUNS.push({
		POSITION: [25, 7, 1, 0, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.sniper, g.assassin, { speed: 1.3, maxSpeed: 1.3 }, { reload: 0.75 }]),
			TYPE: "bullet"
		}
	}, {
		POSITION: [5, 7, -1.4, 9, 0, 120*i, 0]
	});
}
Class.gladiusOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Gladius",
	UPGRADE_TOOLTIP: "Rifles",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.gladiusOfficialV1.GUNS.push({
		POSITION: [16, 8, 1, 0, 0, 120*i, 0]
	}, {
		POSITION: [20, 6, 1, 0, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.sniper, g.rifle, { speed: 1.3, maxSpeed: 1.3 }, { reload: 0.75 }]),
			TYPE: "bullet"
		}
	});
}

Class.appeaserOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Appeaser",
	UPGRADE_TOOLTIP: "Machine Guns",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.appeaserOfficialV1.GUNS.push({
		POSITION: [6, 8, 1.3, 7, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.pounder, { reload: 0.5 }, { speed: 0.7, maxSpeed: 0.7 }, { speed: 0.93, maxSpeed: 0.93 }, {size: 0.55}]),
			TYPE: "bullet"
		}
	}, {
		POSITION: [6, 7.5, 1.2, 9, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.twin, g.pounder, { reload: 0.5 }, { speed: 0.7, maxSpeed: 0.7 }, { speed: 0.93, maxSpeed: 0.93 }, {size: 0.55 * 8 / 7.5}]),
			TYPE: "bullet"
		}
	});
}
Class.peacekeeperOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Peacekeeper",
	UPGRADE_TOOLTIP: "Heavy Bullets",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.peacekeeperOfficialV1.GUNS.push({
		POSITION: [17, 10, 1, 0, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.destroyer, g.destroyer, { reload: 0.75 }]),
			TYPE: "bullet",
		}
	});
}
Class.diplomatOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Diplomat",
	UPGRADE_TOOLTIP: "Triplets",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.diplomatOfficialV1.GUNS.push({
		POSITION: [13.5, 6, 1, 0, 2.2, 120*i, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.triplet, { speed: 0.7, maxSpeed: 0.7 }, g.pounder, { reload: 0.5 }]),
			TYPE: "bullet"
		}
	}, {
		POSITION: [13.5, 6, 1, 0, -2.2, 120*i, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.triplet, { speed: 0.7, maxSpeed: 0.7 }, g.pounder, { reload: 0.5 }]),
			TYPE: "bullet"
		}
	}, {
		POSITION: [15, 6, 1, 0, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.triplet, { speed: 0.7, maxSpeed: 0.7 }, g.pounder, { reload: 0.5 }]),
			TYPE: "bullet"
		}
	});
}

Class.inquisitorOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Inquisitor",
	UPGRADE_TOOLTIP: "Drones",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.inquisitorOfficialV1.GUNS.push({
		POSITION: [7, 8.5, 1.3, 7.5, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.overseer, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }, g.weak, g.battleship, {SIZE: 1.25}]),
			TYPE: "drone",
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 4,
		}
	});
}
Class.assailantOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Assailant",
	UPGRADE_TOOLTIP: "Minions",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.assailantOfficialV1.GUNS.push({
		POSITION: [13.5, 8, 1, 0, 0, 120*i, 0],
	}, {
		POSITION: [1.5, 10, 1, 13.5, 0, 120*i, 0],
		PROPERTIES: {
			MAX_CHILDREN: 4,
			SHOOT_SETTINGS: combineStats([g.factory, g.weak, g.weak, g.weak, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }, { speed: 1.3, maxSpeed: 1.3 }, { reload: 0.5 }, { reload: 0.5 }]),
			TYPE: "minion",
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true
		}
	}, {
		POSITION: [11.5, 10, 1, 0, 0, 120*i, 0]
	});
}
Class.infiltratorOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Infiltrator",
	UPGRADE_TOOLTIP: "Swarms",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.infiltratorOfficialV1.GUNS.push({
		POSITION: [7, 6, 0.6, 5.5, 2.8, 120*i, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.weak, g.carrier, { speed: 1.3, maxSpeed: 1.3 }, {speed: 0.75, range: 1.9}]),
			TYPE: "swarm",
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 6, 0.6, 5.5, -2.8, 120*i, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.weak, g.carrier, { speed: 1.3, maxSpeed: 1.3 }, {speed: 0.75, range: 1.9}]),
			TYPE: "swarm",
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 6, 0.6, 8, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.weak, g.carrier, { speed: 1.3, maxSpeed: 1.3 }, {speed: 0.75, range: 1.9}]),
			TYPE: "swarm",
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	});
}

Class.cerberusOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Cerberus",
	UPGRADE_TOOLTIP: "Trap Spam",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.cerberusOfficialV1.GUNS.push({
		POSITION: [11.5, 2.5, 1, 0, 4, 120*i, 0]
	}, {
		POSITION: [1.75, 2.5, 1.7, 11.5, 4, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper, { speed: 1.2 }, g.pounder, { reload: 0.75 }, {range: 3}]),
			TYPE: ["trap", {HITS_OWN_TYPE: "never"} ],
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}, {
		POSITION: [11.5, 2.5, 1, 0, -4, 120*i, 0]
	}, {
		POSITION: [1.75, 2.5, 1.7, 11.5, -4, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper, { speed: 1.2 }, g.pounder, { reload: 0.75 }, {range: 3}]),
			TYPE: ["trap", {HITS_OWN_TYPE: "never"} ],
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [13.5, 3.2, 1, 0, 0, 120*i, 0.5]
	}, {
		POSITION: [1.75, 3.2, 1.7, 13.5, 0, 120*i, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper, { speed: 1.2 }, g.pounder, { reload: 0.75 }, {range: 3}]),
			TYPE: ["trap", {HITS_OWN_TYPE: "never"} ],
			STAT_CALCULATOR: gunCalcNames.trap
		}
	});
}
Class.minotaurOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Minotaur",
	UPGRADE_TOOLTIP: "Blocks",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.minotaurOfficialV1.GUNS.push({
		POSITION: [13, 9, 1, 0, 0, 120*i, 0],
	}, {
		POSITION: [3, 9, 1.6, 13, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.setTrap, { speed: 2.5 }, g.pounder, { reload: 0.75 }, {range: 3}]),
			TYPE: ["unsetTrap", {HITS_OWN_TYPE: "never"} ],
			STAT_CALCULATOR: gunCalcNames.block
		}
	});
}
Class.sirenOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Siren",
	GUNS: [],
}
for (let i = 0; i < 3; i++) {
	Class.sirenOfficialV1.GUNS.push({
		POSITION: [13, 7, -1.4, 0, 0, 120*i, 0],
	}, {
		POSITION: [2.5, 7, 1.6, 13, 0, 120*i, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexaTrapper, { speed: 1.2 }, g.pounder, { reload: 0.75 }, {range: 3}]),
			TYPE: ["turretedTrap", {HITS_OWN_TYPE: "never"} ],
			STAT_CALCULATOR: gunCalcNames.trap,
		}
	});
}

Class.mechanismOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Mechanism",
	UPGRADE_TOOLTIP: "Auto Turrets",
	TURRETS: [],
}
for (let i = 0; i < 6; i++) {
	Class.mechanismOfficialV1.TURRETS.push({
		POSITION: [4, 8.75, 0, 60*i+30, 180, 1],
		TYPE: "automationMainTurret",
	})
}
Class.mechanismOfficialV1.TURRETS.push({
	POSITION: [9, 0, 0, 0, 360, 1],
	TYPE: "mechanismMainTurret",
})

Class.behemothOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Behemoth",
	UPGRADE_TOOLTIP: "Health Buff",
	BODY: {
		HEALTH: 4,
		SHIELD: 5,
		REGEN: 2.25,
		SPEED: 0.5,
	},
	TURRETS: [{
		POSITION: [23.5, 0, 0, 0, 0, 0],
		TYPE: ["smasherBody", {INDEPENDENT: false} ]
	}],
}
Class.medicaidOfficialV1 = {
	PARENT: ["genericDreadnought1"],
	LABEL: "Medicaid",
	UPGRADE_TOOLTIP: "Healing",
	TURRETS: [{
		POSITION: [8, 0, 0, 0, 360, 1],
		TYPE: "medicaidTurret",
	}],
}

Class.addons.UPGRADES_TIER_0.push("dreadOfficialV1");
	Class.dreadOfficialV1.UPGRADES_TIER_1 = ["swordOfficialV1", "pacifierOfficialV1", "invaderOfficialV1", "centaurOfficialV1"];
		Class.swordOfficialV1.UPGRADES_TIER_M1 = ["sabreOfficialV1", "gladiusOfficialV1"];
		Class.pacifierOfficialV1.UPGRADES_TIER_M1 = ["appeaserOfficialV1", "peacekeeperOfficialV1", "diplomatOfficialV1"];
		Class.invaderOfficialV1.UPGRADES_TIER_M1 = ["inquisitorOfficialV1", "assailantOfficialV1", "infiltratorOfficialV1"];
		Class.centaurOfficialV1.UPGRADES_TIER_M1 = ["cerberusOfficialV1", "minotaurOfficialV1", "sirenOfficialV1"];
		Class.automationOfficialV1.UPGRADES_TIER_M1 = ["mechanismOfficialV1"];
		Class.juggernautOfficialV1.UPGRADES_TIER_M1 = ["behemothOfficialV1"];
		Class.medicareOfficialV1.UPGRADES_TIER_M1 = ["medicaidOfficialV1"];

for (let primary of Class.dreadOfficialV1.UPGRADES_TIER_1) {
	let primaryName = primary;
	primary = ensureIsClass(primary);
	primary.UPGRADES_TIER_1 = [];

	for (let secondary of [ "swordOfficialV1", "pacifierOfficialV1", "invaderOfficialV1", "centaurOfficialV1", "medicareOfficialV1", "automationOfficialV1", "juggernautOfficialV1" ]) {
		let secondaryName = secondary;
		secondary = ensureIsClass(secondary);

		let GUNS = [],
			TURRETS = [],
			LABEL = primary.LABEL + "-" + secondary.LABEL,
			BODY = JSON.parse(JSON.stringify(dreadnoughtBody)),
			UPGRADE_TOOLTIP = (primary.UPGRADE_TOOLTIP ?? "") + " + " + (secondary.UPGRADE_TOOLTIP ?? "");

		// Label it
		if (primary.LABEL == secondary.LABEL) LABEL = primary.LABEL;
		if (primary.UPGRADE_TOOLTIP == secondary.UPGRADE_TOOLTIP) UPGRADE_TOOLTIP = primary.UPGRADE_TOOLTIP;

		// Guns
		if (primary.GUNS) GUNS.push(...primary.GUNS);
		for (let g in secondary.GUNS) {
			let POSITION = JSON.parse(JSON.stringify(secondary.GUNS[g].POSITION)),
				PROPERTIES = secondary.GUNS[g].PROPERTIES;
			POSITION[5] += 60;
			GUNS.push({ POSITION, PROPERTIES });
		}

		// Turrets
		if (primary.TURRETS) TURRETS.push(...primary.TURRETS);
		if (secondary.TURRETS) TURRETS.push(...secondary.TURRETS);

		// Body
		if (primary.BODY) for (let m in primary.BODY) BODY *= primary.BODY[m];
		if (secondary.BODY) for (let m in secondary.BODY) BODY *= secondary.BODY[m];

		// Definition name
		let definitionName = primaryName + secondaryName;

		// Actually make that guy
		Class[definitionName] = {
			PARENT: ["genericDreadnought1"],
			UPGRADES_TIER_2: [],
			BODY, LABEL, UPGRADE_TOOLTIP, GUNS, TURRETS,
		};
		Class[primaryName].UPGRADES_TIER_1.push(definitionName);

		// Compile T2
		for (let primary2 of primary.UPGRADES_TIER_M1) {
			let primaryName2 = primary2;
			primary2 = ensureIsClass(primary2);

			for (let secondary2 of secondary.UPGRADES_TIER_M1) {
				let secondaryName = secondary2;
				secondary2 = ensureIsClass(secondary2);

				let GUNS = [],
					TURRETS = [],
					LABEL = primary2.LABEL + "-" + secondary2.LABEL,
					BODY = JSON.parse(JSON.stringify(dreadnoughtBody)),
					UPGRADE_TOOLTIP = (primary2.UPGRADE_TOOLTIP ?? "") + " + " + (secondary2.UPGRADE_TOOLTIP ?? "");

				// Label it
				if (primary2.LABEL == secondary2.LABEL) LABEL = primary2.LABEL;
				if (primary2.UPGRADE_TOOLTIP == secondary2.UPGRADE_TOOLTIP) UPGRADE_TOOLTIP = primary2.UPGRADE_TOOLTIP;

				// Guns
				if (primary2.GUNS) GUNS.push(...primary2.GUNS);
				for (let g in secondary2.GUNS) {
					let POSITION = JSON.parse(JSON.stringify(secondary2.GUNS[g].POSITION)),
						PROPERTIES = secondary2.GUNS[g].PROPERTIES;
					POSITION[5] += 60;
					GUNS.push({ POSITION, PROPERTIES });
				}

				// Turrets
				if (primary2.TURRETS) TURRETS.push(...primary2.TURRETS);
				if (secondary2.TURRETS) TURRETS.push(...secondary2.TURRETS);

				// Body
				if (primary2.BODY) for (let m in primary2.BODY) BODY[m] *= primary2.BODY[m];
				if (secondary2.BODY) for (let m in secondary2.BODY) BODY[m] *= secondary2.BODY[m];

				// Definition name
				let definitionName2 = primaryName2 + secondaryName;

				// Actually make that guy
				Class[definitionName2] = {
					PARENT: ["genericDreadnought1"],
					BODY, LABEL, UPGRADE_TOOLTIP, GUNS, TURRETS
				};
				Class[definitionName].UPGRADES_TIER_2.push(definitionName2);
			}
		}
	}
}
