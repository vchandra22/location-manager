import {useEffect, useState} from "react";
import axiosInstance from "../config/axiosInstance.js";

export default function IndexPage() {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/locations");
      setData(response.data.data);
      setError(null);
      
      console.log(response.data.data);
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
  
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center text-red-500">
        Data Index Page Location
      </h1>
      {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">Error: {error}</p>}

      {data?.[0] ? (
        <div className="mt-5 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-semibold">Locations:</h2>
          <ul>
            {data.map((item) => (
              <li key={item._id} className="mt-2 text-gray-700">
                <span className="font-bold">Name:</span> {item.name}
                <br />
                <span className="font-bold">Address:</span> {item.address}
                <br />
                <span className="font-bold">Coordinates:</span> lat{" "}
                {item.coordinates.lat}, long {item.coordinates.lng}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-5 text-center text-gray-500">No locations found.</p>
      )}
    </>
  )
}