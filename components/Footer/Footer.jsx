const Footer = () => {
  return (
    <footer className="bg-dark text-neutral py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* First Column: Brand Showcase */}
          <div>
            <h3 className="font-playfair text-xl mb-6">Our Story</h3>
            <p className="font-poppins text-sm mb-4">
              Driven by a passion for timeless elegance and modern style, our
              brand curates collections that empower women to express their
              individuality with confidence.
            </p>
            <p className="font-poppins text-sm">
              Discover the artistry behind our designs and our commitment to
              sustainable practices.
            </p>
            <div className="mt-6">
              <a
                href="/about"
                className="inline-block bg-primary text-neutral font-poppins py-2 px-5 rounded-md hover:bg-secondary transition duration-300 text-sm"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Second Column: Shop Categories */}
          <div>
            <h3 className="font-playfair text-xl mb-6">Shop</h3>
            <ul className="font-poppins text-sm">
              <li className="mb-3">
                <a href="/dresses" className="text-neutral hover:text-primary">
                  Dresses
                </a>
              </li>
              <li className="mb-3">
                <a href="/tops" className="text-neutral hover:text-primary">
                  Tops
                </a>
              </li>
              <li className="mb-3">
                <a href="/bottoms" className="text-neutral hover:text-primary">
                  Bottoms
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="/outerwear"
                  className="text-neutral hover:text-primary"
                >
                  Outerwear
                </a>
              </li>
              <li>
                <a
                  href="/accessories"
                  className="text-neutral hover:text-primary"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Third Column: Customer Care */}
          <div>
            <h3 className="font-playfair text-xl mb-6">Customer Care</h3>
            <ul className="font-poppins text-sm">
              <li className="mb-3">
                <a href="/contact" className="text-neutral hover:text-primary">
                  Contact Us
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="/track-order"
                  className="text-neutral hover:text-primary"
                >
                  Track Your Order
                </a>
              </li>
              <li className="mb-3">
                <a href="/returns" className="text-neutral hover:text-primary">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="/size-guide"
                  className="text-neutral hover:text-primary"
                >
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Fourth Column: Connect With Us */}
          <div>
            <h3 className="font-playfair text-xl mb-6">Connect</h3>
            <p className="font-poppins text-sm mb-4">
              Follow us for style inspiration and exclusive updates.
            </p>
            <div className="flex space-x-4 mb-4">
              {/* Social Media Icons (Replace with your actual links and icons) */}
              <a href="#" className="text-neutral hover:text-primary">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  {/* Facebook Icon */}
                </svg>
              </a>
              <a href="#" className="text-neutral hover:text-primary">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  {/* Instagram Icon */}
                </svg>
              </a>
              <a href="#" className="text-neutral hover:text-primary">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  {/* Pinterest Icon */}
                </svg>
              </a>
              {/* Add more social media icons */}
            </div>
            <p className="font-poppins text-sm">Jaipur, Rajasthan, India</p>
          </div>

          {/* Fifth Column: Newsletter Signup */}
          <div>
            <h3 className="font-playfair text-xl mb-6">Subscribe</h3>
            <p className="font-poppins text-sm mb-4">
              Unlock exclusive offers and be the first to know about our new
              collections.
            </p>
            <div className="mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-neutral/10 border border-neutral/30 text-neutral font-poppins text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-accent text-neutral font-poppins text-sm rounded-md py-3 px-6 mt-3 hover:bg-primary transition duration-300 w-full">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright and Payment Icons */}
        <div className="mt-12 py-6 border-t border-neutral/20 flex flex-col md:flex-row items-center justify-between text-center md:text-left font-poppins text-xs">
          <p>
            &copy; {new Date().getFullYear()} Your Brand Name. All rights
            reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            {/* Payment Method Icons (Replace with your actual icons) */}
            <img src="/path/to/visa.png" alt="Visa" className="h-6" />
            <img
              src="/path/to/mastercard.png"
              alt="Mastercard"
              className="h-6"
            />
            <img src="/path/to/paypal.png" alt="PayPal" className="h-6" />
            {/* Add more payment icons */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
