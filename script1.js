// let urlApi = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";
// let urllApi = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772";
// let urlllApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";
// let apiURL = `${urllApi}${urlApi}${urlllApi}`;
// document.addEventListener('DOMContentLoaded', false);

let dataList = [];
// console.log(apiURL);

// let pageSize = 6;
// let currentPage = 1;

// // Create HTML Data
// async function getHtml(){
//     // await getData()

//     let dataHtml = "";
//     // console.log(dataList);
//     dataList.filter((row, index) => {
//         let start = (currentPage - 1) * pageSize
//         let end = currentPage * pageSize

//         if(index >= start && index < end) return true;
//     }).forEach(card => {
//         dataHtml += `<div class="card">
//         <img src="${card.strCategory
//         }" class="card-img-top" alt="image">
//         <div class="card-body">
//           <h5 class="card-title">${card.strMeal}</h5>
//           <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
//           <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
//               Info
//           </button>
//         </div>
//       </div>`
//     });
//     document.getElementById("data").innerHTML = dataHtml;
// }
// getHtml();
// document.addEventListener('DOMContentLoaded', getMealList, false);

const pageSize = 6;
let curPage = 1;
//================================= recherche ==============================//
// let resp;
let resp = []; 
let searchBtn = document.getElementById("searchBtn");
//event listeners
searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let value = document.getElementById("searchInput").value;
    // console.log(value)
    // let table;
    
async function getMealList() {
        let resMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + value);
        let data = await resMeal.json();
        resp = data.meals;
        // console.log(resp);
        renderTable();

        document.querySelector('#nextButton').addEventListener('click', nextPage);
        document.querySelector('#prevButton').addEventListener('click', previousPage);

        // console.log(listMeal.meals);
       
    }
    getMealList();
})

function renderTable(page = 1) {
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
  // let result = '';
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
  // table.innerHTML = result;
  document.getElementById("searchInput").value = '';
}

function previousPage() {
  if(curPage > 1) curPage--;
  renderTable(curPage);
}
function nextPage() {
  if((curPage * pageSize) < resp.length) curPage++;
  renderTable(curPage);
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
    // let show = document.querySelector("#Modal");
    // show.innerHTML += `<div class="modal-dialog">
    //   <div class="modal-content">
    //       <div class="modal-header">
    //           <h5 class="modal-title" id="exampleModalLabel">${data.meals[0].strMeal}</h5>
    //           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //       </div>
    //       <div class="modal-body">
    //           ...
    //       </div>
    //       <div class="modal-footer">
    //           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //           <button type="button" class="btn btn-primary">Save changes</button>
    //       </div>
    //   </div>
    // </div>>`


    
    // show.innerHTML += `<div class="modal-dialog">
    //   <div class="modal-content">
    //       <div class="modal-header">
    //           <h5 class="modal-title" id="exampleModalLabel">${data.strMeal}</h5>
    //           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //       </div>
    //       <div class="modal-body">
    //           ...
    //       </div>
    //       <div class="modal-footer">
    //           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //           <button type="button" class="btn btn-primary">Save changes</button>
    //       </div>
    //   </div>
    // </div>`

// getModal();

// async function getModal() {
//   const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s");
//     const data = await response.json();
//     dataList = data.meals[0];

//     let show = document.getElementById("show");

// show.addEventListener("click", () => {
//   document.querySelector("#Modal").innerHTML += `<div class="modal-dialog">
//   <div class="modal-content">
//       <div class="modal-header">
//           <h5 class="modal-title" id="exampleModalLabel">${dataList.strMeal}</h5>
//           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//           ...
//       </div>
//       <div class="modal-footer">
//           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//           <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//   </div>
// </div>`
  
// })
// }
// getModal();

// async function getHtml(){
//     // await getData()
//     let card = "";
//     for (let i= 0 ; i < 6 ; i++) {
//       card += `<div class="card">
//       <img src= "${dataList.strMealThumb} class="card-img-top" alt="image">
//       <div class="card-body">
//         <h5 class="card-title">${i.strMeal}</h5>
//         <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
//         <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
//             Info
//         </button>
//       </div>
//     </div>`
//     };
//     document.querySelector("#data").innerHTML = card;
// // getData();

//   };