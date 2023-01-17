import { openPopup } from "./script.js";

const popupPreview = document.querySelector(".popup_func_preview");
const imagePreview = popupPreview.querySelector(".popup__image");
const captionPreview = document.querySelector(".popup__caption");

/** previewing image */
export function previewImage(link, name) {
  openPopup(popupPreview);
  imagePreview.src = link;
  imagePreview.alt = name;
  captionPreview.textContent = name;
}
