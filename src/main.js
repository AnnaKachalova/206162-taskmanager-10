import { createSiteMenuTemplate } from './components/menu.js';
import { createTaskListTemplate } from './components/task-list.js';
import { createFilterTemplate } from './components/filters.js';
import { createLoadMoreButtonTemplate } from './components/load-mobe-button.js';
import { createTaskCardTemplate } from './components/card.js';
import { createTaskCreationAndEditingTemplate } from './components/edit-card.js';

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
const siteMainElement = document.querySelector(`.main`);
const siteMainSectionElement = siteMainElement.querySelector(`.main__control`);

render(siteMainSectionElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createTaskListTemplate());

const tastListElement = siteMainElement.querySelector(`.board__tasks`);
render(tastListElement, createTaskCreationAndEditingTemplate());

new Array(TASK_COUNT).fill(``).forEach(() => {
  render(tastListElement, createTaskCardTemplate());
});

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createLoadMoreButtonTemplate());
