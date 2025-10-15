import { project, todo } from "./projects.js";

export const dom = document.createElement("div");

const projectDiv = document.createElement("div");

function clearDialog(...inputs) {
    for (const input of inputs) {
        input.value = "";
    }
}

function addTodo(todo, project) {
    const todoDiv = document.createElement("div");
    const title = document.createElement("h4");
    title.textContent = todo.title;
    const description = document.createElement("p");
    description.textContent = todo.description;
    const dueDate = document.createElement("p");
    dueDate.textContent = todo.dueDate;
    const priority = document.createElement("p");
    priority.textContent = todo.priority;

    todoDiv.appendChild(title);
    todoDiv.appendChild(description);
    todoDiv.appendChild(dueDate);
    todoDiv.appendChild(priority);

    project.appendChild(todoDiv);
}

function addProject(name) {

    const newProject = project(name);

  const newProjectDiv = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.textContent = name;
  newProjectDiv.appendChild(h2);
  projectDiv.appendChild(newProjectDiv);

  const dialog = document.createElement("dialog");

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Name";
  const titleInput = document.createElement("input");
  titleLabel.appendChild(titleInput);

  dialog.appendChild(titleLabel);

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description";
  const descriptionInput = document.createElement("input");
  descriptionLabel.appendChild(descriptionInput);

  dialog.appendChild(descriptionLabel);

  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Date";
  const dateInput = document.createElement("input");
  dateLabel.appendChild(dateInput);

  dialog.appendChild(dateLabel);

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority";
  const priorityInput = document.createElement("input");
  priorityLabel.appendChild(priorityInput);

  dialog.appendChild(priorityLabel);

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Confirm";
  confirmBtn.addEventListener("click", () => {
    const newTodo = todo(
      titleInput.value,
      descriptionInput.value,
      dateInput.value,
      priorityInput.value
    );

    addTodo(newTodo, newProjectDiv);

    dialog.close();

    clearDialog(titleInput, descriptionInput, dateInput, priorityInput);
  });

  dialog.appendChild(confirmBtn);

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    dialog.close();
    clearDialog(titleInput, descriptionInput, dateInput, priorityInput);
  });

  dialog.appendChild(cancelBtn);

  const addTodoBtn = document.createElement("button");
  addTodoBtn.textContent = "Add Todo";

  addTodoBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  newProjectDiv.appendChild(dialog);
  newProjectDiv.appendChild(addTodoBtn);
}

const addProjectBtn = document.createElement("button");
addProjectBtn.textContent = "Add Project";
addProjectBtn.addEventListener("click", () => {
  const projectDialog = document.createElement("dialog");
  projectDiv.appendChild(projectDialog);
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Project name: ";
  const nameInput = document.createElement("input");
  nameLabel.appendChild(nameInput);
  projectDialog.appendChild(nameLabel);

  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Confirm";
  confirmBtn.addEventListener("click", () => {
    addProject(nameInput.value);
    projectDialog.close();
  });

  projectDialog.appendChild(confirmBtn);

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    projectDialog.close();
  });

  projectDialog.appendChild(cancelBtn);

  projectDialog.showModal();
});

projectDiv.appendChild(addProjectBtn);

dom.appendChild(projectDiv);
