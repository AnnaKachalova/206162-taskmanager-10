/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/edit-task.js":
/*!*************************************!*\
  !*** ./src/components/edit-task.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TaskEdit; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");



const createColorsTemplate = (colors, currentColor) => {
  return colors
    .map((color) => {
      return `<input
          type="radio"
          id="color-${color}-4"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${currentColor === color ? `checked` : ``}
        />
        <label
          for="color-${color}-4"
          class="card__color card__color--${color}"
          >${color}</label
        >`;
    })
    .join(`\n`);
};
const createRepeatingDaysTemplate = (days, repeatingDays) => {
  return days
    .map((day) => {
      const isChecked = repeatingDays[day];
      return `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-4"
          name="repeat"
          value="${day}"
          ${isChecked ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}-4">${day}</label>`;
    })
    .join(`\n`);
};

const createHashtagsTemplate = (tags) => {
  return Array.from(tags)
    .map((tag) => {
      return `<span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value=${tag}
            class="card__hashtag-hidden-input"
          />
          <p class="card__hashtag-name">
            #${tag}
          </p>
          <button type="button" class="card__hashtag-delete">delete</button>
        </span>`;
    })
    .join(`\n`);
};

const createTaskEditComponent = (task) => {
  const {description, tags, dueDate, color, repeatingDays} = task;
  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;
  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;
  const date = isDateShowing
    ? `${dueDate.getDate()} ${_const_js__WEBPACK_IMPORTED_MODULE_0__["MONTH_NAMES"][dueDate.getMonth()]}`
    : ``;
  const time = isDateShowing ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["formatTime"])(dueDate) : ``;
  const tagsMarkup = createHashtagsTemplate(tags);
  const colorsMarkup = createColorsTemplate(_const_js__WEBPACK_IMPORTED_MODULE_0__["COLORS"], color);
  const repeatingDaysMarkup = createRepeatingDaysTemplate(_const_js__WEBPACK_IMPORTED_MODULE_0__["DAYS"], repeatingDays);

  return `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>
  
            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${description}</textarea>
              </label>
            </div>
  
            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">
  ${isDateShowing ? `yes` : `no`}
                  </span>
                  </button>
  
  ${isDateShowing ? `<fieldset class="card__date-deadline">
    <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
                            placeholder=""
                            name="date"
                            value="${date} ${time}"
                          />
                        </label>
                      </fieldset>`
    : ``}<button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">
  ${isRepeatingTask ? `yes` : `no`}
                    </span></button>
  
  ${isRepeatingTask ? `<fieldset class="card__repeat-days">
                      <div class="card__repeat-days-inner">
                        ${repeatingDaysMarkup}
                      </div>
                    </fieldset>`
    : ``}</div>
  
                <div class="card__hashtag">
                  <div class="card__hashtag-list">
  ${tagsMarkup}
                  </div>
  
                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>
  
              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
  ${colorsMarkup}
                </div>
              </div>
            </div>
  
            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`;
};

class TaskEdit {
  constructor(task) {
    this._task = task;

    this._element = null;
  }

  getTemplate() {
    return createTaskEditComponent(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/filters.js":
/*!***********************************!*\
  !*** ./src/components/filters.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filter; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createFilterTemplate = (filter, isChecked) => {
  const {name, count} = filter;
  return `
    <input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${isChecked ? `checked` : ``}/>
    <label for="filter__${name}" class="filter__label">
        ${name} <span class="filter__${name}-count">${count}</span>
    </label>`;
};

const createFilterComponent = (filters) => {
  const filtersMarkup = filters
    .map((it, i) => createFilterTemplate(it, i === 0))
    .join(`\n`);

  return `
    <section class="main__filter filter container">
        ${filtersMarkup}
    </section>
    `;
};
class Filter {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }
  getTemplate() {
    return createFilterComponent(this._filters);
  }
  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/load-mobe-button.js":
/*!********************************************!*\
  !*** ./src/components/load-mobe-button.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MoteButton; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createLoadMoreButtonComponent = () => {
  return `<button class="load-more" type="button">load more</button>`;
};

class MoteButton {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createLoadMoreButtonComponent();
  }
  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/menu.js":
/*!********************************!*\
  !*** ./src/components/menu.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SiteMenu; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createSiteMenuComponent = () => {
  return `
    <section class="control__btn-wrap">
        <input
            type="radio"
            name="control"
            id="control__new-task"
            class="control__input visually-hidden"/>
        <label for="control__new-task" class="control__label control__label--new-task">
        + ADD NEW TASK</label>
        <input
            type="radio"
            name="control"
            id="control__task"
            class="control__input visually-hidden"
        checked/>
        <label for="control__task" class="control__label">TASKS</label>
        <input
            type="radio"
            name="control"
            id="control__statistic"
            class="control__input visually-hidden"/>
        <label for="control__statistic" class="control__label">STATISTICS</label>
    </section>`;
};

class SiteMenu {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createSiteMenuComponent();
  }
  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/no-tasks.js":
/*!************************************!*\
  !*** ./src/components/no-tasks.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NoTasks; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createNoTasksTemplate = () => {
  return `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>`;
};

class NoTasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoTasksTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/sort.js":
/*!********************************!*\
  !*** ./src/components/sort.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sort; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createSortTemplate = () => {
  return `<div class="board__filter-list">
      <a href="#" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" class="board__filter">SORT BY DATE up</a>
      <a href="#" class="board__filter">SORT BY DATE down</a>
    </div>`;
};

class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/task-container.js":
/*!******************************************!*\
  !*** ./src/components/task-container.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TaskList; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createTaskListComponent = () => {
  return `<section class="board container"></section>`;
};

class TaskList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTaskListComponent();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/task.js":
/*!********************************!*\
  !*** ./src/components/task.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Task; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");



const createHashtagsTemplate = (hashtags) => {
  return hashtags
    .map((hashtag) => {
      return `
    <span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        #${hashtag}
      </span>
    </span>`;
    })
    .join(`\n`);
};

const createTaskCardComponent = (task) => {
  const {description, tags, dueDate, color, repeatingDays} = task;
  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;
  const date = isDateShowing
    ? `${dueDate.getDate()} ${_const_js__WEBPACK_IMPORTED_MODULE_0__["MONTH_NAMES"][dueDate.getMonth()]}`
    : ``;
  const time = isDateShowing ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["formatTime"])(dueDate) : ``;
  const hashtags = createHashtagsTemplate(Array.from(tags));
  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${hashtags}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`;
};
class Task {
  constructor(task) {
    this._element = null;
    this._task = task;
  }

  getTemplate() {
    return createTaskCardComponent(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/tasks.js":
/*!*********************************!*\
  !*** ./src/components/tasks.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tasks; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


const createTasksTemplate = () => {
  return `<div class="board__tasks"></div>`;
};

class Tasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTasksTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: COLORS, DAYS, MONTH_NAMES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLORS", function() { return COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAYS", function() { return DAYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTH_NAMES", function() { return MONTH_NAMES; });
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const MONTH_NAMES = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/menu.js */ "./src/components/menu.js");
/* harmony import */ var _components_task_container_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/task-container.js */ "./src/components/task-container.js");
/* harmony import */ var _components_filters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/filters.js */ "./src/components/filters.js");
/* harmony import */ var _components_load_mobe_button_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/load-mobe-button.js */ "./src/components/load-mobe-button.js");
/* harmony import */ var _components_task_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/task.js */ "./src/components/task.js");
/* harmony import */ var _components_edit_task_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/edit-task.js */ "./src/components/edit-task.js");
/* harmony import */ var _components_sort_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/sort.js */ "./src/components/sort.js");
/* harmony import */ var _components_tasks_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/tasks.js */ "./src/components/tasks.js");
/* harmony import */ var _components_no_tasks_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/no-tasks.js */ "./src/components/no-tasks.js");
/* harmony import */ var _mock_task_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mock/task.js */ "./src/mock/task.js");
/* harmony import */ var _mock_filter_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mock/filter.js */ "./src/mock/filter.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
// components









// mock





const TASK_COUNT = 22;
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

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };
  const taskComponent = new _components_task_js__WEBPACK_IMPORTED_MODULE_4__["default"](task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new _components_edit_task_js__WEBPACK_IMPORTED_MODULE_5__["default"](task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, replaceEditToTask);

  Object(_utils_js__WEBPACK_IMPORTED_MODULE_11__["render"])(taskListElement, taskComponent.getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_11__["RenderPosition"].BEFOREEND);
};

const siteMainElement = document.querySelector(`.main`);

// menu
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
Object(_utils_js__WEBPACK_IMPORTED_MODULE_11__["render"])(siteHeaderElement, new _components_menu_js__WEBPACK_IMPORTED_MODULE_0__["default"]().getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_11__["RenderPosition"].BEFOREEND);

// filters
const filters = Object(_mock_filter_js__WEBPACK_IMPORTED_MODULE_10__["generateFilters"])();
Object(_utils_js__WEBPACK_IMPORTED_MODULE_11__["render"])(siteMainElement, new _components_filters_js__WEBPACK_IMPORTED_MODULE_2__["default"](filters).getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_11__["RenderPosition"].BEFOREEND);
// task list
const taskList = new _components_task_container_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

Object(_utils_js__WEBPACK_IMPORTED_MODULE_11__["render"])(siteMainElement, taskList.getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_11__["RenderPosition"].BEFOREEND);

const tasks = Object(_mock_task_js__WEBPACK_IMPORTED_MODULE_9__["generateCards"])(TASK_COUNT);
const isAllTasksArchived = tasks.every((task) => task.isArchive);

if (isAllTasksArchived) {
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_11__["render"])(taskList.getElement(), new _components_no_tasks_js__WEBPACK_IMPORTED_MODULE_8__["default"]().getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_11__["RenderPosition"].BEFOREEND);
} else {
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_11__["render"])(taskList.getElement(), new _components_sort_js__WEBPACK_IMPORTED_MODULE_6__["default"]().getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_11__["RenderPosition"].BEFOREEND);
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_11__["render"])(taskList.getElement(), new _components_tasks_js__WEBPACK_IMPORTED_MODULE_7__["default"]().getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_11__["RenderPosition"].BEFOREEND);
  const taskListElement = taskList.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount).forEach((task) => {
    renderTask(taskListElement, task);
  });

  const loadMoreButtonComponent = new _components_load_mobe_button_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_11__["render"])(taskList.getElement(), loadMoreButtonComponent.getElement(), _utils_js__WEBPACK_IMPORTED_MODULE_11__["RenderPosition"].BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => renderTask(task));

    if (showingTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}


/***/ }),

/***/ "./src/mock/filter.js":
/*!****************************!*\
  !*** ./src/mock/filter.js ***!
  \****************************/
/*! exports provided: generateFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilters", function() { return generateFilters; });
const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

const generateFilters = () => {
  return filterNames.map((name) => {
    return {
      name,
      count: Math.floor(Math.random() * 10),
    };
  });
};




/***/ }),

/***/ "./src/mock/task.js":
/*!**************************!*\
  !*** ./src/mock/task.js ***!
  \**************************/
/*! exports provided: generateCard, generateCards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateCard", function() { return generateCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateCards", function() { return generateCards; });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const.js */ "./src/const.js");


const DescriptionItems = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const DefaultRepeatingDays = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false,
};

const Tags = [`homework`, `theory`, `practice`, `intensive`, `keks`];

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomDate = () => {
  const targerDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);

  targerDate.setDate(targerDate.getDate() + diffValue);
  return targerDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    mo: Math.random() > 0.5,
  });
};

const generateTags = (tags) => {
  return tags.filter(() => Math.random() > 0.5).slice(0, 3);
};

const generateCard = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();
  return {
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(Tags)),
    color: getRandomArrayItem(_const_js__WEBPACK_IMPORTED_MODULE_0__["COLORS"]),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
  };
};
const generateCards = (count) => {
  return new Array(count).fill(``).map(generateCard);
};




/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: RenderPosition, formatTime, createElement, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderPosition", function() { return RenderPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTime", function() { return formatTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};

const createElement = (component) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = component;

  return newElement.firstChild;
};
const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map