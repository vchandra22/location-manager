import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance.js";
import Maps from "../components/Maps.jsx";
import Modal from "../components/Modal.jsx";
import InputField from "../components/InputField.jsx";

export default function IndexPage() {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: -6.404329,
    lng:  106.925387,
  });
  const [isMarkerShow, setIsMarkerShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    lat: "",
    lng: ""
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/locations");
      setData(response.data.data);
      setError(null); 
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleOnClick = (location) => {
    setSelectedLocation({
      lat: location.coordinates.lat,
      lng: location.coordinates.lng,
    });
    setIsMarkerShow(true);
  }
  
  const handleDelete = async (id) => {
    const konfirmasi = confirm("Are you sure you want to delete this location?");
    if (konfirmasi) {
      try {
        const response = await axiosInstance.delete(`/locations/${id}`);
        alert(response.data.message);
        fetchData();
      } catch (error) {
        alert(error);
      }
    }
  }

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
  
  const handleEditClick = (data) => {
    setIsModalOpen(true);
    setFormData({...formData, id: data._id, name: data.name, address: data.address, lat: data.coordinates.lat, lng: data.coordinates.lng});
  }
  
  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put(`/locations/${formData.id}`, formData);
      alert(response.data.status);
      setFormData({id: "", name: "", address: "", lat: "", lng: ""});
      setErrors({});
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
      fetchData();
    }
  }

  return (
    <>
      <div className="lg:ml-72 xl:ml-64 lg:p-4">
        <div className="flex justify-between items-end mb-4 lg:mb-12">
          <h1 className="text-3xl font-bold text-start text-neutral-900">
            Data Lokasi
          </h1>
        </div>

        {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">Error: {error}</p>}

        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div>
                    <table className="w-full divide-y divide-gray-200 dark:divide-neutral-700">
                      <thead className="bg-gray-800 dark:bg-gray-700 text-white">
                      <tr>
                        <th scope="col"
                            className="px-2 py-3 text-start text-xs font-medium uppercase dark:text-neutral-500">No.
                        </th>
                        <th scope="col"
                            className="px-2 py-3 text-start text-xs font-medium uppercase dark:text-neutral-500">Lokasi
                        </th>
                        <th scope="col"
                            className="px-2 py-3 text-start text-xs font-medium uppercase dark:text-neutral-500">Alamat
                        </th>
                        <th scope="col"
                            className="px-2 py-3 text-start text-xs font-medium uppercase dark:text-neutral-500">Koordinat
                        </th>
                        <th scope="col"
                            className="px-2 py-3 text-end text-xs font-medium uppercase dark:text-neutral-500">Aksi
                        </th>
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {data?.length > 0 ? (
                        data.map((item, index) => (
                          <tr key={item._id}
                              className="hover:bg-gray-100 cursor-pointer dark:hover:bg-neutral-700"
                              onClick={() => handleOnClick(item)}
                          >
                            <td
                              className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{index + 1}</td>
                            <td
                              className="px-2 py-4 whitespace-normal break-words max-w-xs text-gray-800 dark:text-neutral-200">{item.name}</td>
                            <td
                              className="px-2 py-4 max-w-xs whitespace-normal break-words text-sm text-gray-800 dark:text-neutral-200">{item.address}</td>
                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                              <span>lat: {item.coordinates.lat}</span><br/>
                              <span>lng: {item.coordinates.lng}</span>
                            </td>
                            <td className="flex flex-col gap-2 py-4 whitespace-nowrap text-end text-sm font-medium">
                              <button
                                type="button"
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                                onClick={() => handleEditClick(item)}
                              >
                                Edit
                              </button>
                              <button onClick={() => handleDelete(item._id)}
                                      type="button"
                                      className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-600 dark:hover:text-red-400 dark:focus:text-red-400"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center text-gray-500 py-4">No locations found.</td>
                        </tr>
                      )}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-full">
                    <Maps
                      isMarkerShow={isMarkerShow}
                      lat={selectedLocation.lat}
                      lng={selectedLocation.lng}
                    ></Maps>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal className={`w-1/2`} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleUpdate}>
        <form className="w-full">
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
        </form>
      </Modal>
    </>
  );
}
