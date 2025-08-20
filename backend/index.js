const refreshButton = document.querySelector(".refresh_button")
const ordersList = document.querySelector(".order_list");

const OrdersCollection = async () => {
    const res = await fetch('http://localhost:3000/orders');

    return await res.json();
}

refreshButton.addEventListener("click", async () => {
    ordersList.innerHTML = ""

    const orders = await OrdersCollection();

    listOrders(orders);
});

const listOrders = (orders) => {
    orders.map((order) => {
        const orderInfo = {
            id: order.id,
		    customer: order.customer.name,
            items: order.items,
		    teeths: order.teeths,
		    color: order.color,
		    date: order.date,
            total: order.items.map(item => {
                return parseFloat(item.task.value);
            }).reduce((acc, currentValue) => acc + currentValue)
        };

        const itemList = []

        const count = orderInfo.items.filter(item => item.task.name == "Aplicação Zircônia").length;
        console.log(count);

        ordersList.insertAdjacentHTML('beforeend', orderTemplate(orderInfo));
    });
}

const orderTemplate = (order) => {
    return `
        <div class="order">
            <div class="customer_order">
                <label for="">Cliente:</label>
                <p>${order.customer}</p>
            </div>
            <div class="order_items">
                ${
                    order.items.map(item => {
                        return `
                            <div class="item">
                                <p class="item_quantity"></p>
                                <p class="task_name">${item.task.name}</p>
                                <p class="task_value">${item.task.value}</p>
                            </div>
                        `
                    }).join("")
                }
            </div>
            <div id="specifies">
                <div class="order_teeths">
                    <label for="">Dentes:</label>
                    <p class="teeths">${order.teeths}</p>
                </div>
                <div class="order_teeths_color">
                    <label for="">Cor:</label>
                    <p class="teeths_color">${order.color}</p>
                </div>
                <div class="order_total_value">
                    <label for="">Total:</label>
                    <p class="total_value">${order.total}</p>
                </div>
                <div class="date">
                    <label for="">Data:</label>
                    <p class="date">${order.date}</p>
                </div>
            </div>
        </div>
    `
}