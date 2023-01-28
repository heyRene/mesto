export default class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._cardClick = handleCardClick;
  }
  /** finding element in HTML and getting template */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  /** generating card */
  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".element__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
  /** toggle like */
  _handleLikeClick() {
    this._likeButton.classList.toggle("element__like_active");
  }
  /** deleting card */
  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }
  /** setting event listeners*/
  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._cardImage = this._element.querySelector(".element__image");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._cardImage.addEventListener("click", () => {
      this._cardClick(this._link, this._name);
    });
  }
}
