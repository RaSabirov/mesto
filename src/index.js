import './pages/index.css';
import { Card } from './script/Card.js';
import { initialCards } from './script/utils/initialCards.js';
import { FormValidator } from './script/FormValidator.js';
import { configValidation } from './script/utils/config.js';
import { Section } from './script/Section.js';
import { PopupWithImage } from './script/PopupWithImage.js';
import { PopupWithForm } from './script/PopupWithForm.js';
import { UserInfo } from './script/UserInfo.js';

// Формы попапов
const formEdit = document.forms['form-edit-profile'];
const formAddCard = document.forms['form-add-places'];

// Input поля у формы Edit
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_job');

// Кнопки для открытия форм
const popupOpenButtonEdit = document.querySelector('.profile__edit-btn');
const popupOpenButtonAdd = document.querySelector('.profile__add-btn');

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

// Экземпляр класса для работы с формой профиля
const formProfilePopup = new PopupWithForm('.popup_type_profile-edit', (formValue) => {
  userInfo.setUserInfo(formValue);
});
formProfilePopup.setEventListeners();

// Экземпляр класса для работы с формой превью картинки
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

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

// Дефолтное наполнение карточками
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

// Создаем новый экземпляр класса для добавления новой карточки пользователем
const addFormPopup = new PopupWithForm('.popup_type_places-add', (item) => {
  const card = createCard(item);
  // Добавляем DOM элемент в контейнер
  cardList.addItem(card);
});
addFormPopup.setEventListeners();
