// Declaring Variables using querySelector

const cartBtn = document.querySelector('.cart-btn'); 

const closeCartBtn = document.querySelector('.close-basket'); 

const clearCart = document.querySelector('.clear-basket'); 

const clearDOM = document.querySelector('.basket'); 

const clearOverlay = document.querySelector('.basket-overlay'); 

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
           
           `
       })
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
        div.innerHTML = `
        <img src=${item.image} alt="product" class="product-img"></img>
                    
                    <div>
                        <h4>classic flavour</h4>
                        <h5>£3,60</h5>
                        <span class="remove-item">remove</span>
                    </div>
                    
                    <div>
                        <i class="fas fa-chevron-up"></i>
                        <p class="item-amount">1</p>
                        <i class="fas fa-chevron-down"></i>
                    </div>
        `
    }
    
}







// Local storage class 

class Storage {
    
    //Creating a static method to save products 
    static saveProducts(products){
        //setItem() method sets the value of the specified Storage Object item
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
    
}

// The HTML DOM EventListener, within instances are created, to call the functions

document.addEventListener("DOMContentLoaded", ()=>{
    
    const ui = new UI();
    
    const products = new Products();
    
    // Get all products 
    
    products.getProducts().then(products => {
        
    ui.displayProducts(products);
    //class used to call the saveProducts static method to add products to Local Storage
    Storage.saveProducts(products);
    
    }).then(()=>{
        
        ui.getBasketButtons(); 
        
    });
    
    
});



//2:14:00 