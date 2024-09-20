
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { BACKEND_URI } from "../../config/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { Link } from "react-router-dom";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  
  console.log(userId);
  

  //getall products
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/get-users");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllUsers();
  }, []);
 //delete category

 const handleDelete = async () => {
 
  
  try {
    const { data } = await axios.delete(
      `/api/v1/auth/delete-user/${userId}`
    );
    if (data.success) {
      toast.success(` is deleted`);

      getAllUsers();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Somtihing went wrong");
  }
};
  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
       
        <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Dellete</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                        
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete()
                              setUserId(c._id)
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>

    
      </div>
    </Layout>
  );
};

export default Users;
/*

 <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">select Post for update in List</h1>
          <div className="d-flex flex-wrap">
            {users?.map((u) => (
              <Link
                key={u._id}
                to={`/dashboard/admin/user/${u._id}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${BACKEND_URI}${u.avatar}`}
                    className="card-img-top"
                    alt={u.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{u.name}</h5>
                    <p className="card-text">{u.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
      

        </div>
      </div>
    </Layout>

*/