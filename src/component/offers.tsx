import { useEffect, useState } from "react";
import firebase from "firebase";
import Table from "../shared/table/table";
import axios from "axios";
import stat from "../assets/state.json";
import { ToastContainer, toast } from "react-toastify";


function Offers() {
    const [data, setdata]: any = useState();
    const [table, settable]: any = useState([]);
    const [state, setsate]: any = useState([]);
    const [city, setcitys]: any = useState([]);
    const [file, setFile]: any = useState();

    const [tableGgl, settableGgl]: any = useState(false);
    useEffect(() => {
        getdata();
        // setState();
        setsate(Object.keys(stat));
        //console.log(stat);
    }, []);
    function setfile(imagefile: any) {
        console.log(imagefile.target.files);
        setFile(imagefile.target.files[0]);
    }
    function setData(event: any) {
        ////console.log(event.target.name);

        const name = event.target.name;
        const value = event.target.value;
        setdata({ ...data, [name]: value });
        ////console.log({ ...data, [name]: value });
    }
    let col = [
        { "OFFERS IMAGE": "img" },
        { "OFFERS NAME": "offers_name" },
        { "CITY": "city" },
        { "STATE": "state" },
        { "HOTAL TYPE": "offers_type" },
        { "DISCOUNT": "total_price" },
        { "ACTION": "" },
    ];

    function submit() {
        console.log("fdasd");

            if (!data.key && data.key == null) {
            ////console.log("runn");
            firebase
                .storage()
                .ref("/offers/" + file.name)
                .put(file)
                .then((res: any) => {
                    firebase
                        .storage()
                        .ref("/offers/" + file.name)
                        .getDownloadURL()
                        .then((res) => {
                            data.img = res;
                            firebase
                                .database()
                                .ref("/offers")
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
                .ref("/offers/" + file.name)
                .put(file)
                .then((res: any) => {
                    firebase
                        .storage()
                        .ref("/offers/" + file.name)
                        .getDownloadURL()
                        .then((res) => {
                            data.img = res;
                            firebase
                                .database()
                                .ref("/offers/" + data.key)
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
    function getdata() {
        let arr: any[] = [];
        firebase
            .database()
            .ref("/offers")
            .get()
            .then((res) => {
                res.forEach((element) => {
                    // ////console.log( element.forEach(c => ()));
                    arr.push({ key: element.key, ...element.val() });
                    settable(arr);
                    //console.log(arr);

                    ////console.log(arr);
                });
            })
            .catch((err) => {
                ////console.log(err);
            });
    }
    function setcity(e: any) {
        let state: any = stat;
        let city = state[e.target.value];
        setcitys(city);
        //console.log(city);
        setData(e);
    }

    function edit(data: any) {
        ////console.log(data);
        settableGgl(true);
        setdata(data);
    }

    function remove(id: any) {
        ////console.log(id);
        if (window.confirm("Delete the item?")) {
            firebase
                .database()
                .ref("/offers/" + id)
                .remove()
                .then(() => {
                    getdata();
                    toast.error("Delete!");
                })
                .catch(() => { });
        }
    }

    function toggle() {
        setdata({});
        settableGgl(tableGgl ? false : true);
    }
    function setCity() { }

    function sendData(method: any, dataa: any, keys: any) {
        console.log(method);

        if (method == "edit") {
            edit(dataa);
        }
        else {
            remove(dataa.key);
        }
    }

    return (
        <div className="container-fluid">
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
                        &nbsp;Add Offers{" "}
                    </i>
                )}
            </button>
            {tableGgl ? (
                <div>
                    <h3 className="text-center"> offers</h3>
                    <div className="row g-3">
                        <div className="col-md-12">
                            <label htmlFor="inputEmail4" className="form-label">
                                Offer Name
                            </label>
                            <input
                                value={data.offers_name}
                                onChange={(e) => setData(e)}
                                name="offers_name"
                                type="text"
                                className="form-control"
                                id="inputEmail4"
                            />
                        </div>
                        <div className="col-md-12">
                            <h3>Address</h3>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">
                                State
                            </label>
                            <select
                                aria-label="Default select example"
                                onChange={(e) => setcity(e)}
                                name="state"
                                value={data.state}
                                className="form-control"
                                id="inputPassword4"
                            >
                                <option>Options...</option>
                                {state.map((data: any) => {
                                    return <option value={data}>{data}</option>;
                                })}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">
                                City
                            </label>
                            <select
                                aria-label="Default select example"
                                onChange={(e) => setData(e)}
                                name="city"
                                value={data.city}
                                className="form-control"
                                id="inputPassword4"
                            >
                                <option>Options...</option>
                                {city.map((data: any) => {
                                    return <option value={data}>{data}</option>;
                                })}
                            </select>
                        </div>
                        
                        <hr />
                        <div className="col-md-6">
                            <label htmlFor="inputAddress2" className="form-label">
                                Total Discount
                            </label>
                            <input
                                onChange={(e) => setData(e)}
                                value={data.total_price}
                                name="total_price"
                                type="number"
                                className="form-control"
                                id="inputAddress2"
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="inputState" className="form-label">
                                offers type
                            </label>
                            <select
                                id="inputState"
                                className="form-control"
                                onChange={(e) => setData(e)}
                                name="offers_type"
                                value={data.offers_type}
                            >
                                <option selected>Choose...</option>
                                <option value={"Flight"}>Flight</option>
                                <option value={"offers"}>Hotel</option>
                                <option value={"Bus"}>Bus</option>
                                <option value={"Package"}>Package</option>
                                
                            </select>
                        </div>
                        <hr />
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
                <th scope="col">CITY</th>
                <th scope="col">STATE</th>
                <th scope="col">HOTAL TYPE DATE</th>
                <th scope="col">AVAILABLE ROOMS</th>
                <th scope="col">TOTAL ROOMS</th>
              </tr>
            </thead>
            <tbody>
              {table.map((data: any) => {
                // let typr = startSHow(data.offers_type);
                //console.log("DSsfa", typr);

                return (
                  <tr>
                    <th> {data.offers_name} </th>
                    <td> {data.city} </td>
                    <td> {data.state} </td>
                    <td> {typr} </td>
                    <td> {data.avilabe_rooms} </td>
                    <td> {data.total_rooms} </td>
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
                            sendDataa={(met: any, data: any, key: any) =>
                                sendData(met, data, key)
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

export default Offers;
