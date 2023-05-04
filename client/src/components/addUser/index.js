import React, { useEffect, useState } from "react";
import "./addUser.scss";
import axios, { Axios } from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "yup-phone";
const AddUser = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState([]);
  const [age, setAge] = useState();
  const country = [...new Set(data.map((item) => item.country))];
  const stateHandler = (e) => {
    const state = data.filter((item) => item.country === e.target.value);
    setState(state);
  };
  country.sort();
  // console.log(state);
  const phoneRegExp =
    /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/;

  const schema = yup.object().shape({
    uName: yup
      .string()
      .required("**Enter a valid Name**")
      .min(3, "**Enter a valid Name**"),
    age: yup
      .string("**Enter a valid DOB **")
      .required("**Enter a valid DOB **"),
    sex: yup.string().required("**Please select your gender**"),
    mobile: yup
      .string()
      .matches(phoneRegExp, "**Enter a Valid Indian Number**")
      .min(10, "**Enter a valid 10 digit Number**")
      .max(10, "**Enter a valid 10 digit Number**"),
    emergencyContact: yup
      .string()
      .matches(phoneRegExp, "**Enter a Valid Indian Number**")
      .min(10, "**Enter a valid 10 digit Number**")
      .max(10, "**Enter a valid 10 digit Number**"),

    idNumber: yup
      .string()
      .when("idType", {
        is: "PANCard",
        then: () =>
          yup
            .string()
            .required()
            .min(10, "**Enter a valid 10-Digit PAN Number**")
            .max(10, "**Enter a valid 10-Digit PAN Number**"),
      })
      .when("idType", {
        is: "AadhaarCard",
        then: () =>
          yup
            .string()
            .required()
            .min(12, "**Enter a valid 12-Digit AadhaarCard Number**")
            .max(12, "**Enter a valid 12-Digit AadhaarCard Number**"),
      })
      .when("idType", {
        is: "",
        then: () =>
          yup.string().required().min(100, "**Kindly select ID Type**"),
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getDataHandler = (data) => {
    axios
      .post("http://localhost:3001", { data })
      .then(() => console.log("Details sent successfully...."))
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  };
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="">
          <u>Personal Details</u>
        </h5>

        <form onSubmit={handleSubmit(getDataHandler)}>
          <div className="form-group row mb-2">
            <div className="col-md-5">
              <div className="form-group row">
                <label className="col-md-2 ">
                  Name <span className="text-danger">*</span>
                </label>
                <div className="col-md-10 ">
                  <input
                    className=" form-control"
                    placeholder="Enter Name"
                    {...register("uName")}
                  />
                  <small className="text-danger">{errors.uName?.message}</small>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group row">
                <label className="col-md-4">
                  Date of Birth or Age <span className="text-danger">*</span>
                </label>
                <div className="col-sm-6 ">
                  <input
                    type="date"
                    className="form-control"
                    {...register("age")}
                    onChange={(e) => {
                      let date = new Date().getFullYear();
                      let selected = new Date(e.target.value).getFullYear();
                      setAge(parseInt(date) - parseInt(selected));
                    }}
                  />

                  <small className="text-danger">{errors.age?.message}</small>
                </div>
                <div className="col-sm-2 ps-0">
                  <input
                    className="form-control disabled"
                    disabled
                    value={age}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group row">
                <label className=" col-lg-2 col-md-3">
                  Sex <span className="text-danger">*</span>
                </label>
                <div className="col-lg-10 col-md-9">
                  <select
                    className=" form-control "
                    placeholder="Select Gender"
                    {...register("sex")}
                  >
                    <option value="" disabled selected>
                      Select Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  <small className="text-danger">{errors.sex?.message}</small>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group row ">
            <div className="col-md-5">
              <div className="form-group row">
                <label className="col-md-2">Mobile</label>
                <div className="col-md-10">
                  <input
                    className=" form-control"
                    placeholder="Enter Mobile"
                    {...register("mobile")}
                  />
                  <small className="text-danger">
                    {errors.mobile?.message}
                  </small>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="form-group row">
                <label className="col-lg-2 col-md-3">Govt Issued ID </label>
                <div className="col-lg-4 col-md-3">
                  <select className=" form-control" {...register("idType")}>
                    <option value="" disabled selected>
                      ID Type
                    </option>
                    <option>AadhaarCard</option>
                    <option>PANCard</option>
                  </select>
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    className=" form-control"
                    placeholder="Enter Govt ID"
                    {...register("idNumber")}
                  />
                  <small className="text-danger">
                    {errors.idNumber?.message}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <h5 className="">
            <u>Contact Details</u>
          </h5>
          <div className="form-group row ">
            <div className="col-md-5">
              <div className="form-group row">
                <label className="col-md-3 col-lg-2">Guardian Details</label>
                <div className="col-md-4 col-lg-3">
                  <select
                    className=" form-control"
                    {...register("guardianLabel")}
                  >
                    <option value="" disabled selected>
                      Enter Label
                    </option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Relation</option>
                    <option>Siblings</option>
                  </select>
                </div>
                <div className="col-md-5 col-lg-7">
                  <input
                    className=" form-control"
                    placeholder="Enter Guardian Name"
                    {...register("guardian")}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group row">
                <label className="col-lg-2 col-md-3">Email</label>

                <div className="col-lg-10 col-md-9">
                  <input
                    className=" form-control"
                    placeholder="Enter Email"
                    {...register("mail")}
                  />
                </div>
              </div>
            </div>{" "}
            <div className="col-md-3">
              <div className="form-group row">
                <label className="col-lg-4 col-md-6">
                  Emergency Contact Number{" "}
                </label>

                <div className=" col-lg-8 col-md-6">
                  <input
                    className=" form-control"
                    placeholder="Enter Emergency No"
                    {...register("emergencyContact")}
                  />
                  <small className="text-danger">
                    {errors.emergencyContact?.message}
                  </small>
                </div>
              </div>
            </div>
          </div>{" "}
          <h5 className="">
            <u>Address Details</u>
          </h5>
          <div className="form-group row ">
            <div className="col-md-5">
              <div className="form-group row">
                <label className="col-lg-2 col-md-3">Address</label>
                <div className="col-lg-10 col-md-9">
                  <input
                    className=" form-control"
                    placeholder="Enter Address"
                    {...register("address")}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group row">
                <label className="col-lg-2 col-md-3">Country</label>
                <div className="col-lg-10 col-md-9">
                  <select
                    className=" form-control"
                    {...register("country")}
                    onChange={stateHandler}
                  >
                    <option value="" disabled selected>
                      Select Country
                    </option>
                    {country.map((item, index) => (
                      <option key={index}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group row">
                <label className="col-lg-2 col-md-3">State</label>
                <div className="col-lg-10 col-md-9">
                  <select
                    type="country"
                    className=" form-control"
                    {...register("state")}
                  >
                    <option value="" disabled selected>
                      {" "}
                      Select State
                    </option>
                    {state.map((item, index) => (
                      <option key={index}>{item.subcountry}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>{" "}
          </div>
          <div className="form-group row ">
            <div className="col-md-5">
              <div className="form-group row">
                <label className="col-md-2">City</label>
                <div className="col-md-8">
                  <input
                    className=" form-control"
                    placeholder="Enter City/Town/Village Name"
                    {...register("city")}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group row">
                <label className="col-md-2">PIN Code</label>
                <div className="col-md-6">
                  <input
                    className=" form-control"
                    placeholder="Enter PIN Code"
                    {...register("PIN")}
                  />
                </div>
              </div>
            </div>
          </div>
          <h5 className="">
            <u>Other Details</u>
          </h5>
          <div className="form-group row">
            <div className="col-md-3">
              <div className="form-group row">
                <label className="col-lg-3 col-md-4">Occupation</label>
                <div className="col-lg-8 col-md-8">
                  <input
                    className=" form-control"
                    placeholder="Enter Occupation"
                    {...register("occupation")}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group row">
                <label className="col-lg-3 col-md-4">Religion</label>
                <div className="col-lg-8 col-md-8">
                  <input
                    className=" form-control"
                    placeholder="Enter Religion"
                    {...register("religion")}
                  />
                </div>
              </div>
            </div>{" "}
            <div className="col-md-3">
              <div className="form-group row">
                <label className="col-lg-3 col-md-5">Marital Status</label>
                <div className="col-lg-8 col-md-7">
                  <select
                    className=" form-control"
                    {...register("maritalStatus")}
                  >
                    <option value="" disabled selected>
                      Marital State
                    </option>
                    <option>Married</option>
                    <option>UnMarried</option>
                    <option>Rather not to Say</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group row">
                <label className="col-lg-3 col-md-5">Blood Group</label>
                <div className="col-lg-8 col-md-7">
                  <select className=" form-control" {...register("bloodGroup")}>
                    <option
                      value=""
                      disabled
                      selected
                      className="text-secondary"
                    >
                      Enter Blood Group
                    </option>
                    <option>A - Positive</option>
                    <option>O - Positive</option>
                    <option>B - Positive</option>
                    <option>AB - Positive</option>
                    <option>A - Negative</option>
                    <option>O - Negative</option>
                    <option>B - Negative</option>
                    <option>AB - Negative</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group row">
                <label className="col-lg-3 col-md-4">Nationality</label>
                <div className="col-lg-8 col-md-8">
                  <input
                    className=" form-control"
                    placeholder="Enter Nationality"
                    {...register("nationality")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="float-end p-3">
            <button className="btn btn-outline-danger p-3 m-3" type="reset">
              Cancel
            </button>
            <button className="btn btn-success p-3 m-3" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
