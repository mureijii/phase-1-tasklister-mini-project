document.addEventListener("DOMContentLoaded", () => {
  // Select form and task list
  const form = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  const prioritySelect = document.getElementById("task-priority");

  // Load tasks from local storage on page load
  loadTasks();

  form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form from refreshing the page

      // Get task description and priority
      const taskInput = document.getElementById("new-task-description");
      const taskText = taskInput.value.trim();
      const priority = prioritySelect.value;

      if (taskText === "") return; // Prevent empty tasks

      // Create task item and save
      addTask(taskText, priority);
      saveTasks();

      // Clear input field
      taskInput.value = "";
      prioritySelect.value = "medium";
  });

  // Function to add a task to the list
  function addTask(taskText, priority) {
      const listItem = document.createElement("li");
      listItem.textContent = taskText;
      listItem.style.color = getPriorityColor(priority);

      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.style.marginLeft = "10px";
      deleteButton.addEventListener("click", () => {
          listItem.remove();
          saveTasks();
      });

      // Add edit button
      const editButton = document.createElement("button");
      editButton.textContent = "✏️";
      editButton.style.marginLeft = "5px";
      editButton.addEventListener("click", () => {
          editTask(listItem, taskText, priority);
      });

      listItem.style.color = getPriorityColor(priority);
      listItem.appendChild(deleteButton);
      listItem.appendChild(editButton);
      taskList.appendChild(listItem);
  }

  // Function to get color based on priority
  function getPriorityColor(priority) {
      switch (priority) {
          case "high": return "red";
          case "medium": return "orange";
          case "low": return "green";
          default: return "black";
      }
  }

  // Function to save tasks to localStorage
  function saveTasks() {
      const tasks = Array.from(taskList.children).map(listItem => ({
          text: listItem.childNodes[0].textContent,
          priority: listItem.style.color
      }));
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to load tasks from localStorage
  function loadTasks() {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      savedTasks.forEach(task => addTask(task.text, getPriorityFromColor(task.color)));
  }

  // Function to get priority from color
  function getPriorityFromColor(color) {
      switch (color) {
          case "red": return "high";
          case "orange": return "medium";
          case "green": return "low";
          default: return "medium";
      }
  }

  // Function to edit tasks
  function editTask(listItem, oldText, priority) {
      const newInput = document.createElement("input");
      newInput.type = "text";
      newInput.value = oldText;
      listItem.innerHTML = "";
      listItem.appendChild(newInput);
      newInput.focus();

      const saveButton = document.createElement("button");
      saveTasks();
      saveTasks();
      saveTasks();
      newInput.addEventListener("keypress", function (event) {
          if (event.key === "Enter" && newInput.value.trim() !== "") {
              listItem.textContent = newInput.value;
              listItem.style.color = getPriorityColor(prioritySelect.value);
              listItem.appendChild(newButton("❌", () => {
                  listItem.remove();
                  saveTasks();
              }));
              listItem.appendChild(newButton("✏️", () => editTask(listItem, newInput.value)));
              saveTasks();
          }
      });
  }

  // Function to create buttons
  function newButton(text, callback) {
      const button = document.createElement("button");
      button.textContent = text;
      button.style.marginLeft = "5px";
      button.addEventListener("click", callback);
      return button;
  }
});