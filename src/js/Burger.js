class Burger {
    constructor() {
        this.base_ingredients = ['Bun', 'Meat']
        this.OnionCalories = 7;
        this.SaladCalories = 17;
        this.CheeseCalories = 58;
        this.CabbageCalories = 22;
        this.TomatoCalories = 8;
        this.MeatCalories = 250;
        this.BunCalories = 150;
        this.MustardCalories = 10;
        this.SauceBarbequeCalories = 34;
        this.MayoCalories = 94;
        this.KetchupCalories = 17;
        this.ingredientsBurger = [
            {'ingredient': 'Onion', 'status': true, 'cal': this.OnionCalories,},
            {'ingredient': 'Salad', 'status': true, 'cal':this.SaladCalories,},
            {'ingredient': 'Cheese', 'status': true, 'cal': this.CheeseCalories,},
            {'ingredient': 'Cabbage', 'status': true, 'cal':this.CabbageCalories,},
            {'ingredient': 'Tomato', 'status': true, 'cal': this.TomatoCalories},
            {'ingredient': 'Mayo', 'status': true, 'cal': this.MayoCalories,},
            {'ingredient': 'Ketchup', 'status': true, 'cal': this.KetchupCalories,},
            {'ingredient': 'Mustard', 'status': true, 'cal': this.MustardCalories,},
            {'ingredient': 'SauceBarbeque', 'status': true, 'cal': this.SauceBarbequeCalories,}
        ];
    };
}

