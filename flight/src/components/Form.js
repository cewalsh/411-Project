import React from "react";
import { useState} from 'react';
import TableList from './TableList'


function Form() {
  const [user, setUser] = useState([])
  const [APIData, setAPIData] = useState([])
  const [state, setState] = useState('start')

  const submit = e => {
    e.preventDefault()
    // console.log(user)
    let url_req_string = 'http://localhost:5000/get_flights' + "?origin=" + user.origin + "&dept_date="
    + user.dept_date + "&oneWay=" + "true" + "&nonStop=" + "true" + "&rain=" + "false" + "&min_temp=" + user.temp;
    // console.log(url_req_string)
    fetch(url_req_string)
      .then(res => res.json())
      .then(json => {setAPIData(json) 
        setState('add-trip')
        console.log(json)}) 
          
  }

  const pastSearch = e => {
    e.preventDefault()
    fetch('http://localhost:5000/get_search')
      .then(res => res.json())
      .then(json => {console.log(json)
      let url_req_string = 'http://localhost:5000/get_flights' + "?origin=" + json.origin + "&dept_date="
      + json.dept_date + "&oneWay=" + "true" + "&nonStop=" + "true" + "&rain=" + "false" + "&min_temp=" + json.min_temp;
      console.log(url_req_string)
      fetch(url_req_string)
        .then(res => res.json())
        .then(json => {setAPIData(json) 
          setState('add-trip')
          console.log(json)})
      }) 
  }

  return (
    <div className="App">
        {/* <h2>React Google Login Example</h2> */}


      <div>

      <form onSubmit={submit}>

      <table>
        <th>
      <br/><label for="dept_date">Departure Date: </label><br/>
      <input 
      type='date' 
      name='dept_date' 
      value={user.dept_date} 
      onChange={e => setUser({ ...user, dept_date: e.target.value })}
      />
      </th>

      <th>
      <br/><label for="origin">origin (Ex: BOS):</label><br/>
      <input 
      type='text'
      name='origin' 
      value={user.origin}
      onChange={e => setUser({ ...user, origin: e.target.value })}
      />
      </th>

      <th>
      <br/><br/><label for="oneWay"> oneWay: </label>
      <input 
      type="checkbox" 
      name="oneWay" 
      value="true" 
      onChange={e => setUser({ ...user, oneWay: e.target.value })}
      />
      </th>
      <th>
      <br/><br/><label for="nonStop"> non-stop:</label>
      <input 
      type="checkbox" 
      name="nonStop" 
      value="true"
      onChange={e => setUser({ ...user, nonStop: "true" })}
      />
      </th>

      <th>
      <br/><label for="temp">Minimum Temperature:</label><br/>
      <input 
      type='text'
      name='temp' 
      value={user.temp}
      onChange={e => setUser({ ...user, temp: e.target.value })}
      />
      </th>

      <th>
      <br/><br/><label for="nonStop"> Rain?</label>
      <input 
      type="checkbox" 
      name="rain" 
      value="true"
      onChange={e => setUser({ ...user, rain: "true" })}
      />
      </th>
      
      
      <th>
      <br/><br/><input type="submit" name="Sign Up" />
        </th>
        </table>
    </form>
    <table>
    <button onClick={pastSearch} type="submit">Get past search</button>
    </table>
    {/* {state === 'add-trip' &&  */}
    <TableList APIData={APIData} state={state}/>
      </div>
    </div>
    );
}

export default Form;