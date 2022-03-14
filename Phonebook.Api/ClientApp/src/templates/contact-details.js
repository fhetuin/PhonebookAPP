import { useSelector } from "react-redux";
import ContactDetailsComponent from "../components/Contact/contactDetails";
import { getSelectedContact } from "../state/contact";
import React from "react"


const ContactDetails = () => {
  const contact = useSelector(getSelectedContact);

  return (
   <ContactDetailsComponent contact={contact} isUpdate={true}/>
  )
}

export default ContactDetails;