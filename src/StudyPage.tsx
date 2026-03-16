import React, { useState, useEffect } from 'react';
import { 
  Book, 
  Scroll, 
  PenTool, 
  ShieldCheck, 
  Compass, 
  Zap, 
  Globe, 
  History, 
  Search, 
  ArrowLeft,
  X,
  ChevronRight,
  Clock,
  CheckCircle2,
  Scale,
  Users,
  Flame,
  Eye,
  Infinity,
  Heart,
  Tag,
  Droplets
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScriptureLink } from './scriptureData';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

interface Lesson {
  id: number;
  category: string;
  title: string;
  titleTl: string;
  icon: any;
  content: React.ReactNode;
  quiz?: Quiz;
}

function QuizComponent({ quiz, lang }: { quiz: Quiz, lang: 'en' | 'tl' }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);
    if (index === quiz.questions[currentQuestion].correctIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand-blue/5 border-2 border-brand-blue/20 rounded-2xl p-8 text-center"
      >
        <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <CheckCircle2 className="text-brand-dark h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold text-brand-blue mb-2">Quiz Complete!</h3>
        <p className="text-lg text-gray-600 mb-6">
          You scored <span className="font-bold text-brand-blue">{score}</span> out of <span className="font-bold text-brand-blue">{quiz.questions.length}</span>
        </p>
        <button 
          onClick={resetQuiz}
          className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold hover:bg-brand-dark transition-colors"
        >
          Retake Quiz
        </button>
      </motion.div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-brand-blue">Lesson Quiz: {quiz.title}</h3>
        <span className="text-sm font-bold text-gray-400">Question {currentQuestion + 1} of {quiz.questions.length}</span>
      </div>

      <div className="mb-8">
        <p className="text-lg font-medium text-gray-800 mb-6">{question.question}</p>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            let bgColor = "bg-white hover:border-brand-blue/50";
            let borderColor = "border-gray-200";
            let icon = null;

            if (showFeedback) {
              if (index === question.correctIndex) {
                bgColor = "bg-emerald-50";
                borderColor = "border-emerald-500";
                icon = <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
              } else if (index === selectedOption) {
                bgColor = "bg-rose-50";
                borderColor = "border-rose-500";
                icon = <X className="h-5 w-5 text-rose-500" />;
              }
            } else if (selectedOption === index) {
              borderColor = "border-brand-blue";
              bgColor = "bg-brand-blue/5";
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ${bgColor} ${borderColor}`}
              >
                <span className="font-medium">{option}</span>
                {icon}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
          >
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-bold text-brand-blue">Explanation:</span> {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {showFeedback && (
        <div className="flex justify-end">
          <button 
            onClick={nextQuestion}
            className="bg-brand-blue text-white px-8 py-2 rounded-full font-bold hover:bg-brand-dark transition-colors flex items-center gap-2"
          >
            {currentQuestion < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function StudyPage({ 
  onBack, 
  lang, 
  initialCategory = 'bible', 
  initialLessonId,
  onHover
}: { 
  onBack: (scrollToContact?: boolean) => void, 
  lang: 'en' | 'tl',
  initialCategory?: string,
  initialLessonId?: number,
  onHover: (verse: string | null, x: number, y: number) => void
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activeLesson, setActiveLesson] = useState(initialLessonId || 1);

  useEffect(() => {
    if (initialLessonId) {
      setActiveLesson(initialLessonId);
    }
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory, initialLessonId]);

  const categories = [
    { id: 'bible', name: lang === 'en' ? 'The Bible' : 'Ang Biblia', icon: Book, color: 'bg-brand-blue' },
    { id: 'god', name: lang === 'en' ? 'The True God' : 'Ang Tunay na Diyos', icon: Flame, color: 'bg-brand-gold' },
    { id: 'christ', name: lang === 'en' ? 'Jesus Christ' : 'Jesucristo', icon: Users, color: 'bg-brand-dark' },
    { id: 'messenger', name: lang === 'en' ? 'The Messenger' : 'Ang Sugo', icon: Scroll, color: 'bg-brand-blue' },
    { id: 'judgement', name: lang === 'en' ? 'Judgement Day' : 'Araw ng Paghuhukom', icon: Scale, color: 'bg-brand-gold' },
    // Future categories can be added here easily
  ];

  const lessons: Lesson[] = [
    {
      id: 1,
      category: 'bible',
      title: "The Revelation of the Word",
      titleTl: "Ang Pagkahayag ng mga Salita",
      icon: Zap,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en' 
              ? "God's words were not originated by man. He placed His words into the mouths of chosen prophets to speak to the people."
              : "Ang mga salita ng Diyos ay hindi nagmula sa tao. Inilagay Niya ang Kaniyang mga salita sa bibig ng mga piniling propeta upang salitain sa bayan."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-brand-blue/5 p-4 rounded-lg border-l-4 border-brand-gold">
              <span className="font-bold block mb-1">
                <ScriptureLink verse="Jeremiah 1:9" onHover={onHover}>Jeremiah 1:9</ScriptureLink>
              </span>
              <p className="text-sm italic">"Then the Lord put forth his hand, and touched my mouth. And the Lord said unto me, Behold, I have put my words in thy mouth."</p>
            </div>
            <div className="bg-brand-blue/5 p-4 rounded-lg border-l-4 border-brand-gold">
              <span className="font-bold block mb-1">
                <ScriptureLink verse="2 Peter 1:21" onHover={onHover}>2 Peter 1:21</ScriptureLink>
              </span>
              <p className="text-sm italic">"For the prophecy came not in old time by the will of man: but holy men of God spake as they were moved by the Holy Ghost."</p>
            </div>
          </div>
        </div>
      ),
      quiz: {
        title: "The Revelation of the Word",
        questions: [
          {
            question: "Where did God's words originate?",
            options: ["From the imagination of prophets", "From God Himself", "From ancient traditions", "From the Holy Ghost's own will"],
            correctIndex: 1,
            explanation: "God's words were not originated by man; He placed His words into the mouths of chosen prophets."
          },
          {
            question: "According to 2 Peter 1:21, how did holy men of God speak?",
            options: ["By their own wisdom", "By the will of man", "As they were moved by the Holy Ghost", "After years of study"],
            correctIndex: 2,
            explanation: "Prophecy came not by the will of man, but holy men spake as they were moved by the Holy Ghost."
          }
        ]
      }
    },
    {
      id: 2,
      category: 'bible',
      title: "The Writing of the Word",
      titleTl: "Ang Pagkasulat ng mga Salita",
      icon: PenTool,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "To preserve the message for future generations, God ordered His words to be inscribed. God Himself was the first to write on the two tablets of stone."
              : "Upang maingatan ang mensahe para sa susunod na salinlahi, ipinag-utos ng Diyos na isulat ang Kaniyang mga salita. Ang Diyos Mismo ang unang sumulat sa dalawang tapyas na bato."}
          </p>
          <ul className="space-y-4">
            <li className="bg-brand-blue/5 p-4 rounded-xl border border-brand-blue/10">
              <span className="font-bold block text-brand-blue mb-1">{lang === 'en' ? "The Ten Commandments" : "Ang Sampung Utos"}</span>
              <span className="text-sm">{lang === 'en' ? <>Written by the finger of God (<ScriptureLink verse="Deuteronomy 9:10" onHover={onHover}>Deuteronomy 9:10</ScriptureLink>)</> : <>Isinulat ng daliri ng Diyos (<ScriptureLink verse="Deuteronomy 9:10" onHover={onHover}>Deuteronomio 9:10</ScriptureLink>)</>}</span>
            </li>
            <li className="bg-brand-blue/5 p-4 rounded-xl border border-brand-blue/10">
              <span className="font-bold block text-brand-blue mb-1">{lang === 'en' ? "Moses' Command" : "Utos kay Moises"}</span>
              <span className="text-sm">{lang === 'en' ? <>Commanded to write in a book (<ScriptureLink verse="Exodus 34:27" onHover={onHover}>Exodus 34:27</ScriptureLink>)</> : <>Inutusan na isulat sa isang aklat (<ScriptureLink verse="Exodus 34:27" onHover={onHover}>Exodo 34:27</ScriptureLink>)</>}</span>
            </li>
            <li className="bg-brand-blue/5 p-4 rounded-xl border border-brand-blue/10">
              <span className="font-bold block text-brand-blue mb-1">{lang === 'en' ? "Prophetic Records" : "Tala ng mga Propeta"}</span>
              <span className="text-sm">{lang === 'en' ? <>Prophets like Jeremiah (<ScriptureLink verse="Jeremiah 30:2" onHover={onHover}>Jeremiah 30:2</ScriptureLink>)</> : <>Ang mga propeta gaya ni Jeremias (<ScriptureLink verse="Jeremiah 30:2" onHover={onHover}>Jeremias 30:2</ScriptureLink>)</>}</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      category: 'bible',
      title: "The Composition of the Bible",
      titleTl: "Ang mga Aklat sa Biblia",
      icon: ShieldCheck,
      content: (
        <div className="space-y-6">
          <div className="bg-brand-dark text-white p-6 rounded-xl shadow-inner">
            <div className="flex justify-around text-center">
              <div>
                <div className="text-4xl font-bold text-brand-gold">39</div>
                <div className="text-xs uppercase tracking-widest mt-1">Old Testament</div>
              </div>
              <div className="text-4xl font-light opacity-30">+</div>
              <div>
                <div className="text-4xl font-bold text-brand-gold">27</div>
                <div className="text-xs uppercase tracking-widest mt-1">New Testament</div>
              </div>
              <div className="text-4xl font-light opacity-30">=</div>
              <div>
                <div className="text-4xl font-bold text-brand-gold">66</div>
                <div className="text-xs uppercase tracking-widest mt-1">Inspired Books</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 italic">
            {lang === 'en'
              ? "The Apocrypha (14-15 books) were added 1,500 years later and are rejected as uninspired because they were never quoted by Christ or the Apostles."
              : "Ang Apocrypha (14-15 aklat) ay idinagdag makalipas ang 1,500 taon at tinatanggihan dahil hindi kailanman sinipi ni Cristo o ng mga Apostol."}
          </p>
        </div>
      )
    },
    {
      id: 4,
      category: 'bible',
      title: "Prophecy & Fulfilment",
      titleTl: "Hula at Katuparan",
      icon: History,
      content: (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-brand-blue text-white p-4 font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-gold" />
              {lang === 'en' ? "The Half Hour of Silence" : "Ang Kalahating Oras na Katahimikan"}
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm font-semibold">WW1 Ends (Armistice)</span>
                <span className="text-brand-blue font-mono">Nov 11, 1918</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm font-semibold">WW2 Begins</span>
                <span className="text-brand-blue font-mono">Sep 1, 1939</span>
              </div>
              <div className="bg-brand-gold/10 p-4 rounded-lg text-center">
                <div className="text-xs uppercase tracking-widest text-brand-blue font-bold">Time Elapsed</div>
                <div className="text-2xl font-bold text-brand-dark">20 Years, 9 Months, 20 Days</div>
                <p className="text-xs mt-2 text-gray-600">
                  {lang === 'en' 
                    ? <>In God's time (1000 years = 1 day), 1/2 hour is approx. 20 years and 10 months. History perfectly aligns with <ScriptureLink verse="Revelation 8:1" onHover={onHover}>Revelation 8:1</ScriptureLink>.</>
                    : <>Sa panahon ng Diyos (1000 taon = 1 araw), ang 1/2 oras ay humigit-kumulang 20 taon at 10 buwan. Ang kasaysayan ay perpektong tumutugma sa <ScriptureLink verse="Revelation 8:1" onHover={onHover}>Apocalipsis 8:1</ScriptureLink>.</>}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      category: 'bible',
      title: "Bible and Science",
      titleTl: "Biblia at Siyensiya",
      icon: Globe,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "Science changes as new data emerges, but the Word of God remains forever. The Bible stated scientific truths thousands of years before they were 'discovered'."
              : "Ang siyensiya ay nagbabago, ngunit ang Salita ng Diyos ay mananatili magpakailanman. Inihayag ng Biblia ang mga katotohanang siyentipiko libu-libong taon bago ito 'natuklasan'."}
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-brand-gold/20 p-2 rounded-lg"><Search className="h-5 w-5 text-brand-blue" /></div>
              <div>
                <span className="font-bold block"><ScriptureLink verse="Isaiah 40:22" onHover={onHover}>Isaiah 40:22</ScriptureLink> (700 B.C.)</span>
                <p className="text-sm text-gray-600">"It is he that sitteth upon the circle of the earth..." (Round Earth)</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-brand-gold/20 p-2 rounded-lg"><Search className="h-5 w-5 text-brand-blue" /></div>
              <div>
                <span className="font-bold block"><ScriptureLink verse="Job 26:7" onHover={onHover}>Job 26:7</ScriptureLink> (Ancient)</span>
                <p className="text-sm text-gray-600">"...and hangeth the earth upon nothing." (Gravity/Space)</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      category: 'bible',
      title: "The Five Creations & The New Man",
      titleTl: "Ang Limang Paglalang at ang Bagong Tao",
      icon: Users,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "God's creative work with humanity spans five distinct stages, culminating in the spiritual rebirth of the 'One New Man'."
              : "Ang paglalang ng Diyos sa sangkatauhan ay may limang yugto, na nagtatapos sa espirituwal na muling pagsilang ng 'Isang Taong Bago'."}
          </p>
          
          <div className="space-y-4">
            {[
              { id: 1, name: lang === 'en' ? "Adam" : "Adan", desc: lang === 'en' ? "From the dust (Physical)" : "Mula sa alabok (Pisikal)" },
              { id: 2, name: lang === 'en' ? "Eve" : "Eva", desc: lang === 'en' ? "From Adam's rib" : "Mula sa tadyang ni Adan" },
              { id: 3, name: lang === 'en' ? "Humanity" : "Sangkatauhan", desc: lang === 'en' ? "Natural birth (Marriage)" : "Natural na kapanganakan" },
              { id: 4, name: lang === 'en' ? "Christ" : "Cristo", desc: lang === 'en' ? "Holy Spirit in Mary" : "Espiritu Santo kay Maria" },
              { id: 5, name: lang === 'en' ? "The New Man" : "Ang Bagong Tao", desc: lang === 'en' ? "Born Again (Water & Spirit)" : "Muling Pagsilang (Tubig at Espiritu)" }
            ].map((s) => (
              <div key={s.id} className="flex items-center gap-4 bg-brand-blue/5 p-3 rounded-xl border border-brand-blue/10">
                <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center font-bold text-xs">{s.id}</div>
                <div>
                  <div className="font-bold text-sm">{s.name}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-dark text-white p-6 rounded-2xl border border-brand-gold/30">
            <h4 className="text-brand-gold font-bold mb-2 flex items-center gap-2">
              <Scale size={18} />
              {lang === 'en' ? "Legal Satisfaction" : "Legal na Katuparan"}
            </h4>
            <p className="text-sm text-gray-300">
              {lang === 'en'
                ? "The law (Deut. 24:16) requires each to die for their own sin. By creating the 'One New Man' (Eph. 2:15)—Christ as Head and Church as Body—Jesus could legally pay the debt for His members."
                : "Ang batas (Deut. 24:16) ay humihingi ng kamatayan para sa sariling sala. Sa paglalang sa 'Isang Taong Bago' (Efe. 2:15), legal na nabayaran ni Cristo ang utang ng Kaniyang mga kaanib."}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 7,
      category: 'god',
      title: "The True God",
      titleTl: "Ang Tunay na Diyos",
      icon: Flame,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "The Bible teaches that there is only one true God: the Father. This fundamental truth distinguishes the true faith from various doctrines like the Trinity or Oneness."
              : "Itinatadhana ng Biblia na iisa lamang ang tunay na Diyos: ang Ama. Ang katotohanang ito ang nagbubukod sa tunay na pananampalataya mula sa mga aral gaya ng Trinidad."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-brand-blue/5 p-4 rounded-lg border-l-4 border-brand-gold">
              <span className="font-bold block mb-1">John 17:3</span>
              <p className="text-sm italic">"And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent."</p>
            </div>
            <div className="bg-brand-blue/5 p-4 rounded-lg border-l-4 border-brand-gold">
              <span className="font-bold block mb-1">1 Corinthians 8:6</span>
              <p className="text-sm italic">"But to us there is but one God, the Father, of whom are all things, and we in him..."</p>
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <h4 className="text-red-800 font-bold text-sm mb-2 uppercase tracking-wider">Common Misconceptions</h4>
            <div className="text-xs text-red-700 space-y-2">
              <div className="p-2 bg-white/50 rounded border border-red-200/50">{lang === 'en' ? "Trinity: Three persons in one God (Not in Bible)" : "Trinidad: Tatlong persona sa isang Diyos (Wala sa Biblia)"}</div>
              <div className="p-2 bg-white/50 rounded border border-red-200/50">{lang === 'en' ? "Oneness: Father, Son, and Spirit are the same person" : "Oneness: Ang Ama, Anak, at Espiritu ay iisang persona"}</div>
              <div className="p-2 bg-white/50 rounded border border-red-200/50">{lang === 'en' ? <>Jesus as the only God: Contradicts his own words in <ScriptureLink verse="John 17:3" onHover={onHover}>John 17:3</ScriptureLink></> : <>Jesus bilang tanging Diyos: Salungat sa kaniyang sinabi sa <ScriptureLink verse="John 17:3" onHover={onHover}>Juan 17:3</ScriptureLink></>}</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      category: 'god',
      title: "The Nature of God",
      titleTl: "Ang Likas na Kalagayan ng Diyos",
      icon: Eye,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "God is Spirit. He does not have a physical body of flesh and bones, which makes Him invisible to human eyes but present everywhere."
              : "Ang Diyos ay Espiritu. Siya ay walang pisikal na katawan na may laman at buto, kaya Siya ay hindi nakikita ng mata ng tao ngunit naroroon sa lahat ng dako."}
          </p>
          <div className="bg-brand-blue/5 p-6 rounded-2xl border border-brand-blue/10 flex items-start gap-4">
            <div className="bg-brand-gold p-3 rounded-full text-brand-dark"><Zap size={24} /></div>
            <div>
              <h4 className="font-bold text-brand-blue"><ScriptureLink verse="Luke 24:39" onHover={onHover}>Luke 24:39</ScriptureLink></h4>
              <p className="text-sm italic text-gray-600">"...for a spirit hath not flesh and bones, as ye see me have."</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="text-brand-gold font-bold text-xs uppercase mb-1">Attribute</div>
              <div className="font-bold">Invisible</div>
              <div className="text-[10px] text-gray-400"><ScriptureLink verse="1 Timothy 1:17" onHover={onHover}>1 Timothy 1:17</ScriptureLink></div>
            </div>
            <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="text-brand-gold font-bold text-xs uppercase mb-1">Attribute</div>
              <div className="font-bold">Spirit</div>
              <div className="text-[10px] text-gray-400"><ScriptureLink verse="John 4:24" onHover={onHover}>John 4:24</ScriptureLink></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      category: 'god',
      title: "Attributes of the True God",
      titleTl: "Ang mga Katangian ng Tunay na Diyos",
      icon: Infinity,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "The true God possesses unique attributes that no other being can claim. He is the Almighty Creator who is eternal and unchanging."
              : "Ang tunay na Diyos ay nagtataglay ng mga katangiang walang ibang nilalang ang makakaangkin. Siya ang Makapangyarihang Maylalang na walang hanggan at hindi nagbabago."}
          </p>
          <div className="space-y-3">
            {[
              { label: lang === 'en' ? "Omnipotent" : "Makapangyarihan", desc: lang === 'en' ? "Almighty God (Gen. 35:11)" : "Makapangyarihan sa lahat (Gen. 35:11)" },
              { label: lang === 'en' ? "Omnipresent" : "Nasa lahat ng dako", desc: lang === 'en' ? "Present in all (Eph. 4:6)" : "Sumasa lahat (Efe. 4:6)" },
              { label: lang === 'en' ? "Omniscient" : "Nakaaalam ng lahat", desc: lang === 'en' ? "All-knowing (1 John 3:20)" : "Nalalaman ang lahat (1 Juan 3:20)" },
              { label: lang === 'en' ? "Eternal" : "Walang hanggan", desc: lang === 'en' ? "No beginning or end (Ps. 90:2)" : "Walang pasimula o hanggan (Awit 90:2)" }
            ].map((attr, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="font-bold text-brand-blue">{attr.label}</span>
                <span className="text-xs text-gray-500 italic">{attr.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 10,
      category: 'god',
      title: "Incomparable Character",
      titleTl: "Walang Kapantay na Katangian",
      icon: Heart,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "Beyond His power, God's character is defined by perfect justice, mercy, and faithfulness. He is a righteous judge who remains true to His promises."
              : "Higit sa Kaniyang kapangyarihan, ang katangian ng Diyos ay binubuo ng perpektong katarungan, awa, at katapatan. Siya ay matuwid na hukom na tapat sa Kaniyang mga pangako."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20">
              <h4 className="font-bold text-brand-dark mb-1">{lang === 'en' ? "Just & Merciful" : "Matuwid at Maawain"}</h4>
              <p className="text-xs text-gray-600">Exodus 34:6-7 - God is abundant in goodness but will by no means clear the guilty.</p>
            </div>
            <div className="p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20">
              <h4 className="font-bold text-brand-dark mb-1">{lang === 'en' ? "Faithful" : "Tapat"}</h4>
              <p className="text-xs text-gray-600">Isaiah 54:10 - His covenant of peace shall not be removed.</p>
            </div>
          </div>
          <div className="text-center p-4 italic text-gray-500 border-t border-gray-100">
            {lang === 'en' ? "God's love is balanced by His absolute justice." : "Ang pag-ibig ng Diyos ay balanse ng Kaniyang ganap na katarungan."}
          </div>
        </div>
      )
    },
    {
      id: 11,
      category: 'god',
      title: "The Names of God",
      titleTl: "Ang mga Pangalan ng Diyos",
      icon: Tag,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "God revealed Himself through various names and titles in the Bible. Understanding these names helps us worship Him correctly and address Him with reverence."
              : "Ipinakilala ng Diyos ang Kaniyang sarili sa pamamagitan ng iba't ibang pangalan at titulo sa Biblia. Ang pag-unawa sa mga ito ay tumutulong sa atin na sambahin Siya nang wasto."}
          </p>
          <div className="space-y-4">
            <div className="bg-brand-dark text-white p-5 rounded-xl">
              <div className="text-brand-gold text-xs uppercase tracking-widest mb-2">Primary Name</div>
              <div className="text-2xl font-bold italic">"I AM THAT I AM"</div>
              <div className="text-xs opacity-60 mt-1"><ScriptureLink verse="Exodus 3:14" onHover={onHover}>Exodus 3:13-14</ScriptureLink></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <div className="text-[10px] text-brand-gold font-bold">Hebrew</div>
                <div className="font-bold">El Shaddai</div>
                <div className="text-[10px] text-gray-400">God Almighty</div>
              </div>
              <div className="p-3 bg-white border border-gray-200 rounded-lg">
                <div className="text-[10px] text-brand-gold font-bold">Hebrew</div>
                <div className="font-bold">Adonai</div>
                <div className="text-[10px] text-gray-400">Lord / Master</div>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-xs text-yellow-800 italic">
              {lang === 'en' 
                ? "Note: The name 'Jehovah' is a 16th-century hybrid pronunciation and not the original biblical name." 
                : "Nota: Ang pangalang 'Jehova' ay isang 16th-century hybrid na bigkas at hindi ang orihinal na pangalan sa Biblia."}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 12,
      category: 'christ',
      title: "Christ is Truly Man",
      titleTl: "Si Cristo ay Tunay na Tao",
      icon: Users,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "The Bible explicitly teaches that Jesus Christ is a man. While many believe He is God, the scriptures distinguish between the True God (who is not man) and Christ (who is man)."
              : "Malinaw na itinuturo ng Biblia na si Jesucristo ay tao. Bagaman marami ang naniniwala na Siya ay Diyos, ang kasulatan ay nagbubukod sa Tunay na Diyos (na hindi tao) at kay Cristo (na tao)."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-brand-blue/5 p-4 rounded-lg border-l-4 border-brand-gold">
              <span className="font-bold block mb-1"><ScriptureLink verse="John 8:40" onHover={onHover}>John 8:40</ScriptureLink></span>
              <p className="text-sm italic">"But now ye seek to kill me, a man that hath told you the truth..."</p>
            </div>
            <div className="bg-brand-blue/5 p-4 rounded-lg border-l-4 border-brand-gold">
              <span className="font-bold block mb-1"><ScriptureLink verse="1 Timothy 2:5" onHover={onHover}>1 Timothy 2:5</ScriptureLink></span>
              <p className="text-sm italic">"For there is one God, and one mediator between God and men, the man Christ Jesus."</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h4 className="font-bold text-sm mb-2 uppercase tracking-wider text-brand-blue">Key Distinction</h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-brand-gold">The True God</div>
                <p>Is NOT a man (<ScriptureLink verse="Hosea 11:9" onHover={onHover}>Hosea 11:9</ScriptureLink>)</p>
                <p>Is Spirit (<ScriptureLink verse="John 4:24" onHover={onHover}>John 4:24</ScriptureLink>)</p>
              </div>
              <div className="space-y-1">
                <div className="font-bold text-brand-gold">Jesus Christ</div>
                <p>IS a man (<ScriptureLink verse="John 8:40" onHover={onHover}>John 8:40</ScriptureLink>)</p>
                <p>Has flesh and bones (<ScriptureLink verse="Luke 24:39" onHover={onHover}>Luke 24:39</ScriptureLink>)</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 13,
      category: 'christ',
      title: "The Human Experiences of Jesus",
      titleTl: "Ang mga Karanasan ni Jesus bilang Tao",
      icon: Heart,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "Jesus Christ experienced everything that a human being does—physical needs, emotions, and even death. These experiences prove His true human nature."
              : "Naranasan ni Jesucristo ang lahat ng nararanasan ng isang tao—mga pisikal na pangangailangan, emosyon, at maging ang kamatayan. Ang mga karanasang ito ay nagpapatunay sa Kaniyang tunay na pagkatao."}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: lang === 'en' ? "Hungry" : "Nagutom", ref: <ScriptureLink verse="Matthew 4:2" onHover={onHover}>Mat. 4:2</ScriptureLink> },
              { label: lang === 'en' ? "Thirsty" : "Nauhaw", ref: <ScriptureLink verse="John 19:28" onHover={onHover}>John 19:28</ScriptureLink> },
              { label: lang === 'en' ? "Tired" : "Napagod", ref: <ScriptureLink verse="John 4:6" onHover={onHover}>John 4:6</ScriptureLink> },
              { label: lang === 'en' ? "Slept" : "Natulog", ref: <ScriptureLink verse="Matthew 8:24" onHover={onHover}>Mat. 8:24</ScriptureLink> },
              { label: lang === 'en' ? "Wept" : "Tumangis", ref: <ScriptureLink verse="John 11:35" onHover={onHover}>John 11:35</ScriptureLink> },
              { label: lang === 'en' ? "Died" : "Namatay", ref: <ScriptureLink verse="Matthew 27:50" onHover={onHover}>Mat. 27:50</ScriptureLink> }
            ].map((exp, i) => (
              <div key={i} className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm text-center">
                <div className="font-bold text-brand-blue text-sm">{exp.label}</div>
                <div className="text-[10px] text-gray-400">{exp.ref}</div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-brand-gold/5 rounded-xl border border-brand-gold/20 italic text-sm text-center">
            {lang === 'en' 
              ? "God cannot die, but Christ died. This is a fundamental difference in their nature." 
              : "Ang Diyos ay hindi namamatay, ngunit si Cristo ay namatay. Ito ay isang pangunahing pagkakaiba sa kanilang kalikasan."}
          </div>
        </div>
      )
    },
    {
      id: 14,
      category: 'christ',
      title: "Christ vs. The True God",
      titleTl: "Si Cristo laban sa Tunay na Diyos",
      icon: Scale,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "Scripture highlights many differences between the Father (the True God) and Jesus Christ. If they were the same, they would share the same attributes, but the Bible shows they do not."
              : "Binibigyang-diin ng Kasulatan ang maraming pagkakaiba sa pagitan ng Ama (ang Tunay na Diyos) at ni Jesucristo. Kung sila ay iisa, magtataglay sila ng parehong katangian, ngunit ipinapakita ng Biblia na hindi."}
          </p>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500">
                <tr>
                  <th className="px-4 py-3">Attribute</th>
                  <th className="px-4 py-3">The True God</th>
                  <th className="px-4 py-3">Jesus Christ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-bold">Knowledge</td>
                  <td className="px-4 py-3">Knows all (<ScriptureLink verse="1 John 3:20" onHover={onHover}>1 John 3:20</ScriptureLink>)</td>
                  <td className="px-4 py-3">Limited (<ScriptureLink verse="Mark 13:32" onHover={onHover}>Mark 13:32</ScriptureLink>)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold">Nature</td>
                  <td className="px-4 py-3">Spirit (John 4:24)</td>
                  <td className="px-4 py-3">Flesh/Bones (Luke 24:39)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold">Origin</td>
                  <td className="px-4 py-3">No beginning (Ps. 90:2)</td>
                  <td className="px-4 py-3">Created/Born (Mat. 1:18)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold">Life</td>
                  <td className="px-4 py-3">Immortal (1 Tim. 1:17)</td>
                  <td className="px-4 py-3">Mortal (Mat. 27:50)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 15,
      category: 'christ',
      title: "The Source of Christ's Authority",
      titleTl: "Ang Pinagmulan ng Karapatan ni Cristo",
      icon: Zap,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "All the power, titles, and glory that Jesus Christ possesses were given to Him by God the Father. He did not possess them inherently as God, but received them as a reward for His obedience."
              : "Ang lahat ng kapangyarihan, titulo, at kaluwalhatian na taglay ni Jesucristo ay ibinigay sa Kaniya ng Diyos Ama. Hindi Niya ito tinaglay nang likas bilang Diyos, kundi tinanggap bilang gantimpala sa Kaniyang pagsunod."}
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/10">
              <div className="text-brand-gold font-bold text-xs uppercase mb-1">Power & Authority</div>
              <p className="text-sm italic">"All power is given unto me in heaven and in earth." (Matthew 28:18)</p>
            </div>
            <div className="p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/10">
              <div className="text-brand-gold font-bold text-xs uppercase mb-1">Exaltation</div>
              <p className="text-sm italic">"Wherefore God also hath highly exalted him, and given him a name which is above every name." (Philippians 2:9)</p>
            </div>
            <div className="p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/10">
              <div className="text-brand-gold font-bold text-xs uppercase mb-1">The Mediator</div>
              <p className="text-sm italic">"For there is one God, and one mediator between God and men, the man Christ Jesus." (1 Timothy 2:5)</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 16,
      category: 'messenger',
      title: "Ends of the Earth",
      titleTl: "Mga Wakas ng Lupa",
      icon: Clock,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "The 'ends of the earth' refers to a specific time period in biblical prophecy, marking the beginning of the opportunity for salvation in the last days."
              : "Ang 'mga wakas ng lupa' ay tumutukoy sa isang tiyak na yugto ng panahon sa hula ng Biblia, na nagmamarka ng simula ng pagkakataon para sa kaligtasan sa mga huling araw."}
          </p>
          <div className="bg-brand-blue/5 p-6 rounded-2xl border border-brand-blue/10">
            <h4 className="font-bold text-brand-blue mb-2"><ScriptureLink verse="Isaiah 43:5" onHover={onHover}>Isaiah 43:5-6</ScriptureLink></h4>
            <p className="text-sm italic text-gray-600">"...bring my sons from far, and my daughters from the ends of the earth;"</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="text-brand-gold font-bold text-xs uppercase mb-1">Prophetic Sign</div>
              <div className="font-bold">July 27, 1914</div>
              <p className="text-xs text-gray-500 mt-1">The outbreak of WWI (<ScriptureLink verse="Matthew 24:6" onHover={onHover}>Mat. 24:6-7</ScriptureLink>) marks the beginning of this period.</p>
            </div>
            <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="text-brand-gold font-bold text-xs uppercase mb-1">The Seven Seals</div>
              <div className="font-bold">The 7th Seal</div>
              <p className="text-xs text-gray-500 mt-1">The opening of the 7th seal (<ScriptureLink verse="Revelation 8:1" onHover={onHover}>Rev 8:1</ScriptureLink>) coincides with the 'ends of the earth'.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 17,
      category: 'messenger',
      title: "The Authority to Preach",
      titleTl: "Ang Karapatan sa Pangaral",
      icon: ShieldCheck,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "Not everyone who uses the Bible has the authority to preach. True preachers must be 'sent' by God to reveal the mysteries of the gospel."
              : "Hindi lahat ng gumagamit ng Biblia ay may karapatang mangaral. Ang mga tunay na mangangaral ay dapat 'sinugo' ng Diyos upang ihayag ang mga hiwaga ng ebanghelyo."}
          </p>
          <div className="bg-brand-gold/5 p-6 rounded-2xl border border-brand-gold/20 flex items-start gap-4">
            <div className="bg-brand-blue p-3 rounded-full text-brand-gold"><Zap size={24} /></div>
            <div>
              <h4 className="font-bold text-brand-blue">Romans 10:15</h4>
              <p className="text-sm italic text-gray-600">"And how shall they preach, except they be sent?"</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <span className="font-bold block text-brand-blue mb-1">{lang === 'en' ? "Secret Knowledge" : "Lihim na Kaalaman"}</span>
              <p className="text-xs text-gray-600">Mark 4:11 - The secret of the kingdom of God is given only to those sent by God.</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <span className="font-bold block text-brand-blue mb-1">{lang === 'en' ? "The Mystery Revealed" : "Ang Hiwagang Inihayag"}</span>
              <p className="text-xs text-gray-600">Ephesians 1:9 - God enables His messengers to know the things He planned secretly.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 18,
      category: 'messenger',
      title: "The Messenger from the East",
      titleTl: "Ang Sugo mula sa Silangan",
      icon: Compass,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "Prophecy speaks of a messenger sent from the 'Far East' to bring salvation in the last days. This was fulfilled in the mission of Brother Felix Y. Manalo."
              : "Nagsasalita ang hula tungkol sa isang sugo na mula sa 'Malayong Silangan' upang magdala ng kaligtasan sa mga huling araw. Ito ay natupad sa misyon ng Kapatid na Felix Y. Manalo."}
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 items-start bg-brand-blue/5 p-4 rounded-xl">
              <div className="bg-brand-gold/20 p-2 rounded-lg"><Search className="h-5 w-5 text-brand-blue" /></div>
              <div>
                <span className="font-bold block">Revelation 7:2-3</span>
                <p className="text-sm text-gray-600">"And I saw another angel ascending from the east, having the seal of the living God..."</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-brand-blue/5 p-4 rounded-xl">
              <div className="bg-brand-gold/20 p-2 rounded-lg"><Search className="h-5 w-5 text-brand-blue" /></div>
              <div>
                <span className="font-bold block">Isaiah 46:11</span>
                <p className="text-sm text-gray-600">"Calling a bird of prey from the east, the man of my choice from a distant land..."</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">
            {lang === 'en'
              ? "Brother Felix Manalo began preaching the Church of Christ in the Philippines in 1914, coinciding with the 'ends of the earth'."
              : "Nagsimulang mangaral ang Kapatid na Felix Manalo ng Iglesia ni Cristo sa Pilipinas noong 1914, kasabay ng 'mga wakas ng lupa'."}
          </p>
        </div>
      )
    },
    {
      id: 19,
      category: 'messenger',
      title: "True Religion",
      titleTl: "Ang Tunay na Relihiyon",
      icon: Heart,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "True religion is the way to return to God and fulfill the original purpose of man: to fear God and keep His commandments."
              : "Ang tunay na relihiyon ang paraan upang magbalik sa Diyos at matupad ang orihinal na layunin ng tao: ang matakot sa Diyos at sundin ang Kaniyang mga utos."}
          </p>
          <div className="bg-brand-dark text-white p-6 rounded-2xl border border-brand-gold/30">
            <h4 className="text-brand-gold font-bold mb-2 flex items-center gap-2">
              <Scale size={18} />
              {lang === 'en' ? "The Whole Duty of Man" : "Ang Buong Katungkulan ng Tao"}
            </h4>
            <p className="text-sm text-gray-300 italic">
              "Fear God, and keep his commandments: for this is the whole duty of man." — <ScriptureLink verse="Ecclesiastes 12:13" onHover={onHover}>Ecclesiastes 12:13</ScriptureLink>
            </p>
          </div>
          <div className="bg-brand-blue/5 p-4 rounded-xl border border-brand-blue/10">
            <p className="text-sm text-gray-700">
              {lang === 'en'
                ? "Sin destroyed the true essence of man. To be restored in the sight of God, one must belong to the true religion and obey His ordinances."
                : "Sinira ng kasalanan ang tunay na esensya ng tao. Upang maibalik sa paningin ng Diyos, ang isa ay dapat mapabilang sa tunay na relihiyon at sumunod sa Kaniyang mga utos."}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 20,
      category: 'judgement',
      title: "The Last Trumpet",
      titleTl: "Ang Huling Pagtunog ng Pakakak",
      icon: Zap,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "The sounding of the last trumpet marks the end of man's time on earth and the beginning of the Day of Judgment. It is the moment of salvation for the faithful."
              : "Ang pagtunog ng huling pakakak ang nagtatanda ng wakas ng panahon ng tao sa lupa at ang simula ng Araw ng Paghuhukom. Ito ang sandali ng kaligtasan para sa mga tapat."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-brand-blue/5 p-4 rounded-lg border-l-4 border-brand-gold">
              <span className="font-bold block mb-1">1 Thessalonians 4:16-17</span>
              <p className="text-sm italic">
                {lang === 'en'
                  ? "For the Lord himself shall descend from heaven with a shout... and the dead in Christ shall rise first."
                  : "Sapagka't ang Panginoon din ang bababang mula sa langit, na may isang sigaw... at ang nangamatay kay Cristo ay unang mangabubuhay na maguli."}
              </p>
            </div>
            <div className="bg-brand-blue/5 p-4 rounded-lg border-l-4 border-brand-gold">
              <span className="font-bold block mb-1">Revelation 20:6</span>
              <p className="text-sm italic">
                {lang === 'en'
                  ? "Blessed and holy is he that hath part in the first resurrection: on such the second death hath no power."
                  : "Mapalad at banal ang makalakip sa unang pagkabuhay na maguli: sa mga ito'y walang kapangyarihan ang ikalawang kamatayan."}
              </p>
            </div>
          </div>
          <div className="bg-brand-dark text-white p-6 rounded-2xl">
            <h4 className="text-brand-gold font-bold mb-2">{lang === 'en' ? "The Book of Life" : "Ang Aklat ng Buhay"}</h4>
            <p className="text-sm text-gray-300">
              {lang === 'en'
                ? "Only those whose names are written in the Book of Life will be saved from the lake of fire. The record of the Church on earth is the counterpart of the record in heaven."
                : "Ang mga nakasulat lamang sa Aklat ng Buhay ang maliligtas sa dagat-dagatang apoy. Ang talaan ng Iglesia sa lupa ay ang counterpart ng talaan sa langit."}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 21,
      category: 'judgement',
      title: "The Great Judgment",
      titleTl: "Ang Dakilang Paghuhukom",
      icon: Scale,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "The Day of Judgment is when all men will face the court of God. The dead will be raised to receive their sentence based on their deeds."
              : "Ang Araw ng Paghuhukom ay ang panahon na ang lahat ng tao ay haharap sa hukuman ng Diyos. Ang mga patay ay bubuhayin upang tanggapin ang kanilang hatol batay sa kanilang mga gawa."}
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <span className="font-bold block text-brand-blue mb-1">Revelation 20:12</span>
              <p className="text-sm text-gray-600">
                {lang === 'en'
                  ? "And I saw the dead, small and great, stand before God; and the books were opened..."
                  : "At nakita ko ang mga patay, malalaki at maliliit, na nangakatayo sa harapan ng luklukan; at nangabuksan ang mga aklat..."}
              </p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <span className="font-bold block text-brand-blue mb-1"><ScriptureLink verse="Romans 2:16" onHover={onHover}>Romans 2:16</ScriptureLink></span>
              <p className="text-sm text-gray-600">
                {lang === 'en'
                  ? "In the day when God shall judge the secrets of men by Jesus Christ according to my gospel."
                  : "Sa araw na hahatulan ng Dios ang mga lihim ng mga tao, ayon sa aking evangelio, sa pamamagitan ni Jesucristo."}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">
            {lang === 'en'
              ? "The judgment will be based on the Gospel or the Bible. Those who entered Christ will be saved, while those outside will face judgment."
              : "Ang paghuhukom ay ibabatay sa Ebanghelyo o sa Biblia. Ang mga pumasok kay Cristo ay maliligtas, habang ang mga nasa labas ay haharap sa paghuhukom."}
          </p>
        </div>
      )
    },
    {
      id: 22,
      category: 'judgement',
      title: "The Book of Deeds",
      titleTl: "Ang Aklat ng mga Gawa",
      icon: Scroll,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "Every hidden work, whether good or evil, is recorded in God's books. Nothing is hidden from His sight, and everything will be revealed on that day."
              : "Bawat gawang inilihim, maging mabuti o masama, ay nakatala sa mga aklat ng Diyos. Walang natatago sa Kaniyang paningin, at ang lahat ay maihahayag sa araw na iyon."}
          </p>
          <div className="bg-brand-blue/5 p-6 rounded-2xl border border-brand-blue/10">
            <h4 className="font-bold text-brand-blue mb-3">{lang === 'en' ? "Judgment of Secrets" : "Paghuhukom sa mga Lihim"}</h4>
            <p className="text-gray-700 leading-relaxed">
              {lang === 'en'
                ? "God will judge the secrets of men. Even those who did not hear the preached gospel will be judged based on the law written in their hearts and their conscience."
                : "Hahatulan ng Diyos ang mga lihim ng mga tao. Maging ang mga hindi nakarinig ng ipinangaral na ebanghelyo ay hahatulan batay sa kautusang nakasulat sa kanilang mga puso at sa kanilang budhi."}
            </p>
            <div className="mt-4 pt-4 border-t border-brand-blue/10">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest"><ScriptureLink verse="Romans 2:12" onHover={onHover}>Romans 2:12, 15</ScriptureLink></span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 23,
      category: 'judgement',
      title: "Assurance of Salvation",
      titleTl: "Katiyakan ng Kaligtasan",
      icon: CheckCircle2,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "Those whose names are written in the Book of Life should rejoice and remain steadfast. Their labor in the gospel is not in vain."
              : "Ang mga may pangalan na nakasulat sa Aklat ng Buhay ay dapat magalak at manatiling matatag. Ang kanilang pagpapagal sa ebanghelyo ay hindi mawawalan ng kabuluhan."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="bg-brand-gold/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-brand-gold h-5 w-5" />
              </div>
              <h5 className="font-bold mb-2">{lang === 'en' ? "Rejoice" : "Magalak"}</h5>
              <p className="text-sm text-gray-600">
                {lang === 'en'
                  ? "Rejoice because your names are written in heaven."
                  : "Mangagalak kayo na ang inyong mga pangalan ay nangasusulat sa langit."}
              </p>
              <span className="text-[10px] font-bold mt-auto pt-4 text-brand-blue">Luke 10:20</span>
            </div>
            <div className="flex flex-col p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="bg-brand-blue/10 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="text-brand-blue h-5 w-5" />
              </div>
              <h5 className="font-bold mb-2">{lang === 'en' ? "Overcome" : "Magtagumpay"}</h5>
              <p className="text-sm text-gray-600">
                {lang === 'en'
                  ? "He that overcometh shall be clothed in white raiment; and I will not blot out his name out of the book of life."
                  : "Ang magtagumpay ay daramtang gayon ng mga mapuputing damit; at hindi ko papawiin sa anomang paraan ang kaniyang pangalan sa aklat ng buhay."}
              </p>
              <span className="text-[10px] font-bold mt-auto pt-4 text-brand-blue">Revelation 3:5</span>
            </div>
          </div>
          <div className="bg-brand-dark text-white p-6 rounded-2xl text-center">
            <p className="text-sm italic mb-2">"Watch therefore: for ye know not what hour your Lord doth come."</p>
            <span className="text-brand-gold font-bold text-xs uppercase tracking-widest">Matthew 24:42</span>
          </div>
        </div>
      )
    },
    {
      id: 24,
      category: 'judgement',
      title: "The Holy Supper",
      titleTl: "Ang Banal na Hapunan",
      icon: Droplets,
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "The Holy Supper is a divine ordinance established by Christ for the cleansing of the Church and the forgiveness of sins."
              : "Ang Banal na Hapunan ay isang banal na tuntunin na itinatag ni Cristo para sa paglilinis ng Iglesia at sa kapatawaran ng mga kasalanan."}
          </p>
          <div className="bg-brand-blue/5 p-6 rounded-2xl border-l-4 border-brand-blue">
            <h4 className="font-bold text-brand-blue mb-2">{lang === 'en' ? "Judgment in the House of God" : "Paghuhukom sa Bahay ng Diyos"}</h4>
            <p className="text-sm text-gray-700">
              {lang === 'en'
                ? "Judgment begins in the house of God. The Holy Supper serves as a time for self-examination to avoid being judged with the world."
                : "Ang paghuhukom ay nagsisimula sa bahay ng Diyos. Ang Banal na Hapunan ay nagsisilbing panahon para sa pagsisiyasat sa sarili upang huwag mahatulan kasama ng sanlibutan."}
            </p>
            <div className="mt-4 flex gap-4">
              <span className="text-[10px] font-bold text-brand-gold"><ScriptureLink verse="1 Peter 4:17" onHover={onHover}>1 Peter 4:17</ScriptureLink></span>
              <span className="text-[10px] font-bold text-brand-gold"><ScriptureLink verse="1 Corinthians 11:29" onHover={onHover}>1 Corinthians 11:29, 32</ScriptureLink></span>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-brand-blue">{lang === 'en' ? "Preparation" : "Paghahanda"}</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>{lang === 'en' ? <span>Examine yourself (<ScriptureLink verse="2 Corinthians 13:5" onHover={onHover}>2 Corinthians 13:5</ScriptureLink>)</span> : <span>Siyasatin ang inyong sarili (<ScriptureLink verse="2 Corinthians 13:5" onHover={onHover}>2 Corinto 13:5</ScriptureLink>)</span>}</li>
              <li>{lang === 'en' ? "Confess and turn away from sin" : "Ipahayag at talikuran ang kasalanan"}</li>
              <li>{lang === 'en' ? "Communion with the body and blood of Christ" : "Pakikipagkaisa sa katawan at dugo ni Cristo"}</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const firstLessonOfCategory = lessons.find(l => l.category === categoryId);
    if (firstLessonOfCategory) {
      setActiveLesson(firstLessonOfCategory.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] text-[#1a1a1a] font-serif">
      {/* Header */}
      <header className="bg-brand-dark text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100" fill="none" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-between">
          <button 
            onClick={() => onBack()}
            className="flex items-center gap-2 text-brand-gold hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-widest text-xs font-bold font-sans">Back to Home</span>
          </button>
          
          <div className="hidden md:block">
            <h1 className="text-xl font-bold tracking-widest uppercase font-serif text-brand-gold">
              {lang === 'en' ? "Study Center" : "Sentro ng Pag-aaral"}
            </h1>
          </div>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Scalable Category Ribbon */}
        <div className="mb-12 overflow-x-auto pb-4 custom-scrollbar">
          <div className="flex gap-4 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all border-2 ${
                  selectedCategory === cat.id 
                    ? `border-brand-gold ${cat.color} text-white shadow-lg scale-105` 
                    : 'border-gray-200 bg-white text-gray-500 hover:border-brand-blue/30'
                }`}
              >
                <cat.icon className={`h-5 w-5 ${selectedCategory === cat.id ? 'text-brand-gold' : 'text-gray-400'}`} />
                <span className="font-bold font-sans uppercase tracking-widest text-xs">{cat.name}</span>
              </button>
            ))}
            {/* Placeholder for future expansion */}
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border-2 border-dashed border-gray-300 text-gray-300 cursor-not-allowed">
              <History className="h-5 w-5" />
              <span className="font-bold font-sans uppercase tracking-widest text-xs">More Coming Soon</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 lg:h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-2">
              <div className="px-4 py-2 opacity-50">
                <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 font-sans">
                  {lang === 'en' ? "Module Selection" : "Pagpili ng Modyul"}
                </h2>
              </div>
              {lessons.filter(l => l.category === selectedCategory).map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all flex items-center gap-4 group ${
                    activeLesson === lesson.id 
                      ? 'bg-white shadow-md border-l-4 border-brand-gold' 
                      : 'hover:bg-white/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-colors ${
                    activeLesson === lesson.id ? 'bg-brand-blue text-brand-gold' : 'bg-gray-200 text-gray-500 group-hover:bg-brand-gold/20'
                  }`}>
                    <lesson.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-bold font-sans text-sm ${activeLesson === lesson.id ? 'text-brand-blue' : 'text-gray-600'}`}>
                      {lang === 'en' ? lesson.title : lesson.titleTl}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">Lesson {lesson.id < 10 ? `0${lesson.id}` : lesson.id}</div>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform ${activeLesson === lesson.id ? 'text-brand-gold translate-x-1' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
          </aside>

          {/* Content Area */}
          <section className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {(() => {
                const currentLesson = lessons.find(l => l.id === activeLesson) || lessons[0];
                return (
                  <motion.div
                    key={activeLesson}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden"
                  >
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      {currentLesson?.icon && React.createElement(currentLesson.icon, { size: 120 })}
                    </div>

                    <div className="relative z-10">
                      <div className="text-brand-gold font-bold font-sans text-xs uppercase tracking-[0.3em] mb-4">
                        Module {activeLesson < 10 ? `0${activeLesson}` : activeLesson}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-8 border-b border-gray-100 pb-6 font-serif">
                        {lang === 'en' ? currentLesson?.title : currentLesson?.titleTl}
                      </h2>
                      
                      <div className="prose prose-lg max-w-none text-gray-700 font-sans">
                        {currentLesson?.content}
                      </div>

                      {currentLesson?.quiz && (
                        <div className="mt-12">
                          <QuizComponent quiz={currentLesson.quiz} lang={lang} />
                        </div>
                      )}

                      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-sans uppercase tracking-widest">
                          <Book className="h-4 w-4" />
                          Study Resource
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                          <button 
                            onClick={() => onBack(true)}
                            className="bg-brand-gold text-brand-dark px-6 py-2 rounded-full font-bold font-sans text-sm hover:bg-yellow-400 transition-colors btn-glow"
                          >
                            {lang === 'en' ? "Contact a Minister" : "Makipag-ugnayan sa Ministro"}
                          </button>
                          
                          <div className="flex gap-4">
                            <button 
                              onClick={() => {
                                const availableLessons = lessons.filter(l => l.category === selectedCategory);
                                const currentIndex = availableLessons.findIndex(l => l.id === activeLesson);
                                const prevIndex = currentIndex > 0 ? currentIndex - 1 : availableLessons.length - 1;
                                setActiveLesson(availableLessons[prevIndex].id);
                              }}
                              className="bg-gray-100 text-gray-600 px-6 py-2 rounded-full font-bold font-sans text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                              <ChevronRight className="h-4 w-4 rotate-180" />
                              {lang === 'en' ? "Previous" : "Nakaraan"}
                            </button>
                            <button 
                              onClick={() => {
                                const availableLessons = lessons.filter(l => l.category === selectedCategory);
                                const currentIndex = availableLessons.findIndex(l => l.id === activeLesson);
                                const nextIndex = currentIndex < availableLessons.length - 1 ? currentIndex + 1 : 0;
                                setActiveLesson(availableLessons[nextIndex].id);
                              }}
                              className="bg-brand-blue text-white px-6 py-2 rounded-full font-bold font-sans text-sm hover:bg-brand-dark transition-colors flex items-center gap-2 btn-glow"
                            >
                              {lang === 'en' ? "Next Lesson" : "Susunod"}
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="w-full px-4 text-center">
          <p className="text-gray-400 text-sm italic font-sans">
            "The grass withereth, the flower fadeth: but the word of our God shall stand for ever." — <ScriptureLink verse="Isaiah 40:8" onHover={onHover}>Isaiah 40:8</ScriptureLink>
          </p>
        </div>
      </footer>
    </div>
  );
}
