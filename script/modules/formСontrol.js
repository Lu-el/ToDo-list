import * as storage from './storageControl.js';
import createElements from './createElements.js';

const {createRow} = createElements;
const {
  getStorage,
  addTaskStorage,
} = storage;

const addTask = (newTask, array) => {
  newTask.number = array.length + 1;
  array.push(newTask);
};

const createTask = (form, trNumber) => {
  const newTask = {
    trNumber,
    id: Math.random().toString().substring(2, 10),
    text: form.newTask.value,
    status: 'В процессе',
    importance: form.importance.value,
  };
  return newTask;
};

const addTaskPage = (newTask, list) => {
  list.append(createRow(newTask));
};

export const formControl = (form, btnAdd, storageKey, list) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const trNumber = getStorage(storageKey).length + 1;
    const newTask = createTask(form, trNumber);
    addTask(newTask, getStorage(storageKey));
    addTaskStorage(newTask, storageKey);
    form.reset();
    addTaskPage(newTask, list);
  });

  form.addEventListener('input', (e) => {
    const target = e.target;
    if (target.value) {
      btnAdd.disabled = false;
    } else {
      btnAdd.disabled = true;
    }
  });

  form.addEventListener('reset', () => {
    btnAdd.disabled = true;
  });
};
