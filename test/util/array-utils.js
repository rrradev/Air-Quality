const removeRandom = (count = 1, arr = []) => {
    for (let i = 0; i < count && arr.length > 0; i++) {
        const index = Math.floor(Math.random() * arr.length);
        arr.splice(index, 1);
    }
    return arr;
};

module.exports = {
    removeRandom
}
