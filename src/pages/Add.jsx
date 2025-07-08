import React, { useEffect } from "react";
import { assets } from "../assets/admin_assets/assets";
import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { use } from "react";

const Add = ({ token }) => {
  const backendUrl = "http://localhost:4000";
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Women");
  const [productSubCategory, setProductSubCategory] = useState("Topwear");
  const [productPrice, setProductPrice] = useState("");
  const [productSizes, setProductSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);

  useEffect(() => {
    console.log(productSizes);
  }, [  productSizes]);

  /* SENDING FORM DATA TO API */
  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      /* sending images */
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      /* sending text data */
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("category", productCategory);
      formData.append("subCategory", productSubCategory);
      formData.append("price", productPrice);
      formData.append("sizes", JSON.stringify(productSizes));
      formData.append("bestseller", bestSeller);

      /* sending data to api */
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Product added successfully");
        setProductName("");
        setProductDescription("");
        setProductCategory("Men");
        setProductSubCategory("Topwear");
        setProductPrice("");
        setProductSizes([]);
        setBestSeller(false);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col w-full items-start gap-8 text-neutral-600 mb-10"
    >
      {/* upload images */}
      <div>
        <p className="text-2xl mb-2">Upload Images</p>
        <div className="flex gap-4">
          <label htmlFor="image1">
            <img
              className="w-40 h-40 object-cover border border-gray-300 rounded-md"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload_img"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-40 h-40 object-cover border border-gray-300 rounded-md"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload_img"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-40 h-40 object-cover border border-gray-300 rounded-md"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload_img"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-40 h-40 object-cover border border-gray-300 rounded-md"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload_img"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      {/* product name */}

      <div className="w-full">
        <p className="text-2xl mb-2 ">Prouduct name</p>
        <input
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          type="text"
          className="max-w-[600px] w-full px-3 py-2 "
          placeholder="Type here"
          required
        />
      </div>

      {/* product description */}
      <div className="w-full">
        <p className="text-2xl mb-2 ">Prouduct description</p>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          type="text"
          className="max-w-[600px] w-full px-3 py-4 "
          placeholder="write content here"
          required
        />
      </div>

      {/* select tag */}
      <div className="flex flex-col sm:flex-row gap-8">
        <div>
          <p className="text-2xl mb-2">Product category</p>
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="text-2xl mb-2">Subcategory</p>
          <select
            value={productSubCategory}
            onChange={(e) => setProductSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="text-2xl mb-2">Product price</p>
          <input
            onChange={(e) => setProductPrice(e.target.value)}
            value={productPrice}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      {/* sizes */}
      <div className="">
        <p className="text-2xl mb-2">Product Sizes</p>
        <div className="flex gap-3 text-2xl">
          <div
            onClick={() =>
              setProductSizes((pre) =>
                pre.includes("S")
                  ? pre.filter((item) => item !== "S")
                  : [...pre, "S"]
              )
            }
            className={`${
              productSizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
            } px-5 py-3 cursor-pointer`}
          >
            S
          </div>
          <div
            onClick={() =>
              setProductSizes((pre) =>
                pre.includes("M")
                  ? pre.filter((item) => item !== "M")
                  : [...pre, "M"]
              )
            }
            className={`${
              productSizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
            } px-5 py-3 cursor-pointer`}
          >
            M
          </div>
          <div
            onClick={() =>
              setProductSizes((pre) =>
                pre.includes("L")
                  ? pre.filter((item) => item !== "L")
                  : [...pre, "L"]
              )
            }
            className={`${
              productSizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
            } px-5 py-3 cursor-pointer`}
          >
            L
          </div>
          <div
            onClick={() =>
              setProductSizes((pre) =>
                pre.includes("XL")
                  ? pre.filter((item) => item !== "XL")
                  : [...pre, "XL"]
              )
            }
            className={`${
              productSizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
            } px-5 py-3 cursor-pointer`}
          >
            XL
          </div>
          <div
            onClick={() =>
              setProductSizes((pre) =>
                pre.includes("XXL")
                  ? pre.filter((item) => item !== "XXL")
                  : [...pre, "XXL"]
              )
            }
            className={`${
              productSizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
            } px-5 py-3 cursor-pointer`}
          >
            XXL
          </div>
        </div>
      </div>

      {/* bestseller */}
      <div className="flex items-center gap-3 text-xl mt-2">
        <input
          checked={bestSeller}
          onChange={(e) => setBestSeller(e.target.checked)}
          className="w-4 h-4"
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      {/* button */}
      <button
        className="bg-black text-2xl text-white w-32 py-5 hover:scale-105"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
