// Добавление карточек при загрузке страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// Форма редактирования профиля
const popupEdit = document.querySelector('.popup_type_profile-edit'); // Форма Edit редактирования профиля
const formEdit = popupEdit.querySelector('.popup__form'); // Поиск элемента формы
const popupOpenButtonEdit = document.querySelector('.profile__edit-btn'); // кнопка открытия формы для редактирования профиля
const popupCloseButtonEdit = popupEdit.querySelector('.popup__close-btn'); // кнопка открытия формы для close
// Input поля у формы Edit
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_job');
// Текстовые поля из profile, куда будут записаны значения из value
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// Форма добавления карточек
const popupPlaces = document.querySelector('.popup_type_places-add'); // Форма Add у карточек
const formCardPlaces = popupPlaces.querySelector('.popup__form'); // Поиск элемента формы
const popupOpenButtonAdd = document.querySelector('.profile__add-btn'); // popup кнопка открытия формы для добавления карточек
const popupCloseButtonAdd = popupPlaces.querySelector('.popup__close-btn'); // popup кнопка закрытия формы для добавления карточек
// Input поля у формы карточек
const titleCardInput = document.querySelector('.popup__input_type_title'); // Поле input title у формы add
const linkCardInput = document.querySelector('.popup__input_type_link'); // Поле input с ссылкой у формы add
// Карточки
const placesCardsList = document.querySelector('.places__card'); // ul список все карточек
const placesTemplate = document.querySelector('.places__template').content;
// Форма Image
const popupImage = document.querySelector('.popup_type_image'); // Модификатор для popup формы image
const popupCloseImage = popupImage.querySelector('.popup__close-btn'); // popup кнопка закрытия формы Image


function renderCards() {
  initialCards.forEach((card) => {
    renderItem(card);
  });
}
// вызываем функцию отображение массива с карточками
renderCards();

// Фукнция создания новой карточки
function createCard(card) {
  // клонируем элемент карточки с тегом li
  const cloneTemplate = placesTemplate.querySelector('.places__card-item').cloneNode(true);
  // Заменить содержимое в разметке
  cloneTemplate.querySelector('.places__text').innerText = card.name; // Меняем имя на имя из нашего массива
  cloneTemplate.querySelector('.places__photo').src = card.link; // Меняем ссылку на ссылку из нашего массива
  cloneTemplate.querySelector('.places__photo').alt = card.name; // Меняем alt на имя из нашего массива

  // Вызываем функцию подключения событий на кнопки в карточке
  setListeners(cloneTemplate);
  // Возвращаем готовую карточку
  return cloneTemplate;
}

function renderItem(card) {
  const cloneTemplate = createCard(card);
  // Вставить разметку в DOM
  placesCardsList.prepend(cloneTemplate);
}

// Фукнция обработки событий для элементов внутри карточки
function setListeners(card) {
  card.querySelector('.places__del-btn').addEventListener('click', buttonDelete);
  card.querySelector('.places__like-btn').addEventListener('click', likeActive);
  const elementImg = card.querySelector('.places__photo');
  elementImg.addEventListener('click', () => {
    popupOpenimage(card);
  });
}

// Функция удаления карточки
function buttonDelete(e) {
  e.target.closest('.places__card-item').remove();
}

// Функция лайка карточки
function likeActive(e) {
  e.target.classList.toggle('places__like-btn_active');
}

// Submit Button in popup
const submitBtnPopupPlaces = popupPlaces.querySelector('.popup__submit-btn');
// Функция добавления новых карточек пользователем
function formAddHandler(e) {
  e.preventDefault();
  // Взять значения из инпута для создания карточки
  const myValueCardInputs = {
    name: titleCardInput.value,
    link: linkCardInput.value,
  };
  // отрисовать строки с содержанием
  renderItem(myValueCardInputs);
  // закрыть popup
  closePopup(popupPlaces);
  // очистить форму с содержанием, при следующем открытии попапа
  titleCardInput.value = '';
  linkCardInput.value = '';
    // Деактивация кнопки "Сохранить" при повторно открытии popup (при пустых значений)
    submitBtnPopupPlaces.disabled = true;
    submitBtnPopupPlaces.classList.add('popup__submit-btn_disabled');
}
formCardPlaces.addEventListener('submit', formAddHandler); // Передаем событие "Создать" у формы добавления карточек

// Функция для сохранения значений при редактировании формы профиля Edit
function formSubmitHandler(e) {
  e.preventDefault();
  // Записываем новые значения value в profile поля с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
formEdit.addEventListener('submit', formSubmitHandler); // Передаем событие "Сохранить значение" у формы редактирования профиля

// Функция открытия popup
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupHandlerEsc);
  popup.addEventListener('click', closePopupByClickOverlay)
}
// Функция закрытия popup
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupHandlerEsc);
  popup.removeEventListener('click', closePopupByClickOverlay)
}

// Функция при клике на закрытие попапа вне окна формы
function closePopupByClickOverlay(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  closePopup(evt.currentTarget);
};

// Функция закрытия popup при нажатии на кнопку ESC
function closePopupHandlerEsc(e) {
  if (e.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closePopup(popupIsOpened);
  }
}

// Обработчик при клике на попап Edit "Редактировать профиль", действие ОТКРЫТЬ
popupOpenButtonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent; // Передаем значения после повторного открытия формы
  jobInput.value = profileJob.textContent; // Передаем значения после повторного открытия формы
  openPopup(popupEdit);
});

// Обработчик при клике на попап Edit "Редактировать профиль", действие ЗАКРЫТЬ
popupCloseButtonEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

// Обработчик при клике на попап add "Добавить картинки", действие ОТКРЫТЬ
popupOpenButtonAdd.addEventListener('click', () => {
  openPopup(popupPlaces);
});

// Обработчик при клике на попап add "Добавить картинки", действие ЗАКРЫТЬ
popupCloseButtonAdd.addEventListener('click', () => {
  closePopup(popupPlaces);
});

// Обработчик при клике на попап Image "Закрыть изображение на полный экран"
popupCloseImage.addEventListener('click', () => {
  closePopup(popupImage);
});

// Функция открытия попапа Image
function popupOpenimage(card) {
  const placesText = card.querySelector('.places__text'); // Выбираем текстовое значение в карточке (template шаблона)
  const placesPhoto = card.querySelector('.places__photo'); // Выбираем изображение карточки
  const popupCaptionInImage = popupImage.querySelector('.popup__caption'); // Выбираем текстовое значение в popup форме
  const popupModalImage = popupImage.querySelector('.popup__modal-img'); // Выбираем image в popup форме
  // Присваиваем значения
  popupCaptionInImage.textContent = placesText.textContent;
  popupModalImage.src = placesPhoto.src;
  popupModalImage.alt = placesPhoto.alt;
  openPopup(popupImage);
}


