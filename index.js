// unordered list
let listItemContainerEl = document.getElementById('listItemContainer');

// Button Tab
let buttonTabEl = document.getElementById('buttonTab');

//Save Tab
let buttonSaveEl = document.getElementById('buttonSave');

// Array to store list of todo objects
todoItems = getTodoItemsFromStorage();
let todoCount = todoItems.length;

//Stringify the todolist
function onSaveTodo(){
    let stringifiedData = JSON.stringify(todoItems);
    localStorage.setItem('todoData',stringifiedData);
}

//Saving data onclikcing the save button.
buttonSaveEl.onclick = function(){
    onSaveTodo();
}

function getTodoItemsFromStorage(){
    let storedData = localStorage.getItem('todoData');
    let parsedTodo = JSON.parse(storedData);
    console.log(parsedTodo);
    if(parsedTodo === null){
        return [];
    }else{
        return parsedTodo;
    }
}

function onChangeStatus(checkBoxId,labelId,todoId){
    let labelItem = document.getElementById(labelId);
    labelItem.classList.toggle('strikeThrough');
    let labelIndex = todoItems.findIndex(function(eachtodo){
        let eachId = 'todo'+eachtodo.id;
        if(eachId === todoId){
            return true;
        }else{
            return false;
        }
    });
    let todoObj = todoItems[labelIndex];
    if(todoObj.ischecked === true){
        todoObj.ischecked = false;
    }else{
        todoObj.ischecked = true;
    }
}

function onClickStar(starId,todoId){
    let labelContainer = document.getElementById(starId);
    labelContainer.classList.toggle('updateLabel');
    let labelConIndex = todoItems.findIndex(function(eachtodo){
        let eachId = 'todo'+eachtodo.id;
        if(eachId === todoId){
            return true;
        }else{
            return false;
        }
    });
    let todoObj = todoItems[labelConIndex];
    if(todoObj.isImp === true){
        todoObj.isImp = false;
    }else{
        todoObj.isImp = true;
    }
}

function onFinish(todoId){
    let listElement = document.getElementById(todoId);
    listItemContainerEl.removeChild(listElement);
    let deleteIndex = todoItems.findIndex(function(eachItem){
        let eachItemId = "todo"+eachItem.id;
        if(eachItemId === todoId){
            return true;
        }else{
            return false;
        }
    })
    todoItems.splice(deleteIndex,1);
}


//Reusable function to create a new list Item.

function createAndApppend(todo){
    let checkBoxId = 'checkBox' + todo.id;
    let labelId = 'labelEl' + todo.id;
    let starId = 'star'+todo.id;
    let todoId = 'todo'+todo.id;
    // list Item
    let listItemEl = document.createElement('li');
    listItemEl.classList.add('listStyle');
    listItemEl.id = todoId;
    listItemContainerEl.appendChild(listItemEl);

    // CheckBox Item
    let checkBoxEl = document.createElement('input');
    checkBoxEl.type = 'checkbox';
    // checkBoxEl.textContent = todo.task;
    checkBoxEl.id = checkBoxId;
    checkBoxEl.classList.add('checkBoxStyle');
    checkBoxEl.onclick = function(){
        onChangeStatus(checkBoxId,labelId,todoId);
    }
    checkBoxEl.checked = todo.ischecked;
    listItemEl.appendChild(checkBoxEl);

    //label item Container
    let labelItemContainer = document.createElement("div");
    labelItemContainer.classList.add("labelContainer");
    labelItemContainer.id = starId;
    listItemEl.appendChild(labelItemContainer);

    //label item
    let labelItemEl = document.createElement('label');
    labelItemEl.setAttribute('for',checkBoxId);
    labelItemEl.textContent = todo.task;
    labelItemEl.id = labelId;
    labelItemEl.classList.add('checkElement');
    if(todo.ischecked === true){
        labelItemEl.classList.add('strikeThrough');
    }
    labelItemContainer.appendChild(labelItemEl);

    //StarContainer 
    let starContainer = document.createElement('div');
    labelItemContainer.appendChild(starContainer);

    let starEl = document.createElement('i');
    starEl.classList.add('far','fa-star');
    starEl.onclick = function(){
        onClickStar(starId,todoId);
    }
    if(todo.isImp === true){
        labelItemContainer.classList.add('updateLabel');
    }
    starContainer.appendChild(starEl);

    //Delete Container
    let deleteElContainer = document.createElement('div');
    deleteElContainer.classList.add('delete-icon-cont');
    labelItemContainer.appendChild(deleteElContainer);

    //Delete Element
    let deleteItemEl = document.createElement('i');
    deleteItemEl.classList.add("far",'fa-trash-alt','delete-icon');
    deleteItemEl.onclick = function(){
        onFinish(todoId);
    }
    deleteElContainer.appendChild(deleteItemEl);
}


for (let eachTask of todoItems){
    createAndApppend(eachTask);
}

function addItemToList(){
    let userInput = document.getElementById('userText');
    if (userInput.value === ''){
        alert('Enter Text')
        return
    }
    todoCount = todoCount+1
    let newTodo = {
        task: userInput.value,
        id: todoCount,
        ischecked: false,
        isImp: false
    }
    todoItems.push(newTodo);
    createAndApppend(newTodo);
    userInput.value = '';
}


let buttonElement = document.getElementById('buttonTab');
buttonElement.onclick = function(){
    addItemToList();
}