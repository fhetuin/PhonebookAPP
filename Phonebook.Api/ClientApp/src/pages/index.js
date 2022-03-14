import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { useDispatch } from "react-redux";
import { fetchAsyncContacts } from "../state/contact";
import ContactComponent from "../components/Contact";
import { Link } from "gatsby";


export default function Home({ data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncContacts());
  }, [dispatch]);


  return (
    <Layout>
    <div className="ui grid container">

    <div className="md:flex md:items-center">

  <div className="md:w-2/3">
  <Link to={"/contact/create/"} className="text-white bg-blue-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >

Add Contact
<svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>

</Link>
  </div>
</div>

<ContactComponent/>
    </div>
    </Layout>

    )
}

