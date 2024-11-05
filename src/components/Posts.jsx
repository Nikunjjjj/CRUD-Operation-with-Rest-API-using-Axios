import { useEffect, useState } from "react";
import { getpost, deletepost } from "../api/Postapi";
import Form from "./Form";

const Posts = () => {
  const [data, setdata] = useState([]);
  const [updatedata, setupdatedata] = useState({});


  // function to get post
  const getpostdata = async () => {
    const res = await getpost();
    console.log(res.data);
    setdata(res.data);
  };

  useEffect(() => {
    getpostdata();
  }, []);

  // function to delete post
  const deletehandler = async (id) => {
    try {
      const res = await deletepost(id);
      if (res.status === 200) {
        const newUpdatedPosts = data.filter((curpost) => {
          return curpost.id !== id;
        });
        setdata(newUpdatedPosts);
      } else {
        console.log("Failed to delete the post:", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePost = (item) => {
    setupdatedata(item);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        CRUD Operation with Rest API using Axios
      </h1>
      <section>
        <Form
          data={data}
          setdata={setdata}
          updatedata={updatedata}
          setupdatedata={setupdatedata}
        />
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded px-4 py-6">
            <span>{item.id}</span>
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-gray-700">{item.body}</p>
            <div className="flex space-x-20 mt-2">
              <button
                onClick={() => deletehandler(item.id)}
                className="bg-red-600 hover:bg-red-800 text-white font-medium py-2 px-4 rounded shadow"
              >
                Delete
              </button>
              <button
                className="bg-indigo-600 hover:bg-indigo-800 text-white font-medium py-2 px-4 rounded shadow"
                onClick={() => handleUpdatePost(item)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
