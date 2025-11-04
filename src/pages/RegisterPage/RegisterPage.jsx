import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import useAuthInfo from "../../hooks/useAuthInfo";

const RegisterPage = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuthInfo();

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const displayName = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    if (password.length < 6) {
      console.log("Password length must be 6 or greater");
      return;
    }

    try {
      const userCredential = await createUser(email, password);
      const user = userCredential.user;
      await updateUserProfile({ ...user, displayName, photoURL });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <title>Register Now - SmartDeals</title>

      <main>
        <section className="p-5 my-6 min-h-[calc(100dvh-65px)] grid place-items-center">
          <form
            onSubmit={handleCreateUser}
            className="max-w-md w-full bg-white rounded-lg shadow-lg"
          >
            <fieldset className="fieldset text-base p-7 space-y-2">
              <div className="text-center space-y-2">
                <h1 className="font-bold text-2xl">Register Now</h1>
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="link link-hover link-primary"
                  >
                    Login Now
                  </Link>
                </p>
              </div>

              <div className="space-y-1">
                <label htmlFor="name" className="label">
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  className="input"
                  placeholder="Mariam Swarna"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="label">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  className="input"
                  placeholder="smsowkothasan@gmail.com"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="photoURL" className="label">
                  Image-URL
                </label>

                <input
                  id="photoURL"
                  type="text"
                  className="input"
                  placeholder="http://example-image.png"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="label">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  className="input"
                  placeholder="•••••••"
                  required
                />
              </div>

              <button className="btn btn-primary">Register</button>

              <div className="divider divider-primary font-medium">OR</div>

              <button
                type="button"
                className="btn btn-outline text-black border-[#e5e5e5] text-base"
                onClick={handleGoogleLogin}
              >
                <FcGoogle size={20} />
                Login with Google
              </button>
            </fieldset>
          </form>
        </section>
      </main>
    </>
  );
};

export default RegisterPage;
