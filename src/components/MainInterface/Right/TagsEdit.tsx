import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IntialState } from "../../../Store/reducer";
import { addNewTag, setEditingTag } from "../../../Store/actions";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import SingleTagEdit from "./SingleTagEdit";
import { RxCross2 } from "react-icons/rx";

const TagsEdit = () => {
  const tags = useSelector((state: IntialState) => state.tags).sort(
    (a, b) => b.id - a.id
  );
  const dispatch = useDispatch();
  const formSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newTagTitle = form.newTagTitle.value;
    if (newTagTitle.trim() === "") {
      return;
    } else {
      dispatch(addNewTag({ id: Date.now(), title: newTagTitle }));
      form.reset();
      form.newTagTitle.focus();
    }
  };
  useEffect(() => {
    useLocalStorage("tags").setItem(tags);
  }, [tags]);
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-1">
      </div>
      <div className="fixed top-[50%] left-[50%] translate-[-50%] dark:bg-dark-bg bg-light-bg z-2  border-1 w-[300px] max-h-[50vh] overflow-x-hidden overflow-y-auto p-6 flex gap-5 flex-col items-start">
        <div className="relative text-lg font-semibold w-full flex justify-between items-center">
          <div>Edit Tags</div>
          <div
            className="cursor-pointer"
            onClick={() => dispatch(setEditingTag(false))}
          >
            <RxCross2 />
          </div>
        </div>
        <form
          onSubmit={formSubmitted}
          className="w-full flex flex-col justify-center items-center"
        >
          <input
            className="task text-xs border-1 p-2 text-light-text dark:text-dark-text outline-0 focus:outline-0 w-full"
            placeholder="Enter a new tag..."
            type="text"
            name="newTagTitle"
          />
          <button
            type="submit"
            className="text-xs py-1 border-1 border-light-text bg-light-text text-light-bg-2 w-full cursor-pointer"
          >
            Add tag
          </button>
        </form>
        {tags && tags.length > 0 ? (
          tags.map((tag) => <SingleTagEdit key={tag.id} tag={tag} />)
        ) : (
          <div className="text-xs opacity-50">No tags found</div>
        )}
      </div>
    </>
  );
};
export default TagsEdit;
