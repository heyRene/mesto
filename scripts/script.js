import { Card, initialCards } from "./card.js";
import { FormValidator, config } from "./validate.js";

 //-----------------constants----------------------------------------
const popupEdit = document.querySelector(".popup_func_edit");
const popupAdd = document.querySelector(".popup_func_add");
const profileForm = document.forms.aboutForm;
const nameInput = profileForm.elements.name;
const occupationInput = profileForm.elements.occupation;
const popups = document.querySelectorAll('.popup');

const buttonOpenEditProfileForm = document.querySelector(
  ".profile__edit-button"
);
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");

const buttonCloseEditProfileForm = document.querySelector(
  ".popup__close-button"
);
const buttonCloseAddCardForm = document.querySelector(
  ".popup__close-button_func_add"
);
const buttonClosePreview = document.querySelector("#closeButtonPreview");

const submitButtonForEditProfileForm = document.querySelector(
  ".popup__submit-button"
);
const submitButtonForAddCardForm = document.querySelector(
  ".popup__submit-button_func_add"
);

const profileTitle = document.querySelector(".profile__title");
const profileCaption = document.querySelector(".profile__caption");

const addCardForm = document.forms.addCardForm;
const cardTitleInput = addCardForm.elements.place;
const cardLinkInput = addCardForm.elements.link;

const cards = document.querySelector(".elements");



//-----------------change profile info----------------------------------------
function changeUserInfo(nameValue, occupationValue) {
  profileTitle.textContent = nameValue;
  profileCaption.textContent = occupationValue;
}

//-----------------close popup with esc----------------------------------------
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_opened");
    closePopup(popupActive);
    console.log(popupActive);
  }
}
//-----------------close popup----------------------------------------
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscape);
}

//-----------------open popup----------------------------------------
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape);
}

//-----------------card appended in HTML----------------------------------------
function renderCard(card, end = true) {
  if (end) {
    cards.append(card);
  } else {
    cards.prepend(card);
  }
}

//-----------------creating new card----------------------------------------
function createCard(item) {
  const card = new Card(item, ".card-template");
  const cardElement = card.generateCard();
  return cardElement;
}

//-----------------changing user info submit form----------------------------------------
profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  changeUserInfo(nameInput.value, occupationInput.value);
  closePopup(popupEdit);
});

//-----------------oppening edit profile form----------------------------------------
buttonOpenEditProfileForm.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  occupationInput.value = profileCaption.textContent;
});

//-----------------close popup by clicking on overlay----------------------------------------
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        console.log(popup);
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
    })
  });

//-----------------oppening add card form----------------------------------------
buttonOpenAddCardForm.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(popupAdd);
});

//-----------------adding default cards----------------------------------------
initialCards.forEach((item) => {
  renderCard(createCard(item, true));
});

//-----------------creating new form validator object ----------------------------------------
[...document.forms].forEach((formElement) => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableFormValidation();
});

//-----------------adding new card with submit form----------------------------------------
addCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const item = {
    name: cardTitleInput.value,
    link: cardLinkInput.value
  }
  
  renderCard(createCard(item), false);
  closePopup(popupAdd);
  evt.target.reset();
})
