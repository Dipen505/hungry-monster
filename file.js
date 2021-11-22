const showingDisplay = condition => {
    const blockDisplay = document.getElementById('ingredient-list');
    blockDisplay.style.display = condition;
}
//Searching meal function
const searchFood = () => {
    inputText = document.getElementById('search-bar');
    if (inputText.value === "") {
        document.getElementById('search-nothing').style.display = "block";
        showingDisplay("none");
    }
    else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText.value}`)
            .then(res => res.json())
            .then(data => mealList(data.meals));
        document.getElementById('search-bar').value = "";
        document.getElementById('search-nothing').style.display = "none";
        showingDisplay("none");
    }
}
// Function for after searched available meal
const mealList = meals => {
    let dataHouse = "";
    meals.forEach(item => {
        dataHouse += `
        <div class = "meal-thumb" onclick = "getMealId('${item.idMeal}')"><img src = "${item.strMealThumb}">
        <h4 class = "meal-name">${item.strMeal}</h4>
        </div>
        `
        document.getElementById('meal-container').innerHTML = dataHouse;
    })
}
//Meal Id collector function
const getMealId = id => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => getIngredient(data.meals));
    showingDisplay("block");
    document.getElementById('search-nothing').style.display = "none";
}

// Showing ingredient detail function
const getIngredient = ingredient => {
    const imageDiv = document.getElementById('ingredient-list');
    imageDiv.innerHTML = `
    <div class = "ingredient-detail">
    <img src = "${ingredient[0].strMealThumb}">
    <h2>${ingredient[0].strMeal}</h2>
    <h6>Ingredients</h6>
    <p>✅${ingredient[0].strIngredient1}</p>
    <p>✅${ingredient[0].strIngredient2}</p>
    <p>✅${ingredient[0].strIngredient3}</p>
    <p>✅${ingredient[0].strIngredient4}</p>
    <p>✅${ingredient[0].strIngredient5}</p>      
    <p>✅${ingredient[0].strIngredient6}</p>
    </div>
    `
}
