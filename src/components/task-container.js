import {createElement} from '../utils.js';

const createTaskListComponent = () => {
  return `<section class="board container"></section>`;
};

export default class TaskList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTaskListComponent();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
