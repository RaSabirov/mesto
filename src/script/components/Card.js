export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  // Метод для нахождения темплейта и подготовки его к клонированию
  _getTemplate() {
    this._templateSelector = document.querySelector('.places__template').content.cloneNode(true);
    const cardElement = this._templateSelector;

    return cardElement;
  }
  // Метод генерирования новой карточки
  generateCard() {
    this._element = this._getTemplate();
    // Добавляем данные в разметку
    this._element.querySelector('.places__text').textContent = this._name;
    this._element.querySelector('.places__photo').alt = this._name;
    this._element.querySelector('.places__photo').src = this._link;

    // Вызываем слушатели событий на карточке
    this._setCardListeners(this._element);

    // Возвращаем элемент наружу
    return this._element;
  }

  // Метод удаления карточки
  _handleDeleteCard(evt) {
    evt.target.closest('.places__card-item').remove();
  }

  // Метод лайка/дизлайка карточки
  _handleLikeCard(evt) {
    evt.target.classList.toggle('places__like-btn_active');
  }

  // Слушатели событий на карточке
  _setCardListeners() {
    this._element.querySelector('.places__del-btn').addEventListener('click', this._handleDeleteCard);
    this._element.querySelector('.places__like-btn').addEventListener('click', this._handleLikeCard);
    this._element.querySelector('.places__photo').addEventListener('click', this._handleCardClick);
  }
}
