export function project(name) {
  const todoList = [];

  const addTodo = (todo) => todoList.push(todo);

  return {name, todoList};
}

export function todo(title, description="", dueDate, priority) {
  return {title, description, dueDate, priority};
}
