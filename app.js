import { URL, categoryAll } from "./constants.js";
import { fetchData, elementsEvent, deleteById } from "./utils.js";
import { displayLoading } from "./spinner.js";
import {
  getUniqueCategories,
  createFilters,
  filterByCategory,
} from "./filters.js";
import { appendItems } from "./items.js";

const filterList = document.querySelector(".filtersContainer > ul");
const itemsList = document.querySelector(".itemsContainer");
let items = [];
let filters = [];
let deleteButtons = "";
let categories = [];

function getItems() {
  displayLoading();
  fetchData(URL, renderItems, renderCategories);
}

function renderCategories(data) {
  filters = getUniqueCategories(data, categories, filters);
  localStorage.setItem("categories", filters);
  createFilters(categoryAll, filterList);
  createFilters(filters, filterList);
  categories = document.querySelectorAll(".filtersContainer li");
  elementsEvent(categories, filterByCategory, categories, itemsList, items);
}

export function renderItems(data) {
  appendItems(data, itemsList);
  deleteButtons = document.querySelectorAll(".itemCard button");
  elementsEvent(deleteButtons, deleteById, categories, itemsList, items);
  return (items = data);
}

getItems();
