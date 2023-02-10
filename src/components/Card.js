export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteClick, handleLikeClick },
    templateSelector,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._cardClick = handleCardClick;
    this._deleteClick = handleDeleteClick;
    this._likeClick = handleLikeClick;
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
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__delete");
    const cardImage = this._element.querySelector(".element__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    if (this._userId !== this._ownerId) {
      this._deleteButton.style.display = "none";
    }

    this.setLikes(this._likes);
    this._setEventListeners();

    return this._element;
  }
  /** deleting card */
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
  _checkLike() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
  }

  setLikes(arr) {
    this._element.querySelector(".element__sum-like").textContent = arr.length;
    this._likes = arr;
    if (this._checkLike()) {
      this._likeButton.classList.add("element__like_active");
    } else {
      this._likeButton.classList.remove("element__like_active");
    }
  }
  /** setting event listeners*/
  _setEventListeners() {
    this._cardImage = this._element.querySelector(".element__image");
    this._likeButton.addEventListener("click", () => {
      this._likeClick(this._cardId, this._checkLike(), this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._deleteClick(this, this._cardId);
    });

    this._cardImage.addEventListener("click", () => {
      this._cardClick(this._link, this._name);
    });
  }
}
