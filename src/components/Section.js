export default class Section {
  constructor({ renderer }, containerSelector) {
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
  renderItems(items, id) {
    this.clearItems();
    items.forEach((cardData) => {
      this._renderer(cardData, id);
    });
  }
}
