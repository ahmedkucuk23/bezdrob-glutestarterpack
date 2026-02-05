"use client"

import { useState, useEffect, useMemo } from "react"
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

// Facebook Pixel tracking
declare global {
  interface Window {
    fbq: (action: string, event: string) => void
  }
}

const trackInitiateCheckout = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout')
  }
}

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

// Result screenshot images - manually balanced across 3 columns
const resultColumns = [
  // Column 1
  [
    "/result-1.jpg",   // Ne mogu vjerovati kolika je razlika (short)
    "/result-2.jpg",   // Ogromna razlika atomska bomba (short)
    "/result-5.jpg",   // Instagram story reply - investment (tall)
    "/result-7.jpg",   // Itekakooo se osjetii (short)
  ],
  // Column 2
  [
    "/result-3.jpg",   // WhatsApp hip trust bez patika (medium)
    "/result-4.jpg",   // Jedva cekala trening (medium)
    "/result-6.jpg",   // Obavezno cu probati (short)
    "/result-8.jpg",   // Vjeruj brate need all knowledge (short)
    "/result-14.jpg",  // Hip thrust sprava savjet (medium)
  ],
  // Column 3
  [
    "/result-9.jpg",   // Tacno cilja gdje treba (short)
    "/result-10.jpg",  // Coach nisam ni sumnjala (medium)
    "/result-13.jpg",  // Instagram DM trnce u gluteusu (tall)
    "/result-11.jpg",  // Izula sam se u carapama (short)
    "/result-12.jpg",  // WhatsApp Jutroo bas se bolje osjeti (medium)
  ],
]

// Flat list for mobile view
const allScreenshots = resultColumns.flat()

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
    lessons: 8
  },
  {
    title: "Modul 2: Tehnika Stopala",
    description: "Ekskluzivna Tehnika Aktivacije Stopala™ - tajna koju većina trenera nikad nije saznala.",
    lessons: 7
  },
  {
    title: "Modul 3: Vježbe za Rast",
    description: "Precizna izvedba svake vježbe. Od hip thrusta do Bulgarian split squata - sve detaljno objašnjeno.",
    lessons: 12
  },
  {
    title: "Modul 4: Progresija",
    description: "Kako pravilno povećavati težine i intenzitet. Progresivno opterećenje bez ozljeda.",
    lessons: 6
  },
  {
    title: "Modul 5: Prehrana & Oporavak",
    description: "Šta jesti za optimalni rast mišića. Kako se pravilno odmarati između treninga.",
    lessons: 6
  }
]

export default function LandingPage() {
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Set cart close date (5 days from now at 21:00)
  const cartCloseDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 5)
    date.setHours(21, 0, 0, 0)
    return date
  }, [])
  const [showAllDMs, setShowAllDMs] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = cartCloseDate.getTime() - now

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
              <div className="flex items-center">
                <Image src="/bezdrob-full-logo.png" alt="Bezdrob Transformation Program" width={180} height={32} className="invert h-6 sm:h-8 w-auto" />
              </div>
              <a href={WHOP_LINK} onClick={trackInitiateCheckout} className="btn-primary !py-2.5 !px-6 !text-base urgency-badge">
                Pridruži Se Sada
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Clean & Powerful */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-peach-500/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coral-500/15 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23fff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-8 pb-12 min-h-screen flex flex-col">
          {/* Top Bar - Logo & Urgency */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 md:mb-12"
          >
            <div className="flex items-center">
              <Image src="/bezdrob-full-logo.png" alt="Bezdrob Transformation Program" width={220} height={40} className="invert h-8 sm:h-10 w-auto" />
            </div>
            <div className="flex flex-col items-center sm:items-end gap-1">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-sm font-medium">Ograničena ponuda - Samo 5 dana u prodaji!</span>
              </div>
              <span className="text-white text-xs sm:text-sm">(do 08. Februara 2026) Poslije toga zatvaramo ZAUVIJEK!</span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 flex items-center">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
              {/* Left - Text Content */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="text-center lg:text-left"
              >
                {/* Headline */}
                <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
                  Treniraš mjesecima,
                  <span className="block text-gradient mt-2">a gluteus izgleda isto?</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Otkrij metodu koju koriste žene koje <span className="text-white font-semibold">STVARNO</span> grade gluteuse — i vidi rezultate već nakon <span className="text-peach-400 font-semibold">prvog treninga</span>.
                </motion.p>

                {/* CTA Button */}
                <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start mb-8">
                  <a
                    href={WHOP_LINK}
                    onClick={trackInitiateCheckout}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-peach-500 to-coral-500 text-white rounded-2xl font-bold text-lg hover:from-peach-600 hover:to-coral-600 transition-all duration-300 shadow-lg shadow-peach-500/25 hover:shadow-xl hover:shadow-peach-500/30 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Započni Transformaciju
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>

                {/* Trust Elements */}
                <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>60 dana garancije</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-peach-400" />
                    <span>2000+ transformacija</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span>Instant pristup</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right - Visual Card */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 3 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-peach-400 via-peach-500 to-coral-500 rounded-3xl p-1 shadow-2xl shadow-peach-500/20">
                  <div className="bg-gray-900 rounded-[22px] p-6 sm:p-8">
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-peach-400 text-sm font-semibold uppercase tracking-wider">Starter Pack</span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white">GLUTE LAB™</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">79.99 <span className="text-lg text-gray-400">KM</span></div>
                        <div className="text-sm text-gray-400">/ 39.99€</div>
                      </div>
                    </div>

                    {/* What's Inside */}
                    <div className="space-y-3 mb-6">
                      {[
                        { icon: Video, text: "39 video lekcija (220+ min)" },
                        { icon: BookOpen, text: "5 kompletnih modula" },
                        { icon: FileText, text: "10 radnih listova" },
                        { icon: Calendar, text: "8-sedmični akcioni plan" },
                        { icon: MessageCircle, text: "Pristup zajednici + Telegram" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-peach-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-4 h-4 text-peach-400" />
                          </div>
                          <span className="text-gray-300 text-sm sm:text-base">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Countdown */}
                    <div className="bg-gray-800/50 rounded-2xl p-4 mb-6">
                      <p className="text-center text-gray-400 text-sm mb-3">Ponuda ističe za:</p>
                      <div className="flex justify-center gap-3">
                        {[
                          { value: timeLeft.days, label: "dana" },
                          { value: timeLeft.hours, label: "sati" },
                          { value: timeLeft.minutes, label: "min" },
                          { value: timeLeft.seconds, label: "sek" }
                        ].map((item, i) => (
                          <div key={i} className="text-center">
                            <div className="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center mb-1">
                              <span className="text-2xl font-bold text-white countdown-number">{String(item.value).padStart(2, '0')}</span>
                            </div>
                            <span className="text-[10px] text-gray-500 uppercase">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA in Card */}
                    <a
                      href={WHOP_LINK}
                      onClick={trackInitiateCheckout}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-peach-500 to-coral-500 text-white rounded-xl font-bold text-lg hover:from-peach-600 hover:to-coral-600 transition-all"
                    >
                      Kupi Sada — 79.99 KM / 39.99€
                      <ArrowRight className="w-5 h-5" />
                    </a>

                    {/* Guarantee Badge */}
                    <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-sm">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>60 dana money-back garancije</span>
                    </div>
                  </div>
                </div>

                {/* Floating Testimonial */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-16 -left-4 sm:-left-8 bg-white rounded-2xl p-4 shadow-xl max-w-[240px] hidden sm:block"
                >
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-2">&quot;Prvi put sam osjetila gluteuse tokom čučnja!&quot;</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-peach-100 rounded-full flex items-center justify-center text-sm">🍑</div>
                    <div>
                      <div className="text-gray-900 text-sm font-semibold">Amela H.</div>
                      <div className="text-gray-500 text-xs">+6cm u 8 sedmica</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-10 -right-4 sm:-right-8 bg-gray-800 border border-gray-700 rounded-2xl p-4 shadow-xl hidden sm:block"
                >
                  <div className="text-3xl font-bold text-peach-400">2000+</div>
                  <div className="text-gray-400 text-sm">Transformacija</div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Bottom - Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center pt-8"
          >
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <span className="text-sm">Saznaj više</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.div>
        </div>
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
            <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <video src="/intro-video.mp4" controls autoPlay className="w-full h-full object-contain bg-black rounded-2xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Video Section */}
      <section className="bg-gray-50 pt-16 sm:pt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden"
            onViewportEnter={(entry) => {
              const video = entry?.target?.querySelector("video")
              if (video) video.play()
            }}
          >
            <video src="/intro-video.mp4" muted playsInline controls className="w-full h-full object-cover bg-black rounded-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Whop Platform Explainer (Top) */}
      <section className="section-padding relative overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6">
              <span className="text-lg text-gray-500">Kurs se nalazi na platformi:</span>
              <Image src="/whop-logo.svg" alt="Whop" width={100} height={32} className="h-8 w-auto" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Tvoj kurs. <span className="text-gradient">Jedna platforma.</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whop je <strong>#1 platforma na svijetu</strong> za online kurseve i coaching.
              Preko <strong>$2.5 milijarde</strong> je do sada uplaćeno kroz kurseve na Whop-u.
              Sigurna kupovina, instant pristup, i sve na jednom mjestu.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-[280px] sm:w-[320px]">
                <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-gray-900 rounded-b-2xl z-10" />
                  <div className="rounded-[2.25rem] overflow-hidden bg-black">
                    <video
                      src="/whop-preview.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Zašto Whop?</h3>
              <div className="space-y-5">
                {[
                  {
                    icon: Shield,
                    title: "Sigurna kupovina",
                    description: "Plaćanje karticom, PayPal-om ili Apple Pay-om. Tvoji podaci su 100% zaštićeni."
                  },
                  {
                    icon: Zap,
                    title: "Instant pristup",
                    description: "Odmah nakon kupovine dobivaš pristup svim modulima, video lekcijama i materijalima."
                  },
                  {
                    icon: Users,
                    title: "Zajednica uključena",
                    description: "Chat sa ostalim članicama, podrška i motivacija — sve unutar jedne aplikacije."
                  },
                  {
                    icon: Lock,
                    title: "Doživotni pristup",
                    description: "Jednom kupiš — tvoje zauvijek. Pristupaj sa telefona, tableta ili računara."
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-peach-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-peach-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={WHOP_LINK}
                onClick={trackInitiateCheckout}
                className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-peach-500 to-coral-500 text-white rounded-2xl font-bold text-lg hover:from-peach-600 hover:to-coral-600 transition-all shadow-lg shadow-peach-500/25 hover:shadow-xl hover:shadow-peach-500/30"
              >
                Pogledaj Kurs na Whop-u
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

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
                description: "Osjećaš samo noge, a gluteus ostaje isti. Frustrirajuće, zar ne?"
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
              <div className="aspect-square rounded-3xl relative overflow-hidden">
                <video src="/technique-video.mp4" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8 relative z-10">
                    <h3 className="text-3xl font-bold mb-2">TEHNIKA AKTIVACIJE STOPALA™</h3>
                    <p className="text-white/80">5 Koraka do Gluteusa Snova</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof - DM Screenshots */}
      <section className="section-padding bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-peach-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-coral-500/10 rounded-full blur-[120px]" />
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

          {/* Desktop: 3-column grid (all visible) */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto items-start">
            {resultColumns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-4">
                {column.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (colIndex * column.length + i) * 0.06 }}
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-gray-700/50 hover:border-peach-500/40 transition-all duration-300 group">
                      <Image
                        src={src}
                        alt="Poruka od zadovoljne klijentice"
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile: flat list, show 5 then expand */}
          <div className="sm:hidden flex flex-col gap-4 max-w-md mx-auto">
            {(showAllDMs ? allScreenshots : allScreenshots.slice(0, 5)).map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="relative rounded-2xl overflow-hidden border border-gray-700/50">
                  <Image
                    src={src}
                    alt="Poruka od zadovoljne klijentice"
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            ))}
            {!showAllDMs && (
              <button
                onClick={() => setShowAllDMs(true)}
                className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                Prikaži još DM-ova
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Bottom trust line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-full">
              <MessageCircle className="w-5 h-5 text-peach-400" />
              <span className="text-gray-300 text-sm">Ovo je samo mali dio poruka koje primamo svaki dan</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transformations - Before/After + Video Testimonials */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-peach-400 font-semibold mb-4 block">TRANSFORMACIJE</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              Dokaz je u <span className="text-gradient">rezultatima</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Pogledaj transformacije naših članica. Slike govore više od riječi.
            </p>
          </motion.div>

          {/* Before/After Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {[
              "/transformation-1.jpg",
              "/transformation-2.webp",
              "/transformation-3.webp",
              "/transformation-4.jpg",
            ].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-square rounded-2xl overflow-hidden border border-gray-700/50 group"
              >
                <Image
                  src={src}
                  alt="Transformacija prije i poslije"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-medium">Prije & Poslije</span>
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              <Video className="w-6 h-6 inline-block text-peach-400 mr-2 -mt-1" />
              Video Svjedočanstva
            </h3>
            <p className="text-gray-400">Čuj direktno od žena koje su prošle transformaciju</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "/video-testimonial-1.mp4",
              "/video-testimonial-2.mp4",
              "/video-testimonial-3.mp4",
            ].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl overflow-hidden border border-gray-700/50 bg-gray-800"
              >
                <video
                  src={src}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full aspect-[9/16] object-cover bg-black"
                />
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
              { icon: Clock, value: "220+", label: "Minuta" },
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
                  <div className="flex items-center text-sm text-gray-500 sm:flex-shrink-0">
                    <span className="flex items-center gap-1">
                      <Video className="w-4 h-4" />
                      {module.lessons} lekcija
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
                  title: "8-Sedmični Akcioni Plan",
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
                  description: "Ekskluzivna grupa na istom putu",
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
            <span className="text-peach-500 font-semibold mb-4 block">CIJENA</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Započni svoju <span className="text-gradient">transformaciju</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ograničena ponuda — dostupno samo 5 dana. 60 dana garancije povrata novca.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <div className="relative pt-4">
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10 px-4 py-1 bg-peach-500 text-white text-sm font-semibold rounded-full">
                LIMITIRANA PONUDA
              </div>
              <div className="pricing-popular bg-white rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">GLUTE LAB STARTER PACK™</h3>
                  <p className="text-gray-600 mb-4">Sve što trebaš za transformaciju</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-peach-600">79.99</span>
                    <span className="text-xl text-gray-600">KM</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="text-2xl font-semibold text-gray-500">/ 39.99€</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    "5 Modula Programa",
                    "39 Video Lekcija",
                    "10 Radnih Listova",
                    "8-Sedmični Plan",
                    "Pristup Zajednici",
                    "Direktan Telegram Pristup"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-peach-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={WHOP_LINK}
                  onClick={trackInitiateCheckout}
                  className="w-full btn-primary justify-center urgency-badge"
                >
                  Započni Sada — 79.99 KM / 39.99€
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-sm">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>60 dana money-back garancije</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Whop Platform Explainer */}
      <section className="section-padding relative overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6">
              <span className="text-lg text-gray-500">Kurs se nalazi na platformi:</span>
              <Image src="/whop-logo.svg" alt="Whop" width={100} height={32} className="h-8 w-auto" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Tvoj kurs. <span className="text-gradient">Jedna platforma.</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whop je <strong>#1 platforma na svijetu</strong> za online kurseve i coaching.
              Preko <strong>$2.5 milijarde</strong> je do sada uplaćeno kroz kurseve na Whop-u.
              Sigurna kupovina, instant pristup, i sve na jednom mjestu.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left: Phone mockup with screen recording */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-[280px] sm:w-[320px]">
                {/* Phone frame */}
                <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-gray-900 rounded-b-2xl z-10" />
                  {/* Screen */}
                  <div className="rounded-[2.25rem] overflow-hidden bg-black">
                    <video
                      src="/whop-preview.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Zašto Whop?</h3>
              <div className="space-y-5">
                {[
                  {
                    icon: Shield,
                    title: "Sigurna kupovina",
                    description: "Plaćanje karticom, PayPal-om ili Apple Pay-om. Tvoji podaci su 100% zaštićeni."
                  },
                  {
                    icon: Zap,
                    title: "Instant pristup",
                    description: "Odmah nakon kupovine dobivaš pristup svim modulima, video lekcijama i materijalima."
                  },
                  {
                    icon: Users,
                    title: "Zajednica uključena",
                    description: "Chat sa ostalim članicama, podrška i motivacija — sve unutar jedne aplikacije."
                  },
                  {
                    icon: Lock,
                    title: "Doživotni pristup",
                    description: "Jednom kupiš — tvoje zauvijek. Pristupaj sa telefona, tableta ili računara."
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-peach-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-peach-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={WHOP_LINK}
                onClick={trackInitiateCheckout}
                className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-peach-500 to-coral-500 text-white rounded-2xl font-bold text-lg hover:from-peach-600 hover:to-coral-600 transition-all shadow-lg shadow-peach-500/25 hover:shadow-xl hover:shadow-peach-500/30"
              >
                Pogledaj Kurs na Whop-u
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
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
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
                <Image src="/imran-bezdrob.webp" alt="Imran Bezdrob" fill className="object-cover" />
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
              <a href={WHOP_LINK} onClick={trackInitiateCheckout} className="btn-primary text-lg urgency-badge group">
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
              <Image src="/bezdrob-full-logo.png" alt="Bezdrob Transformation Program" width={200} height={36} className="invert h-8 sm:h-10 w-auto mx-auto md:mx-0 mb-2" />
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
              <a href="https://mita.agency" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-xs mt-1 hover:text-gray-400 transition-colors">Powered by mita.agency</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
