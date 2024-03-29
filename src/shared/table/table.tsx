import firebase from "firebase";
import React, { useEffect, useState } from "react";

export default function Table(props: any) {
  const [data, setdata]: any = useState(props);
  // console.log(props.datasoure);
  console.log(props);
  useEffect(() => {
    if (props) {
      if (props.datasoure.lenth !== null) {
        setdata(props);
        //console.log(data);
      }
    }
  }, [props]);

  function search(params: any) {
    let arr: any[] = [];
    if (params.target.value != '') {
      for (let i = 0; i < data.datasoure.length; i++) {
        let keys = Object.keys(data.datasoure[i]);
        keys.forEach((element) => {
          if (data.datasoure[i][element] === params.target.value) {
            //console.log(data.datasoure[i]);
            arr.push(data.datasoure[i]);
          }
          setdata({ datasoure: arr });
          if (params.target.value == "") {
            setdata(props);
          }
        });
      }
    }
    else {
      setdata(props);

      debugger
    }
  }
  return (
    <>
      <div>
        <div className="row mb-2">
          <div className="col-3">
            <input
              type="text"
              name="search"
              className="form-control"
              id="inputCity"
              placeholder="search"
              onInput={(e) => search(e)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped  table-hover ">
            <thead>
              <tr>
                {props.coll.map((data: any) => {
                  // //console.log("00000000000000000000000000",data);
                  return <th> {Object.keys(data)} </th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data.datasoure.map((maindata: any) => {
                let keys: any = Object.keys(maindata);
                //console.log(keys);
                // let typr = startSHow(data.hotel_type);
                // //console.log("DSsfa", typr);
                return (
                  <>
                    <tr>
                      {props.coll.map((data: any) => {
                        //console.log("00000000000000000000000000", data);
                        let val: any = Object.values(data);
                        if (val != "") {
                          return <td> {val == "img" ? <img src={maindata[val]} width={50} height={50} alt={maindata[val]} /> :  maindata[val]} </td>;

                          // if (val == "img") {
                          //   return <td>  <img src={maindata[val]} width={50} height={50} alt={maindata[val]} /> </td>;
                          // }
                          // else {
                          //   return <td>  {maindata[val]} </td>;
                          // }
                        }
                      })}
                      <td>
                        <button
                          className="btn btn-success btn-circle btn-circle-sm m-1"
                          style={{ borderRadius: "50% " }}
                          onClick={() =>
                            props.sendDataa("edit", maindata, keys)
                          }
                        >
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button
                          className="btn btn-danger btn-circle btn-circle-sm m-1"
                          style={{ borderRadius: "50% " }}
                          onClick={() =>
                            props.sendDataa("remove", maindata, keys)
                          }
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
