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
  popupConfirm,
  popupAvatar,
  nameInput,
  occupationInput,
  buttonOpenEditProfileForm,
  buttonOpenAddCardForm,
  profileTitle,
  profileCaption,
  cardsContainer,
  popupWithImageSelector,
  buttonChangeAvatar,
  profileAvatar,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "1d6208e1-8c1d-4a2d-962a-6731b1539398",
    "Content-Type": "application/json",
  },
});

let userId;
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
    userId = userData._id;
    cardList.renderItems(cardData, userId);
  })
  .catch((err) => console.log(err));

/** FUNCTIONS */

/** creating card */
function createCard(cardData, userId) {
  const card = new Card(
    { data: cardData, handleCardClick, handleDeleteClick, handleLikeClick },
    ".card-template",
    userId
  );
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
  popupEditForm.handleLoading(true);
  const { name, occupation } = formValues;
  api
    .setUserData(name, occupation)
    .then(() => {
      userInfo.setUserInfo(name, occupation);
      popupEditForm.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditForm.handleLoading(false);
    });
}

/** prewieving image */
function handleCardClick(link, name) {
  popupWithImage.openPopup(link, name);
}

/** submit add new card form */
function handleAddFormSubmit(formValues) {
  popupAddForm.handleLoading(true);
  api
    .addNewCard(formValues)
    .then((data) => {
      cardList.addItem(createCard(data, data.owner._id), false);
      popupAddForm.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddForm.handleLoading(false);
    });
}

/** changing avatar form submit */
function handleChangeAvatarSubmit(formValues) {
  popupChangeAvatar.handleLoading(true);
  api
    .changeAvatar(formValues)
    .then((data) => {
      userInfo.setAvatar(data.avatar);
      popupChangeAvatar.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupChangeAvatar.handleLoading(false);
    });
}

/** delete card */
function handleDeleteCardSubmit(card, cardId) {
  api
    .deleteCard(cardId)
    .then(() => {
      card.deleteCard();
      popupDeleteCard.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {});
}

/** open Delete card popup */
function handleDeleteClick(card, cardId) {
  popupDeleteCard.openPopup(card, cardId);
}

/** toggle likes */
function handleLikeClick(cardId, isLiked, card) {
  if (!isLiked) {
    api
      .setLike(cardId)
      .then((data) => {
        card.setLikes(data.likes);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .deleteLike(cardId)
      .then((data) => {
        card.setLikes(data.likes);
      })
      .catch((err) => console.log(err));
  }
}
/** NEW INSTANCES */

/** user info */
const userInfo = new UserInfo({
  nameSelector: profileTitle,
  occupationSelector: profileCaption,
  avatarSelector: profileAvatar,
});

/** previewing image */
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

/** adding default cards */
const cardList = new Section(
  {
    renderer: (cardData, id) => {
      cardList.addItem(createCard(cardData, id));
    },
  },
  cardsContainer
);

/** editting profile*/
const popupEditForm = new PopupWithForm(popupEdit, handleEditFormSubmit);
popupEditForm.setEventListeners();

/** adding new card with form */
const popupAddForm = new PopupWithForm(popupAdd, handleAddFormSubmit);
popupAddForm.setEventListeners();

/** changing avatar */
const popupChangeAvatar = new PopupWithForm(
  popupAvatar,
  handleChangeAvatarSubmit
);
popupChangeAvatar.setEventListeners();

/** validating edit form*/
const validationEditForm = new FormValidator(config, popupEdit);
validationEditForm.enableFormValidation();

/** validating add form */
const validationAddForm = new FormValidator(config, popupAdd);
validationAddForm.enableFormValidation();

/** validating change avatar form */
const validationChangeAvatar = new FormValidator(config, popupAvatar);
validationChangeAvatar.enableFormValidation();
/** deleting card */
const popupDeleteCard = new PopupWithConfirm(
  popupConfirm,
  handleDeleteCardSubmit
);
popupDeleteCard.setEventListeners();

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

/** openning Change avatar form */
buttonChangeAvatar.addEventListener("click", () => {
  popupChangeAvatar.openPopup();
});
