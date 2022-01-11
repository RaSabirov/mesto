export class Card {
  constructor({ data, userId, templateSelector, handlers }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likesNum = data.likes.length;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;

    this._templateSelector = templateSelector;
    this._handleCardClick = handlers.handleCardClick;
    this._handleDeleteOnIcon = handlers.handleDeleteOnIcon;
    this._handleLikeClick = handlers.handleLikeClick;
  }

  // Метод для нахождения темплейта и подготовки его к клонированию
  _getTemplate() {
    this._template = document.querySelector(this._templateSelector).content.cloneNode(true);
    const cardElement = this._template.querySelector('.places__card-item');

    return cardElement;
  }

  // Метод генерирования новой карточки
  generateCard() {
    this._element = this._getTemplate();

    // Находим картинку и текст
    this._cardImage = this._element.querySelector('.places__photo');
    this._cardText = this._element.querySelector('.places__text');

    // Находим кнопки на карточке
    this._buttonDelete = this._element.querySelector('.places__del-btn');
    this._buttonLike = this._element.querySelector('.places__like-btn');
    this._likeCounter = this._element.querySelector('.places__like-counter');

    // Добавляем данные в разметку
    this._cardText.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    this._deleteCardUser();

    // Проверка и отображение лайков на карточке
    this._checkLikes();
    this._likeCounter.textContent = this._likes.length;

    // Вызываем слушатели событий на карточке
    this._setEventListeners(this._element);
    // Возвращаем элемент наружу
    return this._element;
  }

  // Условие для показа/скрытия кнопки удаления карточки
  _deleteCardUser() {
    if (this._userId !== this._ownerId) {
      this._buttonDelete.classList.add('places__del-btn_hide');
    } else {
      this._buttonDelete.classList.remove('places__del-btn_hide');
    }
  }

  // Метод удаления элемента карточки
  deleteCard() {
    this._element.remove();
  }

  // Метод обновления лайков на карточке и счетчика
  updateLikes(likesNum) {
    this._likeHandler();
    this._likeCounter.textContent = likesNum;
  }

  _checkLikes() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._buttonLike.classList.add('places__like-btn_active');
      }
    });
  }

  // Метод установки лайка
  _likeHandler() {
    this._buttonLike.classList.toggle('places__like-btn_active');
  }

  // Проверка лайкнута ли карточка
  liked() {
    if (this._buttonLike.classList.contains('places__like-btn_active')) {
      return true;
    }
    return false;
  }

  // Слушатели событий на карточке
  _setEventListeners() {
    // Удаление карточки
    this._buttonDelete.addEventListener('click', () => this._handleDeleteOnIcon());

    // Лайк карточки
    this._buttonLike.addEventListener('click', () => this._handleLikeClick());

    // Превью картинки
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Получаем id карточки
  getCardId() {
    return this._cardId;
  }
}
