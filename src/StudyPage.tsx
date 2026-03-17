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
  question: React.ReactNode;
  options: React.ReactNode[];
  correctIndex: number;
  explanation: React.ReactNode;
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
  searchKeywords?: string;
  searchKeywordsTl?: string;
  searchContent?: string;
  searchContentTl?: string;
  content: React.ReactNode;
  quiz?: Quiz;
}

function QuizComponent({ quiz, lang, onHover }: { quiz: Quiz, lang: 'en' | 'tl', onHover: (verse: string | null, x: number, y: number) => void }) {
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
        <div className="text-lg font-medium text-gray-800 mb-6">{question.question}</div>
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
            <div className="text-sm text-gray-600 leading-relaxed">
              <span className="font-bold text-brand-blue">Explanation:</span> {question.explanation}
            </div>
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
      searchKeywords: "prophets chosen mouths speak revelation",
      searchKeywordsTl: "propeta pinili bibig salita pahayag",
      searchContent: "God's words were not originated by man. He placed His words into the mouths of chosen prophets like Jeremiah to speak to the people. Holy men of God spake as they were moved by the Holy Ghost.",
      searchContentTl: "Ang mga salita ng Diyos ay hindi nagmula sa tao. Inilagay Niya ang Kaniyang mga salita sa bibig ng mga piniling propeta gaya ni Jeremias upang salitain sa bayan. Ang mga banal na tao ng Diyos ay nagsalita habang sila ay kinikilos ng Espiritu Santo.",
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
      searchKeywords: "tablets stone commandments moses jeremiah inscribed preserve",
      searchKeywordsTl: "tapyas bato utos moises jeremias isulat ingatan",
      searchContent: "To preserve the message for future generations, God ordered His words to be inscribed. God Himself was the first to write on the two tablets of stone. Moses and Jeremiah were also commanded to write in a book.",
      searchContentTl: "Upang maingatan ang mensahe para sa susunod na salinlahi, ipinag-utos ng Diyos na isulat ang Kaniyang mga salita. Ang Diyos Mismo ang unang sumulat sa dalawang tapyas na bato. Sina Moises at Jeremias ay inutusan din na isulat sa isang aklat.",
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
      ),
      quiz: {
        title: "The Writing of the Word",
        questions: [
          {
            question: "Who was the first to write the words of God on tablets of stone?",
            options: ["Moses", "Jeremiah", "God Himself", "The Apostles"],
            correctIndex: 2,
            explanation: lang === 'en' ? <>According to <ScriptureLink verse="Deuteronomy 9:10" onHover={onHover}>Deuteronomy 9:10</ScriptureLink>, the Lord delivered the two tablets of stone written with the finger of God.</> : <>Ayon sa <ScriptureLink verse="Deuteronomy 9:10" onHover={onHover}>Deuteronomio 9:10</ScriptureLink>, ibinigay ng Panginoon ang dalawang tabletang bato na isinulat ng daliri ng Diyos.</>
          },
          {
            question: "Why did God order His words to be written down?",
            options: ["To make them easier to read", "To preserve the message for future generations", "Because the prophets were forgetful", "To sell more books"],
            correctIndex: 1,
            explanation: "God's words were inscribed to ensure they were preserved accurately for all generations to come."
          }
        ]
      }
    },
    {
      id: 3,
      category: 'bible',
      title: "The Composition of the Bible",
      titleTl: "Ang mga Aklat sa Biblia",
      icon: ShieldCheck,
      searchKeywords: "39 27 66 inspired books testament apocrypha rejected",
      searchKeywordsTl: "39 27 66 aklat tipan apocrypha tinanggihan",
      searchContent: "The Bible consists of 39 books in the Old Testament and 27 in the New Testament, totaling 66 inspired books. The Apocrypha were added later and are rejected as uninspired because they were never quoted by Christ or the Apostles.",
      searchContentTl: "Ang Biblia ay binubuo ng 39 na aklat sa Matandang Tipan at 27 sa Bagong Tipan, na may kabuuang 66 na kinasihang aklat. Ang Apocrypha ay idinagdag kalaunan at tinatanggihan dahil hindi kailanman sinipi ni Cristo o ng mga Apostol.",
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
      ),
      quiz: {
        title: "The Composition of the Bible",
        questions: [
          {
            question: "How many inspired books are in the Bible in total?",
            options: ["73", "66", "81", "50"],
            correctIndex: 1,
            explanation: "The Bible consists of 39 books in the Old Testament and 27 in the New Testament, totaling 66 inspired books."
          },
          {
            question: "Why is the Apocrypha rejected as uninspired?",
            options: ["They are too long", "They were written in a different language", "They were never quoted by Christ or the Apostles", "They were lost for centuries"],
            correctIndex: 2,
            explanation: "The Apocrypha books are considered uninspired because they lack the divine authority seen in the 66 books, notably evidenced by the fact that Christ and the Apostles never quoted them."
          }
        ]
      }
    },
    {
      id: 4,
      category: 'bible',
      title: "Prophecy & Fulfilment",
      titleTl: "Hula at Katuparan",
      icon: History,
      searchKeywords: "ww1 ww2 armistice peace prophecy revelation 8:1 silence",
      searchKeywordsTl: "ww1 ww2 kapayapaan hula apocalipsis 8:1 katahimikan",
      searchContent: "The half hour of silence in Revelation 8:1 aligns with the period of peace between WW1 and WW2, which lasted approximately 20 years and 10 months. In God's time, 1000 years is one day.",
      searchContentTl: "Ang kalahating oras na katahimikan sa Apocalipsis 8:1 ay tumutugma sa panahon ng kapayapaan sa pagitan ng WW1 at WW2, na tumagal ng humigit-kumulang 20 taon at 10 buwan. Sa panahon ng Diyos, ang 1000 taon ay isang araw.",
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
      ),
      quiz: {
        title: "Prophecy & Fulfilment",
        questions: [
          {
            question: "In God's time (1000 years = 1 day), how long is 'half an hour'?",
            options: ["30 minutes", "20 years and 10 months", "50 years", "10 years"],
            correctIndex: 1,
            explanation: "If 1 day (24 hours) equals 1000 years, then 1 hour is ~41.6 years, and half an hour is ~20 years and 10 months."
          },
          {
            question: lang === 'en' ? <>Which historical event aligns with the 'half hour of silence' in <ScriptureLink verse="Revelation 8:1" onHover={onHover}>Revelation 8:1</ScriptureLink>?</> : <>Aling makasaysayang kaganapan ang tumutugma sa 'kalahating oras na katahimikan' sa <ScriptureLink verse="Revelation 8:1" onHover={onHover}>Apocalipsis 8:1</ScriptureLink>?</>,
            options: ["The French Revolution", "The period between WW1 and WW2", "The discovery of America", "The fall of the Roman Empire"],
            correctIndex: 1,
            explanation: "The period of peace between the end of WW1 (1918) and the start of WW2 (1939) lasted approximately 20 years and 10 months, fulfilling the prophecy."
          }
        ]
      }
    },
    {
      id: 5,
      category: 'bible',
      title: "Bible and Science",
      titleTl: "Biblia at Siyensiya",
      icon: Globe,
      searchKeywords: "science circle earth round gravity space job isaiah",
      searchKeywordsTl: "siyensiya bilog lupa grabidad kalawakan job isaias",
      searchContent: "The Bible stated scientific truths thousands of years before they were discovered. Isaiah 40:22 mentions the circle of the earth, and Job 26:7 says God hangeth the earth upon nothing, referring to gravity and space.",
      searchContentTl: "Inihayag ng Biblia ang mga katotohanang siyentipiko libu-libong taon bago ito natuklasan. Binabanggit ng Isaias 40:22 ang bilog ng lupa, at sinasabi ng Job 26:7 na ibinitin ng Diyos ang lupa sa wala, na tumutukoy sa grabidad at kalawakan.",
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
      ),
      quiz: {
        title: "Bible and Science",
        questions: [
          {
            question: "Which verse in the Bible mentioned the 'circle of the earth' long before it was scientifically proven?",
            options: [<ScriptureLink verse="Genesis 1:1" onHover={onHover}>Genesis 1:1</ScriptureLink>, <ScriptureLink verse="Isaiah 40:22" onHover={onHover}>Isaiah 40:22</ScriptureLink>, <ScriptureLink verse="Matthew 5:1" onHover={onHover}>Matthew 5:1</ScriptureLink>, <ScriptureLink verse="Revelation 1:1" onHover={onHover}>Revelation 1:1</ScriptureLink>],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Isaiah 40:22" onHover={onHover}>Isaiah 40:22</ScriptureLink> (written around 700 B.C.) describes God sitting upon the 'circle of the earth'.</> : <>Ang <ScriptureLink verse="Isaiah 40:22" onHover={onHover}>Isaias 40:22</ScriptureLink> (isinulat noong 700 B.C.) ay naglalarawan sa Diyos na nakaupo sa 'bilog ng lupa'.</>
          },
          {
            question: "What scientific concept is alluded to in Job 26:7 when it says God 'hangeth the earth upon nothing'?",
            options: ["Photosynthesis", "The Earth floating in space/Gravity", "The water cycle", "Plate tectonics"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Job 26:7" onHover={onHover}>Job 26:7</ScriptureLink> accurately describes the Earth's position in space, suspended by gravity, long before modern astronomy.</> : <>Ang <ScriptureLink verse="Job 26:7" onHover={onHover}>Job 26:7</ScriptureLink> ay tumpak na naglalarawan sa posisyon ng Lupa sa kalawakan, na nakabitin sa pamamagitan ng grabidad, matagal na bago ang modernong astronomiya.</>
          }
        ]
      }
    },
    {
      id: 6,
      category: 'bible',
      title: "The Five Creations & The New Man",
      titleTl: "Ang Limang Paglalang at ang Bagong Tao",
      icon: Users,
      searchKeywords: "adam eve humanity christ new man born again legal satisfaction debt body head",
      searchKeywordsTl: "adan eva sangkatauhan cristo bagong tao muling pagsilang legal na katuparan utang katawan ulo",
      searchContent: "There are five creations: Adam from dust, Eve from Adam's rib, humanity through natural birth, Christ through the Holy Spirit in Mary, and the New Man through being born again of water and spirit.",
      searchContentTl: "Mayroong limang paglalang: si Adan mula sa alabok, si Eva mula sa tadyang ni Adan, ang sangkatauhan sa pamamagitan ng natural na kapanganakan, si Cristo sa pamamagitan ng Espiritu Santo kay Maria, at ang Bagong Tao sa pamamagitan ng muling pagsilang sa tubig at espiritu.",
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
      ),
      quiz: {
        title: "The Five Creations & The New Man",
        questions: [
          {
            question: "What is the 5th creation according to the lesson?",
            options: ["The Angels", "The New Man (Born Again)", "The Animals", "The Stars"],
            correctIndex: 1,
            explanation: "The 5th creation is the 'New Man', which is the spiritual union of Christ (Head) and the Church (Body)."
          },
          {
            question: "How does the 'One New Man' satisfy the legal requirement of Deuteronomy 24:16?",
            options: ["By ignoring the law", "By Christ paying the debt for His members (His Body)", "By everyone being perfect", "By abolishing the Old Testament"],
            correctIndex: 1,
            explanation: lang === 'en' ? <>Since the Church is the Body of Christ, when Christ died, He legally paid for the sins of His members, satisfying the law (<ScriptureLink verse="Deuteronomy 24:16" onHover={onHover}>Deut. 24:16</ScriptureLink>) that each must die for their own sin.</> : <>Dahil ang Iglesia ay ang Katawan ni Cristo, nang mamatay si Cristo, legal Niyang binayaran ang mga kasalanan ng Kaniyang mga kaanib, na tumutupad sa batas (<ScriptureLink verse="Deuteronomy 24:16" onHover={onHover}>Deut. 24:16</ScriptureLink>) na ang bawat isa ay dapat mamatay para sa sariling kasalanan.</>
          }
        ]
      }
    },
    {
      id: 7,
      category: 'god',
      title: "The True God",
      titleTl: "Ang Tunay na Diyos",
      icon: Flame,
      searchKeywords: "one true god father trinity oneness john 17:3 1 corinthians 8:6 misconceptions",
      searchKeywordsTl: "iisa tunay na diyos ama trinidad oneness juan 17:3 1 corinto 8:6 maling akala",
      searchContent: "The Father is the only true God. John 17:3 and 1 Corinthians 8:6 state that there is but one God, the Father. Misconceptions like the Trinity or Oneness are addressed through scripture.",
      searchContentTl: "Ang Ama ang tanging tunay na Diyos. Sinasabi sa Juan 17:3 at 1 Corinto 8:6 na mayroon lamang isang Diyos, ang Ama. Ang mga maling akala gaya ng Trinidad o Oneness ay tinatalakay sa pamamagitan ng kasulatan.",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "The Bible teaches that there is only one true God: the Father. This fundamental truth distinguishes the true faith from various doctrines like the Trinity or Oneness."
              : "Itinatadhana ng Biblia na iisa lamang ang tunay na Diyos: ang Ama. Ang katotohanang ito ang nagbubukod sa tunay na pananampalataya mula sa mga aral gaya ng Trinidad."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-brand-blue/5 p-4 rounded-lg border-l-4 border-brand-gold">
              <span className="font-bold block mb-1"><ScriptureLink verse="John 17:3" onHover={onHover}>John 17:3</ScriptureLink></span>
              <p className="text-sm italic">"And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent."</p>
            </div>
            <div className="bg-brand-blue/5 p-4 rounded-lg border-l-4 border-brand-gold">
              <span className="font-bold block mb-1"><ScriptureLink verse="1 Corinthians 8:6" onHover={onHover}>1 Corinthians 8:6</ScriptureLink></span>
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
      ),
      quiz: {
        title: "The True God",
        questions: [
          {
            question: "According to John 17:3, who is the only true God?",
            options: ["The Trinity", "Jesus Christ", "The Father", "The Holy Spirit"],
            correctIndex: 2,
            explanation: lang === 'en' ? <>Jesus Himself said in <ScriptureLink verse="John 17:3" onHover={onHover}>John 17:3</ScriptureLink> that the Father is the 'only true God'.</> : <>Sinabi mismo ni Jesus sa <ScriptureLink verse="Juan 17:3" onHover={onHover}>Juan 17:3</ScriptureLink> na ang Ama ang 'iisang tunay na Diyos'.</>
          },
          {
            question: "Which verse states 'to us there is but one God, the Father'?",
            options: [<ScriptureLink verse="Genesis 1:1" onHover={onHover}>Genesis 1:1</ScriptureLink>, <ScriptureLink verse="1 Corinthians 8:6" onHover={onHover}>1 Corinthians 8:6</ScriptureLink>, <ScriptureLink verse="John 1:1" onHover={onHover}>John 1:1</ScriptureLink>, <ScriptureLink verse="Revelation 4:11" onHover={onHover}>Revelation 4:11</ScriptureLink>],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="1 Corinthians 8:6" onHover={onHover}>1 Corinthians 8:6</ScriptureLink> explicitly states that for Christians, there is only one God, the Father.</> : <>Ang <ScriptureLink verse="1 Corinthians 8:6" onHover={onHover}>1 Corinto 8:6</ScriptureLink> ay malinaw na nagsasabi na para sa mga Kristiyano, mayroon lamang isang Diyos, ang Ama.</>
          }
        ]
      }
    },
    {
      id: 8,
      category: 'god',
      title: "The Nature of God",
      titleTl: "Ang Likas na Kalagayan ng Diyos",
      icon: Eye,
      searchKeywords: "god is spirit invisible flesh bones luke 24:39 john 4:24 1 timothy 1:17",
      searchKeywordsTl: "diyos ay espiritu hindi nakikita laman buto lucas 24:39 juan 4:24 1 timoteo 1:17",
      searchContent: "God is spirit and does not have flesh and bones. He is invisible and eternal. John 4:24 states God is a Spirit, and Luke 24:39 clarifies that a spirit hath not flesh and bones.",
      searchContentTl: "Ang Diyos ay espiritu at walang laman at mga buto. Siya ay hindi nakikita at walang hanggan. Sinasabi sa Juan 4:24 na ang Diyos ay Espiritu, at nililinaw ng Lucas 24:39 na ang isang espiritu ay walang laman at mga buto.",
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
      ),
      quiz: {
        title: "The Nature of God",
        questions: [
          {
            question: "What is the nature of God according to John 4:24?",
            options: ["He is a man", "He is Spirit", "He is an energy force", "He is a statue"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="John 4:24" onHover={onHover}>John 4:24</ScriptureLink> states: 'God is a Spirit: and they that worship him must worship him in spirit and in truth.'</> : <>Sinasabi sa <ScriptureLink verse="Juan 4:24" onHover={onHover}>Juan 4:24</ScriptureLink>: 'Ang Dios ay Espiritu: at ang mga sa kaniya'y nagsisisamba ay kinakailangang magsisamba sa espiritu at sa katotohanan.'</>
          },
          {
            question: "Does God have flesh and bones?",
            options: ["Yes, just like us", "No, for a spirit hath not flesh and bones", "Only when He visits Earth", "The Bible doesn't say"],
            correctIndex: 1,
            explanation: lang === 'en' ? <>In <ScriptureLink verse="Luke 24:39" onHover={onHover}>Luke 24:39</ScriptureLink>, Jesus clarifies that a spirit (like God) does not have flesh and bones.</> : <>Sa <ScriptureLink verse="Lucas 24:39" onHover={onHover}>Lucas 24:39</ScriptureLink>, nilinaw ni Jesus na ang isang espiritu (gaya ng Diyos) ay walang laman at mga buto.</>
          }
        ]
      }
    },
    {
      id: 9,
      category: 'god',
      title: "Attributes of the True God",
      titleTl: "Ang mga Katangian ng Tunay na Diyos",
      icon: Infinity,
      searchKeywords: "omnipotent omnipresent omniscient eternal creator almighty unchanging",
      searchKeywordsTl: "makapangyarihan nasa lahat ng dako nakaaalam walang hanggan maylalang hindi nagbabago",
      searchContent: "God is omnipotent (all-powerful), omnipresent (everywhere), and omniscient (all-knowing). He is the eternal creator and almighty, and He is unchanging in His nature.",
      searchContentTl: "Ang Diyos ay makapangyarihan sa lahat, nasa lahat ng dako, at nakaaalam sa lahat. Siya ang walang hanggang maylalang at makapangyarihan, at Siya ay hindi nagbabago sa Kaniyang kalikasan.",
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
              { label: lang === 'en' ? "Eternal" : "Walang hanggan", desc: lang === 'en' ? <>No beginning or end (<ScriptureLink verse="Psalms 90:2" onHover={onHover}>Ps. 90:2</ScriptureLink>)</> : <>Walang pasimula o hanggan (<ScriptureLink verse="Awit 90:2" onHover={onHover}>Awit 90:2</ScriptureLink>)</> }
            ].map((attr, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="font-bold text-brand-blue">{attr.label}</span>
                <span className="text-xs text-gray-500 italic">{attr.desc}</span>
              </div>
            ))}
          </div>
        </div>
      ),
      quiz: {
        title: "Attributes of the True God",
        questions: [
          {
            question: "What does 'Omniscient' mean in relation to God?",
            options: ["He is everywhere", "He is all-powerful", "He is all-knowing", "He is eternal"],
            correctIndex: 2,
            explanation: lang === 'en' ? <><ScriptureLink verse="1 John 3:20" onHover={onHover}>1 John 3:20</ScriptureLink> states that God 'knoweth all things', which is the definition of omniscience.</> : <>Sinasabi sa <ScriptureLink verse="1 Juan 3:20" onHover={onHover}>1 Juan 3:20</ScriptureLink> na ang Diyos ay 'nakaaalam ng lahat ng mga bagay'.</>
          },
          {
            question: "Which verse describes God as eternal, having no beginning or end?",
            options: [<ScriptureLink verse="Genesis 1:1" onHover={onHover}>Genesis 1:1</ScriptureLink>, <ScriptureLink verse="Psalm 90:2" onHover={onHover}>Psalm 90:2</ScriptureLink>, <ScriptureLink verse="John 3:16" onHover={onHover}>John 3:16</ScriptureLink>, <ScriptureLink verse="Romans 1:20" onHover={onHover}>Romans 1:20</ScriptureLink>],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Psalms 90:2" onHover={onHover}>Psalm 90:2</ScriptureLink> says: 'Even from everlasting to everlasting, thou art God.'</> : <>Sinasabi sa <ScriptureLink verse="Awit 90:2" onHover={onHover}>Awit 90:2</ScriptureLink>: 'Mula nga ng walang hanggan hanggang sa walang hanggan, ikaw ay Dios.'</>
          }
        ]
      }
    },
    {
      id: 10,
      category: 'god',
      title: "Incomparable Character",
      titleTl: "Walang Kapantay na Katangian",
      icon: Heart,
      searchKeywords: "justice mercy faithfulness righteous judge goodness covenant peace",
      searchKeywordsTl: "katarungan awa katapatan matuwid na hukom kabutihan tipan kapayapaan",
      searchContent: "God is a righteous judge who shows justice and mercy. He is faithful to His covenant and His goodness brings peace to those who follow Him.",
      searchContentTl: "Ang Diyos ay isang matuwid na hukom na nagpapakita ng katarungan at awa. Siya ay tapat sa Kaniyang tipan at ang Kaniyang kabutihan ay nagdadala ng kapayapaan sa mga sumusunod sa Kaniya.",
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
              <p className="text-xs text-gray-600"><ScriptureLink verse="Exodus 34:6" onHover={onHover}>Exodus 34:6-7</ScriptureLink> - God is abundant in goodness but will by no means clear the guilty.</p>
            </div>
            <div className="p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20">
              <h4 className="font-bold text-brand-dark mb-1">{lang === 'en' ? "Faithful" : "Tapat"}</h4>
              <p className="text-xs text-gray-600"><ScriptureLink verse="Isaiah 54:10" onHover={onHover}>Isaiah 54:10</ScriptureLink> - His covenant of peace shall not be removed.</p>
            </div>
          </div>
          <div className="text-center p-4 italic text-gray-500 border-t border-gray-100">
            {lang === 'en' ? "God's love is balanced by His absolute justice." : "Ang pag-ibig ng Diyos ay balanse ng Kaniyang ganap na katarungan."}
          </div>
        </div>
      ),
      quiz: {
        title: "Incomparable Character",
        questions: [
          {
            question: "According to Exodus 34:6-7, what is a key aspect of God's character?",
            options: ["He ignores sin", "He is abundant in goodness but also just", "He is only angry", "He is indifferent"],
            correctIndex: 1,
            explanation: "God is merciful and gracious, but He also maintains justice and will not clear the guilty."
          },
          {
            question: "What does Isaiah 54:10 say about God's faithfulness?",
            options: ["It depends on our actions", "His covenant of peace shall not be removed", "It is temporary", "It is only for a few people"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Isaiah 54:10" onHover={onHover}>Isaiah 54:10</ScriptureLink> emphasizes that even if mountains depart, God's kindness and covenant of peace will remain.</> : <>Binibigyang-diin ng <ScriptureLink verse="Isaias 54:10" onHover={onHover}>Isaias 54:10</ScriptureLink> na kahit na ang mga bundok ay mangalis, ang kagandahang-loob at tipan ng kapayapaan ng Diyos ay mananatili.</>
          }
        ]
      }
    },
    {
      id: 11,
      category: 'god',
      title: "The Names of God",
      titleTl: "Ang mga Pangalan ng Diyos",
      icon: Tag,
      searchKeywords: "names titles i am that i am exodus 3:14 el shaddai adonai jehovah",
      searchKeywordsTl: "pangalan titulo ako yaong ako nga exodo 3:14 el shaddai adonai jehova",
      searchContent: "God has many names and titles, such as 'I AM THAT I AM' in Exodus 3:14, El Shaddai, Adonai, and Jehovah. These names reveal His character and relationship with His people.",
      searchContentTl: "Ang Diyos ay may maraming pangalan at titulo, gaya ng 'AKO YAONG AKO NGA' sa Exodo 3:14, El Shaddai, Adonai, at Jehova. Ang mga pangalang ito ay naghahayag ng Kaniyang katangian at relasyon sa Kaniyang bayan.",
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
      ),
      quiz: {
        title: "The Names of God",
        questions: [
          {
            question: "What name did God reveal to Moses in Exodus 3:14?",
            options: ["Adonai", <ScriptureLink verse="Exodus 3:14" onHover={onHover}>I AM THAT I AM</ScriptureLink>, "El Shaddai", "Jehovah"],
            correctIndex: 1,
            explanation: lang === 'en' ? <>In <ScriptureLink verse="Exodus 3:14" onHover={onHover}>Exodus 3:14</ScriptureLink>, God said to Moses: 'I AM THAT I AM'.</> : <>Sa <ScriptureLink verse="Exodo 3:14" onHover={onHover}>Exodo 3:14</ScriptureLink>, sinabi ng Diyos kay Moises: 'AKO YAONG AKO NGA'.</>
          },
          {
            question: "What does 'El Shaddai' mean?",
            options: ["Lord", "God Almighty", "The Creator", "The Savior"],
            correctIndex: 1,
            explanation: "El Shaddai is a Hebrew name for God meaning 'God Almighty'."
          }
        ]
      }
    },
    {
      id: 12,
      category: 'christ',
      title: "Christ is Truly Man",
      titleTl: "Si Cristo ay Tunay na Tao",
      icon: Users,
      searchKeywords: "jesus christ man mediator john 8:40 1 timothy 2:5 distinction flesh bones",
      searchKeywordsTl: "jesucristo tao tagapamagitan juan 8:40 1 timoteo 2:5 pagkakaiba laman buto",
      searchContent: "Jesus Christ is a man and the mediator between God and men. John 8:40 and 1 Timothy 2:5 emphasize His humanity. He has flesh and bones, distinct from the nature of God who is spirit.",
      searchContentTl: "Si Jesucristo ay isang tao at ang tagapamagitan sa Diyos at sa mga tao. Binibigyang-diin ng Juan 8:40 at 1 Timoteo 2:5 ang Kaniyang pagkatao. Siya ay may laman at mga buto, na iba sa kalikasan ng Diyos na espiritu.",
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
      ),
      quiz: {
        title: "Christ is Truly Man",
        questions: [
          {
            question: "What did Jesus call Himself in John 8:40?",
            options: ["A God", "A man", "An angel", "A prophet only"],
            correctIndex: 1,
            explanation: lang === 'en' ? <>In <ScriptureLink verse="John 8:40" onHover={onHover}>John 8:40</ScriptureLink>, Jesus explicitly refers to Himself as 'a man that hath told you the truth'.</> : <>Sa <ScriptureLink verse="Juan 8:40" onHover={onHover}>Juan 8:40</ScriptureLink>, tahasang tinukoy ni Jesus ang Kaniyang sarili bilang 'isang taong sa inyo'y nagsaysay ng katotohanan'.</>
          },
          {
            question: "According to 1 Timothy 2:5, what is the nature of the mediator between God and men?",
            options: ["He is a Spirit", "He is the man Christ Jesus", "He is an angel", "He is God the Father"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="1 Timothy 2:5" onHover={onHover}>1 Timothy 2:5</ScriptureLink> states: 'For there is one God, and one mediator between God and men, the man Christ Jesus'.</> : <>Sinasabi sa <ScriptureLink verse="1 Timoteo 2:5" onHover={onHover}>1 Timoteo 2:5</ScriptureLink>: 'Sapagka't may isang Dios at may isang Tagapamagitan sa Dios at sa mga tao, ang taong si Cristo Jesus'.</>
          }
        ]
      }
    },
    {
      id: 13,
      category: 'christ',
      title: "The Human Experiences of Jesus",
      titleTl: "Ang mga Karanasan ni Jesus bilang Tao",
      icon: Heart,
      searchKeywords: "hunger thirst tired sleep weep die human nature immortal",
      searchKeywordsTl: "gutom uhaw pagod tulog tangis matay pagkatao walang kamatayan",
      searchContent: "Jesus experienced human limitations such as hunger, thirst, fatigue, sleep, and weeping. He eventually died on the cross, proving He had a human nature and was not immortal in His earthly life.",
      searchContentTl: "Naranasan ni Jesus ang mga limitasyon ng tao gaya ng gutom, uhaw, pagkapagod, pagtulog, at pagtangis. Siya ay namatay sa krus, na nagpapatunay na Siya ay may kalikasan ng tao at hindi immortal sa Kaniyang buhay sa lupa.",
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
      ),
      quiz: {
        title: "The Human Experiences of Jesus",
        questions: [
          {
            question: "Which of these human experiences did Jesus NOT have according to the Bible?",
            options: ["Hunger", "Thirst", "Sinning", "Tiredness"],
            correctIndex: 2,
            explanation: "While Jesus experienced all human physical needs and emotions, the Bible teaches He remained without sin."
          },
          {
            question: "What is a key difference between God and Christ regarding life and death?",
            options: ["Both can die", "Neither can die", "God cannot die, but Christ died", "Christ cannot die, but God died"],
            correctIndex: 2,
            explanation: lang === 'en' 
              ? <>God is immortal (<ScriptureLink verse="1 Timothy 1:17" onHover={onHover}>1 Tim 1:17</ScriptureLink>), but Jesus Christ truly died on the cross (<ScriptureLink verse="Matthew 27:50" onHover={onHover}>Mat 27:50</ScriptureLink>), proving His human nature.</>
              : <>Ang Diyos ay walang kamatayan (<ScriptureLink verse="1 Timoteo 1:17" onHover={onHover}>1 Tim 1:17</ScriptureLink>), ngunit si Jesu-Cristo ay tunay na namatay sa krus (<ScriptureLink verse="Mateo 27:50" onHover={onHover}>Mat 27:50</ScriptureLink>).</>
          }
        ]
      }
    },
    {
      id: 14,
      category: 'christ',
      title: "Christ vs. The True God",
      titleTl: "Si Cristo laban sa Tunay na Diyos",
      icon: Scale,
      searchKeywords: "differences knowledge nature origin life immortal mortal mark 13:32",
      searchKeywordsTl: "pagkakaiba kaalaman kalikasan pinagmulan buhay walang kamatayan marcos 13:32",
      searchContent: "There are clear differences between Christ and the true God. God is all-knowing, but Christ did not know the day or hour (Mark 13:32). God is immortal, while Christ died. God is the source of life, while Christ's life was given by God.",
      searchContentTl: "Mayroong malinaw na pagkakaiba sa pagitan ni Cristo at ng tunay na Diyos. Ang Diyos ay nakaaalam sa lahat, ngunit hindi alam ni Cristo ang araw o oras (Marcos 13:32). Ang Diyos ay walang kamatayan, habang si Cristo ay namatay. Ang Diyos ang pinagmulan ng buhay, habang ang buhay ni Cristo ay ibinigay ng Diyos.",
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
                  <td className="px-4 py-3">Spirit (<ScriptureLink verse="John 4:24" onHover={onHover}>John 4:24</ScriptureLink>)</td>
                  <td className="px-4 py-3">Flesh/Bones (<ScriptureLink verse="Luke 24:39" onHover={onHover}>Luke 24:39</ScriptureLink>)</td>
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
      ),
      quiz: {
        title: "Christ vs. The True God",
        questions: [
          {
            question: "Does Jesus Christ know everything that God the Father knows?",
            options: ["Yes, they share all knowledge", "No, only the Father knows certain things (e.g., the Day of Judgment)", "Jesus knows more than the Father", "The Bible doesn't specify"],
            correctIndex: 1,
            explanation: lang === 'en' ? <>In <ScriptureLink verse="Mark 13:32" onHover={onHover}>Mark 13:32</ScriptureLink>, Jesus says that only the Father knows the day and hour, not even the Son.</> : <>Sa <ScriptureLink verse="Marcos 13:32" onHover={onHover}>Marcos 13:32</ScriptureLink>, sinabi ni Jesus na ang Ama lamang ang nakakaalam ng araw at oras, kahit ang Anak ay hindi.</>
          },
          {
            question: "What is the difference in origin between God and Christ?",
            options: ["Both have no beginning", "Both were created", "God has no beginning, but Christ was born/created", "Christ has no beginning, but God was born"],
            correctIndex: 2,
            explanation: lang === 'en' ? <><ScriptureLink verse="Psalms 90:2" onHover={onHover}>Psalm 90:2</ScriptureLink> says God is from everlasting to everlasting, while <ScriptureLink verse="Matthew 1:18" onHover={onHover}>Matthew 1:18</ScriptureLink> describes the birth of Jesus Christ.</> : <>Sinasabi sa <ScriptureLink verse="Awit 90:2" onHover={onHover}>Awit 90:2</ScriptureLink> na ang Diyos ay mula sa walang hanggan hanggang sa walang hanggan, habang inilalarawan sa <ScriptureLink verse="Mateo 1:18" onHover={onHover}>Mateo 1:18</ScriptureLink> ang kapanganakan ni Jesu-Cristo.</>
          }
        ]
      }
    },
    {
      id: 15,
      category: 'christ',
      title: "The Source of Christ's Authority",
      titleTl: "Ang Pinagmulan ng Karapatan ni Cristo",
      icon: Zap,
      searchKeywords: "power titles glory authority given exalted reward obedience mediator",
      searchKeywordsTl: "kapangyarihan titulo kaluwalhatian karapatan ibinigay itinaas gantimpala pagsunod tagapamagitan",
      searchContent: "Christ's power and authority were given to Him by the Father. Because of His obedience unto death, God highly exalted Him and gave Him a name above every name. He is the mediator between God and men.",
      searchContentTl: "Ang kapangyarihan at karapatan ni Cristo ay ibinigay sa Kaniya ng Ama. Dahil sa Kaniyang pagsunod hanggang sa kamatayan, Siya ay lubos na itinaas ng Diyos at binigyan ng pangalang higit sa lahat ng pangalan. Siya ang tagapamagitan sa Diyos at sa mga tao.",
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
              <p className="text-sm italic">"All power is given unto me in heaven and in earth." (<ScriptureLink verse="Matthew 28:18" onHover={onHover}>Matthew 28:18</ScriptureLink>)</p>
            </div>
            <div className="p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/10">
              <div className="text-brand-gold font-bold text-xs uppercase mb-1">Exaltation</div>
              <p className="text-sm italic">"Wherefore God also hath highly exalted him, and given him a name which is above every name." (<ScriptureLink verse="Philippians 2:9" onHover={onHover}>Philippians 2:9</ScriptureLink>)</p>
            </div>
            <div className="p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/10">
              <div className="text-brand-gold font-bold text-xs uppercase mb-1">The Mediator</div>
              <p className="text-sm italic">"For there is one God, and one mediator between God and men, the man Christ Jesus." (<ScriptureLink verse="1 Timothy 2:5" onHover={onHover}>1 Timothy 2:5</ScriptureLink>)</p>
            </div>
          </div>
        </div>
      ),
      quiz: {
        title: "The Source of Christ's Authority",
        questions: [
          {
            question: "Where did Jesus get His power and authority from?",
            options: ["He always had it as God", "It was given to Him by the Father", "He earned it through study", "The Apostles gave it to Him"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Matthew 28:18" onHover={onHover}>Matthew 28:18</ScriptureLink> states: 'All power is given unto me...', indicating it was bestowed upon Him by God.</> : <>Sinasabi sa <ScriptureLink verse="Mateo 28:18" onHover={onHover}>Mateo 28:18</ScriptureLink>: 'Ang lahat ng kapamahalaan sa langit at sa ibabaw ng lupa ay naibigay na sa akin...', na nagpapahiwatig na ito ay ipinagkaloob sa Kaniya ng Diyos.</>
          },
          {
            question: "Why did God highly exalt Jesus and give Him a name above every name?",
            options: ["Because He was lucky", "As a reward for His obedience unto death", "Because He was the firstborn", "The Bible doesn't say"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Philippians 2:8-9" onHover={onHover}>Philippians 2:8-9</ScriptureLink> explains that because Jesus humbled Himself and became obedient unto death, God highly exalted Him.</> : <>Ipinapaliwanag ng <ScriptureLink verse="Filipos 2:8-9" onHover={onHover}>Filipos 2:8-9</ScriptureLink> na dahil nagpakababa si Jesus at naging masunurin hanggang sa kamatayan, Siya ay lubos na itinaas ng Diyos.</>
          }
        ]
      }
    },
    {
      id: 16,
      category: 'messenger',
      title: "Ends of the Earth",
      titleTl: "Mga Wakas ng Lupa",
      icon: Clock,
      searchKeywords: "ends of the earth time period prophecy salvation last days july 27 1914 world war i wwi isaiah 43:5 matthew 24:6",
      searchKeywordsTl: "makas ng lupa yugto ng panahon hula kaligtasan huling araw hulyo 27 1914 unang digmaang pandaigdig isaias 43:5 mateo 24:6",
      searchContent: "The 'ends of the earth' refers to a specific time period in biblical prophecy, starting on July 27, 1914, with the outbreak of World War I. This period marks the beginning of the last days and the opportunity for salvation.",
      searchContentTl: "Ang 'mga wakas ng lupa' ay tumutukoy sa isang tiyak na yugto ng panahon sa hula ng Biblia, na nagsimula noong Hulyo 27, 1914, sa pagsiklab ng Unang Digmaang Pandaigdig. Ang panahong ito ang nagmamarka ng simula ng mga huling araw at ang pagkakataon para sa kaligtasan.",
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
      ),
      quiz: {
        title: "Ends of the Earth",
        questions: [
          {
            question: "What does the phrase 'ends of the earth' refer to in biblical prophecy?",
            options: ["The physical edges of the world", "A specific time period in the last days", "The bottom of the ocean", "A mountain range"],
            correctIndex: 1,
            explanation: "In prophecy, 'ends of the earth' refers to the time period nearing the end of the world, starting with the outbreak of a world war."
          },
          {
            question: "Which date marks the beginning of the 'ends of the earth'?",
            options: ["July 4, 1776", "July 27, 1914", "December 25, 0", "January 1, 2000"],
            correctIndex: 1,
            explanation: lang === 'en' ? <>July 27, 1914, the start of World War I (<ScriptureLink verse="Matthew 24:6-7" onHover={onHover}>Mat. 24:6-7</ScriptureLink>), is the prophetic sign marking the beginning of the 'ends of the earth'.</> : <>Ang Hulyo 27, 1914, ang simula ng Unang Digmaang Pandaigdig (<ScriptureLink verse="Mateo 24:6-7" onHover={onHover}>Mat. 24:6-7</ScriptureLink>), ay ang makahulang tanda na nagmamarka sa simula ng 'mga wakas ng lupa'.</>
          }
        ]
      }
    },
    {
      id: 17,
      category: 'messenger',
      title: "The Authority to Preach",
      titleTl: "Ang Karapatan sa Pangaral",
      icon: ShieldCheck,
      searchKeywords: "authority preach sent messenger mystery gospel romans 10:15 mark 4:11 ephesians 1:9",
      searchKeywordsTl: "karapatan pangaral sinugo sugo hiwaga ebanghelyo roma 10:15 marcos 4:11 efeso 1:9",
      searchContent: "True preachers must be sent by God to reveal the mysteries of the gospel. Romans 10:15 asks, 'how shall they preach, except they be sent?' The secret of the kingdom of God is given only to those sent by God.",
      searchContentTl: "Ang mga tunay na mangangaral ay dapat sinugo ng Diyos upang ihayag ang mga hiwaga ng ebanghelyo. Nagtatanong ang Roma 10:15, 'paano sila mangangaral, kung hindi sila mga sinugo?' Ang lihim ng kaharian ng Diyos ay ibinibigay lamang sa mga sinugo ng Diyos.",
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
              <h4 className="font-bold text-brand-blue"><ScriptureLink verse="Romans 10:15" onHover={onHover}>Romans 10:15</ScriptureLink></h4>
              <p className="text-sm italic text-gray-600">"And how shall they preach, except they be sent?"</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <span className="font-bold block text-brand-blue mb-1">{lang === 'en' ? "Secret Knowledge" : "Lihim na Kaalaman"}</span>
              <p className="text-xs text-gray-600"><ScriptureLink verse="Mark 4:11" onHover={onHover}>Mark 4:11</ScriptureLink> - The secret of the kingdom of God is given only to those sent by God.</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <span className="font-bold block text-brand-blue mb-1">{lang === 'en' ? "The Mystery Revealed" : "Ang Hiwagang Inihayag"}</span>
              <p className="text-xs text-gray-600"><ScriptureLink verse="Ephesians 1:9" onHover={onHover}>Ephesians 1:9</ScriptureLink> - God enables His messengers to know the things He planned secretly.</p>
            </div>
          </div>
        </div>
      ),
      quiz: {
        title: "The Authority to Preach",
        questions: [
          {
            question: lang === 'en' ? <>According to <ScriptureLink verse="Romans 10:15" onHover={onHover}>Romans 10:15</ScriptureLink>, what is required for someone to preach correctly?</> : <>Ayon sa <ScriptureLink verse="Romans 10:15" onHover={onHover}>Roma 10:15</ScriptureLink>, ano ang kinakailangan para sa isang tao upang mangaral nang tama?</>,
            options: ["A college degree", "They must be sent by God", "They must have a loud voice", "They must be famous"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Romans 10:15" onHover={onHover}>Romans 10:15</ScriptureLink> asks: 'And how shall they preach, except they be sent?'</> : <>Ang <ScriptureLink verse="Romans 10:15" onHover={onHover}>Roma 10:15</ScriptureLink> ay nagtatanong: 'At paano sila mangangaral, kung hindi sila mga sinugo?'</>
          },
          {
            question: lang === 'en' ? <>To whom is the 'secret of the kingdom of God' given according to <ScriptureLink verse="Mark 4:11" onHover={onHover}>Mark 4:11</ScriptureLink>?</> : <>Kanino ibinigay ang 'lihim ng kaharian ng Diyos' ayon sa <ScriptureLink verse="Mark 4:11" onHover={onHover}>Marcos 4:11</ScriptureLink>?</>,
            options: ["To everyone who reads the Bible", "Only to those sent by God", "To the wise and learned", "To no one"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Mark 4:11" onHover={onHover}>Mark 4:11</ScriptureLink> states that the mystery of the kingdom is given to those chosen/sent, while to others it remains in parables.</> : <>Sinasabi sa <ScriptureLink verse="Mark 4:11" onHover={onHover}>Marcos 4:11</ScriptureLink> na ang hiwaga ng kaharian ay ibinibigay sa mga pinili/sinugo.</>
          }
        ]
      }
    },
    {
      id: 18,
      category: 'messenger',
      title: "The Messenger from the East",
      titleTl: "Ang Sugo mula sa Silangan",
      icon: Compass,
      searchKeywords: "messenger east far east felix manalo prophecy philippines 1914 revelation 7:2 isaiah 46:11",
      searchKeywordsTl: "sugo silangan malayong silangan felix manalo hula pilipinas 1914 apocalipsis 7:2 isaias 46:11",
      searchContent: "Prophecy speaks of a messenger sent from the Far East (Philippines) in the last days. This was fulfilled in the mission of Brother Felix Y. Manalo, who began preaching in 1914, coinciding with the ends of the earth.",
      searchContentTl: "Nagsasalita ang hula tungkol sa isang sugo na mula sa Malayong Silangan (Pilipinas) sa mga huling araw. Ito ay natupad sa misyon ng Kapatid na Felix Y. Manalo, na nagsimulang mangaral noong 1914, kasabay ng mga wakas ng lupa.",
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
                <span className="font-bold block"><ScriptureLink verse="Revelation 7:2" onHover={onHover}>Revelation 7:2-3</ScriptureLink></span>
                <p className="text-sm text-gray-600">"And I saw another angel ascending from the east, having the seal of the living God..."</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-brand-blue/5 p-4 rounded-xl">
              <div className="bg-brand-gold/20 p-2 rounded-lg"><Search className="h-5 w-5 text-brand-blue" /></div>
              <div>
                <span className="font-bold block"><ScriptureLink verse="Isaiah 46:11" onHover={onHover}>Isaiah 46:11</ScriptureLink></span>
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
      ),
      quiz: {
        title: "The Messenger from the East",
        questions: [
          {
            question: lang === 'en' ? <>Where does prophecy say the messenger would come from in the last days?</> : <>Saan sinasabi ng hula na magmumula ang sugo sa mga huling araw?</>,
            options: ["The West", "The Far East", "The North", "The South"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Isaiah 46:11" onHover={onHover}>Isaiah 46:11</ScriptureLink> and <ScriptureLink verse="Revelation 7:2" onHover={onHover}>Revelation 7:2-3</ScriptureLink> point to the 'East' or 'Far East' as the origin of the messenger.</> : <>Ang <ScriptureLink verse="Isaiah 46:11" onHover={onHover}>Isaias 46:11</ScriptureLink> at <ScriptureLink verse="Revelation 7:2" onHover={onHover}>Apocalipsis 7:2-3</ScriptureLink> ay tumutukoy sa 'Silangan' o 'Malayong Silangan'.</>
          },
          {
            question: "Who fulfilled the prophecy of the messenger from the Far East starting in 1914?",
            options: ["Martin Luther", "Brother Felix Y. Manalo", "John Wesley", "The Pope"],
            correctIndex: 1,
            explanation: "Brother Felix Y. Manalo began preaching the Iglesia ni Cristo in the Philippines (Far East) in 1914."
          }
        ]
      }
    },
    {
      id: 19,
      category: 'messenger',
      title: "True Religion",
      titleTl: "Ang Tunay na Relihiyon",
      icon: Heart,
      searchKeywords: "true religion return to god duty of man fear god commandments ecclesiastes 12:13 sin separation",
      searchKeywordsTl: "tunay na relihiyon magbalik sa diyos katungkulan ng tao matakot sa diyos utos eclesiastes 12:13 kasalanan",
      searchContent: "True religion is the way to return to God. The whole duty of man is to fear God and keep His commandments (Ecclesiastes 12:13). Sin destroyed man's relationship with God, requiring a return through true religion.",
      searchContentTl: "Ang tunay na relihiyon ang paraan upang magbalik sa Diyos. Ang buong katungkulan ng tao ay ang matakot sa Diyos at sundin ang Kaniyang mga utos (Eclesiastes 12:13). Sinira ng kasalanan ang relasyon ng tao sa Diyos, na nangangailangan ng pagbabalik sa pamamagitan ng tunay na relihiyon.",
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
      ),
      quiz: {
        title: "True Religion",
        questions: [
          {
            question: lang === 'en' ? <>What is the 'whole duty of man' according to <ScriptureLink verse="Ecclesiastes 12:13" onHover={onHover}>Ecclesiastes 12:13</ScriptureLink>?</> : <>Ano ang 'buong katungkulan ng tao' ayon sa <ScriptureLink verse="Ecclesiastes 12:13" onHover={onHover}>Eclesiastes 12:13</ScriptureLink>?</>,
            options: ["To be successful", "To fear God and keep His commandments", "To travel the world", "To gain knowledge"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Ecclesiastes 12:13" onHover={onHover}>Ecclesiastes 12:13</ScriptureLink> states: 'Fear God, and keep his commandments: for this is the whole duty of man.'</> : <>Sinasabi sa <ScriptureLink verse="Ecclesiastes 12:13" onHover={onHover}>Eclesiastes 12:13</ScriptureLink>: 'Matakot ka sa Dios, at sundin mo ang kaniyang mga utos; sapagka't ito ang buong katungkulan ng tao.'</>
          },
          {
            question: "What destroyed the true essence of man and his relationship with God?",
            options: ["Lack of education", "Sin", "Poverty", "Time"],
            correctIndex: 1,
            explanation: "Sin separated man from God and destroyed his original purpose, requiring a return to true religion."
          }
        ]
      }
    },
    {
      id: 20,
      category: 'judgement',
      title: "The Last Trumpet",
      titleTl: "Ang Huling Pagtunog ng Pakakak",
      icon: Zap,
      searchKeywords: "last trumpet end of time judgment day salvation resurrection book of life 1 thessalonians 4:16 revelation 20:6",
      searchKeywordsTl: "huling pakakak wakas ng panahon araw ng paghuhukom kaligtasan pagkabuhay na maguli aklat ng buhay 1 tesalonica 4:16 apocalipsis 20:6",
      searchContent: "The sounding of the last trumpet marks the end of time and the beginning of Judgment Day. The dead in Christ shall rise first. Only those whose names are written in the Book of Life will be saved.",
      searchContentTl: "Ang pagtunog ng huling pakakak ang nagtatanda ng wakas ng panahon at ang simula ng Araw ng Paghuhukom. Ang mga nangamatay kay Cristo ay unang mangabubuhay na maguli. Ang mga nakasulat lamang sa Aklat ng Buhay ang maliligtas.",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "The sounding of the last trumpet marks the end of man's time on earth and the beginning of the Day of Judgment. It is the moment of salvation for the faithful."
              : "Ang pagtunog ng huling pakakak ang nagtatanda ng wakas ng panahon ng tao sa lupa at ang simula ng Araw ng Paghuhukom. Ito ang sandali ng kaligtasan para sa mga tapat."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-brand-blue/5 p-4 rounded-lg border-l-4 border-brand-gold">
              <span className="font-bold block mb-1"><ScriptureLink verse="1 Thessalonians 4:16" onHover={onHover}>1 Thessalonians 4:16-17</ScriptureLink></span>
              <p className="text-sm italic">
                {lang === 'en'
                  ? "For the Lord himself shall descend from heaven with a shout... and the dead in Christ shall rise first."
                  : "Sapagka't ang Panginoon din ang bababang mula sa langit, na may isang sigaw... at ang nangamatay kay Cristo ay unang mangabubuhay na maguli."}
              </p>
            </div>
            <div className="bg-brand-blue/5 p-4 rounded-lg border-l-4 border-brand-gold">
              <span className="font-bold block mb-1"><ScriptureLink verse="Revelation 20:6" onHover={onHover}>Revelation 20:6</ScriptureLink></span>
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
      ),
      quiz: {
        title: "The Last Trumpet",
        questions: [
          {
            question: lang === 'en' ? <>Who will rise first when the Lord descends from heaven at the last trumpet?</> : <>Sino ang unang mabubuhay na maguli kapag bumaba ang Panginoon mula sa langit sa huling pakakak?</>,
            options: ["The living", "The dead in Christ", "The angels", "The prophets"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="1 Thessalonians 4:16" onHover={onHover}>1 Thessalonians 4:16</ScriptureLink> states: '...and the dead in Christ shall rise first'.</> : <>Sinasabi sa <ScriptureLink verse="1 Thessalonians 4:16" onHover={onHover}>1 Tesalonica 4:16</ScriptureLink>: '...at ang nangamatay kay Cristo ay unang mangabubuhay na maguli'.</>
          },
          {
            question: lang === 'en' ? <>What is required to be saved from the lake of fire on Judgment Day?</> : <>Ano ang kinakailangan upang maligtas sa dagat-dagatang apoy sa Araw ng Paghuhukom?</>,
            options: ["Being a good person", "Having your name written in the Book of Life", "Being famous", "Having a lot of money"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Revelation 20:15" onHover={onHover}>Revelation 20:15</ScriptureLink> says: 'And whosoever was not found written in the book of life was cast into the lake of fire.'</> : <>Sinasabi sa <ScriptureLink verse="Revelation 20:15" onHover={onHover}>Apocalipsis 20:15</ScriptureLink>: 'At kung ang sinoman ay hindi nasumpungang nakasulat sa aklat ng buhay, ay ibinulid sa dagat-dagatang apoy.'</>
          }
        ]
      }
    },
    {
      id: 21,
      category: 'judgement',
      title: "The Great Judgment",
      titleTl: "Ang Dakilang Paghuhukom",
      icon: Scale,
      searchKeywords: "great judgment court of god deeds raised sentence gospel bible revelation 20:12 romans 2:16",
      searchKeywordsTl: "dakilang paghuhukom hukuman ng diyos gawa bubuhayin hatol ebanghelyo biblia apocalipsis 20:12 roma 2:16",
      searchContent: "On Judgment Day, all men will stand before God's court. Judgment will be based on their deeds and the Gospel. Those who entered Christ will be saved, while those outside will face judgment.",
      searchContentTl: "Sa Araw ng Paghuhukom, ang lahat ng tao ay haharap sa hukuman ng Diyos. Ang paghuhukom ay ibabatay sa kanilang mga gawa at sa Ebanghelyo. Ang mga pumasok kay Cristo ay maliligtas, habang ang mga nasa labas ay haharap sa paghuhukom.",
      content: (
        <div className="space-y-6">
          <p className="text-lg leading-relaxed">
            {lang === 'en'
              ? "The Day of Judgment is when all men will face the court of God. The dead will be raised to receive their sentence based on their deeds."
              : "Ang Araw ng Paghuhukom ay ang panahon na ang lahat ng tao ay haharap sa hukuman ng Diyos. Ang mga patay ay bubuhayin upang tanggapin ang kanilang hatol batay sa kanilang mga gawa."}
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <span className="font-bold block text-brand-blue mb-1"><ScriptureLink verse="Revelation 20:12" onHover={onHover}>Revelation 20:12</ScriptureLink></span>
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
      ),
      quiz: {
        title: "The Great Judgment",
        questions: [
          {
            question: lang === 'en' ? <>What will be the basis for judgment on the Day of Judgment?</> : <>Ano ang magiging batayan ng paghuhukom sa Araw ng Paghuhukom?</>,
            options: ["Personal opinions", "The Gospel/Bible and deeds", "Wealth and status", "Luck"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Revelation 20:12" onHover={onHover}>Revelation 20:12</ScriptureLink> and <ScriptureLink verse="Romans 2:16" onHover={onHover}>Romans 2:16</ScriptureLink> indicate that judgment is based on deeds and the gospel.</> : <>Ang <ScriptureLink verse="Revelation 20:12" onHover={onHover}>Apocalipsis 20:12</ScriptureLink> at <ScriptureLink verse="Romans 2:16" onHover={onHover}>Roma 2:16</ScriptureLink> ay nagpapahiwatig na ang paghuhukom ay batay sa mga gawa at sa ebanghelyo.</>
          },
          {
            question: lang === 'en' ? <>Who will be judged on that day?</> : <>Sino ang hahatulan sa araw na iyon?</>,
            options: ["Only the wicked", "Only the righteous", "All men, small and great", "Only those who are alive"],
            correctIndex: 2,
            explanation: lang === 'en' ? <><ScriptureLink verse="Revelation 20:12" onHover={onHover}>Revelation 20:12</ScriptureLink> says: 'And I saw the dead, small and great, stand before God'.</> : <>Sinasabi sa <ScriptureLink verse="Revelation 20:12" onHover={onHover}>Apocalipsis 20:12</ScriptureLink>: 'At nakita ko ang mga patay, malalaki at maliliit, na nangakatayo sa harapan ng luklukan'.</>
          }
        ]
      }
    },
    {
      id: 22,
      category: 'judgement',
      title: "The Book of Deeds",
      titleTl: "Ang Aklat ng mga Gawa",
      icon: Scroll,
      searchKeywords: "book of deeds recorded hidden works secrets conscience law heart romans 2:12 ecclesiastes 12:14",
      searchKeywordsTl: "aklat ng mga gawa nakatala lihim na gawa budhi kautusan puso roma 2:12 eclesiastes 12:14",
      searchContent: "Every hidden work is recorded in God's books. God will judge the secrets of men. Those who never heard the gospel will be judged based on the law written in their hearts and their conscience.",
      searchContentTl: "Bawat gawang inilihim ay nakatala sa mga aklat ng Diyos. Hahatulan ng Diyos ang mga lihim ng mga tao. Ang mga hindi nakarinig ng ebanghelyo ay hahatulan batay sa kautusang nakasulat sa kanilang mga puso at sa kanilang budhi.",
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
      ),
      quiz: {
        title: "The Book of Deeds",
        questions: [
          {
            question: lang === 'en' ? <>Is anything hidden from God's sight on Judgment Day?</> : <>Mayroon bang natatago sa paningin ng Diyos sa Araw ng Paghuhukom?</>,
            options: ["Yes, our private thoughts", "No, even hidden works will be revealed", "Only things we tell others", "Only big sins"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Ecclesiastes 12:14" onHover={onHover}>Ecclesiastes 12:14</ScriptureLink> says God shall bring every work into judgment, with every secret thing.</> : <>Sinasabi sa <ScriptureLink verse="Ecclesiastes 12:14" onHover={onHover}>Eclesiastes 12:14</ScriptureLink> na dadalhin ng Dios ang bawat gawa sa paghuhukom, pati ang bawat lihim na bagay.</>
          },
          {
            question: lang === 'en' ? <>How will those who never heard the gospel be judged?</> : <>Paano hahatulan ang mga hindi kailanman nakarinig ng ebanghelyo?</>,
            options: ["They won't be judged", "They are automatically saved", "Based on the law written in their hearts and conscience", "They are automatically condemned"],
            correctIndex: 2,
            explanation: lang === 'en' ? <><ScriptureLink verse="Romans 2:14" onHover={onHover}>Romans 2:14-15</ScriptureLink> explains that those without the law have the law written in their hearts, their conscience bearing witness.</> : <>Ipinaliliwanag sa <ScriptureLink verse="Roma 2:14" onHover={onHover}>Roma 2:14-15</ScriptureLink> na ang mga walang kautusan ay may kautusang nakasulat sa kanilang mga puso.</>
          }
        ]
      }
    },
    {
      id: 23,
      category: 'judgement',
      title: "Assurance of Salvation",
      titleTl: "Katiyakan ng Kaligtasan",
      icon: CheckCircle2,
      searchKeywords: "assurance salvation book of life steadfast rejoice overcome luke 10:20 revelation 3:5 matthew 24:42",
      searchKeywordsTl: "katiyakan kaligtasan aklat ng buhay matatag magalak magtagumpay lucas 10:20 apocalipsis 3:5 mateo 24:42",
      searchContent: "Those whose names are written in the Book of Life should rejoice. He that overcometh shall be clothed in white raiment, and his name will not be blotted out of the book of life. We must watch for the Lord's coming.",
      searchContentTl: "Ang mga may pangalan na nakasulat sa Aklat ng Buhay ay dapat magalak. Ang magtagumpay ay daramtang gayon ng mga mapuputing damit, at hindi papawiin ang kaniyang pangalan sa aklat ng buhay. Dapat tayong magbantay sa pagdating ng Panginoon.",
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
              <span className="text-[10px] font-bold mt-auto pt-4 text-brand-blue"><ScriptureLink verse="Luke 10:20" onHover={onHover}>Luke 10:20</ScriptureLink></span>
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
              <span className="text-[10px] font-bold mt-auto pt-4 text-brand-blue"><ScriptureLink verse="Revelation 3:5" onHover={onHover}>Revelation 3:5</ScriptureLink></span>
            </div>
          </div>
          <div className="bg-brand-dark text-white p-6 rounded-2xl text-center">
            <p className="text-sm italic mb-2">"Watch therefore: for ye know not what hour your Lord doth come."</p>
            <span className="text-brand-gold font-bold text-xs uppercase tracking-widest"><ScriptureLink verse="Matthew 24:42" onHover={onHover}>Matthew 24:42</ScriptureLink></span>
          </div>
        </div>
      ),
      quiz: {
        title: "Assurance of Salvation",
        questions: [
          {
            question: lang === 'en' ? <>Why should the disciples rejoice according to <ScriptureLink verse="Luke 10:20" onHover={onHover}>Luke 10:20</ScriptureLink>?</> : <>Bakit dapat magalak ang mga alagad ayon sa <ScriptureLink verse="Lucas 10:20" onHover={onHover}>Lucas 10:20</ScriptureLink>?</>,
            options: ["Because they have power", "Because their names are written in heaven", "Because they are rich", "Because they are famous"],
            correctIndex: 1,
            explanation: lang === 'en' ? <>Jesus told His disciples to rejoice because their names are written in heaven (<ScriptureLink verse="Luke 10:20" onHover={onHover}>Luke 10:20</ScriptureLink>).</> : <>Sinabi ni Jesus sa Kaniyang mga alagad na magalak dahil ang kanilang mga pangalan ay nakasulat sa langit (<ScriptureLink verse="Lucas 10:20" onHover={onHover}>Lucas 10:20</ScriptureLink>).</>
          },
          {
            question: lang === 'en' ? <>What is promised to those who overcome in <ScriptureLink verse="Revelation 3:5" onHover={onHover}>Revelation 3:5</ScriptureLink>?</> : <>Ano ang ipinangako sa mga magtatagumpay sa <ScriptureLink verse="Apocalipsis 3:5" onHover={onHover}>Apocalipsis 3:5</ScriptureLink>?</>,
            options: ["They will be rich", "Their name will not be blotted out of the Book of Life", "They will never have problems", "They will be kings on earth"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="Revelation 3:5" onHover={onHover}>Revelation 3:5</ScriptureLink> promises that the names of those who overcome will remain in the Book of Life.</> : <>Ipinangangako sa <ScriptureLink verse="Apocalipsis 3:5" onHover={onHover}>Apocalipsis 3:5</ScriptureLink> na ang mga pangalan ng magtatagumpay ay mananatili sa Aklat ng Buhay.</>
          }
        ]
      }
    },
    {
      id: 24,
      category: 'judgement',
      title: "The Holy Supper",
      titleTl: "Ang Banal na Hapunan",
      icon: Droplets,
      searchKeywords: "holy supper ordinance cleansing forgiveness sins self-examination house of god 1 peter 4:17 1 corinthians 11:29",
      searchKeywordsTl: "banal na hapunan tuntunin paglilinis kapatawaran kasalanan pagsisiyasat sa sarili bahay ng diyos 1 pedro 4:17 1 corinto 11:29",
      searchContent: "The Holy Supper is for the cleansing of the Church and forgiveness of sins. Judgment begins in the house of God, so we must examine ourselves before participating to avoid condemnation with the world.",
      searchContentTl: "Ang Banal na Hapunan ay para sa paglilinis ng Iglesia at kapatawaran ng mga kasalanan. Ang paghuhukom ay nagsisimula sa bahay ng Diyos, kaya dapat nating siyasatin ang ating sarili bago makibahagi upang huwag mahatulan kasama ng sanlibutan.",
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
      ),
      quiz: {
        title: "The Holy Supper",
        questions: [
          {
            question: lang === 'en' ? <>Where does judgment begin according to <ScriptureLink verse="1 Peter 4:17" onHover={onHover}>1 Peter 4:17</ScriptureLink>?</> : <>Saan nagsisimula ang paghuhukom ayon sa <ScriptureLink verse="1 Pedro 4:17" onHover={onHover}>1 Pedro 4:17</ScriptureLink>?</>,
            options: ["In the world", "In the house of God", "In the government", "In the schools"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="1 Peter 4:17" onHover={onHover}>1 Peter 4:17</ScriptureLink> states: 'For the time is come that judgment must begin at the house of God'.</> : <>Sinasabi sa <ScriptureLink verse="1 Pedro 4:17" onHover={onHover}>1 Pedro 4:17</ScriptureLink>: 'Sapagka't dumating na ang panahon na ang paghuhukom ay dapat magpasimula sa bahay ng Dios'.</>
          },
          {
            question: lang === 'en' ? <>What is the purpose of self-examination before the Holy Supper?</> : <>Ano ang layunin ng pagsisiyasat sa sarili bago ang Banal na Hapunan?</>,
            options: ["To see if we are rich", "To avoid being judged with the world", "To show off to others", "To check our health"],
            correctIndex: 1,
            explanation: lang === 'en' ? <><ScriptureLink verse="1 Corinthians 11:31" onHover={onHover}>1 Corinthians 11:31-32</ScriptureLink> explains that if we judge ourselves, we should not be judged, avoiding condemnation with the world.</> : <>Ipinaliliwanag sa <ScriptureLink verse="1 Corinto 11:31" onHover={onHover}>1 Corinto 11:31-32</ScriptureLink> na kung sisisiyasatin natin ang ating sarili, ay hindi tayo hahatulan.</>
          }
        ]
      }
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activeLesson, setActiveLesson] = useState(initialLessonId || 1);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [hasReadCurrent, setHasReadCurrent] = useState(false);
  const [showQuizPrompt, setShowQuizPrompt] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theTrueSeed_progress');
    if (saved) {
      try {
        setCompletedLessons(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theTrueSeed_progress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    if (initialLessonId) {
      setActiveLesson(initialLessonId);
    }
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory, initialLessonId]);

  // Reset reading state when lesson changes
  useEffect(() => {
    setHasReadCurrent(false);
    setShowQuizPrompt(false);
    setIsQuizActive(false);
  }, [activeLesson]);

  const handleMarkAsRead = () => {
    setHasReadCurrent(true);
    if (!completedLessons.includes(activeLesson)) {
      setCompletedLessons([...completedLessons, activeLesson]);
    }
    const currentLesson = lessons.find(l => l.id === activeLesson);
    if (currentLesson?.quiz) {
      setShowQuizPrompt(true);
    }
  };

  const filteredLessons = lessons.filter(l => {
    const query = searchQuery.toLowerCase().trim();
    if (query === '') return l.category === selectedCategory;

    const matchesTitle = l.title.toLowerCase().includes(query) || 
                         l.titleTl.toLowerCase().includes(query);
    
    const matchesKeywords = (l.searchKeywords?.toLowerCase().includes(query)) || 
                            (l.searchKeywordsTl?.toLowerCase().includes(query));

    const matchesContent = (l.searchContent?.toLowerCase().includes(query)) || 
                           (l.searchContentTl?.toLowerCase().includes(query));

    // Search in quiz questions and explanations
    const matchesQuiz = l.quiz?.questions.some(q => {
      const qText = typeof q.question === 'string' ? q.question.toLowerCase() : '';
      const expText = typeof q.explanation === 'string' ? q.explanation.toLowerCase() : '';
      const optionsText = q.options.some(o => typeof o === 'string' ? o.toLowerCase().includes(query) : false);
      
      return qText.includes(query) || expText.includes(query) || optionsText;
    });

    const matchesSearch = matchesTitle || matchesKeywords || matchesContent || matchesQuiz;
    
    // When searching, we show results from all categories to be more "responsive" and helpful
    return matchesSearch;
  });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery(''); // Clear search when switching categories to avoid "No results" UI issues
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
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-brand-blue mb-2 font-serif">
                {lang === 'en' ? "What would you like to learn today?" : "Ano ang nais mong pag-aralan ngayon?"}
              </h2>
              <p className="text-gray-500 text-sm">
                {lang === 'en' ? "Explore our library of biblical lessons and prophecies." : "Galugarin ang aming koleksyon ng mga aralin sa Biblia at mga hula."}
              </p>
            </div>

            <form 
              onSubmit={(e) => e.preventDefault()}
              className="relative mb-8 group"
            >
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-brand-gold group-focus-within:text-brand-blue transition-colors" />
              </div>
              <input 
                type="text"
                placeholder={lang === 'en' ? "Search for a lesson topic..." : "Maghanap ng paksa ng aralin..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-32 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none font-sans text-lg transition-all placeholder:text-gray-400"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-2">
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-2 text-gray-400 hover:text-brand-blue transition-colors"
                    title={lang === 'en' ? "Clear search" : "Linisin ang paghahanap"}
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
                <button 
                  type="submit"
                  className="bg-brand-blue text-white p-2.5 rounded-xl font-bold text-sm hover:bg-brand-dark transition-all shadow-md active:scale-95 flex items-center justify-center"
                  title={lang === 'en' ? "Search" : "Hanapin"}
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            <div className="overflow-x-auto pb-2 custom-scrollbar">
              <div className="flex justify-center gap-3 min-w-max">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all border-2 ${
                      selectedCategory === cat.id 
                        ? `border-brand-gold ${cat.color} text-white shadow-md scale-105` 
                        : 'border-gray-100 bg-white text-gray-500 hover:border-brand-blue/30'
                    }`}
                  >
                    <cat.icon className={`h-4 w-4 ${selectedCategory === cat.id ? 'text-brand-gold' : 'text-gray-400'}`} />
                    <span className="font-bold font-sans uppercase tracking-widest text-[10px]">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 lg:h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-2">
            <div className="px-4 py-2 flex items-center justify-between">
              <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 font-sans">
                {searchQuery 
                  ? (lang === 'en' ? "Search Results" : "Mga Resulta ng Paghahanap")
                  : (lang === 'en' ? "Module Selection" : "Pagpili ng Modyul")}
              </h2>
              {searchQuery && (
                <span className="text-[9px] bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-full font-bold animate-pulse">
                  {lang === 'en' ? "Global Search Active" : "Aktibo ang Pandaigdigang Paghahanap"}
                </span>
              )}
            </div>
              {filteredLessons.map((lesson) => (
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
                    {completedLessons.includes(lesson.id) ? <CheckCircle2 className="h-5 w-5" /> : <lesson.icon className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <div className={`font-bold font-sans text-sm ${activeLesson === lesson.id ? 'text-brand-blue' : 'text-gray-600'}`}>
                      {lang === 'en' ? lesson.title : lesson.titleTl}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="text-[10px] uppercase tracking-widest text-gray-400">Lesson {lesson.id < 10 ? `0${lesson.id}` : lesson.id}</div>
                      {searchQuery && (
                        <div className="text-[9px] uppercase tracking-tighter px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded font-bold">
                          {categories.find(c => c.id === lesson.category)?.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform ${activeLesson === lesson.id ? 'text-brand-gold translate-x-1' : 'text-gray-300'}`} />
                </button>
              ))}
              {filteredLessons.length === 0 && (
                <div className="text-center py-12 px-4 bg-white/30 rounded-2xl border-2 border-dashed border-gray-200">
                  <Search className="h-8 w-8 text-gray-300 mx-auto mb-3 opacity-50" />
                  <div className="text-gray-500 font-bold text-sm mb-1">
                    {lang === 'en' ? "No matches found" : "Walang nahanap na tugma"}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {lang === 'en' 
                      ? "Try searching for different keywords or topics." 
                      : "Subukang maghanap ng ibang mga keyword o paksa."}
                  </div>
                </div>
              )}
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

                      <div className="mt-12">
                        {!hasReadCurrent ? (
                          <button 
                            onClick={handleMarkAsRead}
                            className="w-full py-4 bg-brand-blue/10 text-brand-blue border-2 border-dashed border-brand-blue/30 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-blue/20 transition-all group"
                          >
                            <CheckCircle2 className="h-6 w-6 group-hover:scale-110 transition-transform" />
                            {lang === 'en' ? "I have finished reading this lesson" : "Tapos ko na basahin ang araling ito"}
                          </button>
                        ) : (
                          <div className="space-y-8">
                            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 text-emerald-700 font-bold text-sm">
                              <CheckCircle2 className="h-5 w-5" />
                              {lang === 'en' ? "Lesson Completed" : "Tapos na ang Aralin"}
                            </div>

                            {showQuizPrompt && currentLesson?.quiz && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-brand-gold/10 border-2 border-brand-gold/30 rounded-2xl p-8 text-center"
                              >
                                <Zap className="h-10 w-10 text-brand-gold mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-brand-blue mb-2">
                                  {lang === 'en' ? "Test Your Knowledge?" : "Subukan ang Iyong Kaalaman?"}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                  {lang === 'en' 
                                    ? "Great job! Would you like to take a quick quiz to reinforce what you've learned?" 
                                    : "Magaling! Gusto mo bang kumuha ng maikling pagsusulit para mapagtibay ang iyong natutunan?"}
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                  <button 
                                    onClick={() => {
                                      setIsQuizActive(true);
                                      setShowQuizPrompt(false);
                                    }}
                                    className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold hover:bg-brand-dark transition-colors shadow-lg"
                                  >
                                    {lang === 'en' ? "Yes, take quiz" : "Oo, kumuha ng pagsusulit"}
                                  </button>
                                  <button 
                                    onClick={() => setShowQuizPrompt(false)}
                                    className="bg-white text-gray-500 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors border border-gray-200"
                                  >
                                    {lang === 'en' ? "Maybe later" : "Mamaya na lang"}
                                  </button>
                                </div>
                              </motion.div>
                            )}

                            {isQuizActive && currentLesson?.quiz && (
                              <QuizComponent quiz={currentLesson.quiz} lang={lang} onHover={onHover} />
                            )}
                          </div>
                        )}
                      </div>

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
