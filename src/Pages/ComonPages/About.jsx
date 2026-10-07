
import { Link } from 'react-router-dom';
import { Sparkles, Target, Heart, Rocket, ArrowRight } from 'lucide-react';
import backgroundImage from "../../assets/Image-2026-10-06-23.04.13.jpeg"


const About = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative overflow-x-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-purple-900/50 mix-blend-multiply pointer-events-none"></div>
      <div className="fixed inset from-transparent via-purple-950/30 to-purple-950/80 pointer-events-none"></div>

      {/* ===== HERO ===== */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-16 md:pt-24 md:pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm mb-6">
          <Sparkles className="w-4 h-4 text-purple-300" />
          <span>About Nebula</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6 drop-shadow-lg">
          We build tools for
          <br />
          <span className="from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
            dreamers & doers.
          </span>
        </h1>

        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Nebula started with a simple idea: that beautiful software should be
          accessible to everyone. We're a small team obsessed with craft,
          performance, and the little details that make a big difference.
        </p>
      </section>

      {/* ===== VALUES ===== */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              desc: 'To make world-class tools that feel effortless, so you can focus on what matters most — creating.',
              gradient: 'from-purple-400 to-pink-500',
            },
            {
              icon: Heart,
              title: 'Our Values',
              desc: 'Craft over shortcuts. Users over metrics. Transparency over hype. We build things we\'re proud of.',
              gradient: 'from-pink-400 to-purple-500',
            },
            {
              icon: Rocket,
              title: 'Our Vision',
              desc: 'A web that feels alive — fast, beautiful, and human. We\'re just getting started.',
              gradient: 'from-blue-400 to-purple-500',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 shadow-xl"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-white/70 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-24 text-center">
        <div className="w-full p-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
            Want to be part of the journey?
          </h2>
          <p className="text-white/75 max-w-lg mx-auto mb-8">
            We're always looking for people who care about building beautiful things.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-purple-900 font-bold px-8 py-3.5 rounded-full shadow-xl shadow-purple-900/40 hover:bg-purple-50 hover:-translate-y-1 transition-all"
          >
            Join Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;