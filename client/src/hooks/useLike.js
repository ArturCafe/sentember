import { useState, useEffect, useId } from "react";
import axios from "axios";





export default function useLike() {
    const [lakes, setLakes] = useState([0]);
    
    
    const upLakies = async () => {
    try {
      const { data } = await axios.post("/api/v1/posts/create-uplakes");
      setLakes(data?.category);
    } catch (error) {
      console.log(error); 
   } };
    useEffect(() => {
      upLakies();
    }, []);
    
    return lakes;
  }
  
  