import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._popup.querySelector(".popup__submit-button");
    this._buttonText = this._submitButton.textContent;
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
  }
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  handleLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = `Сохранение...`;
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }
  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
