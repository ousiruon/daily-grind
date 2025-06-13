import { IntialState, ToDo } from "../../../Store/reducer";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { checkToDo, deleteToDo, updateToDo } from "../../../Store/actions";
import { RxCross2 } from "react-icons/rx";
import { motion } from "motion/react";
import { useState } from "react";

const RetrieveTodo = ({
  toDo,
  projectID,
}: {
  toDo: ToDo;
  projectID: number;
}) => {
  const dispatch = useDispatch();
  const updateCompleted = (id: number) => {
    dispatch(checkToDo(id, projectID));
    setActive(null);
  };
  const [active, setActive] = useState<null | number>(null);

  const isEditing = useSelector(
    (state: IntialState) => state.options.editinProject
  );
  const updateTodoTitle =
    (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const newTitle = event.currentTarget.value;
      if (newTitle.trim() === "") {
        return;
      } else {
        dispatch(updateToDo(id, newTitle));
      }
    };
  return (
    <>
      <motion.div
        onClick={() =>
          isEditing.editing && isEditing.projectId === projectID
            ? null
            : updateCompleted(toDo.id)
        }
        onHoverStart={() => setActive(toDo.id)}
        onHoverEnd={() => setActive(null)}
        key={toDo.id}
        className="cursor-pointer flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2">
          <div
            onClick={() =>
              isEditing.editing && isEditing.projectId === projectID
                ? updateCompleted(toDo.id)
                : null
            }
          >
            {toDo.completed ? (
              <IoMdCheckboxOutline size={20} />
            ) : (
              <MdOutlineCheckBoxOutlineBlank size={20} />
            )}
          </div>
          {isEditing.editing && isEditing.projectId === projectID ? (
            <input
              onChange={updateTodoTitle(toDo.id)}
              className={`singleTask outline-0 ${toDo.completed ? "line-through" : ""}`}
              name="tagEditInput"
              type="text"
              defaultValue={toDo.title}
            />
          ) : (
            <div
              className={` flex gap-2 ${toDo.completed ? "line-through" : ""}`}
            >
              {toDo.title}
            </div>
          )}
        </div>
        <div
          onClick={() => dispatch(deleteToDo(toDo.id, projectID))}
          className={`${active === toDo.id ? "block" : "block md:hidden"}`}
        >
          <RxCross2 />
        </div>
      </motion.div>
    </>
  );
};
export default RetrieveTodo;
