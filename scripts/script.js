const popupEdit = document.querySelector(".popup_func_edit");
const popupAdd = document.querySelector(".popup_func_add");
const popupPreview = document.querySelector(".popup_func_preview");
const imagePreview = popupPreview.querySelector(".popup__image");
const captionPreview = document.querySelector(".popup__caption");

const profileForm = document.forms.aboutForm;
const nameInput = profileForm.elements.name;
const occupationInput = profileForm.elements.occupation;

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
const cardTemplate = document.querySelector(".card-template").content;
const initialCards = [
  {
    name: "Улуру",
    link: "https://images.unsplash.com/photo-1603352909705-bbc14d38536a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "Бондай",
    link: "https://images.unsplash.com/photo-1557511073-9bb8018e3ff3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
  },
  {
    name: "Исландия",
    link: "https://images.unsplash.com/photo-1498866363999-1afe374cb87f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
  },
  {
    name: "Мельбурн",
    link: "https://images.unsplash.com/photo-1596527199903-6cdaacee1208?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1767&q=80",
  },
  {
    name: "Скалы 12 апостолов",
    link: "https://images.unsplash.com/photo-1543183501-7df0144a6753?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    name: "Мехико",
    link: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
];

function changeUserInfo(nameValue, occupationValue) {
  profileTitle.textContent = nameValue;
  profileCaption.textContent = occupationValue;
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_opened");
    closePopup(popupActive);
    console.log(popupActive);
  }
}


function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscape);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape);
}

function createElement(nameValue, linkValue) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  cardImage.src = linkValue;
  cardImage.alt = nameValue;
  cardElement.querySelector(".element__title").textContent = nameValue;

  const likeButton = cardElement.querySelector(".element__like");
  likeButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    likeButton.classList.toggle("element__like_active");
  });
  const caption = cardElement.querySelector(".element__title");
  cardImage.addEventListener("click", function () {
    openPopup(popupPreview);
    imagePreview.src = cardImage.src;
    imagePreview.alt = cardImage.alt;
    captionPreview.textContent = caption.textContent;
  });

  const deleteButton = cardElement.querySelector(".element__delete");
  deleteButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    deleteButton.closest(".element").remove();
  });
  return cardElement;
}

function addCard(card, end = true) {
  if (end) {
    cards.append(card);
  } else {
    cards.prepend(card);
  }
}

profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  changeUserInfo(nameInput.value, occupationInput.value);
  closePopup(popupEdit);
});

const popups = document.querySelectorAll('.popup');

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

buttonOpenAddCardForm.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(popupAdd);
  // setSubmitButtonState(false);
});

buttonOpenEditProfileForm.addEventListener("click", function (evt) {
  evt.preventDefault();
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  occupationInput.value = profileCaption.textContent;
});

addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  addCard(
    createElement(cardTitleInput.value, cardLinkInput.value),
    (end = false)
  );
  closePopup(popupAdd);
  evt.target.reset();
});

initialCards.forEach(function (element) {
  const card = createElement(element.name, element.link);
  addCard(card);
});



