export function project(name) {
  return {name};
}

export function todo(title, description="", dueDate, priority) {
  return {title, description, dueDate, priority};
}
