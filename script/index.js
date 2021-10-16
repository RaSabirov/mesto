// 1. Work with popup

// popup form
const popupElement = document.querySelector(".popup");
// popup close
const popupCloseButtonElement = popupElement.querySelector(".popup__close-btn");
// popupOpenButton -> edit-btn
const popupOpenButtonElement = document.querySelector(".profile__edit-btn");

// Функция отображения popup при клике на кнопку редактирования
const openPopup = function () {
  popupElement.classList.add('popup_is-opened');
};

// Функция закрытия popup при клике на кнопку закрытия
const closePopup = function (e) {
  popupElement.classList.remove('popup_is-opened');
  e.preventDefault();
};

// Функция закрытия popup при клике на область вне формы
const closePopupByClickOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

// Регистрируем обработчики событий при клике
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOverlay);