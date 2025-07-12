import DeleteBtn from "@/components/home/DeleteBtn";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";

import ProductListSkeleton from "@/components/skeleton/ProductListSkeleton";

export default function GetProductByCategory() {
  const discount = 20;
  // const cId="67ab9caa61b7763a0938c690"
  const { cId } = useParams();
  const location = useLocation();
  const { categoryName } = location?.state || {};

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let res = await fetch(
          `${import.meta.env.VITE_PRODUCT_BY_CATEGORY}?cId=${cId}`,
        );

        // console.log("resss", res);
        let data = await res.json();
        console.log("dataaa", data);
        setMessage(data.message);
        // console.log("product api ", res);
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.log("poductList api error ", error);
        setLoading(false);
      }
    })();
  }, []);

  let navigate = useNavigate();

  const productDetailFunction = (e, product) => {
    console.log(product._id);

    e.preventDefault();
    navigate(`/productdetails/${product._id}`);
  };

  const addProduct = () => {
    console.log("click");
    navigate("/admin/category/product/add", { state: { cId } });
  };

  const deleteProduct = async (e, productId) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    e.preventDefault(); // Prevent any default action

    if (productId === null || productId === undefined) {
      console.log("Product ID is not defined");
      return;
    }

    // Show confirmation dialog with correct message
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!isConfirmed) {
      console.log("Product deletion canceled.");
      return;
    }

    try {
      let res = await axios.delete(
        `${import.meta.env.VITE_ADMIN_DELETE_PRODUCT}/${productId}`,
      );
      console.log("Delete product admin API response:", res);

      // Update the local state to remove the deleted product
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId),
      );

      // Optional: Show success message
      setMessage("Product deleted successfully");
    } catch (error) {
      console.log("Admin product delete API error:", error);
      setMessage("Failed to delete product");
    } finally {
    }
  };

  const editProduct = (e, goods) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("abccc",goods);
    navigate(`/admin/category/product/edit/${goods._id}`, {
      state: { goods, cId },
    });

  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="fill-yellow-400 text-yellow-400 w-4 h-4" />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="fill-yellow-400 text-yellow-400 w-4 h-4"
        />,
      );
    }

    return stars;
  };

  if (loading) return <ProductListSkeleton />;
  // if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-secondary relative">
      <div className="bg-gray-100 w-full  flex items-center justify-center relative py-5 mt-5">
        <h2 className="text-4xl font-extrabold absolute left-1/2 transform -translate-x-1/2">
          {categoryName}
        </h2>
        <Button
          variant="outline"
          className="absolute right-5 text-lg"
          onClick={addProduct}
        >
          <span className="text-lg">+</span> Add Products
        </Button>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products </h2>

        <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products && products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product._id}
                href={product.href}
                onClick={(e) => productDetailFunction(e, product)}
                className="group"
              >
                <Card className="max-w-sm overflow-hidden rounded-3xl border-0 shadow-lg">
                  <CardContent className="p-4">
                    <img
                      // alt={product.imageAlt}
                      src={product.pImages[0].URL}
                      className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                    />
                    <h3 className="text-xl font-bold text-gray-900">
                      {product.pName}
                    </h3>

                    <div className="mt-1 flex items-center gap-1">
                      <div className="flex items-center">
                        {renderStars(product.avgRating)}
                      </div>
                      <span
                        className={`text-sm text-gray-600 ${
                          product.reviewCount == 0 ? "hidden" : " "
                        }`}
                      >
                        {" "}
                        ({product.reviewCount})
                      </span>
                    </div>

                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 line-through">
                          MRP Rs. {product.pPrice}
                        </span>
                        <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">
                          {product.pOffer}% Off
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xl font-semibold">
                          Rs.{(product.pPrice * (100 - product.pOffer)) / 100}
                        </span>
                      </div>
                      <div className="flex justify-between items-end">
                        <Button onClick={(e) => editProduct(e, product)}>
                          Edit
                        </Button>
                        <div
                          onClick={(e) => deleteProduct(e, product._id)}
                          className="   h-12 w-9 bg-[#FF1010] rounded-md flex justify-center items-center"
                        >
                          <DeleteBtn />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <>
              <div className="w-full h-full text-2xl font-semibold  flex justify-center items-center ">
                {message}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
