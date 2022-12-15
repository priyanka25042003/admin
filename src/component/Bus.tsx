import { useEffect, useState } from "react";
import Table from "../shared/table/table";

function Bus() {
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

  function setData(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    setdata({ ...data, [name]: value });
  }

  function submit() {
  }

  return (
    <div className="container-fluid">
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
          <h3>
            BUS SEAT
          </h3>
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
          <button onClick={submit} type="submit" className="btn btn-primary  ">
            Submit
          </button>
        </div>
      
    </div>
  );
}

export default Bus;
