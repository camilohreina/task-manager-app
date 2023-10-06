import { useEffect, useMemo, useState } from "react";
import { ColumnContainer } from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import {
  createTask as createTaskService,
  getTasksByUser,
} from "../services/tasks";

const defaultCols = [
  {
    id: "TODO",
    title: "To Do",
  },
  {
    id: "PROGRESS",
    title: "In Progress",
  },
  {
    id: "DONE",
    title: "Done",
  },
];

const defaultTasks = [
  {
    id: "1",
    columnId: "TODO",
    content: "List admin APIs for dashboard",
  },
  {
    id: "2",
    columnId: "TODO",
    content:
      "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
  },
  {
    id: "3",
    columnId: "PROGRESS",
    content: "Conduct security testing",
  },
  {
    id: "4",
    columnId: "PROGRESS",
    content: "Analyze competitors",
  },
  {
    id: "5",
    columnId: "DONE",
    content: "Create UI kit documentation",
  },
  {
    id: "6",
    columnId: "DONE",
    content: "Dev meeting",
  },
  {
    id: "7",
    columnId: "DONE",
    content: "Deliver dashboard prototype",
  },
  {
    id: "8",
    columnId: "TODO",
    content: "Optimize application performance",
  },
  {
    id: "9",
    columnId: "TODO",
    content: "Implement data validation",
  },
  {
    id: "10",
    columnId: "TODO",
    content: "Design database schema",
  },
  {
    id: "11",
    columnId: "TODO",
    content: "Integrate SSL web certificates into workflow",
  },
  {
    id: "12",
    columnId: "PROGRESS",
    content: "Implement error logging and monitoring",
  },
  {
    id: "13",
    columnId: "PROGRESS",
    content: "Design and implement responsive UI",
  },
];

export default function KanbanBoard() {
  const [columns, setColumns] = useState(defaultCols);
  const [tasks, setTasks] = useState(defaultTasks);

  const [activeColumn, setActiveColumn] = useState(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    async function getTasks() {
      try {
        const tasks = await getTasksByUser();
        console.log(tasks);
        setTasks(tasks);
      } catch (error) {
        console.log(error);
      }
    }
    getTasks();
  }, [tasks.length]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        //change column or status
        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  const createTask = async (columnId) => {
    try {
      const dataTask = await createTaskService({
        columnId,
        content: `Task ${tasks.length + 1}`,
      });
      setTasks([...tasks, dataTask]);
    } catch (error) {
      console.log(error);
    }
  };

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id, content) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  return (
    <div className="text-white bg-slate-900 m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
