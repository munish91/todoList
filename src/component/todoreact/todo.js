import React, { useState, useEffect } from "react";
import "./style.css";

const getLocalData = ()=>{
  const lists = localStorage.getItem("mytodolist");

  if(lists){
     return JSON.parse(lists);
  }
  else{
    return [];
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editData, setEditData] = useState("");
  const [editToggle, setEditToggle] = useState(false);

  const addItem =()=>{
    if(!inputData){
      alert("Please write any title");
    }
    else if(inputData && editToggle){
       setItems(
        items.map((curElem)=>{
          if(curElem.id === editData){
            return {...curElem, name:inputData};
          }
          return curElem;
        })
       );
       setEditData(null);
       setInputData("");
       setEditToggle(false); 
    }
    else{
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData
      }
      setItems([...items,newInputData]);
      setInputData("");
    }
  }

  const editItem = (index)=>{
     const editListData = items.find((curElem)=>{
         return curElem.id === index;
     });
     setEditData(index);
     setInputData(editListData.name);
     setEditToggle(true);
  }

  const deleteItem = (index)=>{
    const updatedItems = items.filter((curElem)=>{
          return curElem.id !== index;
    });
    setItems(updatedItems);
  }

  const removeAll = ()=>{
    setItems([]);
  }

  useEffect(() => {
      localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items])
  
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputData}
              onChange={(event)=>setInputData(event.target.value)}
            />
            {
              editToggle ? (
                <i className="fa fa-edit add-btn" onClick={addItem}></i>
              ) :
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            }
            
          </div>
          {/* show our items  */}
          {
           items.map((curElem)=>{
             return(
              <div className="showItems" key={curElem.id}>
                <div className="eachItem" >
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn"
                    onClick={()=>editItem(curElem.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={()=>deleteItem(curElem.id)}></i>
                  </div>
                </div>    
              </div>
             )
           })
          }
          

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
