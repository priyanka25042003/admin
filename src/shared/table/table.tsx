import React from "react";

export default function Table(props: any) {
  console.log(props);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            {props.coll.map((data: any) => {
              // console.log("00000000000000000000000000",data);

              return <th> {Object.keys(data)} </th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.datasoure.map((maindata: any) => {
            let keys: any = Object.keys(maindata);
            console.log(keys);
            // let typr = startSHow(data.hotel_type);
            // console.log("DSsfa", typr);

            return (
              <tr>
                {props.coll.map((data: any) => {
                  console.log("00000000000000000000000000", data);
                  let val: any = Object.values(data);
                  if (val != "") {
                    return <td> {maindata[val]} </td>;
                  }
                })}
                <td>
                  <button
                    className="btn btn-success btn-circle btn-circle-sm m-1"
                    style={{ borderRadius: "50% " }}
                    // onClick={() => edit(data)}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-circle btn-circle-sm m-1"
                    style={{ borderRadius: "50% " }}
                    // onClick={() => remove(data.key)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
