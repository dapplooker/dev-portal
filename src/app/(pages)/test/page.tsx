"use client";

import axios from "axios";
import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    (async () => {
      console.log("Render...");
      await fetchData();
    })();
  }, []);

  const fetchData = async () => {
    let response = await axios.get(`http://localhost:3000/api/graph-details`);
    console.log("last response", response.data);
  };

  return <>Hello</>;
}
