import {v4 as uuidv4} from 'uuid';
import './styles.css';


const getTodo = ({id, value, checked}) =>{
  return `
  <li  class="list-item" data-id=${id}>
  <input data-action="check" class="input-checkbox" type="checkbox" ${checked?'checked':''}/>
  <span class="input-text">${value}</span>
  <button data-action="delete" class="button">x</button>
  <button data-action="view" class="button">view</button>
</li>`;
};

const refs = {
  form: document.querySelector('#form'),
  list: document.querySelector('#list'),
};

let todos = [];

const render = () =>{
  const itemList = todos.map(todo => getTodo(todo)).join('');

  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', itemList);
};

const onSubmit = e =>{
  e.preventDefault();

  const input = e.target.elements.text;
  const {value} = input;
  const newTodo = {id: uuidv4(), value, checked:false};
  
  e.preventDefault();

  todos.push(newTodo);
  input.value = '';

  saveTodos();
  render();
};



const loadTodos = () => {
  try{
    todos = JSON.parse(localStorage.getItem('todos'))||[];
  } catch (error) {
    console.log('error', error);
    todos = [];
  } 
};

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const deleteTodo = id => {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  render();
};

const viewTodo = id => {
  console.log('viewTodo')
};

const changeTodo = id =>{
  todos = todos.map(item => (item.id === id
    ?{
    ...item, 
    checked: !item.checked}
    :item));
    saveTodos();
    render();
};


const onItemClick = e => {
  const {action} = e.target.dataset;
  const parent = e.target.closest('li');
  const {id} = parent?.dataset || {};

  switch(action){
    case 'delete':
      deleteTodo(id);
      break;
    case 'view':
      viewTodo(id);
      break;
    case 'check':
      changeTodo(id);
      break;
  }
};



loadTodos();
render();

refs.form.addEventListener('submit',onSubmit);
refs.list.addEventListener('click', onItemClick);

