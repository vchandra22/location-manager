import InputField from "../components/InputField.jsx";
import {useState} from "react";
import Button from "../components/Button.jsx";
import axiosInstance from "../config/axiosInstance.js";

export default function CreateData() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    lat: "",
    lng: ""
  });
  
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const {id, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value 
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: ""
    }));
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/locations", {
        name: formData.name,
        address: formData.address,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng)
      });
      
      alert(response.data.message);
      console.log("Response:", response.data.data);
      setFormData({name: "", address: "", lat: "", lng: ""});
      setErrors({});
    } catch (error) {
      console.log("Error submitting data", error);
      
      if (error.response?.data?.errors) {
        const errorMessage = {};
        error.response.data.errors.forEach((err) => {
          errorMessage[err.path] = err.msg;
        });
        setErrors(errorMessage);
      } else {
        alert("Failed to submit your data");
      }
      
    }
  }
  
  return (
    <>
      <div className="lg:ml-72 xl:ml-64 p-4">
          <h1 className="text-3xl font-bold text-start text-neutral-900 mb-6">
            Create New Data Location
          </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            id="name"
            label="Masukkan nama lokasi"
            type="text"
            placeholder="Balai Kota Malang"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <InputField
            id="address"
            label="Masukkan alamat lokasi"
            type="text"
            placeholder="Jl. Mayjend Panjaitan No.45"
            value={formData.address}
            onChange={handleInputChange}
            error={errors.address}
          />
          <InputField
            id="lat"
            label="Lattitude"
            type="text"
            placeholder="-6.3024"
            value={formData.lat}
            onChange={handleInputChange}
            error={errors.lat}
          />
          <InputField
            id="lng"
            label="Longtitude"
            type="text"
            placeholder="106.8955"
            value={formData.lng}
            onChange={handleInputChange}
            error={errors.lng}
          />
          <div className="py-4">
            <Button label="Submit" type="submit" />
          </div>
        </form>
      </div>
    </>
  )
}