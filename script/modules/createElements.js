const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  return container;
};

const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');

  const headerContainer = createContainer();
  header.append(headerContainer);

  header.headerContainer = headerContainer;
  return header;
};

const createLogo = title => {
  const h1 = document.createElement('h1');
  h1.classList.add('logo');
  h1.textContent = `Todo список. User: ${title}!`;

  return h1;
};

const createMain = () => {
  const main = document.createElement('main');
  const mainContainer = createContainer();
  main.append(mainContainer);
  main.mainContainer = mainContainer;

  return main;
};

const createButtonsGroup = params => {
  const btns = params.map(({className, type, text, disabled}) => {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.className = className;
    button.disabled = disabled;
    return button;
  });

  return btns;
};

const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  `);

  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  table.tbody = tbody;
  table.thead = thead;

  return table;
};

const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  form.insertAdjacentHTML('beforeend', `
    <label class="form-group me-3 mb-0">
      <input type="text" class="form-control" placeholder="ввести задачу"
      name="newTask"
      required>
    </label>
    <select name="importance" class="form-select">
      <option value="simple" selected>Обычная</option>
      <option value="important">Важная</option>
      <option value="urgent">Срочная</option>
    </select>
  `);

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary me-3',
      type: 'submit',
      text: 'Сохранить',
      disabled: true,
    },
    {
      className: 'btn btn-warning',
      type: 'reset',
      text: 'Очистить',
    },
  ]);

  form.append(buttonGroup[0], buttonGroup[1]);

  return {
    form,
    btnSave: buttonGroup[0],
    btnClear: buttonGroup[1],
  };
};

const getClassName = importCase => {
  let className;
  switch (importCase) {
    case 'important':
      className = 'table-warning';
      break;
    case 'urgent':
      className = 'table-danger';
      break;
    default:
      className = 'table-light';
      break;
  }
  return className;
};

const createRow = ({trNumber, text, status, id, importance}) => {
  const tr = document.createElement('tr');
  status === 'Выполнена' ? tr.classList.add('table-success') :
    tr.classList.add(getClassName(importance));
  tr.dataset.id = id;

  const tdNumber = document.createElement('td');
  tdNumber.textContent = trNumber;

  const tdTask = document.createElement('td');
  if (status === 'Выполнена') {
    tdTask.classList.add('text-decoration-line-through');
  }
  tdTask.textContent = text;

  const tdStatus = document.createElement('td');
  tdStatus.textContent = status;

  const tdActions = document.createElement('td');

  const buttons = createButtonsGroup([
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success',
      type: 'button',
      text: 'Завершить',
      disabled:
        status === 'Выполнена' ? 'true' : false,
    },
    {
      className: 'btn btn-primary',
      type: 'button',
      text: 'Изменить',
    },
  ]);

  tdActions.append(buttons[0], buttons[1], buttons[2]);

  tr.append(tdNumber, tdTask, tdStatus, tdActions);

  return tr;
};

const createModal = () => {
  const modal = document.createElement('div');
  modal.classList.add('modal-overlay');

  const form = document.createElement('form');
  form.classList.add('form');
  form.insertAdjacentHTML('beforeend', `
  <form>
    <label>
      Введите имя пользователя
      <input type="text" name="username">
    </label>
  </form>`);

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary btn-lg btn-block',
      type: 'submit',
      text: 'ОК',
    },
  ]);

  form.append(buttonGroup[0]);

  modal.append(form);
  return {
    modal,
    form,
  };
};

export default {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createRow,
  createModal,
};
