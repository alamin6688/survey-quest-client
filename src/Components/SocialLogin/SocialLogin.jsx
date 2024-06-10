import { FaFacebook, FaGoogle } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SocialLogin = () => {

    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result => {
            console.log(result.user)
            const userInfo = {
              email: result.user?.email,
              name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
              console.log(res.data);
              if (res.data){
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
        })
    }

  return (
    <div>
      <div className="flex flex-col w-full border-opacity-50">
        <div className="divider font-bold">Or sign in with</div>
        <div className="flex justify-around items-center w-3/4 mx-auto">
          <button className="btn">
            <FaFacebook className="w-8 h-8" />
          </button>
          <button onClick={handleGoogleSignIn} className="btn">
            <FaGoogle className="w-8 h-8" />
          </button>
          <button className="btn">
            <IoLogoGithub className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;