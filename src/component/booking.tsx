import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Table from "../shared/table/table";

function Booking() {
  const [table, settable]: any = useState([]);

  useEffect(() => {
    getbookings();
  }, []);
  let col: any[] = [
    { NAME: "flight_name" },
    { FROM: "from_location" },
    { TO: "to_location" },
    { "ARRIVAL DATE": "arrival_date" },
    { "DEPARTURE TIME": "departure_time" },
    { DESTINATION: "destination" },
    { ACTIONS: "" },
  ];
  function getbookings() {
    let arr: any[] = [];
    firebase
      .database()
      .ref("/booking")
      .get()
      .then((res) => {
        res.forEach((element) => {
          // console.log( element.forEach(c => ()));
          arr.push({ key: element.key, ...element.val() });
          if (arr.length > 0) {
            settable(arr);
          } else {
            settable("NO DATA FOUND");
          }
          console.log(arr);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      {table.length ? (
        <Table datasoure={table} coll={col}></Table>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
