import MoreButtonComponent from '../components/load-more-button.js';
import TaskComponent from '../components/task.js';
import TaskEditComponent from '../components/edit-task.js';
import TasksComponent from '../components/tasks.js';
import SortComponent, {SortType} from '../components/sort.js';
import NoTasksComponent from '../components/no-tasks.js';
import {render, remove, replace, RenderPosition} from '../utils/render.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

// task
const renderTask = (taskListElement, task) => {
  const onEscKeyDown = evt => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => replace(taskComponent, taskEditComponent);
  const replaceTaskToEdit = () => replace(taskEditComponent, taskComponent);

  const taskComponent = new TaskComponent(task);

  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);

  taskEditComponent.setSubmitHandler(replaceEditToTask);

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

// tasks
const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
  });
};

// more button
const renderLoadMoreButton = (moreButton, tasks, container, taskList) => {
  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  if (showingTasksCount >= tasks.length) {
    return;
  }
  render(container, moreButton, RenderPosition.BEFOREEND);
  moreButton.setClickHandler(() => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    renderTasks(taskList, tasks.slice(prevTasksCount, showingTasksCount));
    if (showingTasksCount >= tasks.length) {
      remove(moreButton);
    }
  });
};
// sort tasks
const sortTasks = (sortComponent, tasks, moreButton, count, taskList, container) => {
  sortComponent.setSortTypeChangeHandler((sortType) => {
    let sortedTasks = [];

    switch (sortType) {
      case SortType.DATE_UP:
        sortedTasks = tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        sortedTasks = tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        sortedTasks = tasks.slice(0, count);
        break;
    }
    taskList.innerHTML = ``;
    renderTasks(taskList, sortedTasks);
    if (sortType === SortType.DEFAULT) {
      renderLoadMoreButton(moreButton, tasks, container, taskList);
    } else {
      remove(moreButton);
    }
  });
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._tasksComponent = new TasksComponent();
    this._moreButtonComponent = new MoreButtonComponent();
    this._sortComponent = new SortComponent();
  }
  render(tasks) {
    const container = this._container.getElement();

    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
    } else {
      render(container, this._sortComponent, RenderPosition.BEFOREEND);
      render(container, this._tasksComponent, RenderPosition.BEFOREEND);

      const taskListElement = container.querySelector(`.board__tasks`);
      let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
      tasks.slice(0, showingTasksCount).forEach((task) => {
        renderTask(taskListElement, task);
      });
      renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
      renderLoadMoreButton(this._moreButtonComponent, tasks, container, taskListElement);

      sortTasks(this._sortComponent, tasks, this._moreButtonComponent, showingTasksCount, taskListElement, container);
    }
  }
}
