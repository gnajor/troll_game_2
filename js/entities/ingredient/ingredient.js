export class Ingredient{

    constructor(details){
        const {parent, data, time} = details;
        this.parent = parent;
        this.ingredient = data;
        this.element = this.create();
    }

    create(){
        const ingredientElement = document.createElement("div");
        ingredientElement.className = "ingredient";
        return ingredientElement;
    }

/*     process(counter){
        this.ingredient.amount = this.increaseAmount * counter;
    } */

    render(){
        this.element.textContent = `${this.ingredient.name}: ${this.ingredient.amount}`;
        this.parent.appendChild(this.element);
    }
}