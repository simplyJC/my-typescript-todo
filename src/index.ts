import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

const todoList = document.querySelector<HTMLUListElement>('#todo-list');
const todoForm = document.querySelector<HTMLFormElement>('#todo-form');
const todoInput = document.querySelector<HTMLInputElement>('#todo-new');
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

todoForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (todoInput?.value == '' || todoInput?.value == null) return;
  const newTask: Task = {
    id: uuidV4(),
    title: todoInput.value,
    isDone: false,
  };
  tasks.push(newTask);
  saveTasks();

  addListItem(newTask);
  todoInput.value = '';
});

function addListItem(task: Task) {
  const itemEl = document.createElement('li');
  const labelEl = document.createElement('label');
  const checkboxEl = document.createElement('input');
  checkboxEl.addEventListener('change', () => {
    task.isDone = checkboxEl.checked;
    saveTasks();
  });
  checkboxEl.type = 'checkbox';
  checkboxEl.checked = task.isDone;
  labelEl.append(checkboxEl, task.title);
  itemEl.append(labelEl);
  todoList?.append(itemEl);
}

function saveTasks() {
  localStorage.setItem('TASKS2', JSON.stringify(tasks));
}
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('TASKS2');
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
