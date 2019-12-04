import { createSiteMenuTemplate } from './components/menu.js';
import { createTaskListTemplate } from './components/task-list.js';
import { createFilterTemplate } from './components/filters.js';
import { createLoadMoreButtonTemplate } from './components/load-mobe-button.js';
import { createTaskCardTemplate } from './components/card.js';
import { createTaskEditTemplate } from './components/edit-card.js';
import { generateFilters } from './mock/filter.js';
import { generateCards } from './mock/card.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
const siteMainElement = document.querySelector(`.main`);
const siteMainSectionElement = siteMainElement.querySelector(`.main__control`);

render(siteMainSectionElement, createSiteMenuTemplate());

const filters = generateFilters();
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createTaskListTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const tasks = generateCards(TASK_COUNT);

render(taskListElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(taskListElement, createTaskCardTemplate(task)));


const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate());


const loadMoreButton = boardElement.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, createTaskCardTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});