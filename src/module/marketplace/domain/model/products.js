class Products {
  constructor({
    id = 0,
    title = "",
    price = 0,
    description = "",
    category = "",
    image = "",
  } = {}) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
  }
}

export default Products;
