let won = false;

function checkWin() {
    if (won) return;
    let all = 0,
        teams = {};
    for (let i = 1; i <= c.TEAMS; i++) {
        teams[-i] = 0;
    }
    for (let i = 0; i < entities.length; i++) {
        let o = entities[i];
        if (o.team < 0 && (o.isPlayer || o.isBot) && isPlayerTeam(o.team)) {
            teams[o.team]++;
            all++;
        }
    }
    let team;
    for (let t in teams) {
        if (teams[t] === all) {
            team = t;
            break;
        }
    }
    if (!team) return;
    won = true;
    sockets.broadcast(getTeamName(team) + " has won the game!");
    setTimeout(closeArena, 3000);
}

function init(g) {
    g.events.on('spawn', entity => {
        entity.on('dead', () => {
            if (!c.TAG || !entity.isPlayer && !entity.isBot) return;
            let killers = [];
            for (let entry of entity.collisionArray) {
                if (isPlayerTeam(entry.team) && entity.team !== entry.team) {
                    killers.push(entry);
                }
            }
            if (!killers.length) return;
            let killer = ran.choose(killers);
            if (entity.socket) {
                entity.socket.rememberedTeam = killer.team;
            }
            setTimeout(checkWin, 1000);
        });
    });
}

module.exports = { init };