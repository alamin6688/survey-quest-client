import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import cartoonImg from '../../assets/images/cartoon.png'
import { loadCaptchaEnginge,LoadCanvasTemplate,validateCaptcha } from "react-simple-captcha";



const Login = () => {

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        loadCaptchaEnginge(6);
      }, []);

      const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
      };
    

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
    }

    return (
        <>
        <Helmet>
          <title>Survey Quest | Login</title>
        </Helmet>
        <div className="min-h-screen bg-base-200 mt-12 mb-12">
        <div className="hero-content flex-col lg:flex-row md:py-28">
            <div className="md:mr-28">
                <img src={cartoonImg} alt="" className="w-3/4 md:w-full mx-auto"/>
            </div>
          <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <div className="text-center pt-6">
              <h3 className="text-4xl font-bold">Login</h3>
            </div>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt font-semibold link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="Type the captcha above"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input
                  disabled={disabled}
                  className="btn btn-ghost bg-green-500 hover:bg-green-600 text-xl font-bold text-white"
                  type="submit"
                  value="Login"
                />
              </div>
              <div className="text-center mt-4">
                <p className="font-bold text-red-400">
                  <small>
                    Don&apos;t have any account?{" "}
                    <Link to="/signup">
                      <span className="underline text-red-600">
                        Sign Up Now
                      </span>
                    </Link>{" "}
                  </small>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
    );
};

export default Login;