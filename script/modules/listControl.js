import {
  changeStorageStatus,
  removeStorage,
  changeStorageText,
} from './storageControl.js';

const deleteTask = (id, key) => {
  removeStorage(id, key);
};

const completeTask = (id, key) => {
  changeStorageStatus(id, key);
};

export const taskControl = (title, tbody) => {
  tbody.addEventListener('click', (e) => {
    const target = e.target;
    const tr = target.closest('tr');
    const id = tr.dataset.id;
    if (target.closest('.btn-success')) {
      tr.classList.remove('table-light', 'table-danger', 'table-warning');
      tr.classList.add('table-success');
      tr.cells[1].classList.add('text-decoration-line-through');
      tr.cells[2].innerHTML = 'Выполнена';
      target.closest('.btn-success').disabled = 'true';
      completeTask(id, title);
    } else if (target.closest('.btn-danger')) {
      const sure = confirm('Вы уверены, что хотите удалить задачу?');
      if (sure) {
        deleteTask(id, title);
        tr.remove();
        let i = 1;

        for (const row of tbody.rows) {
          row.cells[0].innerHTML = i;
          i += 1;
        }
      }
    } else if (target.closest('.btn-primary')) {
      const button = target.closest('.btn-primary');
      if (tr.cells[1].contentEditable === 'true') {
        button.innerHTML = 'Изменить';
        tr.cells[1].contentEditable = 'false';
        const text = tr.cells[1].innerHTML;
        tr.cells[1].classList.remove('text-info');
        changeStorageText(id, title, text);
      } else {
        button.innerHTML = 'Сохранить';
        tr.cells[1].contentEditable = 'true';
        tr.cells[1].classList.add('text-info');
      }
    }
  });
};
