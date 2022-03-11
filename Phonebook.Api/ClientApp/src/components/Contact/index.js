import React from "react";
import { Link } from "gatsby";
import { useDispatch, useSelector } from "react-redux";
import { getAllContacts, selectedContact } from "../../state/contact";


const ContactComponent = () => {
  const contacts = useSelector(getAllContacts);
  const dispatch = useDispatch();
  const handleClick = (contact) => {
    console.log("selectedContact =" + contact.id + " - " + contact.name)
    dispatch(selectedContact(contact))
  }

  const renderList = contacts?.map((contact) => {
    const { id, name, firstName, number } = contact;
    
    return (
        <Link to={`/contacts/${id}`} onClick={(e)=> handleClick(contact)}>
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
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
  return <>{renderList}</>;
};

export default ContactComponent;
