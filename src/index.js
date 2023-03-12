import {v4 as uuidv4} from 'uuid';
import './styles.css';
import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';

import {modal} from './components/Modal';
import { getTodo } from './components/TodoHandlers';




// const getTodo = ({id, value, checked}) =>{
//   return `
//   <li  class="list-item" data-id=${id}>
//   <input data-action="check" class="input-checkbox" type="checkbox" ${checked?'checked':''}/>
//   <span class="input-text">${value}</span>
  
//   <button data-action="view" class="button">view</button>
//   <button data-action="delete" class="button">x</button>
// </li>`;
// };

// const modal = basicLightbox.create(`
// <div class="modal">
//     <h2 class="mod-title"></h2>
//     <p class="text">
//         The unique id is <span class="id-value"></span>
//     </p>
//     <button class="button" type="submit" id="button-modal">OK</button>
// </div>
// `);


const refs = {
  form: document.querySelector('#form'),
  list: document.querySelector('#list'),
  modButton: modal.element().querySelector('.button'),
  idValue: modal.element().querySelector('.id-value'),
  mobTitle: modal.element().querySelector('.mod-title'),

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
  //refs.mobTitle.textContent = todos.value;
  refs.idValue.textContent = id;
  modal.show();

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
refs.modButton.addEventListener('click',()=>modal.close())
