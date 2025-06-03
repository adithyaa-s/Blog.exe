// import React, { useState, useEffect } from "react";
// import "./ProfileImage.css";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useParams } from "react-router-dom";

// const ImgUpload = ({ onChange, src }) => (
//   <label htmlFor="photo-upload" className="custom-file-upload fas">
//     <div className="img-wrap img-upload">
//       <img src={src} alt="Preview" />
//       <div className="download-icon">
//         <i className="fas fa-download"></i>
//       </div>
//     </div>
//     <input
//       id="photo-upload"
//       type="file"
//       onChange={onChange}
//       accept="image/*"
//       hidden
//     />
//   </label>
// );

// const Profile = ({ onSubmit, src, canEdit }) => (
//   <div className="card">
//     <form onSubmit={onSubmit}>
//       <label className="custom-file-upload fas">
//         <div className="img-wrap">
//           <img src={src} alt="Uploaded" />
//           {canEdit && (
//             <div className="download-icon">
//               <i className="fas fa-download"></i>
//             </div>
//           )}
//         </div>
//       </label>
//       {canEdit && (
//         <button type="submit" className="edit">
//           Edit Profile
//         </button>
//       )}
//     </form>
//   </div>
// );
// const Edit = ({ onSubmit, children, canEdit }) => (
//   <form onSubmit={onSubmit}>
//     {children}
//     {canEdit && (
//       <button type="submit" className="edit">
//         Upload Image
//       </button>
//     )}
//   </form>
// );

// export default function ProfileImage() {
//   const { id } = useParams(); // Get user ID from URL
//   const [file, setFile] = useState(null);
//   const [imagePreviewUrl, setImagePreviewUrl] = useState('https://res.cloudinary.com/dg9hyvdtr/image/upload/v1748928051/goks/profile/qmltiauheoicsoj1az8a.png');
//   const [active, setActive] = useState("profile");
//   const [isUploading, setIsUploading] = useState(false);
//   const [canEdit, setCanEdit] = useState(false);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/user/${id}`, {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("token")}`
//           }
//         });
        
//         setUserData(response.data);
//         if (response.data.profileImageUrl) {
//           setImagePreviewUrl(response.data.profileImageUrl);
//         }

//         // Check if current user is viewing their own profile
//         const token = Cookies.get("token");
//         if (token) {
//           const decodedToken = JSON.parse(atob(token.split('.')[1]));
//           setCanEdit(decodedToken.id === id);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [id]);

//   const photoUpload = async (e) => {
//     e.preventDefault();
//     const file = e.target.files[0];
//     if (!file) {
//       console.log("No file selected in photoUpload");
//       return;
//     }

//     console.log("File selected:", {
//       name: file.name,
//       type: file.type,
//       size: file.size
//     });

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       console.log("Preview created successfully");
//       setImagePreviewUrl(reader.result);
//     };
//     reader.readAsDataURL(file);
//     setFile(file);
//   };

//   const handleDownload = (e) => {
//     e.preventDefault();
//     const link = document.createElement("a");
//     link.href = imagePreviewUrl;
//     link.download = "profile-image.jpg";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file || !canEdit) {
//       setActive(prev => prev === "edit" ? "profile" : "edit");
//       return;
//     }

//     try {
//       setIsUploading(true);
//       const formData = new FormData();
//       formData.append("image", file);
      
//       console.log("Uploading image...");
//       const response = await axios.post(
//         "http://localhost:8000/posts/uploadProfileImage",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${Cookies.get("token")}`,
//           },
//         }
//       );

//       if (response.data.imageUrl) {
//         setImagePreviewUrl(response.data.imageUrl);
//         setFile(null);
//         // Optionally refresh user data after successful upload
//         const updatedUserResponse = await axios.get(`http://localhost:8000/users/${id}`, {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("token")}`
//           }
//         });
//         setUserData(updatedUserResponse.data);
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       alert("Failed to upload image");
//     } finally {
//       setIsUploading(false);
//       setActive(prev => prev === "edit" ? "profile" : "edit");
//     }
//   };
  
//   return (
//     <div>
//       {active === "edit" ? (
//         <Edit onSubmit={handleSubmit} canEdit={canEdit}>
//           <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
//           {isUploading && <div>Uploading...</div>}
//         </Edit>
//       ) : (
//         <Profile onSubmit={handleSubmit} src={imagePreviewUrl} canEdit={canEdit} />
//       )}
//     </div>
//   );
// }

import React from "react";
import "./ProfileImage.css";

const ProfileImage = ({ profileImageUrl }) => {
  console.log(profileImageUrl)
  return (
    <div className="card">
      <div className="img-wrap">
        <img 
          src={profileImageUrl || 'https://res.cloudinary.com/dg9hyvdtr/image/upload/v1748928051/goks/profile/qmltiauheoicsoj1az8a.png'} 
          alt="Profile" 
        />
      </div>
    </div>
  );
};

export default ProfileImage;