const orders = [
    {
        id: 1,
        bread: "White",
        protein: "Turkey",
        cheese: "Provolone",
        toppings: ["Lettuce", "Tomato", "Jalapenos", "Banana Peppers"],
        name: "Johnny Drama",
        orderStatus: true
    }
]

const getNewOrderId = () => {
    let highestOrderId = orders.sort((a, b) => b.id - a.id)[0].id
    return highestOrderId + 1
}

export const exportOrders = () => {
    return orders.map(order => {return {...order}})
}

export const addNewOrder = (order) => {
    const newId = getNewOrderId()
    order.id = newId
    orders.push(order)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}