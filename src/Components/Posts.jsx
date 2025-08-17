import { useEffect, useState, useRef } from "react";
import { deletePost, getPost } from "../api/postApi";
import { Form } from "./Form";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export const Posts = () => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});

  const topArrowRef = useRef(null); // ✅ reference to top button
  const buttomArrowRef = useRef(null); // ✅ reference to bottom button
  const editFormRef = useRef(null); // ✅ reference to the form

  // 💫 Fetch the data from the API
  const getPostData = async () => {
    try {
      const res = await getPost();
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  // 💫 Method for Deleting the post
  const handelDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      console.log(id, res);

      const updatedPost = data.filter((curPost) => curPost.id !== id);
      setData(updatedPost);
    } catch (error) {
      console.log("Failed to delete the post");
    }
  };

  // 💫 Method for Handling the post
  const handelEditPost = (curr) => {
    return setEditData(curr);
  };

  // ✅ scroll handler
  const scrollToUp = () => {
    console.log(topArrowRef.current);
    topArrowRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToBottom = () => {
    console.log(buttomArrowRef.current);
    buttomArrowRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToForm = () => {
    console.log(editFormRef.current);
    editFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#17202a] text-white p-2 sm:p-4 md:p-8 relative">
      {/* Form Section */}
      <div
        ref={editFormRef}
        className="w-full flex flex-col justify-center mb-6 mt-8"
      >
        <Form
          data={data}
          setData={setData}
          editData={editData}
          setEditData={setEditData}
        />
        {/* ✅ Floating Down Arrow */}
        <div
          ref={topArrowRef}
          className="flex justify-center w-full mb-10 mt-0"
        >
          <button
            onClick={scrollToBottom}
            className="bg-emerald-600 hover:bg-emerald-700 p-3 rounded-full shadow-lg animate-bounce cursor-pointer mb-25 "
          >
            <FaArrowDown className="text-white text-xl" />
          </button>
        </div>
      </div>

      {/* Posts List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-10 sm:mt-16 mb-20">
        {data.map((curr, index) => {
          const { id, body, title } = curr;
          return (
            <li
              key={id}
              className="rounded-2xl p-4 sm:p-6 bg-[#212f3c] border border-gray-700 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <p>{index + 1}.</p>
              <div className="flex gap-2 mb-3">
                <p className="text-lg sm:text-xl font-bold text-green-400">
                  Title:
                </p>
                <span className="text-lg sm:text-xl text-gray-200">
                  {title}
                </span>
              </div>

              <p className="text-gray-300 text-base sm:text-[1.1rem] mb-6">
                {body}
              </p>

              <div className="flex justify-end gap-2 sm:gap-4">
                <button
                  onClick={() => {
                    handelEditPost(curr);
                    scrollToForm();
                  }}
                  className="px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm font-medium transition-colors shadow cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handelDeletePost(id)}
                  className="px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs sm:text-sm font-medium transition-colors shadow cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* ✅ Scroll Up Button (only visible at the bottom) */}
      <div ref={buttomArrowRef} className="flex justify-center mt-10 mb-10">
        <button
          onClick={scrollToUp}
          className="bg-emerald-600 hover:bg-emerald-700 p-3 rounded-full shadow-lg animate-bounce cursor-pointer"
        >
          <FaArrowUp className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};
