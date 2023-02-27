import React, {FC, ChangeEvent, useState} from 'react';
import TodoTask from './components/TodoTask';
import { ITask } from './Interfaces';
import './App.css';

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task"){
      setTask(event.target.value);
    } else {
      setDeadline(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline};
    if (newTask.taskName === null || newTask.deadline === 0){
      alert("Invalid input. Try again.")
    }
    else{
      setTodoList([...todoList, newTask]);
      setTask("");
      setDeadline(0);
    }
  }

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName !== taskNameToDelete
    }))
  };

  return (
    <div className="App">
      <div className="todoHeader">
        <h1>To-Do List</h1>
        <ol>
          <li>Enter a task. (Input can not be blank)</li>
          <li>Enter the Deadline (Input cannot be 0)</li>
          <li>When you are done with the task, click on the 'X', indicating that you are finished with the task.</li>
        </ol>
      </div>
      <div className="header">
        <div className="inputContainer">
          <input 
            name="task"
            type="text" 
            placeholder="Task..." 
            value={task}
            onChange={handleChange}
          />
          <input 
            name="deadline" 
            type="number" 
            placeholder="Deadline (in Days)..." 
            value={deadline}
            onChange={handleChange}
          />
          </div>
        <button onClick={addTask}>Add Task</button>
        </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask completeTask={completeTask} task={task} key={key} />;
        })}
      </div>
    </div>
  );
}

export default App;
