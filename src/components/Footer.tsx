import { CircleDot, Mail, Phone, MapPin } from "lucide-react";
import cirqleLogo from "figma:asset/a79873ff7b54a9a37128bda14561149e5eeb12b3.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-14 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-5">
              <img 
                src={cirqleLogo} 
                alt="Cirqle Design" 
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium design ecosystem delivering excellence across all creative services.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg mb-6">Services</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Supermarket Campaigns
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Brand Design
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Digital Solutions
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  UI/UX Design
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg mb-6">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  About Cirqle
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#ecosystem" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Ecosystem
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors hover:translate-x-1 inline-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg mb-6">Connect</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#A259FF]" />
                <a href="mailto:team@cirqle.work" className="hover:text-white transition-colors">
                  team@cirqle.work
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#4CC3FF]" />
                <a href="tel:+918129534377" className="hover:text-white transition-colors">
                  +91 8129 5343 77
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#A259FF]" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
            <p>
              © {currentYear} Cirqle Design. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>

        {/* SEO Keywords */}
        <div className="mt-10 pt-10 border-t border-gray-800 text-xs text-gray-700 leading-relaxed">
          <p>
            Professional supermarket flyer design | Premium promotional campaign design | 
            Brand identity design services | Digital creative design agency | 
            Cirqle design ecosystem | Modern UI/UX design | 
            Creative graphic design studio | Fast turnaround design services | 
            Quality brand design solutions
          </p>
        </div>
      </div>
    </footer>
  );
}