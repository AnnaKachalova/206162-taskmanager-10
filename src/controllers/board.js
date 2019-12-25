import MoreButtonComponent from '../components/load-more-button.js';
import TaskComponent from '../components/task.js';
import TaskEditComponent from '../components/edit-task.js';
import TasksComponent from '../components/tasks.js';
import SortComponent from '../components/sort.js';
import NoTasksComponent from '../components/no-tasks.js';
import {render, remove, replace, RenderPosition} from '../utils/render.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const onEscKeyDown = (evt) => {
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

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._moreButtonComponent = new MoreButtonComponent();
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

      render(container, this._moreButtonComponent, RenderPosition.BEFOREEND);

      this._moreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

        tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => renderTask(taskListElement, task));

        if (showingTasksCount >= tasks.length) {
          remove(this._moreButtonComponent);
        }
      });
    }
  }
}
