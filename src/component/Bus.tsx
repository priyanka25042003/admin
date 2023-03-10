import firebase from "firebase";
import { useEffect, useState } from "react";
import table from "../shared/table/table";
import Table from "../shared/table/table";
import { ToastContainer, toast } from "react-toastify";


function Bus() {
  const [file, setFile]: any = useState();

  const [data, setdata]: any = useState({
    bus_name: "",
    from_location: "",
    to_location: "",
    departure_date: "",
    departure_time: "",
    arrival_date: "",
    arrival_time: "",
    destination: "",
    bus_seat_type: "",
    bus_seat_price: "",
    total_seat: "",
    available_seat: "",
    description: "",
  });
    
  const [table, settable]: any = useState([]);
  const [tableGgl, settableGgl]: any = useState(false);

  function setData(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    setdata({ ...data, [name]: value });
  }

  let col: any[] = [
    { IMAGE: "img" },
    { NAME: "bus_name" },
    { FROM: "from_location" },
    { TO: "to_location" },
    { "ARRIVAL DATE": "arrival_date" },
    { "DEPARTURE TIME": "departure_time" },
    {"TOTAL SEATS":"total_seat"},
    { DESTINATION: "destination" },
    
    { ACTIONS: "" },
  ];
  useEffect(() => {
    getdata();
  }, []);

  function sendData(met: any, data: any, key: any) {
    if (met == "edit") {
      edit(data);
    } else {

      remove(data.key);
    }
  }
  function remove(id: any) {
    if (window.confirm('Delete the item?')) {
    console.log(id);
    firebase
      .database()
      .ref("/bus/" + id)
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
    setdata(data);
  }
  function setfile(imagefile: any) {
    console.log(imagefile.target.files);
    setFile(imagefile.target.files[0]);
  }
  function getdata() {
    let arr: any[] = [];
    firebase
      .database()
      .ref("/bus")
      .get()
      .then((res) => {
        console.log(res);
        res.forEach((element) => {
          // ////console.log( element.forEach(c => ()));
          arr.push({ key: element.key, ...element.val() });
          settable(arr);
          console.log(arr);

          ////console.log(arr);
        });
      })
      .catch((err) => {
        console.log(err);
      });
      
  }
  function submit() {
    console.log(data);
    if (!data.key) {
      firebase
        .storage()
        .ref("/bus/" + file.name)
        .put(file)
        .then((res) => {
          firebase
            .storage()
            .ref("/bus/" + file.name)
            .getDownloadURL()
            .then((res) => {
              data.img = res;
              firebase
                .database()
                .ref("/bus")
                .push(data)
                .then((res) => {
                  console.log(res);
                  setTimeout(() => {
                    getdata();
                  }, 2000);
                  settableGgl(false);
                  toast.success("Bus Add Success");
                })
                .catch((err) => {
                  toast.error(err.message);
                });
            })
            .catch((err) => {
              toast.error(err.message);
            });
          // console.log(res);
          // toast.success("Bus Update successfully");
          // settableGgl(false);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      if (file) {
        firebase
          .storage()
          .ref("/bus/" + file.name)
          .put(file)
          .then((res) => {
            toast.success("File Uploded");
            firebase
              .storage()
              .ref("/bus/" + file.name)
              .getDownloadURL()
              .then((res) => {
                data.img = res;
                firebase
                  .database()
                  .ref("/bus/" + data.key)
                  .update(data)
                  .then((res) => {
                    console.log(res);
                    setTimeout(() => {
                      getdata();
                    }, 2000);
                    settableGgl(false);
                    toast.success("Bus Update Success");
                  })
                  .catch((err) => {
                    toast.error(err.message);
                  });
              })
              .catch((err) => {
                toast.error(err.message);
              });
            // console.log(res);
            // toast.success("Bus Update successfully");
            // settableGgl(false);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } else {
        firebase
          .database()
          .ref("/bus/" + data.key)
          .update(data)
          .then((res) => {
            console.log(res);
            setTimeout(() => {
              getdata();
            }, 2000);
            settableGgl(false);
            toast.success("Bus Update Success");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    }
  }
  
  function toggle() {
    setdata({});
    settableGgl(tableGgl ? false : true);
  }

  return (
    <div className="container-fluid">
      <ToastContainer></ToastContainer>
       <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
      integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
      crossOrigin="anonymous" />
      <button
        className={tableGgl ? "btn-danger btn" : "btn-success btn mb-3d"}
        onClick={toggle}
      >
        {tableGgl ? (
          <i className="fa fa-arrow-left" aria-hidden="true">
            &nbsp; Back
          </i>
        ) : (
          <i className=" fa fa-plus" aria-hidden="true">
            &nbsp;Add Bus{" "}
          </i>
        )}
      </button>
      {tableGgl ? (
        <div>
          <h3 className="text-center"> Bus</h3>
          <div className="row ">
            <div className="ml-3">
              <h3>BUS INFO</h3>
            </div>
            <div className="col-md-12 ">
              <label htmlFor="inputPassword4" className="form-label">
                Bus Name
              </label>
              <input
                onChange={(e) => setData(e)}
                name="bus_name"
                value={data.bus_name ? data.bus_name : ""}
                type="text"
                className="form-control"
                placeholder="Bus Name"
              />
            </div>
            <div className="col-md-6 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                From
              </label>

              <input
                onChange={(e) => setData(e)}
                name="from_location"
                value={data.from_location ? data.from_location : ""}
                type="text"
                className="form-control"
                placeholder="From"
              />
            </div>
            <div className="col-md-6 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                To
              </label>
              <input
                onChange={(e) => setData(e)}
                name="to_location"
                value={data.to_location ? data.to_location : ""}
                type="text"
                className="form-control"
                placeholder="To"
              />
            </div>
            <div className="col-md-6 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Departure Date
              </label>
              <input
                onChange={(e) => setData(e)}
                name="departure_date"
                value={data.departure_date ? data.departure_date : ""}
                type="date"
                className="form-control"
                placeholder=" Departure Date"
              />
            </div>
            <div className="col-md-6 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Departure Time
              </label>
              <input
                onChange={(e) => setData(e)}
                name="departure_time"
                value={data.departure_time ? data.departure_time : ""}
                type="time"
                className="form-control"
                placeholder="Departure Time"
              />
            </div>
            <div className="col-md-6 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Arrival Date
              </label>
              <input
                onChange={(e) => setData(e)}
                name="arrival_date"
                value={data.arrival_date ? data.arrival_date : ""}
                type="date"
                className="form-control"
                placeholder=" Arrival Date"
              />
            </div>
            <div className="col-md-6 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Arrival Time
              </label>
              <input
                value={data.arrival_time ? data.arrival_time : ""}
                onChange={(e) => setData(e)}
                name="arrival_time"
                type="time"
                className="form-control"
                placeholder=" Arrival Time"
              />
            </div>
            <div className="col-md-12 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Destination
              </label>
              <input
                value={data.destination ? data.destination : ""}
                onChange={(e) => setData(e)}
                name="destination"
                type="text"
                className="form-control"
                placeholder="Destination"
              />
            </div>
            <div className=" col-md-12 mt-3">
              <h3>BUS SEAT</h3>
            </div>
            <div className="col-md-6 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Seat Type
              </label>
              <input
                value={data.bus_seat_type ? data.bus_seat_type : ""}
                onChange={(e) => setData(e)}
                name="bus_seat_type"
                type="Text"
                className="form-control"
                placeholder="Seat Type"
              />
            </div>
            <div className="col-md-6 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Seat Price
              </label>
              <input
                value={data.bus_seat_price ? data.bus_seat_price : ""}
                onChange={(e) => setData(e)}
                name="bus_seat_price"
                type="Text"
                className="form-control"
                placeholder="Seat Price"
              />
            </div>
            <div className="col-md-6 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Total Seat
              </label>
              <input
                value={data.total_seat ? data.total_seat : ""}
                onChange={(e) => setData(e)}
                name="total_seat"
                type="Text"
                className="form-control"
                placeholder="Total Seat"
              />
            </div>
            <div className="col-md-6 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Available Seat
              </label>
              <input
                value={data.available_seat ? data.available_seat : ""}
                onChange={(e) => setData(e)}
                name="available_seat"
                type="Text"
                className="form-control"
                placeholder="Available Seat"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Image
              </label>
              <input
                onChange={(e) => setfile(e)}
                name="image"
                type="file"
                className="form-control"
              />
            </div>
            
            <div className="col-10 col-md-12 text-center ">
              <label htmlFor="inputPassword4" className="form-label">
                Discrpition
              </label>
              <textarea
                value={data.description ? data.description : ""}
                onChange={(e) => setData(e)}
                name="description"
                className="form-control"
                placeholder="Discrpition"
              ></textarea>
            </div>
          </div>
          
          <div className="text-center ">
            <button
              onClick={submit}
              type="submit"
              className="btn btn-primary  "
            >
              
              {data.key ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
}

export default Bus;
