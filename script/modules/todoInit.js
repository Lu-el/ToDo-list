import {renderTodoList, renderTask} from './render.js';
import {formControl} from './formСontrol.js';
import {getStorage} from './storageControl.js';
import {taskControl} from './listControl.js';

export const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);
  const data = getStorage(title);

  const {
    list,
    form,
    btnSave,
  } = renderTodoList(app, title);

  renderTask(list, data);
  formControl(form, btnSave, title, list);
  taskControl(title, list);
};

export const initTodoList = (form, modal, selectorApp, init) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    modal.classList.add('invisible');
    init(selectorApp, form.username.value);
  });
};
