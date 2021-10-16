// 1. Work with popup

// popup form
const popupElement = document.querySelector(".popup");
// popup close
const popupCloseButtonElement = popupElement.querySelector(".popup__close-btn");
// popupOpenButton -> edit-btn
const popupOpenButtonElement = document.querySelector(".profile__edit-btn");

const closePopupByClickOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

// Функция отображения popup при клике
const openPopup = function () {
  popupElement.classList.add('popup_is-opened');
};

const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
};

// Регистрируем обработчики событий при клике
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOverlay);