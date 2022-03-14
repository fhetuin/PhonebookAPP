import React, { useState } from "react";
import { Link } from "gatsby";
import { useDispatch, useSelector } from "react-redux";
import { getAllContacts, selectedContact } from "../../state/contact";


const ContactsComponent = () => {
  const [search, setSearch] = useState("");
  const contacts = useSelector(getAllContacts);
  const dispatch = useDispatch();
  const handleClick = (contact) => {
    dispatch(selectedContact(contact))
  }

  const renderList = contacts?.filter((val) => {
    if(search =="")
    return val;
    else if(val.name.toLowerCase().includes(search.toLowerCase()) || val.number.toLowerCase().includes(search.toLowerCase()))
      return val;
  }).map((contact) => {
    const { id, name, firstName, number } = contact;
    
    return (
        <Link  key={contact.id} to={`/contact/${id}`} onClick={(e)=> handleClick(contact)}>
        <div  className="mt-1 p-5 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div className="shrink-0">
  </div>
  <div>
    <div className="text-xl font-medium text-primary">{name + "  " + firstName}</div>
    <p className="text-slate-500">{number}</p>
  </div>
  </div>
  </Link>
    );
  });
  return <div className="container">
        <input  onChange={(e) =>  setSearch(e.target.value)}   className="mt-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter name or number..."></input>

    {renderList}</div>;
};

export default ContactsComponent;
