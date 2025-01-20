import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/[0.98] border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:py-8">
          <div className="text-center mb-3">
            <p className="text-sm text-zinc-500 flex items-center justify-center">
              For the <Heart className="mx-1 inline-block animate-pulse-ring" size={16} color="black" fill="black" /> of swing thoughts
            </p>
          </div>
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm text-zinc-500">
                &copy; {new Date().getFullYear()} GolfLog. All rights reserved.
              </p>
            </div>
            <div className="mt-3 flex justify-center space-x-6 md:mt-0">
              <Link to="/faq" className="text-sm text-zinc-500 hover:text-zinc-900">
                FAQs
              </Link>
              <Link to="/contact" className="text-sm text-zinc-500 hover:text-zinc-900">
                Contact
              </Link>
              <Link to="/privacy" className="text-sm text-zinc-500 hover:text-zinc-900">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm text-zinc-500 hover:text-zinc-900">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
