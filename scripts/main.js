import { exportOrders, addNewOrder } from "./database.js";

document.addEventListener("stateChanged", event => {
    renderHTML()
    displayOrders()
})

document.addEventListener('notSelected', event => {
    errorText()
})

const renderHTML = () => {
    let html = ''
    const appElement = document.querySelector('#main-container')
    html += `<div class="error"></div>
    <div>
    <h1>Sub Shoppe</h1>
      <h3>Sandwich Construction</h3>
      <div class="subForm">
        <div class="extras">
            <label for="name">Enter Name For Order:</label>
            <input type="text" name="name" id="name"></input>
        </div>
        <div class="bread">
          <p>Pick your Bread</p>
            <label for="white-bread">White</label>
            <input id="white-bread" name="bread" type="radio" value="White Bread" />
            <label for="wheat-bread">Wheat</label>
            <input id="wheat-bread" name="bread" type="radio" value="Wheat Bread" />
            <label for="wrap-bread">Wrap</label>
            <input id="wrap" name="bread" type="radio" value="Wrap" />
        </div>
        <div class="protein">
            <p>Pick your Protein</p>
                <label for="turkey">Turkey</label>
                <input id="turkey" name="protein" type="radio" value="Turkey" />
                <label for="tuna">Big Tuna</label>
                <input id="tuna" name="protein" type="radio" value="Big Tuna" />
                <label for="chicken">Chicken</label>
                <input id="chicken" name="protein" type="radio" value="Chicken" />
                <label for="plant-based">Plant-Based Protein</label>
                <input id="plant-based" name="protein" type="radio" value="Plant Based Protein" />
        </div>
        <div class="cheese">
        <p>Pick Cheese Type</p>
            <label for="american">American Cheese</label>
            <input id="american" name="cheese" type="radio" value="American Cheese" />
            <label for="provolone">Provolone Cheese</label>
            <input id="provolone" name="cheese" type="radio" value="Provolone Cheese" />
            <label for="swiss">Swiss Cheese</label>
            <input id="swiss" name="cheese" type="radio" value="Swiss Cheese" />
        </div>
        <div class="toast">
          <p>Toasted?</p>
            <label for="toasted">Yes</label>
            <input id="toasted" name="toasted" type="checkbox" value="Toasted" />
        </div>
        <div class="toppings">
            <p>Pick your Toppings (Select all that apply)</p>
                <ul>
                <li>
                    <input id="lettuce" name="toppings" type="checkbox" value="Lettuce" />
                    <label for="lettuce">Lettuce</label>
                </li>
                <li>
                    <input id="jalapeno" name="toppings" type="checkbox" value="Jalapeno" />
                    <label for="Sausage">Jalapenos</label>
                </li>
                <li>
                    <input id="Black Olives" name="toppings" type="checkbox" value="Black Olives" />
                    <label for="Black Olives">Black Olives</label>
                </li>
                <li>
                    <input id="Green Peppers" name="toppings" type="checkbox" value="Green Peppers" />
                    <label for="Green Peppers">Green Peppers</label>
                </li>
                <li>
                    <input id="Onions" name="toppings" type="checkbox" value="Onions" />
                    <label for="Onions">Onions</label>
                </li>
                <li>
                    <input id="banana-peppers" name="toppings" type="checkbox" value="Banana Peppers" />
                    <label for="banana-peppers">Banana Peppers</label>
                </li>
                </ul>
        <div>
          <button id="submitOrder">Order Sub</button>
        </div>
      </div>
      <h3>Orders</h3>
      <div id="orders"></div>
    </div>
    `;
    return appElement.innerHTML = html
}

const errorText = () => {
    let html = ``
    const htmlElement = document.querySelector('.error')
    html += `<h2 class="errorDialog"> You missed something....</h2>`
    return htmlElement.innerHTML = html
}

renderHTML()

const displayOrders = () => {
    const orders = exportOrders()
    let completedOrders = ''
    const orderElement = document.querySelector('#orders')
    for(const order of orders) {
        if(order.orderStatus) {
            order.orderStatus = "COMPLETED"
            if(order.toasted) {
                order.toasted = "Yes"
            completedOrders += `<ul>`
            completedOrders += `<li>Order#: ${order.id}</li>`
            completedOrders += `<li>Order For: ${order.name}</li>`
            completedOrders += `<li>Bread: ${order.bread}</li>`
            completedOrders += `<li>Protein: ${order.protein}</li>`
            completedOrders += `<li>Cheese: ${order.cheese}</li>`
            completedOrders += `<li>Toasted?: ${order.toasted}</li>`
            completedOrders += `<li>Toppings: ${order.toppings}</li>`
            completedOrders += `<li>Order Status: ${order.orderStatus}</li>`
            completedOrders += `</ul>`
            }
        } if (order.toasted === false) {
            order.toasted = "No"
            completedOrders += `<ul>`
            completedOrders += `<li>Order#: ${order.id}</li>`
            completedOrders += `<li>Order For: ${order.name}</li>`
            completedOrders += `<li>Bread: ${order.bread}</li>`
            completedOrders += `<li>Protein: ${order.protein}</li>`
            completedOrders += `<li>Cheese: ${order.cheese}</li>`
            completedOrders += `<li>Toasted?: ${order.toasted}</li>`
            completedOrders += `<li>Toppings: ${order.toppings}</li>`
            completedOrders += `<li>Order Status: ${order.orderStatus}</li>`
            completedOrders += `</ul>`
        }
    }
     orderElement.innerHTML = completedOrders
     return orderElement
  };
  
  displayOrders()

  document.addEventListener('click', (event) => {
    const toppingsArray = []
            const bread = document.querySelector("input[name=bread]:checked")?.value
            const name = document.querySelector("input[name=name")?.value
            const cheese = document.querySelector("input[name=cheese]:checked")?.value
            const protein = document.querySelector("input[name=protein]:checked")?.value
            const toppingsElements = document.querySelectorAll("input[name=toppings]:checked")
            const toppings = toppingsElements.forEach(toppingsElement => {
              toppingsArray.push(toppingsElement.value)})
            const orders = {
                bread: bread,
                cheese: cheese,
                protein: protein,
                toppings: toppingsArray,
                toasted: false,
                name: name,
                orderStatus: true
                } 
    if (event.target.id === "submitOrder") {
        if (document.querySelector('input[name=name]')?.value === "") {
            document.dispatchEvent(new CustomEvent("notSelected"))
        } else if(document.querySelector("input[name=toasted]:checked")) {
            orders.toasted = true
            addNewOrder(orders)
        } else {
             addNewOrder(orders)
        } 
    }
})