export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // для создании и отрисовки данных на странице
    this._container = document.querySelector(containerSelector);
  }
  //принимает DOM-элемент и добавляет его в контейнер.
  addItem(item) {
    // const card = this._renderer(item);
    this._container.prepend(item);
  }

  //метод который отвечает за отрисовку всех элементов.
  rendererItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
