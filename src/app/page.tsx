"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  CheckCircle2,
  Play,
  Star,
  Shield,
  Clock,
  Users,
  Zap,
  Target,
  Heart,
  Award,
  MessageCircle,
  ChevronDown,
  Flame,
  Lock,
  Gift,
  BookOpen,
  Video,
  FileText,
  Calendar,
  Sparkles,
  Instagram,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

// WHOP checkout link - replace with actual link
const WHOP_LINK = "https://whop.com/bezdrob-glute-starter-pack/"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

// Countdown timer component
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex gap-3 sm:gap-4 justify-center">
      {[
        { value: timeLeft.days, label: "DANA" },
        { value: timeLeft.hours, label: "SATI" },
        { value: timeLeft.minutes, label: "MIN" },
        { value: timeLeft.seconds, label: "SEK" }
      ].map((item, i) => (
        <div key={i} className="text-center">
          <div className="w-16 sm:w-20 h-16 sm:h-20 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
            <span className="text-2xl sm:text-3xl font-bold text-white countdown-number">{String(item.value).padStart(2, '0')}</span>
          </div>
          <span className="text-xs text-white/70 mt-2 block">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

// FAQ Item component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-b border-gray-200 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="text-lg font-semibold text-gray-900 pr-8">{question}</span>
        <ChevronDown className={cn("w-5 h-5 text-peach-500 transition-transform flex-shrink-0", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Testimonial data
const testimonials = [
  {
    quote: "Prvi put sam osjetila gluteuse tokom čučnja! Ne mogu vjerovati kolika je razlika.",
    author: "Amela H.",
    result: "+6cm u obimu",
    avatar: "🍑"
  },
  {
    quote: "Mjesecima sam radila čučnjeve bez rezultata. Tehnika Aktivacije Stopala je sve promijenila!",
    author: "Sara M.",
    result: "8 sedmica",
    avatar: "💪"
  },
  {
    quote: "Konačno znam da li radim vježbe ispravno. Najbolja investicija u sebe!",
    author: "Lejla K.",
    result: "Transformacija",
    avatar: "⭐"
  },
  {
    quote: "Moj dečko je primijetio razliku nakon samo jednog treninga! Hvala Imrane!",
    author: "Dina S.",
    result: "+4cm u 6 sedmica",
    avatar: "🔥"
  },
  {
    quote: "Osjećam se kao da sam pronašla sveti gral za gluteuse. Sve je objašnjeno savršeno.",
    author: "Amina R.",
    result: "Život promijenjen",
    avatar: "✨"
  },
  {
    quote: "2 godine pokušavam, ovo je prvi put da vidim pravi smisao u treningu gluteusa.",
    author: "Nejra T.",
    result: "+5cm za 10 sedmica",
    avatar: "🎯"
  }
]

// FAQ data
const faqs = [
  {
    question: "Nemam vremena za trening - hoće li ovo raditi za mene?",
    answer: "Program zahtijeva samo 45 minuta, 4 puta sedmično. To je manje od jedne Netflix epizode. Ako imaš 3 sata sedmično, imaš dovoljno vremena za transformaciju svojih gluteusa."
  },
  {
    question: "Šta ako sam probala sve prije i ništa nije radilo?",
    answer: "Upravo zato smo kreirali ovaj program. Tehnika Aktivacije Stopala™ je metoda koju većina trenera jednostavno ne poznaje. Ovo nije još jedan generički program - ovo je sistem zasnovan na godinama rada sa 2000+ klijentata i stvarnim rezultatima."
  },
  {
    question: "Trebam li teretanu ili posebnu opremu?",
    answer: "Ne. 80% vježbi možeš raditi kod kuće. Jedan set tegova (ili čak bez tegova na početku) je sasvim dovoljan. Teretana je bonus, ali nije nužna."
  },
  {
    question: "Da li ću postati previše mišićava?",
    answer: "Ne. Program je dizajniran da gradi ženstvene, okrugle obline - ne bodybuilder izgled. Pogledaj transformacije naših članica - sve su zadržale ženstvenu figuru."
  },
  {
    question: "Šta ako nemam motivaciju da nastavim?",
    answer: "Zato imaš pristup ekskluzivnoj zajednici sestara koje prolaze isti put. Plus, direktan pristup Imranu putem Telegrama. Nećeš biti sama - mi smo tu da te podržimo na svakom koraku."
  },
  {
    question: "Kako funkcioniše garancija?",
    answer: "Imaš punih 60 dana da probaš program. Završi prva 3 modula, pošalji progress fotografije. Ako ne vidiš rezultate - vraćamo ti novac u potpunosti. Bez pitanja, bez komplikacija."
  },
  {
    question: "Da li je program prikladan za početnike?",
    answer: "Apsolutno! Program je dizajniran za SVE nivoe. Počinjemo od potpunih osnova i gradimo postupno. Svaka vježba ima detaljno video objašnjenje."
  },
  {
    question: "Koliko brzo ću vidjeti rezultate?",
    answer: "Većina članica primjećuje razliku u osjećaju već nakon prvog treninga. Vidljivi fizički rezultati tipično dolaze nakon 3-4 sedmice konzistentnog rada."
  }
]

// Modules data
const modules = [
  {
    title: "Modul 1: Osnove Aktivacije",
    description: "Naučite kako 'probuditi' gluteuse prije svakog treninga. Mind-muscle konekcija od prvog dana.",
    lessons: 8,
    duration: "120+ min"
  },
  {
    title: "Modul 2: Tehnika Stopala",
    description: "Ekskluzivna Tehnika Aktivacije Stopala™ - tajna koju većina trenera nikad nije saznala.",
    lessons: 7,
    duration: "95+ min"
  },
  {
    title: "Modul 3: Vježbe za Rast",
    description: "Precizna izvedba svake vježbe. Od hip thrusta do Bulgarian split squata - sve detaljno objašnjeno.",
    lessons: 12,
    duration: "180+ min"
  },
  {
    title: "Modul 4: Progresija",
    description: "Kako pravilno povećavati težine i intenzitet. Progresivno opterećenje bez ozljeda.",
    lessons: 6,
    duration: "85+ min"
  },
  {
    title: "Modul 5: Prehrana & Oporavak",
    description: "Šta jesti za optimalni rast mišića. Kako se pravilno odmarati između treninga.",
    lessons: 6,
    duration: "75+ min"
  }
]

export default function LandingPage() {
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)

  // Set cart close date (example: 5 days from now)
  const cartCloseDate = new Date()
  cartCloseDate.setDate(cartCloseDate.getDate() + 5)
  cartCloseDate.setHours(21, 0, 0, 0)

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Sticky CTA Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800"
          >
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <div className="hidden sm:flex items-center gap-3">
                <Flame className="w-5 h-5 text-peach-500" />
                <span className="text-white font-medium">GLUTE LAB STARTER PACK™</span>
                <span className="text-peach-400 text-sm">od 299 KM</span>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-white/70 text-sm hidden md:block">Vrata se zatvaraju uskoro!</span>
                <a href={WHOP_LINK} className="btn-primary !py-2.5 !px-6 !text-base urgency-badge">
                  Pridruži Se Sada
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-8 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-peach-500/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-coral-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Urgency Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-full mb-6 border border-red-500/30"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-red-300 font-medium">⚡ OGRANIČENA PONUDA - Vrata se zatvaraju uskoro!</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-white"
            >
              Radiš čučnjeve mjesecima,
              <br />
              <span className="text-gradient">a guzica izgleda isto?</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Otkrij <span className="text-peach-400 font-semibold">Tehniku Aktivacije Stopala™</span> koju koristi 95% žena koje STVARNO grade gluteuse — i konačno vidi rezultate za koje si mislila da su nemoguće.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href={WHOP_LINK} className="btn-primary text-lg urgency-badge group">
                Započni Svoju Transformaciju
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setVideoPlaying(true)}
                className="btn-outline group"
              >
                <Play className="w-5 h-5" />
                Pogledaj Video
              </button>
            </motion.div>

            {/* Social Proof Quick Stats */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-8 mb-12"
            >
              {[
                { value: "2000+", label: "Transformacija" },
                { value: "39", label: "Video Lekcija" },
                { value: "655+", label: "Minuta Sadržaja" },
                { value: "60", label: "Dana Garancije" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-peach-400">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Countdown Timer */}
            <motion.div variants={fadeInUp} className="mb-8">
              <p className="text-white/70 mb-4 text-sm uppercase tracking-wider">Vrata se zatvaraju za:</p>
              <CountdownTimer targetDate={cartCloseDate} />
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>60 Dana Garancije</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-500" />
                <span>Sigurna Kupovina</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-green-500" />
                <span>Instant Pristup</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-peach-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {videoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setVideoPlaying(false)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-peach-400 transition-colors">
              <X className="w-8 h-8" />
            </button>
            <div className="w-full max-w-4xl aspect-video bg-gray-800 rounded-2xl flex items-center justify-center">
              <p className="text-gray-400">Video placeholder - dodaj YouTube/Vimeo embed</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pain Points Section */}
      <section className="section-padding bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-peach-500 font-semibold mb-4 block">ZVUČI POZNATO?</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Zašto tvoji čučnjevi <span className="text-gradient">ne daju rezultate</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: X,
                title: "Radiš čučnjeve, ali gluteusi ne rastu",
                description: "Osjećaš samo noge, a guzica ostaje ista. Frustrirajuće, zar ne?"
              },
              {
                icon: X,
                title: "Misliš da je genetika kriva",
                description: "Govoriš sebi 'Možda jednostavno nisam napravljena za lijepu figuru.'"
              },
              {
                icon: X,
                title: "Gubiš motivaciju",
                description: "Počinješ razmišljati o odustajanju jer ne vidiš smisao u trudu."
              },
              {
                icon: X,
                title: "Fokusiraš se na količinu, ne kvalitetu",
                description: "Radiš 100 čučnjeva, ali bez pravilne aktivacije - uzalud."
              },
              {
                icon: X,
                title: "Nemaš progresivan plan",
                description: "Radiš iste vježbe, istim težinama, mjesecima. Tijelo se prilagodilo."
              },
              {
                icon: X,
                title: "Ne razumiješ mind-muscle konekciju",
                description: "Ne znaš kako 'osjetiti' gluteuse tokom vježbe."
              }
            ].map((pain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-red-200 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <pain.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{pain.title}</h3>
                <p className="text-gray-600">{pain.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ako si se prepoznala u bilo čemu od ovoga...
              <span className="text-peach-600 font-semibold"> Nisi sama.</span>
              <br />I ono što ćeš sada saznati će ti promijeniti sve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-peach-50/30 to-white" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-peach-500 font-semibold mb-4 block">RJEŠENJE</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Predstavljamo: <span className="text-gradient">Tehniku Aktivacije Stopala™</span>
            </h2>
            <p className="text-xl text-gray-600">
              Metoda koju sam razvio nakon 10+ godina rada sa 2000+ klijentata.
              Tajna koju 99% trenera jednostavno ne poznaje.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left: Explanation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Pozicija Stopala",
                    description: "Stopala paralelno, širina kukova. Pete čvrsto na podu, prsti opušteni."
                  },
                  {
                    step: "2",
                    title: "Aktivacija",
                    description: "Pritisnite pete u pod kao da gurate pod od sebe. Gluteusi se 'bude'."
                  },
                  {
                    step: "3",
                    title: "Mind-Muscle Konekcija",
                    description: "Fokusirajte um na gluteuse. Osjetite kontrakciju prije nego počnete pokret."
                  },
                  {
                    step: "4",
                    title: "Izvedba",
                    description: "Sada radite vježbu zadržavajući aktivaciju. Sporije = bolje rezultate."
                  },
                  {
                    step: "5",
                    title: "Verifikacija",
                    description: "Nakon seta, stisnite gluteuse. Osjećate burning? To znači da radi!"
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-peach-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-peach-400 to-coral-500 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="text-center text-white p-8 relative z-10">
                  <div className="text-8xl mb-4">🍑</div>
                  <h3 className="text-3xl font-bold mb-2">TEHNIKA AKTIVACIJE STOPALA™</h3>
                  <p className="text-white/80">5 Koraka do Gluteusa Snova</p>
                </div>
                {/* Floating elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center float-slow">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-12 right-8 w-14 h-14 bg-white/20 rounded-full flex items-center justify-center float-medium">
                  <Target className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="section-padding bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-peach-500/10 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-peach-400 font-semibold mb-4 block">REZULTATI</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              Prave žene. <span className="text-gradient">Pravi rezultati.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ovo nisu plaćene glumice. Ovo su DM-ovi koje dobijam svaki dan.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-peach-500/50 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-peach-400 text-peach-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-peach-500/20 rounded-full flex items-center justify-center text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-sm text-peach-400">{testimonial.result}</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included - Modules */}
      <section className="section-padding relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-peach-500 font-semibold mb-4 block">ŠTA DOBIVAŠ</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Sve što trebaš za <span className="text-gradient">transformaciju</span>
            </h2>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            {[
              { icon: BookOpen, value: "5", label: "Modula" },
              { icon: Video, value: "39", label: "Video Lekcija" },
              { icon: Clock, value: "655+", label: "Minuta" },
              { icon: FileText, value: "10", label: "Radnih Listova" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-2xl"
              >
                <stat.icon className="w-8 h-8 text-peach-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Modules List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {modules.map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-peach-300 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-peach-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-peach-600 font-bold text-lg">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{module.title}</h3>
                      <p className="text-gray-600">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 sm:flex-shrink-0">
                    <span className="flex items-center gap-1">
                      <Video className="w-4 h-4" />
                      {module.lessons} lekcija
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {module.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bonuses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-center mb-8">
              <Gift className="w-6 h-6 inline-block text-peach-500 mr-2" />
              Plus Ekskluzivni Bonusi
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "5-Sedmični Akcioni Plan",
                  description: "Korak-po-korak vodič kroz cijelu transformaciju",
                  icon: Calendar
                },
                {
                  title: "Jutarnji Aktivacijski Ritual",
                  description: "5-minutna rutina za savršen početak dana",
                  icon: Sparkles
                },
                {
                  title: "Pristup Zajednici",
                  description: "Ekskluzivna grupa sestara na istom putu",
                  icon: Users
                },
                {
                  title: "Direktan Telegram Pristup",
                  description: "Pitaj Imrana bilo šta, bilo kad",
                  icon: MessageCircle
                }
              ].map((bonus, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-peach-50 border border-peach-100 rounded-xl"
                >
                  <div className="w-10 h-10 bg-peach-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <bonus.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{bonus.title}</h4>
                    <p className="text-sm text-gray-600">{bonus.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-peach-500 font-semibold mb-4 block">PAKETI</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Izaberi svoju <span className="text-gradient">transformaciju</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tri paketa za svaki budžet. Svi uključuju 60 dana garancije povrata novca.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Starter Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">STARTER</h3>
                <p className="text-gray-600 mb-4">Savršen za početak</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900">299</span>
                  <span className="text-xl text-gray-600">KM</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "5 Modula Programa",
                  "39 Video Lekcija",
                  "10 Radnih Listova",
                  "5-Sedmični Plan",
                  "Pristup Zajednici"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={WHOP_LINK}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Započni Sada
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Complete Package - Popular */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-peach-500 text-white text-sm font-semibold rounded-full">
                NAJPOPULARNIJE
              </div>
              <div className="pricing-popular bg-white rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">COMPLETE</h3>
                  <p className="text-gray-600 mb-4">Najbolja vrijednost</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-peach-600">499</span>
                    <span className="text-xl text-gray-600">KM</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "Sve iz STARTER paketa",
                    "Jutarnji Aktivacijski Ritual",
                    "Bonus: Prehrana za Rast",
                    "Direktan Telegram Pristup",
                    "Prioritetna Podrška"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-peach-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={WHOP_LINK}
                  className="w-full btn-primary justify-center urgency-badge"
                >
                  Započni Sada
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* VIP Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:shadow-xl transition-all"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">VIP</h3>
                <p className="text-gray-400 mb-4">Za ozbiljne rezultate</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-white">899</span>
                  <span className="text-xl text-gray-400">KM</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Sve iz COMPLETE paketa",
                  "2x Privatni Video Poziv",
                  "Personalizirani Plan Treninga",
                  "Analiza Forme (video review)",
                  "Lifetime Pristup Ažuriranjima"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-peach-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={WHOP_LINK}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Započni VIP
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Value Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 max-w-2xl mx-auto text-center"
          >
            <p className="text-gray-600 mb-4">Ukupna vrijednost svega što dobijaš:</p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-3xl text-gray-400 line-through">1.979 KM</span>
              <span className="text-xl text-peach-600 font-semibold">Danas od 299 KM</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                60 Dana <span className="text-green-600">Garancije</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
                Ako u prvih 60 dana ne budeš zadovoljna rezultatima - vraćamo ti novac.
                Bez pitanja. Bez komplikacija. Bez rizika za tebe.
              </p>
              <div className="bg-white rounded-2xl p-6 max-w-lg mx-auto">
                <h3 className="font-bold text-gray-900 mb-3">Kako funkcioniše?</h3>
                <ol className="text-left space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold text-green-600">1</span>
                    <span>Završi prva 3 modula programa</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold text-green-600">2</span>
                    <span>Pošalji progress fotografije</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold text-green-600">3</span>
                    <span>Ako nema rezultata - pun povrat novca</span>
                  </li>
                </ol>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About / Authority Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-peach-400 to-coral-500 rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-9xl mb-4">💪</div>
                    <p className="text-xl font-semibold">Imran Bezdrob</p>
                    <p className="text-white/80">Founder & Head Coach</p>
                  </div>
                </div>
              </div>
              {/* Stats badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6">
                <div className="text-3xl font-bold text-peach-600">2000+</div>
                <div className="text-gray-600">Transformacija</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-peach-500 font-semibold mb-4 block">KO SAM JA</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                Imran <span className="text-gradient">Bezdrob</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Sa više od <strong>10 godina iskustva</strong> u fitnessu i preko <strong>2000 uspješnih transformacija</strong>,
                posvetio sam svoj život pomaganju ženama da postignu tijelo o kojem su oduvijek sanjale.
              </p>
              <blockquote className="border-l-4 border-peach-500 pl-6 py-2 mb-8 italic text-gray-500">
                &quot;Problem nije u vama. Problem je u metodi. I ja sam tu da vam pokažem pravu metodu.&quot;
              </blockquote>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Certificirani Personal Trainer",
                  "Specijalist za Glute Trening",
                  "Nutrition Coach",
                  "10+ Godina Iskustva"
                ].map((credential, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-peach-500" />
                    <span className="text-gray-700 text-sm">{credential}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-peach-500 font-semibold mb-4 block">PITANJA</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Imaš pitanja? <span className="text-gradient">Imamo odgovore.</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-peach-500/10 rounded-full blur-[200px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Urgency */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full mb-8 border border-red-500/30">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-300 font-medium">Ograničen broj mjesta!</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
              Spremna za svoju <span className="text-gradient">transformaciju?</span>
            </h2>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Zamislite sebe za 8 sedmica. Gluteusi koje ste oduvijek htjeli.
              Samopouzdanje koje zrači. Ponos kad se pogledate u ogledalo.
            </p>

            {/* Countdown */}
            <div className="mb-8">
              <p className="text-white/70 mb-4 text-sm">Vrata se zatvaraju za:</p>
              <CountdownTimer targetDate={cartCloseDate} />
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href={WHOP_LINK} className="btn-primary text-lg urgency-badge group">
                Da, Želim Transformaciju!
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Final trust elements */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>60 Dana Garancije</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-500" />
                <span>Sigurna Kupovina</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-green-500" />
                <span>Instant Pristup</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">GLUTE LAB STARTER PACK™</h3>
              <p className="text-gray-500">by Imran Bezdrob</p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/bezdrob.tp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/387644607444"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">© 2026 Bezdrob. Sva prava zadržana.</p>
              <p className="text-gray-600 text-xs mt-1">Powered by WHOP</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
