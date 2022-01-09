export class Card {
  constructor({ data, templateSelector, userId, handlers }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handlers.handleCardClick;
    this._handleDeleteOnIcon = handlers.handleDeleteOnIcon;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
  }
  // Метод для нахождения темплейта и подготовки его к клонированию
  _getTemplate() {
    this._templateSelector = document.querySelector('.places__template').content.cloneNode(true);
    const cardElement = this._templateSelector.querySelector('.places__card-item');

    return cardElement;
  }
  // Метод генерирования новой карточки
  generateCard() {
    this._element = this._getTemplate();
    // Добавляем данные в разметку
    this._element.querySelector('.places__text').textContent = this._name;
    this._element.querySelector('.places__photo').alt = this._name;
    this._element.querySelector('.places__photo').src = this._link;
    this._buttonDelete = this._element.querySelector('.places__del-btn');
    this._buttonLike = this._element.querySelector('.places__like-btn');
    this._cardImage = this._element.querySelector('.places__photo');

    this._deleteCardUser();

    // Вызываем слушатели событий на карточке
    this._setEventListeners(this._element);
    // Возвращаем элемент наружу
    return this._element;
  }

  // Метод для сравнения карточки, чтобы отделить свои от чужих
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

  // Метод лайка/дизлайка карточки
  _handleLikeCard(evt) {
    evt.target.classList.toggle('places__like-btn_active');
  }

  // Слушатели событий на карточке
  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => this._handleDeleteOnIcon());

    this._buttonLike.addEventListener('click', this._handleLikeCard);

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
