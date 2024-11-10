import { EdibleBlueprint } from "./edibleBlueprint.js";

export class Alubi extends EdibleBlueprint {

    static {
        EdibleBlueprint.registerEdible(Alubi);
    }

    constructor() {
        const details = {
            ingredients: [
                { name: 'Norb', min: 0.2, max: 0.6 },
                { name: 'Bilsno', min: 0.3, max: 0.8 },
                { name: 'Nivane', min: 0.2, max: 1.0 },
                { name: 'Dramid', min: 0.4, max: 0.7 },
                { name: 'Nirbel', min: 0.1, max: 0.7 },
                { name: 'Ragpue', min: 0.2, max: 0.5 }
            ],
            processes: [
                { preparation: 'Microwaved', time: 30 },
                { transformation: 'Fermented', time: 20 },
                { disposal: 'Given away', time: 0 }
            ]
        };
        super(details);
    }
}

export class Banzine extends EdibleBlueprint {
    static {
        EdibleBlueprint.registerEdible(Banzine);
    }

    constructor() {
        const details = {
            ingredients: [
                { name: 'Airps', min: 0.5, max: 0.7 },
                { name: 'Nirbel', min: 0.1, max: 0.9 },
                { name: 'Dlonon', min: 0.4, max: 0.6 },
                { name: 'Swarwa', min: 0.3, max: 0.5 },
                { name: 'Gair', min: 0.1, max: 1.0 },
                { name: 'Shenta', min: 0.1, max: 0.5 }
            ],
            processes: [
                { preparation: 'Chilled', time: 20 },
                { transformation: 'Dried', time: 15 },
                { disposal: 'Taken out', time: 10 }
            ]
        };
        super(details);
    }
}

export class Frisa extends EdibleBlueprint {
    static {
        EdibleBlueprint.registerEdible(Frisa);
    }

    constructor() {
        const details = {
            ingredients: [
                { name: 'Dlonon', min: 0.4, max: 1.0 },
                { name: 'Nirbel', min: 0.2, max: 0.4 },
                { name: 'Emor', min: 0.2, max: 0.4 },
                { name: 'Gair', min: 0.5, max: 0.7 },
                { name: 'Ragpue', min: 0.1, max: 0.7 },
                { name: 'Nivane', min: 0.3, max: 0.8 }
            ],
            processes: [
                { preparation: 'Fried', time: 15 },
                { transformation: 'Rotten', time: 15 },
                { disposal: 'Taken out', time: 15 }
            ]
        };
        super(details);
    }
}

export class Grusil extends EdibleBlueprint {
    static {
        EdibleBlueprint.registerEdible(Grusil);
    }

    constructor() {
        const details = {
            ingredients: [
                { name: 'Dlonon', min: 0.4, max: 0.5 },
                { name: 'Nirbel', min: 0.3, max: 0.8 },
                { name: 'Airps', min: 0.3, max: 1.0 },
                { name: 'Swarwa', min: 0.4, max: 0.6 },
                { name: 'Dramid', min: 0.4, max: 0.5 },
                { name: 'Ragpue', min: 0.3, max: 0.4 }
            ],
            processes: [
                { preparation: 'Boiled', time: 10 },
                { transformation: 'Fermented', time: 10 },
                { disposal: 'Given away', time: 5 }
            ]
        };
        super(details);
    }
}

export class Kalaba extends EdibleBlueprint {
    static {
        EdibleBlueprint.registerEdible(Kalaba);
    }

    constructor() {
        const details = {
            ingredients: [
                { name: 'Airps', min: 0.3, max: 0.4 },
                { name: 'Nirbel', min: 0.1, max: 1.0 },
                { name: 'Bilsno', min: 0.3, max: 0.9 },
                { name: 'Damsater', min: 0.4, max: 0.7 },
                { name: 'Ragpue', min: 0.5, max: 0.9 },
                { name: 'Lishenki', min: 0.3, max: 0.7 }
            ],
            processes: [
                { preparation: 'Grated', time: 20 },
                { transformation: 'Fermented', time: 20 },
                { disposal: 'Given away', time: 5 }
            ]
        };
        super(details);
    }
}

export class Menaza extends EdibleBlueprint {
    static {
        EdibleBlueprint.registerEdible(Menaza);
    }

    constructor() {
        const details = {
            ingredients: [
                { name: 'Dlonon', min: 0.4, max: 0.9 },
                { name: 'Nirbel', min: 0.4, max: 0.6 },
                { name: 'Emor', min: 0.5, max: 0.7 },
                { name: 'Nivane', min: 0.3, max: 0.9 },
                { name: 'Damsater', min: 0.3, max: 0.8 },
                { name: 'Lishenki', min: 0.2, max: 0.8 }
            ],
            processes: [
                { preparation: 'Chilled', time: 15 },
                { transformation: 'Dried', time: 20 },
                { disposal: 'Remains', time: 0 }
            ]
        };

        super(details);
    }
}

export class Poteit extends EdibleBlueprint {
    static {
        EdibleBlueprint.registerEdible(Poteit);
    }

    constructor() {
        const details = {
            ingredients: [
                { name: 'Norb', min: 0.2, max: 0.7 },
                { name: 'Bilsno', min: 0.2, max: 1.0 },
                { name: 'Nerb', min: 0.2, max: 0.9 },
                { name: 'Damsater', min: 0.5, max: 0.7 },
                { name: 'Swarwa', min: 0.1, max: 0.4 },
                { name: 'Sloo', min: 0.4, max: 0.8 }
            ],
            processes: [
                { preparation: 'Fried', time: 15 },
                { transformation: 'Lasts', time: 20 },
                { disposal: 'Given away', time: 0 }
            ]
        };
        super(details);
    }
}

export class Tejuel extends EdibleBlueprint {
    static {
        EdibleBlueprint.registerEdible(Tejuel);
    }

    constructor() {
        const details = {
            ingredients: [
                { name: 'Norb', min: 0.3, max: 0.5 },
                { name: 'Bilsno', min: 0.1, max: 0.5 },
                { name: 'Airps', min: 0.4, max: 0.7 },
                { name: 'Nerb', min: 0.3, max: 0.7 },
                { name: 'Swarwa', min: 0.2, max: 0.7 },
                { name: 'Lishenki', min: 0.2, max: 0.8 }
            ],
            processes: [
                { preparation: 'Microwaved', time: 10 },
                { transformation: 'Lasts', time: 20 },
                { disposal: 'Taken out', time: 20 }
            ]
        };
        super(details);
    }
}

export class Zanahoo extends EdibleBlueprint {
    static {
        EdibleBlueprint.registerEdible(Zanahoo);
    }

    constructor() {
        const details = {
            ingredients: [
                { name: 'Airps', min: 0.5, max: 0.7 },
                { name: 'Nirbel', min: 0.2, max: 0.9 },
                { name: 'Dramid', min: 0.5, max: 0.9 },
                { name: 'Emor', min: 0.2, max: 0.9 },
                { name: 'Nivane', min: 0.5, max: 0.8 },
                { name: 'Sloo', min: 0.3, max: 0.6 }
            ],
            processes: [
                { preparation: 'Fried', time: 20 },
                { transformation: 'Rotten', time: 10 },
                { disposal: 'Remains', time: 0 }
            ]
        };
        super(details);
    }
}

export class Zerez extends EdibleBlueprint {
    static {
        EdibleBlueprint.registerEdible(Zerez);
    }

    constructor() {
        const details = {
            ingredients: [
                { name: 'Dlonon', min: 0.1, max: 0.9 },
                { name: 'Nirbel', min: 0.3, max: 0.8 },
                { name: 'Emor', min: 0.2, max: 0.8 },
                { name: 'Swarwa', min: 0.3, max: 0.8 },
                { name: 'Damsater', min: 0.4, max: 0.9 },
                { name: 'Norb', min: 0.2, max: 0.3 }
            ],
            processes: [
                { preparation: 'Boiled', time: 20 },
                { transformation: 'Dried', time: 10 },
                { disposal: 'Remains', time: 0 }
            ]
        };
        super(details);
    }
}