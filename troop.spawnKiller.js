let flag = Game.flags.attackFlag;
if (creep.pos.roomName === flag.pos.roomName) {
    let spawn = creep.room.find(FIND_HOSTILE_SPAWNS)[0];
    let outcome = creep.attack(spawn);
    if (outcome === ERR_NOT_IN_RANGE) creep.moveTo(spawn)
}
else {
    creep.moveTo(flag)
}