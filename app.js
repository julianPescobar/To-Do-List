// Variables
const tasktext = document.querySelector('#todotext');
const addtask = document.querySelector('#addtask')
const searchtask = document.querySelector('#searchtodo')
const cleartasks = document.querySelector('#cleartasks')
const tasklist = document.querySelector('.collection')
tasktext.focus();
LoadEvents();

// Functions

// Shows Toast
function toast(msg) {
    M.toast({html: msg, displayLength: 1500})
}

// Initializes all Event Listeners
function LoadEvents() {
    document.addEventListener('DOMContentLoaded',LoadTasks)
    tasktext.addEventListener('keyup', CheckAddBtn);
    addtask.addEventListener('click', AddTask);
    tasklist.addEventListener('click', RmvTask);
    searchtask.addEventListener('input', FilterTasks);
    cleartasks.addEventListener('click', ClearTasks)
    tasklist.addEventListener('mouseover',itemhover)
    tasklist.addEventListener('mouseout',itemout)
}

function ClearTasks(e) {
    const tasks = document.querySelectorAll('.collection-item')
    if (tasks.length > 0) {
        while (tasklist.firstChild) {
            tasklist.removeChild(tasklist.firstChild)
        }
        toast('se borraron todas las Tareas')
        localStorage.removeItem('tasks')
    }

}
function itemhover(e){
    if(e.target.classList.contains('collection-item'))
        e.target.style.backgroundColor = '#eee';
}
function itemout(e){
    if(e.target.classList.contains('collection-item'))
        e.target.style.backgroundColor = 'white';
}
function FilterTasks(e) {
    const searchText = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent
        if (item.toLowerCase().indexOf(searchText) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none'
        }
    });
}
function RmvTask(e) {
    if (e.target.parentElement.classList.contains('delete-task')) {
        let text;
        text = e.target.parentElement.parentElement.parentElement.childNodes[0].nodeValue
        // corremos animacion de borrado, esperamos a que termine de animarse para borrarlo
        e.target.parentElement.parentElement.parentElement.classList.remove('scale-in')
        e.target.parentElement.parentElement.parentElement.addEventListener('transitionend', function () {
            e.target.parentElement.parentElement.parentElement.remove();
        })
        toast(`"${text}" borrado`)
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks')); 
        } 
        tasks.splice(tasks.indexOf(text),1)
        localStorage.setItem('tasks',JSON.stringify(tasks))
    };
}
function CheckAddBtn(e) {
    // chequeamos si hay algo escrito
    if (e.target.value.length > 0) {
        // si hay algo escrito podemos agregar
        addtask.classList.remove('disabled')
        if (e.keyCode === 13) {
            addtask.click()
        }
    } else {
        addtask.classList.add('disabled')
        if (e.keyCode === 13) {
            toast('Ingrese algun texto')
        }
    }


}
function AddTask(e) {
    const li = document.createElement('li');
    li.className = 'collection-item scale-transition scale-out';
    li.appendChild(document.createTextNode(tasktext.value))
    const rmv = document.createElement('a');
    rmv.className = 'secondary-content '
    rmv.href = '#'
    rmv.innerHTML = '<i class=" delete-task col s12  waves-effect waves-light left"> <i class="material-icons">delete</i></i>'
    li.appendChild(rmv)
    tasklist.appendChild(li)
    AddToLS(tasktext.value)
    tasktext.value = ''
    tasktext.focus();
    addtask.classList.add('disabled')
    tasklist.lastChild.classList.add('scale-in')
    // Save to localstorage

}
function AddToLS(value) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } tasks.push(value)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function LoadTasks(){
let tasks;
if (localStorage.getItem('tasks') === null) {
    tasks = [];
} else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
   
} 
tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item scale-transition scale-out';
    li.appendChild(document.createTextNode(task))
    const rmv = document.createElement('a');
    rmv.className = 'secondary-content '
    rmv.href = '#'
    rmv.innerHTML = '<i class=" delete-task col s12  waves-effect waves-light left"> <i class="material-icons">delete</i></i>'
    li.appendChild(rmv)
    tasklist.appendChild(li)
    tasklist.lastChild.classList.add('scale-in')
})
}
