import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { useDispatch } from "react-redux";
import { fetchAsyncContacts } from "../state/contact";
import ContactComponent from "../components/Contact";


export default function Home({ data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncContacts());
  }, [dispatch]);


  return (
    <Layout>
    <div className="ui grid container">
      <ContactComponent/>
    </div>
    </Layout>

    )
}

