import GuestLayout from '@/Layouts/GuestLayout';

const LandingPage = ({ canLogin, canRegister, isLoggedIn }) => {

  return (
    <GuestLayout canLogin={canLogin} canRegister={canRegister} isLoggedIn={isLoggedIn}>
      {/* Hero Section */}
      <section
        className="w-full bg-white px-auto m-0 flex justify-between items-center py-12 md:py-32 relative"

      >
        <img src='https://media.gettyimages.com/id/2160483461/photo/red-car-driving-across-open-desert-at-sunset.jpg?s=612x612&w=0&k=20&c=8HBb1-Y6_rWm3NSEZnzCBF2b2xPLp1wbI7o0ZgQHVCs=' className='absolute inset-0 h-full w-full object-cover z-10'/>
        <div className="container mx-auto z-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Find Your Dream Car Today!</h2>
          <p className="text-lg text-white mb-6">
            Discover the best deals on used cars. Post, search, and bid effortlessly.
          </p>
          <div>
            <a
              href="#features"
              className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500"
            >
              Explore Now
            </a>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-900 shadow-md">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8 text-white">Our Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-md">
              <img
                src="image/Car1.jpg"
                alt="Post a Car"
                className="mb-4 mx-auto h-40 w-40" // Adjusted image size
              />
              <p className="text-xl font-bold mb-2 text-white">Post a Car</p>
              <p className="text-gray-300">
                Easily post your car for sale with detailed information and pictures.
              </p>
              <div className="mt-4">
                <a
                  href="#"
                  className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500"
                >
                  Post a Car
                </a>
              </div>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md">
              <img
                src="image/Car4.jpg"
                alt="Search Cars"
                className="mb-4 mx-auto h-40 w-40" // Adjusted image size
              />
              <p className="text-xl font-bold mb-2 text-white">Search Cars</p>
              <p className="text-gray-300">
                Find the perfect car by filtering make, model, price, and more.
              </p>
              <div className="mt-4">
                <a
                  href="#search"
                  className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500"
                >
                  Search Now
                </a>
              </div>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md">
              <img
                src="image/Car3.jpg"
                alt="Place Bids"
                className="mb-4 mx-auto h-40 w-40" // Adjusted image size
              />
              <p className="text-xl font-bold mb-2 text-white">Place Bids</p>
              <p className="text-gray-300">
                Bid on your favorite cars and get the best deals possible.
              </p>
              <div className="mt-4">
                <a
                  href="#register"
                  className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500"
                >
                  Place a Bid
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="bg-gray-900 shadow-md py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8 text-white">About Us</h3>
          <div className="max-w-xl mx-auto text-white bg-gray-800 rounded-lg shadow-lg p-6">
          <img
          src="image/Car5.jpg"
          alt="About Us"
          className="mb-6 mx-auto h-64 w-64 rounded-lg"
          />
          <p className="text-gray-300 mb-6">
            We are a leading platform connecting car buyers and sellers. Our portal
            makes it simple and secure to find great deals on used cars.
          </p>
          <div>
            <a
              href="#about"
              className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-16 shadow-md bg-gray-900">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8 text-white">Contact Us</h3>
          <img src="image/ContactUs.png" alt="Contact Us" className="mb-8 mx-auto h-64 w-84" /> {/* Larger image size */}
          <p className="text-gray-300 max-w-xl mx-auto">
            Have questions or need support? Reach out to us, and we'll be happy to help.
          </p>
          <div className="mt-6">
            <a
              href="mailto:support@usedcarsportal.com"
              className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </GuestLayout>
  );
};

export default LandingPage;
