import React from "react";
import { useSelector } from "react-redux";
import { Table,Tag } from "antd";

function TableToDo() {

  const { tableData } = useSelector((state) => state.table);

    const columns=[
        {
            title:"TimeStamp",
            dataIndex:"time_stamp",
            key:"time_stamp",
            editTable:false,
        },
        {
            title:"Title",
            dataIndex:"title",
            key:"title",
            editTable:true,
        },
        {
            title:"Description",
            dataIndex:"desc",
            key:"desc",
            editTable:true,
        },
        {
            title:"DueDate",
            dataIndex:"due_date",
            key:"due_date",
            editTable:true,
        },
        {
            title:"Tag",
            dataIndex:"tag",
            key:"tag",
            editTable:true,
            render: (_, tag ) => (
              <>
                {
                tag.map((ele) => {
                  let maxVal = 0xFFFFFF;
                  let randomNumber = Math.random() * maxVal;
                  randomNumber = Math.floor(randomNumber);
                  randomNumber = randomNumber.toString(16);
                  let randColor = randomNumber.padStart(6, 0);
                  return (
                    <Tag color={randColor} key={ele}>
                      {ele.toUpperCase()}
                    </Tag>
                  );
                })}
              </>
            ),
        },
        {
            title:"Status",
            dataIndex:"status",
            key:"status",
            editTable:true,
        }

    ];


    if(!tableData)
    return <div>loading...</div>
    
  
  return (
    <div className="App bg-black text-white text-2xl">
      {/* {tableData?.map((ele, i) => {
        return <div key={i}>{ele.title}</div>;
      })} */}
      <Table dataSource={tableData} columns={columns} bordered/>
    </div>
  );
}

export default TableToDo;
