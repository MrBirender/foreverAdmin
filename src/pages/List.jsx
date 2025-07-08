import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { beckendUrl } from "../App";

const List = ({token}) => {
  const [products, setProducts] = useState([]);

  /* getting all products from api */

  const fetchProducts = async () => {
    try {
      const response = await axios.get(beckendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
        console.log(response.data);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* deleting product */
  const deleteProduct = async (id) => {
    try {
      const response = await axios.post(beckendUrl + `/api/product/remove/`, {id}, {headers: {token}});
      if(response.data.success){
        toast.success(response.data.message);
        fetchProducts();
      }else{
        toast.error(response.data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-2 text-neutral-600">
      <p className="text-2xl mb-2 font-medium">All Product List</p>

      {/* Header of the table */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-200 text-xl ">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className="text-center">Action</b>
      </div>

      {/* products rows */}
      {products.map((product) => (
        <div className="grid grid-cols-[ifr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] text-xl items-center py-2 px-4 border" key={product._id}>
          <img className="w-14 h-20 object-cover border border-gray-300 rounded-md" src={product.image[0]} alt={product.name + 'image'} />
          <p>{product.name}</p>
          <p>{product.category}</p>
          <p>$ {product.price}</p>
          <p onClick={()=> deleteProduct(product._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
        </div>
      ))}
    </div>
  );
};

export default List;
