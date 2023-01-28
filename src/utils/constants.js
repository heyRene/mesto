/** constants */
export const initialCards = [
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

export const popupEdit = document.querySelector(".popup_func_edit");
export const popupAdd = document.querySelector(".popup_func_add"); 
export const popupWithImageSelector = document.querySelector('.popup_func_preview');
export const popups = document.querySelectorAll(".popup");

export const buttonOpenEditProfileForm = document.querySelector(
  ".profile__edit-button"
);
export const buttonOpenAddCardForm = document.querySelector(
  ".profile__add-button"
);

export const profileForm = document.forms.aboutForm;
export const nameInput = profileForm.elements.name;
export const occupationInput = profileForm.elements.occupation;
export const profileTitle = document.querySelector(".profile__title");
export const profileCaption = document.querySelector(".profile__caption");

export const cardForm = document.forms.cardForm;
export const cardTitleInput = cardForm.elements.place;
export const cardLinkInput = cardForm.elements.link;

export const cardsContainer = document.querySelector(".elements");
