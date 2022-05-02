import React from "react";
import './TableList.css'

function TableList(APIData) {
    // const columns = APIData.APIData[0] && Object.keys(APIData.APIData[0])
    console.log(APIData.APIData[0])
    return(
        <table id='students'>
            <tr>  
              <th>Origin</th>
              <th>Departure Date</th>            
              <th>Destination</th>
              <th>Price</th>
            </tr>
            {/* {APIData.APIData.map(( listValue, index ) => <tr>
              {
                columns.map(column => <td>{row[column]}</td>)
              } */}
            {/* </tr> */}
              {/* )} */}
          {APIData.APIData.map(( listValue, index ) => {
          return (
            <tr key={index}>
              <td>{listValue.origin}</td>
              <td>{listValue.dept_date}</td>
              <td>{listValue.destination}</td>
              <td>{listValue.price}</td>
              {/* <td>{listValue.links.flightOffers}</td> */}
            </tr>
          );
        })}

        </table>
      )
}

export default TableList;