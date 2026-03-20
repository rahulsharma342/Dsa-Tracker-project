import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] py-12 px-6 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-indigo-500 mb-3">DSATrack</h2>
            <p className="text-gray-400 text-sm">
              Track problems. Build streaks. Land your dream job.
            </p>
          </div>

          {/* APP Section */}
          <div>
            <h3 className="text-indigo-500 font-semibold mb-4 text-sm uppercase tracking-wide">APP</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors text-sm">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors text-sm">
                  Problems
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors text-sm">
                  Topics
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors text-sm">
                  Progress
                </a>
              </li>
            </ul>
          </div>

          {/* HELP Section */}
          <div>
            <h3 className="text-indigo-500 font-semibold mb-4 text-sm uppercase tracking-wide">HELP</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors text-sm">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors text-sm">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors text-sm">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* LEGAL Section */}
          <div>
            <h3 className="text-indigo-500 font-semibold mb-4 text-sm uppercase tracking-wide">LEGAL</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors text-sm">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors text-sm">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors text-sm">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 DSATrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;