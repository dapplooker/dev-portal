"use client";
import axios from "axios";
import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    (async () => {
      console.log("Render...");
      await fetchData();
      await fetchChartsData();
    })();
  }, []);

  const fetchData = async () => {
    let response = await axios.get(`http://localhost:3000/api/search-stats`);
    console.log("last response", response.data);
  };

  const fetchChartsData = async () => {
    // let response = await axios.get(`http://localhost:3000/api/monthly-projects`);
    // console.log("final monthly-projects", response);

    let contributions = await axios.get(`http://localhost:3000/api/monthly-contributions`);
    console.log("final monthly-contributions", contributions);
  };

  return <>Hello</>;
}
