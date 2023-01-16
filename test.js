let categoryData, areaData;
let allCategoriesAllArea = [];
document.getElementById("searchBtn").onclick = async function () {
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
let areaAndCategoriesId = [];
// and this function for build it
function getDataById() {
    for (let i = 0; i < categoryData.meals.length; i++) {
        for (let j = 0; j < areaData.meals.length; j++) {
            if (categoryData.meals[i].idMeal == areaData.meals[j].idMeal)
            areaAndCategoriesId.push(categoryData.meals[i]);
        }
    }
    getData(contryAndCategoryId)
}