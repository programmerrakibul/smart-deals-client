import { useLocation } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BidsTable = ({ allBids, setAllBids, productId, setProducts }) => {
  const { pathname } = useLocation();
  const secureAxios = useAxiosSecure();

  const handleAccept = async (id) => {
    try {
      const accept = {
        status: "accepted",
      };

      const reject = {
        status: "rejected",
      };

      const sold = {
        status: "sold",
      };

      const { data } = await secureAxios.put(
        `/bids/product/${productId}`,
        reject
      );

      if (data.modifiedCount) {
        const { data } = await secureAxios.put(`/bids/${id}`, accept);

        if (data.modifiedCount) {
          const { data } = await secureAxios.put(
            `/products/${productId}`,
            sold
          );

          if (data.modifiedCount) {
            const updatedBids = allBids.map((item) => {
              return item._id === id
                ? { ...item, ...accept }
                : { ...item, ...reject };
            });

            setProducts((prv) =>
              prv.map((item) => {
                return item._id === productId ? { ...item, ...sold } : item;
              })
            );

            setAllBids(updatedBids);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const status = {
        status: "rejected",
      };

      const { data } = await secureAxios.put(`/bids/${id}`, status);

      if (data.modifiedCount) {
        const updated = allBids.map((item) => {
          return item._id === id ? { ...item, ...status } : item;
        });

        setAllBids(updated);
      }
    } catch (error) {
      error;
    }
  };

  return (
    <>
      <div className={`overflow-x-auto`}>
        <table className="table w-full rounded-md overflow-hidden bg-white shadow-lg">
          <thead>
            <tr className="bg-[#F9FAFB]">
              <th>SL No</th>
              <th>Buyer</th>
              <th>Bid Price</th>
              <th>Status</th>
              {pathname === "/my-products" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {allBids.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>

                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-8 h-8 bg-base-300">
                        <img src={item.buyer_image} alt={item.buyer_name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.buyer_name}</div>
                      <div className="text-sm opacity-50">
                        {item.buyer_email}
                      </div>
                    </div>
                  </div>
                </td>

                <td>৳ {item.bid_price}</td>

                <td>
                  <p className="capitalize">
                    {item.status === "pending" && (
                      <span className="badge badge-warning">{item.status}</span>
                    )}

                    {item.status === "accepted" && (
                      <span className="badge badge-success">{item.status}</span>
                    )}

                    {item.status === "rejected" && (
                      <span className="badge badge-error">{item.status}</span>
                    )}
                  </p>
                </td>

                {pathname === "/my-products" && (
                  <td>
                    <div className="flex items-center gap-2.5">
                      <button
                        disabled={item.status !== "pending"}
                        onClick={() => handleAccept(item._id)}
                        className="btn btn-sm btn-success btn-outline"
                      >
                        Accept
                      </button>

                      <button
                        disabled={item.status !== "pending"}
                        onClick={() => handleReject(item._id)}
                        className="btn btn-sm btn-error btn-outline"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BidsTable;
