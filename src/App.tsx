import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, 
  Menu, 
  X, 
  ArrowDown, 
  Leaf, 
  Globe, 
  User, 
  Scale, 
  Users, 
  Check, 
  BookOpen, 
  Droplets, 
  MapPin, 
  Mail,
  ChevronRight,
  ShieldCheck,
  PenTool,
  Flame,
  Heart,
  Key,
  Cloud,
  ArrowRight,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import StudyPage from './StudyPage';
import BaptismPage from './BaptismPage';
import { scriptures, ScriptureLink } from './scriptureData';

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    nav_theology: "Theology",
    nav_solution: "Legal Solution",
    nav_history: "History",
    nav_membership: "Membership",
    nav_mission: "Mission",
    nav_study: "Study Center",
    nav_join: "Join Us",
    nav_contact: "Contact",
    nav_authority: "Authority",
    hero_subtitle: "The Divine Journey of the Church of Christ",
    hero_title_1: "Escaping the Lake of Fire:",
    hero_title_2: "Finding Your Name in the Book of Life",
    hero_desc: "All have sinned, and the wages of sin is death (Romans 6:23)—the lake of fire. Redemption is solely found for those whose names are written in the Book of Life, secured within the Bayan ng Diyos (Nation of God), the Church of Christ.",
    hero_cta: "Learn the Lineage of the Promise",
    theology_title: "The Journey of the True Seed",
    stages_title: "The Five Stages of Creation",
    solution_title: "The One New Man",
    solution_paradox: "The Law of Individual Responsibility",
    solution_paradox_desc: "The law states that each person must be put to death for their own sin (Deut. 24:16). No one can pay for another's debt. How then can Christ save mankind without violating God's justice?",
    solution_perfect: "The Legal Union",
    solution_perfect_desc: "Christ created the 'One New Man' (Eph. 2:15) by joining Himself as the Head to the Church as His Body. Because they form one single legal entity, Christ could legally suffer for His body, the Church, satisfying the law for all its members.",
    history_title: "Apostasy and the Remnant",
    membership_title: "Being Born Again",
    mission_title: "The Sower of the Word",
    redemption_title: "The Path to Redemption",
    redemption_subtitle: "A Divine Journey from Sin to Salvation",
    path_step_1_title: "The Seed",
    path_step_1_desc: "Hearing the True Word of God which is the spiritual seed that initiates faith.",
    path_step_2_title: "The Recognition",
    path_step_2_desc: "Acknowledging that the wages of sin is death and the lake of fire.",
    path_step_3_title: "The Solution",
    path_step_3_desc: "Understanding the Legal Union of Christ and His Church as the One New Man.",
    path_step_4_title: "The Entry",
    path_step_4_desc: "Entering the Church of Christ to be covered by the redemption of His blood.",
    path_step_5_title: "The Seal",
    path_step_5_desc: "Baptism into the Body, securing your name in the Book of Life.",
    path_step_6_title: "The Promise",
    path_step_6_desc: "Inheriting the Holy City and escaping the second death.",
    contact_title: "Become Good Ground",
    contact_desc: "Are you seeking to hear the True Word? Connect with us to begin your journey towards the promise, finding your name written in the Book of Life.",
    contact_btn: "Send Inquiry",
    footer_desc: "Dedicated to illuminating the Divine Journey of the Church of Christ. May the true word guide you to redemption."
  },
  tl: {
    nav_theology: "Teolohiya",
    nav_solution: "Legal na Solusyon",
    nav_history: "Kasaysayan",
    nav_membership: "Kaanib",
    nav_mission: "Misyon",
    nav_study: "Sentro ng Pag-aaral",
    nav_join: "Sapi Na",
    nav_contact: "Kontak",
    nav_authority: "Karapatan",
    hero_subtitle: "Ang Banal na Paglalakbay ng Iglesia ni Cristo",
    hero_title_1: "Pagtakas sa Dagat-dagatang Apoy:",
    hero_title_2: "Pagkakasulat ng Pangalan sa Aklat ng Buhay",
    hero_desc: "Ang lahat ay nangagkasala, at ang kabayaran ng kasalanan ay kamatayan (Roma 6:23)—ang dagat-dagatang apoy. Ang katubusan ay matatagpuan lamang ng mga may pangalan sa Aklat ng Buhay, na nasisiguro sa loob ng Bayan ng Diyos, ang Iglesia ni Cristo.",
    hero_cta: "Alamin ang Pinagmulan ng Pangako",
    theology_title: "Ang Paglalakbay ng Tunay na Binhi",
    stages_title: "Ang Limang Yugto ng Paglalang",
    solution_title: "Ang Isang Taong Bago",
    solution_paradox: "Ang Batas ng Pananagutang Pansarili",
    solution_paradox_desc: "Sinasabi ng batas na bawat tao ay dapat mamatay para sa sariling kasalanan (Deut. 24:16). Walang sinuman ang makapagbabayad para sa utang ng iba. Paano maililigtas ni Cristo ang tao nang hindi nilalabag ang katarungan ng Diyos?",
    solution_perfect: "Ang Legal na Pag-uugnay",
    solution_perfect_desc: "Nilalang ni Cristo ang 'Isang Taong Bago' (Efe. 2:15) sa pamamagitan ng pag-uugnay sa Kaniyang sarili bilang Ulo sa Iglesia bilang Kaniyang Katawan. Dahil sila ay bumubuo ng isang legal na pagkatao, legal na makapagdudusa si Cristo para sa Kaniyang katawan.",
    history_title: "Ang Pagtalikod at ang Nalabi",
    membership_title: "Ang Pagkapanganak na Muli",
    mission_title: "Ang Manghahasik ng Salita",
    redemption_title: "Ang Landas Patungo sa Katubusan",
    redemption_subtitle: "Isang Banal na Paglalakbay mula sa Kasalanan patungo sa Kaligtasan",
    path_step_1_title: "Ang Binhi",
    path_step_1_desc: "Pagdinig sa Tunay na Salita ng Diyos na siyang espirituwal na binhing nagpapasimula ng pananampalataya.",
    path_step_2_title: "Ang Pagkilala",
    path_step_2_desc: "Pagkilala na ang kabayaran ng kasalanan ay kamatayan at ang dagat-dagatang apoy.",
    path_step_3_title: "Ang Solusyon",
    path_step_3_desc: "Pag-unawa sa Legal na Pag-uugnay ni Cristo at ng Kaniyang Iglesia bilang Isang Taong Bago.",
    path_step_4_title: "Ang Pagpasok",
    path_step_4_desc: "Pagpasok sa Iglesia ni Cristo upang masakop ng katubusan ng Kaniyang dugo.",
    path_step_5_title: "Ang Tatak",
    path_step_5_desc: "Bautismo sa loob ng Katawan, na nagsisiguro ng iyong pangalan sa Aklat ng Buhay.",
    path_step_6_title: "Ang Pangako",
    path_step_6_desc: "Pagmamana ng Banal na Lungsod at pagtakas sa ikalawang kamatayan.",
    contact_title: "Maging Mabuting Lupa",
    contact_desc: "Naghahanap ka ba na makarinig ng Tunay na Salita? Makipag-ugnayan sa amin upang simulan ang iyong paglalakbay patungo sa pangako.",
    contact_btn: "Ipadala ang Inquiry",
    footer_desc: "Inilaan upang itanghal ang Banal na Paglalakbay ng Iglesia ni Cristo. Nawa'y gabayan ka ng tunay na salita patungo sa katubusan."
  }
};

// --- Components ---

interface TimelineItem {
  title: string;
  date: string;
  content: string;
}

const timelineData: TimelineItem[] = [
  {
    title: "Israel's Fall and Apostasy",
    date: "Ancient Era",
    content: "The physical nation of Israel, initially chosen, failed to remain faithful. They fell into deep apostasy, resulting in the division of the kingdom and the eventual loss of the Ten Tribes. This demonstrated that a fleshly lineage was insufficient to maintain God's covenant."
  },
  {
    title: "The First-Century Church",
    date: "A.D. 33",
    content: "Christ established His Church in Jerusalem, the spiritual fulfillment of the Seed. However, prophecy foretold that after the era of the Apostles, ravenous wolves would enter the flock, introducing heretical doctrines."
  },
  {
    title: "The Great Apostasy",
    date: "Post-Apostolic Era",
    content: "Through severe persecution and the rise of false teachings, the first-century Church was led away from the true doctrines. The true organization disappeared from the earth, fulfilling prophecies of a great falling away."
  },
  {
    title: "The Nalabing Binhi (Remnant Seed)",
    date: "July 27, 1914",
    content: "According to biblical prophecy regarding the 'other sheep' from the 'Far East', the Church of Christ re-emerged in the Philippines concurrent with the First World War. This is the 'nalabing binhi', continuing the lineage of the Promise today."
  }
];

export default function App() {
  const [view, setView] = useState<'home' | 'study' | 'baptism'>('home');
  const [lang, setLang] = useState<'en' | 'tl'>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const [tooltip, setTooltip] = useState<{ verse: string | null; x: number; y: number }>({ verse: null, x: 0, y: 0 });
  const [studyConfig, setStudyConfig] = useState<{ category?: string; lessonId?: number }>({});
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = TRANSLATIONS[lang];

  const handleHover = (verse: string | null, x: number, y: number) => {
    setTooltip({ verse, x, y });
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openStudy = (category?: string, lessonId?: number) => {
    setStudyConfig({ category, lessonId });
    setView('study');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = (scrollToContact?: boolean) => {
    setView('home');
    if (scrollToContact) {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-brand-light text-slate-800 antialiased selection:bg-brand-gold selection:text-brand-dark min-h-screen">
      
      {/* Global Scripture Tooltip */}
      <AnimatePresence>
        {tooltip.verse && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed z-50 bg-white p-5 rounded-lg shadow-2xl border-l-4 border-brand-gold max-w-sm pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-10px]"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <h4 className="font-bold text-brand-blue mb-2 border-b border-gray-100 pb-1">{tooltip.verse}</h4>
            <p className="text-sm text-gray-600 leading-relaxed italic">"{scriptures[tooltip.verse]}"</p>
          </motion.div>
        )}
      </AnimatePresence>

      {view === 'study' ? (
        <StudyPage 
          lang={lang} 
          onBack={handleBackToHome} 
          initialCategory={studyConfig.category}
          initialLessonId={studyConfig.lessonId}
          onHover={handleHover}
        />
      ) : view === 'baptism' ? (
        <BaptismPage lang={lang} onBack={handleBackToHome} onHover={handleHover} />
      ) : (
        <>
          {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-brand-dark/95 backdrop-blur-lg h-16 border-b border-brand-gold/30 shadow-lg' : 'bg-transparent h-24'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
              <a href="#home" className="text-brand-gold font-bold text-xl tracking-wider uppercase flex items-center gap-2 group">
                <Sun className={`text-brand-gold transition-transform duration-500 ${scrolled ? 'h-5 w-5' : 'h-7 w-7 rotate-12 group-hover:rotate-45'}`} />
                <span className={`transition-all duration-500 ${scrolled ? 'text-lg' : 'text-xl'}`}>The True Seed</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['theology', 'solution', 'history', 'authority', 'membership', 'mission'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`} 
                  className="text-white/80 hover:text-brand-gold transition-colors text-xs font-bold uppercase tracking-widest relative group"
                >
                  {t[`nav_${item}` as keyof typeof t]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <button 
                onClick={() => openStudy()}
                className="bg-brand-gold text-brand-dark px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-yellow-400 transition-all hover:scale-105 active:scale-95 btn-glow"
              >
                {t.nav_study}
              </button>
              <button 
                onClick={() => setView('baptism')}
                className="text-white/80 hover:text-brand-gold transition-colors text-xs font-bold uppercase tracking-widest"
              >
                {t.nav_join}
              </button>
              <div className="flex items-center gap-2 bg-white/10 p-1 rounded-lg border border-white/20 ml-4">
                <button 
                  onClick={() => setLang('en')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${lang === 'en' ? 'bg-brand-gold text-brand-dark' : 'text-white hover:text-brand-gold'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLang('tl')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${lang === 'tl' ? 'bg-brand-gold text-brand-dark' : 'text-white hover:text-brand-gold'}`}
                >
                  TL
                </button>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-brand-gold hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-brand-dark border-t border-brand-gold/20 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {['theology', 'solution', 'history', 'authority', 'membership', 'mission'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-white hover:text-brand-gold text-base font-medium"
                  >
                    {t[`nav_${item}` as keyof typeof t] || item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative bg-brand-dark min-h-screen flex items-center overflow-hidden pt-20">
        <div className="spire-bg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-gold font-semibold tracking-[0.2em] uppercase mb-4 text-sm md:text-base border-b border-brand-gold/30 pb-2"
          >
            {t.hero_subtitle}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 max-w-5xl font-serif"
          >
            {t.hero_title_1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200 italic font-normal">
              {t.hero_title_2}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-3xl text-lg md:text-xl text-gray-300 leading-relaxed mb-10"
          >
            {lang === 'en' ? (
              <>
                All have sinned, and the wages of sin is death (<ScriptureLink verse="Romans 6:23" onHover={handleHover}>Romans 6:23</ScriptureLink>)—the lake of fire. Redemption is solely found for those whose names are written in the Book of Life, secured within the Bayan ng Diyos (Nation of God), the Church of Christ.
              </>
            ) : (
              <>
                Ang lahat ay nangagkasala, at ang kabayaran ng kasalanan ay kamatayan (<ScriptureLink verse="Roma 6:23" onHover={handleHover}>Roma 6:23</ScriptureLink>)—ang dagat-dagatang apoy. Ang katubusan ay matatagpuan lamang ng mga may pangalan sa Aklat ng Buhay, na nasisiguro sa loob ng Bayan ng Diyos, ang Iglesia ni Cristo.
              </>
            )}
          </motion.p>
          
          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            href="#theology" 
            className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-brand-dark bg-brand-gold hover:bg-yellow-400 rounded-full shadow-gold transition-all transform hover:-translate-y-1 uppercase tracking-widest btn-glow"
          >
            {t.hero_cta}
            <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
          </motion.a>
        </div>
      </header>

      {/* Theology Section */}
      <section id="theology" className="py-24 bg-brand-light relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-brand-blue text-sm font-bold tracking-widest uppercase mb-2">{t.nav_theology}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">{t.theology_title}</h3>
            <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: Leaf, 
                title: lang === 'en' ? "The Eden Foundation" : "Ang Pundasyon sa Eden", 
                content: lang === 'en' ? (
                  <>The divine plan was first revealed in Eden. God promised the "Seed of the woman" (<ScriptureLink verse="Genesis 3:15" onHover={handleHover}>Genesis 3:15</ScriptureLink>), prophesying the original promise of a redeemer who would eventually crush the enemy.</>
                ) : (
                  <>Ang banal na plano ay unang inihayag sa Eden. Ipinangako ng Diyos ang "Binhi ng babae" (<ScriptureLink verse="Genesis 3:15" onHover={handleHover}>Genesis 3:15</ScriptureLink>), na nagpopropesiya sa orihinal na pangako ng isang manunubos.</>
                )
              },
              { 
                icon: Globe, 
                title: lang === 'en' ? "The Abrahamic Covenant" : "Ang Tipan kay Abraham", 
                content: lang === 'en' ? (
                  <>The promise was refined through Abraham. God established an "everlasting covenant" (<ScriptureLink verse="Genesis 17:7" onHover={handleHover}>Genesis 17:7</ScriptureLink>) with him, declaring that through his lineage, the promised seed would emerge to bring salvation.</>
                ) : (
                  <>Ang pangako ay pinatunayan kay Abraham. Nagtatag ang Diyos ng isang "walang hanggang tipan" (<ScriptureLink verse="Genesis 17:7" onHover={handleHover}>Genesis 17:7</ScriptureLink>) sa kaniya, na nagpapahayag na sa pamamagitan ng kaniyang lahi, lilitaw ang ipinangakong binhi.</>
                )
              },
              { 
                icon: User, 
                title: lang === 'en' ? "The Singular Seed" : "Ang Iisang Binhi", 
                content: lang === 'en' ? (
                  <>The promise was not meant for many "seeds," but specifically for one: Jesus Christ (<ScriptureLink verse="Galatians 3:16" onHover={handleHover}>Galatians 3:16</ScriptureLink>). He is the True Seed who fulfills the ancient word spoken in Eden.</>
                ) : (
                  <>Ang pangako ay hindi para sa maraming "binhi," kundi para sa isa lamang: si Jesucristo (<ScriptureLink verse="Galacia 3:16" onHover={handleHover}>Galacia 3:16</ScriptureLink>). Siya ang Tunay na Binhi.</>
                )
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-brand-gold hover:shadow-2xl transition-shadow"
              >
                <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center mb-6">
                  <item.icon className="text-brand-blue h-7 w-7" />
                </div>
                <h4 className="text-xl font-bold text-brand-blue mb-4">{item.title}</h4>
                <div className="text-gray-600 leading-relaxed">{item.content}</div>
              </motion.div>
            ))}
          </div>

          {/* Five Stages of Creation Integration */}
          <div className="mt-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.stages_title}</h3>
              <p className="text-gray-600 mb-8">
                {lang === 'en' 
                  ? "The path to the 'One New Man' is the final stage of God's creative work with humanity." 
                  : "Ang landas patungo sa 'Isang Taong Bago' ay ang huling yugto ng paglalang ng Diyos sa sangkatauhan."}
              </p>
              <div className="w-16 h-1 bg-brand-gold/50 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {[
                { stage: 1, name: lang === 'en' ? "Adam" : "Adan", desc: lang === 'en' ? "From the dust of the ground" : "Mula sa alabok ng lupa" },
                { stage: 2, name: lang === 'en' ? "Eve" : "Eva", desc: lang === 'en' ? "From the rib of Adam" : "Mula sa tadyang ni Adan" },
                { stage: 3, name: lang === 'en' ? "Humanity" : "Sangkatauhan", desc: lang === 'en' ? "Natural birth (Marriage)" : "Natural na kapanganakan" },
                { stage: 4, name: lang === 'en' ? "Christ" : "Cristo", desc: lang === 'en' ? "Holy Spirit in Mary" : "Espiritu Santo kay Maria" },
                { stage: 5, name: lang === 'en' ? "New Man" : "Bagong Tao", desc: lang === 'en' ? "Born Again (Water & Spirit)" : "Muling Pagsilang (Tubig at Espiritu)" }
              ].map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center group hover:border-brand-gold transition-colors"
                >
                  <div className="text-brand-gold font-bold text-xs mb-2 uppercase tracking-widest">Stage {s.stage}</div>
                  <div className="text-brand-blue font-bold text-lg mb-1">{s.name}</div>
                  <div className="text-gray-500 text-xs leading-tight">{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Solution Section */}
      <section id="solution" className="py-24 bg-brand-blue text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#D4AF37" d="M100 0 L200 200 L0 200 Z" />
            <path fill="#ffffff" d="M100 50 L150 200 L50 200 Z" opacity="0.5"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-brand-gold text-sm font-bold tracking-widest uppercase mb-2">{t.nav_solution}</h2>
              <h3 className="text-3xl md:text-5xl font-bold mb-6 font-serif">{t.solution_title}</h3>
              <div className="w-24 h-1 bg-brand-gold mb-8"></div>
              
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-panel p-6 rounded-xl"
                >
                  <h4 className="text-xl font-bold text-brand-gold mb-2 flex items-center gap-2">
                    <Scale className="h-5 w-5" /> {t.solution_paradox}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {lang === 'en' 
                      ? <>The law states that each person must be put to death for their own sin (<ScriptureLink verse="Deuteronomy 24:16" onHover={handleHover}>Deut. 24:16</ScriptureLink>). No one can pay for another's debt. How then can Christ save mankind without violating God's justice?</>
                      : <>Sinasabi ng batas na bawat tao ay dapat mamatay para sa sariling kasalanan (<ScriptureLink verse="Deuteronomy 24:16" onHover={handleHover}>Deut. 24:16</ScriptureLink>). Walang sinuman ang makapagbabayad para sa utang ng iba.</>}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass-panel p-6 rounded-xl border-l-4 border-l-brand-gold"
                >
                  <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Users className="h-5 w-5 text-brand-gold" /> {t.solution_perfect}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {lang === 'en'
                      ? <>Christ created the 'One New Man' (<ScriptureLink verse="Ephesians 2:15" onHover={handleHover}>Eph. 2:15</ScriptureLink>) by joining Himself as the Head to the Church as His Body. Because they form one single legal entity, Christ could legally suffer for His body, the Church, satisfying the law for all its members.</>
                      : <>Nilalang ni Cristo ang 'Isang Taong Bago' (<ScriptureLink verse="Ephesians 2:15" onHover={handleHover}>Efe. 2:15</ScriptureLink>) sa pamamagitan ng pag-uugnay sa Kaniyang sarili bilang Ulo sa Iglesia bilang Kaniyang Katawan.</>}
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full border-4 border-brand-gold/20 flex items-center justify-center p-8"
              >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-brand-gold animate-[spin_60s_linear_infinite]">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <path d="M100 20 C140 20, 180 50, 180 100 C180 150, 140 180, 100 180 C60 180, 20 150, 20 100 C20 50, 60 20, 100 20" fill="none" stroke="currentColor" strokeWidth="4" filter="url(#glow)"/>
                  <path d="M100 30 C130 30, 170 60, 170 100 C170 140, 130 170, 100 170 C70 170, 30 140, 30 100 C30 60, 70 30, 100 30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5"/>
                  <path d="M100 10 C150 10, 190 40, 190 100 C190 160, 150 190, 100 190 C50 190, 10 160, 10 100 C10 40, 50 10, 100 10" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
                  <path d="M100 20 L105 5 M140 32 L152 15 M172 65 L188 55 M180 100 L198 100 M172 135 L188 145 M140 168 L152 185 M100 180 L105 195 M60 168 L48 185 M28 135 L12 145 M20 100 L2 100 M28 65 L12 55 M60 32 L48 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M80 25 L75 12 M120 25 L125 12 M160 45 L170 35 M175 80 L190 75 M175 120 L190 125 M160 155 L170 165 M120 175 L125 188 M80 175 L75 188 M40 155 L30 165 M25 120 L10 125 M25 80 L10 75 M40 45 L30 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-white font-bold text-xl block">Christ</span>
                  <span className="text-brand-gold text-sm block border-t border-brand-gold/50 pt-1 mt-1 w-16 mx-auto uppercase">Head</span>
                  <div className="h-8 w-px bg-brand-gold/50 my-2"></div>
                  <span className="text-white font-bold text-xl block">Church</span>
                  <span className="text-brand-gold text-sm block border-t border-brand-gold/50 pt-1 mt-1 w-16 mx-auto uppercase">Body</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section (Timeline) */}
      <section id="history" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-brand-blue text-sm font-bold tracking-widest uppercase mb-2">{t.nav_history}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">{t.history_title}</h3>
            <p className="text-gray-600">
              {lang === 'en' ? "Trace the historical journey of God's nation from its ancient origins to its re-emergence in the modern era." : "Sundan ang makasaysayang paglalakbay ng bayan ng Diyos mula sa sinaunang pinagmulan nito hanggang sa muling paglitaw nito."}
            </p>
          </div>

          <div className="max-w-6xl mx-auto relative pl-4">
            {/* Vertical Line */}
            <div className="absolute left-[29px] top-4 bottom-4 w-1 bg-gray-200 rounded-full">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-brand-gold rounded-full origin-top"
                animate={{ height: `${(activeTimelineIndex / (timelineData.length - 1)) * 100}%` }}
                transition={{ type: 'spring', stiffness: 50, damping: 15 }}
              />
            </div>
            
            <div className="flex flex-col gap-6">
              {[
                { 
                  date: lang === 'en' ? "Ancient Era" : "Sinaunang Panahon", 
                  title: lang === 'en' ? "Israel's Fall and Apostasy" : "Ang Pagbagsak ng Israel", 
                  content: lang === 'en' ? (
                    <>The physical nation of Israel rebelled (<ScriptureLink verse="Isaiah 63:10" onHover={handleHover}>Isa. 63:10</ScriptureLink>) and fell into deep apostasy. This demonstrated that a fleshly lineage was insufficient to maintain God's covenant.</>
                  ) : (
                    <>Ang pisikal na bansa ng Israel ay naghimagsik (<ScriptureLink verse="Isaias 63:10" onHover={handleHover}>Isa. 63:10</ScriptureLink>) at tuluyang tumalikod sa Diyos.</>
                  )
                },
                { 
                  date: "A.D. 33", 
                  title: lang === 'en' ? "The First-Century Church" : "Ang Iglesia sa Unang Siglo", 
                  content: lang === 'en' ? (
                    <>Christ established His Church in Jerusalem (<ScriptureLink verse="Matthew 16:18" onHover={handleHover}>Matt. 16:18</ScriptureLink>), the spiritual fulfillment of the Seed. However, prophecy foretold that after the era of the Apostles, ravenous wolves would enter the flock (<ScriptureLink verse="Acts 20:29" onHover={handleHover}>Acts 20:29</ScriptureLink>).</>
                  ) : (
                    <>Itinatag ni Cristo ang Kaniyang Iglesia sa Jerusalem (<ScriptureLink verse="Mateo 16:18" onHover={handleHover}>Mat. 16:18</ScriptureLink>).</>
                  )
                },
                { 
                  date: lang === 'en' ? "Post-Apostolic" : "Pagkatapos ng mga Apostol", 
                  title: lang === 'en' ? "The Great Apostasy" : "Ang Malawakang Pagtalikod", 
                  content: lang === 'en' ? (
                    <>Through severe persecution and false teachings, the first-century Church was led away from the true doctrines (<ScriptureLink verse="1 Timothy 4:1" onHover={handleHover}>1 Tim. 4:1</ScriptureLink>).</>
                  ) : (
                    <>Sa pamamagitan ng pag-uusig at maling aral, ang Iglesia sa unang siglo ay natalikod (<ScriptureLink verse="1 Timoteo 4:1" onHover={handleHover}>1 Tim. 4:1</ScriptureLink>).</>
                  )
                },
                { 
                  date: "July 27, 1914", 
                  title: lang === 'en' ? "The Nalabing Binhi" : "Ang Nalabing Binhi", 
                  content: lang === 'en' ? (
                    <>The Church of Christ re-emerged in the Philippines concurrent with the First World War (<ScriptureLink verse="Matthew 24:6" onHover={handleHover}>Mat. 24:6-7</ScriptureLink>). This is the 'remnant seed' (<ScriptureLink verse="Isaiah 43:5" onHover={handleHover}>Isa. 43:5-6</ScriptureLink>) continuing the lineage of the Promise today.</>
                  ) : (
                    <>Ang Iglesia ni Cristo ay muling lumitaw sa Pilipinas kasabay ng Unang Digmaang Pandaigdig (<ScriptureLink verse="Mateo 24:6" onHover={handleHover}>Mat. 24:6-7</ScriptureLink>).</>
                  )
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start group relative z-10">
                  {/* Dot Control */}
                  <button 
                    onClick={() => setActiveTimelineIndex(idx)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-white border-4 transition-all duration-300 outline-none cursor-pointer ${idx <= activeTimelineIndex ? 'border-brand-gold bg-brand-gold shadow-[0_0_0_4px_rgba(212,175,55,0.2)]' : 'border-gray-300'}`}
                  />
                  
                  {/* Content Container */}
                  <div className="ml-6 flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-12 flex-1">
                    {/* Label Area */}
                    <div 
                      onClick={() => setActiveTimelineIndex(idx)}
                      className="cursor-pointer lg:w-64 flex-shrink-0 pt-1"
                    >
                      <span className={`block text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-300 ${idx <= activeTimelineIndex ? 'text-brand-gold' : 'text-gray-400'}`}>
                        {item.date}
                      </span>
                      <span className={`block text-base font-bold transition-colors duration-300 ${idx <= activeTimelineIndex ? 'text-brand-blue' : 'text-gray-500'}`}>
                        {item.title}
                      </span>
                    </div>

                    {/* Description Area (Appears to the right when active) */}
                    <div className="flex-1 min-h-[20px]">
                      <AnimatePresence mode="wait">
                        {idx === activeTimelineIndex && (
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm relative"
                          >
                            {/* Decorative arrow for the content box */}
                            <div className="hidden lg:block absolute left-0 top-6 -translate-x-1/2 rotate-45 w-3 h-3 bg-gray-50 border-l border-b border-gray-100"></div>
                            
                            <div className="text-gray-600 leading-relaxed text-sm md:text-base">
                              {item.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section id="authority" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-brand-blue text-sm font-bold tracking-widest uppercase mb-2">{t.nav_authority}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {lang === 'en' ? "The Divine Commission" : "Ang Banal na Komisyon"}
            </h3>
            <p className="text-gray-600">
              {lang === 'en' 
                ? "The True Messenger derives his authority directly from God. He was given the knowledge hidden in mystery." 
                : "Ang Tunay na Sugo ay humuhugot ng kaniyang karapatan nang direkta mula sa Diyos. Siya ay binigyan ng kaalamang nakatago sa hiwaga."}
            </p>
            <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: lang === 'en' ? "Divine Commission" : "Banal na Komisyon",
                desc: lang === 'en' ? "Authority is established by being 'sent' by God, distinguishing true messengers from false prophets." : "Ang karapatan ay itinatatag sa pamamagitan ng pagiging 'sinugo' ng Diyos.",
                lessonId: 17
              },
              {
                title: lang === 'en' ? "Exclusive Revelation" : "Eksklusibong Pahayag",
                desc: lang === 'en' ? "The 'secret knowledge' is revealed only to those God chooses to send, a mystery kept since the world began." : "Ang 'lihim na kaalaman' ay inihahayag lamang sa mga pinili ng Diyos na suguin.",
                lessonId: 17
              },
              {
                title: lang === 'en' ? "The One New Man" : "Ang Isang Taong Bago",
                desc: lang === 'en' ? "A unique understanding of the logic of salvation: Christ as the Head and the Church as His Body." : "Isang natatanging pag-unawa sa lohika ng kaligtasan: si Cristo bilang Ulo at ang Iglesia bilang Kaniyang Katawan.",
                lessonId: 6
              },
              {
                title: lang === 'en' ? "Prophetic Fulfillment" : "Katuparan ng Hula",
                desc: lang === 'en' ? "Validation through alignment with biblical prophecy, such as the 'angel' ascending from the east." : "Pagpapatunay sa pamamagitan ng pag-ayon sa hula ng Biblia, gaya ng 'anghel' na umaakyat mula sa silangan.",
                lessonId: 18
              },
              {
                title: lang === 'en' ? "Tool for Salvation" : "Kasangkapan sa Kaligtasan",
                desc: lang === 'en' ? "Equipped with the 'seal' to guide people back to their original purpose: fearing God and keeping His commandments." : "Nasasandatahan ng 'tatak' upang gabayan ang mga tao pabalik sa kanilang orihinal na layunin.",
                lessonId: 19
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-brand-gold transition-all group flex flex-col"
              >
                <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="text-brand-blue h-6 w-6" />
                </div>
                <h4 className="font-bold text-brand-blue mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">{item.desc}</p>
                <button 
                  onClick={() => openStudy('messenger', item.lessonId)}
                  className="text-xs font-bold text-brand-gold uppercase tracking-widest flex items-center gap-1 hover:text-brand-blue transition-colors"
                >
                  {lang === 'en' ? "Read Full Lesson" : "Basahin ang Aralin"}
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Analogy Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-dark text-white p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-brand-gold rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
                  <PenTool className="text-brand-dark h-10 w-10" />
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-brand-gold mb-4">
                  {lang === 'en' ? "The Master Architect's Blueprints" : "Ang Blueprints ng Punong Arkitekto"}
                </h4>
                <p className="text-gray-300 leading-relaxed italic">
                  {lang === 'en' 
                    ? "While anyone can look at a finished building, only the architect's chosen foreman is given the 'hidden' technical blueprints. These blueprints provide the exclusive authority and knowledge needed to properly lead the construction and ensure the structure fulfills its intended purpose; without them, any attempt to build would be unauthorized."
                    : "Habang ang sinuman ay maaaring tumingin sa isang natapos na gusali, ang piniling foreman lamang ng arkitekto ang binibigyan ng 'nakatagong' teknikal na blueprints. Ang mga blueprints na ito ang nagbibigay ng eksklusibong karapatan at kaalaman."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-24 bg-brand-light relative border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-brand-gold/30"></div>
              
              <div className="space-y-10 relative">
                {[
                  { title: "The Transformation", content: lang === 'en' ? <>Physical birth is insufficient for salvation. One must undergo a complete transformation, being "Born Again" of water and the Spirit (<ScriptureLink verse="John 3:5" onHover={handleHover}>John 3:5</ScriptureLink>).</> : <>Ang pisikal na kapanganakan ay hindi sapat. Dapat sumailalim sa muling pagsilang (<ScriptureLink verse="Juan 3:5" onHover={handleHover}>Juan 3:5</ScriptureLink>).</> },
                  { title: "The Process", content: <>This renewal requires true Baptism into the Church of Christ (<ScriptureLink verse="Matthew 16:18" onHover={handleHover}>Matt. 16:18</ScriptureLink>), signifying the death of the old self and the emergence of a "new creation."</> },
                  { title: "The Result", content: <>By entering the true Church, the individual legally becomes "Abraham's seed and heirs according to the promise" (<ScriptureLink verse="Galatians 3:29" onHover={handleHover}>Galatians 3:29</ScriptureLink>).</> }
                ].map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start"
                  >
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-white border-4 border-brand-gold flex items-center justify-center relative z-10 shadow-md ${idx === 2 ? 'bg-brand-gold' : ''}`}>
                      {idx === 2 ? <Check className="text-brand-dark h-8 w-8" /> : <span className="text-brand-blue font-bold text-xl">{idx + 1}</span>}
                    </div>
                    <div className="ml-6 pt-2">
                      <h4 className="text-xl font-bold text-gray-900">{step.title}</h4>
                      <div className="mt-2 text-gray-600">{step.content}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-brand-blue text-sm font-bold tracking-widest uppercase mb-2">Membership</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">Being Born Again</h3>
              <div className="w-24 h-1 bg-brand-gold mb-8"></div>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Entering the Book of Life is not determined by human lineage or earthly merit. It requires a profound spiritual rebirth.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                To claim the promise given in Eden and affirmed to Abraham, one must unite with the Singular Seed, Jesus Christ, by becoming a recognized member of His body. This ensures that the punishment of the lake of fire is averted through His ultimate sacrifice.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('baptism')}
                  className="inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest shadow-lg hover:bg-brand-dark transition-colors btn-glow"
                >
                  {lang === 'en' ? "Learn About Baptism" : "Alamin ang Tungkol sa Bautismo"}
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-white border-2 border-brand-blue text-brand-blue px-8 py-3 rounded-full font-bold uppercase tracking-widest shadow-md hover:bg-gray-50 transition-colors btn-glow"
                >
                  {lang === 'en' ? "Contact a Minister" : "Makipag-ugnayan sa Ministro"}
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path to Redemption Section */}
      <section id="redemption-path" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-brand-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-blue rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-brand-blue text-sm font-bold tracking-widest uppercase mb-2">{t.redemption_title}</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 font-serif">{t.redemption_subtitle}</h3>
            <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
          </div>

          <div className="relative">
            {/* Vertical Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold via-brand-blue to-brand-gold/20 transform -translate-x-1/2"></div>

            <div className="space-y-12 md:space-y-0">
              {[
                { icon: <Leaf className="h-6 w-6" />, title: t.path_step_1_title, desc: t.path_step_1_desc, scripture: "Luke 8:11" },
                { icon: <Flame className="h-6 w-6" />, title: t.path_step_2_title, desc: t.path_step_2_desc, scripture: "Romans 6:23" },
                { icon: <Scale className="h-6 w-6" />, title: t.path_step_3_title, desc: t.path_step_3_desc, scripture: "Ephesians 2:15" },
                { icon: <Users className="h-6 w-6" />, title: t.path_step_4_title, desc: t.path_step_4_desc, scripture: "Colossians 1:18" },
                { icon: <Droplets className="h-6 w-6" />, title: t.path_step_5_title, desc: t.path_step_5_desc, scripture: "Galatians 3:27" },
                { icon: <Cloud className="h-6 w-6" />, title: t.path_step_6_title, desc: t.path_step_6_desc, scripture: "Revelation 21:1-4" }
              ].map((step, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} md:py-12`}>
                  {/* Step Marker */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-brand-gold shadow-xl">
                    <span className="text-brand-blue font-bold">{index + 1}</span>
                  </div>

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`w-full md:w-[45%] p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
                  >
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div className="p-3 bg-brand-gold/10 rounded-lg text-brand-gold">
                        {step.icon}
                      </div>
                      <h4 className="text-2xl font-bold text-brand-blue">{step.title}</h4>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {step.desc}
                    </p>
                    <div className={`flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                      <span className="text-xs font-bold font-mono text-brand-gold bg-brand-gold/5 px-3 py-1 rounded-full border border-brand-gold/20">
                        <ScriptureLink verse={step.scripture} onHover={handleHover}>{step.scripture}</ScriptureLink>
                      </span>
                    </div>
                  </motion.div>

                  {/* Spacer for mobile */}
                  <div className="md:hidden h-8"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView('baptism')}
              className="px-10 py-4 bg-brand-blue text-white rounded-full font-bold uppercase tracking-widest shadow-xl hover:bg-brand-dark transition-all flex items-center gap-3 mx-auto btn-glow"
            >
              {lang === 'en' ? "Begin Your Journey" : "Simulan ang Iyong Paglalakbay"}
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 bg-brand-dark text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-brand-gold text-sm font-bold tracking-widest uppercase mb-2">{t.nav_mission}</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-serif">{t.mission_title}</h3>
            <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-blue/30 border border-brand-gold/20 p-8 rounded-xl backdrop-blur-sm"
            >
              <BookOpen className="text-brand-gold h-10 w-10 mb-6" />
              <h4 className="text-xl font-bold mb-3">{lang === 'en' ? "Sowing the Word" : "Paghahasik ng Salita"}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {lang === 'en' ? (
                  <>The mission continues today as Ministers actively propagate the gospel, sowing the Word of God—the spiritual Seed (<ScriptureLink verse="Luke 8:11" onHover={handleHover}>Luke 8:11</ScriptureLink>)—across the world.</>
                ) : (
                  <>Ang misyon ay nagpapatuloy sa paghahasik ng Salita ng Diyos—ang espirituwal na Binhi (<ScriptureLink verse="Lucas 8:11" onHover={handleHover}>Luc. 8:11</ScriptureLink>).</>
                )}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1.05 }}
              viewport={{ once: true }}
              className="bg-brand-blue/50 border border-brand-gold p-8 rounded-xl backdrop-blur-sm relative shadow-2xl"
            >
              <div className="absolute -top-5 right-5 bg-brand-gold text-brand-dark font-bold px-4 py-1 rounded-full text-sm">
                Good Ground
              </div>
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full border-8 border-gray-700 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0" style={{ background: 'conic-gradient(#D4AF37 0% 25%, transparent 25% 100%)' }}></div>
                  <span className="relative z-10 font-bold text-xl text-white drop-shadow-md">25%</span>
                </div>
              </div>
              <h4 className="text-xl font-bold mb-3 text-center text-brand-gold">The 25% Probability</h4>
              <p className="text-gray-300 text-sm leading-relaxed text-center">
                In the Parable of the Sower, only 1 in 4 types of soil represents "good ground." Only a portion of those who hear will persevere, believe, and undergo baptism.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-blue/30 border border-brand-gold/20 p-8 rounded-xl backdrop-blur-sm"
            >
              <Droplets className="text-brand-gold h-10 w-10 mb-6" />
              <h4 className="text-xl font-bold mb-3">Member Duties</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Those in the Church possess the duty to help "water" these seeds. This is fulfilled through spiritual guidance, offerings to support the Ministry, and the construction of magnificent Houses of Worship.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="md:flex">
              <div className="md:w-1/2 bg-brand-blue text-white p-12 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                  <Mail className="w-64 h-64" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4">Become Good Ground</h3>
                  <p className="text-gray-300 mb-8">
                    Are you seeking to hear the True Word? Connect with us to begin your journey towards the promise, finding your name written in the Book of Life.
                  </p>
                  <div className="flex items-center gap-4 text-brand-gold">
                    <MapPin className="h-5 w-5" />
                    <span>Find a local congregation</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-12">
                {submitStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <Check className="h-8 w-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      {lang === 'en' ? "Thank You" : "Salamat Po"}
                    </h4>
                    <p className="text-gray-600">
                      {lang === 'en' 
                        ? "Your inquiry has been received. A minister will be in contact shortly." 
                        : "Natanggap na ang iyong inquiry. Isang ministro ang makikipag-ugnayan sa iyo sa lalong madaling panahon."}
                    </p>
                    <button 
                      onClick={() => setSubmitStatus('idle')}
                      className="text-brand-blue font-bold uppercase tracking-widest text-xs hover:underline mt-4"
                    >
                      {lang === 'en' ? "Send another message" : "Magpadala ng isa pang mensahe"}
                    </button>
                  </motion.div>
                ) : (
                  <form 
                    onSubmit={handleInquirySubmit} 
                    className="space-y-6"
                  >
                    {submitStatus === 'error' && (
                      <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                        {lang === 'en' 
                          ? "There was an error sending your inquiry. Please try again later." 
                          : "Nagkaroon ng error sa pagpapadala. Pakisubukang muli mamaya."}
                      </div>
                    )}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        required 
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-3 px-4 bg-gray-50 focus:ring-brand-gold focus:border-brand-gold border disabled:opacity-50" 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        required 
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-3 px-4 bg-gray-50 focus:ring-brand-gold focus:border-brand-gold border disabled:opacity-50" 
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                      <textarea 
                        id="message" 
                        rows={4} 
                        disabled={isSubmitting}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-3 px-4 bg-gray-50 focus:ring-brand-gold focus:border-brand-gold border disabled:opacity-50"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold uppercase tracking-wider text-brand-dark bg-brand-gold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full animate-spin"></div>
                          {lang === 'en' ? "Sending..." : "Ipinapadala..."}
                        </span>
                      ) : t.contact_btn}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-16 border-t border-brand-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Sun className="text-brand-gold h-8 w-8" />
                <span className="text-2xl font-bold tracking-wider uppercase">The True Seed</span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                {t.footer_desc}
              </p>
            </div>
            <div>
              <h4 className="text-brand-gold font-bold uppercase tracking-widest mb-6">{lang === 'en' ? "Quick Links" : "Mabilis na Links"}</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {['theology', 'solution', 'history', 'authority', 'membership', 'mission'].map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} className="hover:text-brand-gold transition-colors">{t[`nav_${item}` as keyof typeof t]}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-brand-gold font-bold uppercase tracking-widest mb-6">{lang === 'en' ? "Resources" : "Mga Sanggunian"}</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><button onClick={() => openStudy()} className="hover:text-brand-gold transition-colors">{t.nav_study}</button></li>
                <li><button onClick={() => setView('baptism')} className="hover:text-brand-gold transition-colors">{t.nav_join}</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Iglesia ni Cristo - The True Seed. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Globe className="h-4 w-4 text-gray-500" />
              <MapPin className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </footer>

        </>
      )}

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <AnimatePresence>
          {scrolled && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 bg-brand-gold text-brand-dark rounded-full shadow-2xl hover:bg-yellow-400 transition-all hover:scale-110 active:scale-90 btn-glow"
              title="Back to Top"
            >
              <ArrowDown className="h-6 w-6 transform rotate-180" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'The True Seed',
                text: 'Explore the Divine Journey of the Church of Christ.',
                url: window.location.href,
              }).catch(console.error);
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }
          }}
          className="p-3 bg-brand-blue text-white rounded-full shadow-2xl hover:bg-brand-dark transition-all btn-glow"
          title="Share Website"
        >
          <Share2 className="h-6 w-6" />
        </motion.button>
      </div>
    </div>
  );
}
