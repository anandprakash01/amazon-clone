import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SecurityIcon from "@mui/icons-material/Security";
import PaymentIcon from "@mui/icons-material/Payment";

const Account = () => {
  const userInfo = useSelector(state => state.amazon.userInfo);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  if (!userInfo) {
    navigate("/signin");
    return null;
  }

  const accountSections = [
    {
      id: "profile",
      title: "Profile Information",
      icon: <AccountCircleIcon />,
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-amazon_blue rounded-full flex items-center justify-center">
              <span className="text-3xl text-white">
                {userInfo ? (
                  <img
                    src={userInfo.photoURL}
                    alt={userInfo.userName[0]}
                    className="rounded-full"
                  />
                ) : (
                  "?"
                )}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{userInfo?.userName || "User"}</h3>
              <p className="text-gray-600">{userInfo?.email || "No email provided"}</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 hover:cursor-not-allowed">
            Edit Profile
          </button>
        </div>
      ),
    },
    {
      id: "orders",
      title: "Your Orders",
      icon: <ShoppingBagIcon />,
      content: (
        <div className="text-center py-8">
          <p className="text-gray-600">No orders yet</p>
          <Link to="/" className="text-amazon_blue hover:underline inline-block mt-2">
            Start Shopping
          </Link>
        </div>
      ),
    },

    {
      id: "addresses",
      title: "Addresses",
      icon: <LocationOnIcon />,
      content: (
        <div className="space-y-4">
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 hover:cursor-not-allowed">
            Add New Address
          </button>
          <p className="text-gray-600">No addresses saved yet</p>
        </div>
      ),
    },
    {
      id: "security",
      title: "Security",
      icon: <SecurityIcon />,
      content: (
        <div className="space-y-4">
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 hover:cursor-not-allowed">
            Change Password
          </button>
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 ml-2 hover:cursor-not-allowed">
            Two-Factor Authentication
          </button>
        </div>
      ),
    },
    {
      id: "payment",
      title: "Payment Methods",
      icon: <PaymentIcon />,
      content: (
        <div className="space-y-4">
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 hover:cursor-not-allowed">
            Add Payment Method
          </button>
          <p className="text-gray-600">No payment methods saved</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-amazon_blue mb-8">Your Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white rounded-lg shadow p-4">
            {accountSections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center space-x-2 p-3 rounded-md text-left ${
                  activeTab === section.id
                    ? "bg-amazon_blue text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                {section.icon}
                <span>{section.title}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="md:col-span-3 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">
              {accountSections.find(s => s.id === activeTab)?.title}
            </h2>
            {accountSections.find(s => s.id === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
