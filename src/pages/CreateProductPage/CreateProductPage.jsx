import axios from "axios";
import Container from "../../components/Container/Container";
import useAuthInfo from "../../hooks/useAuthInfo";

const CreateProductPage = () => {
  const { currentUser } = useAuthInfo();

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const created_at = new Date().toISOString();
    const status = "pending";
    const newProduct = { ...formData, created_at, status };

    console.log(newProduct);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/products",
        newProduct,
        {
          headers: {
            authorization: `bearer ${currentUser.accessToken}`,
          },
        }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <title>Create your Product</title>

      <section className="py-7 my-5">
        <Container className="grid place-items-center min-h-[60dvh]">
          <div className="space-y-7">
            <h1 className="font-bold text-4xl text-center">
              Create <span className="text-primary">A Product</span>
            </h1>

            <form
              onSubmit={handleCreateProduct}
              className="space-y-4 w-full max-w-lg bg-white p-7 rounded-md shadow-md"
            >
              <div className="flex items-center justify-between gap-3.5">
                <div className="space-y-1.5 flex-1/2">
                  <label htmlFor="title" className="label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="input"
                    placeholder="e.g. Yamaha Fz Guitar for Sale"
                    required
                  />
                </div>

                <div className="space-y-1.5 flex-1/2">
                  <label htmlFor="category" className="label">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    className="input"
                    placeholder="e.g., Electronics, Furniture"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3.5">
                <div className="space-y-1.5 flex-1/2">
                  <label htmlFor="price_min" className="label">
                    Minimum Price
                  </label>
                  <input
                    type="number"
                    name="price_min"
                    id="price_min"
                    placeholder="e.g. 150"
                    className="input"
                    required
                  />
                </div>

                <div className="space-y-1.5 flex-1/2">
                  <label htmlFor="price_max" className="label">
                    Maximum Price
                  </label>
                  <input
                    type="number"
                    name="price_max"
                    id="price_max"
                    placeholder="e.g. 500"
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3.5">
                <div className="space-y-1.5 flex-1/2">
                  <h5 className="label">Condition</h5>
                  <div className="flex items-center justify-between gap-2.5">
                    <label className="space-x-1.5">
                      <input
                        type="radio"
                        name="condition"
                        value="brand new"
                        className="radio radio-xs radio-primary"
                        defaultChecked
                      />
                      <span className="font-medium">Brand New</span>
                    </label>

                    <label className="space-x-1.5">
                      <input
                        type="radio"
                        name="condition"
                        value="used"
                        className="radio radio-xs radio-primary"
                      />
                      <span className="font-medium">Used</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5 flex-1/2">
                  <label htmlFor="usage" className="label">
                    Usage time
                  </label>
                  <input
                    type="text"
                    name="usage"
                    id="usage"
                    placeholder="e.g. 1 year 3 month "
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="image" className="label">
                  Your Product Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  placeholder="https://..."
                  className="input"
                  required
                />
              </div>

              <div className="flex items-center justify-between gap-3.5">
                <div className="space-y-1.5 flex-1/2">
                  <label htmlFor="seller_name" className="label">
                    Seller Name
                  </label>
                  <input
                    type="text"
                    name="seller_name"
                    id="seller_name"
                    defaultValue={currentUser.displayName}
                    className="input"
                    readOnly
                  />
                </div>

                <div className="space-y-1.5 flex-1/2">
                  <label htmlFor="seller_email" className="label">
                    Seller Email
                  </label>
                  <input
                    type="email"
                    name="seller_email"
                    id="seller_email"
                    defaultValue={currentUser.email}
                    className="input"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3.5">
                <div className="space-y-1.5 flex-1/2">
                  <label htmlFor="seller_contact" className="label">
                    Seller Contact
                  </label>
                  <input
                    type="text"
                    name="seller_contact"
                    id="seller_contact"
                    placeholder="e.g. +1-555-1234"
                    className="input"
                    required
                  />
                </div>

                <div className="space-y-1.5 flex-1/2">
                  <label htmlFor="seller_image" className="label">
                    Seller Image URL
                  </label>
                  <input
                    type="text"
                    name="seller_image"
                    id="seller_image"
                    defaultValue={currentUser.photoURL}
                    className="input"
                    readOnly
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="location" className="label">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="City, Country"
                  className="input"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="description" className="label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="textarea"
                  placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough..... "
                  required
                ></textarea>
              </div>

              <button className="btn btn-primary btn-block text-white uppercase">
                create a product
              </button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CreateProductPage;
