import React from "react";
import { useState, useCallback} from 'react';
import TableList from './components/TableList'


function App() {
  const [user, setUser] = useState([])
  const [APIData, setAPIData] = useState([])
  const [state, setState] = useState('start')

  const submit = e => {
    e.preventDefault()
    // console.log(user)
    let url_req_string = 'http://localhost:5000/get_flights' + "?origin=" + user.origin + "&dept_date="
    + user.dept_date + "&oneWay=" + "true" + "&nonStop=" + "true";
    fetch(url_req_string)
      .then(res => res.json())
      .then(json => {setAPIData(json.data) 
        setState('add-trip')})   
  }

  return (
    <div className="App">
      <div>
      <form onSubmit={submit}>
      <input 
      type='date' 
      name='dept_date' 
      value={user.dept_date} 
      onChange={e => setUser({ ...user, dept_date: e.target.value })}
      />
      <label for="dept_date">Departure Date</label><br/>

      <input 
      type='text'
      name='origin' 
      value={user.origin}
      onChange={e => setUser({ ...user, origin: e.target.value })}
      />
      <label for="origin">origin (Ex: BOS)</label><br/>

      <input 
      type="checkbox" 
      name="oneWay" 
      value="true" 
      onChange={e => setUser({ ...user, oneWay: e.target.value })}
      />
      <label for="oneWay"> oneWay</label><br/>

      <input 
      type="checkbox" 
      name="nonStop" 
      value="true"
      onChange={e => setUser({ ...user, nonStop: "true" })}
      />
      <label for="nonStop"> non-stop</label><br/>

        <input type="submit" name="Sign Up" />
    </form>
    {state === 'add-trip' && <TableList APIData={APIData}/> }
      </div>
    </div>
    );
}

export default App;

