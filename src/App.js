import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useAnimation } from "framer-motion";
import { Menu, X, Palette, PenTool, Monitor, Sparkles, Mail, Phone, ArrowRight, ChevronDown, Twitter, Linkedin, Instagram } from "lucide-react";
import emailjs from 'emailjs-com';
import { SiFiverr } from "react-icons/si";

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

const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    icon: Palette,
    title: "Logo Design",
    points: [
      "Unique brand identities",
      "Custom typography & icons",
      "Style guides & usage rules",
      "Multiple concept options",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: PenTool,
    title: "Brand Identity",
    points: [
      "Complete brand systems",
      "Color palette selection",
      "Stationery design",
      "Brand guidelines",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Monitor,
    title: "Visual Design",
    points: [
      "Social media graphics",
      "Marketing materials",
      "Presentation design",
      "Icon systems",
    ],
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Sparkles,
    title: "Logo Animation",
    points: [
      "Animated logo reveals",
      "Motion branding",
      "Social media animations",
      "Video content",
    ],
    color: "from-orange-500 to-red-500",
  },
];

// Sample logo data - replace with your actual logos
const logos = [
  { id: 1, name: "Industry", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/mscoleedrakes_l01_4a.png`, description: "Sports" },
  { id: 2, name: "Product", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/bepoliteinc_l01_2.png`, description: "Real-Estate Blog" },
  { id: 3, name: "Service", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/cafeonwheels_l01_5.png`, description: "House Cleaning" },
  { id: 4, name: "Industry", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/cherylepriester_l01_3.png`, description: "Restaurant" },
  { id: 5, name: "Business", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/iblackish_l01a_4.png`, description: "Live Streaming" },
  { id: 6, name: "Product", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/robertkashkashi_l01_4.png`, description: "Vocal Blog" },
  { id: 7, name: "Illustration", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/sethjones229_l01a_13.png`, description: "Self Portrait" },
  { id: 8, name: "Harbor Coffee", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/steveelp_l01 _2a.png`, description: "Specialty coffee roasters" },
  { id: 9, name: "Pivot Consulting", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/tmiman_l01a_10.png`, description: "Business strategy consultants" },
  { id: 10, name: "Terra Firma", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/zoeskitchen22_l01_3.png`, description: "Outdoor adventure company" },

  { id: 11, name: "Nexus Labs", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/iblackish_l01a_4.png`, description: "Innovative tech research lab" },
  { id: 12, name: "Bliss Yoga", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/iblackish_l01a_4.png`, description: "Wellness and yoga studio" },
  { id: 13, name: "Crimson Publishing", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/iblackish_l01a_4.png`, description: "Independent book publisher" },
  { id: 14, name: "Momentum Motors", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/iblackish_l01a_4.png`, description: "Electric vehicle manufacturer" },
  { id: 15, name: "Aura Beauty", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/iblackish_l01a_4.png`, description: "Organic skincare brand" },
  { id: 16, name: "Verde Restaurant", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/iblackish_l01a_4.png`, description: "Plant-based fine dining" },
  { id: 17, name: "Summit Ventures", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/iblackish_l01a_4.png`, description: "Venture capital firm" },
  { id: 18, name: "Flow State", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/iblackish_l01a_4.png`, description: "Productivity app for creators" },
  { id: 19, name: "Nimbus Weather", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/iblackish_l01a_4.png`, description: "Weather forecasting service" },
  { id: 20, name: "Echo Records", image: `${process.env.PUBLIC_URL}/Logos/Character_Mascot/iblackish_l01a_4.png`, description: "Independent music label" },

  { id: 21, name: "Nexus Labs", image: `${process.env.PUBLIC_URL}/Logos/Modern_Minimalist/astronova.png`, description: "Innovative tech research lab" },
  { id: 22, name: "Bliss Yoga", image: `${process.env.PUBLIC_URL}/Logos/Modern_Minimalist/bdragoncontent_3 variations_26022025_JERRY_KZ00A_R04B(SH).png`, description: "Wellness and yoga studio" },
  { id: 23, name: "Crimson Publishing", image: `${process.env.PUBLIC_URL}/Logos/Modern_Minimalist/CreativeFlow-01.png`, description: "Independent book publisher" },
  { id: 24, name: "Momentum Motors", image: `${process.env.PUBLIC_URL}/Logos/Modern_Minimalist/Digital-leapfrog-final-logo.png`, description: "Electric vehicle manufacturer" },
  { id: 25, name: "Aura Beauty", image: `${process.env.PUBLIC_URL}/Logos/Modern_Minimalist/dinazu88_vm_14aA00a.png`, description: "Organic skincare brand" },
  { id: 26, name: "Verde Restaurant", image: `${process.env.PUBLIC_URL}/Logos/Modern_Minimalist/Nail Theory - logo 1-01 (1).png`, description: "Plant-based fine dining" },
  { id: 27, name: "Summit Ventures", image: `${process.env.PUBLIC_URL}/Logos/Modern_Minimalist/santhini026_13062025_Jerry_KZ00A_R02A(s) (1).png`, description: "Venture capital firm" },
  { id: 28, name: "Flow State", image: `${process.env.PUBLIC_URL}/Logos/Modern_Minimalist/Weston Woodman-02.png`, description: "Productivity app for creators" },
  { id: 29, name: "Nimbus Weather", image: `${process.env.PUBLIC_URL}/Logos/Modern_Minimalist/yogric_modern logo_14062025_Jerry_KZ00A_R04A(SY).png`, description: "Weather forecasting service" },
  { id: 30, name: "Echo Records", image: `${process.env.PUBLIC_URL}/Logos/Modern_Minimalist/yvonnekeyes_0401_00aA2a.png`, description: "Independent music label" },
];

const testimonials = [
  {
    name: "gauravobhan",
    role: "Canada",
    quote: "It was a pleasure to have him in my team to design the art for my video game loading screen. The artist is very cooperative and always open to feedback and delivering as per them. Will definitely consider him for any future projects.",
    avatar: `${process.env.PUBLIC_URL}/Testimonials/GAURAV.jpg`,
  },
  {
    name: "Daniel",
    role: "UAE",
    quote: "He delivered super fast, nailed the vision on the first try, and made the whole process effortless. No revisions needed — the final result was perfection. Creative, professional, and efficient — a rare combo! 🌟 So happy I got to work with him — highly recommend! 🙌🔥",
    avatar: `${process.env.PUBLIC_URL}/Testimonials/daniel.webp`,
  },
  {
    name: "mbarkersimpson",
    role: "US",
    quote: "Venom took my ideas and created something that fit perfectly. He's quick, works hard to tailor a project, and is responsive. This is the second project I've worked on with him, and I am delighted with the result.",
    avatar: `${process.env.PUBLIC_URL}/Testimonials/mbarker.jpg`,
  },
  {
    name: "oceannafb",
    role: "UK",
    quote: "Venom is an exceptionally brilliant creator. His professionalism shines through in every piece of work he delivers. He’s incredibly cooperative and easy to work with—just tell him what you need, and he’ll exceed your expectations every time.",
    avatar: `${process.env.PUBLIC_URL}/Testimonials/OCEANNA.webp`,
  },
];

const faqs = [
  {
    q: "What does social media kit include ?",
    a: "Hello, the social media kit includes : 1. Profile picture for all of your social media profiles (adjusted in proper size) 2. Banner design for one of your social media profile",
  },
  {
    q: "What is a Source/Vector File and their Importance ?",
    a: "Source file is the editable photoshop file of the logo use for Future editing purposes. Vector file is the adobe illustrator file of the logo used for HQ printing purposes, such as on stickers, banners, t shirts, sign boards or hoardings.",
  },
  {
    q: "What is the turnaround time ?",
    a: "Turnaround time for the initial draft is usually less than 24 hours, and revisions in basic package will be delivered in 24-48 hours and in standard or premium package it's usually less than 24 hours. I don't work on sunday and take time to spend with family and friends.",
  },
  {
    q: "How does the refund policy work ?",
    a: "I make sure I get the best out of client's intention but still if you feel that you are not satisfied with my work in initial deliveries, You can always ask for refund and full refund shall be provided.",
  },
  // {
  //   q: "How does the refund policy work ?",
  //   a: "I make sure I get the best out of client's intention but still if you feel that you are not satisfied with my work in initial deliveries, You can always ask for refund and full refund shall be provided.",
  // },
];

const posts = [
  {
    title: "Logo Design Trends 2025",
    date: "Apr 30, 2025",
    summary: "Exploring the latest trends in typography, color, and symbolism.",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "The Psychology of Color in Logos",
    date: "Apr 27, 2025",
    summary: "How color choices influence brand perception and recognition.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
  },
];

// ... (useParallax, Stat, Section, Card, FAQItem components remain the same) ...

function Header() {
  const [open, setOpen] = useState(false);
  // const { scrollY } = useScroll();
  // const backgroundColor = useTransform(
  //   scrollY,
  //   [0, 100],
  //   ["rgba(0,0,0,0)", "rgba(15,15,25,0.9)"]
  // );
  
  return (
    <motion.header 
      className="fixed inset-x-0 top-0 z-40"
      // style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md">
          <motion.a 
            href="#home" 
            className="flex items-center gap-2 font-semibold tracking-tight interactive"
            whileHover={{ scale: 1.05 }}
          >
            {/* <motion.span 
              className="inline-block h-7 w-7 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            /> */}
            {/* <span>Venom<span className="text-pink-400">Hunt</span></span> */}
            <img src={`${process.env.PUBLIC_URL}/vh-02.png`} alt="Logo" className="h-8 w-32"/>  
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
              <span>Available for projects</span>
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
            className="md:hidden mx-6 mt-2 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md"
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

// function Hero() {
//   const ref = useRef(null);
//   const { y, scale } = useParallax(ref);
//   const controls = useAnimation();
//   const [currentText, setCurrentText] = useState(0);
  
//   const texts = [
//     "Logo Designer",
//     "Brand Identity Specialist",
//     "Visual Storyteller",
//     "Creative Director"
//   ];
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentText((prev) => (prev + 1) % texts.length);
//     }, 3000);
    
//     return () => clearInterval(interval);
//   }, []);
  
//   return (
//     <Section id="home" className="pt-36 md:pt-40">
//       <div className="grid items-center gap-10 md:grid-cols-2">
//         <div>
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight"
//           >
//             <AnimatePresence mode="wait">
//               <motion.span
//                 key={currentText}
//                 className="block bg-clip-text min-h-32 text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: -20, opacity: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {texts[currentText]}
//               </motion.span>
//             </AnimatePresence>
//             <span className="block text-white/80 text-2xl md:text-3xl mt-3">Crafting memorable brand identities through strategic logo design</span>
//           </motion.h1>
//           <motion.p 
//             className="mt-6 text-white/70 max-w-xl"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//           >
//             I create distinctive logos that tell your brand's story, connect with your audience, and stand the test of time.
//           </motion.p>
//           <div className="mt-8 flex flex-wrap gap-3">
//             <motion.a 
//               href="#portfolio" 
//               className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 text-sm font-semibold hover:from-purple-600 hover:to-pink-600 interactive"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               View Portfolio
//             </motion.a>
//             <motion.a 
//               href="#contact" 
//               className="rounded-full border border-white/10 px-5 py-3 text-sm hover:bg-white/[0.08] interactive"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Start a Project
//             </motion.a>
//           </div>
//         </div>

//         {/* Parallax image stack */}
//         <div ref={ref} className="relative h-[480px] md:h-[560px]">
//           <motion.div 
//             style={{ y, scale }} 
//             className="absolute -right-4 top-10 h-72 w-56 overflow-hidden rounded-3xl border border-white/10 bg-white/5"
//             whileHover={{ rotate: 2 }}
//           >
//             <img
//               src={`${process.env.PUBLIC_URL}/Hero/image-1.jpg`}
//               alt="logo design process"
//               className="h-full w-full object-cover"
//             />
//           </motion.div>
//           <motion.div 
//             style={{ y }} 
//             className="absolute left-0 bottom-0 h-80 w-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5"
//             whileHover={{ rotate: -2 }}
//           >
//             <img
//               src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=400&auto=format&fit=crop"
//               alt="brand identity"
//               className="h-full w-full object-cover"
//             />
//           </motion.div>
//           <motion.div 
//             className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-tr from-pink-500/40 to-purple-500/40 blur-2xl"
//             animate={{
//               scale: [1, 1.2, 1],
//             }}
//             transition={{
//               duration: 4,
//               repeat: Infinity,
//             }}
//           />
//           <motion.div 
//             className="absolute right-8 -bottom-6 h-24 w-24 rounded-full bg-gradient-to-tr from-blue-500/40 to-cyan-500/40 blur-2xl"
//             animate={{
//               scale: [1.2, 1, 1.2],
//             }}
//             transition={{
//               duration: 5,
//               repeat: Infinity,
//             }}
//           />
//         </div>
//       </div>
//     </Section>
//   );
// }

function Hero() {
  const ref = useRef(null);
  const { y, scale } = useParallax(ref);
  // const controls = useAnimation();
  const [currentText, setCurrentText] = useState(0);
  
  const texts = [
    "Logo Designer",
    "Brand Identity Specialist",
    "Visual Storyteller",
    "Creative Director"
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
            {/* Fixed text animation container with proper height */}
            <div className="relative h-28 md:h-36 overflow-visible mb-10">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentText}
                  className="absolute left-0 top-0 w-full block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ lineHeight: '1.2' }}
                >
                  {texts[currentText]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="block text-white/80 text-2xl md:text-3xl mt-3">
              Crafting memorable brand identities through strategic logo design
            </span>
          </motion.h1>
          <motion.p 
            className="mt-6 text-white/70 max-w-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            I create distinctive logos that tell your brand's story, connect with your audience, and stand the test of time.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <motion.a 
              href="#portfolio" 
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 text-sm font-semibold hover:from-purple-600 hover:to-pink-600 interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
            </motion.a>
            <motion.a 
              href="#contact" 
              className="rounded-full border border-white/10 px-5 py-3 text-sm hover:bg-white/[0.08] interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
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
              src={`${process.env.PUBLIC_URL}/Hero/image-1.jpg`}
              alt="logo design process"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div 
            style={{ y }} 
            className="absolute left-0 bottom-0 h-80 w-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            whileHover={{ rotate: -2 }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/Hero/image-2.jpg`}
              alt="brand identity"
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
          Design Services
        </motion.h2>
        <motion.p 
          className="mt-3 text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Comprehensive logo and brand identity solutions tailored to your needs.
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
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${s.color}`}>
                  <s.icon className="size-6 text-white" />
                </div>
                <h3 className="font-semibold">{s.title}</h3>
                </div>
                <div>
                  
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
            Hi, I'm <span className="text-white">Venom</span>, a professional logo designer with 10+ years of experience in custom logo design, brand identity, and mascots. I've helped over 13,000 clients build brands that stand out and sell. From hand-drawn logos to modern minimalist styles, I design with strategy, creativity, and purpose. Rated 4.9 stars on Fiverr, I’m here to turn your vision into a powerful brand. Let’s create something unforgettable—message me or place your order now.
          </motion.p>
          <motion.div 
            className="mt-6 grid grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Stat value="20.3k+" label="Orders Completed" />
            <Stat value="10+" label="Years Experience" />
            <Stat value="100%" label="Client Satisfaction" />
            <Stat value="4.9/5" label="Rating" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <h3 className="text-xl font-semibold">My Approach</h3>
            <p className="mt-3 text-white/70">
              {/* I follow a strategic process that begins with understanding your business, audience, and goals. Through research, sketching, and refinement, I create logos that are not just visually appealing but also meaningful and effective. */}
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <motion.a 
                href="mailto:hello@logocraft.com" 
                className="inline-flex items-center gap-2 interactive"
                whileHover={{ x: 5 }}
              >
                <Mail className="size-4" /> hello@logocraft.com
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

// Logo Carousel Component
function LogoCarousel({ direction = "right", speed = 40, logos = [] }) {
  // Only use the provided logos array, don't duplicate it
  const carouselLogos = [...logos];
  
  return (
    <div className="relative w-full overflow-hidden py-8">
      <motion.div
        className="flex"
        animate={{
          x: direction === "right" ? ["0%", "-100%"] : ["-100%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {carouselLogos.map((logo, index) => (
          <div
            key={`${logo.id}-${index}`}
            className="group relative mx-4 flex h-44 w-44 shrink-0 items-center justify-center rounded-2xl bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/10 interactive"
          >
            <img
              src={logo.image}
              alt={logo.name}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <div className="p-4 text-center">
                <h3 className="font-semibold">{logo.name}</h3>
                <p className="mt-2 text-sm text-white/80">{logo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Portfolio Modal Component

function PortfolioModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-6xl h-full max-h-[90vh] rounded-3xl border border-white/10 bg-gradient-to-b from-[#1A1A2E] to-[#0A0A14] p-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full bg-white/10 p-2 transition-all hover:bg-white/20"
        >
          <X className="size-5" />
        </button>
        
        <h2 className="text-3xl font-bold text-center mb-6">Logo Portfolio</h2>
        
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
            {logos.map((logo) => (
              <motion.div
                key={logo.id}
                className="group relative flex h-60 items-center justify-center rounded-2xl bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/10 interactive"
                whileHover={{ y: -5 }}
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <div className="p-4 text-center">
                    <h3 className="font-semibold">{logo.name}</h3>
                    <p className="mt-2 text-sm text-white/80">{logo.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// function Portfolio() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   return (
//     <Section id="portfolio" className="">
//       <div className="mx-auto max-w-3xl text-center">
//         <motion.h2 
//           className="text-3xl md:text-5xl font-extrabold tracking-tight"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           Logo Portfolio
//         </motion.h2>
//         <motion.p 
//           className="mt-3 text-white/70"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//         >
//           A selection of logos I've created for clients across various industries.
//         </motion.p>
//       </div>

//       {/* Animated Carousels */}
//       <div className="mt-16 space-y-12">
//         <LogoCarousel direction="right" speed={50} />
//         <LogoCarousel direction="left" speed={45} />
//       </div>

//       <motion.div 
//         className="mt-16 text-center"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ delay: 0.4, duration: 0.6 }}
//       >
//         <motion.button 
//           onClick={() => setIsModalOpen(true)}
//           className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-white font-semibold interactive"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           View Full Portfolio <ArrowRight className="size-4" />
//         </motion.button>
//       </motion.div>

//       <AnimatePresence>
//         {isModalOpen && (
//           <PortfolioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//         )}
//       </AnimatePresence>
//     </Section>
//   );
// }

// ... (Testimonials, FAQ, Insights, Contact, Footer components remain similar with content updates) ...

// Updated Portfolio component with three carousels
function Portfolio() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Split logos into three groups
  const firstCarouselLogos = logos.slice(0, 10);  // Logos 1-10
  const secondCarouselLogos = logos.slice(10, 20); // Logos 11-20
  const thirdCarouselLogos = logos.slice(20, 30);  // Logos 21-30
  
  return (
    <Section id="portfolio" className="">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Logo Portfolio
        </motion.h2>
        <motion.p 
          className="mt-3 text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          A selection of logos I've created for clients across various industries.
        </motion.p>
      </div>

      {/* Three Animated Carousels */}
      <div className="mt-16 space-y-12">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold bg-white/5 px-6 pb-3 pt-2 w-fit rounded-full">Character Mascot Logos</h3>
          <LogoCarousel 
            direction="right" 
            speed={50} 
            logos={firstCarouselLogos} 
          />
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold bg-white/5 px-6 pb-3 pt-2 w-fit rounded-full">Hand-Drawn Water Color Logos</h3>
          <LogoCarousel 
            direction="left" 
            speed={45} 
            logos={secondCarouselLogos} 
          />
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold bg-white/5 px-6 pb-3 pt-2 w-fit rounded-full">Modern Minimalist Logos</h3>
          <LogoCarousel 
            direction="right" 
            speed={55} 
            logos={thirdCarouselLogos} 
          />
        </div>
      </div>

      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-white font-semibold interactive"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Full Portfolio <ArrowRight className="size-4" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <PortfolioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
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
          Client Testimonials
        </motion.h2>
        <motion.p 
          className="mt-3 text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          What clients say about working with me on their logo design projects.
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
    </Section>
  );
}


function FAQItem({ item, i }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Calculate content height only once after component mounts
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  return (
    <motion.div 
      className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden h-fit"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left interactive"
      >
        <span className="font-medium text-left">{item.q}</span>
        <motion.div 
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="size-5 flex-shrink-0" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: open ? contentHeight : 0,
          opacity: open ? 1 : 0.8
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="px-5 pb-5 text-sm opacity-90">
          {item.a}
        </div>
      </motion.div>
    </motion.div>
  );
}

function FAQ() {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  
  // Simple intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

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
      
      <div ref={containerRef} className="mt-10 grid gap-4 md:grid-cols-2">
        {faqs.map((item, i) => (
          <FAQItem 
            key={i} 
            item={item} 
            i={i} 
            // Only animate if section is in view
            shouldAnimate={inView}
          />
        ))}
      </div>
    </Section>
  );
}

// function Insights() {
//   return (
//     <Section id="insights">
//       <div className="mx-auto max-w-3xl text-center">
//         <motion.h2 
//           className="text-3xl md:text-5xl font-extrabold tracking-tight"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           Design Insights
//         </motion.h2>
//         <motion.p 
//           className="mt-3 text-white/70"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//         >
//           Thoughts on logo design, branding, and visual identity.
//         </motion.p>
//       </div>
//       <div className="mt-10 grid gap-6 md:grid-cols-2">
//         {posts.map((p) => (
//           <motion.div
//             key={p.title}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <Card className="h-full">
//               <div className="h-40 overflow-hidden rounded-xl mb-4">
//                 <motion.img 
//                   src={p.image} 
//                   alt={p.title}
//                   className="w-full h-full object-cover"
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ duration: 0.4 }}
//                 />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <div className="text-xs uppercase tracking-wider text-white/60">{p.date}</div>
//                 <h3 className="text-lg font-semibold">{p.title}</h3>
//                 <p className="text-white/70 text-sm">{p.summary}</p>
//                 <motion.a 
//                   href="#" 
//                   className="mt-2 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white interactive"
//                   whileHover={{ x: 5 }}
//                 >
//                   Read more <ArrowRight className="size-4" />
//                 </motion.a>
//               </div>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </Section>
//   );
// }

// function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     service: "Logo Design",
//     budget: "",
//     message: ""
//   });
  
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };
  
//   return (
//     <Section id="contact">
//       <div className="mx-auto max-w-3xl text-center">
//         <motion.h2 
//           className="text-3xl md:text-5xl font-extrabold tracking-tight"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           Start a Project
//         </motion.h2>
//         <motion.p 
//           className="mt-3 text-white/70"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//         >
//           Let's discuss your logo design needs. I'll get back to you within 24 hours.
//         </motion.p>
//       </div>
//       <motion.form
//         onSubmit={(e) => {
//           e.preventDefault();
//           alert("Thanks! This is a demo form.");
//         }}
//         className="mx-auto mt-10 max-w-2xl grid gap-4"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ delay: 0.4, duration: 0.6 }}
//       >
//         <div className="grid gap-4 sm:grid-cols-2">
//           <input 
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 interactive" 
//             placeholder="Name" 
//             required 
//           />
//           <input 
//             type="email" 
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 interactive" 
//             placeholder="Email" 
//             required 
//           />
//         </div>
//         <div className="grid gap-4 sm:grid-cols-2">
//           <select 
//             name="service"
//             value={formData.service}
//             onChange={handleChange}
//             className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 interactive"
//             required          
//           > 
//             <option value="" className="text-black">Choose Service</option>
//             <option value="Logo Design" className="text-black">Logo Design</option>
//             <option value="Brand Identity" className="text-black">Brand Identity</option>
//             <option value="Visual Design" className="text-black">Visual Design</option>
//             <option value="Logo Animation" className="text-black">Logo Animation</option>
//           </select>
//           <select 
//             name="budget"
//             value={formData.budget}
//             onChange={handleChange}
//             className="rounded-xl border border-white/10  bg-white/[0.04] px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 interactive"
//             required
//           >
//             <option value="" className="text-black">Budget Range</option>
//             <option value="$500-$1000" className="text-black">$500-$1000</option>
//             <option value="$1000-$2500" className="text-black">$1000-$2500</option>
//             <option value="$2500-$5000" className="text-black">$2500-$5000</option>
//             <option value="$5000+" className="text-black">$5000+</option>
//           </select>
//         </div>
//         <textarea 
//           rows={5} 
//           name="message"
//           value={formData.message}
//           onChange={handleChange}
//           className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 interactive" 
//           placeholder="Tell me about your project and brand" 
//           required
//         />
//         <motion.button 
//           className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 text-white font-semibold interactive"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Send Message <ArrowRight className="size-4" />
//         </motion.button>
//       </motion.form>
//       <motion.div 
//         className="mt-8 text-center text-white/70"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ delay: 0.6, duration: 0.6 }}
//       >
//         <div className="inline-flex items-center gap-4">
//           <motion.a 
//             className="inline-flex items-center gap-2 interactive" 
//             href="mailto:hello@logocraft.com"
//             whileHover={{ y: -2 }}
//           >
//             <Mail className="size-4"/> hello@logocraft.com
//           </motion.a>
//           <span className="opacity-40">•</span>
//           <motion.a 
//             className="inline-flex items-center gap-2 interactive" 
//             href="tel:+15551234567"
//             whileHover={{ y: -2 }}
//           >
//             <Phone className="size-4"/> +1 (555) 123‑4567
//           </motion.a>
//         </div>
//       </motion.div>
//     </Section>
//   );
// }



function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Replace these with your actual EmailJS credentials
      const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const userID = process.env.REACT_APP_EMAILJS_USER_ID || 'your_user_id';
      
      // Send email using EmailJS
      const result = await emailjs.sendForm(serviceID, templateID, e.target, userID);
      
      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        message: ""
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
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
          Start a Project
        </motion.h2>
        <motion.p 
          className="mt-3 text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Let's discuss your logo design needs. I'll get back to you within 24 hours.
        </motion.p>
      </div>
      
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.div 
          className="mx-auto mt-6 max-w-2xl p-4 bg-green-900/30 border border-green-500/30 rounded-xl text-green-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Thank you! Your message has been sent successfully. I'll get back to you soon.
        </motion.div>
      )}
      
      {submitStatus === 'error' && (
        <motion.div 
          className="mx-auto mt-6 max-w-2xl p-4 bg-red-900/30 border border-red-500/30 rounded-xl text-red-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Sorry, there was an error sending your message. Please try again or contact me directly at hello@logocraft.com.
        </motion.div>
      )}
      
      <motion.form
        onSubmit={handleSubmit}
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
            required          
          > 
            <option value="">Choose Service</option>
            <option value="Logo Design">Logo Design</option>
            <option value="Brand Identity">Brand Identity</option>
            <option value="Visual Design">Visual Design</option>
            <option value="Logo Animation">Logo Animation</option>
          </select>
          <select 
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 interactive"
            required
          >
            <option value="">Budget Range</option>
            <option value="$500-$1000">$500-$1000</option>
            <option value="$1000-$2500">$1000-$2500</option>
            <option value="$2500-$5000">$2500-$5000</option>
            <option value="$5000+">$5000+</option>
          </select>
        </div>
        <textarea 
          rows={5} 
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 interactive" 
          placeholder="Tell me about your project and brand" 
          required
        />
        <motion.button 
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 text-white font-semibold interactive disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isSubmitting ? { scale: 1.05 } : {}}
          whileTap={!isSubmitting ? { scale: 0.95 } : {}}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message <ArrowRight className="size-4" />
            </>
          )}
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
            href="mailto:hello@logocraft.com"
            whileHover={{ y: -2 }}
          >
            <Mail className="size-4"/> hello@logocraft.com
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
                  <motion.a 
            href="#home" 
            className="flex items-center gap-2 font-semibold tracking-tight interactive"
            whileHover={{ scale: 1.05 }}
          >
            {/* <motion.span 
              className="inline-block h-7 w-7 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            /> */}
            {/* <span>Venom<span className="text-pink-400">Hunt</span></span> */}
            <img src={`${process.env.PUBLIC_URL}/vh-02.png`} alt="Logo" className="h-8 w-32"/>  
          </motion.a>
        <div className="text-white/70">© {new Date().getFullYear()} LogoCraft. All rights reserved.</div>
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
          {/* <motion.a 
            href="#" 
            className="text-white/70 hover:text-white interactive"
            whileHover={{ y: -2 }}
          >
            <Dribbble className="size-5" />
          </motion.a> */}
        </div>
      </div>
    </motion.footer>
  );
}


const FloatingButton = () => {
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowButton(scrollY > 500);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <motion.a
      href="https://www.fiverr.com/venom_hunt"
      target="_blank"
      className="fixed bottom-12 right-12 z-50 p-2 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#00b22d] to-[#a8e49b] text-white shadow-md interactive"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}  
      animate={{ opacity: showButton ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* <p className="text-sm">Connect On</p> */}
      <SiFiverr  className="text-6xl"/>
    </motion.a>
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
      <FloatingButton />
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Testimonials />
        <FAQ />
        {/* <Insights /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}