/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { postdata, updatepost } from "../api/Postapi";

const Form = ({ data, setdata, updatedata, setupdatedata }) => {
  const [adddata, setadddata] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updatedata).length===0;

  useEffect(() => {
    updatedata &&
      setadddata({
        title: updatedata.title || "",
        body: updatedata.body || "",
      });
  }, [updatedata]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setadddata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addpostdata = async () => {
    const res = await postdata(adddata);
    console.log("res", res);
    if (res.status === 201) {
      setdata([...data, res.data]);
      setadddata({ title: "", body: "" });
    }
  };

  const updatepostdata = async () => {
    try {
      const res = await updatepost(updatedata.id, adddata);
      console.log(res);

      if (res.status === 200) {
        setdata((prev) => {
          return prev.map((item) => {
            return item.id === res.data.id ? res.data : item;
          });
        });

        setadddata({ title: "", body: "" });
        setupdatedata({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   form submission
  const handleformsubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addpostdata();
    } 
    else if (action === "Edit") {
      updatepostdata();
    }
  };

  return (
    <>
      <form
        onSubmit={handleformsubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col md:flex-row md:space-x-4"
      >
        <div className="mb-4 md:mb-0 w-full md:w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            autoComplete="off"
            id="title"
            name="title"
            placeholder="Add Title"
            value={adddata.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 md:mb-0 w-full md:w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Body
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            autoComplete="off"
            placeholder="Add Post"
            id="body"
            name="body"
            value={adddata.body}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 md:mt-0"
          type="submit"
          value={isEmpty ? "Add" : "Edit"}
        >{isEmpty ? "Add" : "Edit"}</button>
      </form>
    </>
  );
};

export default Form;
