import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

function UpdateProduct() {
  const Product = useLoaderData();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: Product.title,
    description: Product.description,
    price: Product.price,
    images: Product.images,
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
    try {
      const response = await fetch(
        `http://localhost:9000/products/updateProduct/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            images: files.length === 0 ? Product.images : files,
          }),
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
  };

  return (
    <>
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
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export async function loader() {
  const idArray = window.location.href.split("/");
  const id = idArray[idArray.length - 1];
  const res = await fetch(`http://localhost:9000/products/getOneProduct/${id}`);
  const data = await res.json();
  return data;
}

export default UpdateProduct;
