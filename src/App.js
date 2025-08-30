import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useAnimation } from "framer-motion";
import { Menu, X, Palette, PenTool, Monitor, Sparkles, Mail, Phone, ArrowRight, ChevronDown, ExternalLink, Github, Twitter, Linkedin, Instagram } from "lucide-react";

// Particle background component
const ParticlesBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10"
          initial={{
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh',
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [null, Math.random() * 100 + 'vw'],
            y: [null, Math.random() * 100 + 'vh'],
          }}
          transition={{
            duration: Math.random() * 30 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: Math.random() * 20 + 5 + 'px',
            height: Math.random() * 20 + 5 + 'px',
          }}
        />
      ))}
    </div>
  );
};

// Custom cursor component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const mouseEnter = () => setIsHovering(true);
    const mouseLeave = () => setIsHovering(false);
    
    document.addEventListener('mousemove', mouseMove);
    document.querySelectorAll('a, button, .interactive').forEach(el => {
      el.addEventListener('mouseenter', mouseEnter);
      el.addEventListener('mouseleave', mouseLeave);
    });
    
    return () => {
      document.removeEventListener('mousemove', mouseMove);
      document.querySelectorAll('a, button, .interactive').forEach(el => {
        el.removeEventListener('mouseenter', mouseEnter);
        el.removeEventListener('mouseleave', mouseLeave);
      });
    };
  }, []);
  
  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: "spring", damping: 10, mass: 0.5 }}
    >
      <motion.div 
        className="w-1 h-1 rounded-full bg-white"
        animate={{ scale: isHovering ? 0.5 : 1 }}
      />
    </motion.div>
  );
};

// Scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    icon: Palette,
    title: "Branding",
    points: [
      "Identity systems & styleguides",
      "Messaging & brand voice",
      "Logo suites & usage rules",
      "Art direction",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    points: [
      "Wireframes & prototypes",
      "Design systems",
      "User flows & testing",
      "Micro‑interactions",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Monitor,
    title: "Web Design",
    points: [
      "Responsive websites",
      "Landing pages",
      "CMS setup",
      "Performance pass",
    ],
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Sparkles,
    title: "Graphics",
    points: [
      "Campaign creatives",
      "Social content",
      "Illustrations",
      "Iconography",
    ],
    color: "from-orange-500 to-red-500",
  },
];

const projects = [
  {
    title: "Summer Vibes Campaign",
    tag: "Graphic Design",
    blurb: "Posters, flyers & social launch for a city music festival.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "ShopEase UX Sprint",
    tag: "UI/UX",
    blurb: "Checkout simplification, nav cleanup & design tokens.",
    image: "https://images.unsplash.com/photo-1527416876370-f89d2f3b4d34?q=80&w=1600&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "Coral Spiral Study",
    tag: "Branding",
    blurb: "Organic 3D motif for a modern product brand.",
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop",
    link: "#",
  },
  {
    title: "Prism Noir Set",
    tag: "3D/Visual",
    blurb: "Geometric composition series for hero art.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1600&auto=format&fit=crop",
    link: "#",
  },
];

const testimonials = [
  {
    name: "John Harris",
    role: "Marketing Director",
    quote: "Truly understood our goals and turned them into a high‑impact visual system.",
    avatar: "https://i.pravatar.cc/100?img=13",
  },
  {
    name: "Sarah Johnson",
    role: "CEO",
    quote: "Design craft is elite. The site converts and looks stunning.",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Michael Lee",
    role: "Product Manager",
    quote: "Our flow is cleaner, faster, and easier to ship. Big win.",
    avatar: "https://i.pravatar.cc/100?img=26",
  },
  {
    name: "Laura Bennett",
    role: "Founder",
    quote: "Stress‑free process and a sharp, consistent brand kit.",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
];

const faqs = [
  {
    q: "What services do you offer?",
    a: "Branding, UI/UX, and web design from strategy to shipping. Flexible per project or retainer.",
  },
  {
    q: "How long does a project take?",
    a: "Simple pages: 1–2 weeks. Full brands or apps: 3–8 weeks depending on scope and feedback cadence.",
  },
  {
    q: "Do you provide revisions?",
    a: "Yes—clear revision rounds are scoped up front so we can iterate efficiently without surprises.",
  },
  {
    q: "Can you build in Webflow/Framer?",
    a: "Yep. I design in Figma and implement in Webflow, Framer, or React—whatever fits your stack.",
  },
];

const posts = [
  {
    title: "5 Design Trends to Watch",
    date: "Apr 30, 2025",
    summary: "Signals shaping modern UI, type, motion, and brand systems.",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Streamline Your Design Workflow",
    date: "Apr 27, 2025",
    summary: "Practical tactics for faster feedback and better shipping.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  },
];

function useParallax(ref) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95]);
  return { y, scale };
}

function Stat({ value, label }) {
  return (
    <motion.div 
      className="text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
        {value}
      </div>
      <div className="mt-1 text-sm opacity-80">{label}</div>
    </motion.div>
  );
}

function Section({ id, className = "", children }) {
  return (
    <motion.section 
      id={id} 
      className={`relative py-20 md:py-28 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    > 
      <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
    </motion.section>
  );
}

function Card({ children, className = "" }) {
  return (
    <motion.div 
      className={`group rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-all duration-300 ${className}`}
      whileHover={{ y: -5 }}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({ item, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div 
      className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
      whileHover={{ y: -2 }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left interactive"
      >
        <span className="font-medium">{i + 1}. {item.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown className="size-5 transition-transform" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 pb-5 text-sm opacity-90"
          >
            {item.a}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0,0,0,0)", "rgba(15,15,25,0.9)"]
  );
  
  return (
    <motion.header 
      className="fixed inset-x-0 top-0 z-40"
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md">
          <motion.a 
            href="#home" 
            className="flex items-center gap-2 font-semibold tracking-tight interactive"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="inline-block h-7 w-7 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <span>Nova<span className="text-pink-400">Studio</span></span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {nav.map((n) => (
              <motion.a 
                key={n.href} 
                href={n.href} 
                className="hover:text-white/90 text-white/70 interactive"
                whileHover={{ y: -2 }}
              >
                {n.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm hover:bg-white/[0.12] interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Available for work</span>
              <ArrowRight className="size-4" />
            </motion.a>
          </nav>
          <motion.button 
            className="md:hidden interactive" 
            onClick={() => setOpen((o) => !o)}
            whileTap={{ scale: 0.9 }}
          >
            {open ? <X /> : <Menu />}
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md"
          >
            <div className="flex flex-col px-4 py-3 text-sm">
              {nav.map((n) => (
                <motion.a 
                  key={n.href} 
                  href={n.href} 
                  className="py-2 text-white/80 interactive" 
                  onClick={() => setOpen(false)}
                  whileHover={{ x: 5 }}
                >
                  {n.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef(null);
  const { y, scale } = useParallax(ref);
  const controls = useAnimation();
  const [currentText, setCurrentText] = useState(0);
  
  const texts = [
    "Digital Designer",
    "UI/UX Specialist",
    "Creative Developer",
    "Brand Strategist"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Section id="home" className="pt-36 md:pt-40">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentText}
                className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {texts[currentText]}
              </motion.span>
            </AnimatePresence>
            <span className="block text-white/80 text-2xl md:text-3xl mt-3">US‑based designer & React/Framer developer</span>
          </motion.h1>
          <motion.p 
            className="mt-6 text-white/70 max-w-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            I craft clean, performant brand and product experiences. From strategy and UI/UX to polished web builds.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <motion.a 
              href="#projects" 
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 text-sm font-semibold hover:from-purple-600 hover:to-pink-600 interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Projects
            </motion.a>
            <motion.a 
              href="#contact" 
              className="rounded-full border border-white/10 px-5 py-3 text-sm hover:bg-white/[0.08] interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's work together
            </motion.a>
          </div>
        </div>

        {/* Parallax image stack */}
        <div ref={ref} className="relative h-[480px] md:h-[560px]">
          <motion.div 
            style={{ y, scale }} 
            className="absolute -right-4 top-10 h-72 w-56 overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            whileHover={{ rotate: 2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1558222217-0ad5a8a2f62d?q=80&w=1400&auto=format&fit=crop"
              alt="portrait"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div 
            style={{ y }} 
            className="absolute left-0 bottom-0 h-80 w-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            whileHover={{ rotate: -2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1400&auto=format&fit=crop"
              alt="portrait"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div 
            className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-tr from-pink-500/40 to-purple-500/40 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          <motion.div 
            className="absolute right-8 -bottom-6 h-24 w-24 rounded-full bg-gradient-to-tr from-blue-500/40 to-cyan-500/40 blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
          />
        </div>
      </div>
    </Section>
  );
}

function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <Section id="services">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What I can do for you
        </motion.h2>
        <motion.p 
          className="mt-3 text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Strategy → Design → Build. End‑to‑end or plug‑in at any stage.
        </motion.p>
      </div>
      <motion.div 
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {services.map((s) => (
          <motion.div key={s.title} variants={item}>
            <Card className="h-full">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${s.color}`}>
                  <s.icon className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <ul className="mt-3 space-y-1 text-sm text-white/70">
                    {s.points.map((p) => (
                      <motion.li 
                        key={p}
                        whileHover={{ x: 5 }}
                      >
                        • {p}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" className="">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About me
          </motion.h2>
          <motion.p 
            className="mt-4 text-white/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Hi, I'm <span className="text-white">Duncan</span> — a digital designer passionate about meaningful products. I blend
            brand systems, crisp UI, and thoughtful motion to ship delightful experiences.
          </motion.p>
          <motion.div 
            className="mt-6 grid grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Stat value="8+" label="Years Experience" />
            <Stat value="120+" label="Projects" />
            <Stat value="48+" label="Happy Clients" />
            <Stat value="200%" label="Avg. Growth Impact" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <h3 className="text-xl font-semibold">My Story</h3>
            <p className="mt-3 text-white/70">
              From scrappy startups to funded scaleups, I've worked across product lifecycles—audits, redesigns, and fresh builds.
              I value tight feedback loops, accessible design, and maintainable code.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <motion.a 
                href="mailto:designer@example.com" 
                className="inline-flex items-center gap-2 interactive"
                whileHover={{ x: 5 }}
              >
                <Mail className="size-4" /> designer@example.com
              </motion.a>
              <motion.a 
                href="tel:+15551234567" 
                className="inline-flex items-center gap-2 interactive"
                whileHover={{ x: 5 }}
              >
                <Phone className="size-4" /> +1 (555) 123‑4567
              </motion.a>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

function Projects() {
  const [hovered, setHovered] = useState(null);
  
  return (
    <Section id="projects" className="">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>
        <motion.p 
          className="mt-3 text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          A few selected pieces that blend strategy, craft, and performance.
        </motion.p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="relative"
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
          >
            <motion.a
              href={p.link}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] block"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <motion.img 
                  src={p.image} 
                  alt={p.title} 
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs tracking-wide">{p.tag}</span>
                  <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-white/80">{p.blurb}</p>
                </div>
              </div>
            </motion.a>
            <AnimatePresence>
              {hovered === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-4 right-4"
                >
                  <motion.div 
                    className="p-2 rounded-full bg-black/50 backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="size-4" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.a 
          href="#" 
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/[0.08] interactive"
          whileHover={{ scale: 1.05 }}
        >
          Browse All Projects <ArrowRight className="size-4" />
        </motion.a>
      </motion.div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section id="testimonials">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What clients say
        </motion.h2>
        <motion.p 
          className="mt-3 text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Feedback from partners and teams I've worked with.
        </motion.p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <div className="flex items-start gap-4">
                <motion.img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="h-12 w-12 rounded-full object-cover"
                  whileHover={{ rotate: 5 }}
                />
                <div>
                  <p className="text-white/80">"{t.quote}"</p>
                  <div className="mt-3 text-sm opacity-80">{t.name} • {t.role}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Stat value="50+" label="Happy Clients" />
        <Stat value="200%" label="Avg Revenue Lift" />
        <Stat value="98%" label="Satisfaction" />
        <Stat value="120+" label="Projects Shipped" />
      </motion.div>
    </Section>
  );
}

function FAQ() {
  return (
    <Section id="faq">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>
      </div>
      <motion.div 
        className="mt-10 grid gap-4 md:grid-cols-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {faqs.map((item, i) => (
          <FAQItem key={i} item={item} i={i} />
        ))}
      </motion.div>
    </Section>
  );
}

function Insights() {
  return (
    <Section id="insights">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Design Insights & Ideas
        </motion.h2>
        <motion.p 
          className="mt-3 text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Notes on process, trends, and shipping better work.
        </motion.p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full">
              <div className="h-40 overflow-hidden rounded-xl mb-4">
                <motion.img 
                  src={p.image} 
                  alt={p.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-xs uppercase tracking-wider text-white/60">{p.date}</div>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-white/70 text-sm">{p.summary}</p>
                <motion.a 
                  href="#" 
                  className="mt-2 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white interactive"
                  whileHover={{ x: 5 }}
                >
                  Read more <ArrowRight className="size-4" />
                </motion.a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Branding",
    budget: "",
    message: ""
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <Section id="contact">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let's work together
        </motion.h2>
        <motion.p 
          className="mt-3 text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Tell me about your project and I'll get back within 1–2 business days.
        </motion.p>
      </div>
      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thanks! This is a demo form.");
        }}
        className="mx-auto mt-10 max-w-2xl grid gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 interactive" 
            placeholder="Name" 
            required 
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 interactive" 
            placeholder="Email" 
            required 
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <select 
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 interactive"
          >
            <option>Branding</option>
            <option>Web Design</option>
            <option>UI/UX</option>
          </select>
          <input 
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 interactive" 
            placeholder="Budget (optional)" 
          />
        </div>
        <textarea 
          rows={5} 
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 interactive" 
          placeholder="What can I help you with?" 
        />
        <motion.button 
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 text-white font-semibold interactive"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit <ArrowRight className="size-4" />
        </motion.button>
      </motion.form>
      <motion.div 
        className="mt-8 text-center text-white/70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-4">
          <motion.a 
            className="inline-flex items-center gap-2 interactive" 
            href="mailto:designer@example.com"
            whileHover={{ y: -2 }}
          >
            <Mail className="size-4"/> designer@example.com
          </motion.a>
          <span className="opacity-40">•</span>
          <motion.a 
            className="inline-flex items-center gap-2 interactive" 
            href="tel:+15551234567"
            whileHover={{ y: -2 }}
          >
            <Phone className="size-4"/> +1 (555) 123‑4567
          </motion.a>
        </div>
      </motion.div>
    </Section>
  );
}

function Footer() {
  return (
    <motion.footer 
      className="relative mt-20 border-t border-white/10 py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto w-full max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white/70">© {new Date().getFullYear()} NovaStudio. All rights reserved.</div>
        <div className="flex items-center gap-5 text-sm">
          <motion.a 
            href="#" 
            className="text-white/70 hover:text-white interactive"
            whileHover={{ y: -2 }}
          >
            <Twitter className="size-5" />
          </motion.a>
          <motion.a 
            href="#" 
            className="text-white/70 hover:text-white interactive"
            whileHover={{ y: -2 }}
          >
            <Instagram className="size-5" />
          </motion.a>
          <motion.a 
            href="#" 
            className="text-white/70 hover:text-white interactive"
            whileHover={{ y: -2 }}
          >
            <Linkedin className="size-5" />
          </motion.a>
          <motion.a 
            href="#" 
            className="text-white/70 hover:text-white interactive"
            whileHover={{ y: -2 }}
          >
            <Github className="size-5" />
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-br from-[#0A0A14] to-[#1A1A2E] text-white" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" }}>
      <ParticlesBackground />
      <CustomCursor />
      <ScrollProgress />
      
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute left-1/2 top-[-10%] h-[40vh] w-[40vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.15),transparent_60%)]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute right-[10%] top-[30%] h-[30vh] w-[30vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,119,198,0.12),transparent_60%)]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.7, 0.4, 0.7],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute left-[5%] bottom-[10%] h-[35vh] w-[35vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(100,255,200,0.08),transparent_60%)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
        />
      </div>

      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Projects />
        <Testimonials />
        <FAQ />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}