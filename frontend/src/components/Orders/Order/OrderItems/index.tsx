import "./style.css";

const OrderItem = ({ items }) => {

    const tasks = []

    items.forEach((item) => {
        const existingItem = tasks.find(i => i.name === item.task.name);

        if (existingItem) {
            existingItem.qty += 1;
            existingItem.value = parseInt(existingItem.value) + parseInt(existingItem.value);
        } else {
            tasks.push({
                qty: 1,
                name: item.task.name,
                value: item.task.value
            })
        }
    });

    return (
        <>
            {tasks.map((task) => (
                <div className="item">
                    <p className="item_quantity">{task.qty}</p>
                    <p className="task_name">{task.name}</p>
                    <p className="task_value">{task.value}</p>
                </div>
            ))}
        </>
    )
}

export default OrderItem;