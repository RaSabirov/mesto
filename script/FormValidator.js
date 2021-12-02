export class FormValidator {
  constructor(configValidation, formElement) {
    this._formSelector = configValidation.formSelector;
    this._inputSelector = configValidation.inputSelector;
    this._submitButtonSelector = configValidation.submitButtonSelector;
    this._inactiveButtonClass = configValidation.inactiveButtonClass;
    this._inputErrorClass = configValidation.inputErrorClass;
    this._errorClass = configValidation.errorClass;
    this._formElement = formElement;

    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
  }
  // Метод запуска валидации
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setValidationListeners(this._formElement);
  }
  // Метод показа ошибки
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  // Метод скрытия ошибки
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  // Метод проверки для методов скрытия и показа ошибок
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }
  // Слушатель валидации элементов формы
  _setValidationListeners(formElement) {
    this._toggleButtonState(this._inputList, this._submitButton);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        // чтобы проверить состояние кнопки в самом начале
        this._toggleButtonState(this._inputList, this._submitButton);
      });
    });
  }
  // Метод блокировки кнопки отправить
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  // Метод обхода массива полей
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  // Метод очистки ошибок инпутов при повторном открытии формы
  resetInputErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(this._formElement, inputElement);
    });
    this._toggleButtonState(this._inputList, this._submitButton);
  }
}
