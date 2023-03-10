import firebase from "firebase";
import { useEffect, useState } from "react";
import table from "../shared/table/table";
import Table from "../shared/table/table";
import { ToastContainer, toast } from "react-toastify";


function Package() {
  const [data, setdata]: any = useState({
    package_name: "",
    from_location: "",
    to_location: "",
    departure_date: "",
    departure_time: "",
    arrival_date: "",
    arrival_time: "",
    destination: "",
    package_seat_type: "",
    package_seat_price: "",
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

    { NAME: "package_name" },
    { FROM: "from_location" },
    { TO: "to_location" },
    { "STATING  DATE": "strating_date" },
    { "ENDING TIME": "ending_date" },
    {"TOTAL PRICE":"total_price"},
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
      .ref("/package/" + id)
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
  const [file, setFile]: any = useState();

  function setfile(imagefile: any) {
    console.log(imagefile.target.files);
    setFile(imagefile.target.files[0]);
  }
  function getdata() {
    let arr: any[] = [];
    firebase
      .database()
      .ref("/package")
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
    console.log("fdasd");

    if (!data.key && data.key == null) {
      ////console.log("runn");
      firebase
        .storage()
        .ref("/package/" + file.name)
        .put(file)
        .then((res: any) => {
          firebase
            .storage()
            .ref("/package/" + file.name)
            .getDownloadURL()
            .then((res) => {
              data.img = res;
              firebase
                .database()
                .ref("/package")
                .push(data)
                .then((res) => {
                  ////console.log(res);
                  settableGgl(false);
                  getdata();
                })
                .catch((err) => {
                  console.log(err);
                });
            }).catch(err => {
              console.log(err);

            })
        }).catch((err: any) => {
          console.log(err);


        })

    } else {
      console.log("fdasd");

      firebase
        .storage()
        .ref("/package/" + file.name)
        .put(file)
        .then((res: any) => {
          firebase
            .storage()
            .ref("/package/" + file.name)
            .getDownloadURL()
            .then((res) => {
              data.img = res;
              firebase
                .database()
                .ref("/package/" + data.key)
                .update(data)
                .then((res) => {
                  ////console.log(res);
                  settableGgl(false);
                  getdata();
                })
                .catch((err) => {
                  console.log(err);
                });
            }).catch(err => {
              console.log(err);

            })
        }).catch((err: any) => {
          console.log(err);


        })
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
            &nbsp;Add package{" "}
          </i>
        )}
      </button>
      {tableGgl ? (
        <div>
          <h3 className="text-center"> Package</h3>
          <div className="row ">
            <div className="ml-3">
              <h3>PACKAGE INFO</h3>
            </div>
            <div className="mt-2 col-md-12 ">
              <label htmlFor="inputPassword4" className="form-label">
                Package Name
              </label>
              <input
                onChange={(e) => setData(e)}
                name="package_name"
                value={data.package_name ? data.package_name : ""}
                type="text"
                className="form-control"
                placeholder="Package Name"
              />
            </div>
            <div className="mt-2 col-md-6 mt-2 col-md-6">
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
            <div className="mt-2 col-md-6 mt-2 col-md-6">
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
            <div className="mt-2 col-md-6 mt-2 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
              Strating Date
              </label>
              <input
                onChange={(e) => setData(e)}
                name="strating_date"
                value={data.strating_date ? data.strating_date : ""}
                type="date"
                className="form-control"
                placeholder=" Strating_date"
              />
            </div>
            <div className="mt-2 col-md-6 mt-2 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Ending Date
              </label>
              <input
                onChange={(e) => setData(e)}
                name="endind_date"
                value={data.ending_date }
                type="date"
                className="form-control"
                placeholder="Ending_Date "
              />
            </div>
           
            <div className="mt-2 col-md-12 mt-2 col-md-6">
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
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                Image
              </label>
              <input
                onChange={(e) => setfile(e)}
                name="iamge"
                type="file"
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="mt-2 col-md-6 mt-2 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Total Price
              </label>
              <input
                value={data.total_price ? data.total_price : ""}
                onChange={(e) => setData(e)}
                name="total_price"
                type="Text"
                className="form-control"
                placeholder="Total Price"
              />
            </div>
            <div className="mt-2 col-md-6 mt-2 col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
              Package Details
              </label>
              <input
                value={data.details ? data.details : ""}
                onChange={(e) => setData(e)}
                name="details"
                type="Text"
                className="form-control"
                placeholder="Package Details"
              />
            </div>
           
            <div className="mt-2 col-10 mt-2 col-md-12 text-center ">
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

export default Package;
