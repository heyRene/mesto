export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  addItem(card, end = true) {
    if (end) {
      this._container.append(card);
    } else {
      this._container.prepend(card);
    }
  }
  clearItems() {
    this._container.innerHtml = "";
  }
  renderItems() {
    this.clearItems();
    this._renderedItems.forEach((cardData) => {
      this._renderer(cardData);
    });
  }
}
