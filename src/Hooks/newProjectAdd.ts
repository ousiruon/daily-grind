import { Project } from "../Store/reducer";
import { addNewProject } from "../Store/actions";

export const newProjectAdd = (
  event: React.FormEvent<HTMLFormElement>,
  setToDosInput: any,
  projects: Project[] | [],
  selectedTagsInNewProject: number[] | null,
  dispatch: any
) => {
  //Prevent reload after button is clicked
  event.preventDefault();
  const toDoTitle = event.currentTarget.querySelector(
    "#toDoTitle"
  ) as HTMLInputElement;
  const submitEvent = event.nativeEvent as SubmitEvent;
  const submitter = submitEvent.submitter as HTMLButtonElement;
  //Check which button is clicked
  if (submitter.name === "newToDo") {
    setToDosInput((prev: []) => [...prev, ""]);
  } else if (submitter.name === "newProject") {
    const allToDos: NodeListOf<Element> =
      event.currentTarget.querySelectorAll(".task");
    const newToDos = Array.from(allToDos).map((toDo, index) => ({
      id: index,
      order: index,
      title: (toDo as HTMLInputElement).value,
      completed: false,
      projectId: Date.now(),
    }));
    //Create a const with all data for the new project
    const newProject: Project = {
      id: Date.now(),
      order: projects.length + 1,
      title: toDoTitle ? toDoTitle.value : "",
      completed: false,
      pinned: false,
      tags: selectedTagsInNewProject || [],
      toDos: newToDos,
    };
    //Store it in redux store
    dispatch(addNewProject(newProject));
    //Reset after data was stored
    setToDosInput([""]);
    if (toDoTitle) toDoTitle.value = "";
  } else if (submitter.name === "reset") {
    setToDosInput([""]);
    if (toDoTitle) toDoTitle.value = "";
  }
};
