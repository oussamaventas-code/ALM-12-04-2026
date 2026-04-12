import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Zap, Phone, ChevronDown, MapPin } from 'lucide-react';
import gsap from 'gsap';

const navLinks = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Servicios', href: '#servicios' },
  {
    label: 'Zonas',
    href: '#',
    dropdown: [
      { label: 'Madrid Centro', to: '/zonas/madrid-centro' },
      { label: 'Chamberí', to: '/zonas/chamberi' },
      { label: 'Salamanca', to: '/zonas/salamanca' },
      { label: 'Retiro', to: '/zonas/retiro' },
      { label: 'Arganzuela', to: '/zonas/arganzuela' },
      { label: 'Tetuán', to: '/zonas/tetuan' },
      { label: 'Chamartín', to: '/zonas/chamartin' },
      { label: 'Moncloa', to: '/zonas/moncloa' },
    ],
  },
  { label: 'Reseñas', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // GSAP mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.mobile-nav-link',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out', delay: 0.15 }
      );
    }
  }, [mobileOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileDropdownOpen(false);
  };

  return (
    <>
      {/* Thin amber brand stripe — mobile only */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-brand z-[60] lg:hidden" />

      <nav
        ref={navRef}
        className={`fixed top-[3px] left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark/90 backdrop-blur-xl shadow-lg shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between px-6 h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <img
              src="/LOGO Y JORGE/LOGO.JPG"
              alt="ALMelectricidad"
              className="h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    className="font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-white/70 hover:text-brand-glow px-4 py-2 transition-colors duration-300 flex items-center gap-1.5"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-0 mt-1 min-w-[220px] bg-dark-800 border border-white/10 shadow-2xl shadow-black/40 transition-all duration-300 ${
                      dropdownOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="py-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-white/60 hover:text-brand-glow hover:bg-white/5 transition-all duration-200 font-body"
                        >
                          <MapPin size={13} className="text-brand/50" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    {/* Amber accent line at bottom of dropdown */}
                    <div className="h-[2px] bg-gradient-to-r from-brand via-brand-glow to-transparent" />
                  </div>
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-white/70 hover:text-brand-glow px-4 py-2 transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              )
            )}
          </div>

          {/* Right side — Phone, Emergency, CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+34605333108"
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-body transition-colors duration-300"
            >
              <Phone size={15} className="text-brand" />
              <span className="font-medium">605 33 31 08</span>
            </a>

            {/* Emergency badge */}
            <a
              href="tel:+34605333108"
              className="relative flex items-center gap-1.5 bg-danger/90 hover:bg-danger text-white text-[0.6875rem] font-bold uppercase tracking-widest px-3 py-1.5 transition-all duration-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <Zap size={11} />
              Urgencias 24h
            </a>

            {/* CTA */}
            <a href="#contacto" className="btn-brand !py-2.5 !px-6 !text-sm">
              Pide presupuesto
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 relative z-[60]"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[55] bg-dark/98 backdrop-blur-xl flex flex-col"
          style={{ paddingTop: 'calc(3px + 72px)' }}
        >
          <div className="flex-1 flex flex-col justify-center px-8 -mt-12">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="mobile-nav-link">
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className="flex items-center justify-between w-full font-heading text-3xl md:text-4xl font-bold text-white/90 hover:text-brand-glow transition-colors duration-300 py-4 border-b border-white/5"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={24}
                      className={`text-brand transition-transform duration-300 ${mobileDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      mobileDropdownOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-4 py-2 space-y-1 border-l-2 border-brand/30 ml-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={closeMobile}
                          className="flex items-center gap-2 text-white/50 hover:text-brand-glow text-lg py-2 transition-colors font-body"
                        >
                          <MapPin size={14} className="text-brand/40" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="mobile-nav-link font-heading text-3xl md:text-4xl font-bold text-white/90 hover:text-brand-glow transition-colors duration-300 py-4 border-b border-white/5 block"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Mobile bottom actions */}
          <div className="px-8 pb-10 space-y-3">
            <a
              href="tel:+34605333108"
              onClick={closeMobile}
              className="flex items-center justify-center gap-2 bg-danger text-white font-bold py-4 text-sm uppercase tracking-wider transition-all"
            >
              <Zap size={16} />
              Urgencias 24h — Llamar ahora
            </a>
            <a
              href="#contacto"
              onClick={closeMobile}
              className="btn-brand w-full justify-center !py-4"
            >
              Pide presupuesto
            </a>
          </div>
        </div>
      )}
    </>
  );
}
