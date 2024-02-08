import { useState } from "react";
import { Link } from "react-router-dom";

function CreateProduts() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const chooseFiles = e.target.files;
    const selectFile = Object.values(chooseFiles).map((el) => el.name);
    console.log(selectFile);
    setFiles(selectFile);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(files.length);
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      files.length === 0
    ) {
      return;
    }

    console.log(formData);
    try {
      const response = await fetch(
        "http://localhost:9000/products/createProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, images: files }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
      // Handle the response data as needed
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error as needed
    }
    setFormData({ title: "", description: "", price: "", images: [] });
  };

  return (
    <div>
      <div className="bg-gray-100  h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Name"
              >
                Title:
              </label>
              <input
                className="w-full border rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Email"
              >
                Descripstion
              </label>
              <textarea
                rows="4"
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Email"
              >
                Price:
              </label>
              <input
                className="w-full border rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-4 mb-4">
              <input
                className="p-3 border border-gray-300 rounded w-full"
                onChange={handleImageChange}
                type="file"
                name="images"
                accept="image/*"
                multiple
              />
            </div>

            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2"
                type="submit"
                value="Send"
              >
                Create
              </button>
            </div>
          </form>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2">
            <Link to="/ShowListing">See All Products</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProduts;
