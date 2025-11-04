import { useEffect, useRef, useState } from "react";
import Container from "../../components/Container/Container";
import useAuthInfo from "../../hooks/useAuthInfo";
import BidsTable from "../../components/BidsTable/BidsTable";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProductsPage = () => {
  const { currentUser } = useAuthInfo();
  const secureAxios = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [productBids, setProductBids] = useState([]);
  const editModalRef = useRef(null);
  const soldModalRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await secureAxios.get("/products/user", {
          params: {
            email: currentUser.email,
            fields: "image,title,category,price_max, status",
          },
        });

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentUser, secureAxios]);

  const handleClickSold = async (id) => {
    soldModalRef.current.show();

    try {
      const { data } = await secureAxios.get(`/bids/${id}`);

      setProductBids(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductEdit = async (e, id) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    Object.entries(formData).forEach(([key, value]) => {
      formData[key] = value.trim();
    });

    if (Object.values(formData).every((value) => !value)) {
      alert("Enter something to update!");
      return;
    }

    const update = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        update[key] = value;
      }
    });

    try {
      const { data } = await secureAxios.put(`/products/${id}`, update);

      if (data.modifiedCount) {
        const updatedProduct = products.map((item) => {
          return item._id === id ? { ...item, ...update } : item;
        });

        setProducts(updatedProduct);
        editModalRef.current.close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const { data } = await secureAxios.delete(`/products/${id}`);

      if (data.deletedCount) {
        const updatedProducts = products.filter((item) => item._id !== id);
        setProducts(updatedProducts);
        await secureAxios.delete(`/bids/product/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <title>My Products - SmartDeals</title>

      <section className="py-6 my-5 min-h-[70dvh]">
        <Container className="space-y-7">
          <h1 className="text-center text-4xl font-bold">
            My Products:{" "}
            <span className="text-primary">
              {products.length < 10 ? `0${products.length}` : products.length}
            </span>
          </h1>

          <div className="overflow-x-auto">
            <table className="table w-full rounded-md overflow-hidden bg-white shadow-lg">
              <thead>
                <tr className="bg-[#F9FAFB]">
                  <th>SL No</th>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="size-10 bg-accent rounded-md overflow-hidden">
                        <img src={item.image} alt={item.title} />
                      </div>
                    </td>
                    <td>
                      <p>{item.title}</p>
                    </td>
                    <td>
                      <p>{item.category}</p>
                    </td>
                    <td>
                      <p className="text-nowrap">৳ {item.price_max}</p>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          item.status === "pending"
                            ? "badge-warning"
                            : "badge-success"
                        }  capitalize`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-between gap-1.5 w-fit">
                        <button
                          onClick={() => editModalRef.current.show()}
                          disabled={item.status === "sold"}
                          className="btn btn-primary btn-outline btn-sm"
                        >
                          Edit
                        </button>

                        <dialog
                          ref={editModalRef}
                          className="modal modal-bottom sm:modal-middle"
                        >
                          <div className="modal-box">
                            <div className="modal-action">
                              <form
                                onSubmit={(e) => handleProductEdit(e, item._id)}
                                method="dialog"
                                className="space-y-4"
                              >
                                <h5 className="text-center text-2xl font-semibold">
                                  Update Product Info
                                </h5>

                                <div className="space-y-1.5">
                                  <label htmlFor="image" className="label">
                                    Image URL
                                  </label>
                                  <input
                                    type="text"
                                    name="image"
                                    id="image"
                                    className="input"
                                    placeholder="http://..."
                                  />
                                </div>

                                <div className="flex items-center justify-between gap-3.5">
                                  <div className="space-y-1.5 flex-1/2">
                                    <label
                                      htmlFor="price_min"
                                      className="label"
                                    >
                                      Minimum Price
                                    </label>
                                    <input
                                      type="number"
                                      name="price_min"
                                      id="price_min"
                                      placeholder="e.g. 150"
                                      className="input"
                                    />
                                  </div>

                                  <div className="space-y-1.5 flex-1/2">
                                    <label
                                      htmlFor="price_max"
                                      className="label"
                                    >
                                      Maximum Price
                                    </label>
                                    <input
                                      type="number"
                                      name="price_max"
                                      id="price_max"
                                      placeholder="e.g. 500"
                                      className="input"
                                    />
                                  </div>
                                </div>

                                <div className="card-actions justify-end gap-3.5">
                                  <button
                                    onClick={() => editModalRef.current.close()}
                                    type="button"
                                    className="btn btn-outline btn-primary"
                                  >
                                    Close
                                  </button>

                                  <button className="btn btn-primary text-white">
                                    Update
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </dialog>

                        <button
                          onClick={() => handleDeleteProduct(item._id)}
                          className="btn btn-error btn-outline btn-sm"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => handleClickSold(item._id)}
                          disabled={item.status !== "pending"}
                          className="btn btn-success btn-outline btn-sm"
                        >
                          {item.status === "pending" ? "Make Sold" : "Sold"}
                        </button>

                        <dialog
                          ref={soldModalRef}
                          className="modal modal-bottom sm:modal-middle"
                        >
                          <div className="modal-box max-w-4xl w-full">
                            <div className="grid place-items-center">
                              <div
                                method="dialog"
                                className="space-y-4 w-full overflow-hidden"
                              >
                                <h5 className="text-center text-2xl font-semibold">
                                  Bids For This Product
                                </h5>

                                <BidsTable
                                  productId={item._id}
                                  setProducts={setProducts}
                                  allBids={productBids}
                                  setAllBids={setProductBids}
                                />

                                <div className="card-actions justify-end">
                                  <button
                                    onClick={() => soldModalRef.current.close()}
                                    type="button"
                                    className="btn btn-outline btn-primary"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
};

export default MyProductsPage;
