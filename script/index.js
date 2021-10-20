// 1. Popup || Поиск элементов popup формы

// popup form
let popupElement = document.querySelector('.popup');
// popup close
const popupCloseButtonElement = popupElement.querySelector('.popup__close-btn');
// popupOpenButton -> edit-btn
const popupOpenButtonElement = document.querySelector('.profile__edit-btn');
// Поиск элемента формы
let formElement = popupElement.querySelector('.popup__form');
// Поля input у формы
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
// Текстовое поля из profile, куда будут записаны значения из value
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

// 1.1 Popup || Открытие и закрытие формы

// Функция отображения popup при клике на кнопку редактирования
const openPopup = function () {
  nameInput.value = profileName.textContent; //Передаем значения после повторного открытия формы
  jobInput.value = profileJob.textContent; //Передаем значения после повторного открытия формы
  popupElement.classList.add('popup_is-opened');
};

// Функция закрытия popup при клике на кнопку закрытия
const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
};

// 1.2 Popup || Функция для сохранения значений при редактировании формы
function formSubmitHandler(e) {
  e.preventDefault();
  // Записываем новые значения value в profile поля с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

// 1.3 Popup || Регистрируем обработчики событий для формы popup
popupOpenButtonElement.addEventListener('click', openPopup); // Передаем событие "Открыть Popup"
popupCloseButtonElement.addEventListener('click', closePopup); // Передаем событие "Закрыть Popup"
formElement.addEventListener('submit', formSubmitHandler); // Передаем событие "Сохранить значение"
