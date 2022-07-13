import {
  changeStorageStatus,
  removeStorage,
  changeStorageText,
} from './storageControl.js';

const taskFinished = (tr) => {
  tr.classList.remove('table-light', 'table-danger', 'table-warning');
  tr.classList.add('table-success');
  tr.cells[1].classList.add('text-decoration-line-through');
  tr.cells[2].innerHTML = 'Выполнена';
};

const taskChange = (tr, button) => {
  button.innerHTML = 'Изменить';
  tr.cells[1].contentEditable = 'false';
  const text = tr.cells[1].innerHTML;
  tr.cells[1].classList.remove('text-info');
  return text;
};

const taskSaveNewText = (tr, button) => {
  button.innerHTML = 'Сохранить';
  tr.cells[1].contentEditable = 'true';
  tr.cells[1].classList.add('text-info');
};

export const taskControl = (title, tbody) => {
  tbody.addEventListener('click', (e) => {
    const target = e.target;
    const tr = target.closest('tr');
    const id = tr.dataset.id;
    if (target.closest('.btn-success')) {
      taskFinished(tr);
      target.closest('.btn-success').disabled = 'true';
      changeStorageStatus(id, title);
      return;
    }

    if (target.closest('.btn-danger')) {
      const sure = confirm('Вы уверены, что хотите удалить задачу?');
      if (sure) {
        removeStorage(id, title);
        tr.remove();
        let i = 1;

        for (const row of tbody.rows) {
          row.cells[0].innerHTML = i;
          i += 1;
        }
      }
      return;
    }

    if (target.closest('.btn-primary')) {
      const button = target.closest('.btn-primary');
      if (tr.cells[1].contentEditable === 'true') {
        const text = taskChange(tr, button);
        changeStorageText(id, title, text);
      } else {
        taskSaveNewText(tr, button);
      }
      return;
    }
  });
};
