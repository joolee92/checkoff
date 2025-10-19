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

  const getProjects = () => projects;

  const projectCount = () => projects.length;

  const isValidName = (projectName) => {
    for (const project of projects) {
      if (projectName === project.getName()) {
        return false;
      }
    }
    return true;
  };

  return { addProject, deleteProject, projectCount, getProjects, isValidName };
};

export const project = (name) => {
  const todoList = [];

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

  const checkPriority = (todo) => {
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].getPriority() == todo.getPriority()) {
        const todoIndex = todoList.indexOf(todo);

        const tmp = todoList[i];
        todoList[i] = todo;

        todoList.splice(todoIndex, 1);
        todoList.splice(i + 1, 0, tmp);

        updatePriorities();
        break;
      }
    }
  };

  const updatePriorities = () => {
    for (let i = 0; i < todoList.length; i++) {
      todoList[i].setPriority(i.toString());
    }
  };

  const todos = () => todoList;
  const todoCount = () => todoList.length;

  return {
    setName,
    addTodo,
    deleteTodo,
    getName,
    todos,
    todoCount,
    checkPriority,
    updatePriorities,
  };
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

  return {
    setTitle,
    setDescription,
    setDate,
    setPriority,
    getTitle,
    getDescription,
    getDate,
    getPriority,
    id,
  };
};
