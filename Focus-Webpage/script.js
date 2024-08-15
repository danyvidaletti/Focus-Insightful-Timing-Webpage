// Select the button, input field, and task list elements from the DOM
const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const entireList = document.querySelector('.task-list');

// This script toggles the visibility of the paragraphs in benefit items when the image is clicked
document.addEventListener("DOMContentLoaded", function () {
  // Select all elements with the class 'benefit-item'
  const benefitItems = document.querySelectorAll(".benefit-item");

  // Loop through each benefit item and add a click event listener
  benefitItems.forEach(item => {
    item.addEventListener("click", function () {
      // Toggle the display of paragraphs within the clicked benefit item
      const paragraphs = this.querySelectorAll("p");
      paragraphs.forEach(p => {
        p.style.display = p.style.display === "block" ? "none" : "block";
      });
    });
  });
});

// Initialize an empty array to store the list of tasks
let myItemList = [];

// Function to add a new task to the list
function addNewTask() {
  // Check if the input field is empty, if so, alert the user and return
  if (input.value.trim() === '') {
    alert("Please enter a task!");
    return;
  }

  // Add the new task to the myItemList array with a 'completed' status of false
  myItemList.push({
    task: input.value.trim(),
    completed: false
  });

  // Clear the input field after adding the task
  input.value = '';

  // Update the displayed task list
  showTasks();
}

// Function to display the tasks on the page
function showTasks() {
  let newList = ''; // Initialize an empty string to build the HTML for the task list

  // Loop through each task in myItemList and create an HTML list item for it
  myItemList.forEach((item, index) => {
    newList +=
      ` 
        <li class="task ${item.completed ? 'done' : ''}">
          <img src="./img/check.png" alt="task-checked" class="task-img" onclick="completedTask(${index})">
          <p>${item.task}</p>
          <img src="./img/trash.png" alt="task-deleted" class="task-img" onclick="deleteItem(${index})">
        </li>
      `;
  });

  // Insert the new list of tasks into the DOM
  entireList.innerHTML = newList;

  // Save the updated task list to localStorage
  localStorage.setItem('list', JSON.stringify(myItemList));
}

// Function to mark a task as completed or incomplete
function completedTask(index) {
  // Toggle the 'completed' status of the task at the given index
  myItemList[index].completed = !myItemList[index].completed;

  // Update the displayed task list
  showTasks();
}

// Function to delete a task from the list
function deleteItem(index) {
  // Select the task element to be deleted
  const taskItem = document.querySelectorAll('.task')[index];
  taskItem.classList.add('delete-pending'); // Add a class for pending deletion (for any animation or styling)

  // Confirm with the user if they really want to delete the task
  const confirmDelete = confirm("Are you sure you want to delete this task?");

  // If the user confirms, remove the task from the list
  if (confirmDelete) {
    myItemList.splice(index, 1);
    showTasks(); // Update the displayed task list
  } else {
    taskItem.classList.remove('delete-pending'); // If not deleted, remove the pending deletion class
  }
}

// Function to reload the tasks from localStorage when the page is loaded
function reloadTasks() {
  const localStorageTasks = localStorage.getItem('list'); // Get the tasks from localStorage

  // If there are tasks in localStorage, parse and assign them to myItemList
  if (localStorageTasks) {
    myItemList = JSON.parse(localStorageTasks);
  }

  // Update the displayed task list with the tasks from localStorage
  showTasks();
}

// Reload tasks when the page is first loaded
reloadTasks();

// Add event listeners for the 'Add Task' button and the Enter key
button.addEventListener('click', addNewTask);
input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addNewTask(); // Call addNewTask() if the Enter key is pressed
  }
});

// Function to update the date and time in the footer
function updateDateTime() {
  const dateTimeElement = document.getElementById('DateTime'); // Select the date and time element
  const now = new Date(); // Get the current date and time

  // Format the date and time to a readable string
  const formattedDateTime = now.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  // Update the content of the date and time element
  dateTimeElement.textContent = formattedDateTime;
}

// Update the time every second
setInterval(updateDateTime, 1000);

// Initially call the function to display the current date and time
updateDateTime();