let dataList = [];
async function getData() {
  // document.querySelector("#data").innerHTML = "";
    for(let i = 0; i < 6; i++) {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        dataList = data.meals[0];
        // console.log(dataList);
        document.querySelector("#data").innerHTML += `<div class="col">
        <div class="card">
          <img src="${dataList.strMealThumb}" class="card-img-top" alt="image">
          <div class="card-body">
            <h5 class="card-title">${dataList.strMeal}</h5>
            <button type="button" class="btn btn-info" onclick="getModal(${dataList.idMeal})"data-bs-toggle="modal" data-bs-target="#exampleModal">
                Info
            </button>
          </div>
        </div>
      </div>`;
    }  
}
getData();
async function getModal(id) {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const data = await response.json();
      // dataList = data.meals[0];
  
      let show = document.querySelector("#Modal");
      show.innerHTML = `<div>
      <h3>${data.meals[0].strMeal}</h3>
      <p>${data.meals[0].strCategory}</p>
      <h4>Ingredient</h4>
      <ul><li>${data.meals[0].strIngredient1}</li><li>${data.meals[0].strIngredient2}</li><li>${data.meals[0].strIngredient3}</li><li>${data.meals[0].strIngredient4}</li><li>${data.meals[0].strIngredient5}</li>
      </ul>
      <h4>watching</h4>
      <iframe width="100%" height="390" src="${data.meals[0].strYoutube.replace(
        "https://www.youtube.com/watch?v=",
        "https://www.youtube.com/embed/"
      )}" title="Fetching API data and displaying API data inside table." frameborder="0" allow="accelerometer; autoplay;
       clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>`;
}
// let selectList = [];//length
async function getCategory() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
    const data = await response.json();
        // selectList = data.meals[0];
        // console.log(dataList);
    for(let i = 0; i < data.meals.length; i++) {
        document.querySelector("#category").innerHTML += `<option value="1">${data.meals[i].strCategory}</option>`;
    }
}
getCategory();
// let regionList = [];//length
async function getRegion() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    const data = await response.json();
        // regionList = data.meals[0];
        // console.log(dataList);
    for(let i = 0; i < data.meals.length; i++) {
        document.querySelector("#region").innerHTML += `<option value="1">${data.meals[i].strArea}</option>`;
    }
}
getRegion();

let categoryData, areaData;
let allCategoriesAllArea = [];
document.getElementById("searchBtn").onclick = async function () {
  document.querySelector("#data").innerHTML = "";
    let category = document.getElementById("category").value;
    let area = document.getElementById("region").value;
    console.log(category);
    console.log(area);

    const response = await fetch
        ("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category);
    categoryData = await response.json();

    const res = await fetch
        ("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area);
    areaData = await res.json();
    if (area !== "AllRégions" && category == "AllCatégories") {
        let allArea = [];
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area);
        allArea = await res.json();
        console.log(allArea)
        getData(allArea)
    } else if (area == "AllRégions" && category !== "AllCatégories") {
        let allCategories = [];
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category);
        allCategories = await response.json();
        console.log(allCategories)
        getData(allCategories)
    } else if (category == "AllCatégories" && area == "AllRégions") {
        let AllData = [];
        for (let i = 0; i < Catégories.categories.length; i++) {
            const result = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + Catégories.categories[i].strCategory);
            AllData = await result.json();
            allCategoriesAllArea.push(AllData.meals)
        }
        console.log(allCategoriesAllArea.flat(1))
        getData(allCategoriesAllArea.flat(1))

    } else {

        getData()

    }
}
let contryAndCategoryId = [];
// and this function for build it
function getDataById() {
    for (let i = 0; i < categoryData.meals.length; i++) {
        for (let j = 0; j < areaData.meals.length; j++) {
            if (categoryData.meals[i].idMeal == areaData.meals[j].idMeal)
            areaAndCategoriesId.push(categoryData.meals[i]);
            console.log(areaAndCategoriesId.meals)
        }
    }
    getData(contryAndCategoryId)
}



