// components
import SiteMenuComponent from './components/menu.js';
import TaskListComponent from './components/task-list.js';
import FilterComponent from './components/filters.js';
import MoteButtonComponent from './components/load-mobe-button.js';
import TaskComponent from './components/task.js';
import TaskEditComponent from './components/edit-task.js';

// mock
import {generateCards} from './mock/task.js';
import {generateFilters} from './mock/filter.js';

import {render, RenderPosition} from './utils.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = task => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    taskListElement.replaceChild(
      taskEditComponent.getElement(),
      taskComponent.getElement()
    );
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    taskListElement.replaceChild(
      taskComponent.getElement(),
      taskEditComponent.getElement()
    );
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const siteMainElement = document.querySelector(`.main`);

// menu
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);

// filters
const filters = generateFilters();
render(
  siteMainElement,
  new FilterComponent(filters).getElement(),
  RenderPosition.BEFOREEND
);
// task list
const taskList = new TaskListComponent();

render(siteMainElement, taskList.getElement(), RenderPosition.BEFOREEND);
const taskListElement = taskList.getElement().querySelector(`.board__tasks`);

const tasks = generateCards(TASK_COUNT);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(0, showingTasksCount).forEach((task) => {
  renderTask(task);
});

const loadMoreButtonComponent = new MoteButtonComponent();
render(
  taskList.getElement(),
  loadMoreButtonComponent.getElement(),
  RenderPosition.BEFOREEND
);

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => renderTask(task));

  if (showingTasksCount >= tasks.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
});
