import { TrollBlueprint } from "./trollBlueprint.js";

export class Gnarroot extends TrollBlueprint {
    static {
        TrollBlueprint.registerTroll(Gnarroot);
    }

    constructor() {
        const ingredients = [
            { name: 'Airps', min: 0.2, max: 0.8, preference: 'neutral' },
            { name: 'Bilsno', min: 0.1, max: 0.7, preference: 'likes' },
            { name: 'Dlonon', min: 0.3, max: 0.9, preference: 'dislikes' },
            { name: 'Nirbel', min: 0.4, max: 0.6, preference: 'favorite' },
            { name: 'Swarwa', min: 0.1, max: 0.5, preference: 'neutral' },
        ];
        super(ingredients);
    }
}

export class Thornclaw extends TrollBlueprint {
    static {
        TrollBlueprint.registerTroll(Thornclaw);
    }

    constructor() {
        const ingredients = [
            { name: 'Dramid', min: 0.2, max: 0.7, preference: 'neutral' },
            { name: 'Emor', min: 0.1, max: 0.8, preference: 'likes' },
            { name: 'Gair', min: 0.3, max: 0.9, preference: 'dislikes' },
            { name: 'Lishenki', min: 0.4, max: 0.6, preference: 'favorite' },
        ];
        super(ingredients);
    }
}

export class Mossgrumble extends TrollBlueprint {
    static {
        TrollBlueprint.registerTroll(Mossgrumble);
    }

    constructor() {
        const ingredients = [
            { name: 'Nerb', min: 0.2, max: 0.8, preference: 'neutral' },
            { name: 'Nivane', min: 0.1, max: 0.7, preference: 'likes' },
            { name: 'Norb', min: 0.3, max: 0.9, preference: 'dislikes' },
            { name: 'Ragpue', min: 0.4, max: 0.6, preference: 'favorite' },
            { name: 'Shenta', min: 0.2, max: 0.5, preference: 'neutral' },
        ];
        super(ingredients);
    }
}

export class Barkhide extends TrollBlueprint {
    static {
        TrollBlueprint.registerTroll(Barkhide);
    }

    constructor() {
        const ingredients = [
            { name: 'Sloo', min: 0.2, max: 0.8, preference: 'neutral' },
            { name: 'Airps', min: 0.1, max: 0.7, preference: 'likes' },
            { name: 'Bilsno', min: 0.3, max: 0.9, preference: 'dislikes' },
            { name: 'Damsater', min: 0.4, max: 0.6, preference: 'favorite' },
            { name: 'Dlonon', min: 0.2, max: 0.5, preference: 'neutral' },
            { name: 'Emor', min: 0.1, max: 0.4, preference: 'neutral' },
        ];
        super(ingredients);
    }
}

export class Stonefoot extends TrollBlueprint {
    static {
        TrollBlueprint.registerTroll(Stonefoot);
    }

    constructor() {
        const ingredients = [
            { name: 'Gair', min: 0.2, max: 0.8, preference: 'neutral' },
            { name: 'Lishenki', min: 0.1, max: 0.7, preference: 'likes' },
            { name: 'Nerb', min: 0.3, max: 0.9, preference: 'dislikes' },
            { name: 'Nirbel', min: 0.4, max: 0.6, preference: 'favorite' },
            { name: 'Nivane', min: 0.2, max: 0.5, preference: 'neutral' },
            { name: 'Norb', min: 0.1, max: 0.4, preference: 'neutral' },
        ];
        super(ingredients);
    }
}