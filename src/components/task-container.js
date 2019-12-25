import AbstractComponent from './abstract-component.js';

const createTaskListComponent = () => {
  return `<section class="board container"></section>`;
};

export default class TaskList extends AbstractComponent {
  getTemplate() {
    return createTaskListComponent();
  }
}
