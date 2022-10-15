import { useEffect, useState } from "react";
import firebase from "firebase";

function Hotel() {
  const [data, setdata]: any = useState();
  const [table, settable]: any = useState([]);

  const [tableGgl, settableGgl]: any = useState(false);
  function setData(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    setdata({ ...data, [name]: value });
  }

  function submit() {
    console.log(data);
    if (!data.key) {
      firebase
        .database()
        .ref("/hotel")
        .push(data)
        .then((res) => {
          console.log(res);
          settableGgl(false);
          getdata();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      firebase
        .database()
        .ref("/hotel/" + data.key)
        .update(data)
        .then((res) => {
          console.log(res);
          settableGgl(false);
          getdata();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function getdata() {
    let arr: any[] = [];
    firebase
      .database()
      .ref("/hotel")
      .get()
      .then((res) => {
        res.forEach((element) => {
          // console.log( element.forEach(c => ()));
          arr.push({ key: element.key, ...element.val() });
          settable(arr);
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
    console.log(id);
    firebase
      .database()
      .ref("/hotel/" + id)
      .remove()
      .then(() => {
        getdata();
      })
      .catch(() => {});
  }

  useEffect(() => {
    getdata();
  }, []);

  function toggle() {
    setdata({});
    settableGgl(tableGgl ? false : true);
  }

  return (
    <div className="container">
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
            &nbsp;Add Hotel{" "}
          </i>
        )}
      </button>
      {tableGgl ? (
        <div>
          <h3 className="text-center"> Hotel</h3>
          <div className="row g-3">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Hotel Name
              </label>
              <input
                value={data.hotel_name}
                onChange={(e) => setData(e)}
                name="hotel_name"
                type="text"
                className="form-control"
                id="inputEmail4"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Address
              </label>
              <input
                onChange={(e) => setData(e)}
                name="hotel_address"
                value={data.hotel_address}
                type="text"
                className="form-control"
                id="inputPassword4"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputAddress" className="form-label">
                Total Rooms
              </label>
              <input
                onChange={(e) => setData(e)}
                name="total_rooms"
                value={data.total_rooms}
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputAddress2" className="form-label">
                Total Price
              </label>
              <input
                onChange={(e) => setData(e)}
                value={data.total_price}
                name="total_price"
                type="number"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label"></label>
              <input
                onChange={(e) => setData(e)}
                value={data.hotel_type}
                name="hotel_type"
                type="text"
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputState" className="form-label">
                Hotel Type
              </label>
              <select id="inputState" className="form-select form-control" >
                <option selected>Choose...</option>
                <option value={"5"} >⭐⭐⭐⭐⭐</option>
                <option value={"4"} >⭐⭐⭐⭐</option>
                <option value={"3"} >⭐⭐⭐</option>
                <option value={"2"} >⭐⭐</option>
                <option value={"1"} >⭐</option>
              </select>
            </div>

            <div>
              <hr />
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
          <table className="table table-striped">
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
                    <th> {data.Hotel_name} </th>
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
          </table>
        </div>
      )}
    </div>
  );
}

export default Hotel;
