import AbstractComponent from './abstract-component.js';

const createLoadMoreButtonComponent = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

export default class MoteButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonComponent();
  }
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
