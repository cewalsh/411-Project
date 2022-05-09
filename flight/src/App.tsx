import { useState, useEffect, FC, useCallback} from "react";
// import axios from 'axios';
// import TableList from './components/TableList'


const App: FC = ({}) => {
  const api_base_url = 'http://localhost:5000/get_flights'
  const [APIData, setAPIData] = useState<string[] | undefined>()
  const [origin, setOrigin] = useState<string | undefined>()
  const [dept_date, setDepDate] = useState<string | undefined>()
  const [oneWay, setOneWay] = useState<string | undefined>()
  const [nonStop, setNonStop] = useState<string | undefined>()

  const handleSubmit = useCallback(() => {
    let url_req_string = api_base_url
    if (origin) { 
      url_req_string = url_req_string + "?origin="+ origin 
    }
    if (dept_date) { 
      url_req_string = url_req_string + "?dept_date=" + dept_date 
    }
    if (oneWay) { 
      url_req_string = url_req_string + "?oneWay=True" 
    }
    if (nonStop) { 
      url_req_string = url_req_string + "?nonStop=True"
    }
      // axios.get(`https://jsonplaceholder.typicode.com/users`)
      //     .then((response) => {
      //         setAPIData(response.data);
      //     })
      fetch(url_req_string)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setAPIData(json);
      });
  }, [])


  return (
    <div className="App">
      <div>
          <form> 
                <input type='text' onChange={(e) => setOrigin(e.target.value)} value={origin}/>
                <label> origin (Ex: BOS)</label><br/>
    
    
                <label> <input type='date' onChange={(e) => setDepDate(e.target.value)} value={dept_date}/>
                origin (Ex: BOS)</label><br/>
    
                <input type="checkbox" onChange={(e) => setOneWay(e.target.value)} value="true"/>
                <label> oneWay</label><br/>
    
                <input type="checkbox" onChange={(e) => setNonStop(e.target.value)} value="true"/>
                <label> non-stop</label><br/>
    
    
                <button value="Submit" onClick={handleSubmit}/>
            </form>
      </div>
      <div>
          {/* <TableList url={url_req_string}/> */}
      </div>
    </div>
    );
}

export default App;