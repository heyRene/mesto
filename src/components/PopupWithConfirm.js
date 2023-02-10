import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }
  closePopup() {
    super.closePopup();
    this._form.reset();
  }
  openPopup(card, cardId) {
    super.openPopup();
    this.card = card;
    this.cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.card, this.cardId);
    });
  }
}
