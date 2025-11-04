import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import useAuthInfo from "../../hooks/useAuthInfo";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBidsPage = () => {
  const { currentUser } = useAuthInfo();
  const secureAxios = useAxiosSecure();
  const [userBids, setUserBids] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await secureAxios.get(`/bids/user/product`, {
          params: {
            email: currentUser.email,
          },
        });

        setUserBids(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentUser.email, secureAxios]);

  const handleDelete = async (id) => {
    try {
      const { data } = await secureAxios.delete(`/bids/${id}`);

      if (data.deletedCount) {
        const updatedBids = userBids.filter((item) => item._id !== id);
        setUserBids(updatedBids);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <title>My Bids - SmartDeals</title>

      <section className="py-6 my-5 min-h-[70dvh]">
        <Container className="space-y-7">
          <h1 className="text-center text-4xl font-bold">
            My Bids:{" "}
            <span className="text-primary">
              {userBids.length < 10 ? `0${userBids.length}` : userBids.length}
            </span>
          </h1>

          <div className={`overflow-x-auto`}>
            <table className="table w-full rounded-md overflow-hidden bg-white shadow-lg">
              <thead>
                <tr className="bg-[#F9FAFB]">
                  <th>SL No</th>
                  <th>Product</th>
                  <th>Seller</th>
                  <th>Bid Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {userBids.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>

                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle size-12 bg-base-300">
                            <img
                              src={item.productDetails.image}
                              alt={item.productDetails.title}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {item.productDetails.title}
                          </div>
                          <div className="text-sm opacity-50">
                            ৳ {item.productDetails.price_max}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-8 h-8 bg-base-300">
                            <img
                              src={item.productDetails.seller_image}
                              alt={item.productDetails.seller_name}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {item.productDetails.seller_name}
                          </div>
                          <div className="text-sm opacity-50">
                            {item.productDetails.seller_email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>৳ {item.bid_price}</td>

                    <td>
                      <p className="capitalize">
                        {item.status === "pending" ? (
                          <span className="badge badge-warning">
                            {item.status}
                          </span>
                        ) : (
                          <span className="badge badge-success">
                            {item.status}
                          </span>
                        )}
                      </p>
                    </td>

                    <td>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-error btn-outline btn-sm"
                      >
                        Remove Bid
                      </button>
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

export default MyBidsPage;
