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
let todoArray = [
];

let todoForm = document.getElementById("todo-form");
let todoList = document.getElementById("visual-todo-list");
let todoInput = document.getElementById("todo-input");
let totalCompleted = 0;
let totalCreated = 0;
let currentTodos = 0;
let benson = 0;

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

  if (todoInput.value === "") {
    let completedPara = document.getElementById("completedtodos-p");
    let completedPara2 = document.getElementById("completedtodos-p2");
    let moodImage = document.getElementById("moodimage");
    benson = 1;
    completedPara.textContent = "When was the last time you did nothing? Never, huh?";
    completedPara2.textContent = "THEN WHY ARE YOU ADDING NOTHING TO YOUR TODO LIST?"
    moodImage.src = "images/bensonemote.png";
    moodImage.alt = "Benson from Regular Show";

    // Obviously ChatGPT wrote this timeout function for me. Thanks bro. Apparently there isn't a wait function in JS. Why?
    setTimeout(() => {
      benson = 0;
      currentMood(event);
      remainingTodos();
    }, 4000);

  } else {
    let tempvar = {
      todo: todoInput.value,
      deleted: false,
      completed: false,
    }

    todoArray.push(tempvar);

    todoForm.reset();

    totalCreated++;
    currentTodos++;

    renderTodos();
    remainingTodos();
    currentMood(event);
  }
}

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
      currentTodos--;
    }
    if (event.target.dataset.complete) {
      let completedTodo = event.target.dataset.complete;

      todoArray[completedTodo].completed = true;

      totalCompleted++;
      currentTodos--;
    }

    if (event.target.dataset.trash) {
      let removeTodo = event.target.dataset.trash;
  
      todoArray.splice(removeTodo, 1);
    }

    renderTodos();
    remainingTodos();
    currentMood(event);
}

function renderTodos() {
  todoList.innerHTML = "";

  for (i=0; i < todoArray.length; i++) {
    let listItem = document.createElement("li");

    let todoPara = document.createElement("p");

    todoPara.textContent = todoArray[i].todo;

    let deleteButton = document.createElement("button");

    let removeButton = document.createElement("button");

    let completeButton = document.createElement("button");

    let todoTextDiv = document.createElement("div");

    let todoButtonsDiv = document.createElement("div");

    todoButtonsDiv.classList.add("anotherclass");

    if (todoArray[i].deleted === true) {
      listItem.classList.add("deletedtemp");
      removeButton.textContent = "Remove";
      removeButton.dataset.trash = i;
      todoButtonsDiv.appendChild(removeButton);
    } 

    if (todoArray[i].completed === true) {
      listItem.classList.add("completedtemp");
      removeButton.textContent = "Remove";
      removeButton.dataset.trash = i;
      todoButtonsDiv.appendChild(removeButton);
    }

    if (todoArray[i].deleted === false && todoArray[i].completed === false) {
        deleteButton.textContent = "Delete";
        deleteButton.dataset.delete = i;
        todoButtonsDiv.appendChild(deleteButton);
        completeButton.textContent = "Complete";
        completeButton.dataset.complete = i;
        todoButtonsDiv.appendChild(completeButton);
    }

    todoTextDiv.appendChild(todoPara); 

    listItem.appendChild(todoTextDiv);

    listItem.appendChild(todoButtonsDiv);

    todoList.appendChild(listItem);
  }

}

function remainingTodos() {
  let completedPara = document.getElementById("completedtodos-p");
  let completedPara2 = document.getElementById("completedtodos-p2");

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

  if (currentTodos === 0) {
    remainingText = "NO TASKS LEFT.";
  } else if (currentTodos === 1) {
    remainingText = "1 TASK REMAINING.";
  } else {
    remainingText = currentTodos + " TASKS REMAINING.";
  }

  if (totalCreated === 0) {
    createdText = "NO TASKS";
  } else if (totalCreated === 1) {
    createdText = "1 TASK";
  } else { 
    createdText = totalCreated + " TASKS";
  }

  if (benson === 0) {
    if (totalCompleted === 0 && currentTodos === 0 && totalCreated > 0) {
      completedPara.textContent = ("Despite creating " + createdText + " so far, you've completed NONE OF THEM. QUIT HITTING THAT DELETE BUTTON AND GET TO WORK!");
      completedPara2.textContent = ("");
    } else if (totalCompleted > 0 && currentTodos === 0) {
      completedPara.textContent = ("You've completed " + completedText + " and have " + remainingText);
      completedPara2.textContent = ("GOOD SHIT!");
    } else {
      completedPara.textContent = ("You've completed " + completedText + " and have " + remainingText);
      completedPara2.textContent = ("GET TO WORK!");
    }
  }
  // The above if statement is cool. It was originally a bunch of if statements, and is now... a bunch of if statements. Looks neat though.
}

function updateMood(event) {
  let moodImage = document.getElementById("moodimage");

  if (benson === 0) {
    if (event.target.dataset.delete) {
      moodImage.src = "images/9875-steamfacepalm.png";
      moodImage.alt = "Image of a lime green facepalming emoji";
    }
    if (event.target.dataset.complete) {
      moodImage.src = "images/3194-steamhappy.png";
      moodImage.alt = "Image of a yellow happy emoji";
    }
    if (event.target.dataset.trash) {
      moodImage.src = "images/5a2411fc6003f508dd5d5b37.png";
      moodImage.alt = "Image of a skull emoji";
    }
  }
}

function currentMood(event){
  let moodImage = document.getElementById("moodimage");

  if (benson === 0) {
    if (totalCompleted === 0 && currentTodos === 0 && totalCreated > 0) {
      moodImage.src ="images/5524-steammocking.png";
      moodImage.alt = "Image of a green mocking emoji";
      return;
    } else if (currentTodos === 0) {
      moodImage.src = "images/3165-steambored.png";
      moodImage.alt = "Image of a green sleeping emoji";
      return;
    } else if (currentTodos <= 4) {
      moodImage.src = "images/3194-steamhappy.png";
      moodImage.alt = "Image of a yellow happy emoji";
      return;
    } else if (currentTodos <= 10) {
      moodImage.src ="images/7490-steamsad.png";
      moodImage.alt = "Image of a blue sad emoji";
    } else {
      moodImage.src="images/5a2411fc6003f508dd5d5b37.png";
      moodImage.alt = "Image of a skull emoji";
    }
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