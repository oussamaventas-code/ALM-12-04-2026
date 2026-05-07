import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Zap, Phone, ChevronDown, MapPin, Wrench, Sun, Lightbulb, FileText, Wifi, PlugZap, Factory, BookOpen, Users, Truck, AlertCircle, Award, Globe } from 'lucide-react';
import gsap from 'gsap';
import MagneticElement from './MagneticElement';

const navLinks = [
  {
    label: 'Servicios',
    id: 'servicios',
    dropdown: [
      { label: 'Ver todos los servicios',    to: '/servicios', icon: Globe },
      { label: 'Instalaciones Eléctricas',   to: '/servicios/instalaciones-electricas', icon: Zap },
      { label: 'Reparación de Averías 24h',  to: '/servicios/reparacion-averias', icon: Wrench },
      { label: 'Urgencias 24h',               to: '/urgencias', icon: AlertCircle },
      { label: 'Paneles Solares',             to: '/servicios/paneles-solares', icon: Sun },
      { label: 'Iluminación LED',             to: '/servicios/iluminacion-led', icon: Lightbulb },
      { label: 'Boletines y Certificados',    to: '/servicios/boletines-certificados', icon: FileText },
      { label: 'Telecomunicaciones',          to: '/servicios/telecomunicaciones', icon: Wifi },
      { label: 'Recarga Vehículo Eléctrico', to: '/servicios/recarga-vehiculo-electrico', icon: PlugZap },
      { label: 'Fotovoltaica Industrial',     to: '/fotovoltaica', icon: Factory },
    ],
  },
  {
    label: 'Zonas',
    id: 'zonas',
    dropdown: [
      { label: 'Ver todas las zonas', to: '/zonas', icon: Globe },
      { label: 'Madrid Centro', to: '/zonas/madrid-centro', icon: MapPin },
      { label: 'Madrid Norte',  to: '/zonas/madrid-norte', icon: MapPin },
      { label: 'Madrid Sur',    to: '/zonas/madrid-sur', icon: MapPin },
      { label: 'Madrid Este',   to: '/zonas/madrid-este', icon: MapPin },
      { label: 'Madrid Oeste',  to: '/zonas/madrid-oeste', icon: MapPin },
      { label: 'Getafe',        to: '/zonas/getafe', icon: MapPin },
      { label: 'Alcorcon',      to: '/zonas/alcorcon', icon: MapPin },
      { label: 'Toledo',        to: '/zonas/toledo-capital', icon: MapPin },
    ],
  },
  {
    label: 'Nosotros',
    id: 'nosotros',
    dropdown: [
      { label: 'Nuestra Historia', to: '/sobre-nosotros', icon: BookOpen },
      { label: 'Nuestro Equipo',   to: '/equipo', icon: Users },
      { label: 'Nuestra Flota',    to: '/flota', icon: Truck },
      { label: 'Patrocinios',      to: '/patrocinios', icon: Award },
    ],
  },
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Contacto',  to: '/contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const dropdownRefs = useRef({});
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('nav-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('nav-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('nav-open');
    };
  }, [mobileOpen]);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeDropdown && dropdownRefs.current[activeDropdown] && !dropdownRefs.current[activeDropdown].contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const handleDropdownEnter = (id) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(id);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  const toggleMobileDropdown = (id) => {
    setMobileDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileDropdowns({});
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[3px] bg-brand z-[60] lg:hidden" />

      <nav
        ref={navRef}
        aria-label="Navegación principal"
        className={`fixed top-[3px] lg:top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark/90 backdrop-blur-xl shadow-lg shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between px-6 h-[72px]">
          <MagneticElement>
            <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="ALMelectricidad — Inicio">
              <img
                src="/LOGO Y JORGE/LOGO.webp"
                alt="ALMelectricidad"
                width="220"
                height="44"
                className="h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </MagneticElement>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.id}
                  ref={(el) => (dropdownRefs.current[link.id] = el)}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(link.id)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <MagneticElement>
                    <button
                      className="font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-white/70 hover:text-brand-glow px-4 py-2 transition-colors duration-300 flex items-center gap-1.5"
                      onClick={() => setActiveDropdown(activeDropdown === link.id ? null : link.id)}
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === link.id}
                      aria-label={`${link.label} — ver submenú`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                        className={`transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </MagneticElement>

                  <div
                    role="menu"
                    aria-label={link.label}
                    className={`absolute top-full left-0 mt-1 min-w-[220px] bg-dark-800 border border-white/10 shadow-2xl shadow-black/40 transition-all duration-300 ${
                      activeDropdown === link.id
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="py-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          role="menuitem"
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-white/60 hover:text-brand-glow hover:bg-white/5 transition-all duration-200 font-body"
                        >
                          <item.icon size={13} className="text-brand/50" aria-hidden="true" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div className="h-[2px] bg-gradient-to-r from-brand via-brand-glow to-transparent" aria-hidden="true" />
                  </div>
                </div>
              ) : link.to ? (
                <MagneticElement key={link.to}>
                  <Link
                    to={link.to}
                    className="font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-white/70 hover:text-brand-glow px-4 py-2 transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </MagneticElement>
              ) : (
                <MagneticElement key={link.href}>
                  <a
                    href={link.href}
                    className="font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-white/70 hover:text-brand-glow px-4 py-2 transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                </MagneticElement>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <MagneticElement>
              <a
                href="tel:+34605333108"
                aria-label="Llamar al 605 33 31 08"
                className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-body transition-colors duration-300"
              >
                <Phone size={15} className="text-brand" aria-hidden="true" />
                <span className="font-medium" aria-hidden="true">605 33 31 08</span>
              </a>
            </MagneticElement>

            <MagneticElement>
              <Link
                to="/urgencias"
                aria-label="Urgencias eléctricas 24 horas — contactar ahora"
                className="relative flex items-center gap-1.5 bg-danger/90 hover:bg-danger text-white text-[0.6875rem] font-bold uppercase tracking-widest px-3 py-1.5 transition-all duration-300"
              >
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <Zap size={11} aria-hidden="true" />
                Urgencias 24h
              </Link>
            </MagneticElement>

            <MagneticElement>
              <a href="/#contacto" className="btn-brand !py-2.5 !px-6 !text-sm">
                Pide presupuesto
              </a>
            </MagneticElement>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 relative z-[60]"
            aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          ref={mobileMenuRef}
          className="fixed inset-0 z-[55] bg-dark/98 backdrop-blur-xl flex flex-col"
          style={{ paddingTop: 'calc(3px + 72px)' }}
          role="dialog"
          aria-label="Menú de navegación"
          aria-modal="true"
        >
          <div className="flex-1 flex flex-col justify-center px-8 -mt-12">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.id} className="mobile-nav-link">
                  <button
                    onClick={() => toggleMobileDropdown(link.id)}
                    className="flex items-center justify-between w-full font-heading text-3xl md:text-4xl font-bold text-white/90 hover:text-brand-glow transition-colors duration-300 py-4 border-b border-white/5"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={24}
                      className={`text-brand transition-transform duration-300 ${mobileDropdowns[link.id] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      mobileDropdowns[link.id] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
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
                          <item.icon size={14} className="text-brand/40" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : link.to ? (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMobile}
                  className="mobile-nav-link font-heading text-3xl md:text-4xl font-bold text-white/90 hover:text-brand-glow transition-colors duration-300 py-4 border-b border-white/5 block"
                >
                  {link.label}
                </Link>
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

          <div className="px-8 pb-10 space-y-3">
            <Link
              to="/urgencias"
              onClick={closeMobile}
              className="flex items-center justify-center gap-2 bg-danger text-white font-bold py-4 text-sm uppercase tracking-wider transition-all"
            >
              <Zap size={16} />
              Urgencias 24h
            </Link>
            <a
              href="/#contacto"
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
