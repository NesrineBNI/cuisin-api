// "use strict";
// =========================== déclaration document html =============================
let cards = document.querySelector("#data");

let searchedResult = document.querySelector("#search-result");

let allCategoryNames = document.querySelector("#all-category");
let allRegionNames = document.querySelector("#all-Region");
let region = document.getElementById("all-Region");

let pagination = document.getElementById("pagination");
let arrAllCateg = [];
let arrAllAria = [];
let foundedarr = [];
let allCountriedArr = [];
let data;

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
// get data of category
// async function getCategory() {
//     const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
//     const data = await response.json();
//         // selectList = data.meals[0];
//         // console.log(dataList);
//     for(let i = 0; i < data.meals.length; i++) {
//         document.querySelector("#category").innerHTML += `<option value="1">${data.meals[i].strCategory}</option>`;
//     }
// }
// getCategory();
// get data of Region
// async function getRegion() {
//     const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
//     const data = await response.json();
//         // regionList = data.meals[0];
//         // console.log(dataList);
//     for(let i = 0; i < data.meals.length; i++) {
//         document.querySelector("#region").innerHTML += `<option value="1">${data.meals[i].strArea}</option>`;
//     }
// }
// getRegion();
// get data of category
async function getAllCategory() {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
    );
    const allCategory = await response.json();
    arrAllCateg.push(allCategory);
  
    // loop in array (all category)  for get name all  category
    allCategory.meals.map(function (category) {
      allCategoryNames.innerHTML += `
            <option value="${category.strCategory}">${category.strCategory}</option>
      `;
    });
    document.querySelectorAll("#all-category option").forEach(function (option) {
      if (option.value == "Lamb") {
        option.setAttribute("selected", true);
      }
    });
  }
  
  getAllCategory();
  
  // get data of Region
  async function getAllRegion() {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const allRegion = await response.json();
    arrAllAria.push(allRegion);
  
    // loop in array (all category)  for get name all Region
    allRegion.meals.map(function (Region) {
      allRegionNames.innerHTML += `
            <option value="${Region.strArea}">${Region.strArea}</option>
      `;
    });
    document.querySelectorAll("#all-Region option").forEach(function (option) {
      if (option.value == "Moroccan") {
        option.setAttribute("selected", true);
      }
    });
  }
  
  getAllRegion();
/*
========================== <!--  serch by category and Region --> ===================
*/
// Serch By Contry
async function serCategRegion() {
    const resPonse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + region.value
    );
    const data = await resPonse.json();
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?c=" +
      allCategoryNames.value
    );
    const category = await response.json();
  
    // show all data (Region and Category)
    function allCategReg() {
      if (
        allRegionNames.value !== "allRegion" &&
        allCategoryNames.value !== "AllCategory"
      ) {
        lopCategReg();
      } else if (
        allRegionNames.value == "allRegion" &&
        allCategoryNames.value !== "AllCategory"
      ) {
        getvalueofcategory(allCategoryNames.value);
      } else if (
        allCategoryNames.value == "AllCategory" &&
        allRegionNames.value !== "allRegion"
      ) {
        getvalueofregion(allRegionNames.value);
      } else if (
        allCategoryNames.value === "AllCategory" &&
        allRegionNames.value === "allRegion"
      ) {
        // show data in selected all Category all Region
        async function showAllData() {
          for (let i = 0; i < arrAllAria[0].meals.length; i++) {
            const resPonse = await fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?a=${arrAllAria[0].meals[i].strArea}`
            );
            const allData = await resPonse.json();
            allCountriedArr.push(allData.meals);
            DisplayMealsList(
              allCountriedArr.flat(),
              cards,
              mealsPerPage,
              currentPage
            );
            SetupPagination(allCountriedArr.flat(), pagination, mealsPerPage);
          }
        }
        showAllData();
      }
  
      // arrAllAria;
    }
  
    foundedarr.length = 0;
    cards.innerHTML = "";
    // Loop fetching elements that have the same id and stored in a variable
    function lopCategReg() {
      for (let h = 0; h < category.meals.length; h++) {
        for (let k = 0; k < data.meals.length; k++) {
          if (data.meals[k].idMeal == category.meals[h].idMeal) {
            foundedarr.push(data.meals[k]);
          }
        }
      }
    }
    allCategReg(); // show All data
    // showData(foundedarr); // function show data in cards
    DisplayMealsList(foundedarr, cards, mealsPerPage, currentPage);
    SetupPagination(foundedarr, pagination, mealsPerPage);
  }
  
  // function get regio
  // allRegionNames.addEventListener("onchange")
  async function getvalueofregion(p) {
    cards.innerHTML = "";
    const resPonse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + p
    );
    const data = await resPonse.json();
  
    DisplayMealsList(data.meals, cards, mealsPerPage, currentPage);
    SetupPagination(data.meals, pagination, mealsPerPage);
    // showData(data.meals);
  }
  //function get Categories
  async function getvalueofcategory(p) {
    cards.innerHTML = "";
    const resPonse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + p
    );
    const dataCateg = await resPonse.json();
    // showData(dataCateg.meals);
    DisplayMealsList(dataCateg.meals, cards, mealsPerPage, currentPage);
    SetupPagination(dataCateg.meals, pagination, mealsPerPage);
  }
  
  /*
  =====================<!-- PAGINTION -->=================================
  */
  // current Page
  let currentPage = 1;
  // meals Per Page
  let mealsPerPage = 6;
  let card = "";
  function DisplayMealsList(items, ShowAssignments, mealsPerPage, page) {
    page--;
  
    let start = mealsPerPage * page;
    let end = start + mealsPerPage;
  
    let itemswillAppear = items.slice(start, end);
  
    for (let i = 0; i < itemswillAppear.length; i++) {
      card += `
      <div class="col">
        <div class="card">
          <img src="${itemswillAppear[i].strMealThumb}" class="card-img-top" alt="image">
          <div class="card-body">
            <h5 class="card-title">${itemswillAppear[i].strMeal}</h5>
            <button type="button" class="btn btn-info" onclick="getModal(${itemswillAppear[i].idMeal})"data-bs-toggle="modal" data-bs-target="#exampleModal">
                Info
            </button>
          </div>
        </div>
      </div>`;
    }
    cards.innerHTML = card;
    card = "";
  }
  
  function SetupPagination(items, ShowAssignments, mealsPerPage) {
    ShowAssignments.innerHTML = "";
  
    let page_count = Math.ceil(items.length / mealsPerPage);
    for (let i = 1; i <= page_count; i++) {
      if (page_count > 1) {
        let btn = paginationButton(i, items);
        ShowAssignments.appendChild(btn);
      }
    }
  }
  
  function paginationButton(page, items) {
    let button = document.createElement("button");
    button.innerText = page;
    // if the current button value is equal to the page add an active class
    if (currentPage == page) button.classList.add("active-pagination");
    //
    button.addEventListener("click", function () {
      // when we click the button the value of the current page will be changed to the value of the clicked button
      currentPage = page;
      DisplayMealsList(items, searchedResult, mealsPerPage, currentPage);
      // delete the active class from the selected button
      let current_btn = document.querySelector(
        "#pagination button.active-pagination"
      );
      current_btn.classList.remove("active-pagination");
      // adding the active class to the selected button
      button.classList.add("active-pagination");
    });
    currentPage = 1;
    return button;
  }

































// let categoryData, areaData;
// let allCategoriesAllArea = [];
// document.getElementById("searchBtn").onclick = async function () {
//   document.querySelector("#data").innerHTML = "";
//     let category = document.getElementById("category").value;
//     let area = document.getElementById("region").value;
//     console.log(category);
//     console.log(area);

//     const response = await fetch
//         ("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category);
//     categoryData = await response.json();

//     const res = await fetch
//         ("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area);
//     areaData = await res.json();
//     if (area !== "AllRégions" && category == "AllCatégories") {
//         let allArea = [];
//         const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area);
//         allArea = await res.json();
//         console.log(allArea)
//         getData(allArea)
//     } else if (area == "AllRégions" && category !== "AllCatégories") {
//         let allCategories = [];
//         const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category);
//         allCategories = await response.json();
//         console.log(allCategories)
//         getData(allCategories)
//     } else if (category == "AllCatégories" && area == "AllRégions") {
//         let AllData = [];
//         for (let i = 0; i < Catégories.categories.length; i++) {
//             const result = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + Catégories.categories[i].strCategory);
//             AllData = await result.json();
//             allCategoriesAllArea.push(AllData.meals)
//         }
//         console.log(allCategoriesAllArea.flat(1))
//         getData(allCategoriesAllArea.flat(1))

//     } else {

//         getData()

//     }
// }
// let contryAndCategoryId = [];
// // and this function for build it
// function getDataById() {
//     for (let i = 0; i < categoryData.meals.length; i++) {
//         for (let j = 0; j < areaData.meals.length; j++) {
//             if (categoryData.meals[i].idMeal == areaData.meals[j].idMeal)
//             areaAndCategoriesId.push(categoryData.meals[i]);
//             console.log(areaAndCategoriesId.meals)
//         }
//     }
//     getData(contryAndCategoryId)
// }



