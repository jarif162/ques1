const searchMeal = document.getElementById("input");

function fetchDrink() {
  if (searchMeal.value) {
    // console.log(searchMeal.value);
    let url = `https://thecocktaildb.com/api/json/v1/1/search.php?s=${searchMeal.value}`;
    fetch(url)
      .then((res) => res.json())
      .then((drink) => showDrink(drink.drinks));

    document.getElementById("noDrink").style.display = "none";
  } else {
    alert("Search for a food first");
    document.getElementById("noMeal").style.display = "block";
  }
}

function showDrink(drink) {
  console.log(drink);
  for (let drinks of drink) {
    document.querySelector(
      ".meal-wrapper"
    ).innerHTML += `<div class="meal-box border border-gray-500 rounded-xl">
                <img
                    src=${drinks.strDrinkThumb}
                    alt="meal.strMeal"
                    class="rounded h-[200px]w-full object-cover"
                />
                <div>
                    <h3 class="heading font-2xl text-white">${
                      drinks.strDrink
                    }</h3>
                    <p class="text-gray-400 my-2">
                   ${drinks.strCategory.slice(0, 100)}
                    </p>
                    <p class="italic text-gray-500">
                    ${drinks.strGlass}
                    </p>
                    <p class="text-sm font-semibold ${
                      drinks.strAlcoholic === "Alcoholic"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }">${drinks.strAlcoholic}</p>

                    <div class="my-4">
                    <a href=${
                      drinks.strVideo
                    } target="_blank" class="btn">Watch</a>
                    <button class="px-3 text-white" onclick="lookUpDetails('${
                      drinks.idDrink
                    }')">View recipe</button>
                    </div>
                </div>
            </div>`;
  }
}

function lookUpDetails(id) {
  console.log("look up", id);
  let url = `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((drink) => showDrinkDetails(drink.drinks[0]));
}

function showDrinkDetails(drink) {
  console.log(drink);

  const details = document.getElementById("details");
  details.classList.add("visible");
  details.classList.remove("invisible");

  details.innerHTML = ` 
      <div class="popup bg-white w-[70%] min-h-[500px] p-10">
          <h2 class="text-2xl font-bold mb-4">${drink.strDrink}</h2>
          <p class="mb-6">${drink.strInstructions}</p>
          <a href="${
            drink.strVideo ? drink.strVideo : "#"
          }" target="_blank" class="px-4 bg-blue-500 hover:bg-blue-600">Watch</a>
          <button onclick="closeDetails()">Close</button>
      </div>
  `;
}

function closeDetails() {
  const details = document.getElementById("details");
  details.classList.add("invisible");
  details.classList.remove("visible");
}
const search = document.getElementById("search");
search.addEventListener("click", () => {
  fetchDrink();
});
