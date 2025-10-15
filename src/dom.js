import {project, todo} from "./projects.js";

const project1 = project("Project 1");
export const dom = document.createElement("div");

const projectDiv = document.createElement("div");

const projectHeader = document.createElement("h3");
projectHeader.textContent = project1.name;

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
    const newTodo = todo(titleInput.value, descriptionInput.value, dateInput.value, priorityInput.value);
    console.log(newTodo.priority);
});

dialog.appendChild(confirmBtn);

const cancelBtn = document.createElement("button");
cancelBtn.textContent = "Cancel";
cancelBtn.addEventListener("click", () => {
    dialog.close();
});

dialog.appendChild(cancelBtn);


const addTodoBtn = document.createElement("button");
addTodoBtn.textContent = "Add Todo";

addTodoBtn.addEventListener("click", () => {
    dialog.showModal();
});


projectDiv.appendChild(dialog);
projectDiv.appendChild(projectHeader);
projectDiv.appendChild(addTodoBtn);






dom.appendChild(projectDiv);

