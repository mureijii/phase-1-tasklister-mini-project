document.addEventListener("DOMContentLoaded", () => {
  // Select form and task list
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks"); // Ensure this matches the HTML

  form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form from refreshing the page

      // Get task description
      const taskInput = document.getElementById("new-task-description");
      const taskText = taskInput.value.trim();

      if (taskText === "") return; // Prevent empty tasks

      // Create list item
      const listItem = document.createElement("li");
      listItem.appendChild(document.createTextNode(taskText));

      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.addEventListener("click", () => {
          listItem.remove();
      });

      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);

      // Clear input field
      taskInput.value = "";
  });
});
