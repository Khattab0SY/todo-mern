import { TODO } from "./types/todoType";
import Todo from "./components/Todo";
import useTodos from "./hooks/useTodos";
import AddTodo from "./components/AddTodo";

const App = () => {

  const { todos, newTodo, setNewTodo, addTodo, updateTodo, deleteTodo } = useTodos();

  return (
    <div className="py-20 flex flex-col justify-center items-center">
      <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo}/>
      <div className="flex flex-col gap-4 py-4">
        <p className="text-white">Tasks to do - {todos.length}</p>
        {todos.map((todo: TODO) => {
          return (
            <Todo
              key={todo._id}
              todo={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
