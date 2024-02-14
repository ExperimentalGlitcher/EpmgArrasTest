module.exports = {
    LEVEL_CAP: 4096,
    LEVEL_SKILL_POINT_FUNCTION: level => {
        if (level < 2) return 0;
        if (level <= 40) return 1;
        if (level <= 45 && level & 1 == 1) return 1;
        if (level % 3 == 1 && level < 280) return 1;
        return 0;
    },
};