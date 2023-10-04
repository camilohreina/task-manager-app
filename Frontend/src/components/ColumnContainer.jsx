import PropTypes from "prop-types";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";
export function ColumnContainer({
  column,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) {
  ColumnContainer.propTypes = {
    column: PropTypes.object,
    createTask: PropTypes.func,
    deleteTask: PropTypes.func,
    updateTask: PropTypes.func,
    tasks: PropTypes.array,
  };

  return (
    <div className="bg-columnBackgroundColor opacity-40 border-2 border-pink-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex justify-center items-cente bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {column.title}
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            createTask(column.id);
          }}
          className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        >
          <PlusIcon />
          Add task
        </button>
      </div>
    </div>
  );
}
