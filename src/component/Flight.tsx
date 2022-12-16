
import { useEffect, useState } from "react";
import firebase from "firebase";
import Table from "../shared/table/table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Flight() {
  const [data, setdata]: any = useState();
  const [file, setFile]: any = useState();

  const [table, settable]: any = useState([]);

  const [tableGgl, settableGgl]: any = useState(false);
  function setData(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    setdata({ ...data, [name]: value });
  }
  function setfile(imagefile: any) {
    console.log(imagefile.target.files);
    setFile(imagefile.target.files[0]);
  }
  useEffect(() => {
    getdata();
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

  function sendData(method: any, datas: any, key: any) {
    console.log(method, datas, key);
    if (method == "edit") {
      edit(datas);
    } else {
      console.log("#######3", datas);

      remove(datas.key);
    }
  }

  function submit() {
    console.log(data);
    if (!data.key) {
      firebase
        .storage()
        .ref("/flight/" + file.name)
        .put(file)
        .then((res) => {
          firebase
            .storage()
            .ref("/flight/" + file.name)
            .getDownloadURL()
            .then((res) => {
              data.img = res;
              firebase
                .database()
                .ref("/flight")
                .push(data)
                .then((res) => {
                  console.log(res);
                  setTimeout(() => {
                    getdata();
                  }, 2000);
                  settableGgl(false);
                  toast.success("Flight Add Success");
                })
                .catch((err) => {
                  toast.error(err.message);
                });
            })
            .catch((err) => {
              toast.error(err.message);
            });
          // console.log(res);
          // toast.success("Flight Update successfully");
          // settableGgl(false);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      if (file) {
        firebase
          .storage()
          .ref("/flight/" + file.name)
          .put(file)
          .then((res) => {
            toast.success("File Uploded");
            firebase
              .storage()
              .ref("/flight/" + file.name)
              .getDownloadURL()
              .then((res) => {
                data.img = res;
                firebase
                  .database()
                  .ref("/flight/"+data.key)
                  .update(data)
                  .then((res) => {
                    console.log(res);
                    setTimeout(() => {
                      getdata();
                    }, 2000);
                    settableGgl(false);
                    toast.success("Flight Update Success");
                  })
                  .catch((err) => {
                    toast.error(err.message);
                  });
              })
              .catch((err) => {
                toast.error(err.message);
              });
            // console.log(res);
            // toast.success("Flight Update successfully");
            // settableGgl(false);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } else {
        firebase
          .database()
          .ref("/flight/" + data.key)
          .update(data)
          .then((res) => {
            console.log(res);
            setTimeout(() => {
              getdata();
            }, 2000);
            settableGgl(false);
            toast.success("Flight Update Success");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    }
  }
  function getdata() {
    let arr: any[] = [];
    // debugger

    firebase
      .database()
      .ref("/flight")
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
  function edit(data: any) {
    console.log(data);
    settableGgl(true);
    setdata(data);
  }
  function update(data: any) {
    console.log(data);
    settableGgl(true);
    setdata(data);
  }
  function remove(id: any) {
    if (window.confirm("Delete the item?")) {
      console.log(id);
      firebase
        .database()
        .ref("/flight/" + id)
        .remove()
        .then(() => {
          getdata();
          toast.error("Delete!");
        })
        .catch(() => {});
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
        crossOrigin="anonymous"
      />
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
            &nbsp;Add Flight{" "}
          </i>
        )}
      </button>
      {tableGgl ? (
        <div>
          <h3 className="text-center"> Flight</h3>
          <div className="row g-3">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Flight Name
              </label>
              <input
                value={data.flight_name}
                onChange={(e) => setData(e)}
                name="flight_name"
                type="text"
                className="form-control"
                id="inputEmail4"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                From
              </label>
              <input
                onChange={(e) => setData(e)}
                name="from_location"
                value={data.from_location}
                type="text"
                className="form-control"
                id="inputPassword4"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputAddress" className="form-label">
                To
              </label>
              <input
                onChange={(e) => setData(e)}
                name="to_location"
                value={data.to_location}
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputAddress2" className="form-label">
                Departure Date
              </label>
              <input
                onChange={(e) => setData(e)}
                value={data.departure_date}
                name="departure_date"
                type="date"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Departure Time
              </label>
              <input
                onChange={(e) => setData(e)}
                value={data.departure_time}
                name="departure_time"
                type="time"
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Arrival Date
              </label>
              <input
                onChange={(e) => setData(e)}
                value={data.arrival_date}
                name="arrival_date"
                type="date"
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Arrival Time
              </label>
              <input
                onChange={(e) => setData(e)}
                value={data.arrival_time}
                name="arrival_time"
                type="time"
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="col-md-12 mt-3">
              <label htmlFor="inputCity" className="form-label">
                Destination
              </label>
              <input
                onChange={(e) => setData(e)}
                value={data.destination}
                name="destination"
                type="text"
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="col-md-12">
              <h4 className="text-center m-4"> Seat Price </h4>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                First class
              </label>
              <input
                onChange={(e) => setData(e)}
                value={data.first_class}
                name="first_class"
                type="number"
                min={0}
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Business class
              </label>
              <input
                onChange={(e) => setData(e)}
                value={data.business_class}
                name="business_class"
                type="number"
                min={0}
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Economy class
              </label>
              <input
                onChange={(e) => setData(e)}
                value={data.economy_class}
                name="economy_class"
                type="number"
                min={0}
                className="form-control"
                id="inputCity"
              />
            </div>
            <div>
              <hr />
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
            <div className="col-12 mt-4 text-center ">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Discrpition
              </label>
              <textarea
                onChange={(e) => setData(e)}
                value={data.description}
                name="description"
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
              ></textarea>
            </div>

            <div className="col-12 mt-4 text-center ">
              <button
                onClick={submit}
                type="submit"
                className="btn btn-primary  "
              >
                {data.key ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className=" table-responsive">
          {/* <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">NAME</th>
                <th scope="col">FROM</th>
                <th scope="col">TO</th>
                <th scope="col">ARRIVAL DATE</th>
                <th scope="col">DEPARTURE TIME</th>
                <th scope="col">DESTINATION</th>
                <th scope="col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {table.map((data: any) => {
                return (
                  <tr>
                    <th> {data.flight_name} </th>
                    <td> {data.from_location} </td>
                    <td> {data.to_location} </td>
                    <td> {data.arrival_date} </td>
                    <td> {data.departure_time} </td>
                    <td> {data.destination} </td>
                    <td>
                      <button
                        className="btn btn-success btn-circle btn-circle-sm m-1"
                        style={{ borderRadius: "50% " }}
                        onClick={() => edit(data)}
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-circle btn-circle-sm m-1"
                        style={{ borderRadius: "50% " }}
                        onClick={() => remove(data.key)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
          {table.length ? (
            <Table
              sendDataa={(met: any, key: any, data: any) =>
                sendData(met, key, data)
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

export default Flight;
