import { openPopup, popupImageForm, popupCaptionImage, popupImage } from './utils.js';

export class Card {
  static _template = document.querySelector('.places__template').content;

  constructor(data) {
    this._name = data.name;
    this._link = data.link;
  }

  // Метод генерирования новой карточки
  generateCard() {
    this._element = Card._template.cloneNode(true).children[0];
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

  // Метод открытия превью картинки
  _handlePreviewImage(evt) {
    popupImage.src = evt.target.closest('.places__photo').src;
    popupImage.alt = evt.target.closest('.places__photo').alt;
    popupCaptionImage.textContent = evt.target.closest('.places__photo').alt;

    openPopup(popupImageForm); // вызываем открытие попапа с превью картинки
  }

  // Слушатели событий на карточке
  _setCardListeners(card) {
    card.querySelector('.places__del-btn').addEventListener('click', this._handleDeleteCard);
    card.querySelector('.places__like-btn').addEventListener('click', this._handleLikeCard);
    card.querySelector('.places__photo').addEventListener('click', this._handlePreviewImage);
  }
}
