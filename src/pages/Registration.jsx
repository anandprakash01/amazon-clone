import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

import {darkLogo} from "../assets/index";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PropagateLoader from "react-spinners/PropagateLoader";

const Registration = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cPassword: "",
  });

  const [errors, setErros] = useState({
    errName: "",
    errEmail: "",
    errPhone: "",
    errPassword: "",
    errcPassword: "",
  });
  const [firebaseErr, setFirebaseErr] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setUserDetails({...userDetails, name: e.target.value});
        setErros({...errors, errName: ""});
        break;
      case "email":
        setUserDetails({...userDetails, email: e.target.value});
        setErros({...errors, errEmail: ""});
        setFirebaseErr("");
        break;
      case "phone":
        setUserDetails({...userDetails, phone: e.target.value});
        setErros({...errors, errPhone: ""});
        break;
      case "password":
        setUserDetails({...userDetails, password: e.target.value});
        setErros({...errors, errPassword: ""});
        break;
      case "cPassword":
        setUserDetails({...userDetails, cPassword: e.target.value});
        setErros({...errors, errcPassword: ""});
        break;
      default:
        setUserDetails({...userDetails});
    }
    // console.log(userDetails);
  };

  //Email Validation
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    if (!userDetails.name) {
      setErros((pre) => ({...pre, errName: "Enter your Name"}));
    }
    if (!userDetails.email) {
      setErros((pre) => ({...pre, errEmail: "Enter your email"}));
      setFirebaseErr("");
    } else {
      if (!emailValidation(userDetails.email)) {
        setErros((pre) => ({...pre, errEmail: "Enter a valid email"}));
      }
    }
    if (!userDetails.phone) {
      setErros((pre) => ({...pre, errPhone: "Enter your Phone number"}));
    }
    if (!userDetails.password) {
      setErros((pre) => ({...pre, errPassword: "Enter your Password"}));
    }
    if (!userDetails.cPassword) {
      setErros((pre) => ({...pre, errcPassword: "Confirm Password"}));
    } else {
      if (userDetails.password != userDetails.cPassword) {
        setErros((pre) => ({...pre, errcPassword: "Password must be same"}));
      }
    }

    if (
      userDetails.name &&
      userDetails.email &&
      emailValidation(userDetails.email) &&
      userDetails.password &&
      userDetails.password.length >= 6 &&
      userDetails.cPassword == userDetails.password
    ) {
      setLoading(true);
      // console.log(userDetails);
      // console.log(errors);

      createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: userDetails.name,
            photoURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUa8PZYe9Y5zyspVmN2TaeyEYezdOp55YvJw&usqp=CAU",

            // phoneNumber: userDetails.phone,
          });
          //signin
          const user = userCredential.user;
          // console.log(user);
          setLoading(false);
          setSuccessMsg("Account Created Successfully");

          setTimeout(() => {
            navigate("/signin");
          }, 5000);
        })
        .catch((error) => {
          const errCode = error.code;
          // const errMsg = error.message;
          // console.log(error);
          if (errCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("Email Already in use, Try another one");
          }
        });

      setUserDetails({name: "", email: "", phone: "", password: "", cPassword: ""});
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className="w-[350px] mx-auto flex flex-col items-center">
          <img className="w-32" src={darkLogo} alt="logo" />

          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">Create Account</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Your Name</p>
                <input
                  onChange={handleChange}
                  name="name"
                  value={userDetails.name}
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="text"
                />
                {errors.errName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errors.errName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email</p>
                <input
                  onChange={handleChange}
                  name="email"
                  value={userDetails.email}
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                />
                {errors.errEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errors.errEmail}
                  </p>
                )}
                {firebaseErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Phone number</p>
                <input
                  onChange={handleChange}
                  name="phone"
                  value={userDetails.phone}
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="number"
                />
                {errors.errPhone && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errors.errPhone}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  onChange={handleChange}
                  name="password"
                  value={userDetails.password}
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                />
                {errors.errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errors.errPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Re-enter Password</p>
                <input
                  onChange={handleChange}
                  name="cPassword"
                  value={userDetails.cPassword}
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                />
                {errors.errcPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errors.errcPassword}
                  </p>
                )}
              </div>
              {userDetails.password.length < 6 && (
                <p className="text-xs text-gray-600">
                  Password must be at least 6 characters
                </p>
              )}
              <button
                onClick={handleRegistration}
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                Continue
              </button>
              {loading && (
                <div className="mx-auto my-5">
                  <PropagateLoader color="#00ab26" />
                </div>
              )}
              {successMsg && (
                <div>
                  <p className=" text-center text-l text-green-600 ">{successMsg}</p>
                </div>
              )}
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By Creating Account, you agree to Amazon's{" "}
              <span className="text-blue-600">Conditions of use</span> and{" "}
              <span className="text-blue-600">Pivacy Notice</span>
            </p>
            <div>
              <p className="text-xs text-black">
                Already have an account{" "}
                <Link to="/signin">
                  <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                    Sign in{" "}
                    <span>
                      <ArrowRightIcon />
                    </span>
                  </span>
                </Link>
              </p>
              <p className="text-xs text-black -mt-2">
                Buying for work?{" "}
                <span className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100">
                  Create a business account
                </span>
              </p>
            </div>
          </div>
        </form>
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

export default Registration;
