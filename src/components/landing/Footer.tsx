import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white/80 backdrop-blur-sm mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Logo and Copyright */}
          <div className="md:col-span-1">
            <div className="flex items-center">
              <span className="text-2xl font-logo tracking-[-0.03em] text-zinc-900"
                style={{
                  WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.08)',
                }}>
                golflog
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-600">
              © 2024 Golflog. All rights reserved.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-zinc-900">Company</h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: 'About', href: '#' },
                { name: 'Support', href: '#' },
                { name: 'Privacy', href: '#' },
                { name: 'Terms', href: '#' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm leading-6 text-zinc-600 hover:text-zinc-900 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download Links */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-zinc-900">Download</h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: 'iOS App', href: '#', soon: false },
                { name: 'Android App', href: '#', soon: false },
                { name: 'Mac App', href: '#', soon: true },
                { name: 'Windows App', href: '#', soon: true },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="inline-flex items-center text-sm leading-6 text-zinc-600 hover:text-zinc-900 transition-colors"
                  >
                    {item.name}
                    {item.soon && (
                      <span className="ml-2 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                        Soon
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-zinc-900">Social</h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: 'Twitter', href: '#' },
                { name: 'Instagram', href: '#' },
                { name: 'Facebook', href: '#' },
                { name: 'LinkedIn', href: '#' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm leading-6 text-zinc-600 hover:text-zinc-900 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;