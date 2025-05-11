import axios from "axios";
import { useState } from "react";

export default function DeleteCategory() {
  const [categoryId, setCategoryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const DeleteCategory = async () => {
    if (categoryId === null || categoryId === undefined) {
      console.log("product id is not defined");
      return;
    }
    setIsSubmitting(true);
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_ADMIN_DELETE_CATEGORY}`,
        { cId: categoryId },
      );
      console.log("delete product admin  api ", res);
    } catch (error) {
      console.log("admin product delete api ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-110px)] w-full flex flex-col justify-center items-center gap-8">
      <input
        type="text"
        value={categoryId}
        onChange={(e) => {
          setCategoryId(e.target.value);
        }}
        placeholder="Enter Category Id"
        className="w-2/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={DeleteCategory}
        disabled={isSubmitting}
        className={`px-6 py-3 text-secondary font-medium rounded-md ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        }`}
      >
        {isSubmitting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
