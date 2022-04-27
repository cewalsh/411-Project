import React from "react";

function TableList(APIData) {
    const columns = APIData.APIData[0] && Object.keys(APIData.APIData[0])
    console.log(APIData.APIData[0])
    return(
        <table id='students'>
            <tr>              
              <th>Destination</th>
              <th>Price</th>
              {/* <th>Links</th> */}
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
              <td>{listValue.destination}</td>
              <td>{listValue.price.total}</td>
              {/* <td>{listValue.links.flightOffers}</td> */}
            </tr>
          );
        })}

        </table>
      )
}

export default TableList;