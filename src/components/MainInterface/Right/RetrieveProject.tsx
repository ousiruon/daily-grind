import { useState, useEffect } from "react";
import { IntialState, Project, ToDo } from "../../../Store/reducer";
import RetrieveTodo from "./RetrieveTodo";
import {
  MdPushPin,
  MdOutlinePushPin,
  MdOutlineEdit,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToDoExistingProject,
  deleteProject,
  deleteTagFromProject,
  setEditingProject,
  setPinnedProject,
  setProjectTitle,
  updateTagExistingProject,
} from "../../../Store/actions";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckboxOutline } from "react-icons/io";
import { GoPlus } from "react-icons/go";
const RetrieveProject = ({ project }: { project: Project }) => {
  const dispatch = useDispatch();
  const [activeHover, setActiveHover] = useState<null | number>(null);
  const isEditing = useSelector(
    (state: IntialState) => state.options.editinProject
  );
  const allTags = useSelector((state: IntialState) => state.tags);
  const [sortedTodos, setSortedTodos] = useState<ToDo[] | []>([]);
  const [tagsArray, setTagsArray] = useState<any[]>([]);
  const [splicedTagsArray, setSplicedTagsArray] = useState<any[]>([]);
  const [tagsInProjectEdit, setTagsInProjectEdit] = useState<
    { id: number; title: string; selected: boolean }[]
  >([]);
  const [deleteTagHover, setDeleteTagHover] = useState<null | string>(null);
  const [isTagOpen, setIsTagOpen] = useState<{
    state: boolean;
    id: number | null;
  }>({ state: false, id: null });
  useEffect(() => {
    project.toDos.sort((a, b) => {
      if (a.completed !== b.completed) {
        return Number(a.completed) - Number(b.completed);
      }
      return b.order - a.order;
    });
    setSortedTodos(project.toDos);
  }, [project]);
  useEffect(() => {
    const uniqueTagTitles = project.tags
      .filter((tagId, index, self) => self.indexOf(tagId) === index)
      .map((tagId) => {
        const foundTag = allTags.find((tag) => tag.id === tagId);
        return {
          id: foundTag?.id,
          title: foundTag?.title,
        };
      });
    setTagsArray(uniqueTagTitles);
  }, [allTags, project.tags]);
  useEffect(() => {
    if (isEditing.editing && isEditing.projectId === project.id) {
      setSplicedTagsArray(tagsArray);
    } else if (tagsArray.length > 3) {
      const splicedTags = [...tagsArray].slice(0, 3);
      setSplicedTagsArray(splicedTags);
    } else {
      setSplicedTagsArray(tagsArray);
    }
  }, [tagsArray, isEditing]);
  useEffect(() => {
    const allTagsInProject = [...allTags].map((tag) =>
      tagsArray.find((projectTag) => projectTag.id === tag.id)
        ? { ...tag, selected: true }
        : { ...tag, selected: false }
    );
    setTagsInProjectEdit(allTagsInProject);
  }, [isTagOpen, allTags, project.tags]);
  useEffect(() => {
    const singleTasks = document.getElementsByClassName(
      "singleTask"
    ) as HTMLCollectionOf<HTMLElement>;
    if (singleTasks.length > 0) {
      singleTasks[0].focus();
    }
  }, [sortedTodos]);
  const updateProjectTitle =
    (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const newTitle = event.currentTarget.value;
      if (newTitle.trim() === "") {
        return;
      } else {
        dispatch(setProjectTitle(id, newTitle));
      }
    };
  const updateTagsInProject = (tagId: number) => {
    const updatedTags = tagsInProjectEdit.map((tag) =>
      tag.id === tagId ? { ...tag, selected: !tag.selected } : tag
    );
    setTagsInProjectEdit(updatedTags);
  };
  const closeTagModal = (id: number) => {
    if (tagsInProjectEdit.length === 0) return;
    const selectedTags: number[] = tagsInProjectEdit
      .map((tag) => (tag.selected ? tag.id : null))
      .filter((tag) => tag !== null);
    dispatch(updateTagExistingProject(selectedTags, id));
    setIsTagOpen({ state: false, id: null });
  };
  const newTaskExistingProject = (projectId: number) => {
    const newTask = document.getElementById("ToDoInput") as HTMLInputElement;
    if (newTask.value.trim() === "") {
      return;
    } else {
      const maxOrder = sortedTodos.reduce(
        (max, task) => (task.order > max ? task.order : max),
        0
      );
      dispatch(
        addToDoExistingProject(
          {
            id: Date.now(),
            order: maxOrder + 2,
            title: newTask.value,
            completed: false,
            projectId: projectId,
          },
          projectId
        )
      );
      newTask.value = "";
    }
  };

  return (
    <>
      {isEditing.editing && isEditing.projectId === project.id && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-1"></div>
      )}
      <motion.div
        onHoverStart={() => setActiveHover(project.id)}
        onHoverEnd={() => setActiveHover(null)}
        className={`flex flex-col w-full md:w-[calc(50%-10px)] xl:w-[350px] gap-4 border-1 rounded p-5 ${
          isEditing.editing && isEditing.projectId === project.id
            ? "shadow-md fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-2 bg-light-bg dark:bg-dark-bg border-light-text dark:border-dark-text max-w-[90%] max-h-[90vh] overflow-x-hidden overflow-y-auto"
            : "relative"
        } transition-all duration-300 ease-in-out`}
      >
        <div
          onClick={() =>
            isEditing.editing && isEditing.projectId === project.id
              ? dispatch(setEditingProject(false, null))
              : dispatch(setPinnedProject(project.id))
          }
          className={`absolute top-2 right-2 cursor-pointer flex items-center justify-center rounded-full p-2 hover:bg-light-text hover:dark:bg-dark-text hover:text-light-bg hover:dark:text-dark-accent  opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out ${
            activeHover === project.id ? "block" : "hidden"
          }`}
        >
          {isEditing.editing && isEditing.projectId === project.id ? (
            <RxCross2 />
          ) : project.pinned ? (
            <MdPushPin />
          ) : (
            <MdOutlinePushPin />
          )}
        </div>
        {project.title && (
          <div className="text-lg font-bold w-3/4">
            {isEditing.editing && isEditing.projectId === project.id ? (
              <>
                <input
                  onChange={updateProjectTitle(project.id)}
                  className="outline-0"
                  id="tagEditInput"
                  type="text"
                  defaultValue={project.title}
                />
              </>
            ) : (
              <>
                <div className="inline">{project.title}</div>
                <div
                  onClick={() => {
                    dispatch(setEditingProject(true, project.id));
                  }}
                  className={`${
                    activeHover === project.id ? "inline-block" : "hidden"
                  } ml-2 cursor-pointer`}
                >
                  <MdOutlineEdit />
                </div>
              </>
            )}
          </div>
        )}
        {sortedTodos &&
          (sortedTodos.length > 0 ||
            (isEditing.editing && isEditing.projectId === project.id)) && (
            <div className="flex flex-col gap-2 text-sm">
              {isEditing.editing && isEditing.projectId === project.id && (
                <div className="flex gap-2 items-center" id="ToDosInput">
                  <GoPlus size={20} />
                  <input
                    id="ToDoInput"
                    className="text-xs w-full py-1 text-light-text dark:text-dark-text outline-0 focus:outline-0"
                    placeholder="Enter a new task..."
                    type="text"
                  />
                </div>
              )}
              {sortedTodos.map((todo: ToDo) => (
                <RetrieveTodo
                  key={todo.id}
                  toDo={todo}
                  projectID={project.id}
                />
              ))}
              {splicedTagsArray.length > 0 && (
                <div className="text-xs flex flex-wrap gap-2">
                  {splicedTagsArray.map((tag, index) => (
                    <motion.span
                      onHoverStart={() =>
                        setDeleteTagHover(`${tag.title}${index}`)
                      }
                      onHoverEnd={() => setDeleteTagHover(null)}
                      key={tag.id || `${tag.title}${index}`}
                      className="relative text-[10px] opacity-70 px-2 py-1 border-1 rounded-full"
                    >
                      {tag.title}
                      <div
                        onClick={() =>
                          dispatch(deleteTagFromProject(tag.id, project.id))
                        }
                        className={`absolute top-[50%] right-2 translate-y-[-50%] bg-light-text text-light-bg dark:bg-dark-text dark:text-dark-accent rounded cursor-pointer transition-all duration-300 ease-in-out ${
                          deleteTagHover === `${tag.title}${index}`
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <RxCross2 />
                      </div>
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
          )}
        {isEditing.editing && isEditing.projectId === project.id && (
          <>
            <div className="flex gap-2 items-center justify-between w-full">
              <div
                onClick={() => newTaskExistingProject(project.id)}
                className="text-xs p-2 rounded bg-light-accent dark:bg-dark-accent text-light-bg-2 cursor-pointer"
              >
                Add ToDo
              </div>
              <div
                onClick={() => setIsTagOpen({ state: true, id: project.id })}
                className="text-xs p-2 rounded bg-light-accent dark:bg-dark-accent text-light-bg-2 cursor-pointer"
              >
                Tags
              </div>
              <div
                onClick={() => dispatch(deleteProject(project.id))}
                className="text-xs p-2 rounded bg-light-accent dark:bg-dark-accent text-light-bg-2 cursor-pointer"
              >
                Delete Project
              </div>
            </div>
          </>
        )}
        {isTagOpen.state && isTagOpen.id === project.id && (
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-1"></div>
            <div className="fixed top-20 left-[50%] translate-x-[-50%] dark:bg-dark-bg bg-light-bg z-4 border-1 w-[300px] max-h-[50vh] overflow-x-hidden overflow-y-auto p-6 flex gap-5 flex-col items-start">
              {tagsInProjectEdit.length > 0 && (
                <div className="flex flex-col gap-3 w-full justify-start items-center max-h-[500px]">
                  <div className="flex w-full justify-between items-center px-3 py-2">
                    <div>Add Tags to this project</div>
                    <div
                      onClick={() => closeTagModal(project.id)}
                      className="cursor-pointer"
                    >
                      <RxCross2 />
                    </div>
                  </div>
                  {tagsInProjectEdit.map((tag) => (
                    <div
                      onClick={() => updateTagsInProject(tag.id)}
                      key={tag.id}
                      className="flex px-3 py-2 border-b border-light-text dark:border-dark-text w-full justify-start gap-1 cursor-pointer"
                    >
                      {tag.selected ? (
                        <IoMdCheckboxOutline size={16} />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank size={16} />
                      )}
                      <div className="text-xs">{tag.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};
export default RetrieveProject;
