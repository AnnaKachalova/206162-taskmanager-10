import AbstractComponent from './abstract-component.js';

const createLoadMoreButtonComponent = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

export default class MoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonComponent();
  }
  onLoadMoreClick(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
