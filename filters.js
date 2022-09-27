import { displayLoading, hideLoading } from "./spinner.js";
import { fetchData } from "./utils.js";
import { URL, categoryAll } from "./constants.js";
import { renderItems } from "./app.js";
import { appendItems } from "./items.js";

export function getUniqueCategories(items, categories, filters) {
  items.map((item) => categories.push(item.category));
  const unsortedFilters = [...new Set(categories)];
  return unsortedFilters.sort();
}

export function createFilters(filters, filterList) {
  filters.forEach((filter) => {
    const listElement = document.createElement("li");
    listElement.innerText = filter;
    filterList.append(listElement);
  });
}

export function filterByCategory(categoryTarget, categories, itemsList, items) {
  const categoryName = categoryTarget.innerText;
  categories.forEach((category) => {
    category.classList.remove("active");
  });
  itemsList.innerHTML = "";
  displayLoading();
  if (categoryName === categoryAll.toString()) {
    hideLoading();
    appendItems(items, itemsList); // filtering already fetched items
    // fetchData(URL, renderItems); // filtering fetched data
  } else {
    const filterURL = `${URL}?category=${encodeURIComponent(categoryName)}`;
    hideLoading();
    // fetchData(filterURL, renderItems); // filtering fetched data
    categoryTarget.classList.add("active");
    // filtering already fetched items:
    const filteredItems = items.filter(
      (item) => item.category === categoryName
    );
    appendItems(filteredItems, itemsList);
  }
}
