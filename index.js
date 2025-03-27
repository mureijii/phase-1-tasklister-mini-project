document.addEventListener("DOMContentLoaded", () => {
  // your code here
  // Select necessary DOM elements
const taskForm = document.getElementById("create-task-form");
const taskList = document.getElementById("tasks");

// Handle form submission
taskForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  // Get input values
  const taskInput = document.getElementById("new-task-description").value;
  const priorityInput = document.getElementById("task-priority").value;
  const dueDateInput = document.getElementById("task-due-date").value;

  if (taskInput.trim() === "") return; // Ignore empty submissions

  // Create task element
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `<strong>${taskInput}</strong> - Due: ${dueDateInput} `;
  taskItem.style.color = getPriorityColor(priorityInput);

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", () => taskItem.remove());

  // Append elements
  taskItem.appendChild(deleteBtn);
  taskList.appendChild(taskItem);

  // Reset form
  taskForm.reset();
});

// Function to determine priority color
function getPriorityColor(priority) {
  switch (priority) {
    case "high": return "red";
    case "medium": return "orange";
    case "low": return "green";
    default: return "black";
  }
}

});
