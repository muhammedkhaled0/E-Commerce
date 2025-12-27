import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t mt-10">
      <div className="container mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-accent-foreground text-accent w-10 h-10 flex items-center justify-center text-xl font-bold rounded">
              S
            </div>
            <h2 className="text-xl font-semibold">ShopMart</h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your one-stop destination for the latest technology, fashion, and lifestyle products.
            Quality guaranteed with fast shipping and excellent customer service.
          </p>

          <div className="mt-4 space-y-2 text-gray-700 text-sm">
            <p className="flex items-start gap-2">
              <MapPin size={18}/> 123 Shop Street, Ocopter City, DC 12345
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18}/> (+20) 01093333333
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18}/> support@shopmart.com
            </p>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">SHOP</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home & Garden</li>
            <li>Sports</li>
            <li>Deals</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">CUSTOMER SERVICE</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Track Your Order</li>
            <li>Returns & Exchanges</li>
            <li>Size Guide</li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">ABOUT</h3>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li>About shopmart</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Investor Relations</li>
            <li>Sustainability</li>
          </ul>

        </div>
        {/* Policies */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">POLICIES</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
            <li>Shipping Policy</li>
            <li>Refund Policy</li>
          </ul>
           </div>
      </div>
    </footer>
  );
}
