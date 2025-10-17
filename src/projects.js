export const ProjectManager = () => {
  const projects = [];

  const addProject = (project) => {
    projects.push(project);
  };

  const deleteProject = (project) => {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === project.id) {
        projects.splice(i, 1);
      }
    }
  };

  return { addProject, deleteProject, projects };
};

export const project = (name) => {
  const todoList = [];
  const id = crypto.randomUUID();

  const setName = (newName) => (name = newName);

  const getName = () => name;

  const addTodo = (todo) => todoList.push(todo);

  const deleteTodo = (todo) => {
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === todo.id) {
        todoList.splice(i, 1);
      }
    }
  };

  return { setName, addTodo, deleteTodo, getName, todoList, id };
};

export const todo = (title, description = "", dueDate, priority) => {
  const id = crypto.randomUUID();
  const setTitle = (newTitle) => (title = newTitle);
  const setDescription = (newDescription) => (description = newDescription);
  const setDate = (newDate) => (dueDate = newDate);
  const setPriority = (newPriority) => (priority = newPriority);

  const getTitle = () => title;
  const getDescription = () => description;
  const getDate = () => dueDate;
  const getPriority = () => priority;

  return { setTitle, setDescription, setDate, setPriority, getTitle, getDescription, getDate, getPriority, id };
};
