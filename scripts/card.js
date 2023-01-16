import { previewImage } from "./utils.js";

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



 export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    
  }
 //-----------------finding element in HTML and getting template----------------------------------------
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

//-----------------generating card----------------------------------------
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".element__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }

  //-----------------toggle like----------------------------------------
  _like() {
    const likeButton = this._element.querySelector(".element__like");
    likeButton.classList.toggle("element__like_active");
  }

  //-----------------deleting card----------------------------------------
  _delete() {
    const deleteButton = this._element.querySelector(".element__delete");
    deleteButton.closest(".element").remove();
  }

  //-----------------setting event listeners----------------------------------------
  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__like");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._cardImage = this._element.querySelector(".element__image");
 
       this._likeButton.addEventListener('click', () => {
           this._like();
       })
 
       this._deleteButton.addEventListener('click', () => {
         this._delete();
     })
     this._cardImage.addEventListener('click', () => {
         previewImage(this._link, this._name);

   })
  }
}
