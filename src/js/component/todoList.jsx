import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [addTask, setAddTask] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [deleteUsr, setDeleteUsr] = useState('');

  const createUser = async () => {
    try {
      let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/LRN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([]),
      });
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getTasks = async () => {
    try {
      let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/LRN');
      let data = await response.json();
      console.log(data);
      if (response.ok) {
        setTodoList(data);

      } else if (response.status === 404) {
        createUser();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleInput = (event) => {
    setAddTask(event.target.value);
  }

  const add = (event) => {
    if (event.key === 'Enter' && addTask !== '') {
      const newTask = {
        label: addTask,
        done: false,
      };
      console.log(newTask);
      setAddTask('');
      update([...todoList, newTask]);
    }
  }

  const update = async (todoList) => {
    try {
      let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/LRN', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoList),
      });
      if (response.ok) {
        getTasks();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const remove = (index) => {
    const newList = todoList.filter((item, i) => index !== i);
    setTodoList(newList);
    update(newList);
  }

  const deleteAll = async () => {
    try {
      let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/LRN', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        createUser();
        deleteUsr ? setDeleteUsr(false) : setDeleteUsr(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    getTasks();
  }, []);

  useEffect(function () {
    getTasks();
  }, [deleteUsr]);

  return (
    <div className="text-center">
      <h1 className="text-center mt-5">Todos</h1>
      <ul className="list-group w-25 mx-auto shadow p-3 mb-5">
        <li className="list-group-item">
          <input
            className="form-control"
            value={addTask}
            onChange={handleInput}
            onKeyDown={add}
            type="text"
            placeholder="Add the task"
            aria-label="default input example"
          />
        </li>
        {todoList.map((task, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            {task.label}
            <span className="badge rounded-pill" onClick={() => remove(index)}>
              X
            </span>
          </li>
        ))}
        <li className="list-group-item">
          {todoList.length === 0 ? 'No task pending, add taks please' : todoList.length + ' items left'}
        </li>
      </ul>
      {todoList.length === 0 ? (
        <button className="btn btn-danger mx-auto disabled" id="deleteAll">
          Delete All
        </button>
      ) : (
        <button className="btn btn-danger mx-auto" id="deleteAll" onClick={deleteAll}>
          Delete All
        </button>
      )}
    </div>
  );
};

export default TodoList;