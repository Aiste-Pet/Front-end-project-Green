const loader = document.querySelector("#loading");

export function displayLoading() {
  loader.classList.add("display");
}

export function hideLoading() {
  loader.classList.remove("display");
}
