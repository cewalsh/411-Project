import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
const [APIData, setAPIData] = useState([])
const [filteredResults, setFilteredResults] = useState([]);
const [searchInput, setSearchInput] = useState('');
useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then((response) => {
            setAPIData(response.data);
        })
    // fetch("http://localhost:5000/get_flights").then(data => {
    //     setAPIData(data);
    //     console.log(data)
    //   })
}, [])

const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = APIData.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(APIData)
    }
}

 const handleChange = event => {
  searchItems(event.target.value);
  };

  return (
    <div className="App">
      <input
        icon="text"
        placeholder="Search"
        value={searchInput}
        onChange={handleChange}
      />
      <ul>
         {filteredResults.map(item => (
          <li>{item.name}{": "}{item.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
