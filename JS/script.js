let inputText
let ulListArea
let alertEmptyTodo
let showPopup
let popupInputText
let popupBtnSave
let popupBtnCancel
let popupInfo
let btnAddTask
let editPopup

let ID = 0

const startAll = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    inputText = document.querySelector('.todo-input')
    ulListArea = document.querySelector('ul')
    
}

const prepareDOMEvents = () => {
    
}




document.addEventListener('DOMContentLoaded', startAll)
