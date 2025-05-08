import { useSelector } from "react-redux";
import { IntialState, Project } from "../../../Store/reducer";
import RetrieveProject from "./RetrieveProject";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { todos } from "../../../Hooks/MockData";
import TagsEdit from "./TagsEdit";

const ProjectsRightMain = () => {
  const [sortedProjects, setSortedProjects] = useState<Project[] | []>([]);
  const [sortedPinnedProjects, setSortedPinnedProjects] = useState<
    Project[] | []
  >([]);
  const projects = useSelector((state: IntialState) => state.projects);
  const options = useSelector((state: IntialState) => state.options);
  const editingTags = useSelector(
    (state: IntialState) => state.options.editingTag
  );
  useEffect(() => {
    const sorted = [...projects].sort((a, b) => {
      if (a.completed !== b.completed) {
        return Number(a.completed) - Number(b.completed);
      }
      return b.order - a.order;
    });
    const pinned = sorted
      .filter((project) => project.pinned)
      .filter((project) => {
        if (options.selectedTag) {
          return project.tags.some(
            (tagId: number) => tagId === options.selectedTag
          );
        }
        return true;
      });
    const others = sorted
      .filter((project) => !project.pinned)
      .filter((project) => {
        if (options.selectedTag) {
          return project.tags.some(
            (tagId: number) => tagId === options.selectedTag
          );
        }
        return true;
      });
    setSortedPinnedProjects(pinned);
    setSortedProjects(others);
    useLocalStorage("projects").setItem(sorted);
    useLocalStorage("todos").setItem(todos);
  }, [projects, options]);
  return (
    <>
      {editingTags && <TagsEdit />}
      {sortedPinnedProjects.length > 0 && (
        <div className="flex w-full flex-col gap-5">
          <div className="text-lg font-bold px-6">Pinned</div>
          <div className="w-full flex flex-wrap justify-start items-start px-6 gap-5">
            {sortedPinnedProjects.map((project: Project) => (
              <RetrieveProject key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
      {sortedProjects.length > 0 && (
        <div className="flex w-full flex-col gap-5">
          <div className="text-lg font-bold px-6">Others</div>
          <div className="w-full flex flex-wrap justify-start items-start px-6 gap-5">
            {sortedProjects.map((project: Project) => (
              <RetrieveProject key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsRightMain;
