"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Shield,
  Clock,
  Users,
  Zap,
  Award,
  MessageCircle,
  ChevronDown,
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

// Translations
type Language = 'bs' | 'en'

const translations = {
  bs: {
    // Sticky bar
    stickyBar: {
      cta: "Pridruži Se Sada",
    },
    // Hero section
    hero: {
      limitedOffer: "Ograničena ponuda - Samo 5 dana u prodaji!",
      closingDate: "(do 10. Februara 2026) Poslije toga zatvaramo ZAUVIJEK!",
      headline: "Treniraš mjesecima,",
      headlineHighlight: "a gluteus izgleda isto?",
      subheadline: "Otkrij metodu koju koriste žene koje",
      subheadlineStrong: "STVARNO",
      subheadlineEnd: "grade gluteuse — i vidi rezultate već nakon",
      subheadlineHighlight: "prvog treninga",
      cta: "Započni Transformaciju",
      trust60days: "60 dana garancije",
      trust2000: "2000+ transformacija",
      trustInstant: "Instant pristup",
      starterPack: "Starter Pack",
      gluteLab: "GLUTE LAB™",
      offerExpires: "Ponuda ističe za:",
      days: "dana",
      hours: "sati",
      min: "min",
      sec: "sek",
      buyNow: "Kupi Sada — 79.99 KM / 39.99€",
      moneyBack: "60 dana money-back garancije",
      testimonialQuote: "\"Prvi put sam osjetila gluteuse tokom čučnja!\"",
      testimonialName: "Amela H.",
      testimonialResult: "+6cm u 8 sedmica",
      transformations: "Transformacija",
      learnMore: "Saznaj više",
      videoLessons: "39 video lekcija (220+ min)",
      modules: "5 kompletnih modula",
      worksheets: "10 radnih listova",
      actionPlan: "8-sedmični akcioni plan",
      communityAccess: "Pristup zajednici + Telegram",
    },
    // Whop section
    whop: {
      platformText: "Kurs se nalazi na platformi:",
      headline: "Tvoj kurs.",
      headlineHighlight: "Jedna platforma.",
      description: "Whop je <strong>#1 platforma na svijetu</strong> za online kurseve i coaching. Preko <strong>$2.5 milijarde</strong> je do sada uplaćeno kroz kurseve na Whop-u. Sigurna kupovina, instant pristup, i sve na jednom mjestu.",
      whyWhop: "Zašto Whop?",
      securePurchase: "Sigurna kupovina",
      securePurchaseDesc: "Plaćanje karticom, PayPal-om ili Apple Pay-om. Tvoji podaci su 100% zaštićeni.",
      instantAccess: "Instant pristup",
      instantAccessDesc: "Odmah nakon kupovine dobivaš pristup svim modulima, video lekcijama i materijalima.",
      communityIncluded: "Zajednica uključena",
      communityIncludedDesc: "Chat sa ostalim članicama, podrška i motivacija — sve unutar jedne aplikacije.",
      lifetimeAccess: "Doživotni pristup",
      lifetimeAccessDesc: "Jednom kupiš — tvoje zauvijek. Pristupaj sa telefona, tableta ili računara.",
      viewCourse: "Pogledaj Kurs na Whop-u",
    },
    // Pain points section
    painPoints: {
      tagline: "ZVUČI POZNATO?",
      headline: "Zašto tvoji čučnjevi",
      headlineHighlight: "ne daju rezultate",
      pain1Title: "Radiš čučnjeve, ali gluteusi ne rastu",
      pain1Desc: "Osjećaš samo noge, a gluteus ostaje isti. Frustrirajuće, zar ne?",
      pain2Title: "Misliš da je genetika kriva",
      pain2Desc: "Govoriš sebi 'Možda jednostavno nisam napravljena za lijepu figuru.'",
      pain3Title: "Gubiš motivaciju",
      pain3Desc: "Počinješ razmišljati o odustajanju jer ne vidiš smisao u trudu.",
      pain4Title: "Fokusiraš se na količinu, ne kvalitetu",
      pain4Desc: "Radiš 100 čučnjeva, ali bez pravilne aktivacije - uzalud.",
      pain5Title: "Nemaš progresivan plan",
      pain5Desc: "Radiš iste vježbe, istim težinama, mjesecima. Tijelo se prilagodilo.",
      pain6Title: "Ne razumiješ mind-muscle konekciju",
      pain6Desc: "Ne znaš kako 'osjetiti' gluteuse tokom vježbe.",
      bottomText1: "Ako si se prepoznala u bilo čemu od ovoga...",
      bottomText2: "Nisi sama.",
      bottomText3: "I ono što ćeš sada saznati će ti promijeniti sve.",
    },
    // Solution section
    solution: {
      tagline: "RJEŠENJE",
      headline: "Predstavljamo:",
      headlineHighlight: "Tehniku Aktivacije Stopala™",
      description: "Metoda koju sam razvio nakon 10+ godina rada sa 2000+ klijentata. Tajna koju 99% trenera jednostavno ne poznaje.",
      step1Title: "Pozicija Stopala",
      step1Desc: "Stopala paralelno, širina kukova. Pete čvrsto na podu, prsti opušteni.",
      step2Title: "Aktivacija",
      step2Desc: "Pritisnite pete u pod kao da gurate pod od sebe. Gluteusi se 'bude'.",
      step3Title: "Mind-Muscle Konekcija",
      step3Desc: "Fokusirajte um na gluteuse. Osjetite kontrakciju prije nego počnete pokret.",
      step4Title: "Izvedba",
      step4Desc: "Sada radite vježbu zadržavajući aktivaciju. Sporije = bolje rezultate.",
      step5Title: "Verifikacija",
      step5Desc: "Nakon seta, stisnite gluteuse. Osjećate burning? To znači da radi!",
      videoTitle: "TEHNIKA AKTIVACIJE STOPALA™",
      videoSubtitle: "5 Koraka do Gluteusa Snova",
    },
    // Social proof section
    socialProof: {
      tagline: "REZULTATI",
      headline: "Prave žene.",
      headlineHighlight: "Pravi rezultati.",
      description: "Ovo nisu plaćene glumice. Ovo su DM-ovi koje dobijam svaki dan.",
      imageAlt: "Poruka od zadovoljne klijentice",
      showMore: "Prikaži još DM-ova",
      bottomText: "Ovo je samo mali dio poruka koje primamo svaki dan",
    },
    // Transformations section
    transformations: {
      tagline: "TRANSFORMACIJE",
      headline: "Dokaz je u",
      headlineHighlight: "rezultatima",
      description: "Pogledaj transformacije naših članica. Slike govore više od riječi.",
      beforeAfter: "Prije & Poslije",
      videoTestimonials: "Video Svjedočanstva",
      videoTestimonialsDesc: "Čuj direktno od žena koje su prošle transformaciju",
    },
    // What's included section
    included: {
      tagline: "ŠTA DOBIVAŠ",
      headline: "Sve što trebaš za",
      headlineHighlight: "transformaciju",
      modules: "Modula",
      videoLessons: "Video Lekcija",
      minutes: "Minuta",
      worksheets: "Radnih Listova",
      lessons: "lekcija",
      module1Title: "Modul 1: Osnove Aktivacije",
      module1Desc: "Naučite kako 'probuditi' gluteuse prije svakog treninga. Mind-muscle konekcija od prvog dana.",
      module2Title: "Modul 2: Tehnika Stopala",
      module2Desc: "Ekskluzivna Tehnika Aktivacije Stopala™ - tajna koju većina trenera nikad nije saznala.",
      module3Title: "Modul 3: Vježbe za Rast",
      module3Desc: "Precizna izvedba svake vježbe. Od hip thrusta do Bulgarian split squata - sve detaljno objašnjeno.",
      module4Title: "Modul 4: Progresija",
      module4Desc: "Kako pravilno povećavati težine i intenzitet. Progresivno opterećenje bez ozljeda.",
      module5Title: "Modul 5: Prehrana & Oporavak",
      module5Desc: "Šta jesti za optimalni rast mišića. Kako se pravilno odmarati između treninga.",
      bonusesTitle: "Plus Ekskluzivni Bonusi",
      bonus1Title: "8-Sedmični Akcioni Plan",
      bonus1Desc: "Korak-po-korak vodič kroz cijelu transformaciju",
      bonus2Title: "Jutarnji Aktivacijski Ritual",
      bonus2Desc: "5-minutna rutina za savršen početak dana",
      bonus3Title: "Pristup Zajednici",
      bonus3Desc: "Ekskluzivna grupa na istom putu",
      bonus4Title: "Direktan Telegram Pristup",
      bonus4Desc: "Pitaj Imrana bilo šta, bilo kad",
    },
    // Pricing section
    pricing: {
      tagline: "CIJENA",
      headline: "Započni svoju",
      headlineHighlight: "transformaciju",
      description: "Ograničena ponuda — dostupno samo 5 dana. 60 dana garancije povrata novca.",
      limitedOffer: "LIMITIRANA PONUDA",
      packName: "GLUTE LAB STARTER PACK™",
      packDesc: "Sve što trebaš za transformaciju",
      feature1: "5 Modula Programa",
      feature2: "39 Video Lekcija",
      feature3: "10 Radnih Listova",
      feature4: "8-Sedmični Plan",
      feature5: "Pristup Zajednici",
      feature6: "Direktan Telegram Pristup",
      cta: "Započni Sada — 79.99 KM / 39.99€",
      guarantee: "60 dana money-back garancije",
    },
    // Guarantee section
    guarantee: {
      headline: "60 Dana",
      headlineHighlight: "Garancije",
      description: "Ako u prvih 60 dana ne budeš zadovoljna rezultatima - vraćamo ti novac. Bez pitanja. Bez komplikacija. Bez rizika za tebe.",
      howItWorks: "Kako funkcioniše?",
      step1: "Završi prva 3 modula programa",
      step2: "Pošalji progress fotografije",
      step3: "Ako nema rezultata - pun povrat novca",
    },
    // About section
    about: {
      tagline: "KO SAM JA",
      headline: "Imran",
      headlineHighlight: "Bezdrob",
      description: "Sa više od <strong>10 godina iskustva</strong> u fitnessu i preko <strong>2000 uspješnih transformacija</strong>, posvetio sam svoj život pomaganju ženama da postignu tijelo o kojem su oduvijek sanjale.",
      quote: "\"Problem nije u vama. Problem je u metodi. I ja sam tu da vam pokažem pravu metodu.\"",
      credential1: "Certificirani Personal Trainer",
      credential2: "Specijalist za Glute Trening",
      credential3: "Nutrition Coach",
      credential4: "10+ Godina Iskustva",
    },
    // FAQ section
    faq: {
      tagline: "PITANJA",
      headline: "Imaš pitanja?",
      headlineHighlight: "Imamo odgovore.",
      q1: "Nemam vremena za trening - hoće li ovo raditi za mene?",
      a1: "Program zahtijeva samo 45 minuta, 4 puta sedmično. To je manje od jedne Netflix epizode. Ako imaš 3 sata sedmično, imaš dovoljno vremena za transformaciju svojih gluteusa.",
      q2: "Šta ako sam probala sve prije i ništa nije radilo?",
      a2: "Upravo zato smo kreirali ovaj program. Tehnika Aktivacije Stopala™ je metoda koju većina trenera jednostavno ne poznaje. Ovo nije još jedan generički program - ovo je sistem zasnovan na godinama rada sa 2000+ klijentata i stvarnim rezultatima.",
      q3: "Trebam li teretanu ili posebnu opremu?",
      a3: "Ne. 80% vježbi možeš raditi kod kuće. Jedan set tegova (ili čak bez tegova na početku) je sasvim dovoljan. Teretana je bonus, ali nije nužna.",
      q4: "Da li ću postati previše mišićava?",
      a4: "Ne. Program je dizajniran da gradi ženstvene, okrugle obline - ne bodybuilder izgled. Pogledaj transformacije naših članica - sve su zadržale ženstvenu figuru.",
      q5: "Šta ako nemam motivaciju da nastavim?",
      a5: "Zato imaš pristup ekskluzivnoj zajednici sestara koje prolaze isti put. Plus, direktan pristup Imranu putem Telegrama. Nećeš biti sama - mi smo tu da te podržimo na svakom koraku.",
      q6: "Kako funkcioniše garancija?",
      a6: "Imaš punih 60 dana da probaš program. Završi prva 3 modula, pošalji progress fotografije. Ako ne vidiš rezultate - vraćamo ti novac u potpunosti. Bez pitanja, bez komplikacija.",
      q7: "Da li je program prikladan za početnike?",
      a7: "Apsolutno! Program je dizajniran za SVE nivoe. Počinjemo od potpunih osnova i gradimo postupno. Svaka vježba ima detaljno video objašnjenje.",
      q8: "Koliko brzo ću vidjeti rezultate?",
      a8: "Većina članica primjećuje razliku u osjećaju već nakon prvog treninga. Vidljivi fizički rezultati tipično dolaze nakon 3-4 sedmice konzistentnog rada.",
    },
    // Final CTA section
    finalCta: {
      urgency: "Ograničen broj mjesta!",
      headline: "Spremna za svoju",
      headlineHighlight: "transformaciju?",
      description: "Zamislite sebe za 8 sedmica. Gluteusi koje ste oduvijek htjeli. Samopouzdanje koje zrači. Ponos kad se pogledate u ogledalo.",
      countdownLabel: "Vrata se zatvaraju za:",
      cta: "Da, Želim Transformaciju!",
      trust60days: "60 Dana Garancije",
      trustSecure: "Sigurna Kupovina",
      trustInstant: "Instant Pristup",
      days: "DANA",
      hours: "SATI",
      min: "MIN",
      sec: "SEK",
    },
    // Footer
    footer: {
      byImran: "by Imran Bezdrob",
      copyright: "© 2026 Bezdrob. Sva prava zadržana.",
    },
  },
  en: {
    // Sticky bar
    stickyBar: {
      cta: "Join Now",
    },
    // Hero section
    hero: {
      limitedOffer: "Limited offer - Only 5 days on sale!",
      closingDate: "(until February 10, 2026) After that we close FOREVER!",
      headline: "Training for months,",
      headlineHighlight: "but your glutes look the same?",
      subheadline: "Discover the method used by women who",
      subheadlineStrong: "ACTUALLY",
      subheadlineEnd: "build glutes — and see results after your",
      subheadlineHighlight: "first workout",
      cta: "Start Your Transformation",
      trust60days: "60-day guarantee",
      trust2000: "2000+ transformations",
      trustInstant: "Instant access",
      starterPack: "Starter Pack",
      gluteLab: "GLUTE LAB™",
      offerExpires: "Offer expires in:",
      days: "days",
      hours: "hours",
      min: "min",
      sec: "sec",
      buyNow: "Buy Now — 79.99 KM / 39.99€",
      moneyBack: "60-day money-back guarantee",
      testimonialQuote: "\"First time I actually felt my glutes during squats!\"",
      testimonialName: "Amela H.",
      testimonialResult: "+6cm in 8 weeks",
      transformations: "Transformations",
      learnMore: "Learn more",
      videoLessons: "39 video lessons (220+ min)",
      modules: "5 complete modules",
      worksheets: "10 worksheets",
      actionPlan: "8-week action plan",
      communityAccess: "Community access + Telegram",
    },
    // Whop section
    whop: {
      platformText: "Course is hosted on:",
      headline: "Your course.",
      headlineHighlight: "One platform.",
      description: "Whop is the <strong>#1 platform in the world</strong> for online courses and coaching. Over <strong>$2.5 billion</strong> has been paid through courses on Whop. Secure purchase, instant access, all in one place.",
      whyWhop: "Why Whop?",
      securePurchase: "Secure purchase",
      securePurchaseDesc: "Pay with card, PayPal, or Apple Pay. Your data is 100% protected.",
      instantAccess: "Instant access",
      instantAccessDesc: "Immediately after purchase you get access to all modules, video lessons, and materials.",
      communityIncluded: "Community included",
      communityIncludedDesc: "Chat with other members, support and motivation — all within one app.",
      lifetimeAccess: "Lifetime access",
      lifetimeAccessDesc: "Buy once — yours forever. Access from phone, tablet, or computer.",
      viewCourse: "View Course on Whop",
    },
    // Pain points section
    painPoints: {
      tagline: "SOUNDS FAMILIAR?",
      headline: "Why your squats",
      headlineHighlight: "aren't giving results",
      pain1Title: "You do squats, but your glutes don't grow",
      pain1Desc: "You only feel your legs, and your glutes stay the same. Frustrating, right?",
      pain2Title: "You think genetics is to blame",
      pain2Desc: "You tell yourself 'Maybe I'm just not built for a nice figure.'",
      pain3Title: "You're losing motivation",
      pain3Desc: "You start thinking about giving up because you don't see the point in trying.",
      pain4Title: "You focus on quantity, not quality",
      pain4Desc: "You do 100 squats, but without proper activation - it's pointless.",
      pain5Title: "You don't have a progressive plan",
      pain5Desc: "You do the same exercises, with the same weights, for months. Your body has adapted.",
      pain6Title: "You don't understand mind-muscle connection",
      pain6Desc: "You don't know how to 'feel' your glutes during exercise.",
      bottomText1: "If you recognized yourself in any of this...",
      bottomText2: "You're not alone.",
      bottomText3: "And what you're about to learn will change everything.",
    },
    // Solution section
    solution: {
      tagline: "SOLUTION",
      headline: "Introducing:",
      headlineHighlight: "The Foot Activation Technique™",
      description: "A method I developed after 10+ years of working with 2000+ clients. A secret that 99% of trainers simply don't know.",
      step1Title: "Foot Position",
      step1Desc: "Feet parallel, hip-width apart. Heels firmly on the floor, toes relaxed.",
      step2Title: "Activation",
      step2Desc: "Press your heels into the floor as if pushing the floor away from you. Your glutes 'wake up'.",
      step3Title: "Mind-Muscle Connection",
      step3Desc: "Focus your mind on your glutes. Feel the contraction before you start the movement.",
      step4Title: "Execution",
      step4Desc: "Now perform the exercise while maintaining activation. Slower = better results.",
      step5Title: "Verification",
      step5Desc: "After the set, squeeze your glutes. Feel the burn? That means it's working!",
      videoTitle: "FOOT ACTIVATION TECHNIQUE™",
      videoSubtitle: "5 Steps to Dream Glutes",
    },
    // Social proof section
    socialProof: {
      tagline: "RESULTS",
      headline: "Real women.",
      headlineHighlight: "Real results.",
      description: "These aren't paid actresses. These are DMs I receive every day.",
      imageAlt: "Message from a satisfied client",
      showMore: "Show more DMs",
      bottomText: "This is just a small portion of the messages we receive every day",
    },
    // Transformations section
    transformations: {
      tagline: "TRANSFORMATIONS",
      headline: "The proof is in the",
      headlineHighlight: "results",
      description: "See transformations from our members. Pictures speak louder than words.",
      beforeAfter: "Before & After",
      videoTestimonials: "Video Testimonials",
      videoTestimonialsDesc: "Hear directly from women who went through the transformation",
    },
    // What's included section
    included: {
      tagline: "WHAT YOU GET",
      headline: "Everything you need for your",
      headlineHighlight: "transformation",
      modules: "Modules",
      videoLessons: "Video Lessons",
      minutes: "Minutes",
      worksheets: "Worksheets",
      lessons: "lessons",
      module1Title: "Module 1: Activation Basics",
      module1Desc: "Learn how to 'wake up' your glutes before every workout. Mind-muscle connection from day one.",
      module2Title: "Module 2: Foot Technique",
      module2Desc: "Exclusive Foot Activation Technique™ - the secret most trainers never learned.",
      module3Title: "Module 3: Growth Exercises",
      module3Desc: "Precise execution of every exercise. From hip thrusts to Bulgarian split squats - everything explained in detail.",
      module4Title: "Module 4: Progression",
      module4Desc: "How to properly increase weights and intensity. Progressive overload without injuries.",
      module5Title: "Module 5: Nutrition & Recovery",
      module5Desc: "What to eat for optimal muscle growth. How to properly rest between workouts.",
      bonusesTitle: "Plus Exclusive Bonuses",
      bonus1Title: "8-Week Action Plan",
      bonus1Desc: "Step-by-step guide through the entire transformation",
      bonus2Title: "Morning Activation Ritual",
      bonus2Desc: "5-minute routine for a perfect start to the day",
      bonus3Title: "Community Access",
      bonus3Desc: "Exclusive group on the same journey",
      bonus4Title: "Direct Telegram Access",
      bonus4Desc: "Ask Imran anything, anytime",
    },
    // Pricing section
    pricing: {
      tagline: "PRICING",
      headline: "Start your",
      headlineHighlight: "transformation",
      description: "Limited offer — available only for 5 days. 60-day money-back guarantee.",
      limitedOffer: "LIMITED OFFER",
      packName: "GLUTE LAB STARTER PACK™",
      packDesc: "Everything you need for transformation",
      feature1: "5 Program Modules",
      feature2: "39 Video Lessons",
      feature3: "10 Worksheets",
      feature4: "8-Week Plan",
      feature5: "Community Access",
      feature6: "Direct Telegram Access",
      cta: "Start Now — 79.99 KM / 39.99€",
      guarantee: "60-day money-back guarantee",
    },
    // Guarantee section
    guarantee: {
      headline: "60-Day",
      headlineHighlight: "Guarantee",
      description: "If you're not satisfied with the results in the first 60 days - we'll refund your money. No questions asked. No complications. No risk for you.",
      howItWorks: "How does it work?",
      step1: "Complete the first 3 modules of the program",
      step2: "Send progress photos",
      step3: "If no results - full refund",
    },
    // About section
    about: {
      tagline: "WHO AM I",
      headline: "Imran",
      headlineHighlight: "Bezdrob",
      description: "With over <strong>10 years of experience</strong> in fitness and more than <strong>2000 successful transformations</strong>, I've dedicated my life to helping women achieve the body they've always dreamed of.",
      quote: "\"The problem isn't you. The problem is the method. And I'm here to show you the right method.\"",
      credential1: "Certified Personal Trainer",
      credential2: "Glute Training Specialist",
      credential3: "Nutrition Coach",
      credential4: "10+ Years Experience",
    },
    // FAQ section
    faq: {
      tagline: "QUESTIONS",
      headline: "Got questions?",
      headlineHighlight: "We have answers.",
      q1: "I don't have time to train - will this work for me?",
      a1: "The program requires only 45 minutes, 4 times a week. That's less than one Netflix episode. If you have 3 hours a week, you have enough time to transform your glutes.",
      q2: "What if I've tried everything before and nothing worked?",
      a2: "That's exactly why we created this program. The Foot Activation Technique™ is a method most trainers simply don't know. This isn't just another generic program - it's a system based on years of work with 2000+ clients and real results.",
      q3: "Do I need a gym or special equipment?",
      a3: "No. 80% of exercises can be done at home. One set of dumbbells (or even without weights at first) is perfectly sufficient. A gym is a bonus, but not necessary.",
      q4: "Will I become too muscular?",
      a4: "No. The program is designed to build feminine, round curves - not a bodybuilder look. Look at our members' transformations - they all maintained a feminine figure.",
      q5: "What if I don't have motivation to continue?",
      a5: "That's why you have access to an exclusive community of sisters going through the same journey. Plus, direct access to Imran via Telegram. You won't be alone - we're here to support you every step of the way.",
      q6: "How does the guarantee work?",
      a6: "You have a full 60 days to try the program. Complete the first 3 modules, send progress photos. If you don't see results - we'll refund your money in full. No questions, no complications.",
      q7: "Is the program suitable for beginners?",
      a7: "Absolutely! The program is designed for ALL levels. We start from complete basics and build gradually. Every exercise has a detailed video explanation.",
      q8: "How quickly will I see results?",
      a8: "Most members notice a difference in how they feel after the first workout. Visible physical results typically come after 3-4 weeks of consistent work.",
    },
    // Final CTA section
    finalCta: {
      urgency: "Limited spots available!",
      headline: "Ready for your",
      headlineHighlight: "transformation?",
      description: "Imagine yourself in 8 weeks. The glutes you've always wanted. Confidence that radiates. Pride when you look in the mirror.",
      countdownLabel: "Doors close in:",
      cta: "Yes, I Want My Transformation!",
      trust60days: "60-Day Guarantee",
      trustSecure: "Secure Purchase",
      trustInstant: "Instant Access",
      days: "DAYS",
      hours: "HOURS",
      min: "MIN",
      sec: "SEC",
    },
    // Footer
    footer: {
      byImran: "by Imran Bezdrob",
      copyright: "© 2026 Bezdrob. All rights reserved.",
    },
  },
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
function CountdownTimer({ targetDate, labels }: { targetDate: Date; labels: { days: string; hours: string; min: string; sec: string } }) {
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
        { value: timeLeft.days, label: labels.days },
        { value: timeLeft.hours, label: labels.hours },
        { value: timeLeft.minutes, label: labels.min },
        { value: timeLeft.seconds, label: labels.sec }
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

// Language toggle component
function LanguageToggle({ lang, setLang }: { lang: Language; setLang: (lang: Language) => void }) {
  return (
    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
      <button
        onClick={() => setLang('bs')}
        className={cn(
          "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
          lang === 'bs'
            ? "bg-white text-gray-900"
            : "text-white/70 hover:text-white"
        )}
      >
        BS
      </button>
      <button
        onClick={() => setLang('en')}
        className={cn(
          "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
          lang === 'en'
            ? "bg-white text-gray-900"
            : "text-white/70 hover:text-white"
        )}
      >
        EN
      </button>
    </div>
  )
}

// Language toggle for light backgrounds
function LanguageToggleLight({ lang, setLang }: { lang: Language; setLang: (lang: Language) => void }) {
  return (
    <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
      <button
        onClick={() => setLang('bs')}
        className={cn(
          "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
          lang === 'bs'
            ? "bg-white text-gray-900"
            : "text-gray-400 hover:text-white"
        )}
      >
        BS
      </button>
      <button
        onClick={() => setLang('en')}
        className={cn(
          "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
          lang === 'en'
            ? "bg-white text-gray-900"
            : "text-gray-400 hover:text-white"
        )}
      >
        EN
      </button>
    </div>
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

export default function LandingPage() {
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [lang, setLang] = useState<Language>('bs')
  const [showAllDMs, setShowAllDMs] = useState(false)

  // Load language preference from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('bezdrob-lang') as Language
    if (savedLang && (savedLang === 'bs' || savedLang === 'en')) {
      setLang(savedLang)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('bezdrob-lang', lang)
  }, [lang])

  const t = translations[lang]

  // Cart closes February 10, 2026 at 19:00 Sarajevo time (CET = UTC+1)
  const cartCloseDate = useMemo(() => {
    return new Date('2026-02-10T19:00:00+01:00')
  }, [])

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
  }, [cartCloseDate])

  // FAQ data with translations
  const faqs = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
    { question: t.faq.q6, answer: t.faq.a6 },
    { question: t.faq.q7, answer: t.faq.a7 },
    { question: t.faq.q8, answer: t.faq.a8 },
  ]

  // Modules data with translations
  const modules = [
    { title: t.included.module1Title, description: t.included.module1Desc, lessons: 8 },
    { title: t.included.module2Title, description: t.included.module2Desc, lessons: 7 },
    { title: t.included.module3Title, description: t.included.module3Desc, lessons: 12 },
    { title: t.included.module4Title, description: t.included.module4Desc, lessons: 6 },
    { title: t.included.module5Title, description: t.included.module5Desc, lessons: 6 },
  ]

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
              <div className="flex items-center gap-3">
                <div className="hidden sm:block">
                  <LanguageToggleLight lang={lang} setLang={setLang} />
                </div>
                <a href={WHOP_LINK} onClick={trackInitiateCheckout} className="btn-primary !py-2.5 !px-6 !text-base urgency-badge">
                  {t.stickyBar.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
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
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <LanguageToggle lang={lang} setLang={setLang} />
              <div className="flex flex-col items-center sm:items-end gap-1">
                <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-red-400 text-sm font-medium">{t.hero.limitedOffer}</span>
                </div>
                <span className="text-white text-xs sm:text-sm">{t.hero.closingDate}</span>
              </div>
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
                  {t.hero.headline}
                  <span className="block text-gradient mt-2">{t.hero.headlineHighlight}</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {t.hero.subheadline} <span className="text-white font-semibold">{t.hero.subheadlineStrong}</span> {t.hero.subheadlineEnd} <span className="text-peach-400 font-semibold">{t.hero.subheadlineHighlight}</span>.
                </motion.p>

                {/* CTA Button */}
                <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start mb-8">
                  <a
                    href={WHOP_LINK}
                    onClick={trackInitiateCheckout}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-peach-500 to-coral-500 text-white rounded-2xl font-bold text-lg hover:from-peach-600 hover:to-coral-600 transition-all duration-300 shadow-lg shadow-peach-500/25 hover:shadow-xl hover:shadow-peach-500/30 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {t.hero.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>

                {/* Trust Elements */}
                <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>{t.hero.trust60days}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-peach-400" />
                    <span>{t.hero.trust2000}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span>{t.hero.trustInstant}</span>
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
                        <span className="text-peach-400 text-sm font-semibold uppercase tracking-wider">{t.hero.starterPack}</span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white">{t.hero.gluteLab}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">79.99 <span className="text-lg text-gray-400">KM</span></div>
                        <div className="text-sm text-gray-400">/ 39.99€</div>
                      </div>
                    </div>

                    {/* What's Inside */}
                    <div className="space-y-3 mb-6">
                      {[
                        { icon: Video, text: t.hero.videoLessons },
                        { icon: BookOpen, text: t.hero.modules },
                        { icon: FileText, text: t.hero.worksheets },
                        { icon: Calendar, text: t.hero.actionPlan },
                        { icon: MessageCircle, text: t.hero.communityAccess },
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
                      <p className="text-center text-gray-400 text-sm mb-3">{t.hero.offerExpires}</p>
                      <div className="flex justify-center gap-3">
                        {[
                          { value: timeLeft.days, label: t.hero.days },
                          { value: timeLeft.hours, label: t.hero.hours },
                          { value: timeLeft.minutes, label: t.hero.min },
                          { value: timeLeft.seconds, label: t.hero.sec }
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
                      {t.hero.buyNow}
                      <ArrowRight className="w-5 h-5" />
                    </a>

                    {/* Guarantee Badge */}
                    <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-sm">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>{t.hero.moneyBack}</span>
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
                  <p className="text-gray-700 text-sm mb-2">{t.hero.testimonialQuote}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-peach-100 rounded-full flex items-center justify-center text-sm">🍑</div>
                    <div>
                      <div className="text-gray-900 text-sm font-semibold">{t.hero.testimonialName}</div>
                      <div className="text-gray-500 text-xs">{t.hero.testimonialResult}</div>
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
                  <div className="text-gray-400 text-sm">{t.hero.transformations}</div>
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
              <span className="text-sm">{t.hero.learnMore}</span>
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
              <span className="text-lg text-gray-500">{t.whop.platformText}</span>
              <Image src="/whop-logo.svg" alt="Whop" width={100} height={32} className="h-8 w-auto" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t.whop.headline} <span className="text-gradient">{t.whop.headlineHighlight}</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t.whop.description }} />
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.whop.whyWhop}</h3>
              <div className="space-y-5">
                {[
                  { icon: Shield, title: t.whop.securePurchase, description: t.whop.securePurchaseDesc },
                  { icon: Zap, title: t.whop.instantAccess, description: t.whop.instantAccessDesc },
                  { icon: Users, title: t.whop.communityIncluded, description: t.whop.communityIncludedDesc },
                  { icon: Lock, title: t.whop.lifetimeAccess, description: t.whop.lifetimeAccessDesc },
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
                {t.whop.viewCourse}
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
            <span className="text-peach-500 font-semibold mb-4 block">{t.painPoints.tagline}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t.painPoints.headline} <span className="text-gradient">{t.painPoints.headlineHighlight}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: X, title: t.painPoints.pain1Title, description: t.painPoints.pain1Desc },
              { icon: X, title: t.painPoints.pain2Title, description: t.painPoints.pain2Desc },
              { icon: X, title: t.painPoints.pain3Title, description: t.painPoints.pain3Desc },
              { icon: X, title: t.painPoints.pain4Title, description: t.painPoints.pain4Desc },
              { icon: X, title: t.painPoints.pain5Title, description: t.painPoints.pain5Desc },
              { icon: X, title: t.painPoints.pain6Title, description: t.painPoints.pain6Desc },
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
              {t.painPoints.bottomText1}
              <span className="text-peach-600 font-semibold"> {t.painPoints.bottomText2}</span>
              <br />{t.painPoints.bottomText3}
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
            <span className="text-peach-500 font-semibold mb-4 block">{t.solution.tagline}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t.solution.headline} <span className="text-gradient">{t.solution.headlineHighlight}</span>
            </h2>
            <p className="text-xl text-gray-600">
              {t.solution.description}
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
                  { step: "1", title: t.solution.step1Title, description: t.solution.step1Desc },
                  { step: "2", title: t.solution.step2Title, description: t.solution.step2Desc },
                  { step: "3", title: t.solution.step3Title, description: t.solution.step3Desc },
                  { step: "4", title: t.solution.step4Title, description: t.solution.step4Desc },
                  { step: "5", title: t.solution.step5Title, description: t.solution.step5Desc },
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
                    <h3 className="text-3xl font-bold mb-2">{t.solution.videoTitle}</h3>
                    <p className="text-white/80">{t.solution.videoSubtitle}</p>
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
            <span className="text-peach-400 font-semibold mb-4 block">{t.socialProof.tagline}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              {t.socialProof.headline} <span className="text-gradient">{t.socialProof.headlineHighlight}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t.socialProof.description}
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
                        alt={t.socialProof.imageAlt}
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
                    alt={t.socialProof.imageAlt}
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
                {t.socialProof.showMore}
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
              <span className="text-gray-300 text-sm">{t.socialProof.bottomText}</span>
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
            <span className="text-peach-400 font-semibold mb-4 block">{t.transformations.tagline}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              {t.transformations.headline} <span className="text-gradient">{t.transformations.headlineHighlight}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t.transformations.description}
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
                  alt={t.transformations.beforeAfter}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-medium">{t.transformations.beforeAfter}</span>
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
              {t.transformations.videoTestimonials}
            </h3>
            <p className="text-gray-400">{t.transformations.videoTestimonialsDesc}</p>
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
            <span className="text-peach-500 font-semibold mb-4 block">{t.included.tagline}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t.included.headline} <span className="text-gradient">{t.included.headlineHighlight}</span>
            </h2>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            {[
              { icon: BookOpen, value: "5", label: t.included.modules },
              { icon: Video, value: "39", label: t.included.videoLessons },
              { icon: Clock, value: "220+", label: t.included.minutes },
              { icon: FileText, value: "10", label: t.included.worksheets }
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
                      {module.lessons} {t.included.lessons}
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
              {t.included.bonusesTitle}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: t.included.bonus1Title, description: t.included.bonus1Desc, icon: Calendar },
                { title: t.included.bonus2Title, description: t.included.bonus2Desc, icon: Sparkles },
                { title: t.included.bonus3Title, description: t.included.bonus3Desc, icon: Users },
                { title: t.included.bonus4Title, description: t.included.bonus4Desc, icon: MessageCircle },
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
            <span className="text-peach-500 font-semibold mb-4 block">{t.pricing.tagline}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t.pricing.headline} <span className="text-gradient">{t.pricing.headlineHighlight}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.pricing.description}
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
                {t.pricing.limitedOffer}
              </div>
              <div className="pricing-popular bg-white rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.pricing.packName}</h3>
                  <p className="text-gray-600 mb-4">{t.pricing.packDesc}</p>
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
                    t.pricing.feature1,
                    t.pricing.feature2,
                    t.pricing.feature3,
                    t.pricing.feature4,
                    t.pricing.feature5,
                    t.pricing.feature6,
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
                  {t.pricing.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-sm">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>{t.pricing.guarantee}</span>
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
              <span className="text-lg text-gray-500">{t.whop.platformText}</span>
              <Image src="/whop-logo.svg" alt="Whop" width={100} height={32} className="h-8 w-auto" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t.whop.headline} <span className="text-gradient">{t.whop.headlineHighlight}</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t.whop.description }} />
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.whop.whyWhop}</h3>
              <div className="space-y-5">
                {[
                  { icon: Shield, title: t.whop.securePurchase, description: t.whop.securePurchaseDesc },
                  { icon: Zap, title: t.whop.instantAccess, description: t.whop.instantAccessDesc },
                  { icon: Users, title: t.whop.communityIncluded, description: t.whop.communityIncludedDesc },
                  { icon: Lock, title: t.whop.lifetimeAccess, description: t.whop.lifetimeAccessDesc },
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
                {t.whop.viewCourse}
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
                {t.guarantee.headline} <span className="text-green-600">{t.guarantee.headlineHighlight}</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
                {t.guarantee.description}
              </p>
              <div className="bg-white rounded-2xl p-6 max-w-lg mx-auto">
                <h3 className="font-bold text-gray-900 mb-3">{t.guarantee.howItWorks}</h3>
                <ol className="text-left space-y-2 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold text-green-600">1</span>
                    <span>{t.guarantee.step1}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold text-green-600">2</span>
                    <span>{t.guarantee.step2}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold text-green-600">3</span>
                    <span>{t.guarantee.step3}</span>
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
                <div className="text-gray-600">{t.hero.transformations}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-peach-500 font-semibold mb-4 block">{t.about.tagline}</span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
                {t.about.headline} <span className="text-gradient">{t.about.headlineHighlight}</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.about.description }} />
              <blockquote className="border-l-4 border-peach-500 pl-6 py-2 mb-8 italic text-gray-500">
                {t.about.quote}
              </blockquote>
              <div className="grid grid-cols-2 gap-4">
                {[
                  t.about.credential1,
                  t.about.credential2,
                  t.about.credential3,
                  t.about.credential4,
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
            <span className="text-peach-500 font-semibold mb-4 block">{t.faq.tagline}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t.faq.headline} <span className="text-gradient">{t.faq.headlineHighlight}</span>
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
              <span className="text-red-300 font-medium">{t.finalCta.urgency}</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
              {t.finalCta.headline} <span className="text-gradient">{t.finalCta.headlineHighlight}</span>
            </h2>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              {t.finalCta.description}
            </p>

            {/* Countdown */}
            <div className="mb-8">
              <p className="text-white/70 mb-4 text-sm">{t.finalCta.countdownLabel}</p>
              <CountdownTimer targetDate={cartCloseDate} labels={{ days: t.finalCta.days, hours: t.finalCta.hours, min: t.finalCta.min, sec: t.finalCta.sec }} />
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href={WHOP_LINK} onClick={trackInitiateCheckout} className="btn-primary text-lg urgency-badge group">
                {t.finalCta.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Final trust elements */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>{t.finalCta.trust60days}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-500" />
                <span>{t.finalCta.trustSecure}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-green-500" />
                <span>{t.finalCta.trustInstant}</span>
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
              <p className="text-gray-500">{t.footer.byImran}</p>
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
              <p className="text-gray-500 text-sm">{t.footer.copyright}</p>
              <a href="https://mita.agency" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-xs mt-1 hover:text-gray-400 transition-colors">Powered by mita.agency</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
