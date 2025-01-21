import { useEffect, useState } from "react";
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
      <div className="lg:ml-72 xl:ml-64 p-4">
        <h1 className="text-3xl font-bold text-start text-neutral-900 lg:mb-12">
          Data Lokasi
        </h1>
        
        {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">Error: {error}</p>}

        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead className="bg-gray-800 dark:bg-gray-700 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase dark:text-neutral-500">No.</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase dark:text-neutral-500">Lokasi</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase dark:text-neutral-500">Alamat</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium uppercase dark:text-neutral-500">Koordinat</th>
                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium uppercase dark:text-neutral-500">Aksi</th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {data?.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={item._id} className="hover:bg-gray-100 dark:hover:bg-neutral-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{item.address}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          <span>lat: {item.coordinates.lat}</span><br />
                          <span>lng: {item.coordinates.lng}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button
                            type="button"
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
