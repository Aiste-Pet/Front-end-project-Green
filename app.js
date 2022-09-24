const loader = document.querySelector("#loading");
const filterList = document.querySelector(".filtersContainer > ul");
let items = [];
let filters = [];
const URL = "http://localhost:3000/items";
const itemsList = document.querySelector(".itemsContainer");
const categoryAll = ["All items"];
let deleteButtons = "";
let categories = [];

function fetchData(URL, callbackFunction1, callbackFunction2) {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      items = data;
      callbackFunction1();
      if (callbackFunction2) callbackFunction2();
      hideLoading();
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderItems() {
  appendItems(items);
  deleteButtons = document.querySelectorAll(".itemCard button");
  elementsEvent(deleteButtons, deleteById);
}

function renderCategories() {
  getUniqueCategories(items);
  createFilters(categoryAll);
  createFilters(filters);
  categories = document.querySelectorAll(".filtersContainer li");
  elementsEvent(categories, filterByCategory);
}

function displayLoading() {
  loader.classList.add("display");
}

function hideLoading() {
  loader.classList.remove("display");
}

function getUniqueCategories(items) {
  let categories = [];
  items.map((item) => categories.push(item.category));
  const unsortedFilters = [...new Set(categories)];
  return (filters = unsortedFilters.sort());
}

function createFilters(filters) {
  filters.forEach((filter) => {
    const listElement = document.createElement("li");
    listElement.innerText = filter;
    filterList.append(listElement);
  });
}

function createItemsList(items) {
  return items.map((item) => createItemCard(item));
}

function createItemCard(item) {
  const image = document.createElement("img");
  image.src = item.image;
  image.alt = "Product Image";
  const name = document.createElement("h4");
  name.innerText = item.title;
  const price = document.createElement("h3");
  price.innerText = new Intl.NumberFormat("lt-LT", {
    style: "currency",
    currency: "EUR",
  }).format(+item.price);
  const description = document.createElement("p");
  description.innerText = item.category + ": " + item.description;
  const rating = document.createElement("meter");
  rating.value = (item.rating.rate / 10) * 2;
  const button = document.createElement("button");
  button.innerText = "Delete";
  const breakLine = document.createElement("br");
  const itemCard = document.createElement("div");
  itemCard.id = item.id;
  itemCard.classList.add("itemCard");
  itemCard.append(image, name, price, description, rating, breakLine, button);
  return itemCard;
}

function appendItems(items) {
  itemsList.append(...createItemsList(items));
}

function elementsEvent(elements, callbackFunction) {
  elements.forEach((element) => {
    element.addEventListener("click", (event) => {
      callbackFunction(event.target);
    });
  });
}

function deleteById(elementTarget) {
  fetch(`${URL}/${elementTarget.parentElement.id}`, { method: "DELETE" })
    .then((response) => {
      if (response.status === 200) {
        console.log("OK");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function filterByCategory(categoryTarget) {
  const categoryName = categoryTarget.innerText;
  categories.forEach((category) => {
    category.classList.remove("active");
  });
  itemsList.innerHTML = "";
  displayLoading();
  if (categoryName === categoryAll.toString()) {
    hideLoading();
    // appendItems(items); //filtering already fetched items
    fetchData(URL, renderItems);
  } else {
    debugger;
    const filterURL = `${URL}?category=${encodeURIComponent(categoryName)}`;
    hideLoading();
    fetchData(filterURL, renderItems);
    categoryTarget.classList.add("active");
    // const filteredItems = items.filter(      //filtering already fetched items
    //   (item) => item.category === categoryName  //filtering already fetched items
    // );  //filtering already fetched items
    // appendItems(filteredItems); //filtering already fetched items
  }
}

function getItems() {
  displayLoading();
  fetchData(URL, renderItems, renderCategories);
}

getItems();
