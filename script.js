/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


//
// Variables
//

// Constants
const appID = "app";
const headingText = "To do. To done. ✅";
let todoArray = [];
let deletedcompletedArray = [];
let todoForm = document.getElementById("todo-form");
let todoList = document.getElementById("visual-todo-list");
let todoInput = document.getElementById("todo-input");
let totalCompleted = 0;
let totalCreated = 0;
let completedordeletedList = document.getElementById("visual-completed-todo-list");

// DOM Elements
let appContainer = document.getElementById(appID);

//
// Functions
//

todoForm.addEventListener("submit", handleSubmit);

todoList.addEventListener("mouseover", updateMood);

todoList.addEventListener("mouseout", currentMood);

function handleSubmit(event) {
  
  event.preventDefault();

  let tempvar = {
    todo: todoInput.value,
    deleted: false,
    completed: false,
  }

  todoArray.push(tempvar);

  todoForm.reset();

  renderTodos();
  remainingTodos();
  currentMood(event);

  totalCreated++;
}

completedordeletedList.addEventListener("click", completedordeletedListClickHandler);

function completedordeletedListClickHandler(event) {
    if (event.target.dataset.trash) {
      let deletedcompletedTodo = event.target.dataset.trash;
  
      deletedcompletedArray.splice(deletedcompletedTodo, 1);
    }
  
    renderTodos();
    remainingTodos();
    currentMood(event);
}

todoList.addEventListener("click", todoListClickHandler);

function todoListClickHandler(event) {

    if (event.target.dataset.delete) {
      let deletedTodo = event.target.dataset.delete;

      todoArray[deletedTodo].deleted = true;

      deletedcompletedArray.push(deletedTodo);
      // todoArray.splice(deletedTodo, 1);
    }
    if (event.target.dataset.complete) {
      let completedTodo = event.target.dataset.complete;

      todoArray[completedTodo].completed = true;

      deletedcompletedArray.push(completedTodo);

      // todoArray.splice(completedTodo, 1);

      totalCompleted++;
    }

    renderTodos();
    remainingTodos();
    currentMood(event);
}

function renderTodos() {
  todoList.innerHTML = "";

  for (i=0; i < todoArray.length; i++) {
    let listItem = document.createElement("li");
    
    // listItem.textContent = todoArray[i];

    let todoPara = document.createElement("p");

    todoPara.textContent = todoArray[i].todo;

    let deleteButton = document.createElement("button");

    let completeButton = document.createElement("button");

    let todoTextDiv = document.createElement("div");

    let todoButtonsDiv = document.createElement("div");
    
    deleteButton.textContent = "Delete";

    completeButton.textContent = "Complete";

    deleteButton.dataset.delete = i;

    completeButton.dataset.complete = i;

    todoButtonsDiv.classList.add("anotherclass");

    if (todoArray[i].deleted === true) {
      listItem.classList.add("deletedtemp");
    }

    if (todoArray[i].completed === true) {
      listItem.classList.add("completedtemp");
    }

    todoTextDiv.appendChild(todoPara); 

    todoButtonsDiv.appendChild(deleteButton);

    todoButtonsDiv.appendChild(completeButton);

    listItem.appendChild(todoTextDiv);

    listItem.appendChild(todoButtonsDiv);

    todoList.appendChild(listItem);
  }

  completedordeletedList.innerHTML = "";

  for (i=0; i < deletedcompletedArray.length; i++) {
    let listItem = document.createElement("li");

    let completedordeletedPara = document.createElement("p");

    completedordeletedPara.textContent = deletedcompletedArray[i].todo;

    let completedordeletedButtonsDiv = document.createElement("div");

    let completedordeletedButton = document.createElement("button");

    completedordeletedButton.textContent = "Delete";

    completedordeletedButton.dataset.trash = i;

    completedordeletedButtonsDiv.appendChild(completedordeletedButton);

    listItem.appendChild(completedordeletedPara);

    listItem.appendChild(completedordeletedButtonsDiv);

    completedordeletedList.appendChild(listItem);
  
  }
}

function remainingTodos() {
  let completedPara = document.getElementById("completedtodos-p");

  let completedText = "";

  let remainingText = "";

  let createdText = "";

  if (totalCompleted === 0) {
    completedText = "NO TASKS SO FAR";
  } else if (totalCompleted === 1) {
    completedText = "1 TASK";
  } else {
    completedText = totalCompleted + " TASKS";
  }

  if (todoArray.length === 0) {
    remainingText = "NO TASKS LEFT";
  } else if (todoArray.length === 1) {
    remainingText = "1 TASK REMAINING";
  } else {
    remainingText = todoArray.length + " TASKS REMAINING";
  }

  if (totalCreated === 0) {
    createdText = "NO TASKS";
  } else if (totalCreated === 1) {
    createdText = "1 TASK";
  } else { 
    createdText = totalCreated + " TASKS";
  }

  if (totalCompleted === 0 && todoArray.length === 0 && totalCreated > 0) {
    completedPara.textContent = ("Despite creating " + createdText + " so far, you've completed NONE OF THEM. QUIT HITTING THAT DELETE BUTTON AND GET TO WORK!");
  } else if (totalCompleted > 0 && todoArray.length === 0) {
    completedPara.textContent = ("You've completed " + completedText + " and have " + remainingText + ". GOOD SHIT!")
  } else {
    completedPara.textContent = ("You've completed " + completedText + " and have " + remainingText + ". GET TO WORK!")
  }
  // The above if statement is cool. It was originally a bunch of if statements, and is now... a bunch of if statements. Looks neat though.
}

function updateMood(event) {
  let moodImage = document.getElementById("moodimage");

  if (event.target.dataset.delete) {
    moodImage.src = "images/9875-steamfacepalm.png";
  }
  if (event.target.dataset.complete) {
    moodImage.src = "images/3194-steamhappy.png";
  }
}

function currentMood(event){
  let moodImage = document.getElementById("moodimage");
  

  if (totalCompleted === 0 && todoArray.length === 0 && totalCreated > 0) {
    moodImage.src ="images/5524-steammocking.png";
    return;
  } else if (todoArray.length === 0) {
    moodImage.src = "images/3165-steambored.png";
    return;
  } else if (todoArray.length <= 4) {
    moodImage.src = "images/3194-steamhappy.png";
    return;
  } else if (todoArray.length <= 10) {
    moodImage.src ="images/7490-steamsad.png";
  } else {
    moodImage.src="images/5a2411fc6003f508dd5d5b37.png";
  }
}

// Add a heading to the app container
function inititialise() {
  // If anything is wrong with the app container then end
  if (!appContainer) {
    console.error("Error: Could not find app contianer");
    return;
  }

  // Create an h1 and add it to our app
  const h1 = document.createElement("h1");
  //h1.innerText = headingText;
  appContainer.appendChild(h1);

  // Init complete
  console.log("App successfully initialised");
}

//
// Inits & Event Listeners
//
inititialise();