class Prices {
    #prices = [
        {'Burger Classic': 6.87},
        {'Coca Cola': 1.32},
        {'Coffee': 1.87},
        {'Chocolate Cake': 3.36},
        {'Burger Set': 9.65},
        {'French Fries': 2.54},
    ];

    /**
     *
     * @param {any} target
     */
    constructor(target) {
        this.data = new Burger()
        this.target = target;
        this.userOrders = JSON.parse(localStorage.getItem('UserOrders'));
        this.displayElement = document.getElementById('basketInfo');
    };

    setLocalStorage() {
        localStorage.getItem('UserOrders') || localStorage.setItem('UserOrders', '[]');
    };

    userOrdersStorage() {
        const data = this.target.getAttribute('data-id');
        if (this.userOrders) {
            const item = this.userOrders.find(item => item[0] === data);
            if (!item) {
                const qty = 1;
                const price = this.priceColumnData('', [data, qty], false);
                this.userOrders.push([data, qty, price, qty * price]);
                localStorage.setItem('UserOrders', JSON.stringify(this.userOrders));
                this.finalizeOrder();
            } else {
                alert('This item is already in your basket!');
            }
        }
    };

    finalizeOrder() {
        if (confirm('Item has been added to basket. Would you like to finalize order?')) {
            document.querySelector('.productImage').classList.add('hidden');
            document.querySelector('.container1').classList.remove('hidden');
            this.displayOrders();
        }
    };

    displayOrders() {
        this.displayElement.innerHTML = '';
        for (let item of this.userOrders) {
            const orderLine = document.createElement('li');
            orderLine.setAttribute('data-line', item[0]);
            for (let i = 0; i <= 3; i++) {
                this.orderLineColumn = document.createElement('td');
                if (i == 0) {
                    if (item[0] === 'Burger Classic') {
                        let ingredientList = '';
                        const ingredients = JSON.parse(localStorage.getItem('BurgerCalories'))
                        ingredients.forEach(ingredient => {
                            if (ingredient.status) {
                                ingredientList += ingredient.ingredient + ', ';
                            }
                        })
                        let plainBurger;
                        if (ingredientList.length == 0) {
                            console.log(ingredientList.length)
                            plainBurger = ':plain';
                        } else {
                            plainBurger = ', ';
                        }
                        this.orderLineColumn.innerHTML = `${item[0]} : <p>( ${this.data.base_ingredients[0] + ", " + this.data.base_ingredients[1] + plainBurger + ingredientList.slice(0, -2)} )</p>`
                    } else {
                        this.orderLineColumn.innerText = item[0];
                    }

                } else if (i == 1) {
                    let value = 1;
                    this.userOrders.forEach(element => {
                        if (element[0] === item[0]) {
                            value = element[1];
                        }
                    })
                    const newElement = new Element([{
                        attributes: [{'type': 'number'},
                            {'value': value}, {'min': '1'}, {'data-name': item[0]}, {classNames: ['itemQty']}]
                    }, 'input', '']);
                    const itemQty = newElement.setMultipleAttribute();


                    this.orderLineColumn.append(itemQty);
                } else if (i == 2) {
                    this.priceColumnData(this.orderLineColumn, item, true);
                } else if (i == 3) {
                    const newElement = new Element([{
                        attributes: [{'alt': ''},
                            {'data-delProduct': item[0]}, {'src': './images/delete.png'}, {classNames: ['delProduct']}]
                    }, 'img', '']);
                    const delImg = newElement.setMultipleAttribute();
                    this.orderLineColumn.append(delImg);
                }
                orderLine.append(this.orderLineColumn);
                this.displayElement.append(orderLine);
            }
        }
        if (!this.userOrders.length == 0) {
            const buyLine = document.createElement('li');
            const newElement = new Element([{
                attributes: [{'type': 'button'}, {classNames: ['total-price-btn']}]
            }, 'input', '']);
            this.buyBtn = newElement.setMultipleAttribute();
            this.setBtnValue(true);
            buyLine.append(this.buyBtn);
            this.displayElement.append(buyLine);
        } else {
            document.getElementById('basketInfo').innerText = 'There is no orders yet!';
        }
    };

    setBtnValue(create) {
        if (!create) {
            this.buyBtn = document.querySelector('.total-price-btn');
        }
        let totalValue = 0
        this.userOrders.forEach(element => {
            totalValue += element[3]
        });
        this.buyBtn.value = 'Confirm Orders ' + totalValue.toFixed(2) + ' USD';
    };

    priceColumnData(elements, item, status) {
        let price;
        this.#prices.forEach(element => {
            for (let key in element) {
                if (key === item[0]) {
                    if (status) {
                        elements.innerText = (item[1] * element[key]).toFixed(2) + ' USD';
                        elements.setAttribute('class', 'itemPrice');
                        elements.setAttribute('data-name', item[0]);
                    } else (price = element[key])
                }
            }
        });
        return price;
    };

    updateOrderPrice() {
        const currentElement =
            document.querySelector(`.itemPrice[data-name="${this.target.getAttribute('data-name')}"]`);
        const currentElementName = currentElement.getAttribute('data-name');
        this.priceColumnData(currentElement, [currentElementName, this.target.value], true);
        const currentStorageElement = this.userOrders.find(item => item[0] === currentElementName);
        currentStorageElement[1] = parseInt(this.target.value);
        currentStorageElement[3] = currentStorageElement[2] * this.target.value;
        const currentElementIndex = this.userOrders.indexOf(currentStorageElement);
        this.userOrders[currentElementIndex] = currentStorageElement;
        localStorage.setItem('UserOrders', JSON.stringify(this.userOrders));
        this.setBtnValue(false);
    };
}


