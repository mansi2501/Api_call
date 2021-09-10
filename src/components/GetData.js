import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';


const GetData = () => {

    const [uData, setUData] = useState([])

    useEffect(() => {
        loadData();
    },[])

    const loadData = () =>{

        fetch('http://localhost:4000/users')
            .then((resp)=> resp.json())
            .then(result => setUData(result))
    }

    const deleteUser = id =>{

        fetch(`http://localhost:4000/users/${id}`, {method: 'DELETE'})
            .then((resp)=> resp.json())
            .then(result => {console.log(result)})

        loadData()
    }

return (
        <div id="getdata">
            <h2>All User Data</h2>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Website</th>
                    <th colSpan={2}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {console.log(uData)}
                {   uData.length > 0 ?
                    uData.map((res, index)=>(
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{res.email}</td>
                        <td>{res.address}</td>
                        <td>{res.website}</td>
                        <td><Link className="btn btn-primary" to={`/editdata/${(res.id)}`}>Edit Data</Link></td>
                        <td><Button className="btn btn-danger" onClick={() => deleteUser(res.id)}>Delete Data</Button></td>
                    </tr>
                )): 'Data not found'}   
                </tbody>
            </Table>
        </div>
    )
}

export default GetData
