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
  const ratingOuter = document.createElement("div");
  ratingOuter.classList.add("stars-outer");
  const ratingInner = document.createElement("div");
  ratingInner.classList.add("stars-inner");
  const ratingPersentage = +item.rating.rate * 20;
  ratingInner.style.width = ratingPersentage + "%";
  ratingOuter.appendChild(ratingInner);
  const button = document.createElement("button");
  button.innerText = "Delete";
  const breakLine = document.createElement("br");
  const itemCard = document.createElement("div");
  itemCard.id = item.id;
  itemCard.classList.add("itemCard");
  itemCard.append(
    image,
    name,
    price,
    description,
    ratingOuter,
    breakLine,
    button
  );
  return itemCard;
}

export function appendItems(items, itemsList) {
  itemsList.append(...createItemsList(items));
}
