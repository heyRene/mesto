
//-----------------selectors----------------------------------------
export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  fieldsetSelector: ".popup__fieldset",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
};


export class FormValidator {
  constructor(
    {
      formSelector, 
      inputSelector,
      fieldsetSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    },
    formElement
  )
  {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._fieldsetSelector = fieldsetSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formElement = formElement;

  }

  //-----------------showing error----------------------------------------
_showError (inputElement, errorMessage) {
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._errorClass);
};

//-----------------hiding error----------------------------------------
 _hideError(inputElement) {
  const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = "";
};

//-----------------checking if input is valid----------------------------------------
_hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//-----------------showing/hiding error if input is valid/invalid----------------------------------------
_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showError(inputElement, inputElement.validationMessage);
  } else {
    this._hideError(inputElement);
  }
};

//-----------------toggle button by checcking if input is valid----------------------------------------
_toggleButtonState(inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

//-----------------setting event listeners----------------------------------------
_setEventListeners() {
  const inputList = Array.from(
    this._formElement.querySelectorAll(this._inputSelector)
  );
  const buttonElement = this._formElement.querySelector(
   this._submitButtonSelector
  );
  this._toggleButtonState(inputList, buttonElement);
  this._formElement.addEventListener('reset', () => {
    setTimeout(() => {
     this._toggleButtonState(inputList, buttonElement);
    }, 0); 
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  });
}

//-----------------enable validation----------------------------------------
enableFormValidation() {
  const formList = Array.from(
    document.querySelectorAll(this._formSelector)
  );
  formList.forEach(() => {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  });
};
}

