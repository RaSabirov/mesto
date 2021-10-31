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
  // Создать разметку
  const cloneTemplate = placesTemplate.content.cloneNode(true);
  // Заменить содержимое в разметке
  cloneTemplate.querySelector('.places__text').innerText = card.name;
  cloneTemplate.querySelector('.places__photo').src = card.link;
  cloneTemplate.querySelector('.places__photo').alt = card.name;
  // Вставить разметку в DOM
  placesCardsList.prepend(cloneTemplate);
}
// вызываем функцию отображение массива с карточками
renderCards();

// Функция добавления новых карточек пользователем
function formAddHandler(e) {
  e.preventDefault();
  // Взять значения из инпута
  const myValueCardInputs = {
  name: titleCardInput.value,
  link: linkCardInput.value
  };
  // отрисовать строки с содержанием
  renderItem(myValueCardInputs);
  closePopupTypeAdd();
}
document.addEventListener('submit', formAddHandler); // Передаем событие "Сохранить значение"

const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__form'); // Поиск элемента формы
// Форма редактирования профиля
const popupEdit = document.querySelector('.popup_profile-edit'); // Форма Edit редактирования профиля
const popupOpenButtonEdit = document.querySelector('.profile__edit-btn'); // кнопка открытия формы для редактирования профиля
const popupCloseButtonEdit = popup.querySelector('.popup__close-btn'); // кнопка открытия формы для close
// Input поля у формы Edit
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
// Текстовые поля из profile, куда будут записаны значения из value
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// Форма добавления карточек
const popupPlaces = document.querySelector('.popup_places-add'); // Форма Add у карточек
const popupOpenButtonAdd = document.querySelector('.profile__add-btn'); // popup кнопка открытия формы для добавления карточек
const popupCloseButtonAdd = popupPlaces.querySelector('.popup__close-btn'); // popup кнопка закрытия формы для добавления карточек
// Input поля у формы Add
const titleCardInput = document.querySelector('.popup__input_type_title'); // Поле input title у формы add
const linkCardInput = document.querySelector('.popup__input_type_link'); // Поле input с ссылкой у формы add


// 2. Popup редактирование профиля || Открытие и закрытие формы
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

// Popup || Функция для сохранения значений при редактировании формы
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


// 3. Функция карточек

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


// 4. Like Button || Добавить лайк и убрать лайк
const likeButtons = document.querySelectorAll('.places__like-btn'); // Выбираем все кнопки like на странице
// Функция, добавить лайк или убрать. Использован метод forEach для перебора всех кнопок.
likeButtons.forEach(likes => {
  likes.addEventListener('click', (e) => {
    likes.classList.toggle('places__like-btn_active');
  }) 
});