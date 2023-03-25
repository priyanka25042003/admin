import firebase from 'firebase';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Table from '../shared/table/table';

function Feedback() {
  const [table, settable]: any = useState([]);
  const [tableGgl, settableGgl]: any = useState(false);

  let col: any[] = [
    { NAME: "name" },
    { PHONE: "phone" },
    { EMAIL: "email" },
    { MESSAGE: "message" },
    { ACTIONS: "" },
  ];
  useEffect(() => {
    getdata()
  
  }, [])
  
  function getdata() {
    let arr: any[] = [];
    firebase
      .database()
      .ref("/contectus")
      .get()
      .then((res) => {
        res.forEach((element) => {
          // ////console.log( element.forEach(c => ()));
          arr.push({ key: element.key, ...element.val() });
          settable(arr);
        });
        console.log("####3333",arr);
      })
      .catch((err) => {
        console.log(err);
      });
      
  }
  function remove(id: any) {
    if (window.confirm('Delete the item?')) {
    console.log(id);
    firebase
      .database()
      .ref("/contectus/" + id)
      .remove()
      .then(() => {
        getdata();
        toast.error("Delete!");
      })
      .catch(() => {});
    }
  }
  function edit(data: any) {
    console.log(data);
    settableGgl(true);
  }
    function sendData(met: any, data: any, key: any) {
        if (met == "edit") {
          edit(data);
        } else {
    
          remove(data.key);
        }
      }
  return (
    <div>   <div>
    {table.length ? (
     <Table
       sendDataa={(met: any,key : any, data: any) =>
         sendData(met, key,data )
       }
       datasoure={table}
       coll={col}
     ></Table>
   ) : (
     
     <div className="d-flex justify-content-center">
       <div className="spinner-border" role="status">
         <span className="sr-only">Loading...</span>
       </div>
     </div>
   )}
 </div></div>
  )
}

export default Feedback;