import React from "react";
import {Link} from "react-router-dom";
import {dp1, dp2, dp3} from "../assets/index.jsx";

const CustomerStories = () => {
  const stories = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      image: dp2,
      story:
        "I've been shopping on Amazon Clone for over a year now, and the experience has been fantastic. The wide variety of products and fast delivery are unmatched!",
      purchasedItem: "Wireless Headphones",
    },
    {
      id: 2,
      name: "Raj Prakash",
      location: "Indore, India",
      rating: 5,
      image: dp1,
      story:
        "The customer service is exceptional. Had an issue with my order, and it was resolved within hours. Really impressed with the dedication to customer satisfaction.",
      purchasedItem: "Smart Watch",
    },
    {
      id: 3,
      name: "Isha Jyoti",
      location: "Delhi, India",
      rating: 4,
      image: dp3,
      story:
        "What I love most is the detailed product descriptions and reviews. Makes online shopping so much more confident and enjoyable.",
      purchasedItem: "Laptop",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-amazon_blue mb-4">
          Customer Success Stories
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Read about real experiences from our valued customers around the world.
        </p>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {stories.map(story => (
          <div
            key={story.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">{story.name}</h3>
                  <p className="text-gray-600 text-sm">{story.location}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  {[...Array(story.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Purchased: {story.purchasedItem}</p>
              </div>

              <p className="text-gray-700 mb-4">{story.story}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ready to create your own success story?
        </h2>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 rounded-md font-semibold"
        >
          Start Shopping Now
        </Link>
      </div>
    </div>
  );
};

export default CustomerStories;
