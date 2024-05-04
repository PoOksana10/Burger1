document.addEventListener('DOMContentLoaded', function () {
    const orders = new Prices('');
    orders.setLocalStorage();
    const parent = document.getElementById('basket');
    const element = new Element([{
        attributes: [{'type': 'button'},
            {'value': 'Orders'}, {classNames: ['basket']}]
    }, 'input', '']);
    const basket = element.setMultipleAttribute();
    parent.append(basket);
    const listener = new IngredientsData('');
    listener.menuElements.forEach(element => {
        document.getElementById(element).addEventListener('click', function () {
            document.getElementById('productImage').src = `../images/${element}.jpg`;
            document.querySelector('.productImage').classList.remove('hidden');
            const a = new IngredientsData(element);
            a.updateListOfIngredients(element);
        });
    });
});

document.addEventListener('click', (e) => {
    const target1 = e.target.closest('.confirm-order');
    const target2 = e.target.closest('.basket');
    const target3 = e.target.closest('.delProduct');
    const target4 = e.target.closest('.total-price-btn');
    if (target1) {
        const orders = new Prices(target1);
        orders.userOrdersStorage();
    }
    if (target2) {
        document.querySelector('.productImage').classList.add('hidden');
        document.querySelector('.container1').classList.remove('hidden');
        const orders = new Prices(target2);
        orders.displayOrders();
    }
    if (target3) {
        const element = target3.getAttribute('data-delProduct');
        const storage = JSON.parse(localStorage.getItem('UserOrders'));
        const product = storage.find(e => e[0] === element);
        storage.splice(storage.indexOf(product), 1);
        localStorage.setItem('UserOrders', JSON.stringify(storage));
        document.querySelector(`li[data-line="${element}"]`).remove();
        if (storage.length == 0) {
            document.querySelector('.total-price-btn').remove();
            document.getElementById('basketInfo').innerText = 'There is no orders yet!';
        }
    }
    if (target4) {
        const message = new Message(target4.value);
        document.querySelector('.total-price-btn').remove();
        document.getElementById('basketInfo').innerHTML = message.getMessage();
        setTimeout(() => {
            window.location.reload();
            localStorage.removeItem('BurgerCalories');
            localStorage.removeItem('UserOrders');
        }, 7000);
    }
});

document.addEventListener('change', (e) => {
    const target = e.target.closest('.itemQty');
    const qtyPattern = /^[1-9]/
    if (!target.value.match(qtyPattern)) {
        target.value = '1'
        alert('Minimum quantity is 1!')
    }
    const orders = new Prices(target);
    orders.updateOrderPrice();
});

