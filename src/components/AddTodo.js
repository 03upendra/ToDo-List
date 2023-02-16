import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/tableSlice';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';


function AddToDo() {

    const dispatch=useDispatch();

    const schema = yup.object({
        time_stamp: yup.date().default(() =>new Date()),
        title: yup.string().required().max(100),
        desc: yup.string().required().max(100),
        due_date:yup.date()
      }).required();

    const[todo,setTodo]=useState({time_stamp:'',title:'',desc:'',due_date:'',tag:'',status:['OPEN','WORKING','DONE','OVERDUE']});

    const { register,formState: { errors }, handleSubmit, reset } = useForm({resolver: yupResolver(schema)});

   
    const onSubmit=data=> handelAdd(data);

    //===============================================(Updating Global State )
    const handelAdd= async (data)=>{

        let filteredTags = data.tag.replace(/[\s,]+/g, ' ').trim().split(' ');
        filteredTags=[...new Set(filteredTags)];
        let tdate=new Date(data.due_date)
        let date =tdate.toISOString();
        console.log(date);
        let createdDate=data.time_stamp.toISOString();
        let tid= Math.floor((Math.random() * 1000) + 1);
        let newData={...data,tag:filteredTags,due_date:date.substring(0,10),time_stamp:createdDate.substring(0,10),id:tid}
        // console.log(newData);
        dispatch(addTodo(newData));
        
        setTodo({...todo,time_stamp:'',title:'',desc:'',due_date:'',tag:'',status:['OPEN','WORKING','DONE','OVERDUE']});
        reset(todo);

        //=====(Code to add new todo to DB...backend)
        try {
            let res = await axios.post(
              "https://mockend.com/03upendra/ToDo-List/Post",newData
            );
            console.log(res);
        }
        catch(err){ 
            console.log(err)
            //======(Code for error handling)
        }
    }

  return (
    <div className='absolute top-1/2 right-1/2  translate-x-1/2 -translate-y-1/2 w-fit md:w-1/3 p-6 flex flex-col justify-center items-center bg-gray-600 text-black mt-10 rounded-sm'>
   
   <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
    
    <h1 className='text-center text-2xl font-bold text-white mb-6 border-b-2'>My-ToDo</h1>

      <input {...register("title")} placeholder='Title' className='p-2 text-xl w-full rounded-md'/>
      <p className='text-sm text-red-400'>{errors.title?.message}</p>

      <textarea {...register("desc")} rows="5" placeholder='Description' className='mt-6 text-xl w-full rounded-md'/>
      <p className='text-sm text-red-400'>{errors.desc?.message}</p>

      <input {...register("tag")} placeholder='Tags'  className='mt-6 p-2 text-xl w-full rounded-md'/>
      

        <div className='flex flex-col xl:flex-row w-full mt-6'>

            <div className='flex flex-col w-1/2'>
                <div className='flex justify-start items-center w-full'>
                    <label htmlFor="Status" className='text-white text-xl font-semibold'>Status-</label>
                    <select {...register("status")} defaultValue={todo.status[0]} className='ml-1 text-lg text-center rounded-md p-1'>
                        {
                            todo.status.map((ele,i)=>{
                            return <option key={i} value={ele}>{ele}</option>  
                            })
                        }
                    </select>
                    <p>{errors.status?.message}</p>
                </div>
            </div>

            <div className='flex flex-col w-1/2'>
                <div className='flex justify-end items-center w-full '>
                    <label htmlFor="Date" className='text-white text-xl font-semibold'>DueDate-</label>
                    <input type='date' {...register("due_date")} className='ml-1 p-1 rounded-md'/>
                </div>
                <p className='text-sm text-red-400'>{errors.due_date?'Please select a date':''}</p>
            </div>

        </div>

        <div className='w-full text-right'>
        <input type="submit" value='Add Item' className='mt-8 text-white bg-black px-3 py-1 text-lg rounded-lg font-bold hover:bg-blue-500 hover:cursor-pointer mx-auto text-c' />    
        </div>
    </form>
    </div>
  )
}

export default AddToDo;