import createElements from './createElements.js';

const {
  createHeader,
  createLogo,
  createMain,
  createTable,
  createForm,
  createRow,
} = createElements;

export const renderTodoList = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const table = createTable();
  const {form, btnSave} = createForm();

  header.headerContainer.append(logo);
  main.mainContainer.append(form, table);
  app.append(header, main);

  return {
    list: table.tbody,
    logo,
    form,
    btnSave,
  };
};

export const renderTask = (elem, data) => {
  data.forEach((elem, index) => elem.trNumber = (index + 1));
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};
