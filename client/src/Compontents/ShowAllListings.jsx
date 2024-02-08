import { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";

const getAllProduct = async () => {
  const res = await fetch("http://localhost:9000/products/getAllProduct");
  const data = await res.json();
  return data;
};

function ShowAllListings() {
  const params = useParams();
  const allProduct = useLoaderData();
  const [product, setProduct] = useState(allProduct);

  const handleDeleteProduct = async (ProductId) => {
    try {
      await fetch(`http://localhost:9000/products/deleteProduct/${ProductId}`, {
        method: "DELETE",
      });
      const data = await getAllProduct();
      setProduct(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {product.map((pr, i) => {
        return (
          <div className="flex justify-between p-3 border items-center">
            <img
              src={`../../public/${pr.images[0]}`}
              alt="listing image"
              className="w-20 h-20 object-contain rounded-lg"
            />
            <p>{pr.title}</p>
            <div>
              <button
                type="button"
                className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                onClick={() => handleDeleteProduct(pr._id)}
              >
                Delete
              </button>
              <Link to={`/UpdateListing/${pr._id}`}>
                <button className="text-green-700 uppercase">Edit</button>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}

export async function loader() {
  const data = await getAllProduct();
  return data;
}

export default ShowAllListings;
