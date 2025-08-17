import { act, useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { postData, updateData } from "../api/postApi";

export const Form = ({ data, setData, editData, setEditData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  // 💫 Get the updated data and add into input field
  useEffect(() => {
    editData &&
      setAddData({
        title: editData.title || "",
        body: editData.body || "",
      });
  }, [editData]);

  // 💫 updating the state value by the user input
  const handelInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 💫 Add the new post
  const addPostData = async () => {
    try {
      const res = await postData(addData);
      console.log("Default ID: ", res.data);
      if (res.status === 201) {
        // Generate a unique id
        const newId =
          data.length > 0 ? Math.max(...data.map((post) => post.id)) + 1 : 1;
        // Create a new post object with your unique id
        const newPost = { ...res.data, id: newId };
        console.log("Generated ID: ", newPost);
        setData([...data, newPost]);
        setAddData({ title: "", body: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 💫 Update the Edited data in the api
  const updateEditData = async () => {
    try {
      const res = await updateData(editData.id, addData);
      if (res.status === 200) {
        setData((prev) =>
          prev.map((cur) =>
            cur.id === res.data.id ? { ...cur, ...addData } : cur
          )
        );
        setAddData({ title: "", body: "" });
        setEditData({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 💫 Form handling
  const handelFormSubmit = (e) => {
    e.preventDefault();

    const action = e.nativeEvent.submitter.value;
    console.log(action);
    if (action === "Share") {
      addPostData();
    } else if (action === "Edit") {
      updateEditData();
    }
  };

  // 💫 Edit or Share post button According to the user requirement
  let isEmpty = Object.keys(editData).length === 0;

  return (
    <div className="mb-20 mt-10 flex flex-col justify-center items-center bg-[#17202a] px-2 sm:px-4">
      <form
        onSubmit={handelFormSubmit}
        className="bg-[#212f3c] p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-emerald-400 mb-6 text-center">
          Share Post
        </h1>

        {/* Input field */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Title</label>
          <input
            type="text"
            placeholder="Add title"
            name="title"
            value={addData.title}
            onChange={(e) => handelInputChange(e)}
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Textarea field */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Body</label>
          <textarea
            placeholder="Add Post"
            rows="4"
            name="body"
            value={addData.body}
            onChange={(e) => handelInputChange(e)}
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>

        {/* Submit button */}

        <button
          type="submit"
          value={isEmpty ? "Share" : "Edit"}
          className="w-full px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors cursor-pointer flex flex-row justify-center items-center "
        >
          {isEmpty ? (
            <span className="flex items-center">
              <IoIosSend className="pr-2 text-3xl" /> Share
            </span>
          ) : (
            "Edit"
          )}
        </button>
      </form>
    </div>
  );
};
