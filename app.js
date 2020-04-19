// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
todoInput.placeholder = "Add new item";
const filteroption = document.querySelector(".filter-todo");
const trashlocal = document.querySelector(".clean");

// Event Listener

document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", completeCheck);
filteroption.addEventListener("click", filtertodo);
trashlocal.addEventListener("click", clearlocal);

// Functions
function addToDo(event) {
  event.preventDefault();

  //   CHECK VALUE

  if (todoInput.value === "") {
    todoInput.placeholder = "Field is empty!";
    todoInput.classList.remove("success");
    todoInput.classList.add("error");
  } else {
    todoInput.placeholder = "Add new item";
    todoInput.classList.remove("error");
    todoInput.classList.add("success");

    //TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //CREATE LI
    const newtodo = document.createElement("li");
    newtodo.innerText = todoInput.value;
    newtodo.classList.add("todo-item");
    todoDiv.appendChild(newtodo);
    saveLocalTodos(todoInput.value);

    // CHECK MARK BUTTON
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //CHECK TRASH BUTTON
    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    todoDiv.appendChild(trashbutton);

    // APPEND TODO TO TODOLIST
    todoList.appendChild(todoDiv);

    //   CLEAR INPUT VALUE
    todoInput.value = "";
  }
}

// Delete Check
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removelocalstorage(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
}

// Complete Check
function completeCheck(e) {
  const item = e.target;

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// FILTER FUNCTION
function filtertodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// CLEAR LOCAL
// function clearlocal() {
//   localStorage.clear();
// }

// SAVELOCAL FUNCTION
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// GET TODOS FUNCTION
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //CREATE LI
    const newtodo = document.createElement("li");

    newtodo.innerText = todo;
    newtodo.classList.add("todo-item");
    todoDiv.appendChild(newtodo);

    // CHECK MARK BUTTON
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //CHECK TRASH BUTTON
    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    todoDiv.appendChild(trashbutton);

    // APPEND TODO TO TODOLIST
    todoList.appendChild(todoDiv);
  });
}

// FUNCTION REMOVE FROM LOCALSTORAGE
function removelocalstorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerHTML;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
