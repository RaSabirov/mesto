// Формы попапов
export const formEdit = document.forms['form-edit-profile'];
export const formAddCard = document.forms['form-add-places'];
export const formAvatar = document.forms['form-new-photo'];

// Input поля у формы Edit
export const nameInput = formEdit.querySelector('.popup__input_type_name');
export const jobInput = formEdit.querySelector('.popup__input_type_job');

// Кнопки для открытия форм
export const popupOpenButtonEdit = document.querySelector('.profile__edit-btn');
export const popupOpenButtonAdd = document.querySelector('.profile__add-btn');

// Кнопка для смены аватара
export const avatarBtn = document.querySelector('.profile__change-avatar');
