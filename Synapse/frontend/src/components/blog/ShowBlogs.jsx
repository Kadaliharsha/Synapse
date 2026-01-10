import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { AiFillLike, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import API from "../../api/api";
import Cookies from "js-cookie";
import { MdDelete } from "react-icons/md";

const ShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const email = Cookies.get("email");

  useEffect(() => {
    API.get("/user/blogs")
      .then((response) => {
        setBlogs(response.data);
        fetchUserDetails(response.data);
        fetchLikedBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const fetchUserDetails = (blogs) => {
    const emails = [...new Set(blogs.map((blog) => blog.email))];
    const fetchDetails = emails.map((email) =>
      API.get(`/user/name/${email}`)
        .then((response) => {
          return {
            email,
            name: response.data.username,
            profilePhoto: response.data.profilePicture,
          };
        })
        .catch((error) => {
          console.error(`Error fetching user details for ${email}:`, error);
          return { email, name: "Unknown", profilePhoto: null };
        })
    );

    Promise.all(fetchDetails).then((details) => {
      const detailsMap = details.reduce((acc, detail) => {
        acc[detail.email] = detail;
        return acc;
      }, {});
      setUserDetails(detailsMap);
    });
  };

  const fetchLikedBlogs = (blogs) => {
    const liked = blogs.filter((blog) => blog.likedBy.includes(email));
    setLikedBlogs(liked.map((blog) => blog.id));
  };

  const handleLike = (id) => {
    API.put(`/user/blogs/${id}/like`, null, {
      params: { userEmail: email },
    })
      .then(() => {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
          )
        );
        setLikedBlogs((prevLiked) => [...prevLiked, id]);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("You have already liked this blog.");
        } else {
          console.error("Error liking blog:", error);
        }
      });
  };

  const handleDelete = (id) => {
    API.delete(`/user/blogs/${id}`)
      .then(() => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
      });
  };

  const goToNext = () => {
    if (currentIndex + 6 < blogs.length) {
      setCurrentIndex(currentIndex + 6);
    }
  };

  const goToPrevious = () => {
    if (currentIndex - 6 >= 0) {
      setCurrentIndex(currentIndex - 6);
    }
  };

  const currentBlogs = blogs.slice(currentIndex, currentIndex + 6);

  return (
    <div className="w-full h-auto bg-gray-100 p-6 flex flex-col items-center">
      <div className="flex justify-between w-full mb-4">
        {currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
          >
            <AiOutlineLeft className="mr-2" /> Prev
          </button>
        )}
        {currentIndex + 6 < blogs.length && (
          <button
            onClick={goToNext}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 ml-auto"
          >
            Next <AiOutlineRight className="ml-2" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {currentBlogs.map((blog) => {
          const user = userDetails[blog.email] || {};
          const isLiked = likedBlogs.includes(blog.id);
          return (
            <div
              key={blog.id}
              className="bg-white w-[450px] h-[680px] m-auto flex flex-col items-center justify-between rounded-lg shadow-lg hover:shadow-xl transition-shadow mb-11"
            >
              <div className="w-full h-[340px]">
                <img
                  src={blog.image}
                  alt="Blog Visual"
                  className="w-full h-full rounded-t-lg object-cover"
                />
              </div>
              <div className="w-[80%] text-center mt-2">
                <h2 className="text-[18px] font-semibold">
                  {blog.title || ""}
                </h2>
              </div>
              <div className="w-[80%] text-center overflow-hidden text-ellipsis">
                <h3 className="text-[14px]">{blog.content}</h3>
              </div>

              <div className="flex items-center w-[80%] mt-1">
                <button
                  onClick={() => handleLike(blog.id)}
                  className={`w-[30px] h-[30px] ${isLiked ? "text-blue-500" : "text-gray-500"
                    }`}
                >
                  <AiFillLike className="w-full h-full" />
                </button>
                <span className="text-[18px] text-[#d6d5d5] ml-3 mt-2">
                  {blog.likes}
                </span>
              </div>
              <div className="w-[80%] flex  items-center  mb-6 relative">
                <div className="mb-2">
                  <Avatar
                    src={user.profilePhoto || ""}
                    sx={{ width: 50, height: 50 }}
                  />
                </div>
                <span className="text-[18px] ml-8">
                  By {user.name || "Unknown"}
                </span>
                {blog.email === email && (
                  <button onClick={() => handleDelete(blog.id)}>
                    <MdDelete className="text-4xl text-red-500 hover:text-red-600 absolute top-[30%] right-[1%]" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowBlogs;
