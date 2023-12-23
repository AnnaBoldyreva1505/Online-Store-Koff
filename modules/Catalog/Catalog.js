import { addContainer } from "../Main/addContainer";

export class Catalog {
  static instance = null;

  constructor() {
    if (!Catalog.instance) {
      Catalog.instance = this;

      this.element = document.createElement('nav');
      this.element.className = 'catalog';
      this.containerElement = addContainer(this.element, 'catalog__container');
      this.isMounted = false;
    }
    return Catalog.instance;
  }

  

  mount(parentElem, data) {
    if (this.isMounted) {
      return;
    }

    this.renderListElem(data);

    parentElem.prepend(this.element);
    this.isMounted = true;
  }

  renderListElem(data) {
    const listElem = document.createElement('ul');
    listElem.className = 'catalog__list';

    const listItems = data.map(item => {
      const listItemElem = document.createElement('li');
      listItemElem.className = 'catalog__item';
      const link = document.createElement('a');
      link.className = 'catalog__link';
      link.href = `/category?slug=${item}`;
      link.textContent = item;

      listItemElem.append(link);
      return listItemElem;
    });

    listElem.append(...listItems);
    this.containerElement.append(listElem);
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}