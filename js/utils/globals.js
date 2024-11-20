export const globals = {
    shuffle(array){
        const shuffled = [];
        const arrayLength = array.length;

        while(shuffled.length !== arrayLength){
            const randIndex = this.generateRandomInt(array.length);
            shuffled.push(array[randIndex]);
            array.splice(randIndex, 1);
        }
        return shuffled;
    },

    generateRandomInt(max){
        return Math.floor(Math.random() * max);
    },

    generateRandomDouble(min, max){
        return (Math.random() * (max - min) + min).toFixed(1);
    }
}