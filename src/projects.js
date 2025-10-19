export const ProjectManager = () => {
  let projects = [];

  const addProject = (project) => {
    projects.push(project);
  };

  const deleteProject = (project) => {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i] === project) {
        projects.splice(i, 1);
      }
    }
  };

  const getProjects = () => projects;

  const projectCount = () => projects.length;

  const isValidName = (projectName) => {
    if (projectName === "") return false;
    for (const project of projects) {
      if (projectName === project.getName()) {
        return false;
      }
    }
    return true;
  };

  const saveProjects = () => {
    const projectStorage = [];
    for (let i = 0; i < projectCount(); i++) {
      if (projects[i].todoCount() === 0) {
        projectStorage.push([projects[i].getName()]);
      }
      for (const todo of projects[i].todos()) {
        projectStorage.push([
          projects[i].getName(),
          todo.getTitle(),
          todo.getDescription(),
          todo.getDate(),
          todo.getPriority(),
          todo.isComplete(),
        ]);
      }
    }
    localStorage.setItem("projects", JSON.stringify(projectStorage));
  };

  const retrieveStorage = () => {
    const savedProjects = JSON.parse(localStorage.getItem("projects"));
    if (savedProjects === null) {
      addProject(project("Project 1"));
      return;
    }
    for (let i = 0; i < savedProjects.length; i++) {
      const projectName = savedProjects[i][0];
      savedProjects[i].shift();
      const todoData = savedProjects[i];

      if (isValidName(projectName)) {
        const projectObj = project(projectName);
        if (todoData.length > 0) {
          const newTodo = todo(...todoData);
          projectObj.addTodo(newTodo);
        }
        addProject(projectObj);
      } else {
        for (const existingProject of projects) {
          if (existingProject.getName() === projectName) {
            const newTodo = todo(...todoData);
            existingProject.addTodo(newTodo);
          }
        }
      }
    }
  };

  return {
    addProject,
    deleteProject,
    projectCount,
    getProjects,
    isValidName,
    saveProjects,
    retrieveStorage,
  };
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

export const todo = (
  title,
  description = "",
  dueDate,
  priority,
  completed = false
) => {
  const id = crypto.randomUUID();
  const setTitle = (newTitle) => (title = newTitle);
  const setDescription = (newDescription) => (description = newDescription);
  const setDate = (newDate) => (dueDate = newDate);
  const setPriority = (newPriority) => (priority = newPriority);
  const toggleComplete = () => (completed = !completed);

  const getTitle = () => title;
  const getDescription = () => description;
  const getDate = () => dueDate;
  const getPriority = () => priority;
  const isComplete = () => completed;

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
    toggleComplete,
    isComplete,
  };
};
