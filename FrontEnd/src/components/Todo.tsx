import { MdDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";

const Todo = ({
  todo,
  updateTodo,
  deleteTodo,
}: {
  todo: { _id: string; todo: string };
  updateTodo: (id: string, currentText: string) => void;
  deleteTodo: (id: string) => void;
}) => {
  return (
    <div
      className="bg-primary w-96 py-4 px-6 rounded-xl flex justify-between items-center"
      key={todo._id}
    >
      <p>{todo.todo}</p>
      <div className="flex gap-4 justify-center items-center">
        <RiEditFill
          onClick={() => updateTodo(todo._id, todo.todo)}
          className="text-xl duration-300 hover:text-secondary/60 cursor-pointer"
        />
        <MdDelete
          onClick={() => deleteTodo(todo._id)}
          className="text-2xl duration-300 hover:text-secondary/60 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Todo;
