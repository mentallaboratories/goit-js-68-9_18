export const getTodo = ({id, value, checked}) =>{
    return `
    <li  class="list-item" data-id=${id}>
    <input data-action="check" class="input-checkbox" type="checkbox" ${checked?'checked':''}/>
    <span class="input-text">${value}</span>
    
    <button data-action="view" class="button">view</button>
    <button data-action="delete" class="button">x</button>
  </li>`;
  };