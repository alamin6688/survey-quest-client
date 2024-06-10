import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import cartoonImg from '../../assets/images/cartoon.png'
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
    .then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName
      }
      // console.log(result.user);
      axiosPublic.post('/users', userInfo)
      .then(res => {
        console.log(res.data);
        reset();
        if (res.data.insertedId){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Signed Up successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        navigate('/');
      })
      .catch((error) => console.log(error));
    });
  };

  return (
    <>
        <Helmet>
          <title>Survey Quest | Sign Up</title>
        </Helmet>
      <div className="min-h-screen bg-base-200 mt-12 mb-12">
        <div className="hero-content flex-col lg:flex-row md:py-28">
            <div className="md:mr-28">
                <img src={cartoonImg} alt="" className="w-3/4 md:w-full mx-auto"/>
            </div>
          <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <div className="text-center pt-6">
              <h3 className="text-4xl font-bold">Sign Up</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">PhotoURL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  name="photoURL"
                  placeholder="PhotoURL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">
                    Password must be atleast 6 characters.
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters.
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-ghost bg-green-500 hover:bg-green-600 text-xl font-bold text-white"
                  type="submit"
                  value="Sign Up"
                />
              </div>
              <div className="text-center mt-4">
                <p className="font-bold text-red-400">
                  <small>
                    Already registered?{" "}
                    <Link to="/login">
                      <span className="underline text-red-600">Login</span>
                    </Link>{" "}
                  </small>
                </p>
              </div>
              <SocialLogin></SocialLogin>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
