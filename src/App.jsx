import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/navbar'
import Footer from './components/footer'
import "./index.css"



function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [TotalTasks, setTotalTasks] = useState(0);
  const [showCompleted, setshowCompleted] = useState(true);
  
  function change(e){
    settodo(e.target.value)
  }
    
  useEffect(() => {
   setTotalTasks(todos.length);
  }, [todos])
   
   function savetoLS(updated) {
     localStorage.setItem("TodoTasks",JSON.stringify(updated));
  }

   const add=()=> {
    if(todo!=""){
    let newtodos=[...todos,{id:uuidv4(),todo:todo,iscompleted:false}];
    settodos(newtodos);
    settodo("");
    savetoLS(newtodos);
    }
  }
  
  const Edit=(task)=>{
  settodo(task);
  let newtodos=todos.filter(newtodo=>{
    if(newtodo.todo!=task){
      return newtodo;
    }
  })
  settodos(newtodos);
  savetoLS(newtodos);
  }

  const Delete=(task)=>{
    let newtodos=todos.filter(todo=>{
      return todo.todo!=task;
    })
    settodos(newtodos)
    savetoLS(newtodos);
  }
   const Checked=(id)=>{
    let newtodos=todos.filter(todo=>{
      if(todo.id==id){
        todo.iscompleted=!todo.iscompleted;
      }
      return todo;
    })
    settodos(newtodos);
    savetoLS(newtodos);
   }

  useEffect(() => {
    settodos(JSON.parse(localStorage.getItem("TodoTasks")));
  }, []);
 
  return (
    <>
      <Navbar/>
      <div className='h-[80vh] w-3/4 bg-blue-500 mt-6 ml-[12.5%] rounded-2xl p-2 flex flex-col gap-3 overflow-y-auto'>
        <h1 className='font-bold text-amber-50 text-2xl text-center'>Todo Tasks</h1>
        <input onChange={change} type="text" placeholder='Enter Todo' value={todo} className='text-amber-50 px-2 border-2 border-blue-700 rounded-2xl'/>
        <button onClick={add} className='px-2 text-amber-50 bg-blue-700 rounded-2xl hover:cursor-pointer'>Add</button>
        <div className="list flex flex-col gap-2">
        <div className="list flex justify-between border-2 border-blue-700 py-1 px-2 rounded-2xl ">
        <h1 className='font-bold text-amber-50 text-2xl '>List</h1>
        <h1 className='font-bold text-amber-50 text-2xl '>Total Tasks : {TotalTasks}</h1>
        </div>
        <div className="show flex items-center gap-2">
        <input type="checkbox" checked={showCompleted} onClick={()=>{setshowCompleted(!showCompleted)}} name="ShowCompleted" id="" />
        <span className='text-amber-50 font-bold'>Show Completed Tasks</span>
        </div>
         {todos.map(todo=>{
            return (showCompleted||!todo.iscompleted)&&(<div key={todo.id} className="task flex justify-between">
            <div className="task flex gap-2">
            <input onChange={()=>{Checked(todo.id)}} type="checkbox" name="iscomplete"   id="" />
            <div className={todo.iscompleted?'line-through text-amber-50':'text-amber-50'}>{todo.todo}</div>
            </div>
            <div className="btns flex gap-2 ">
            <button onClick={()=>{Edit(todo.todo)}} className='px-2 text-amber-50 bg-blue-700 rounded-2xl hover:cursor-pointer w-full h-7'>Edit</button>
            <button onClick={()=>{Delete(todo.todo)}} className='px-2 text-amber-50 bg-blue-700 rounded-2xl hover:cursor-pointer w-full h-7'>Delete</button>
            </div>
           </div>);
         })}
         
        </div>
      </div>
      
      <Footer/>
    </>
  )
}

export default App
