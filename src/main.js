// components
import SiteMenuComponent from './components/menu.js';
import TaskListComponent from './components/task-container.js';
import FilterComponent from './components/filters.js';
import BoardController from './controllers/board.js';
// mock
import {generateCards} from './mock/task.js';
import {generateFilters } from './mock/filter.js';

import {render, RenderPosition} from './utils/render.js';

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);

// menu
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);

// filters
const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const taskListComponent = new TaskListComponent();
render(siteMainElement, taskListComponent, RenderPosition.BEFOREEND);

const tasks = generateCards(TASK_COUNT);

// fill task container
const boardController = new BoardController(taskListComponent);

boardController.render(tasks);
