import { Card } from './Card.js';
import { initialCards } from './initialCards.js';
import { openPopup, closePopup, popupImageForm } from './utils.js';
import { FormValidator } from './FormValidator.js';
import { configValidation } from './config.js';

const popupEdit = document.querySelector('.popup_type_profile-edit');
const formEdit = popupEdit.querySelector('.popup__form'); // Поиск элемента формы
const popupOpenButtonEdit = document.querySelector('.profile__edit-btn');
const popupCloseButtonEdit = popupEdit.querySelector('.popup__close-btn');
// Input поля у формы Edit
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_job');
// Текстовые поля из profile, куда будут записаны значения из value
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// Форма добавления карточек
const popupPlaces = document.querySelector('.popup_type_places-add');
const formCardPlaces = popupPlaces.querySelector('.popup__form'); // Поиск элемента формы places
const popupOpenButtonAdd = document.querySelector('.profile__add-btn');
const popupCloseButtonAdd = popupPlaces.querySelector('.popup__close-btn');
// Input поля у формы карточек
const titleCardInput = document.querySelector('.popup__input_type_title');
const linkCardInput = document.querySelector('.popup__input_type_link');
// Карточки
const placesCardsList = document.querySelector('.places__card');
const popupCloseImage = popupImageForm.querySelector('.popup__close-btn');
// Кнопка submit у попапа places
const submitBtnPopupPlaces = popupPlaces.querySelector('.popup__submit-btn');

// Создание экземпляров классов для форм
const validatorEdit = new FormValidator(configValidation, formEdit);
const validatorCard = new FormValidator(configValidation, formCardPlaces);
// Вызов методов активации валидации
validatorEdit.enableValidation();
validatorCard.enableValidation();

function renderItem(data) {
  // Создаем экземпляр класса Card
  const card = new Card(data);
  // Подготавливаем карточку к публикаии и возвращаем ее наружу
  const cardElement = card.generateCard();
  // Публикуем картоку в DOM
  placesCardsList.prepend(cardElement);
}

function renderElements() {
  // Публикуем карточки обойдя массив
  initialCards.forEach((card) => {
    renderItem(card);
  });
}
renderElements();

// Функция добавления новых карточек пользователем
function formAddHandler(evt) {
  evt.preventDefault();
  // Взять значения из инпута для создания карточки
  const myValueCardInputs = {
    name: titleCardInput.value,
    link: linkCardInput.value,
  };
  // отрисовать строки с содержанием
  renderItem(myValueCardInputs);

  closePopup(popupPlaces);
  // очистить форму с содержанием, при следующем открытии попапа
  titleCardInput.value = '';
  linkCardInput.value = '';
  // Деактивация кнопки "Сохранить" при повторно открытии popup (при пустых значений)
  submitBtnPopupPlaces.disabled = true;
  submitBtnPopupPlaces.classList.add('popup__submit-btn_disabled');
}
formCardPlaces.addEventListener('submit', formAddHandler);

// Функция для сохранения значений при редактировании формы профиля Edit
function formSubmitHandler(evt) {
  evt.preventDefault();
  // Записываем новые значения value в profile поля с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
formEdit.addEventListener('submit', formSubmitHandler);

//      Обработчики на клик для работы с попапами

// Обработчик при клике на попап Edit "Редактировать профиль", действие ОТКРЫТЬ
popupOpenButtonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent; // Передаем значения после повторного открытия формы
  jobInput.value = profileJob.textContent; // Передаем значения после повторного открытия формы
  openPopup(popupEdit);
  // Вызываем метод для очистки ошибок у инпутов при повторном открытии формы
  validatorEdit.resetInputErrors();
});

// Обработчик при клике на попап Edit "Редактировать профиль", действие ЗАКРЫТЬ
popupCloseButtonEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

// Обработчик при клике на попап add "Добавить картинки", действие ОТКРЫТЬ
popupOpenButtonAdd.addEventListener('click', () => {
  openPopup(popupPlaces);
  // Вызываем методы для очистки ошибок и инпутов при повторном открытии формы
  validatorCard.resetInputErrors();
  validatorCard.resetInput();
});

// Обработчик при клике на попап add "Добавить картинки", действие ЗАКРЫТЬ
popupCloseButtonAdd.addEventListener('click', () => {
  closePopup(popupPlaces);
});

// Обработчик при клике на попап Image "Закрыть изображение на полный экран"
popupCloseImage.addEventListener('click', () => {
  closePopup(popupImageForm);
});
