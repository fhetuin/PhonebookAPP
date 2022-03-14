import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import Layout from "../Layout";
import { createAsyncContact, updateAsyncContact } from "../../state/contact";
import { Link, navigate } from "gatsby";
import { unwrapResult } from "@reduxjs/toolkit";

const ContactDetailsComponent = ({contact, isUpdate}) => {

const dispatch = useDispatch();

const initialValues = contact != null ? contact : { firstName: "", name: "", number: "" };
const [formValues, setFormValues] = useState(initialValues);
const [formErrors, setFormErrors] = useState({});
const [isSubmit, setIsSubmit] = useState(false);
const [apiMessage, setApiMessage] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  setFormErrors(validate(formValues));
  setIsSubmit(true);
};

useEffect(async () => {
  console.log(formErrors);
  if (Object.keys(formErrors).length === 0 && isSubmit) {
    isUpdate ? await dispatch(updateAsyncContact(formValues)).then(unwrapResult)
    .then((result) => {
        navigate('/');
    })
    .catch((error) => {
      setApiMessage(error);
    }) : await dispatch(createAsyncContact(formValues)).then(unwrapResult)
    .then((result) => {
      navigate('/');
    })
    .catch((error) => {
      setApiMessage(error); 
    });

    
  }
}, [formErrors,]);
const validate = (values) => {
  console.log("validation")
  const errors = {};
  const regex = /\+(\d{1,})(\s{1})(\d{1,})(\s{1})(\d{6,})$/;
  if (!values.firstName) {
    errors.firstName = "firstName is required!";
  }
  if (!values.name) {
    errors.name = "Name is required!";
  } else if (!regex.test(values.number)) {
    errors.number = "This is not a valid number format, it should be +33 12 123456!";
  }
  return errors;
};

return (
  <Layout>
<div className="flex justify-center items-center">
{Object.keys(formErrors).length === 0 && isSubmit ? (
      <div className="ui message success">{apiMessage}</div>
    ) : (
      <pre></pre>
    )}

<form onSubmit={handleSubmit} className="w-full pt-5 max-w-lg">
<div className="flex flex-wrap -mx-3 mb-6">
  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
      First Name
    </label>
    <input  value={formValues.firstName} onChange={(e) =>   setFormValues({ ...formValues, firstName: e.target.value })}   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"></input>
    <p className="text-red-500 text-xs italic">{formErrors.username}</p>
  </div>
  <div className="w-full md:w-1/2 px-3">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
      Name
    </label>
    <input value={formValues.name} onChange={(e) =>   setFormValues({ ...formValues, name: e.target.value })}   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"></input>
      <p className="text-red-500 text-xs italic">{formErrors.name}</p>
  </div>
</div>
<div className="flex flex-wrap -mx-3 mb-6">
  <div className="w-full px-3">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
     Number
    </label>
    <input value={formValues.number} onChange={(e) =>   setFormValues({ ...formValues, number: e.target.value })}   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="number" type="text"/>
    <p className="text-red-500 text-xs italic">{formErrors.number}</p>
  </div>
</div>
<div className="md:flex md:items-center">
  <div className="md:w-1/3">
  <Link to="/" className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
    Back
    </Link>
  </div>
  <div className="md:w-2/3">
  <button className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
      {isUpdate? "Update" : "Create"}
    </button>
  </div>
</div>
</form>
</div>
  </Layout>

)}

export default ContactDetailsComponent;