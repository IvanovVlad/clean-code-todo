"use strict";

const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("add-button");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const editButtonsClickHandler = (e) => {
  const target = e.target;
  if (target.matches("button.edit")) {
    editTask(target.closest("li"));
    return;
  }

  if (target.parentElement.matches("button.delete")) {
    deleteTask(target.closest("li"));
  }
};

incompleteTaskHolder.addEventListener("click", editButtonsClickHandler);
completedTasksHolder.addEventListener("click", editButtonsClickHandler);

incompleteTaskHolder.addEventListener("change", (e) => {
  if (!e.target.matches("input[type='checkbox']")) return;
  taskCompleted(e.target.closest("li"));
});

completedTasksHolder.addEventListener("change", (e) => {
  if (!e.target.matches("input[type='checkbox']")) return;
  taskIncomplete(e.target.closest("li"));
});

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task task-label";

  checkBox.type = "checkbox";
  checkBox.className = "task-checkbox";

  editInput.type = "text";
  editInput.className = "task task-edit-input text-input";
  editInput.setAttribute("aria-label", "Edit task");

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Delete";
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value.trim()) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);

  taskInput.value = "";
};

const editTask = function (listItem) {
  const editInput = listItem.querySelector(".task-edit-input");
  const label = listItem.querySelector(".task-label");
  const editBtn = listItem.querySelector(".edit");
  const isInEditMode = listItem.classList.contains("edit-mode");

  if (isInEditMode) {
    const newName = editInput.value.trim();
    if (!newName) return;
    label.innerText = newName;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
};

const deleteTask = function (listItem) {
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function (listItem) {
  completedTasksHolder.appendChild(listItem);
};

const taskIncomplete = function (listItem) {
  incompleteTaskHolder.appendChild(listItem);
};

addButton.onclick = addTask;
