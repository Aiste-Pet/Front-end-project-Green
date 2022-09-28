import { URL } from "./constants.js";
import { displayLoading, hideLoading } from "./spinner.js";

const response = document.querySelector(".response");

// class Item {
//   constructor(name, price, category, description, image, rate, count) { // alternative constructor creation - if rating object changes, more changes to the main constructor
//     this.name = name;
//     this.price = +price;
//     this.category = category;
//     this.description = description;
//     this.image = image;
//     this.rating = new Rating(rate, count);
//   }
// }
// class Rating {
//   constructor(rate, count) {
//     this.rate = rate;
//     this.count = count;
//   }
// }

class Item {
  constructor(name, price, category, description, image, rating) {
    this.title = name;
    this.price = +price;
    this.category = category;
    this.description = description;
    this.image = image;
    this.rating = rating;
  }
}

class Rating {
  constructor(rate, count) {
    this.rate = rate;
    this.count = count;
  }
}
createCategoriesDatalist();

document.querySelector("#buttonAdd").addEventListener("click", (event) => {
  const validity = document.querySelector("form").reportValidity();
  if (validity === false) {
    return validity;
  }
  event.preventDefault;
  response.classList.remove("success", "fail");
  response.innerText = "";
  const name = document.querySelector(
    'form[name="addItem"] input[name="name"]'
  ).value;
  const price = document.querySelector(
    'form[name="addItem"] input[name="price"]'
  ).value;
  const category = document.querySelector(
    'form[name="addItem"] input[name="category"]'
  ).value;
  const description = document.querySelector(
    'form[name="addItem"] textarea[name="description"]'
  ).value;
  const image = document.querySelector(
    'form[name="addItem"] input[name="image"]'
  ).value;
  const rate = document.querySelector(
    'form[name="addItem"] input[name="rating"]'
  ).value;
  if (price < 0) {
    response.classList.add("fail");
    response.innerText = "Price cannot be less than 0.";
  } else {
    const rating = new Rating(rate, "1");
    const item = new Item(name, price, category, description, image, rating);
    // addItem(item).then(() => document.querySelector("form").reset()); // leaving this commented until refresh after submit is solved
    addItem(item);
  }
});

// async function addItem(item) {
//   displayLoading();
//   try {
//     await fetch(URL, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       method: "POST",
//       body: JSON.stringify(item),
//     });
//     response.classList.add("success");
//     response.innerText = "New item has been added successfully.";
//   } catch (error) {
//     response.classList.add("fail");
//     response.innerText = "Failed to add item.";
//   } finally {
//     hideLoading();
//   }
// }

function addItem(item) {
  displayLoading();
  return fetch(URL, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(item),
  })
    .then(() => {
      hideLoading();
      response.classList.add("success");
      response.innerText = "New item has been added successfully.";
    })
    .catch((error) => {
      response.classList.add("fail");
      response.innerText = error;
    });
}

function createCategoriesDatalist() {
  const categories = localStorage.getItem("categories").split(",");
  if (categories.length != 0) {
    const datalist = document.querySelector("#categories");
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.innerText = category;
      datalist.append(option);
    });
  }
}
