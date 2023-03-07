let mealData=document.getElementById('mealData');
let searchContainer=document.getElementById('searchContainer')
let submitBtn;

// $("document").ready(function () {
//     $("#loading").fadeOut(1000, function () {
//       $("body").css("overflow", "visible");
//     });
//   });

$(document).ready(()=>{
    searchByName('').then(()=>{
        $('.loading-screen').fadeOut(1000)
        $('body').css('overflow','visible')
    })

})

function openSideNav(){
    $('.side-nav').animate({left:0},500)
    $('.open-close-icon').removeClass('fa-align-justify');
    $('.open-close-icon').addClass('fa-x');
    for(let i=0;i<5;i++){
        $('.links li').eq(i).animate({top:0},(i+5)*100)

    }
}
closeSideNav()
function closeSideNav(){
let boxWidth=$('.side-nav .nav-tab').outerWidth()

    $('.side-nav').animate({left:-boxWidth},500)

    $('.open-close-icon').addClass('fa-align-justify');
    $('.open-close-icon').removeClass('fa-x');

    
    $('.links li').animate({top:300},500)

}
$('.side-nav i.open-close-icon').click(()=>{
if($('.side-nav').css('left')=='0px'){
    closeSideNav()
   
}else{
    openSideNav()
   
}
})
//***********************display home Meals*********************

function displayMeals(arr)
{
    let cartoona='';
    for(let i=0;i<arr.length;i++){
        cartoona+=`
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="meal">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        
        `
    }
    mealData.innerHTML=cartoona
}

//************************display category************************
async function getCategory()
{
    mealData.innerHTML="";
    $(".inner-loading-screen").fadeIn(500);
    searchContainer.innerHTML="";

    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
     response= await response.json()
    //  console.log(response.categories);
     displayCategory(response.categories)
    $(".inner-loading-screen").fadeOut(500);

}

function displayCategory(arr){
    let cartoona='';
    for(let i=0;i<arr.length;i++){
        cartoona+=`
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="meal">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>
        
        `
    }
    mealData.innerHTML=cartoona
}


//**********************display area***********************

async function getArea()
{
    mealData.innerHTML="";
    
    $(".inner-loading-screen").fadeIn(500);

    searchContainer.innerHTML="";

    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response=await response.json()
    // console.log(response.meals);
    displayArea(response.meals)
    $(".inner-loading-screen").fadeOut(500);

}

function displayArea(arr)
{
    let cartona='';
    for(let i=0;i<arr.length;i++)
    {
        cartona+=
        `<div class="col-md-3">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="text-center rounded-2 bg-dark   p-2 my-2 cursor-pointer">
            <i class="fa-solid fa-city fa-3x  mb-2 text-danger "></i>
            <h2 class="text-white fw-light">${arr[i].strArea}</h2>
        </div>
    </div>
        `
    }
    mealData.innerHTML=cartona
}

//************************display ingredient*********************

async function getIngredients()

{
    mealData.innerHTML="";

    $(".inner-loading-screen").fadeIn(500);

    searchContainer.innerHTML="";

    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response=await response.json()
    // console.log(response.meals);
    displayIngredients(response.meals.slice(0,20))
    $(".inner-loading-screen").fadeOut(500);

}
function displayIngredients(arr)
{
    let cartona ='';
    for(let i=0;i<arr.length;i++)
    {
        cartona +=`<div class="col-md-3">
                     <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class=" rounded-2  bg-dark text-center py-4 my-2 cursor-pointer">
                       <i class="fa-solid fa-bowl-food fa-4x text-success"></i>
                       <h3 class="text-white fw-light">${arr[i].strIngredient}</h3>
                       <p class="text-white">${arr[i].strDescription.split(" ").slice(0,20).join(" ")} </p>
                     </div>
                   </div>`
    }
    mealData.innerHTML=cartona;
}

// ****************display category meals**********************
async function getCategoryMeals(category)
{
    mealData.innerHTML="";
    $(".inner-loading-screen").fadeIn(500);

    searchContainer.innerHTML="";

    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response= await response.json();
    // console.log(response.meals);
    displayMeals(response.meals.slice(0,20))
    $(".inner-loading-screen").fadeOut(500);

}
// ****************display area meals**********************
async function getAreaMeals(area)
{
    mealData.innerHTML="";
    $(".inner-loading-screen").fadeIn(500);

    searchContainer.innerHTML="";

    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response= await response.json();
    // console.log(response.meals);
    displayMeals(response.meals.slice(0,20))
    $(".inner-loading-screen").fadeOut(500);

}
// ****************display ingredients meals**********************
async function getIngredientsMeals(ingredient)
{
    mealData.innerHTML="";
    $(".inner-loading-screen").fadeIn(500);

    searchContainer.innerHTML="";

    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    response= await response.json();
    // console.log(response.meals);
    displayMeals(response.meals.slice(0,20))
    $(".inner-loading-screen").fadeOut(500);

}
// ****************display meal details**********************

async function getMealDetails(mealId)
{
    closeSideNav();
    mealData.innerHTML="";
    $(".inner-loading-screen").fadeIn(500);

    searchContainer.innerHTML="";
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    response=await response.json();
    // console.log(response.meals[0]);
    displayMealDetails(response.meals[0])
    $(".inner-loading-screen").fadeOut(500);

}

function displayMealDetails(meal)
{
    searchContainer.innerHTML="";

  let ingredients=``
  for(let i=1;i<=20;i++)
  {
    if(meal[`strIngredient${i}`])
    {
        ingredients+=`<li class="alert alert-success m-1 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    }

  }
// console.log(ingredients);

let tags=meal.strTags?.split(",")
if(!tags) tags=[]
let tagsStr= ''
for(let i=0;i<tags.length;i++)
{
    tagsStr+=`
    <li class="alert alert-danger m-1 p-1">${tags[i]}</li>
    `
}

    let cartona=`  <div class="col-md-4">
    <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="meal">
    <h2>${meal.strMeal}</h2>
</div>
<div class="col-md-8">
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${ingredients}
    </ul>
    <h3>Tags :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
       ${tagsStr}
    </ul>
    <a target=_blank href="${meal.strSource}" class="btn btn-success">Source</a>
    <a target=_blank href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
</div>`
mealData.innerHTML=cartona
}
// ********Searchhhhh******
function showSearchInputs()
{

    searchContainer.innerHTML=` 
    <div class="row py-4">
    <div class="col-md-6">
        <input onkeyup="searchByName(this.value)" type="text" class="form-control text-white bg-transparent" placeholder="Search By Name...">
    </div>
    <div class="col-md-6">
        <input onkeyup="searchByFirstLetter(this.value)" type="text" maxlength="1" class="form-control text-white bg-transparent" placeholder="Search By First Letter....">
    </div>

  </div> `
  mealData.innerHTML=''
}

async function searchByName(term){
    $(".inner-loading-screen").fadeIn(500);

    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response= await response.json()
   response.meals ? displayMeals(response.meals) :displayMeals([])
   $(".inner-loading-screen").fadeOut(500);

}
async function searchByFirstLetter(term){
    $(".inner-loading-screen").fadeIn(500);

    term ==""? term="a":"";
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response= await response.json()
   response.meals ? displayMeals(response.meals) :displayMeals([])
   $(".inner-loading-screen").fadeOut(500);

}

// *******show contacts*********

function showContacts() {
    searchContainer.innerHTML="";

        mealData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword 
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div> `
        submitBtn = document.getElementById("submitBtn")
    
    
        document.getElementById("nameInput").addEventListener("focus", () => {
            nameInputTouched = true
        })
    
        document.getElementById("emailInput").addEventListener("focus", () => {
            emailInputTouched = true
        })
    
        document.getElementById("phoneInput").addEventListener("focus", () => {
            phoneInputTouched = true
        })
    
        document.getElementById("ageInput").addEventListener("focus", () => {
            ageInputTouched = true
        })
    
        document.getElementById("passwordInput").addEventListener("focus", () => {
            passwordInputTouched = true
        })
    
        document.getElementById("repasswordInput").addEventListener("focus", () => {
            repasswordInputTouched = true
        })
    }
    
    let nameInputTouched = false;
    let emailInputTouched = false;
    let phoneInputTouched = false;
    let ageInputTouched = false;
    let passwordInputTouched = false;
    let repasswordInputTouched = false;
    
    
    
    
    function inputsValidation() {
        if (nameInputTouched) {
            if (nameValidation()) {
                document.getElementById("nameAlert").classList.replace("d-block", "d-none")
                document.getElementById("nameInput").classList.add("is-valid")
                document.getElementById("nameInput").classList.remove("is-invalid")
    
            } else {
                document.getElementById("nameAlert").classList.replace("d-none", "d-block")
                document.getElementById("nameInput").classList.add("is-invalid")
                document.getElementById("nameInput").classList.remove("is-valid")

    
            }
        }
        if (emailInputTouched) {
    
            if (emailValidation()) {
                document.getElementById("emailAlert").classList.replace("d-block", "d-none")
                document.getElementById("emailInput").classList.add("is-valid")
                document.getElementById("emailInput").classList.remove("is-invalid")

            } else {
                document.getElementById("emailAlert").classList.replace("d-none", "d-block")
                document.getElementById("emailInput").classList.add("is-invalid")
                document.getElementById("emailInput").classList.remove("is-valid")

    
            }
        }
    
        if (phoneInputTouched) {
            if (phoneValidation()) {
                document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
                document.getElementById("phoneInput").classList.add("is-valid")
                document.getElementById("phoneInput").classList.remove("is-invalid")

            } else {
                document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
                document.getElementById("phoneInput").classList.add("is-invalid")
                document.getElementById("phoneInput").classList.remove("is-valid")

    
            }
        }
    
        if (ageInputTouched) {
            if (ageValidation()) {
                document.getElementById("ageAlert").classList.replace("d-block", "d-none")
                document.getElementById("ageInput").classList.add("is-valid")
                document.getElementById("ageInput").classList.remove("is-invalid")

            } else {
                document.getElementById("ageAlert").classList.replace("d-none", "d-block")
                document.getElementById("ageInput").classList.add("is-invalid")
                document.getElementById("ageInput").classList.remove("is-valid")
    
            }
        }
    
        if (passwordInputTouched) {
            if (passwordValidation()) {
                document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
                document.getElementById("passwordInput").classList.add("is-valid")
                document.getElementById("passwordInput").classList.remove("is-invalid")

            } else {
                document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
                document.getElementById("repasswordInput").classList.add("is-invalid")
                document.getElementById("repasswordInput").classList.remove("is-valid")

    
            }
        }
        if (repasswordInputTouched) {
            if (repasswordValidation()) {
                document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
                document.getElementById("repasswordInput").classList.add("is-valid")
                document.getElementById("repasswordInput").classList.remove("is-invalid")

            } else {
                document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
                document.getElementById("repasswordInput").classList.add("is-invalid")
                document.getElementById("repasswordInput").classList.remove("is-valid")

    
            }
        }
    
    
        if (nameValidation() &&
            emailValidation() &&
            phoneValidation() &&
            ageValidation() &&
            passwordValidation() &&
            repasswordValidation()) {
            submitBtn.removeAttribute("disabled")
        } else {
            submitBtn.setAttribute("disabled", true)
        }
    }
    
    function nameValidation() {
        return (/[a-z A-Z][^#&<>\"~;$^%{}?]{1,20}$/.test(document.getElementById("nameInput").value))
    }
    
    function emailValidation() {
        return (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(document.getElementById("emailInput").value))
    }
    
    function phoneValidation() {
        return (/^01[0125][0-9]{8}$/.test(document.getElementById("phoneInput").value))
    }
    
    function ageValidation() {
        return (/^[1-9]?[0-9]{1}$|^100$/.test(document.getElementById("ageInput").value))
    }
    
    function passwordValidation() {
        return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("passwordInput").value))
    }
    
    function repasswordValidation() {
        return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
    }
    
    
    
     