

import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Shield, Users, ArrowRight, Star, CheckCircle } from 'lucide-react';
import backgroundImage from "../../assets/Image-2026-10-06-23.04.13.jpeg"
import SearchBar from './SearchBar';




const HomePage = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative overflow-x-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-purple-900/50 mix-blend-multiply pointer-events-none"></div>
      <div className="fixed inset-0 from-transparent via-purple-950/30 to-purple-950/80 pointer-events-none"></div>

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="flex flex-col items-center text-center">

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-6 drop-shadow-lg">
            <SearchBar onSearch={(q) => console.log('Search:', q)} />
            <br />
            <span className="from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
              extraordinary.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            A beautiful, modern platform designed for creators, developers, and dreamers.
            Everything you need to launch your next big idea — beautifully.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/signup"
              className="group flex items-center gap-2 bg-white text-purple-900 font-bold px-8 py-4 rounded-full shadow-xl shadow-purple-900/40 hover:bg-purple-50 hover:-translate-y-1 transition-all"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="text-white font-semibold px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
            >
              Learn More
            </a>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-col items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-purple-900/50  from-purple-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
              <span>Loved by 10,000+ users worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Everything you need
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Powerful features wrapped in a beautiful, intuitive interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: 'Lightning Fast',
              desc: 'Built on modern architecture for instant load times and buttery smooth interactions.',
              gradient: 'from-purple-400 to-pink-500',
            },
            {
              icon: Shield,
              title: 'Secure by Default',
              desc: 'Enterprise-grade security with end-to-end encryption to keep your data safe.',
              gradient: 'from-blue-400 to-purple-500',
            },
            {
              icon: Users,
              title: 'Built for Teams',
              desc: 'Collaborate in real-time with your team from anywhere in the world.',
              gradient: 'from-pink-400 to-purple-500',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 shadow-xl"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="w-full p-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
            Ready to get started?
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Join thousands of users already building the future with Nebula.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {['Free forever', 'No credit card', 'Cancel anytime'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-purple-300" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-purple-900 font-bold px-8 py-4 rounded-full shadow-xl shadow-purple-900/40 hover:bg-purple-50 hover:-translate-y-1 transition-all"
          >
            Create Your Account
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;