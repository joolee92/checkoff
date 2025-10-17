import { ProjectManager, project, todo } from "./projects.js";

export const dom = document.createElement("div");

const projectDiv = document.createElement("div");

const projectManager = ProjectManager();

function clearDialog(...inputs) {
  for (const input of inputs) {
    input.value = "";
  }
}

function createTodo(todo, projectDiv, project) {
  const todosDiv = document.createElement("div");
  projectDiv.appendChild(todosDiv);
  project.addTodo(todo);
  updateTodos(project, todosDiv);
}

function addProject(name) {
  const newProject = project(name);
  projectManager.addProject(newProject);
  updateProjects();
}

function updateProjects() {
  projectDiv.innerHTML = "";
  projectDiv.appendChild(addProjectBtn);
  for (const project of projectManager.projects) {
    const newProjectDiv = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = project.getName();
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

      createTodo(newTodo, newProjectDiv, project);

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

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      projectManager.deleteProject(project);
      updateProjects();
    });
    newProjectDiv.appendChild(deleteBtn);
  }
}

function updateTodos(project, todosDiv) {
  for (const todo of project.todoList) {
    todosDiv.innerHTML = "";
    const todoDiv = document.createElement("div");
    const title = document.createElement("h4");
    title.textContent = todo.getTitle();
    const description = document.createElement("p");
    description.textContent = todo.getDescription();
    const dueDate = document.createElement("p");
    dueDate.textContent = todo.getDate();
    const priority = document.createElement("p");
    priority.textContent = todo.getPriority();

    todoDiv.appendChild(title);
    todoDiv.appendChild(description);
    todoDiv.appendChild(dueDate);
    todoDiv.appendChild(priority);

    todosDiv.appendChild(todoDiv);
  }
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
