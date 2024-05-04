class IngredientsData {
    #productCals = [
        {'French Fries': 312},
        {'Coca Cola': 139},
        {'Burger Set': 963},
        {'Burger Classic': 512},
        {'Chocolate Cake': 360},
        {'Coffee': 95}
    ];

    /**
     *
     * @param {string} element
     */
    constructor(element) {
        this.burgerClass = new Burger()
        this.element = element;
        this.ingredientsIds = [];
        this.parent = document.querySelector('.ingredients');
        this.menuElements = ['Burger Classic', 'French Fries', 'Coffee', 'Coca Cola', 'Chocolate Cake', 'Burger Set'];
        this.ingredients = [];
        this.title = document.querySelector('.product-title');
        this.confirmBtn = document.querySelector('.confirm-order');
    }

    updateListOfIngredients() {
        for (let i = 0; i < this.burgerClass.ingredientsBurger.length; i++) {
            this.ingredients.push(Object.values(this.burgerClass.ingredientsBurger[i])[0]);
        }
        this.showListOfIngredients();
    };

    showListOfIngredients() {
        localStorage.setItem('BurgerCalories', JSON.stringify(this.burgerClass.ingredientsBurger));
        document.querySelector('.container1').classList.add('hidden');
        this.parent.textContent = '';
        this.title.innerText = this.element;
        let totalCals = this.BunCalories + this.MeatCalories;
        this.burgerClass.ingredientsBurger.forEach(item => {
            totalCals += item.cal;
        })
        this.confirmLine = document.createElement('li');
        const newElement1 = new Element([{
            attributes: [{'data-id': this.element}, {classNames: ['product-description']}]
        }, 'li', '']);
        this.descriptionLine = newElement1.setMultipleAttribute();
        if (this.element !== 'Burger Classic') {
            this.#productCals.forEach(productData => {
                for (let key in productData) {
                    if (key === this.element) {
                        totalCals = productData[key];
                    }
                }
            })
        }
        const newElement2 = new Element([{
            attributes: [{'data-id': this.element}, {'type': 'button'},
                {'value': 'Confirm Order - Total calories: ' + totalCals}, {classNames: ['confirm-order']}]
        }, 'input', '']);
        this.confirmBtn = newElement2.setMultipleAttribute();
        this.messageInit = new Message(this.element);
        this.descriptionLine.innerText = this.messageInit.getMessage();
        this.parent.append(this.descriptionLine);
        if (this.element === 'Burger Classic') {
            document.querySelector('.product-title').innerText = 'Burger Classic';
            this.ingredients.forEach(ingredient => {
                this.childMain = document.createElement('li');
                for (let i = 0; i <= 4; i++) {
                    this.childSub = document.createElement('td');
                    this.childMain.append(this.childSub);
                    if (i == 0) {
                        this.childSub.innerText = ingredient;
                    } else if (i == 1) {
                        const newElement = new Element([{
                            attributes: [{'type': 'button'},
                                {'value': 'Add -'}, {classNames: ['plus-' + ingredient, 'add']}]
                        }, 'input', '']);
                        this.plusBtn = newElement.setMultipleAttribute();
                        this.childSub.append(this.plusBtn);
                    } else if (i === 2) {
                        const newElement = new Element([{
                            attributes: [{'type': 'button'},
                                {'value': 'Remove -'}, {classNames: ['minus-' + ingredient, 'remove']}]
                        }, 'input', '']);
                        this.minusBtn = newElement.setMultipleAttribute();
                        this.childSub.append(this.minusBtn);
                    } else if (i == 3) {
                        this.e = this.burgerClass.ingredientsBurger.find(listIngredient => listIngredient.ingredient === ingredient);
                        if (this.e) {
                            this.childSub.classList.add('status_img');
                            const newElement = new Element([{
                                attributes: [{'alt': ''},
                                    {'src': './images/ok.png'}, {classNames: ['status-img', ingredient]}]
                            }, 'img', 'status_img']);
                            this.img = newElement.setMultipleAttribute();
                            this.childSub.append(this.img);
                        }
                    } else if (i == 4) {
                        this.childSub.innerText = (this.burgerClass.ingredientsBurger.find(element => element.ingredient === ingredient)).cal + 'Cal';
                        this.childSub.classList.add('cal' + ingredient);
                    }
                }
                this.parent.append(this.childMain);
            })
        }
        this.confirmLine.append(this.confirmBtn);
        this.parent.append(this.confirmLine);
        this.customIngredientListener();
    }

    customIngredientListener() {
        this.ingredients.forEach(ingredient => {
            this.ingredientsIds.push('plus-' + ingredient);
            this.ingredientsIds.push('minus-' + ingredient);
        })
        this.ingredientsIds.forEach(ingredientId => {
            document.addEventListener('click', (e) => {
                this.target = e.target.closest(`.${ingredientId}`);
                if (this.target) {
                    this.ingredientId = ingredientId;
                    this.updateIngredients();
                }
            })
        })
    }

    updateIngredients() {
        if (this.ingredientId) {
            const addRemoveIngredientId = this.ingredientId.split('-')[0];
            const ingredientName = this.ingredientId.split('-')[1];
            this.newUpdatedList = JSON.parse(localStorage.getItem('BurgerCalories'));
            this.selectedIngredient = this.newUpdatedList.find(element => element.ingredient === ingredientName);
            this.elementIndex = this.newUpdatedList.indexOf(this.selectedIngredient);
            const cal_current = 
                document.querySelector(`.${'cal' + this.selectedIngredient.ingredient}`);
            if (addRemoveIngredientId === 'plus') {
                this.newUpdatedList[this.elementIndex].status = true;
                this.newUpdatedList[this.elementIndex].cal =
                    this.burgerClass.ingredientsBurger.find(product => product.ingredient === ingredientName).cal;
                cal_current.innerText = this.burgerClass.ingredientsBurger[this.elementIndex].cal + ' Cal';
            } else if (addRemoveIngredientId === 'minus') {
                this.newUpdatedList[this.elementIndex].status = false;
                this.newUpdatedList[this.elementIndex].cal = 0;
                cal_current.innerText = '0 Cal';
            }
            let totalCals = this.BunCalories + this.MeatCalories;
            this.newUpdatedList.forEach(item => {
                totalCals += item.cal;
            })
            this.confirmBtn.value = 'Confirm Order - Total calories: ' + totalCals;
            this.updateStatusImg();
            localStorage.setItem('BurgerCalories', JSON.stringify(this.newUpdatedList));
        }
    }

    updateStatusImg() {
        const img_current = document.querySelector(`.${this.selectedIngredient.ingredient}`);
        this.newUpdatedList[this.elementIndex].status === true ? img_current.src = './images/ok.png' : 
            img_current.src = './images/off.png';
    }
}