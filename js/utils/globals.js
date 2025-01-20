export const globals = {
    creatures:{
        grug: "../media/images/characters/troll_1.gif",
        snarg: "../media/images/characters/troll_2.gif",
        bork: "../media/images/characters/troll_3.gif",
        klog: "../media/images/characters/troll_4.gif",
        zorp: "../media/images/characters/troll_5.gif",
        frim: "../media/images/characters/troll_1.gif",
    },
    
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