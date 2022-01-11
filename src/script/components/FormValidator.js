export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;

    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;

    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._submitButton = formElement.querySelector(config.submitButtonSelector);
  }
  // Метод запуска валидации
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setValidationListeners();
  }
  // Метод показа ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  // Метод скрытия ошибки
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }
  // Метод проверки для методов скрытия и показа ошибок
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  // Слушатель валидации элементов формы
  _setValidationListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        // чтобы проверить состояние кнопки в самом начале
        this._toggleButtonState();
      });
    });
  }
  // Метод блокировки кнопки отправить
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._config.inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
    }
  }
  // Метод обхода массива полей
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  // Метод очистки ошибок инпутов при повторном открытии формы
  resetInputErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}
