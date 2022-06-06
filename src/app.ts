let inputText: HTMLInputElement   // input for typing the task
let ulListArea: HTMLElement  // area with tasks
let btnAddTask: HTMLButtonElement  // btn for adding a new task
let alertEmptyTodo: HTMLButtonElement
let editPopup: HTMLElement   // button to edit an existing task
let showPopup: HTMLElement   // opening a popup to edit the task
let popupInputText: HTMLInputElement  // input to edit the task
let popupBtnSave: HTMLButtonElement    // Btn to saving changes in popup
let popupBtnCancel: HTMLButtonElement  // btn to closing popup without saving changes
let popupInfo: HTMLInputElement   // error when we will try to saving empty popup

let ID: number = 0

const startAll = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    inputText = document.querySelector('.todo-input')
    ulListArea = document.querySelector('ul')
    alertEmptyTodo = document.querySelector('.alert-info')
    showPopup = document.querySelector('.popup')
    popupInputText = document.querySelector('.popup-input')
    popupBtnSave = document.querySelector('.accept')
    popupBtnCancel = document.querySelector('.cancel')
    popupInfo = document.querySelector('.popup-info')
    btnAddTask = document.querySelector('.add-btn')
}

const prepareDOMEvents = () => {
    btnAddTask.addEventListener('click', addTask)
    inputText.addEventListener('keyup', enterCheck)
    document.addEventListener('click', editTask)
    popupBtnCancel.addEventListener('click', closePopup)
    popupBtnSave.addEventListener('click', savePopup)
}

const addTask = () => {
    if (!(inputText.value === '')) {
        // new task
        const newTask = document.createElement('li')
        newTask.setAttribute('id', `${ID}`)
        newTask.innerText = `${inputText.value}`
        ulListArea.append(newTask)
        // div with buttons
        const toolsDiv = document.createElement('div')
        toolsDiv.classList.add('tools')
        newTask.append(toolsDiv)
        // buttons for complete
        const completeButton = document.createElement('button')
        completeButton.classList.add('complete')
        completeButton.innerHTML = '<i class="fas fa-check"></i>'
        toolsDiv.append(completeButton)
        // buttons for edits
        const editButton = document.createElement('button')
        editButton.classList.add('edit')
        editButton.innerText = 'EDIT'
        toolsDiv.append(editButton)

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete')
        deleteButton.innerHTML = '<i class="fas fa-times"></i>'
        toolsDiv.append(deleteButton)
        //---
        ID++
        inputText.value = ''
        emptyTodo()
    } else {
        alertEmptyTodo.innerText = 'Wpisz treść zadania'
    }
}
// add task by pressing enter
const enterCheck = e => {
    if (e.key === 'Enter') {
        addTask()
    }
}
// error - empty todo
const emptyTodo = () => {
    if (ulListArea.innerText === '') {
        alertEmptyTodo.innerText = 'Brak zadań na liście'
    } else {
        alertEmptyTodo.innerText = ''
    }
}
// edit task (completed, edit, delete)
const editTask = e => {
    if (e.target.matches('.complete') || e.target.matches('.fa-check')) {
        e.target.closest('li').classList.toggle('completed')
        e.target.closest('button').classList.toggle('completed')
    } else if (e.target.matches('.edit')) {
        showPopup.style.display = 'flex'
        const ourTaskTxt = e.target.closest('li').id
        editPopup = document.getElementById(ourTaskTxt)
        popupInputText.value = editPopup.firstChild.textContent
    } else if (e.target.matches('.delete') || e.target.matches('.fa-times')) {
        e.target.closest('li').remove()
        emptyTodo()
    }
}
// close and clear popup
const closePopup = () => {
    showPopup.style.display = 'none'
    popupInputText.value = ''
}
// saving popup and adding changes to the task
const savePopup = () => {
    if (popupInputText.value !== '') {
        editPopup.firstChild.textContent = popupInputText.value
        showPopup.style.display = 'none'
        popupInfo.innerText = ''
    } else {
        popupInfo.innerText = 'Musisz podać treść zadania'
    }
}

document.addEventListener('DOMContentLoaded', startAll)
