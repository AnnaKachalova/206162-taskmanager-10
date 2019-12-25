// components
import SiteMenuComponent from './components/menu.js';
import TaskListComponent from './components/task-container.js';
import FilterComponent from './components/filters.js';
import MoteButtonComponent from './components/load-mobe-button.js';
import TaskComponent from './components/task.js';
import TaskEditComponent from './components/edit-task.js';
import SortComponent from './components/sort.js';
import TasksComponent from './components/tasks.js';
import NoTasksComponent from './components/no-tasks.js';

// mock
import { generateCards } from './mock/task.js';
import { generateFilters } from './mock/filter.js';

import { render, remove, replace, RenderPosition } from './utils/render.js';

const TASK_COUNT = 22;
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

// container
const renderTaskListContainer = (taskLiskComponent, tasks) => {
  const isAllTasksArchived = tasks.every(task => task.isArchive);

  if (isAllTasksArchived) {
    render(taskLiskComponent.getElement(), new NoTasksComponent(), RenderPosition.BEFOREEND);
  } else {
    render(taskLiskComponent.getElement(), new SortComponent(), RenderPosition.BEFOREEND);
    render(taskLiskComponent.getElement(), new TasksComponent(), RenderPosition.BEFOREEND);

    const taskListElement = taskLiskComponent.getElement().querySelector(`.board__tasks`);
    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    tasks.slice(0, showingTasksCount).forEach(task => {
      renderTask(taskListElement, task);
    });

    const loadMoreButtonComponent = new MoteButtonComponent();
    render(taskLiskComponent.getElement(), loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount).forEach(task => renderTask(taskListElement, task));

      if (showingTasksCount >= tasks.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }
};

const siteMainElement = document.querySelector(`.main`);

// menu
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);

// filters
const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const taskLiskComponent = new TaskListComponent();
render(siteMainElement, taskLiskComponent, RenderPosition.BEFOREEND);

const tasks = generateCards(TASK_COUNT);

// fill task container
renderTaskListContainer(taskLiskComponent, tasks);
