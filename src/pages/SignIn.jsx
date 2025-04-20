import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUserInfo} from "../redux/amazonSlice";

//firebase imports for authentication
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import {darkLogo} from "../assets/index";

import {FcGoogle} from "react-icons/fc";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import GoogleIcon from "@mui/icons-material/Google";
import PropagateLoader from "react-spinners/PropagateLoader";

const SignIn = () => {
  //for firebase authentication
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [userEmailerr, setUserEmailerr] = useState("");
  const [userPassworderr, setUserPassworderr] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const userInfo = useSelector(state => state.amazon.userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleChange = e => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        setErrEmail("");
        setUserEmailerr("");
        break;
      case "password":
        setPassword(e.target.value);
        setErrPassword("");
        setUserPassworderr("");
        break;
      default:
    }
    // console.log(email, password);
  };

  const handleLoginWithEmail = e => {
    e.preventDefault();
    if (!email) {
      setErrEmail("Enter your email");
    }
    if (!password) {
      setErrPassword("Enter your Password");
    }
    if (email && password) {
      // console.log(email);
      // console.log(password);
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          // console.log(user);
          dispatch(
            setUserInfo({
              id: user.uid,
              userName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            })
          );
          // console.log(user);
          setLoading(false);
          setSuccessMsg(
            "Logged in Successfully! Welcome you back. Redirecting you to Home page..."
          );

          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
        .catch(error => {
          setLoading(false);
          const errCode = error.code;
          const errMsg = error.message;
          // console.log(error);
          if (errCode.includes("auth/invalid-email")) {
            setUserEmailerr("Invalid Email");
          }
          if (errCode.includes("auth/user-not-found")) {
            setUserEmailerr("User not found, Please Register First");
          }
          if (errCode.includes("auth/wrong-password")) {
            setUserPassworderr("Wrong Password! try again");
          }
        });
      setEmail("");
      setPassword("");
    }
  };

  const handleLoginWithGoogle = e => {
    e.preventDefault();
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(result => {
        // console.log("received result : ", result);
        const user = result.user;
        dispatch(
          setUserInfo({
            id: user.uid,
            userName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
        setLoading(false);
        setSuccessMsg(
          "Logged in Successfully! Welcome you back. Redirecting you to Home page..."
        );

        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch(error => {
        setLoading(false);
        console.log("ERROR: ", error);
      });
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        {successMsg ? (
          <div className="w-full flex justify-center items-center py-32">
            <p className="border-[1px] border-green-600 text-gray-500 font-titleFont text-lg font-semibold px-6 py-2">
              {successMsg}
            </p>
          </div>
        ) : (
          <form className="w-[350px] mx-auto flex flex-col items-center">
            <img className="w-32" src={darkLogo} alt="logo" />
            <div className="w-full border border-zinc-200 p-6">
              <h2 className="font-titleFont text-3xl font-medium mb-4">Sign in</h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Email</p>
                  <input
                    onChange={handleChange}
                    value={email}
                    name="email"
                    className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                    type="email"
                  />
                  {errEmail && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {errEmail}
                    </p>
                  )}
                  {userEmailerr && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {userEmailerr}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">Password</p>
                  <input
                    onChange={handleChange}
                    value={password}
                    name="password"
                    className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                    type="email"
                  />
                  {errPassword && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {errPassword}
                    </p>
                  )}
                  {userPassworderr && (
                    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                      <span className="italic font-titleFont font-extrabold text-base">
                        !
                      </span>
                      {userPassworderr}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleLoginWithEmail}
                  className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
                >
                  Continue
                </button>
                <div className="text-center">Or</div>
                <button
                  onClick={handleLoginWithGoogle}
                  className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
                >
                  {/* <GoogleIcon /> */}
                  <FcGoogle
                    size="1.5rem"
                    style={{
                      // fontSize: "3rem",
                      display: "inline",
                    }}
                  />
                  Sign in with google
                </button>

                {loading && (
                  <div className="mx-auto my-5">
                    <PropagateLoader color="#00ab26" />
                  </div>
                )}
              </div>
              <p className="text-xs text-black leading-4 mt-4">
                By Continuing, you agree to Amazon's{" "}
                <span className="text-blue-600">Conditions of use</span> and{" "}
                <span className="text-blue-600">Privacy Notice</span>
              </p>
            </div>
            <p className=" w-full text-xs text-gray-600 mt-4 flex items-center">
              <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
              <span className="w-1/3 text-center">New to Amazon</span>
              <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
            </p>
            <Link to="/registration">
              <button
                // onClick={(e) => e.preventDefault()}
                className="w-full py-1.5 px-5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                Create your Amazon account
              </button>
            </Link>
            {/* Add this below your existing sign in button */}
            <div className="mt-4 text-center">
              <Link
                to="/"
                className="w-full py-1.5 px-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-100 to-white hover:bg-gradient-to-b border border-zinc-300 inline-flex items-center justify-center gap-1 transition-colors"
              >
                Continue without signing in
                <ArrowRightIcon fontSize="small" />
              </Link>
            </div>
          </form>
        )}
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10">
        <div className="flex items-center gap-6">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Conditions of Use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
            Help
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2023, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default SignIn;
