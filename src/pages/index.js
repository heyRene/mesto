// Еще раз спасибо! Хорошего дня)
import Section from "../components/Section.js";
import "./index.css";
import Card from "../components/Card.js";
import { FormValidator, config } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

/** constants */
import {
  popupEdit,
  popupAdd,
  nameInput,
  occupationInput,
  buttonOpenEditProfileForm,
  buttonOpenAddCardForm,
  profileTitle,
  profileCaption,
  cardsContainer,
  initialCards,
  popupWithImageSelector,
} from "../utils/constants.js";

/** FUNCTIONS */

/** creating card */
function createCard(cardData) {
  const card = new Card({ data: cardData, handleCardClick }, ".card-template");
  const cardElement = card.generateCard();
  return cardElement;
}

/** setting user info */
function setUserInfo() {
  const actualUserInfo = userInfo.getUserInfo();
  nameInput.value = actualUserInfo.name;
  occupationInput.value = actualUserInfo.occupation;
}

/** submitting edit form */
function handleEditFormSubmit(formValues) {
  const { name, occupation } = formValues;
  userInfo.setUserInfo(name, occupation);
  popupEditForm.closePopup();
}

/** prewieving image */
function handleCardClick(link, name) {
  popupWithImage.openPopup(link, name);
}

/** submit add new card form */
function handleAddFormSubmit(formValues) {
  cardList.addItem(createCard(formValues), false);
  popupAddForm.closePopup();
}

/** NEW INSTANCES */

/** user info */
const userInfo = new UserInfo({
  nameSelector: profileTitle,
  occupationSelector: profileCaption,
});

/** previewing image */
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

/** adding default cards */
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardList.addItem(createCard(cardData));
    },
  },
  cardsContainer
);
cardList.renderItems();

/** editting profile*/
const popupEditForm = new PopupWithForm(popupEdit, handleEditFormSubmit);
popupEditForm.setEventListeners();

/** adding new card with form */
const popupAddForm = new PopupWithForm(popupAdd, handleAddFormSubmit);
popupAddForm.setEventListeners();

/** validating edit form*/
const validationEditForm = new FormValidator(config, popupEdit);
validationEditForm.enableFormValidation();

/** validating add form */
const validationAddForm = new FormValidator(config, popupAdd);
validationAddForm.enableFormValidation();

/** LISTENERES */

/** openning Edit Form*/
buttonOpenEditProfileForm.addEventListener("click", () => {
  popupEditForm.openPopup();
  setUserInfo();
});

/** openning Add Form*/
buttonOpenAddCardForm.addEventListener("click", () => {
  popupAddForm.openPopup();
});
