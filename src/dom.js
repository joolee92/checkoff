import { ProjectManager, project, todo } from "./projects.js";

export const dom = document.createElement("div");

const projectDiv = document.createElement("div");

const projectManager = ProjectManager();

const todoDialog = () => {
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

  dialog.appendChild(confirmBtn);

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    dialog.close();
    titleInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    priorityInput.value = "";
  });

  dialog.appendChild(cancelBtn);

  const div = () => dialog;
  const getTitle = () => titleInput.value;
  const getDescription = () => descriptionInput.value;
  const getDate = () => dateInput.value;
  const getPriority = () => priorityInput.value;

  const setTitle = (newTitle) => (titleInput.value = newTitle);
  const setDescription = (newDescription) =>
    (descriptionInput.value = newDescription);
  const setDate = (newDate) => (dateInput.value = newDate);
  const setPriority = (newPriority) => (priorityInput.value = newPriority);

  const clear = () => {
    titleInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    priorityInput.value = "";
  };

  return {
    div,
    getTitle,
    getDescription,
    getDate,
    getPriority,
    clear,
    confirmBtn,
    setTitle,
    setDescription,
    setDate,
    setPriority,
  };
};

function addProject(name) {
  const newProject = project(name);
  projectManager.addProject(newProject);
  updateProjects();
}

function updateProjects() {
  projectDiv.innerHTML = "";
  projectDiv.appendChild(addProjectBtn);
  for (const project of projectManager.projects) {
    const todosDiv = document.createElement("div");
    const newProjectDiv = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = project.getName();
    newProjectDiv.appendChild(h2);
    projectDiv.appendChild(newProjectDiv);

    const todoMenu = todoDialog();
    const dialog = todoMenu.div();
    projectDiv.appendChild(dialog);

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

    newProjectDiv.appendChild(todosDiv);

    updateTodos(project, todosDiv);

    todoMenu.confirmBtn.addEventListener("click", () => {
      const newTodo = todo(
        todoMenu.getTitle(),
        todoMenu.getDescription(),
        todoMenu.getDate(),
        todoMenu.getPriority()
      );

      project.addTodo(newTodo);
      todosDiv.innerHTML = "";
      updateTodos(project, todosDiv);

      dialog.close();

      todoMenu.clear();
    });
  }
}

function updateTodos(project, todosDiv) {
  for (const todo of project.todoList) {
    const todoMenu = todoDialog();
    const dialog = todoMenu.div();

    todosDiv.appendChild(dialog);

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

    const btnDiv = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    btnDiv.appendChild(editBtn);

    editBtn.addEventListener("click", () => {
      todoMenu.setTitle(todo.getTitle());
      todoMenu.setDescription(todo.getDescription());
      todoMenu.setDate(todo.getDate());
      todoMenu.setPriority(todo.getPriority());
      dialog.showModal();
    });

    todoMenu.confirmBtn.addEventListener("click", () => {
        todosDiv.innerHTML = "";
        todo.setTitle(todoMenu.getTitle());
        todo.setDescription(todoMenu.getDescription());
        todo.setDate(todoMenu.getDate());
        todo.setPriority(todoMenu.getPriority());
        updateTodos(project, todosDiv);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    btnDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
      project.deleteTodo(todo);
      todosDiv.removeChild(todoDiv);
      todosDiv.removeChild(btnDiv);
    });

    todosDiv.appendChild(todoDiv);
    todosDiv.appendChild(btnDiv);
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
