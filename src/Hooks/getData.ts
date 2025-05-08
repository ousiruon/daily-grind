import { Project, ToDo } from "../Store/reducer";
import { useLocalStorage } from "./useLocalStorage";
import { tags, todos } from "./MockData";
import { projects } from "./MockData";
export function getData(type: "projects"): Project[];
export function getData(type: "tags"): ToDo[];
export function getData(type: "todos", secondArg: number): ToDo[];
export function getData(type: string, secondArg?: number | number[]): unknown {
  if (type === "projects") {
    const currentProjects = useLocalStorage("projects").getItem() || projects;
    return [...currentProjects].sort((a, b) => {
      if (a.completed !== b.completed) {
        return Number(a.completed) - Number(b.completed);
      }
      return b.order - a.order;
    });
  }
  if (type === "todos") {
    const currentTodos = useLocalStorage("todos").getItem() || todos;
    const toDoByID = [...currentTodos].filter(
      (toDo) => toDo.projectId === secondArg
    );
    toDoByID.sort((a, b) => {
      if (a.completed !== b.completed) {
        return Number(a.completed) - Number(b.completed);
      }
      return b.order - a.order;
    });
    return toDoByID;
  }
  if (type === "tags") {
    const currentTags = useLocalStorage("tags").getItem() || tags;
    return currentTags;
  }
  return [];
}
