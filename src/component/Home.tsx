import Booking from "./booking";
import "./home.css";
import firebase
    from "firebase";
import { useEffect, useState } from "react";
// import admin from "firebase-admin";
// admin.initializeApp();

// const auth = admin.auth();
function Home() {
    const [flight, setflight]: any = useState()
    const [hotel, sethotel]: any = useState()
    const [bus, setbus]: any = useState()
    const [booking, setbooking]: any = useState()
    const [packages, setpackages]: any = useState()
    const [reven, setrevenyu]: any = useState(0)
    const [cancle, setcancle]: any = useState(0)

    const [lastbook, lastbooking]: any = useState([])
    const [feedback, setfeedback]: any = useState([])
    

    useEffect(() => {
        getflight();
        gethotel();
        getbus();
        getbookings();
        getpackage();
        getdfeed()
        // getusers()
    }, []);


    function getdfeed() {
        let arr: any[] = [];
        firebase
            .database()
            .ref("/contectus")
            .get()
            .then((res) => {
                res.forEach((element) => {
                    // ////console.log( element.forEach(c => ()));
                    arr.push({ key: element.key, ...element.val() });
                    setfeedback(arr);
                });
                console.log("####3333", arr);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    //     function getusers() {
    //         const maxResults = 1; 

    //   auth.listUsers(maxResults).then((userRecords) => {
    //     userRecords.users.forEach((user) => console.log(user.toJSON()));
    //   }).catch((error) => console.log(error));
    //     }
    function getflight() {
        let arr: any[] = [];
        // debugger

        firebase
            .database()
            .ref("/flight")
            .get()
            .then((res) => {
                res.forEach((element) => {
                    //// console.log( element.forEach(c => ()));
                    arr.push({ key: element.key, ...element.val() });
                    setflight(arr.length)
                    // console.log(arr);
                });
            })
            .catch((err) => {
                // console.log(err);
            });

    }
    function gethotel() {
        let arr: any[] = [];
        firebase
            .database()
            .ref("/hotel")
            .get()
            .then((res) => {
                res.forEach((element) => {
                    // ////console.log( element.forEach(c => ()));
                    arr.push({ key: element.key, ...element.val() });
                    //console.log(arr);
                    sethotel(arr.length)
                    ////console.log(arr);
                });
            })
            .catch((err) => {
                ////console.log(err);
            });
    }
    function getbus() {
        let arr: any[] = [];
        firebase
            .database()
            .ref("/bus")
            .get()
            .then((res) => {
                // console.log(res);
                res.forEach((element) => {
                    // ////console.log( element.forEach(c => ()));
                    arr.push({ key: element.key, ...element.val() });
                    // console.log(arr);
                    setbus(arr.length)

                    ////console.log(arr);
                });
            })
            .catch((err) => {
                // console.log(err);
            });

    }
    function getbookings() {
        let arr: any[] = [];
        firebase
            .database()
            .ref("/booking")
            .get()
            .then((res) => {
                res.forEach((element) => {
                    //// console.log( element.forEach(c => ()));
                    arr.push({ key: element.key, ...element.val() });
                    setbooking(arr.length)
                    lastbooking(arr)
                    console.log(arr);
                    
                });
                let revenue = 0
                let can = 0
                arr.forEach((e)=>{
                    console.log(e.pyment,e.cancel != undefined);
                    
                   
                    if (e.cancel != undefined) {
                        can ++
                    }
                    if (e.cancel == undefined) {
                        revenue =  revenue + e.pyment
                    }
                   
                    setcancle(can)
                    setrevenyu(revenue)
                    console.log(can, revenue);
                    
                })
                console.log(cancle,reven);

            })
            .catch((err) => {
                // console.log(err);
            });
    }
    function getpackage() {
        let arr: any[] = [];
        firebase
            .database()
            .ref("/package")
            .get()
            .then((res) => {
                // console.log(res);
                res.forEach((element) => {
                    // ////console.log( element.forEach(c => ()));
                    arr.push({ key: element.key, ...element.val() });
                    setpackages(arr.length)

                    //// console.log(arr);

                    ////console.log(arr);
                });
            })
            .catch((err) => {
                // console.log(err);
            });
    }
    return (
        <div>
            <div className="card m-1 reducs shadows  ">
                <div className="card-body">
                    <h2 className="card-title">Report</h2>
                    <div className="row mb-3 mt-1 ml-5 mr-5" >
                        <div className="col-xl-3 col-sm-6 py-2 " >
                            <div className="card  text-white h-50 shadowss  reducs">
                                <div className="card-body justify-content-between reducs align-items-center d-flex" style={{ backgroundColor: "#58a5f9" }}>
                                    <div className="rotate p-3">
                                        <i className="fa fa-user fa-5x opacity"></i>
                                        <h6 className="text-uppercase">Users</h6>

                                    </div>
                                    <h1 className="display-6 opacity">13</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 py-2">
                            <div className="card text-white bg-warning h-80 shadowss reducs">
                                <div className="card-body bg-warning justify-content-between reducs  align-items-center d-flex" style={{ backgroundColor: "#ffd554" }}>
                                    <div className="rotate p-3 ">
                                        <i className="fa fa-list fa-5x opacity" ></i>
                                        <h6 className="text-uppercase">Booking</h6>
                                    </div>
                                    <h1 className="display-6 opacity">{booking}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 py-2">
                            <div className="card text-white  h-80 shadowss reducs">
                                <div className="card-body  justify-content-between reducs align-items-center d-flex" style={{ backgroundColor: "rgb(95, 202, 105)" }}>
                                    <div className="rotate p-3">
                                        <i className="fa fa-inr fa-5x opacity"></i>
                                        <h6 className="text-uppercase">Total Revenue</h6>
                                    </div>
                                    <h1 className="display-6 opacity">{reven}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 py-2">
                            <div className="card text-white  h-80 shadowss reducs">
                                <div className="card-body    justify-content-between reducs align-items-center  d-flex" style={{ backgroundColor: "#ec5c6a" }}>
                                    <div className="rotate p-3">
                                        <i className="fa fa-times fa-5x opacity"></i>
                                        <h6 className="text-uppercase">Canceled Booking</h6>
                                    </div>
                                    <h1 className="display-6 opacity">{cancle}</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3 mt-1 ml-5 mr-5">

                        <div className="col-xl-3  col-sm-6 py-2 " >
                            <div className="card back-purpul  text-white h-80 shadowss  reducs">
                                <div className="card-body back-purpul justify-content-between reducs align-items-center d-flex" style={{ backgroundColor: "#da8ee7" }}>
                                    <div className="rotate p-3">
                                        <i className="fa fa-fighter-jet fa-5x opacity"></i>
                                        <h6 className="text-uppercase">Flight</h6>

                                    </div>
                                    <h1 className="display-6 opacity">{flight}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 py-2 " >
                            <div className="card   bg-info  text-white h-80 shadowss  reducs">
                                <div className="card-body bg-info justify-content-between reducs align-items-center d-flex" style={{ backgroundColor: "#57b960" }}>
                                    <div className="rotate p-3">
                                        <i className="fa fa-home fa-5x opacity"></i>
                                        <h6 className="text-uppercase">Hotel</h6>
                                    </div>
                                    <h1 className="display-6 opacity">{hotel}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 py-2 " >
                            <div className="card  text-white h-80 shadowss  reducs">
                                <div className="card-body  justify-content-between reducs align-items-center d-flex" style={{ backgroundColor: "#808080" }}>
                                    <div className="rotate p-3">
                                        <i className="fa fa-bus fa-5x opacity"></i>
                                        <h6 className="text-uppercase">Bus</h6>

                                    </div>
                                    <h1 className="display-6 opacity">{bus}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 py-2 " >
                            <div className="card  text-white h-80 shadowss  reducs">
                                <div className="card-body  justify-content-between reducs align-items-center d-flex" style={{ backgroundColor: "#ff8b3d" }}>
                                    <div className="rotate p-3">
                                        <i className="fa fa-ticket fa-5x opacity"></i>
                                        <h6 className="text-uppercase">Package</h6>

                                    </div>
                                    <h1 className="display-6 opacity">{packages}</h1>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12 ml-5 mt-3 mb-3"  >
                            <div className="card" style={{ width: "18rem;" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Latest Booking</h5>
                                    <table className="table" style={{ width: "18rem;" }}>
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Boking type</th>
                                                <th scope="col">payment Id</th>
                                            </tr>
                                        </thead>
                                        <tbody>{
                                            lastbook.map((res: any, index: any) => {
                                                if (index + 1 <= 5) {
                                                    return (<tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{res.name}</td>
                                                        <td>{res.hotel_name ? "Hotel" : ""}{res.flight_name ? "Flight" : ""}{res.bus_name ? "Bus" : ""}{res.pakage ? "Package" : ""}</td>
                                                        <td>{res.paymentid}</td>
                                                    </tr>)
                                                }

                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 ml-5 mt-3 mb-3"  >
                            <div className="card   " style={{ width: "18rem;" }}>
                                <div className="card-body">
                                    <h5 className="card-title">Feedback</h5>
                                    <table className="table">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">NAME</th>
                                                <th scope="col">EMAIL</th>
                                                <th scope="col">PHONE</th>
                                                <th scope="col">MESSAGE</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {feedback.map((res: any, index: any) => {
                                                return (<tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{res.name}</td>
                                                    <td>{res.email}</td>
                                                    <td>{res.phone}</td>
                                                    <td>{res.message}</td>

                                                </tr>)
                                            })}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Home;