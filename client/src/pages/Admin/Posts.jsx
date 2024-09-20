import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URI } from "../../config/constants";
import { Link } from "react-router-dom";


const Posts = () => {
  const [posts, setPosts] = useState([]);
  

  //getall products
  const getAllPosts = async () => {
    try {
      const { data } = await axios.get("/api/v1/posts/get-posts");
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">select Post for update in List</h1>
          <div className="d-flex flex-wrap">
            {posts?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/post/${p._id}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                {p.photo.length > 0 ? <div>

               <img
                   src={`${BACKEND_URI}${p.photo}`}
                   className="card-img-top"
                   alt="gtyr5w"
                  />
            </div>:<div>
            <video
            preload="auto"
            width="287"
            height="240"
            controls
          >
            <source src={`${BACKEND_URI}${p?.video}`} />
            ;Your browser does not support the video tag.
          </video>
</div>}

                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Posts;
/* 
 {posts?.map((p) => (
            <div className="card m-2" key={p._id}>
           {p.photo.length > 0 ? <div>

              <img
                src={`${BACKEND_URI}${p.photo}`}
                className="card-img-top"
                alt="gtyr5w"
              />
            </div>:<div>
            <video
                          preload="auto"
                          width="287"
                          height="240"
                          controls
                        >
                          <source src={`${BACKEND_URI}${p?.video}`} />
                          ;Your browser does not support the video tag.
                        </video>
              </div>}

              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p?.name}</h5>
                  <h5 className="card-title card-price">
                    likes_
                   {p.likes?.length}
                  </h5>
                  <h6 className="card-title card-price">
                    comments :{p?.comments.length}</h6>
                </div>
                <p className="card-text ">
                  {p?.description?.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/post/${p._id}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="m-2 p-3">
          {posts && posts.length < total && (
            <button
              className="btn loadmore"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? (
                "Loading ..."
              ) : (
                <>
                  {" "}
                  Loadmore <AiOutlineReload />
                </>
              )}
            </button>
          )}

*/