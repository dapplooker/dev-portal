"use client";

import axios from "axios";
import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    (async () => {
      console.log("Render...");
      await fetchData();
      await fetchGrowthData();
    })();
  }, []);

  const fetchData = async () => {
    let response = await axios.get(`http://localhost:3000/api/search-stats`);
    console.log("last response", response.data);
  };

  const fetchGrowthData = async () => {
    let response = await axios.get(`http://localhost:3000/api/ecosystem-growth`);
    console.log('growth data', response.data)
  }

  return <>Hello</>;
}
