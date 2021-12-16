import { Card } from './Card.js';
import { initialCards } from './utils/initialCards.js';
// import { openPopup, closePopup, popupImageForm } from './utils.js';
import { FormValidator } from './FormValidator.js';
import { configValidation } from './utils/config.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const popupOpenButtonEdit = document.querySelector('.profile__edit-btn');
// const popupCloseButtonEdit = popupEdit.querySelector('.popup__close-btn');

//     Переменные для работы с попапами
const popupImageForm = document.querySelector('.popup_type_image');
const popupCaptionImage = popupImageForm.querySelector('.popup__caption');
const popupImage = popupImageForm.querySelector('.popup__modal-img');

const formEdit = document.forms['form-edit-profile'];
const formAddCard = document.forms['form-add-places'];

// Input поля у формы Edit
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_job');

// Форма добавления карточек
const popupPlaces = document.querySelector('.popup_type_places-add');
const popupOpenButtonAdd = document.querySelector('.profile__add-btn');
const popupCloseButtonAdd = popupPlaces.querySelector('.popup__close-btn');
// Input поля у формы карточек
const titleCardInput = document.querySelector('.popup__input_type_title');
const linkCardInput = document.querySelector('.popup__input_type_link');
// Карточки
const placesCardsList = document.querySelector('.places__card');
const popupCloseImage = popupImageForm.querySelector('.popup__close-btn');

// Создание экземпляров классов для валидации
const validatorEdit = new FormValidator(configValidation, formEdit);
const validatorCard = new FormValidator(configValidation, formAddCard);
// Вызов методов активации валидации
validatorEdit.enableValidation();
validatorCard.enableValidation();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
});
console.log(userInfo);

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const formProfilePopup = new PopupWithForm('.popup_type_profile-edit', (formValue) => {
  userInfo.setUserInfo(formValue);
});
formProfilePopup.setEventListeners();

// Функция добавления новых карточек пользователем
// function handleAddForm(evt) {
//   evt.preventDefault();
//   // Взять значения из инпута для создания карточки
//   const myValueCardInputs = {
//     name: titleCardInput.value,
//     link: linkCardInput.value,
//   };
//   // отрисовать строки с содержанием
//   renderItem(myValueCardInputs);

//   closePopup(popupPlaces);
//   // очистить форму с содержанием, при следующем открытии попапа
//   titleCardInput.value = '';
//   linkCardInput.value = '';
// }
// formCardPlaces.addEventListener('submit', handleAddForm);

// Функция для сохранения значений при редактировании формы профиля Edit
// function handleSubmitForm(evt) {
//   evt.preventDefault();
//   // Записываем новые значения value в profile поля с помощью textContent
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   // Закрываем форму методом
//   editFormPopup.close();
// }
// formEdit.addEventListener('submit', handleSubmitForm);

// Открываем форму Edit профиля пользователя
popupOpenButtonEdit.addEventListener('click', () => {
  // Получаем объект со значениями
  const info = userInfo.getUserInfo();
  // Передаем значения после повторного открытия формы
  nameInput.value = info.name;
  jobInput.value = info.job;
  // Вызываем метод для очистки ошибок у инпутов при повторном открытии формы
  validatorEdit.resetInputErrors();
  // Вызвываем метод открытия формы
  formProfilePopup.open();
});

// Открываем форму добавления карточек
popupOpenButtonAdd.addEventListener('click', () => {
  // Вызвываем метод открытия формы
  addFormPopup.open();
  // Вызываем методы для очистки ошибок и инпутов при повторном открытии формы
  validatorCard.resetInputErrors();
});

// Функция создания карточки из Card
function createCard(item) {
  const card = new Card(item, '.places__template', () => {
    // колбэк функция для открытия попапа с картинкой
    popupWithImage.open(item);
  }).generateCard();

  return card;
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      // Добавляем DOM элемент в контейнер
      cardList.addItem(card);
    },
  },
  '.places__card'
);
cardList.rendererItems();

const addFormPopup = new PopupWithForm('.popup_type_places-add', (item) => {
  cardList.addItem(item);
});
addFormPopup.setEventListeners();
