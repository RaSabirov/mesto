// Добавление карточек при загрузке страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const placesCardsList = document.querySelector('.places__card'); // ul список все карточек
const placesTemplate = document.querySelector('.places__template'); // template шаблон карточек places

function renderCards() {
  initialCards.forEach((card) => {
    renderItem(card);
  })
}

function renderItem(card) {
  // 1. Создать разметку
  const cloneTemplate = placesTemplate.content.cloneNode;
  // 2. Заменить текст в разметке
  cloneTemplate.querySelector('.places__text').innerText = card.name;
  // 3. Вставить разметку в DOM
  placesCardsList.appendChild(cloneTemplate);
}
renderCards();


// 1. Объявить переменные
const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__form'); // Поиск элемента формы
// Форма редактирования профиля
const popupEdit = document.querySelector('.popup_profile-edit'); // Форма Edit редактирования профиля
const nameInput = formElement.querySelector('.popup__input_type_name'); // Поля input у формы edit
const jobInput = formElement.querySelector('.popup__input_type_job'); // Поля input у формы edit
const popupOpenButtonEdit = document.querySelector('.profile__edit-btn'); // кнопка открытия формы для редактирования профиля
const popupCloseButtonEdit = popup.querySelector('.popup__close-btn'); // кнопка открытия формы для close
const profileName = document.querySelector('.profile__name'); // Текстовое поля из profile, куда будут записаны значения из value
const profileJob = document.querySelector('.profile__job'); // Текстовое поля из profile, куда будут записаны значения из value
// Форма добавления картинок
const popupOpenButtonAdd = document.querySelector('.profile__add-btn'); // popup кнопка открытия формы для добавления карточек
const popupCloseButtonAdd = document.querySelector('.popup__close-btn'); // popup кнопка закрытия формы для добавления карточек
const popupPlaces = document.querySelector('.popup_places-add'); // Форма Add у карточек
const titleCardInput = formElement.querySelector('.popup__input_type_title'); // Поле input title у формы add
const linkCardInput = formElement.querySelector('.popup__input_type_link'); // Поле input с ссылкой у формы add


// 1.1 Popup редактирование профиля || Открытие и закрытие формы
// Функция отображения popup при клике на кнопку редактирования
const openPopup = function () {
  nameInput.value = profileName.textContent; // Передаем значения после повторного открытия формы
  jobInput.value = profileJob.textContent; // Передаем значения после повторного открытия формы
  popupEdit.classList.add('popup_is-opened');
};

// Функция закрытия popup при клике на кнопку закрытия
const closePopup = function () {
  popupEdit.classList.remove('popup_is-opened');
};

// 1.2 Popup || Функция для сохранения значений при редактировании формы
function formSubmitHandler(e) { 
  e.preventDefault();
  // Записываем новые значения value в profile поля с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

// Регистрируем обработчики событий для формы edit
popupOpenButtonEdit.addEventListener('click', openPopup); // Передаем событие "Открыть Popup для кнопки Edit"
popupCloseButtonEdit.addEventListener('click', closePopup); // Передаем событие "Закрыть Popup для кнопки Edit"
formElement.addEventListener('submit', formSubmitHandler); // Передаем событие "Сохранить значение"


// Функция карточек

// Открыть popup для добавления картинок
const openPopupTypeAdd = function () {
  popupPlaces.classList.add('popup_is-opened');
};

// Закрыть popup для добавления картинок
const closePopupTypeAdd = function () {
  popupPlaces.classList.remove('popup_is-opened');
};

// Регистрируем обработчики событий для формы add
popupOpenButtonAdd.addEventListener('click', openPopupTypeAdd); // Передаем событие "Открыть Popup для кнопки Add"
popupCloseButtonAdd.addEventListener('click', closePopupTypeAdd); // Передаем событие "Закрыть Popup для кнопки Add"


// // 2. Like Button || Добавить лайк и убрать лайк
// const likeButtons = document.querySelectorAll('.places__like-btn'); // Выбираем все кнопки like на странице

// // 2.1 Like Button || Добавить лайк и убрать лайк
// const likeClickHandler = () => {
//   likeButton.classList.toggle('places__like-btn_active');
// };

// // 2.2 Like Button || Передаем событие при клике на кнопку. Использован метод forEach, для того, чтобы пробежаться по всем кнопкам
// likeButtons.forEach(likeButton => {
//   likeButton.addEventListener('click', likeClickHandler)
// });
