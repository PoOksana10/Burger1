class Message {
    /**
     *
     * @param {string} item
     */
    constructor(item) {
        this.item = item;
        this.message = '';
        this.coffeeMessage = 'The classic Colombian coffee personifies the typical taste of South American coffees. ' +
            'Thus, it has a mellow citrus acidity combined with a strong caramel sweetness. It is considered a ' +
            'medium-bodied coffee with hints of nutty undertones, fruity flavors, and notes of chocolate';
        this.dessertMessage = 'It\'s a rich, moist intensely chocolate flavoured cake. It\'s denseness and distinct ' +
            'chocolate flavour can make it seem more like a dessert than a cake. Many describe this treat as a pure ' +
            'chocolate sensation. Certainly the dense structure does concentrate the chocolate flavour.';
        this.burgerMessage = 'Juicy, big, loaded with toppings of my choice. High quality beef medium to well with ' +
            'cheese on a multigrain bun. A huge single burger with all the fixings as per below list!' +
            'Want your choice to make - go ahead and adjust your burger how you like it!';
        this.colaMessage = 'Enjoy world wide loved soft drink, Coca Cola! Served with piece of lime in glass full ' +
            'of ice to make your thirst to go away!';
        this.friesMessage = 'Ideally your fries should have a crunchy exterior and a light, fluffy interior. ' +
            'When eating a serving of French fries, the last fry should always hold its form. ' +
            'Imagine eating a burger with a side of fries. Fries are either eaten first or last- so be sure to ' +
            'leave a lasting impression.';
        this.burgerSetMessage = 'Great deal for you! Order full set and get 10 percent discount. Tasty burger with ' +
            'crunchy fries and great taste of cooled Coca Cola will be a holiday for your stomach!';
        this.confirmationOrderMessage = 'Thank you for ordering with our restaurant! Please pay at the' +
            ' desk and collect order as per your number!    ';
    }

    getMessage() {
        switch (this.item) {
            case 'Coffee' :
                this.message = this.coffeeMessage;
                return this.message
            case 'Chocolate Cake' :
                this.message = this.dessertMessage;
                return this.message
            case 'French Fries' :
                this.message = this.friesMessage;
                return this.message
            case 'Burger Classic' :
                this.message = this.burgerMessage;
                return this.message
            case 'Coca Cola' :
                this.message = this.colaMessage;
                return this.message
            case 'Burger Set' :
                this.message = this.burgerSetMessage;
                return this.message
            default:
                this.message = this.confirmationOrderMessage + '<p> Your number is # ' +
                    Math.floor(Math.random() * 100) + '</p>' + '<p>Total amount to pay : ' +
                    this.item.split(' ')[2] + ' USD</p>';
                return this.message
        }
    }
}