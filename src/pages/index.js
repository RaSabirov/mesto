// ============================================================================
// ============== Импорты
// ============================================================================
import './index.css';
import { configValidation } from '../script/utils/config.js';
import { Card } from '../script/components/Card.js';
import { FormValidator } from '../script/components/FormValidator.js';
import { Section } from '../script/components/Section.js';
import { PopupWithImage } from '../script/components/PopupWithImage.js';
import { PopupWithForm } from '../script/components/PopupWithForm.js';
import { PopupWithSubmit } from '../script/components/PopupWithSubmit';
import { UserInfo } from '../script/components/UserInfo.js';
import { Api } from '../script/components/Api';

import {
  formEdit,
  formAddCard,
  formAvatar,
  nameInput,
  jobInput,
  popupOpenButtonEdit,
  popupOpenButtonAdd,
  avatarBtn,
} from '../script/utils/constants.js';

// ============================================================================
// ============== Валидация форм
// ============================================================================
const validatorEdit = new FormValidator(configValidation, formEdit);
validatorEdit.enableValidation();
const validatorCard = new FormValidator(configValidation, formAddCard);
validatorCard.enableValidation();
const validatorAvatar = new FormValidator(configValidation, formAvatar);
validatorAvatar.enableValidation();

const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__job',
  avatar: '.profile__image',
});

let cardList;
let userId;

// ============================================================================
// ============== Начальное состояние страницы
// ============================================================================
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-33',
  headers: {
    authorization: '010caeb4-70a3-4d0b-af59-4d5b702fcb93',
    'content-type': 'application/json',
  },
});

Promise.all([api.getUserData(), api.getInitialCards()]).then((res) => {
  // Записываем в переменную id пользователя, чтобы в дальнейшем определить принадлежность к карточкам.
  userId = res[0]._id;
  // Заполняем профиль данными которые получаем из API
  api
    .getUserData()
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        avatar: data.avatar,
      });
    })
    .catch((err) => alert('Возникла ошибка:', err));

  // После получения id начинаем выгружать карточки на страницу из API
  api
    .getInitialCards()
    .then((data) => {
      // Наполнение карточками
      cardList = new Section(
        {
          items: data,
          renderer: (item) => {
            const cardElement = createCard(item, userId);
            // Добавляем элемент в контейнер DOM
            cardList.addItem(cardElement);
          },
        },
        '.places__card'
      );
      cardList.rendererItems();
    })
    .catch((err) => alert('Возникла ошибка:', err));
});

// Функция создания экземпляра карточки
function createCard(data, userId) {
  const card = new Card({
    data: data,
    templateSelector: '.places__template',
    userId,
    handlers: {
      handleCardClick: () => {
        popupWithImage.open(data.name, data.link);
      },
      handleDeleteOnIcon: () => {
        const cardId = card.getCardId();
        popupWithSubmit.open();
        popupWithSubmit.submit(() => {
          api
            .deleteCard(cardId)
            .then(() => {
              card.deleteCard();
              popupWithSubmit.close();
            })
            .catch((err) => alert('Ошибка удаления карточки:', err));
        });
      },
      handleLikeClick: () => {
        const cardId = card.getCardId();
        if (card.liked()) {
          api
            .disLikeCard(cardId)
            .then((res) => {
              card.updateLikes(res.likes.length);
            })
            .catch((err) => {
              console.log('Ошибка лайка карточки:', err);
            });
        } else {
          api
            .putLikeCard(cardId)
            .then((res) => {
              card.updateLikes(res.likes.length);
            })
            .catch((err) => {
              console.log('Ошибка лайка карточки:', err);
            });
        }
      },
    },
  });
  const cardElement = card.generateCard();
  return cardElement;
}

// ============================================================================
// ============== Работа с экземплярами классов
// ============================================================================

const popupWithSubmit = new PopupWithSubmit('.popup_type_del-request');
popupWithSubmit.setEventListeners();

// Экземпляр класса для работы с формой профиля
const formProfilePopup = new PopupWithForm('.popup_type_profile-edit', (formValue) => {
  formProfilePopup.showLoading(true);
  api
    .editProfile(formValue.name, formValue.job)
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, job: res.about, avatar: res.avatar });
    })
    .catch((err) => alert('Возникла ошибка:', err))
    .finally(() => formProfilePopup.showLoading(false));
});
formProfilePopup.setEventListeners();

// Экземпляр класса для работы с формой превью картинки
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

const avatarFormPopup = new PopupWithForm('.popup_type_avatar', (data) => {
  avatarFormPopup.showLoading(true);
  api
    .changeAvatar(data.link)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((err) => alert('Возникла ошибка:', err))
    .finally(() => avatarFormPopup.showLoading(false));
});
avatarFormPopup.setEventListeners();

// Создаем новый экземпляр класса для добавления новой карточки
const addFormPopup = new PopupWithForm('.popup_type_places-add', (item) => {
  addFormPopup.showLoading(true);
  api
    .addCard(item.name, item.link)
    .then((data) => {
      const cardElement = createCard(data);
      // Добавляем DOM элемент в контейнер
      cardList.addItem(cardElement);
    })
    .catch((err) => alert('Возникла ошибка:', err))
    .finally(() => addFormPopup.showLoading(false));
});
addFormPopup.setEventListeners();

// ============================================================================
// ============== Обработчики событий при работе с формами
// ============================================================================

// Открываем форму смены аватарки
avatarBtn.addEventListener('click', () => {
  avatarFormPopup.open();
  validatorAvatar.resetInputErrors();
});

// Открываем форму добавления карточек
popupOpenButtonAdd.addEventListener('click', () => {
  addFormPopup.open();
  validatorCard.resetInputErrors();
});

// Открываем форму редактирования профиля
popupOpenButtonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  // Передаем значения после повторного открытия формы
  nameInput.value = userData.name;
  jobInput.value = userData.job;

  formProfilePopup.open();
  validatorEdit.resetInputErrors();
});
