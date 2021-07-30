import React, { useRef, useState, useEffect } from "react";
import TodoCheckBox from "./TodoCheckBox";
var uniqid = require("uniqid");

function UserForm() {
  const [todoList, setTodoList] = useState([]);
  const [todoListLeft, setTodoListLeft] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("todoList")))
      setTodoList(JSON.parse(localStorage.getItem("todoList")));
  }, []);

  const addTodo = () => {
    if (!todoNameRef.current.value) return;
    const todo = {
      id: uniqid(),
      name: todoNameRef.current.value,
      complete: false,
    };
    setTodoList((prev) => {
      return [...prev, todo];
    });
    todoNameRef.current.value = null;
  };

  const editTodo = (e) => {
    const newTodoList = [...todoList];
    newTodoList.map((todo) => {
      if (e.target.dataset.id === todo.id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const clearComplete = () => {
    const newArray = [...todoListLeft];
    setTodoList(newArray);
  };

  useEffect(() => {
    const newlist = [...todoList].filter((todo) => {
      return !todo.complete;
    });
    setTodoListLeft(newlist);
    console.log("filterArray:", todoListLeft.length);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList, todoListLeft.length]);

  return (
    <>
      <TodoCheckBox todoList={todoList} editTodo={editTodo} />
      <input type="text" name="todoItem" ref={todoNameRef}></input>
      <button onClick={addTodo}>Add todo</button>
      <button onClick={clearComplete}>Clear complete</button>
      <p>Todos Left: {todoListLeft.length}</p>
    </>
  );
}

export default UserForm;
