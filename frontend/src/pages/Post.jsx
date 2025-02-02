import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseUrl, get, post } from '../services/Endpoint';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function Blog() {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [singlepost, setSinglePost] = useState(null);
  const [comment, setComment] = useState('');
  const [loaddata, setLoaddata] = useState(false);

  useEffect(() => {
    const SinglePost = async () => {
      try {
        const request = await get(`/public/singlepost/${id}`);
        const response = request.data;

        if (response && response.Post) {
          setSinglePost(response.Post);  // Make sure to access 'Post' if it's inside response
        } else {
          console.error("Post not found.");
        }

        console.log("API Response:", response);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    SinglePost();
  }, [loaddata, id]);

  const onSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login');
    } else {
      try {
        const request = await post("/comment/addcomment", {
          comment,
          postId: id,
          userId: user._id,
        });

        const response = request.data;
        console.log("Comment Response:", response);

        if (response.success) {
          toast.success(response.message);
          setComment('');
          setLoaddata((prevState) => !prevState);  // Toggle loaddata for re-fetching comments
        }
      } catch (error) {
        console.error("Error adding comment:", error);
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  return (
    <div className="container text-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-12">
          {/* Ensure 'singlepost' is loaded */}
          <h1 className="fw-bold text-white mb-4 display-4">{singlepost && singlepost.title}</h1>
          
          <img 
            src={singlepost && `${BaseUrl}/images/${singlepost.image}`}  // Assuming 'image' is a field in your Post model
            alt="Post Image" 
            className="img-fluid mb-4" 
            style={{ borderRadius: "10px", maxHeight: "500px", objectFit: "cover", width: "100%" }}
          />

          <p className="mb-5">{singlepost && singlepost.desc}</p>  {/* Ensure 'desc' is available in Post model */}

          <hr />

          <h3 className="mt-5 mb-4">Leave a Comment</h3>
          <form onSubmit={onSubmitComment}>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Comment</label>
              <textarea 
                className="form-control" 
                id="comment" 
                rows="4" 
                placeholder="Write your comment here" 
                required
                value={comment} 
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit Comment</button>
          </form>

          <hr />

          <h3 className="mt-5 mb-4">Comments</h3>
          {singlepost && singlepost.comments && singlepost.comments.map((elem) => (
            <div key={elem._id} className="bg-secondary p-3 rounded mb-3 d-flex">
              <img 
                src={elem.userId.profile ? `${BaseUrl}/images/${elem.userId.profile}` : "/default-profile.jpg"}  // Assuming 'profile' is the profile image field
                alt="User Profile" 
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <div>
                <h5 className="mb-1">{elem.userId.FullName}</h5>  {/* Assuming 'FullName' is in 'userId' */}
                <p className="mb-0">{elem.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
