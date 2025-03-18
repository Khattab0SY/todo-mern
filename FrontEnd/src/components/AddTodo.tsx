import { IoAdd } from "react-icons/io5";

interface AddTodoProps {
  newTodo: string;
  addTodo: () => void;
  setNewTodo: (value: string) => void;
}

const AddTodo = ({ newTodo, addTodo, setNewTodo }: AddTodoProps) => {
  return (
    <div className="w-96 flex gap-2">
      <input
        type="text"
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
        placeholder="Add a new task"
        className="px-3 py-2 bg-none outline-none border-2 border-disable rounded-md placeholder:text-white/30 text-white w-full"
      />
      <button
        onClick={addTodo}
        className="w-13 flex justify-center items-center bg-secondary hover:bg-secondary/70 duration-300 cursor-pointer rounded-lg"
      >
        <IoAdd className="text-white text-2xl" />
      </button>
    </div>
  );
};

export default AddTodo;
