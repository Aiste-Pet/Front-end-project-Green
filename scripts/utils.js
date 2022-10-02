import { hideLoading } from "./spinner.js";
import { URL } from "./constants.js";

export function fetchData(URL, callbackFunction1, callbackFunction2) {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      callbackFunction1(data);
      callbackFunction2?.(data);  // optional chaining
      hideLoading();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function elementsEvent(
  elements,
  callbackFunction,
  categories,
  itemsList,
  items
) {
  elements.forEach((element) => {
    element.addEventListener("click", (event) => {
      callbackFunction(event.target, categories, itemsList, items);
    });
  });
}

export async function deleteById(elementTarget) {
  fetch(`${URL}/${elementTarget.parentElement.id}`, { method: "DELETE" })
    .then((response) => {
      if (response.status === 200) {
        console.log("OK");
        location.reload();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
