document.addEventListener("DOMContentLoaded", () => {
  // Select form and task list
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");

  form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevents page reload

      // Get task input value
      const taskInput = document.getElementById("new-task-description");
      const taskText = taskInput.value.trim();

      if (taskText === "") return; // Stop if input is empty
      
      addTask(taskText);
      
      // Clear input field after adding task
      taskInput.value = "";
  });

  // Function to add a task to the list
  function addTask(taskText) {
      const listItem = document.createElement("li");
      listItem.textContent = taskText;

      // Create delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.style.marginLeft = "10px";
      deleteButton.addEventListener("click", function() {
          listItem.remove();
      });

      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);
  }
});
