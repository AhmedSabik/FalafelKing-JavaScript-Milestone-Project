// Declaring Variables using querySelector

const cartBtn = document.querySelector('.cart-btn'); 

const closeCartBtn = document.querySelector('.close-basket'); 

const clearCartBtn = document.querySelector('.clear-basket'); 

const cartDOM = document.querySelector('.basket'); 

const cartOverlay = document.querySelector('.basket-overlay'); 

const cartItems = document.querySelector('.cart-items'); 

const cartTotal = document.querySelector('.basket-total'); 

const cartContent = document.querySelector('.basket-content');

const productsDOM = document.querySelector('.products-center');  


// Array for main cart

let cart = [];

// Array for buttons 

let buttonsDOM = [];

// Getting the products using the class function, locally from products.json, with properties assigned inside a constructor() method

class Products {
    
    async getProducts() {
        
        // Java try...catch to catch coding errors and execute some code to handle it
        // fetch() to allow to make network requests 
        try {
            let result = await fetch('products.json');
            let data = await result.json(); 
            let products = data.items; 
            products = products.map(item =>{
                const {title,price} = item.fields;
                const {id} = item.sys;
                const image = item.fields.image.fields.file.url; 
                
                return {title,price,id,image}
            })
            return products;
        } catch (error) {
            console.log(error); 
            }
    }
}





// User interface class to DISPLAY products, getting items that are being returned from Products and displaying them

class UI {
    
    
    displayProducts(products){
       let result = ""; 
       //Using array method to loop over product array
       products.forEach(product => {
           //Use template literals to allow embedded expressions and get single product from html (after commenting it out)
           result +=`
           <!-- Single Product -->
            
            <article class="single-product">
                
                <div class="img-container">
                    
                    <img 
                    src=${product.image}
                    alt="product" 
                    class="product-img"></img>
                    
                    <button class="basket-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-basket"></i>
                        add to basket
                    </button>
                    
                </div>
                
                <h3>${product.title}</h3>
                
                <h4>£${product.price}</h4>
                
            </article>
        
            <!-- End of Single Product -->
           
           `;
       });
       productsDOM.innerHTML= result;
    }
    
    getBasketButtons(){
        
        //Using spread operator
        const buttons = [...document.querySelectorAll(".basket-btn")];
        
        buttonsDOM = buttons;
        
        buttons.forEach(button => {
            let id = button.dataset.id;
            //Setup the inCart variable, use find method for items in shopping basket
            let inCart = cart.find(item => item.id === id);
            //If the item is in the basket, this what I want to do
            if (inCart) {
                //Use InnerText property to return a desired text content of the specified node, and all its descendants
                button.innerText = "In Basket";
                button.disabled = true;
            }
        
            button.addEventListener("click", (event) => {
                event.target.innerText = "In Basket";
                event.target.disabled = true;
                
                //Get prodcut from products, based on the id, using spread operator, and add amount of items purchased
                let cartItem = {...Storage.getProduct(id), amount:1};
                
                //Add product to the basket
                cart = [...cart, cartItem];
                
                //Save cart in local storage
                Storage.saveCart(cart);
                
                //Set cart values 
                this.setCartValues(cart);
                
                //Display cart item
                this.addCartItem(cartItem);
                
                //Show the cart
                this.showCart(); 
            });
        });
    }
    
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item =>{
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });
        
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal; 
    }
    
    addCartItem(item) {
        const div = document.createElement("div"); 
        div.classList.add("basket-item");
        //Use template literals
        div.innerHTML = `
        <img src=${item.image} alt="product" class="product-img"></img>
                    
                    <div>
                        <h4>${item.title}</h4>
                        <h5>£${item.price}</h5>
                        <span class="remove-item" data-id=${item.id}>remove</span>
                    </div>
                    
                    <div>
                        <i class="fas fa-chevron-up" data-id=${item.id}></i>
                        <p class="item-amount">${item.amount}</p>
                        <i class="fas fa-chevron-down" data-id=${item.id}></i>
                    </div>
        `;
        //Use HTML DOM appendChild() Method
        cartContent.appendChild(div);
    }
    showCart() {
       cartOverlay.classList.add("transparentBcg");
       cartDOM.classList.add("showBasket");
    }
    
    //Update basket from local storage and change basket total
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click', this.showCart);
        closeCartBtn.addEventListener('click', this.hideCart);
    }
    
    //Populate cart method using JavaScript Array forEach() Method
    populateCart(cart) {
        cart.forEach(item =>this.addCartItem(item));
    }
    
    //Hide cart method 
    hideCart() {
     cartOverlay.classList.remove("transparentBcg");
     cartDOM.classList.remove("showBasket");   
    }
    
    //Cart logic method  
    cartLogic() {
       //Clear cart button
       clearCartBtn.addEventListener("click", () => {this.clearCart();});
       //Shopping basket functionality
       cartContent.addEventListener("click", event => {
           //Setting up remove item functionality
           if(event.target.classList.contains("remove-item"))
           {
               let removeItem = event.target;
               let id = removeItem.dataset.id; 
               cartContent.removeChild (removeItem.parentElement.parentElement);
               this.removeItem(id); 
               
           }
           //Setting up add amount functionality for individual item
           else if(event.target.classList.contains("fa-chevron-up")){
               let addAmount = event.target;
               let id = addAmount.dataset.id;
               let tempItem = cart.find(item => item.id===id); 
               tempItem.amount = tempItem.amount + 1; 
               Storage.saveCart(cart);
               this.setCartValues(cart);
               addAmount.nextElementSibling.innerText = tempItem.amount; 
           }
           //Setting up subtract amount functionality for individual item
           else if(event.target.classList.contains("fa-chevron-down")){
               let lowerAmount = event.target;
               let id = lowerAmount.dataset.id;
               let tempItem = cart.find(item => item.id===id);
               tempItem.amount = tempItem.amount - 1;
               //Logic to remove item if lowering amount hit zero
               if(tempItem.amount > 0){
                   Storage.saveCart(cart);
                   this.setCartValues(cart);
                   lowerAmount.previousElementSibling.innerText = tempItem.amount;
               } else{
                   cartContent.removeChild(lowerAmount.parentElement.parentElement);
                   this.removeItem(id);
               }
            
           }
           
       });
    }
    
    clearCart(){
        //to return items in shopping basket, using map method, this will allow for getting all the items
        let cartItems = cart.map(item => item.id);
        
        //then remove those items from shopping basket by looping over the array from previous method, using forEach method
        cartItems.forEach(id => this.removeItem(id));
        
        //Remove items when clicking clear basket button, by deleting the DOM element and any children it had, using removeChild method
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        
        //Call the hide cart method
        this.hideCart(); 
        
    }
    
    
    //Remove item from basket method and update cart values
    removeItem(id) {
        //First filter the shoing basket
        cart = cart.filter(item => item.id !==id);
        
        //Get the last value availble for the basket form the previous code line
        this.setCartValues(cart);
        
        //Save the last value of the shopping basket
        Storage.saveCart(cart);
        
        //Update add to basket button, passing the id given from the removeItem. getSingleButton method is set up after  
        let button = this.getSingleButton(id);
        
        //Disable the specific button from above
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-basket"></i>
                        add to basket`;
    }
    
    //Get the button that was used to add an item to the cart
    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id); 
    }

}







// Local storage class 

class Storage {
    
    // Creating a static method to save products 
    static saveProducts(products){
        //setItem() method sets the value of the specified Storage Object item, products stringified
        localStorage.setItem("products", JSON.stringify(products));
    }
    
    //create static method, method name getProduct, with id as an argument. Products is the variable, I am parsing JSON because it's stored as a string
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }
   
   //create static method, method name saveCart and then use Storage setItem() Method
   static saveCart(cart) {
       localStorage.setItem("cart", JSON.stringify(cart));
   }
   
   static getCart() {
       return localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[]
   } 
}

// The HTML DOM EventListener, within instances are created, to call the functions

document.addEventListener("DOMContentLoaded", ()=>{
    
    const ui = new UI();
    
    const products = new Products();
    
    // Set up Application
    
    ui.setupAPP();
    
    // Get all products 
    
    products.getProducts().then(products => {
        
    ui.displayProducts(products);
    // Class used to call the saveProducts static method to add products to Local Storage
    Storage.saveProducts(products);
    
    })
    .then(()=>{
        
        ui.getBasketButtons(); 
        
        ui.cartLogic();
        
    });
    
    
});



//5:35:00 