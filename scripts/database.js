const orders = [
    {
        id: 1,
        bread: "White",
        protein: "Turkey",
        cheese: "Provolone",
        toppings: ["Lettuce", "Tomato", "Jalapenos", "Banana Peppers"],
        toasted: true,
        name: "Johnny Drama",
        orderStatus: true
    },
    {
        id: 2,
        bread: "White",
        protein: "Turkey",
        cheese: "Provolone",
        toppings: ["Lettuce", "Tomato", "Jalapenos", "Banana Peppers"],
        toasted: false,
        name: "Jimmy",
        orderStatus: true
    }
]

export const exportOrders = () => {
    return orders.map(order => {return {...order}})
}

const getNewOrderId = () => {
    const order = exportOrders()
    let highestOrderId = order.sort((a, b) => b.id - a.id)[0].id
    return highestOrderId + 1
}

export const addNewOrder = (order) => {
    const newId = getNewOrderId()
    order.id = newId
    orders.push(order)
    document.dispatchEvent(new CustomEvent("stateChanged"))
    
}