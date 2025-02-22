export class Ingredient{

    static ingredientInstances = {
        edible: [],
        troll: []
    };

    static removeIngredients(){
        Ingredient.ingredientInstances.edible = [];
        Ingredient.ingredientInstances.troll = [];
    }

    constructor(details){
        const {parent, data, id, type} = details;
        this.parent = parent;
        this.ingredient = data;
        this.startAmount = 0;
        this.id = id;
        this.element = this.create();
        Ingredient.ingredientInstances[type].push(this);
    }

    create(){
        const ingredientElement = document.createElement("div");
        ingredientElement.className = "ingredient";
        return ingredientElement;
    }
    
    render(){
        this.element.textContent = `${this.ingredient.name}: ${this.ingredient.amount}`;
        this.parent.appendChild(this.element);
    }

    storeStartAmount(){ 
        this.startAmount = this.ingredient.amount;
    }

    rot(counter, duration){
        this.ingredient.amount = Number((this.startAmount - (counter * (this.startAmount / duration))).toFixed(2));
    }

    process(counter, duration){

        this.ingredient.amount = Number((0 + (counter * (this.startAmount / duration))).toFixed(2));
    }
}