import React from "react";

function TodoCheckBox({ todoList, editTodo }) {
  console.log("props", todoList);
  return (
    <>
      {todoList.map((item) => {
        return (
          <div key={item.id}>
            {item.complete ? (
              <>
                <input type="checkbox" data-id={item.id} onChange={editTodo} checked='checked'/>
                <label>{item.name}</label>
                <br></br>
              </>
            ) : (
                <>
                <input type="checkbox" data-id={item.id} onChange={editTodo} checked=''/>
                <label>{item.name}</label>
                <br></br>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export default TodoCheckBox;
