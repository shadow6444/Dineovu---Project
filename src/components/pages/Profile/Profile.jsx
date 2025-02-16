import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Input from "../../common components/Input";
import Success from "../../../assets/Image 5.svg";
import Username from "../../../assets/Profile.svg";
import Password from "../../../assets/password.svg";
import Default from "../../../assets/defaultpicture.svg";
import { setUser } from "../../../../redux/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log(user);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    picURL: user?.picURL !== "none" ? user?.picURL : Default,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const validateForm = () => {
    let error = {};
    if (!formData.name.trim()) error.name = "Name is required";
    if (formData.currentPassword) {
      if (!formData.newPassword || !formData.confirmPassword) {
        error.password = "Provide both new and confirm passwords";
      } else if (formData.newPassword !== formData.confirmPassword) {
        error.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsConfirmationOpen(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("currentPassword", formData.currentPassword);
      formDataToSend.append("newPassword", formData.newPassword);
      formDataToSend.append("confirmPassword", formData.confirmPassword);
      if (selectedFile) {
        formDataToSend.append("picURL", selectedFile);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.put(
        "http://localhost:3000/api/user/update",
        formDataToSend,
        config
      );

      if (response.data.success) {
        setIsEditing(false);
        setIsConfirmationOpen(false);
        setIsSuccessModalOpen(true);
        dispatch(setUser(response.data.user));
        setFormData((prev) => ({
          ...prev,
          picURL: response.data.user.picURL || Default,
        }));
      }
    } catch (error) {
      console.error("Update failed", error);
      alert(
        "Update failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const togglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <section className="mt-8 w-full flex flex-col items-center justify-center px-20 pb-10">
      <h1 className="font-bold text-left w-full text-[#000033] text-2xl mb-5">
        My Profile
      </h1>
      <form
        className="border-2 border-amberColor rounded-lg shadow-md p-6 bg-white w-[40rem]"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded"
            disabled={!isEditing}
          />
          {formData.picURL && (
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : formData.picURL
              }
              alt="Profile"
              className="w-20 h-20 mt-2 rounded-full object-cover"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Input
            type="text"
            name="name"
            value={formData.name ? formData.name : ""}
            onChange={handleInputChange}
            image={Username}
            placeholder={formData.name ? formData.name : "Enter your name"}
            disabled={!isEditing}
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>

        {isEditing && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <Input
                type={passwordVisible ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                image={Password}
                placeholder="Your Password"
                password={true}
                togglePassword={togglePassword}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <Input
                type={passwordVisible ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                image={Password}
                placeholder="Your Password"
                password={true}
                togglePassword={togglePassword}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                image={Password}
                placeholder="Confirm Password"
                password={true}
                togglePassword={toggleConfirmPassword}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </>
        )}

        <div className="flex justify-end gap-6">
          {!isEditing ? (
            <button
              type="button"
              className="w-28 py-2 bg-amberColor text-white rounded-md border-none hover:bg-[#FF8D10]"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    ...formData,
                    picURL: user?.picURL,
                    name: user?.name,
                  });
                }}
                type="button"
                className="w-28 py-2 border border-amberColor rounded-md text-sm font-medium text-amberColor hover:underline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-28 py-2 bg-amberColor rounded-md text-sm font-medium text-white hover:bg-[#FF8D10]"
              >
                Update
              </button>
            </>
          )}
        </div>
      </form>

      {isConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border-2 border-amberColor rounded-lg shadow-lg p-6 w-[30rem]">
            <h2 className="text-xl font-bold text-center">Confirm Update</h2>
            <p className="text-center text-gray-600 mt-4">
              Are you sure you want to update your profile?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setIsConfirmationOpen(false)}
                className="px-6 py-2 bg-white text-amberColor border-2 border-amberColor rounded-lg hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpdate}
                className="px-6 py-2 bg-amberColor text-white rounded-lg hover:bg-[#FF8D10]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border-2 border-amberColor rounded-lg shadow-lg p-6 w-[30rem]">
            <div className="flex flex-col items-center">
              <img src={Success} alt="Success" className="w-20 h-20 mb-4" />
              <h2 className="text-xl font-bold">Profile Updated!</h2>
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="mt-6 px-6 py-2 bg-amberColor text-white rounded-lg hover:bg-[#FF8D10]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
