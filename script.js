function loginUserByClick(){                        //For user authentication username : admin, password : 12345

    const username =document.getElementById("username");
    const password = document.getElementById("password")

    if(username.value === "admin" && password.value === "12345" ){
        location.href = "./home.html"
    }else{
        alert("Invalid username or password")
    }

}

// function showProducts(productCategory){             //show all the products the category that've been clicked
//     const productBox = document.querySelectorAll(".product-category-box");

// }

// function redirect(){
//     const productClick = document.getElementById("product01");

//     productClick.addEventListener("click", () => {
//         location.href = "https://www.instagram.com/"
//     })
// }