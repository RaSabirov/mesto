(()=>{"use strict";var e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-btn",inactiveButtonClass:"popup__submit-btn_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error"};function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var n=function(){function e(t){var n=t.data,r=t.templateSelector,o=t.userId,i=t.handlers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=n.name,this._link=n.link,this._likes=n.likes,this._likesNum=n.likes.length,this._cardId=n._id,this._userId=o,this._ownerId=n.owner._id,this._templateSelector=r,this._handleCardClick=i.handleCardClick,this._handleDeleteOnIcon=i.handleDeleteOnIcon,this._handleLikeClick=i.handleLikeClick}var n,r;return n=e,(r=[{key:"_getTemplate",value:function(){return this._templateSelector=document.querySelector(".places__template").content.cloneNode(!0),this._templateSelector.querySelector(".places__card-item")}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._element.querySelector(".places__text").textContent=this._name,this._element.querySelector(".places__photo").alt=this._name,this._element.querySelector(".places__photo").src=this._link,this._buttonDelete=this._element.querySelector(".places__del-btn"),this._buttonLike=this._element.querySelector(".places__like-btn"),this._likeCounter=this._element.querySelector(".places__like-counter"),this._cardImage=this._element.querySelector(".places__photo"),this._deleteCardUser(),this._checkLikes(),this._likeCounter.textContent=this._likes.length,this._setEventListeners(this._element),this._element}},{key:"_deleteCardUser",value:function(){this._userId!==this._ownerId?this._buttonDelete.classList.add("places__del-btn_hide"):this._buttonDelete.classList.remove("places__del-btn_hide")}},{key:"deleteCard",value:function(){this._element.remove()}},{key:"updateLikes",value:function(e){this._likeHandler(),this._likeCounter.textContent=e}},{key:"_checkLikes",value:function(){var e=this;this._likes.forEach((function(t){t._id===e._userId&&e._buttonLike.classList.add("places__like-btn_active")}))}},{key:"_likeHandler",value:function(){this._buttonLike.classList.toggle("places__like-btn_active")}},{key:"liked",value:function(){return!!this._buttonLike.classList.contains("places__like-btn_active")}},{key:"_setEventListeners",value:function(){var e=this;this._buttonDelete.addEventListener("click",(function(){return e._handleDeleteOnIcon()})),this._buttonLike.addEventListener("click",(function(){return e._handleLikeClick()})),this._cardImage.addEventListener("click",(function(){e._handleCardClick(e._name,e._link)}))}},{key:"getCardId",value:function(){return this._cardId}}])&&t(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._formElement=n,this._inputList=Array.from(n.querySelectorAll(this._inputSelector)),this._submitButton=n.querySelector(this._submitButtonSelector)}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setValidationListeners(this._formElement)}},{key:"_showInputError",value:function(e,t,n){var r=e.querySelector("#".concat(t.id,"-error"));t.classList.add(this._inputErrorClass),r.textContent=n,r.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e,t){var n=e.querySelector("#".concat(t.id,"-error"));t.classList.remove(this._inputErrorClass),n.classList.remove(this._errorClass),n.textContent=""}},{key:"_checkInputValidity",value:function(e,t){t.validity.valid?this._hideInputError(e,t):this._showInputError(e,t,t.validationMessage)}},{key:"_setValidationListeners",value:function(e){var t=this;this._toggleButtonState(this._inputList,this._submitButton),this._inputList.forEach((function(n){n.addEventListener("input",(function(){t._checkInputValidity(e,n),t._toggleButtonState(t._inputList,t._submitButton)}))}))}},{key:"_toggleButtonState",value:function(e,t){this._hasInvalidInput(e)?(t.classList.add(this._inactiveButtonClass),t.disabled=!0):(t.classList.remove(this._inactiveButtonClass),t.disabled=!1)}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"resetInputErrors",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(e._formElement,t)})),this._toggleButtonState(this._inputList,this._submitButton)}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"rendererItems",value:function(){var e=this;this._renderedItems.forEach((function(t){e._renderer(t)}))}}])&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),c(this,"_handleEscClose",(function(e){"Escape"===e.key&&n.close()})),c(this,"_handleOverlayClose",(function(e){e.target===e.currentTarget&&n.close()})),this._popup=document.querySelector(t)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_is-opened"),document.addEventListener("keydown",this._handleEscClose),this._popup.addEventListener("click",this._handleOverlayClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_is-opened"),document.removeEventListener("keydown",this._handleEscClose),this._popup.removeEventListener("click",this._handleOverlayClose)}},{key:"setEventListeners",value:function(){var e=this;this._popup.querySelector(".popup__close-btn").addEventListener("click",(function(){e.close()}))}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(){return p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=h(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},p.apply(this,arguments)}function h(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=y(e)););return e}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}function _(e,t){if(t&&("object"===l(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}var v=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&d(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=y(r);if(o){var n=y(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return _(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupImage=t._popup.querySelector(".popup__modal-img"),t._popupCaption=t._popup.querySelector(".popup__caption"),t}return t=a,(n=[{key:"open",value:function(e,t){p(y(a.prototype),"open",this).call(this),this._popupCaption.textContent=e,this._popupImage.src=t,this._popupImage.alt=e}}])&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function k(){return k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=g(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},k.apply(this,arguments)}function g(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}function w(e,t){return w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},w(e,t)}function C(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function E(e){return E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},E(e)}var L=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&w(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(r);if(o){var n=E(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return C(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._handleSubmitForm=t,n._inputList=Array.from(n._popup.querySelectorAll(".popup__input")),n._form=n._popup.querySelector(".popup__form"),n._submitBtn=n._popup.querySelector(".popup__submit-btn"),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"showLoading",value:function(e){this._submitBtn.textContent=e?"Сохранение...":"Сохранить"}},{key:"setEventListeners",value:function(){var e=this;k(E(a.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(t){t.preventDefault(),e._handleSubmitForm(e._getInputValues()),e.close()}))}},{key:"close",value:function(){this._form.reset(),k(E(a.prototype),"close",this).call(this)}}])&&m(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function O(e){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},O(e)}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=I(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},j.apply(this,arguments)}function I(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=R(e)););return e}function P(e,t){return P=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},P(e,t)}function q(e,t){if(t&&("object"===O(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function R(e){return R=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},R(e)}var T=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&P(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=R(r);if(o){var n=R(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return q(this,e)});function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),i.call(this,e)}return t=a,(n=[{key:"submit",value:function(e){this._submitAction=e}},{key:"setEventListeners",value:function(){var e=this;j(R(a.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(t){t.preventDefault(),e._submitAction()}))}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var D=function(){function e(t){var n=t.name,r=t.job,o=t.avatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._job=document.querySelector(r),this._avatar=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,job:this._job.textContent,avatar:this._avatar.src}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.job,r=e.avatar;this._name.textContent=t,this._job.textContent=n,this._avatar.src=r}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function x(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var H=function(){function e(t){var n,r,o=t.url,i=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){return e.ok?e.json():Promise.reject("Возникла ошибка: ".concat(e.status))},(n="_errorHandler")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._url=o,this._headers=i}var t,n;return t=e,(n=[{key:"getInitialCards",value:function(){return fetch("".concat(this._url,"/cards"),{method:"GET",headers:this._headers}).then(this._errorHandler)}},{key:"getUserData",value:function(){return fetch("".concat(this._url,"/users/me"),{method:"GET",headers:this._headers}).then(this._errorHandler)}},{key:"addCard",value:function(e,t){return fetch("".concat(this._url,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then(this._errorHandler)}},{key:"changeAvatar",value:function(e){return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._errorHandler)}},{key:"editProfile",value:function(e,t){return fetch("".concat(this._url,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then(this._errorHandler)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._url,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._errorHandler)}},{key:"putLikeCard",value:function(e){return fetch("".concat(this._url,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then(this._errorHandler)}},{key:"disLikeCard",value:function(e){return fetch("".concat(this._url,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then(this._errorHandler)}}])&&x(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),V=document.forms["form-edit-profile"],U=document.forms["form-add-places"],A=document.forms["form-new-photo"],N=V.querySelector(".popup__input_type_name"),J=V.querySelector(".popup__input_type_job"),F=document.querySelector(".profile__edit-btn"),G=document.querySelector(".profile__add-btn"),z=document.querySelector(".profile__change-avatar"),M=new o(e,V);M.enableValidation();var K=new o(e,U);K.enableValidation();var Q=new o(e,A);Q.enableValidation();var W,X,Y=new D({name:".profile__name",job:".profile__job",avatar:".profile__image"}),Z=new H({url:"https://mesto.nomoreparties.co/v1/cohort-33",headers:{authorization:"010caeb4-70a3-4d0b-af59-4d5b702fcb93","content-type":"application/json"}});function $(e,t){var r=new n({data:e,templateSelector:".places__template",userId:t,handlers:{handleCardClick:function(){ne.open(e.name,e.link)},handleDeleteOnIcon:function(){var e=r.getCardId();ee.open(),ee.submit((function(){Z.deleteCard(e).then((function(){r.deleteCard(),ee.close()})).catch((function(e){return alert("Ошибка удаления карточки:",e)}))}))},handleLikeClick:function(){var e=r.getCardId();r.liked()?Z.disLikeCard(e).then((function(e){r.updateLikes(e.likes.length)})).catch((function(e){console.log("Ошибка лайка карточки:",e)})):Z.putLikeCard(e).then((function(e){r.updateLikes(e.likes.length)})).catch((function(e){console.log("Ошибка лайка карточки:",e)}))}}});return r.generateCard()}Promise.all([Z.getUserData(),Z.getInitialCards()]).then((function(e){X=e[0]._id,Z.getUserData().then((function(e){Y.setUserInfo({name:e.name,job:e.about,avatar:e.avatar})})).catch((function(e){return alert("Возникла ошибка:",e)})),Z.getInitialCards().then((function(e){(W=new a({items:e,renderer:function(e){var t=$(e,X);W.addItem(t)}},".places__card")).rendererItems()})).catch((function(e){return alert("Возникла ошибка:",e)}))}));var ee=new T(".popup_type_del-request");ee.setEventListeners();var te=new L(".popup_type_profile-edit",(function(e){te.showLoading(!0),Z.editProfile(e.name,e.job).then((function(e){Y.setUserInfo({name:e.name,job:e.about,avatar:e.avatar})})).catch((function(e){return alert("Возникла ошибка:",e)})).finally((function(){return te.showLoading(!1)}))}));te.setEventListeners();var ne=new v(".popup_type_image");ne.setEventListeners();var re=new L(".popup_type_avatar",(function(e){re.showLoading(!0),Z.changeAvatar(e.link).then((function(e){Y.setUserInfo(e)})).catch((function(e){return alert("Возникла ошибка:",e)})).finally((function(){return re.showLoading(!1)}))}));re.setEventListeners();var oe=new L(".popup_type_places-add",(function(e){oe.showLoading(!0),Z.addCard(e.name,e.link).then((function(e){var t=$(e);W.addItem(t)})).catch((function(e){return alert("Возникла ошибка:",e)})).finally((function(){return oe.showLoading(!1)}))}));oe.setEventListeners(),z.addEventListener("click",(function(){re.open(),Q.resetInputErrors()})),G.addEventListener("click",(function(){oe.open(),K.resetInputErrors()})),F.addEventListener("click",(function(){var e=Y.getUserInfo();N.value=e.name,J.value=e.job,te.open(),M.resetInputErrors()}))})();