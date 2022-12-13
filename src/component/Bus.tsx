import { useEffect, useState } from "react";

function Bus() {
  const [data, setdata]: any = useState(
    {bus_name:" ",
    from_location:" ",
    to_location:" ",
    departure_date:" ",
    departure_time:" ",
    arrival_date:" ",
    arrival_time :" ",
    destination:" ",
    bus_seat_type:" ",
    bus_seat_price:" ",
    total_seat:" ",
    available_seat:" ",
    description:" "

});

  function setData(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    setdata({ ...data, [name]: value });
  }


  function submit() {
    console.log(data);
  }

  return (
    <div className="container">
      <h3 className="text-center"> Bus</h3>
      <div className="row g-3">
        <div className="col-md-10 m-1">
          <input
            onChange={(e) => setData(e)}
            name="bus_name"
            value={data.bus_name ? data.bus_name:""}
            type="text"
            className="form-control"
            placeholder="Bus Name"
          />
        </div>
        <div className="col-md-5 m-1">
          <input
            onChange={(e) => setData(e)}
            name="from_location"
            value={data.from_location ? data.from_location:""}
            type="text"
            className="form-control"
            placeholder="From"
          />
        </div>
        <div className="col-md-5 m-1">
          <input
            onChange={(e) => setData(e)}
            name="to_location"
            value={data.to_location ? data.to_location:""}
            type="text"
            className="form-control"
            placeholder="To"
          />
        </div>
        <div className="col-md-5 m-1">
          <input
            onChange={(e) => setData(e)}
            name="departure_date"
            value={data.departure_date ? data.departure_date:""}
            type="date"
            className="form-control"
            placeholder=" Departure Date"
          />
        </div>
        <div className="col-md-5 m-1">
          <input
            onChange={(e) => setData(e)}
            name="departure_time"
            value={data.departure_time ? data.departure_time:""}
            type="time"
            className="form-control"
            placeholder="Departure Time"
          />
        </div>
        <div className="col-md-5 m-1">
          <input
            onChange={(e) => setData(e)}
            name="arrival_date"
            value={data.arrival_date ? data.arrival_date:""}
            type="date"
            className="form-control"
            placeholder=" Arrival Date"
          />
        </div>
        <div className="col-md-5 m-1">
          <input
            value={data.arrival_time ? data.arrival_time:""}
            onChange={(e) => setData(e)}
            name="arrival_time"
            type="time"
            className="form-control"
            placeholder=" Arrival Time"
          />
        </div>
        <div className="col-md-10 m-1">
          <input
            value={data.destination ? data.destination:""}
            onChange={(e) => setData(e)}
            name="destination"
            type="text"
            className="form-control"
            placeholder="Destination"
          />
        </div>
        <div className="col-md-5 m-1">
          <input
            value={data.bus_seat_type ? data.bus_seat_type:""}
            onChange={(e) => setData(e)}
            name="bus_seat_type"
            type="Text"
            className="form-control"
            placeholder="Seat Type"
          />
        </div>
        <div className="col-md-5 m-1">
          <input
            value={data.bus_seat_price ? data.bus_seat_price:""}
            onChange={(e) => setData(e)}
            name="bus_seat_price"
            type="Text"
            className="form-control"
            placeholder="Seat Price"
          />
        </div>
        <div className="col-md-5 m-1">
          <input
            value={data.total_seat ? data.total_seat:""}
            onChange={(e) => setData(e)}
            name="total_seat"
            type="Text"
            className="form-control"
            placeholder="Total Seat"
          />
        </div>
        <div className="col-md-5 m-1">
          <input
            value={data.available_seat ? data.available_seat:""}
            onChange={(e) => setData(e)}
            name="available_seat"
            type="Text"
            className="form-control"
            placeholder="Available Seat"
          />
        </div>
        <div className="col-10 m-1 text-center ">
          <textarea
            value={data.description ? data.description:""}
            onChange={(e) => setData(e)}
            name="description"
            className="form-control"
            placeholder="Discrpition"
            rows={3}
          ></textarea>
        </div>
        <div className="col-10 m-1 text-center ">
          <button
            onClick={submit}
            type="submit"
            className="btn btn-primary  "
          
          >
Submit
          </button>
        </div>




      </div>
    </div>
  )
}

export default Bus;