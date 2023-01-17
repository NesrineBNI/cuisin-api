// Declare the list that will contain the data
let dataList = [];
// Declare size page
const pageSize = 6;
let curPage = 1;
//================================= recherche ==============================//
let resp = []; 
let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let value = document.getElementById("searchInput").value;
  
// function search data from rest api
async function getMealList() {
        let resMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + value);
        let data = await resMeal.json();
        resp = data.meals;
        // console.log(resp);
        pagination();

        document.querySelector('#nextButton').addEventListener('click', nextPage);
        document.querySelector('#prevButton').addEventListener('click', previousPage);
    }
    getMealList();
})
// function pagination
function pagination(page = 1) {
  if (page == 1) {
    prevButton.style.visibility = "hidden"
  }else{
    prevButton.style.visibility = "visible"
  }
  if (page == numberOfPages()) {
    nextButton.style.visibility = "hidden"
  }else{
    nextButton.style.visibility = "visible"
  }
  // create html
  document.querySelector("#data").innerHTML = ""; 
  resp.filter((row, index) => {
        let start = (curPage-1)*pageSize;
        let end = curPage*pageSize;
        if(index >= start && index < end)
         return true;
  }).forEach(c => {
    document.querySelector("#data").innerHTML +=
    `<div class="col">
      <div class="card">
        <img src="${c.strMealThumb}" class="card-img-top" alt="image">
        <div class="card-body">
          <h5 class="card-title">${c.strMeal}</h5>
          <button type="button" class="btn btn-info" onclick="getModal(${c.idMeal})"data-bs-toggle="modal" data-bs-target="#exampleModal">
              Info
          </button>
        </div>
      </div>
    </div>`;
  });
  document.getElementById("searchInput").value = '';
}

function previousPage() {
  if(curPage > 1) curPage--;
  pagination(curPage);
}
function nextPage() {
  if((curPage * pageSize) < resp.length) curPage++;
  pagination(curPage);
}
function numberOfPages(){
  return Math.ceil(resp.length / pageSize)
}

// Fetch data from rest api
async function getData() {
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
        <button type="button" class="btn btn-info" onclick=getModal(${dataList.idMeal}) data-bs-toggle="modal" data-bs-target="#exampleModal">
            Info
        </button>
      </div>
    </div>
  </div>`;
}
}
getData();
// function get show modal
async function getModal(id) {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
  const data = await response.json();
    // dataList = data.meals[0];

    let show = document.querySelector("#Modal");
    show.innerHTML = `<div>
    <h3>${data.meals[0].strMeal}</h3>
    <p>${data.meals[0].strCategory}</p>
    <h4>Ingredient</h4>
    <ul><li>${data.meals[0].strIngredient1}</li><li>${data.meals[0].strIngredient2}</li><li>${data.meals[0].strIngredient3}</li><li>${data.meals[0].strIngredient4}</li>
    </ul>
    <h4>watching</h4>
    <iframe width="100%" height="390" src="${data.meals[0].strYoutube.replace(
      "https://www.youtube.com/watch?v=",
      "https://www.youtube.com/embed/"
    )}" title="Fetching API data and displaying API data inside table." frameborder="0" allow="accelerometer; autoplay;
     clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>`;
}