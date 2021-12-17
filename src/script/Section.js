export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer; // для создании и отрисовки данных на странице

    this._container = document.querySelector(containerSelector);
  }
  //принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }

  //метод который отвечает за отрисовку всех элементов.
  rendererItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
