import { CiSearch } from "react-icons/ci";
import Container from "../../components/Container/Container";
import { useNavigate } from "react-router";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const Homepage = () => {
  const navigate = useNavigate();
  const publicAxios = useAxios();
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await publicAxios("/products/latest", {
        params: {
          fields: "title,price_min,price_max,image,usage",
        },
      });

      setLatestProducts(data);
    })();
  }, [publicAxios]);

  const cardElements = latestProducts.map((item) => (
    <ProductCard key={item._id} singleProduct={item} />
  ));

  return (
    <>
      <title>Home - SmartDeals</title>

      <section className="bg-linear-to-br from-[#FFE6FD] to-[#E0F8F5] from-0% to-100%">
        <Container className="grid place-items-center h-[520px]">
          <div className="flex flex-col items-center gap-5 w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold">
              Deal your <span className="text-primary">Products</span> in a
              <span className="text-primary"> Smart</span> way !
            </h1>
            <p className="opacity-60">
              SmartDeals helps you sell, resell, and shop from trusted local
              sellers — all in one place!
            </p>

            <div className="space-x-3.5">
              <button
                onClick={() => navigate("/all-products")}
                className="btn btn-primary text-white"
              >
                Watch All Products
              </button>

              <button
                onClick={() => navigate("/create-product")}
                className="btn btn-outline btn-primary"
              >
                Post an Product
              </button>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="space-y-6">
          <h1 className="text-3xl text-center font-bold">
            Recent <span className="text-primary">Products</span>
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cardElements}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate("all-products")}
              className="btn btn-primary text-white"
            >
              Show All
            </button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Homepage;
