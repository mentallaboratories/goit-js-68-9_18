import {v4 as uuidv4} from 'uuid';
import './styles.css';


const getTodo = ({id, value, checked}) =>{
  return `
  <li class="list-item" data-id=${id}>
  <input class="input-checkbox" type="checkbox" ${checked?'checked':''}/>
  <span class="input-text">${value}</span>
  <button data-action="delete" class="button">x</button>
  <button data-action="view" class="button">view</button>
</li>`;
}

const refs = {
  form : document.querySelector('#form'),
  list : document.querySelector('#list'),
}

const todos = [
  {id:'1',value:'lorem ipsum', checked:true},
  {id:'2',value:'lorem ipsum', checked:false}
]

const onSubmit = e =>{
  const input = e.target.elements.text;
  const {value} = input;
  const newTodo = {id: uuidv4(), value, checked:false}

  console.log(newTodo); 

  e.preventDefault();
  todos.push(newTodo);
  input.value = '';
  render();
}


const deleteTodo = ()=>{
  console.log('delete')
};

const viewTodo = ()=>{
  console.log('view')
};

const onClick = e => {
  const {action} = e.target.dataset;
  const parent = e.target.closest('li');
  const {id} = parent?.dataset||{};

  console.log(id);

  switch(action){
    case 'delete':
      deleteTodo(id);
      break;
    case 'view':
      viewTodo(id);
      break;
  }
};

const render = () =>{
  const itemList = todos.map(todo =>getTodo(todo)).join('');

  refs.list.innerHTML = '';
  refs.list.insertAdjacentHTML('beforeend', itemList);
};


render();

refs.form.addEventListener('submit',onSubmit);
refs.list.addEventListener('click', onClick);

