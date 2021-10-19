// 1. Popup || Поиск элементов popup формы

// popup form
let popupElement = document.querySelector(".popup");
// popup close
const popupCloseButtonElement = popupElement.querySelector(".popup__close-btn");
// popupOpenButton -> edit-btn
const popupOpenButtonElement = document.querySelector(".profile__edit-btn");
// Поиск элемента формы
let formElement = popupElement.querySelector(".popup__form");
// Поля input у формы
let nameInput = popupElement.querySelector(".popup__input_type_name");
let jobInput = popupElement.querySelector(".popup__input_type_job");
// Текстовое поля из profile, куда будут записаны значения из value
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

// 1.1 Popup || Открытие и закрытие формы

// Функция отображения popup при клике на кнопку редактирования
const openPopup = function () {
  popupElement.classList.add("popup_is-opened");
  nameInput.value = profileName.textContent; //Сохранение значения после повторного открытия формы
  jobInput.value = profileJob.textContent; //Сохранение значения после повторного открытия формы
};

// Функция закрытия popup при клике на кнопку закрытия
const closePopup = function () {
  popupElement.classList.remove("popup_is-opened");
};

// Функция закрытия popup при клике на область вне формы
const closePopupByClickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

// 1.2 Popup || Функция для сохранения значений при редактировании формы
function formSubmitHandler(e) {
  e.preventDefault();
  // Задаем переменные для получения значений полей jobInput и nameInput из свойства value
  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;

  // Вставляем новые значения value в profile поля с помощью textContent
  profileName.textContent = nameInputValue;
  profileJob.textContent = jobInputValue;
  closePopup();
}

// 1.3 Popup || Регистрируем обработчики событий для формы popup
popupOpenButtonElement.addEventListener("click", openPopup); // Передам событие "Открыть Popup"
popupCloseButtonElement.addEventListener("click", closePopup); // Передам событие "Закрыть Popup"
popupElement.addEventListener("click", closePopupByClickOverlay); // Передам событие "Закрыть Popup"
formElement.addEventListener("submit", formSubmitHandler); // Передам событие "Сохранить значение"
