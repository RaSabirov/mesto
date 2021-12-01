//     Переменные для работы с попапами
export const popupImageForm = document.querySelector('.popup_type_image');
export const popupCaptionImage = popupImageForm.querySelector('.popup__caption');
export const popupImage = popupImageForm.querySelector('.popup__modal-img');

//     Функции для открытия и закрытия попапов

// Функция открытия popup
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupHandlerEsc);
  popup.addEventListener('click', closePopupByClickOverlay);
}
// Функция закрытия popup
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupHandlerEsc);
  popup.removeEventListener('click', closePopupByClickOverlay);
}

// Функция при клике на закрытие попапа вне окна формы
export function closePopupByClickOverlay(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  closePopup(evt.currentTarget);
}

// Функция закрытия popup при нажатии на кнопку ESC
export function closePopupHandlerEsc(evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closePopup(popupIsOpened);
  }
}
