import { getData } from "../Hooks/getData";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import {
  ADDNEWTAG,
  ADDPROJECT,
  ADDTODOEXISTINGPROJECT,
  CHECKTODO,
  DARKMODE,
  DELETEPROJECT,
  DELETETAG,
  DELETETAGFROMPROJECT,
  DELETETODO,
  EDITINGPROJECT,
  EDITINGTAGS,
  FORMACTIVE,
  MOBILEMENU,
  PINNEDPROJECT,
  SIGNIN,
  TAGSELECTED,
  UPDATEPROJECTTITLE,
  UPDATETAG,
  UPDATETAGEXISTINGPROJECT,
  UPDATETODO,
} from "./actions";
//Single ToDo interface
export interface ToDo {
  id: number;
  order: number;
  title: string;
  completed: boolean;
  projectId: number;
}
//Single Project interface
export interface Project {
  id: number;
  order: number;
  title: string;
  completed: boolean;
  pinned: boolean;
  tags: number[];
  toDos: ToDo[];
}
//Tags interface
export interface Tag {
  id: number;
  title: string;
}
//Options interface
export interface Options {
  selectedTag: number | null;
  editingTag: boolean;
  editinProject: {
    editing: boolean;
    projectId: number | null;
  };
  mobileMenu: boolean;
}
//State interface
export interface IntialState {
  darkMode: boolean;
  signedIn: boolean;
  formActive: boolean;
  projects: Project[] | [];
  tags: Tag[] | [];
  options: Options;
}
const options: Options = {
  selectedTag: null,
  editingTag: false,
  editinProject: {
    editing: false,
    projectId: null,
  },
  mobileMenu: false,
};
//Create the initial state for state
const initialState: IntialState = {
  darkMode: false,
  signedIn: useLocalStorage("signedIn").getItem() || false,
  formActive: false,
  projects: getData("projects"),
  tags: getData("tags"),
  options,
};
//Create reducer
export const reducer = (state = initialState, action: any) => {
  if (action.type === DARKMODE) {
    return {
      ...state,
      darkMode: action.payload,
    };
  }
  if (action.type === SIGNIN) {
    return {
      ...state,
      signedIn: action.payload,
    };
  }
  if (action.type === FORMACTIVE) {
    return {
      ...state,
      formActive: action.payload,
    };
  }
  if (action.type === TAGSELECTED) {
    return {
      ...state,
      options: { ...state.options, selectedTag: action.payload },
    };
  }
  if (action.type === EDITINGTAGS) {
    return {
      ...state,
      options: { ...state.options, editingTag: action.payload },
    };
  }
  if (action.type === DELETETAGFROMPROJECT) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          const updatedTags = project.tags.filter(
            (tagId) => tagId !== action.payload.tagId
          );
          return { ...project, tags: updatedTags };
        }
        return project;
      }),
    };
  }
  if (action.type === ADDNEWTAG) {
    return {
      ...state,
      tags: [...state.tags, action.payload],
    };
  }
  if (action.type === DELETETAG) {
    return {
      ...state,
      tags: state.tags.filter((tag) => tag.id !== action.payload),
      projects: state.projects.map((project) => {
        const updatedTags = project.tags.filter(
          (tagId) => tagId !== action.payload
        );
        return { ...project, tags: updatedTags };
      }),
    };
  }
  if (action.type === UPDATETAG) {
    return {
      ...state,
      tags: state.tags.map((tag) => {
        if (tag.id === action.payload.tagId) {
          return { ...tag, title: action.payload.newTitle };
        }
        return tag;
      }),
    };
  }
  if (action.type === UPDATETAGEXISTINGPROJECT) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          return { ...project, tags: action.payload.tags };
        }
        return project;
      }),
    };
  }
  if (action.type === ADDPROJECT) {
    return {
      ...state,
      projects: [...state.projects, action.payload],
    };
  }
  if (action.type === PINNEDPROJECT) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project.id === action.payload) {
          return { ...project, pinned: !project.pinned };
        }
        return project;
      }),
    };
  }
  if (action.type === EDITINGPROJECT) {
    return {
      ...state,
      options: {
        ...state.options,
        editinProject: {
          editing: action.payload.editing,
          projectId: action.payload.projectId,
        },
      },
    };
  }
  if (action.type === UPDATEPROJECTTITLE) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          return { ...project, title: action.payload.newTitle };
        }
        return project;
      }),
    };
  }
  if (action.type === ADDTODOEXISTINGPROJECT) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          return {
            ...project,
            toDos: [...project.toDos, action.payload.newToDo],
          };
        }
        return project;
      }),
    };
  }
  if (action.type === DELETEPROJECT) {
    return {
      ...state,
      projects: state.projects.filter((project) => {
        if (project.id === action.payload) {
          return false;
        }
        return true;
      }),
    };
  }
  if (action.type === CHECKTODO) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          const updatedToDos = project.toDos.map((todo) => {
            if (todo.id === action.payload.todoId) {
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          });
          const allCompleted = updatedToDos.every((todo) => todo.completed);
          return {
            ...project,
            toDos: updatedToDos,
            completed: allCompleted,
          };
        }
        return project;
      }),
    };
  }
  if (action.type === DELETETODO) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          const updatedToDos = project.toDos.filter(
            (todo) => todo.id !== action.payload.todoId
          );
          const allCompleted = updatedToDos.every((todo) => todo.completed);
          return {
            ...project,
            toDos: updatedToDos,
            completed: allCompleted,
          };
        }
        return project;
      }),
    };
  }
  if (action.type === UPDATETODO) {
    return {
      ...state,
      projects: state.projects.map((project) => {
        const updatedToDos = project.toDos.map((todo) => {
          if (todo.id === action.payload.todoId) {
            return { ...todo, title: action.payload.newTitle };
          }
          return todo;
        });
        return { ...project, toDos: updatedToDos };
      }),
    };
  }
  if (action.type === MOBILEMENU) {
    return {
      ...state,
      options: { ...state.options, mobileMenu: action.payload },
    };
  }
  //Return state if no action type is selected otherwise nothing will be returned if the store is called
  return state;
};
