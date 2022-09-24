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

export function appendItems(items, itemsList) {
  itemsList.append(...createItemsList(items));
}
