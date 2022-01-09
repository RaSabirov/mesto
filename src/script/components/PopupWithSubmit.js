import { Popup } from './Popup';

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  submit(submitAction) {
    this._submitAction = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitAction();
    });
  }
}
