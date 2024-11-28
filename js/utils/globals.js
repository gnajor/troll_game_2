export const globals = {
    creatures:{
        stonefoot: "../media/images/characters/troll_1.gif",
        barkhide: "../media/images/characters/troll_2.gif",
        mossgrumble: "../media/images/characters/troll_3.gif",
        thornclaw: "../media/images/characters/troll_4.gif",
        gnarroot: "../media/images/characters/troll_5.gif"
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