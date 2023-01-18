// Еще раз спасибо! Хорошего дня)

import { Card } from "./Card.js";
import { initialCards } from "./constants.js";
import { FormValidator, config } from "./FormValidator.js";

/** constants */
const popupEdit = document.querySelector(".popup_func_edit");
const popupAdd = document.querySelector(".popup_func_add");
const profileForm = document.forms.aboutForm;
const nameInput = profileForm.elements.name;
const occupationInput = profileForm.elements.occupation;
const popups = document.querySelectorAll(".popup");

const buttonOpenEditProfileForm = document.querySelector(
  ".profile__edit-button"
);
const buttonOpenAddCardForm = document.querySelector(".profile__add-button");

const profileTitle = document.querySelector(".profile__title");
const profileCaption = document.querySelector(".profile__caption");

const cardForm = document.forms.cardForm;
const cardTitleInput = cardForm.elements.place;
const cardLinkInput = cardForm.elements.link;

const cardsContainer = document.querySelector(".elements");

/** change profile info */
function setUserInfo(nameValue, occupationValue) {
  profileTitle.textContent = nameValue;
  profileCaption.textContent = occupationValue;
}

/** close popup with esc */
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_opened");
    closePopup(popupActive);
  }
}

/** close popup */
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscape);
}

/** copen popup */
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape);
}

/** card appended in HTML */
function renderCard(card, end = true) {
  if (end) {
    cardsContainer.append(card);
  } else {
    cardsContainer.prepend(card);
  }
}

/** creating new card */
function createCard(cardData) {
  const card = new Card(cardData, ".card-template");
  const cardElement = card.generateCard();
  return cardElement;
}

/** handle card form */
function handleCardFormSubmit(evt) {
  const cardData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  renderCard(createCard(cardData), false);
  closePopup(popupAdd);
  evt.target.reset();
}

/** handle profile form */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  setUserInfo(nameInput.value, occupationInput.value);
  closePopup(popupEdit);
}

/** open card form */
function openProfileForm(evt) {
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  occupationInput.value = profileCaption.textContent;
}

/** oppening edit profile form */
buttonOpenEditProfileForm.addEventListener("click", openProfileForm);

/** changing user info submit form */
profileForm.addEventListener("submit", handleProfileFormSubmit);

/** close popup by clicking on overlay */
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

/** oppening add card form */
buttonOpenAddCardForm.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(popupAdd);
});

/** adding default cards */
initialCards.forEach((cardData) => {
  renderCard(createCard(cardData, true));
});

/** creating new form validator object */
[...document.forms].forEach((formElement) => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableFormValidation();
});

/** adding new card with submit form */
cardForm.addEventListener("submit", handleCardFormSubmit);
