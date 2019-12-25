import AbstractComponent from './abstract-component.js';

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
  const filtersMarkup = filters.map((it, i) => createFilterTemplate(it, i === 0)).join(`\n`);

  return `
    <section class="main__filter filter container">
        ${filtersMarkup}
    </section>
    `;
};
export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }
  getTemplate() {
    return createFilterComponent(this._filters);
  }
}
