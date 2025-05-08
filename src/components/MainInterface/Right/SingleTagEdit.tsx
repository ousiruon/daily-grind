import { RxCross2 } from "react-icons/rx";
import { Tag } from "../../../Store/reducer";
import { useDispatch } from "react-redux";
import { deleteTag, updateTag } from "../../../Store/actions";

const SingleTagEdit = ({ tag }: { tag: Tag }) => {
  const dispatch = useDispatch();
  const updateTagChange =
    (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const newTagTitle = event.currentTarget.value;
      if (newTagTitle.trim() === "") {
        return;
      } else {
        dispatch(updateTag(id, newTagTitle));
      }
    };
  return (
    <>
      <div className="flex justify-between text-xs py-1 px-2 text-light-text dark:text-dark-text outline-0 focus:outline-0 w-full">
        <input
          onChange={updateTagChange(tag.id)}
          className="outline-0"
          name="tagEditInput"
          type="text"
          defaultValue={tag.title}
        />
        <div
          className="cursor-pointer"
          onClick={() => dispatch(deleteTag(tag.id))}
        >
          <RxCross2 />
        </div>
      </div>
    </>
  );
};
export default SingleTagEdit;
