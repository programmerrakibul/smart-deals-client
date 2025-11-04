import Container from "../../components/Container/Container";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const AllProducts = () => {
  const publicAxios = useAxios();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await publicAxios.get("/products");
      setProducts(data);
    })();
  }, [publicAxios]);

  const cardElements = products.map((item) => (
    <ProductCard key={item._id} singleProduct={item} />
  ));

  return (
    <>
      <title>All Products - SmartDeals</title>

      <section className="py-6 my-5">
        <Container className="space-y-6">
          <h1 className="text-3xl text-center font-bold">
            All <span className="text-primary">Products</span>
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cardElements}
          </div>
        </Container>
      </section>
    </>
  );
};

export default AllProducts;
