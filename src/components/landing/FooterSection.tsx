const FooterSection = () => {
  return (
    <footer className="py-16 bg-white">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo */}
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg"></div>
              <span className="text-lg font-semibold text-zinc-900">GolfLog</span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-zinc-600 hover:text-zinc-900">Support Us</a>
              </li>
              <li>
                <a href="#" className="text-zinc-600 hover:text-zinc-900">Affiliates</a>
              </li>
            </ul>
          </div>

          {/* Downloads Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 uppercase">Downloads</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-zinc-600 hover:text-zinc-900">For iPhone</a>
              </li>
              <li>
                <a href="#" className="text-zinc-600 hover:text-zinc-900">For Android</a>
              </li>
              <li>
                <a href="#" className="text-zinc-600 hover:text-zinc-900">For Mac (Soon)</a>
              </li>
              <li>
                <a href="#" className="text-zinc-600 hover:text-zinc-900">For Windows (Soon)</a>
              </li>
            </ul>
          </div>

          {/* Socials Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 uppercase">Socials</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="text-zinc-600 hover:text-zinc-900">Facebook</a>
              </li>
              <li>
                <a href="#" className="text-zinc-600 hover:text-zinc-900">Instagram</a>
              </li>
              <li>
                <a href="#" className="text-zinc-600 hover:text-zinc-900">LinkedIn</a>
              </li>
              <li>
                <a href="#" className="text-zinc-600 hover:text-zinc-900">Twitter/X</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t border-zinc-200 sm:flex-row">
          <p className="text-sm text-zinc-600">© 2024 GolfLog. All rights reserved.</p>
          <p className="mt-4 text-sm text-zinc-600 sm:mt-0">Made with ❤️ for golfers.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;