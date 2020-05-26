function random(min = 1, max = 6, ceil = false) {
    var _random = (Math.random() * max) + min;
    if (ceil === false) {
        return Math.floor(_random);
    }
    return Math.ceil(_random);
}
