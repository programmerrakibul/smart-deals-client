import { Link, useParams } from "react-router";
import Container from "../../components/Container/Container";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import useAuthInfo from "../../hooks/useAuthInfo";
import { format } from "date-fns";
import BidsTable from "../../components/BidsTable/BidsTable";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProductDetails = () => {
  const { currentUser } = useAuthInfo();
  const secureAxios = useAxiosSecure();
  const { productId } = useParams();
  const [productBids, setProductBids] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const bidModalRef = useRef(null);
  const {
    _id,
    title,
    price_min,
    price_max,
    image,
    usage,
    description,
    seller_contact,
    condition,
    seller_name,
    seller_image,
    seller_email,
    location,
    status,
    created_at,
    category,
  } = singleProduct || {};

  useEffect(() => {
    (async () => {
      try {
        const { data } = await secureAxios.get(`/products/${productId}`);
        setSingleProduct(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [productId, secureAxios]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await secureAxios.get(`/bids/${_id}`);
        setProductBids(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [_id, secureAxios]);

  const handleSubmitBid = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const newBid = {
      productId: _id,
      status: "pending",
      userId: currentUser.uid,
      ...formData,
    };

    try {
      const { data } = await secureAxios.post("/bids", newBid);

      if (data.insertedId) {
        newBid._id = data.insertedId;
        setProductBids([...productBids, newBid]);
      }
      bidModalRef.current.close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <title>{`${title} - SmartDeals`}</title>

      <section className="py-10">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-7">
          {/* Left Side */}
          <div className="flex-2/5 flex flex-col gap-7">
            <figure className="bg-accent rounded-md shadow-md overflow-hidden">
              <img
                src={image}
                alt={title}
                className="aspect-square object-cover w-full h-full max-h-[380px]"
              />
            </figure>

            <div className="space-y-3.5 bg-white p-4 rounded-md shadow-md">
              <h4>Product Description</h4>

              <div className="border-b border-gray-300 flex items-center justify-between gap-3.5 py-2 capitalize">
                <p>
                  <strong className="text-primary">Condition: </strong>
                  {condition}
                </p>

                <p>
                  <strong className="text-primary">Usage Time: </strong>
                  {usage}
                </p>
              </div>

              <p>{description}</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-3/5 space-y-5">
            <Link
              to="/all-products"
              className="link link-hover link-neutral inline-block"
            >
              <BsArrowLeft size={20} className="inline-block" /> Back to
              Products
            </Link>

            <h1>{title}</h1>

            <span className="badge badge-primary">{category}</span>

            <div className="space-y-2 bg-white p-4 rounded-md shadow-md">
              <p className="text-success font-semibold">
                $ {price_max} - {price_min}
              </p>
              <p>Price starts from </p>
            </div>

            <div className="bg-white p-4 rounded-md shadow-md">
              <h4>Product Details</h4>
              <p>
                <strong>Product ID: </strong>
                {_id}
              </p>

              <p>
                <strong>Posted: </strong>
                {created_at && format(new Date(created_at), "MM/dd/yyyy")}
              </p>
            </div>

            <div className="space-y-2 bg-white p-4 rounded-md shadow-md">
              <h4>Seller Information</h4>

              <div className="flex items-center gap-4">
                <div className="size-8 ring ring-primary rounded-full text-xs overflow-hidden">
                  <img
                    src={seller_image}
                    alt={seller_name}
                    className="rounded-full"
                  />
                </div>

                <div>
                  <h5>{seller_name}</h5>
                  <h5>{seller_email}</h5>
                </div>
              </div>

              <p>
                <strong>Location: </strong>
                {location}
              </p>
              <p>
                <strong>Contact: </strong>
                {seller_contact}
              </p>
              <p>
                <strong>Status: </strong>
                <span
                  className={`badge ${
                    status === "pending" ? "badge-warning" : "badge-success"
                  } text-neutral capitalize`}
                >
                  {status === "pending" ? "on sale" : status}
                </span>
              </p>
            </div>

            {seller_email !== currentUser.email && (
              <button
                onClick={() => bidModalRef.current.showModal()}
                className="btn btn-primary btn-block text-white"
              >
                I want Buy This Product
              </button>
            )}

            <dialog
              ref={bidModalRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <div className="modal-action">
                  <form
                    onSubmit={handleSubmitBid}
                    method="dialog"
                    className="space-y-4"
                  >
                    <h5 className="text-center text-2xl font-semibold">
                      Give Seller Your Offered Price
                    </h5>

                    <div className="flex items-center justify-between gap-3.5">
                      <div className="space-y-1.5">
                        <label htmlFor="buyer_name" className="label">
                          Buyer Name
                        </label>
                        <input
                          type="text"
                          name="buyer_name"
                          id="buyer_name"
                          defaultValue={currentUser.displayName}
                          className="input"
                          readOnly
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="buyer_email" className="label">
                          Buyer Email
                        </label>
                        <input
                          type="email"
                          name="buyer_email"
                          id="buyer_email"
                          defaultValue={currentUser.email}
                          className="input"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="buyer_image" className="label">
                        Buyer Image URL
                      </label>
                      <input
                        type="text"
                        name="buyer_image"
                        id="buyer_image"
                        defaultValue={currentUser.photoURL}
                        className="input"
                        readOnly
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="bid_price" className="label">
                        Place your Price
                      </label>
                      <input
                        type="number"
                        name="bid_price"
                        id="bid_price"
                        placeholder="e.g. 150"
                        className="input"
                        required
                      />
                    </div>

                    <div className="card-actions justify-end gap-3.5">
                      <button
                        type="button"
                        onClick={() => bidModalRef.current.close()}
                        className="btn btn-outline btn-primary"
                      >
                        Close
                      </button>

                      <button className="btn btn-primary text-white">
                        Submit Bid
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </Container>
      </section>

      <section className="py-6 my-5 min-h-[70dvh]">
        <Container className="space-y-7">
          <h1 className="text-4xl font-bold">
            Bids For This Product:{" "}
            <span className="text-primary">
              {productBids.length < 10
                ? `0${productBids.length}`
                : productBids.length}
            </span>
          </h1>

          <BidsTable allBids={productBids} />
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;
