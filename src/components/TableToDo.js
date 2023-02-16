import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button,Popconfirm,Table,Tag,Space,Input, Form } from "antd";
import { deleteToDo, setData } from "../redux/tableSlice";
import axios from "axios";
// import moment from "moment/moment";

function TableToDo() {

  const { tableData } = useSelector((state) => state.table);
  const dispatch=useDispatch();
  const [form]=Form.useForm();
  const [editingKey,setEditingKey]=useState('');
  const [searchText,setSearchText]=useState('');
  const [searchResult,setSearchResult]=useState([]);
  
  const isEditing = (record) => record.id === editingKey;

    const columns=[
        {
            title:"TimeStamp",
            dataIndex:"time_stamp",
            key:"time_stamp",
            editTable:false,
            sorter: (a, b) => new Date(a.time_stamp) - new Date(b.time_stamp)
        },
        {
            title:"Title",
            dataIndex:"title",
            key:"title",
            editTable:true,
            sorter:(a,b)=>a.title.length-b.title.length

        },
        {
            title:"Description",
            dataIndex:"desc",
            key:"desc",
            editTable:true,
            sorter:(a,b)=>a.desc.length-b.desc.length

        },
        {
            title:"DueDate",
            dataIndex:"due_date",
            key:"due_date",
            editTable:true,
            width:'10%',
            sorter: (a, b) => new Date(a.due_date) - new Date(b.due_date)        },
        {
            title:"Tag",
            dataIndex:"tag",
            key:"tag",
            editTable:true,
            width:'20%',
            render: (_, {tag} ) => {

             let ftag=filter(tag);
             return<Space wrap='true'>
                { 
                ftag.map((ele,i) => {
                  let items=['magenta','orange','gold','lime','green'];
                  let color = items[Math.floor(Math.random()*items.length)]
                  return (
                    <Tag  key={i} color={color}>
                      {ele.toUpperCase()}
                    </Tag>
                  );
                })}
              </Space>
            },
            filterSearch: true,
            filters:[
              {text:"HEALTH",value:"HEALTH"},
              {text:"EDUCATION",value:"EDUCATION"},
              {text:"SPORTS",value:"SPORTS"},
              {text:"TECH",value:"TECH"},
              {text:"SCIENCE",value:"SCIENCE"}

              ],
            onFilter: (value,record) => String(record.tag).toUpperCase().includes(value)
        },
        {
            title:"Status",
            dataIndex:"status",
            key:"status",
            editTable:false,
            filters:[
              {text:"OPEN",value:"OPEN"},
              {text:"WORKING",value:"WORKING"},
              {text:"DONE",value:"DONE"},
              {text:"OVERDUE",value:"OVERDUE"}
              ],
            onFilter: (value,record) => String(record.status).includes(value),
            
        },
        {
          title:"Action",
          key:'action',
          align:'center',
          render: (_,record) =>{
            // if(editingKey===record.id)
            const editable= isEditing(record);

            return tableData.length>0? (
            <Space>
              
              <Popconfirm title="Confirm Delete" placement="left" color='gray' onConfirm={()=>dispatch(deleteToDo(record.id))}>
                <Button className="text-red-600">Delete</Button>
              </Popconfirm>
             
              {editable?
              (
                <span>
                 <Space size='small'>
                    <Button onClick={()=>save(record.id)}>Save</Button>
                    <Popconfirm title="Data Will Not Update " placement="left" color='gray' onConfirm={()=>setEditingKey('')}>
                      <Button>Cancel</Button>
                    </Popconfirm>
                 </Space>
                </span>
              )
              :
              (
                  <Button className="bg-black text-white px-6" onClick={()=>{editTodo(record);setEditingKey(record.id)}}>Edit</Button>
              )
              
              }
              
            </Space>
         
          ):null}
      }

    ];

    
    const filter=(tag)=>{
      if(typeof tag==="object")return tag;
      let filteredTags = tag.replace(/[\s,]+/g, ' ').trim().split(' ');
      filteredTags=[...new Set(filteredTags)];
      return filteredTags
    }

    const editTodo=(record)=>{
      form.setFieldsValue({
        title:record.title,
        desc:record.desc,
        tag:"",
        ...record
      });
    }
  
    const save = async (key) => {
      try {
        const row = (await form.validateFields());
        const newData = [...tableData];
        const index = newData.findIndex((item) => key === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
            // tag:filter(row.tag)
          });
      
        dispatch(setData(newData));
        setEditingKey('');

        //=============(apply update to DB....backend)
        try{
          await axios.put(`https://mockend.com/03upendra/ToDo-List/Post/${item.id}`,item);
        }
        catch(err){
          console.log(err);
          //=====(code for error handling if server request failed)
        }

      } 
      catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      } 
    };


//====================================(Setting Search Result)
    const handelSearchInput=(e)=>{
      setSearchText(e.target.value);
      if(e.target.value==='')setSearchResult([])
    }

    const onSearch=()=>{
      let result=tableData.filter((value)=>{
        return(
          value.title.toLowerCase().includes(searchText.toLowerCase()) ||
          value.desc.toLowerCase().includes(searchText.toLowerCase())
        )
      })
      // console.log(result)
      setSearchResult(result);
    }

    const mergedColumns = columns.map((col) => {
      if (!col.editTable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record, 
          inputType: col.dataIndex === 'due_date' ? 'date' : '',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    
    const EditableCell=({editing,dataIndex,title,record,inputType,children,...restProps})=>{

      let input;
      if(inputType==='date'){input=<Input type="date"/>}
      else input=<Input/>
      
      return(
        <td {...restProps}>  
          {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
              required: true,
              message: `Please Input ${title}!`,
              },
            ]}
          >
          {input}
          </Form.Item>
        ) : (
        children
        )}
      </td>)
    }

   
    if(!tableData)
    return <div className="w-full text-center mt-4 text-xl font-semibold text-black">loading...</div>
   
  
  return (
    <div className="p-4 pt-0 w-full">

      <div className="w-full flex justify-end">
        <Space style={{margin:5}}>
          <Input placeholder="Search" onChange={handelSearchInput} type="text" allowClear={true} value={searchText}/>
          <Button onClick={onSearch} className='bg-black text-white border-none pb-2'>search</Button>
        </Space>
      </div>
    
      <Form form={form}  component={false}>
      <Table dataSource={searchResult.length?searchResult:tableData} columns={mergedColumns} components={{body:{cell:EditableCell}}}/>
      </Form>

    </div>
  );
}

export default TableToDo;
