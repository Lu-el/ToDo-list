export const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

export const removeStorage = (id, title) => {
  const data = getStorage(title);
  const indexData = data.findIndex(elem => elem.id === id);
  if (indexData >= 0) {
    data.splice(indexData, 1);
    localStorage.removeItem(title);
    localStorage.setItem(title, JSON.stringify(data));
  }
};

export const setStorage = (key, newTask) => {
  const data = getStorage(key);
  data.push(newTask);
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(data));
};

export const addTaskStorage = (task, key) => {
  setStorage(key, task);
};

export const changeStorageStatus = (id, title) => {
  const data = getStorage(title);
  data.forEach(elem => {
    if (elem.id === id) {
      elem.status = 'Выполнена';
    }
  });
  localStorage.removeItem(title);
  localStorage.setItem(title, JSON.stringify(data));
};

export const changeStorageText = (id, title, text) => {
  const data = getStorage(title);
  data.forEach(elem => {
    if (elem.id === id) {
      elem.text = text;
    }
  });
  localStorage.removeItem(title);
  localStorage.setItem(title, JSON.stringify(data));
};
