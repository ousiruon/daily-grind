import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newProjectAdd } from "../../../Hooks/newProjectAdd";
import { IntialState, Project, Tag } from "../../../Store/reducer";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const UpperRightMain = () => {
  //Call dispatch to make update
  const dispatch = useDispatch();
  //Selectors to select some object elements in the store
  const formActive: Boolean = useSelector(
    (state: IntialState) => state.formActive
  );
  const projects: Project[] | [] = useSelector(
    (state: IntialState) => state.projects
  );
  const tags: Tag[] | [] = useSelector((state: IntialState) => state.tags);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [selectedTagsInNewProject, setSelectedTagsInNewProject] = useState<
    number[] | null
  >(null);
  const closeTagModalNewProject = () => {
    setIsTagOpen(false);
  };
  const addTagToNewProject = (tagId: number) => {
    if (selectedTagsInNewProject?.includes(tagId)) {
      setSelectedTagsInNewProject(
        (prev) => prev?.filter((tag) => tag !== tagId) || null
      );
    } else {
      setSelectedTagsInNewProject((prev) =>
        prev ? [...prev, tagId] : [tagId]
      );
    }
  };
  const [ToDosInput, setToDosInput] = useState<string[]>([""]);
  const formSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
    //If form is submitted execute this hook
    newProjectAdd(
      event,
      setToDosInput,
      projects,
      selectedTagsInNewProject,
      dispatch
    );
    setSelectedTagsInNewProject(null);
  };
  return (
    <>
      <div className="w-full flex justify-center">
        <form
          onSubmit={formSubmitted}
          className="w-full max-w-[600px] text-sm border border-light-text dark:border-dark-text outline-0 rounded-md focus:border-light-accent dark:focus:border-dark-accent shadow-2xs/40 shadow-dark-bg-2 dark:shadow-light-bg-2"
          id="toDoForm"
        >
          <input
            className="w-full py-3 px-6 focus:outline-0 text-light-text dark:text-dark-text"
            type="text"
            placeholder="Enter a project title..."
            name="toDoTitle"
            id="toDoTitle"
          />
          <div className={`${formActive ? "visible" : "hidden"} mb-2 relative`}>
            <div id="ToDosInput">
              {ToDosInput.map((task, index) => (
                <input
                  key={index}
                  value={task}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const updated = [...ToDosInput];
                    updated[index] = e.target.value;
                    setToDosInput(updated);
                  }}
                  className="task text-xs border-t-1 last:border-b-1 w-full py-1 px-6 text-light-text dark:text-dark-text outline-0 focus:outline-0"
                  placeholder="Enter a task..."
                  type="text"
                />
              ))}
            </div>
            <div className="w-full flex justify-between px-6 py-3">
              <div className="flex gap-3">
                <button
                  type="submit"
                  name="newToDo"
                  className="text-xs p-2 rounded bg-light-text text-light-bg-2"
                >
                  New To-Do
                </button>
                <div
                  onClick={() => setIsTagOpen(true)}
                  className="text-xs p-2 rounded bg-light-text text-light-bg-2 cursor-pointer"
                >
                  Tags
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  name="newProject"
                  className="text-xs p-2 rounded bg-light-accent dark:bg-dark-accent text-light-bg-2"
                >
                  Add Project
                </button>
                <button
                  type="submit"
                  name="reset"
                  className="text-xs p-2 rounded bg-light-accent dark:bg-dark-accent text-light-bg-2"
                >
                  Reset
                </button>
                {isTagOpen && (
                  <div className="fixed top-20 left-[50%] translate-x-[-50%] dark:bg-dark-bg bg-light-bg z-2  border-1 w-[300px] max-h-[50vh] overflow-x-hidden overflow-y-auto p-6 flex gap-5 flex-col items-start">
                    {tags.length > 0 && (
                      <div className="flex flex-col gap-3 w-full justify-start items-center max-h-[500px]">
                        <div className="flex w-full justify-between items-center px-3 py-2">
                          <div>Add Tags to this project</div>
                          <div
                            onClick={closeTagModalNewProject}
                            className="cursor-pointer"
                          >
                            <RxCross2 id="closeTagModalNewProject" />
                          </div>
                        </div>
                        {tags.map((tag: Tag) => (
                          <div
                            onClick={() => addTagToNewProject(tag.id)}
                            key={tag.id}
                            className="flex px-3 py-2 border-b border-light-text dark:border-dark-text w-full justify-start gap-1 cursor-pointer"
                          >
                            {selectedTagsInNewProject?.find(
                              (singleTag) => singleTag === tag.id
                            ) ? (
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
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default UpperRightMain;
