function loginUserByClick(){                                        //For user authentication username : admin, password : 12345

    const username =document.getElementById("username");
    const password = document.getElementById("password")

    if(username.value === "admin" && password.value === "12345" ){
        location.href = "./home.html"
    }else{
        alert("Invalid username or password")
    }

}

function showProductsCategoryList(){                                //show all the categories of the products below the Navigation bar
    const categoryElement = document.querySelector(".categories ul");

    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then((json) => {
        let categories = [];
        for(let categoryList of json){                              
            if(!categories.includes(categoryList.category)){
                categories.push(categoryList.category)                
            }
        }
        
        for(let element of categories){
            let li = document.createElement("li");
            li.className = "category-type";
            li.id = element;
            li.onclick = showProductsList;
            li.innerHTML = element[0].toUpperCase() + element.slice(1);
            categoryElement.appendChild(li);
        }
    }).catch((err) => {
        console.log(err);
    })

}


function showProductsList(event){                               //Views all the product when page gets reload and sort the products out when user clicks specific category
    
    let categoryId;
    event !== undefined ? categoryId = event.target.id : categoryId = "";
    
    let productContainer = document.querySelector(".product-container");
    productContainer.textContent = "";

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://fakestoreapi.com/products/${categoryId ? `category/${categoryId}` : ""}`, true);
    xhr.onload = () => {
        if(xhr.status == 200){

            let response = JSON.parse(xhr.response); 

            response.forEach(item => {
                template =    `<div class="product-category-box" id="${item.id}">
                    <div class="product-image" onclick="viewProductDescriptionPage(${item.id})"><img src=${item.image} alt="product-img"></div>
                    <div class="product-info">
                        <p class="product-name">${item.title.length < 50 ? item.title : item.title.slice(0,50) + "..."}</p>
                        <p class="product-price" style="color: green;"><i class="fa-solid fa-dollar-sign"></i> ${item.price}</p>
                        <p class="product-rating" style="cursor: pointer; margin-left: -3px"><i style="color: red;" class="fa-solid fa-star"></i> ${item.rating.rate} <span class="product-review-stat">(${item.rating.count})</span></p>
                    </div>
                </div>`
                productContainer.insertAdjacentHTML("beforeend", template);
            });
            
        }
    }
    xhr.send(); 

}

function viewProductDescriptionPage(id){                        //it takes the user to product description page while clicks on any product
                                                       
    window.sessionStorage.setItem("productId", id);             //Setting product id in sessionStorage to use the id in product description page
    location.href = "./product.html";
    
}

async function showProductDetailDescription(){                  //Get the data for product description page : image,category,title,desc,price,rate,review
    let productId = sessionStorage.getItem("productId");
    
    await(fetch(`https://fakestoreapi.com/products/${productId}`))
    .then(res => res.json())
    .then(json => {

    document.querySelector(".product-view-image img").src = json.image;
    document.getElementById("product-category").innerHTML = json.category;
    document.getElementById("product-title").innerHTML = json.title;
    document.getElementById("product-description").innerHTML = json.description;
    document.getElementById("product-price").innerHTML = `$ ${json.price}`;
    document.getElementById("product-rating").innerHTML = json.rating.rate;
    document.getElementById("product-review-stat").innerHTML = `(${json.rating.count})`;

    }).catch((err) => {
    console.log(err);
    })
}

function loadFunctions(){                                       //this function should load automatically when page loads, 
    showProductsCategoryList();
    showProductsList();
}

function categorySlideForMobileView(){                                              //A simple slide to show the category in mobile view

    const categoryDivHeight = document.querySelector(".categories");
    const categoryUlDisplay = document.querySelector(".categories ul");
    
    if(categoryDivHeight.style.height == "30px" &&  categoryUlDisplay.style.display == "none"){
        categoryDivHeight.style.height = "160px";
        categoryUlDisplay.style.display = "flex";
    }else{
        categoryDivHeight.style.height = "30px";
        categoryUlDisplay.style.display = "none";
    }

}

function hamburgerIconClick(){
    const clickIcon = document.querySelector(".hamburger-icon i");
    const navMenu = document.querySelector(".nav-list");

    clickIcon.classList.toggle("fa-x");
    navMenu.style.display = "block";

}