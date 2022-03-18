import {Todo} from '../class'

import {todoList} from '../index'

// referencias al html

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBrorrar = document.querySelector('.clear-completed');
const UlFiltors = document.querySelector('.filters')
const anchorFiltros =document.querySelectorAll('.filtro') // lo regresa como un arreglo


export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'competed' : '' }" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : '' }>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>;
    `

    const div = document.createElement('div')
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div;
}


//eventos

txtInput.addEventListener('keyup', ( event ) => {
    if(event.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo(txtInput.value);
        console.log(nuevoTodo);
        todoList.nuevoTodo(nuevoTodo);
        console.log(todoList);

        crearTodoHtml(nuevoTodo)
        txtInput.value = '';
    }
});


divTodoList.addEventListener('click', (event) =>{
    const nombreElemento = event.target.localName ; // input,label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id')

    if(nombreElemento.includes( 'input' ) ){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed')
    } else if (nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

    console.log(todoList);
}); // click en le check


btnBrorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});


UlFiltors.addEventListener('click', (event) =>{
    const filtro = event.target.text;
    if(!filtro){return;}

    anchorFiltros.forEach(elem =>elem.classList.remove('selected'));
    event.target.classList.add('selected');


    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed') //contains = pregunta si cuenta con dicho elemento

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden')
                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden')
                }
                break;
        }
    }

});
