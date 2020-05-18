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

// Getting the products using the class function, locally from products.json, with properties assigned inside a constructor() method

class Products {
    
    async getProducts() {
        
        // Java try...catch to catch coding errors and execute some code to handle it
        // fetch() to allow to make network requests 
        try {
            let result = await fetch('products.json');
            let data = await result.json(); 
            return data;
            
        } catch (error) {
            console.log(error); 
            }
    }
}

// User interface class to DISPLAY products, getting items that are being returned from Products and displaying them

class UI {
    
}

// Local storage class 

class Storage {
    
}

// The HTML DOM EventListener, within instances are created, to call the functions

document.addEventListener("DOMContentLoaded", ()=>{
    
    const ui = new UI();
    
    const products = new Products();
    
    // Get all products 
    
    products.getProducts().then(data => console.log(data)); 
    
});