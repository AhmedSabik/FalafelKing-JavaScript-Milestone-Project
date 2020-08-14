 The site is published at https://ahmedsabik.github.io/FalafelKing-JavaScript-Milestone-Project/
 
 I wanted to build a site called Falafel King, on the top we have a navbar, in the navbar one icon would technically later be opened up to be a navbar for the whole site, on the right hand side is the icon that opens the shopping basket, in the shopping basket we will be able to add products. I worked during the project with a type of products that was setup locally using the JSON data. 

As I am hovering over the product displayed, some of them will have add to basket, some of them will be already in the basket. The moment I click on add to basket, the shopping basket will open, in the basket I will have the items that are already in the basket, I can also close the basket, but every time I am going to be adding an item, I am going to have my shopping basket opened. 

Total amount to be paid is updated in the shopping cart. I am using a local storage, so that when the page is refreshed, the items in the shopping basket are still displayed, and the items that are in the basket cannot be added anymore. Items can be removed individually from the shopping basket. Any action taken in the shopping basket will be update in the overall total items displayed on the shopping basket icon. Clear basket button will clear the basket all together, the moment we do that we will have zero items and our total will be zero. In that case all the add to basket buttons will be updated and will be able to add them again to the shopping basket. 

Index.html structure was created as a first step. Separate file for styling was set up, a css file. Font Awesome and CSS were imported. App.js file created and a script line at the bottom of the index.html file would look for the JavaScript file, app.js. 

The fonts I decided to work with were imported into the CSS file, with the different sizes I needed. I decided to use CSS Custom Properties (Variables) to insert the value of a custom property, for that purpose I used the CSS :root Selector. A reset was also done (*{}) where all the elements by default had zero margin and padding and set box-sizing: border-box; so that on all elements padding and border are included in the width and height. For the whole body, font colour and background colour were referred to CSS :root Selector. Font family also selected, which was imported from Google Fonts. 

The first task was to set up the nave bar, due to not being currently concerned with links or pages, the navbar menu icon will not open any menus for the time being. Div with class of “navbar-center” created where font awesome icons were placed, including the website logo and the shopping basket icon, with a hard coded number of zero items. Using position: sticky; for the navbar, starting from a top position of zero, height of navbar set, flex property used to align the navbar elements in the centre of the navbar, with the navbar always staying on top with a z-index: 1. Max width set to never get bigger than 1170px if displayed on a large screen. CSS justify-content Property used with a value of space-between to make sure navbar elements are pushed from each other as far as possible. Shopping basket button set up with position relative, where the shopping items number was set up with position absolute, with top and right values to have it positioned the way I intended in the design. 

The main element of the Hero is the face logo of the Falafel King, designed on paper, scanned and uploaded. A button was also created with the text: shop now. For the whole hero class a min-height was added with a calc() function, to occupy a 100% of the screen minus the height of the nevbar. Transition property added to Shop Now button with a change in colour happening over time, but instead of hard-coding it each and every time I use it, I setup the main transition property as a variable in the CSS :root Selector. 

Moving on the product section, with the title: Our Falafel Kingdom. I started by hard-coding a single product within an article element. An add to bag tag will appear once I hover over the product’s photo. For the products styling I added padding. The parent div for all the products is products-center, with a display: grid; and grid-template-columns, which specifies the number (and the widths), of columns in a grid layout. To avoid working with a Media Query, I am using the repeat() function. The repeat() CSS function represents a repeated fragment of the track list, allowing a large number of columns or rows that exhibit a recurring pattern to be written in a more compact form. Values of the repeat function is as follows: auto-fit, minmax(260px, 1fr), meaning I want my specific column to be minimum 260px, and if there is space use 1 fraction. This way the screen was set to be responsive without the need of Media Query or working with Bootstrap. 

Add to shopping basket button is hidden using the transform: translate(101%); as in 101% to the right, the button is then translated all the way to the right.  For the basket button class I used transform and then translating back to zero, to achieve displaying the basket button upon hovering. 

Position fixed is used for the shopping basket overlay, as well as the actual shopping basket. Visibility in basket overlay will be hidden by default, and the moment we add an item to the basket, transparentBcg class will be activated. When close button used in shopping basket, visibility:hidden value will be activated again. In the shopping basket I set up a basket item, which contains the image of the product. After the product image a div was created that contained product title, product price and the option to remove the item from shopping basket. Another div allowed the option of increase and decreasing the number of a particular item, and also displays the actual count of this product.  Cart footer contains the total amount payable and a button to clear the basket. Shopping basket has a z-index of 2, whereas basket overlay has the z-index of 3. Same concept with transform in basket and showBasket classes. 

In smaller screen displays and shopping basket will cover the whole size of the screen, using @media screen and (min-width:).

For the shopping basket item, which I have been facing a problem with for a while. In class basket-item I used grid-template-columns: auto 1fr auto;. In html, the div with class basket-item contains 3 children elements: img, div and div.   I therefore set a 3 column layout, 1st with value of auto to use whatever width the image have, which was set in the next class to 75px, then I am using the fraction where I am spanning the content of the mid div all across, the third div with the chevrons to increase and decrease the amount of the individual product is set to value of auto to occupy the space with whatever the width of the button is. Gap in between columns is set to 1.5rem. This doesn’t seem to be working. 

This marked a primary completion of the project HTML and CSS layout. The next step was to start working on the project’s logic and functionality. 

Starting on my app.js, I selected some elements and signed them to the variables, in order to reuse them in later stages throughout the app.js file. I am also selecting the elements using the their classes and HTML DOM querySelector() Method. I then created a cart item, this was a variable which I set up as an empty array, this is my main cart where I placed information, got information from the local storage and so on. 

I then set up my classes. I started with the structure of the classes, first class I created was products, this class is responsible for getting the products using the class function, locally from products.json, with properties assigned inside a constructor() method.

I then created the UI class, which responsible for getting all the items that are being returned from the products or the local storage and displaying them. 

I then created the local storage class.

I then at the bottom set up the HTML DOM EventListener,  the eventlistner is DOMContentLoaded, I then called the Callback Function using the arrow function syntax () => { } . I right away created 2 instances, first from the UI class, second will be from products class. 

This concluded the general setup for the app.js 

I then created a JSON file which is a file that stores simple data structures and objects in JavaScript Object Notation (JSON) format, which is a standard data interchange format. JSON files are lightweight, text-based, human-readable, and can be edited using a text editor. In the JSON file I stored the data about the products in order to be converted to a Javascript object. Items in JSON were arranges in the form of values within an array, with ids, titles, prices and links to product images stored in the project assets. 

To add anything in the shopping basket I needed to get the products from products.json. I decided to use the “async/await” feature, the async means   a function always returns a promise, and the keyword await makes JavaScript wait until that promise settles and returns its result. I used fetch() which allows me to make requests using Promises. I then used try/catch statement.  The try statement allows you to define a block of code to be tested for errors while it is being executed. The catch statement allows you to define a block of code to be executed, if an error occurs in the try block.

To run the previous method, and within the HTML DOM EventListener, an instance is created with the method name: products.getProducts(). Instead of just returning a simple result, I returned the data using the JSON method I had on the fetch. In the console I will get my items, which are the objects listed in the JSON files. This will come from the property by the name of items, which is equal to an array in the JSON file, within the array each and every item will be wrapped in the object. 

After making sure this working, instead of returning data, I assigned this to a variable products which is equal to data.items. I used the JavaScript Array map() Method to create a products array with the results of calling a function for every array element, which in this case is the items. For each and every item I used the following syntax: (const {title,price} = item.fields; const {id} = item.sys; const image = item.fields.image.fields.file.url;). I then returned (return {title,price,id,image}) and then return products. When I console log this, the displayed result makes more sense in terms of structure and arrangement. 

I started working on the UI class, writing the logic for everything that would be displayed on the screen. I set up a method named displayProducts with an array. Within the The HTML DOM EventListener, within products.getProducts().then I added the method displayProducts, and I passed the same array Products back into displayProducts. 

I then used the array method, using for Each to loop over the product array, for each and every product I want to get the properties of the object (like title, price, etc) and place it wrapped in the HTML:

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

With the image source, I replaced the hard coded image source to src=${product.image},  and the data-id to id=${product.id},  and the title and the price. 

Once we run the forEach, I also would want to access my variable to hold the DOM element:  productsDOM.innerHTML= result; 

So, we got the information from the products, then I used the ui.display method where I got an array, and then I looped over this array for each and every item of the array, then I added this to my result variable as a string, and at the end we set the property on a products DOM equals to result. 

The result is that the webpage displayed all the products in my products.json file.  

Setting up the storage: 
I created a static method to save products:
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

To work with add to basket buttons, I decided to add an eventlistner, click event for the button, and then add it to the basket. In the //get all products section I have .then so I can keep on chaining it.  

An arrow function was added and within that I set up a function. The function name will be getBasketButtons with no arguments, and then select the buttons. I then used the following spread operator:
//Using spread operator
        const buttons = [...document.querySelectorAll(".basket-btn")];

Time to loop over these buttons and get their data-ids, to retrieve the actual product’s particular information.  Buttons array was set up, forEach used then, for each and every button, a callback function is set and then I got the id located on the button as follows: 
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

That way when the add to basket button is clicked the item is added to the basket and the button itself is disabled. I then wanted to get the chosen item from the local storage.
I then got the particular clicked product, based on its id, using spread operator and then added the amount of items purchased. 

//Get prodcut from products, based on the id, using spread operator, and add amount of items purchased
                let cartItem = {...Storage.getProduct(id), amount:1};
                

I then added the product to the shopping basket 
//Add product to the basket
                cart = [...cart, cartItem];

Then save the shopping basket in the local storage, to make sure how many items in the basket and basket total are updated  
//Save cart in local storage
                Storage.saveCart(cart);

Then set the basket values 
//Set cart values 
                this.setCartValues(cart);

Then display the shopping basket item in the shopping basket itself
//Display cart item
                this.addCartItem(cartItem);

and then finally show the shopping basket 
//Show the cart
                this.showCart(); 

Right after the cart array, I created the cart empty array, when I run getBasketButtons(), I assigned it to a buttonsDOM, which is equal buttons. 
// Array for buttons 

let buttonsDOM = [];

buttonsDOM = buttons;

I created static method, method name getProduct, with id as an argument. Products is the variable, I am parsing JSON because it's stored as a string. I then used the method I have in the local storage, and then I used getItem.  Instruction in the code line is that product is returning if the product id is matching the product id I am passing within the getProduct. 
//create static method, method name getProduct, with id as an argument. Products is the variable, I am parsing JSON because it's stored as a string
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }

Then get product from products functionality set as shown above. 

This item needed then to be added to the empty cart array, as shown above.   

The next step is to save the newly added items in the shopping basket in the local storage. Going back to the storage, I set up a saveCart method, passing the cart as an argument. 
//create static method, method name saveCart and then use Storage setItem() Method
   static saveCart(cart) {
       localStorage.setItem("cart", JSON.stringify(cart));
   }

I then moved on to setting shopping basket values, and setting up the total amount due for payment. The following method was set this.setCartValues(cart); 

Setting up the basket value method: 
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

Two variables were created, first is temporary total, and the other will be items total, both set initially to zero. Map method was then used, and will go through each and every item in the basket.  Items total added with += by the property of item.amount and this concludes the map method. I then accessed two DOM elements I had from the beginning, one was cart total, and then cart items. I updated the values then. Because I calculated the values of tempTotal by multiplying, and since the prices I have all in the fraction, I had to use parseFloat and then run the tempTotal, then using toFixed() method to make sure I only allow two decimal displayed. Next cartItems set. 

Next step is to add basket item, and display the item in the shopping basket: this.addCartItem(cartItem);. Div.innerHTML used with template literal. Variables accessed using ${item.image, item.title, etc}

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


Now that I have already selected the cart-content class for the cartContent variable, I used the HTML DOM appendChild() Method, as shown above. 

Next step is to show the shopping basket, using showCart method: this.showCart();

In CSS, the way I hid the shopping basket overlay was by using visibility: hidden; property, and for the shopping basket itself I used transform: translate(100%), and then to show it I added showBasket and transparentBcg cases. Within the app.js I have already selected both of these variables, one of them is CartOverlay and the second one is cartDOM. 

 showCart() {
       cartOverlay.classList.add("transparentBcg");
       cartDOM.classList.add("showBasket");
    }


Now when I click Add to Basket button, I see actual cart display with the clicked item added, totals are updated. I am unable however to exit the cart and return to the main shopping page. An eventlistener needs to be set to achieve this. 

I set up a method in the UI class. Heading over back to my document.addEventListener("DOMContentLoaded") I set up the application and called the setupAPP method. 

// Set up Application
    
    ui.setupAPP();

The method itself is as follows:

//Update basket from local storage and change basket total
    setupAPP() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click', this.showCart);
        closeCartBtn.addEventListener('click', this.hideCart);
    }


In the local storage I also created a static method: one liner where I checked if the item shopped for exists in the local storage. I used the question mark? is an alternative to an if statement,  I used then the parse method to get the item from the local storage, if the item does not exist, I will get an empty array, which means nothing has changed 

 static getCart() {
       return localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[]
   } 


I went on to set up the populateCart method using JavaScript Array forEach() Method:

//Populate cart method using JavaScript Array forEach() Method
    populateCart(cart) {
        cart.forEach(item =>this.addCartItem(item));
    }

Hide cart method created, which is the opposite of what I did with show cart. Instead of class list add I used remove. 

//Hide cart method 
    hideCart() {
     cartOverlay.classList.remove("transparentBcg");
     cartDOM.classList.remove("showBasket");   
    }


Now I can close the shopping basket, with items added to the basket when clicked on. 
Next I started working on the functionality when once I added the item to the shopping basket; I can either remove it, or increase and decrease the amount of this particular item the customer wishes to purchase, as well as clearing off the basket. 
In the UI class I set up another method:
ui.cartLogic();

Heading back to the UI class, I set up the method: 
cartLogic() {}
First I selected the clear basket button, using a clearCart call back method: 
 clearCartBtn.addEventListener("click", () => {this.clearCart();});

The clear basket method is set up as follows: 
clearCart(){
        //to return items in shopping basket, using map method, this will allow for getting all the items
        let cartItems = cart.map(item => item.id);
        
        //then remove those items from shopping basket by looping over the array from previous method, using forEach method
        cartItems.forEach(id => this.removeItem(id));

Method to remove item is then set up:

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



Now I can clear the shopping basket, and the add to basket button is reactivated. 

Next functionality is removing an individual item from the basket, increasing and decreasing the number of this specific item in the shopping basket. 
cartContent.addEventListener("click", event => {
 });

This allowed me when clicking on remove to target the remove-item class. When clicking on the up arrow, I targeted the fas fa-chevron-up class, when clicking on the down arrow I targeted the fas fa-chevron-down class. 
Then I set up the remove individual item functionality: 
//Setting up remove item functionality
           if(event.target.classList.contains("remove-item"))
           {
               let removeItem = event.target;
               let id = removeItem.dataset.id; 
//This removed the item from the DOM using the method removeChild
               cartContent.removeChild (removeItem.parentElement.parentElement);
//This removed the item from the basket 
               this.removeItem(id); 
               
           }

Now I can remove an individual item successfully from the shopping basket 

Now using the same method: event.target.classList.contains("class name"), I set up add amount functionality for individual items in the shopping basket:

//Setting up add amount functionality for individual item
           else if(event.target.classList.contains("fa-chevron-up")){
               let addAmount = event.target;
               let id = addAmount.dataset.id;
//This should allow me to get the chevron class with the item id
               let tempItem = cart.find(item => item.id===id); 
               tempItem.amount = tempItem.amount + 1;
//Now to update the local storage, by calling the storage class and utilising saveCart method: 
               Storage.saveCart(cart);
//Now to update the shopping basket total, passing the cart that was jus updated:
               this.setCartValues(cart);
//Using the HTML DOM nextElementSibling Property, the total shopping basket amount is updated successfully 
               addAmount.nextElementSibling.innerText = tempItem.amount; 
           }

This allowed me to increase the amount of each individual item successfully, in the shopping basket. 

Now using the same method: event.target.classList.contains("class name"), I set up reduce amount functionality for individual items in the shopping basket:

/Setting up subtract amount functionality for individual item
           else if(event.target.classList.contains("fa-chevron-down")){
               let lowerAmount = event.target;
               let id = lowerAmount.dataset.id;
               let tempItem = cart.find(item => item.id===id);
//Logic to lower the amount of an individual item in the shopping basket
               tempItem.amount = tempItem.amount - 1;
               //Logic to remove item if lowering amount hit zero
               if(tempItem.amount > 0){
                   Storage.saveCart(cart);
                   this.setCartValues(cart);
//Using the HTML DOM previousElementSibling Property, the total shopping basket amount is updated successfully 
                   lowerAmount.previousElementSibling.innerText = tempItem.amount;
               } else{
                   cartContent.removeChild(lowerAmount.parentElement.parentElement);
                   this.removeItem(id);
               }

And this finalise the functionality of the shopping basket 
