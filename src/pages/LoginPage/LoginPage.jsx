import { FcGoogle } from "react-icons/fc";
import { Link, useLocation } from "react-router";
import useAuthInfo from "../../hooks/useAuthInfo";

const LoginPage = () => {
  const { signInWithGoogle, signInUser } = useAuthInfo();
  const { state } = useLocation();

  const handleUserLogin = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signInUser(email, password);
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
      <title>Login Now</title>

      <main>
        <section className="p-5 my-6 min-h-[calc(100dvh-65px)] grid place-items-center">
          <form
            onSubmit={handleUserLogin}
            className="max-w-md w-full bg-white rounded-lg shadow-lg"
          >
            <fieldset className="fieldset text-base p-7 space-y-2">
              <div className="text-center space-y-2">
                <h1 className="font-bold text-2xl">Login</h1>

                <p>
                  Don't have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="link link-hover link-primary"
                  >
                    Register Now
                  </Link>
                </p>

                {state && (
                  <p
                    role="alert"
                    className="alert justify-center font-semibold text-base text-error bg-error/5 shadow-none"
                  >
                    {state.message}
                  </p>
                )}
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

              <div className="space-y-1 mb-0">
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

              <div className="mb-4">
                <Link className="link link-hover text-sm opacity-60">
                  Forgot password?
                </Link>
              </div>

              <button className="btn btn-primary">Login</button>

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

export default LoginPage;
