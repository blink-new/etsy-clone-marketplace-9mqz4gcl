import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/shop" className="hover:text-white transition-colors">Gift cards</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Etsy Registry</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Sitemap</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Etsy blog</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Etsy United Kingdom</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Etsy Germany</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Etsy Canada</Link></li>
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sell</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/sell" className="hover:text-white transition-colors">Sell on Etsy</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Teams</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Forums</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Affiliates & Creators</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">Etsy, Inc.</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Policies</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Investors</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Impact</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Legal imprint</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/help" className="hover:text-white transition-colors">Help Centre</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Privacy settings</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Download the Etsy App</Link></li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Follow us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-[#F16521] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold text-[#F16521]">Etsy</span>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-300">
            <span>© 2024 Etsy, Inc.</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Interest-based ads</Link>
            <div className="flex items-center space-x-2">
              <span>🇺🇸</span>
              <span>United States</span>
              <span>|</span>
              <span>English (US)</span>
              <span>|</span>
              <span>$ (USD)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}