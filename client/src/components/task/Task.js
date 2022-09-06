import { FiTrash2 } from "react-icons/fi";
import styled from "styled-components";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

const Task = ({ task }) => {
  const { deleteTaskPressed, setDeleteTaskPressed } = useContext(TaskContext);
  const handleDeleteTask = () => {
    fetch("/api/task", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: task._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDeleteTaskPressed(deleteTaskPressed + 1);
      })
      .catch((err) => console.log(err));
  };
  return (
    <TaskContainer>
      <p className="task">{task.task}</p>
      <FiTrash2 className="trash" onClick={handleDeleteTask} />
    </TaskContainer>
  );
};

const TaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px;
  gap: 15px;

  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  .task {
    max-width: 300px;
    word-wrap: break-word;
  }
  .trash {
    cursor: pointer;
  }
`;

export default Task;
