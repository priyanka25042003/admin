import Booking from "./booking";

function Home() {
    return(
        <div>
        <h1>Report</h1>
        <div className="row mb-3">
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card bg-success text-white h-80">
                    <div className="card-body bg-success" style={{backgroundColor:"#57b960"}}>
                        <div className="rotate">
                            <i className="fa fa-user fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Users</h6>
                        <h1 className="display-6">134</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-danger h-80">
                    <div className="card-body bg-danger">
                        <div className="rotate">
                            <i className="fa fa-list fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Booking</h6>
                        <h1 className="display-6">87</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-info h-80">
                    <div className="card-body bg-info">
                        <div className="rotate">
                        <i className="fab fa-twitter fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Total packages</h6>
                        <h1 className="display-6">125</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-warning h-80">
                    <div className="card-body">
                        <div className="rotate">
                            <i className="fa fa-share fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Feedback</h6>
                        <h1 className="display-6">36</h1>
                    </div>
                </div>
            </div>
        </div>

        </div>
    )
 }

 export default Home;