import { Project, ToDo } from "./reducer";
//CONST to make call easier in my components
export const DARKMODE = "DARKMODE";
export const SIGNIN = "SIGNIN";
export const FORMACTIVE = "FORMACTIVE";
export const TAGSELECTED = "TAGSELECTED";
export const EDITINGTAGS = "EDITINGTAGS";
export const DELETETAGFROMPROJECT = "DELETETAGFROMPROJECT";
export const ADDNEWTAG = "ADDNEWTAG";
export const DELETETAG = "DELETETAG";
export const UPDATETAG = "UPDATETAG";
export const UPDATETAGEXISTINGPROJECT = "UPDATETAGEXISTINGPROJECT";
export const ADDPROJECT = "ADDPROJECT";
export const PINNEDPROJECT = "PINNEDPROJECT";
export const EDITINGPROJECT = "EDITINGPROJECT";
export const UPDATEPROJECTTITLE = "UPDATEPROJECTTITLE";
export const ADDTODOEXISTINGPROJECT = "ADDTODOEXISTINGPROJECT";
export const DELETEPROJECT = "DELETEPROJECT";
export const CHECKTODO = "CHECKTODO";
export const DELETETODO = "DELETETODO";
export const UPDATETODO = "UPDATETODO";
export const MOBILEMENU = "MOBILEMENU";
//Functions to simplify dispatch requests
export const setDarkMode = (darkMode: boolean) => ({
  type: DARKMODE,
  payload: darkMode,
});
export const setSignIn = (signedIn: boolean) => ({
  type: SIGNIN,
  payload: signedIn,
});
export const setProjectForm = (formActive: boolean) => ({
  type: FORMACTIVE,
  payload: formActive,
});
export const setSelectedTag = (tag: null | number) => ({
  type: TAGSELECTED,
  payload: tag,
});
export const setEditingTag = (editingTag: boolean) => ({
  type: EDITINGTAGS,
  payload: editingTag,
});
export const deleteTagFromProject = (tagId: number, projectId: number) => ({
  type: DELETETAGFROMPROJECT,
  payload: { tagId, projectId },
});
export const updateTagExistingProject = (
  tags: number[],
  projectId: number
) => ({
  type: UPDATETAGEXISTINGPROJECT,
  payload: { tags, projectId },
});
export const addNewTag = (newTag: { id: number; title: string }) => ({
  type: ADDNEWTAG,
  payload: newTag,
});
export const deleteTag = (tagId: number) => ({
  type: DELETETAG,
  payload: tagId,
});
export const updateTag = (tagId: number, newTitle: string) => ({
  type: UPDATETAG,
  payload: { tagId, newTitle },
});
export const addNewProject = (newProject: Project) => ({
  type: ADDPROJECT,
  payload: newProject,
});
export const setPinnedProject = (projectId: number) => ({
  type: PINNEDPROJECT,
  payload: projectId,
});
export const setEditingProject = (
  editing: boolean,
  projectId: number | null
) => ({
  type: EDITINGPROJECT,
  payload: { editing, projectId },
});
export const setProjectTitle = (projectId: number, newTitle: string) => ({
  type: UPDATEPROJECTTITLE,
  payload: { projectId, newTitle },
});
export const addToDoExistingProject = (newToDo: ToDo, projectId: number) => ({
  type: ADDTODOEXISTINGPROJECT,
  payload: { newToDo, projectId },
});
export const deleteProject = (projectId: number) => {
  return {
    type: DELETEPROJECT,
    payload: projectId,
  };
};
export const checkToDo = (todoId: number, projectId: number) => ({
  type: CHECKTODO,
  payload: { todoId, projectId },
});
export const deleteToDo = (todoId: number, projectId: number) => ({
  type: DELETETODO,
  payload: { todoId, projectId },
});
export const updateToDo = (todoId: number, newTitle: string) => ({
  type: UPDATETODO,
  payload: { todoId, newTitle },
});
export const setMobileMenu = (mobileMenu: boolean) => ({
  type: MOBILEMENU,
  payload: mobileMenu,
});
