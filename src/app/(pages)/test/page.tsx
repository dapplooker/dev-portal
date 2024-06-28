"use client";
import axios from "axios";
import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    (async () => {
      console.log("Render...");
      await fetchSearchStats();
      await fetchGrowthData();
      await fetchChartsData();
    })();
  }, []);

  const fetchSearchStats = async () => {
    let response = await axios.get(`http://localhost:3000/api/search-stats`);
    console.log("last response", response.data);
  };

  const fetchGrowthData = async () => {
    let response = await axios.get(`http://localhost:3000/api/ecosystem-growth`);
    console.log("growth data", response.data);
  };
  const fetchChartsData = async () => {
    // let response = await axios.get(`http://localhost:3000/api/monthly-projects`);
    // console.log("final monthly-projects", response);

    // let contributions = await axios.get(`http://localhost:3000/api/monthly-contributions`);
    // console.log("final monthly-contributions", contributions);

    //Top Developers
    // let topDevs = await axios.get(`http://localhost:3000/api/top-developers`);
    // console.log("Top Devs", topDevs);

    //Top Projects
    let topProjects = await axios.get(`http://localhost:3000/api/top-projects`);
    console.log("Top Projects", topProjects);
  };

  return <>Hello</>;
}
