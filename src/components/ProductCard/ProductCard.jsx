import { useNavigate } from "react-router";

const ProductCard = ({ singleProduct }) => {
  const navigate = useNavigate();
  const { _id, title, price_min, price_max, image, usage } =
    singleProduct || {};

  return (
    <div className="card bg-white shadow-xl p-6 space-y-5">
      <figure className="bg-accent rounded-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
      </figure>

      <div className="card-body p-0 text-sm sm:text-base gap-2">
        <h2 title={`${title} [${usage}]`} className="card-title">
          {title.length > 60
            ? `${title.slice(0, 60)}...`
            : `${title} [${usage}]`}
        </h2>

        <p className="font-medium text-primary">
          $ {price_max} - {price_min}
        </p>

        <div className="card-actions">
          <button
            onClick={() => navigate(`/product-details/${_id}`)}
            className="btn btn-outline btn-primary btn-block"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
