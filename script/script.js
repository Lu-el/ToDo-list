import createElements from './modules/createElements.js';
import {initTodoList, init} from './modules/todoInit.js';

const {
  createModal,
} = createElements;

const openWindow = (selectorApp) => {
  const app = document.querySelector(selectorApp);
  const {modal, form} = createModal();
  app.append(modal);
  initTodoList(form, modal, selectorApp, init);
};

openWindow('.app-container');
