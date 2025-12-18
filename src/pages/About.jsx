import { memo, useEffect } from "react";
import { motion } from "framer-motion";

function InfoSection({
  title,
  subtitle,
  points = [],
  image,
  reverse = false,
  bgColor = "bg-white",
}) {
  
  return (
    <section className={`py-14 px-5 md:px-16 ${bgColor}`}>
      <div
        className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 text-center md:text-left"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-black">
            {title}
          </h2>
          <p className="text-gray-700 text-base md:text-lg">{subtitle}</p>
          {points.length > 0 && (
            <ul className="list-disc pl-6 text-yellow-800 space-y-1 font-medium">
              {points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-xl border-4 border-amber-400">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const About = () => {
  useEffect(() => {
    document.title = "About Us | Aathi Life";
    const desc =
      "Aathi Life connects modern seekers with sacred wisdom and energized spiritual products.";
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = desc;
    else {
      meta = document.createElement("meta");
      meta.name = "description";
      meta.content = desc;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="relative bg-white overflow-hidden">
      {/* 🔹 Background decorative images */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.img
          src="/spiritual/pranava-om_17872.png"
          alt="Om"
          className="absolute top-4 left-4 w-8 md:w-12 opacity-40"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <motion.img
          src="/spiritual/lotus_2970718.png"
          alt="Lotus"
          className="absolute bottom-4 right-4 w-12 md:w-20 opacity-40"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        />
      </div>

      {/* 🔹 Animated Logo at top */}
      <div className="pt-14 md:pt-20 text-center relative z-10">
        {/* soft glowing circle behind logo */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-20 md:top-28 w-56 h-56 md:w-72 md:h-72 rounded-full bg-yellow-200/30 blur-3xl z-0"
          animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.4, 0.7, 0.4] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <motion.img
          src="/logo-removebg-preview.png"
          alt="Aathi Life Logo"
          className="relative mx-auto w-40 md:w-64 drop-shadow-[0_0_40px_rgba(248,176,66,0.8)]"
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        <h1 className="text-3xl md:text-5xl font-bold text-black mt-3 relative z-10">
          About Aathi Life
        </h1>
      </div>

      {/* Sections */}
      <InfoSection
        title="🌿 AATHI LIFE"
        subtitle="We connect modern seekers with the sacred wisdom of Vedas and Siddha traditions."
        points={[
          "🔱 Crafted with ritual purity & intention",
          "🧘 Used during meditation, japa, and puja",
          "🌿 Infused with healing vibrations from sacred herbs",
          "🔥 Energized using traditional Agamic methods",
          "💫 Designed to uplift consciousness & promote inner balance",
        ]}
        image="/tree.jpg"
      />
      {/* 🌟 Aathiyoga + Aathilife Quote Section */}
<section className="relative bg-gradient-to-r from-yellow-50 via-amber-50 to-white py-5 px-6 md:px-16">
  <div className="max-w-4xl mx-auto text-center">
    {/* Quote Card */}
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-10 md:p-16 border-2 border-amber-200">
      <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
        ✨ Together, Aathiyoga + Aathilife create a complete circle
      </h2>
      <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-4">
        Aathiyoga transforms you <span className="font-semibold text-yellow-800">from inside-out</span>.
      </p>
      <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
        Aathilife supports you <span className="font-semibold text-yellow-800">from outside-in</span>.
      </p>
    </div>
    {/* Optional: Decorative Mandala or Sparkles */}
    <img src="public\om.jpg" alt="Mandala" className="absolute top-10 right-10 w-20 opacity-20 pointer-events-none hidden md:block" />
    <img src="public\linga.gif" alt="Mandala" className="absolute bottom-10 left-10 w-20 opacity-20 pointer-events-none hidden md:block" />
  </div>
</section>
      <InfoSection
        title="🔥 Energized Products"
        subtitle="Spiritual products delivered after Pooja — Energized Spiritual Products"
        image="/linga.gif"
        reverse
        bgColor="bg-amber-50"
      />

      <InfoSection
        title="🙏 Our Vision"
        subtitle="Reconnect modern souls with ancient wisdom through ethically sourced, spiritually charged products."
        points={[
          "🌿 Encourage sustainable, sattvic living rooted in Sanatana Dharma",
          "🔥 Support spiritual seekers with tools for healing, focus & growth",
          "🙏 Reawaken the sacred in simple moments of daily life",
        ]}
        image="/spiritual/kolam_6482798.png"
      />
{/* 🌿 Spiritual Roadmap Section with Images */}
{/* 🌿 Spiritual Roadmap Section with Mobile/Desktop Responsiveness */}
<section className="relative bg-gradient-to-b from-yellow-50 via-amber-50 to-white py-24 px-6 md:px-16 overflow-hidden">
  {/* Decorative mandalas */}
  <img src="public/linga.gif" className="absolute top-10 left-5 w-20 md:w-24 opacity-20 pointer-events-none" alt="Mandala" />
  <img src="public/linga.gif" className="absolute bottom-10 right-5 w-24 md:w-32 opacity-15 pointer-events-none" alt="Mandala" />

  <div className="max-w-6xl mx-auto relative z-10">
    {/* Heading */}
    <h2 className="text-2xl md:text-5xl font-bold text-center text-black mb-10 md:mb-12">
      🌿 The Story of Our Journey
    </h2>

    {/* Intro Text */}
    <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center max-w-md md:max-w-3xl mx-auto mb-8 md:mb-12">
      For over 25 years, the journey of Yoga and spirituality has explored ancient wisdom, practicing with devotion, and guiding seekers towards balance and peace. Along this path, a timeless truth emerged: Yoga, Ayurveda, and Spirituality are not separate streams, but rivers flowing into one ocean — the ocean of holistic living.
    </p>
    <p className="text-gray-700 text-base md:text-lg leading-relaxed text-center max-w-md md:max-w-3xl mx-auto mb-12">
      This realization became the seed for a vision: to create a movement, a home, and a sanctuary where people can reconnect with their roots, heal naturally, and live with divine awareness.
    </p>

    {/* Step 1: Aathiyoga */}
    <div className="md:flex md:items-center md:mb-16">
      <div className="md:w-1/2 flex justify-center md:justify-start mb-6 md:mb-0">
        <img src="/guruji.jpeg" alt="Aathiyoga" className="rounded-xl shadow-lg w-64 sm:w-72 md:w-full object-cover" />
      </div>
      <div className="md:w-1/2 md:pl-8 lg:pl-12 relative text-center md:text-left">
        <div className="absolute -left-10 md:static flex justify-center md:mx-0 mb-4">
          <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold shadow-xl">
            🌸
          </div>
        </div>
        <h3 className="text-xl md:text-3xl font-bold text-black mt-4">Aathiyoga</h3>
        <p className="mt-3 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
          Aathiyoga is not just about asanas or fitness. It awakens inner strength, balances body and mind, and aligns life with universal energies. Every class, retreat, and teaching helps seekers rediscover their true essence and unlock the infinite power within.
        </p>
      </div>
    </div>

    {/* Step 2: Aathilife */}
    <div className="md:flex md:items-center md:mb-16 md:flex-row-reverse">
      <div className="md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
        <img src="public/aathiai.jpeg" alt="Aathilife" className="rounded-xl shadow-lg w-64 sm:w-72 md:w-full object-cover" />
      </div>
      <div className="md:w-1/2 md:pr-8 lg:pr-12 relative text-center md:text-left">
        <div className="absolute -left-10 md:static flex justify-center md:mx-0 mb-4">
          <div className="w-14 h-14 rounded-full bg-pink-400 flex items-center justify-center text-white font-bold shadow-xl">
            🌺
          </div>
        </div>
        <h3 className="text-xl md:text-3xl font-bold text-black mt-4">Aathilife</h3>
        <p className="mt-3 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
          Aathilife extends this philosophy into daily living. It offers spiritual products, natural supplements, and sacred essentials infused with purity and tradition, bridging the outer world of living and the inner world of spirit.
        </p>
      </div>
    </div>

    {/* Closing text */}
    <p className="mt-12 text-center text-gray-700 text-sm sm:text-base md:text-lg max-w-md md:max-w-3xl mx-auto leading-relaxed">
      ✨ Together: The Aathi Way of Living inspires seekers to reconnect with their roots, embrace holistic wellness, and integrate ancient wisdom into modern life.
    </p>
  </div>
</section>


{/* Cards Section */}
 <div className="space-y-6 mt-12 px-4 md:px-10">
   {/* Karungali Products */} 
   <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bg-amber-500/90 text-black flex items-center rounded-full px-4 md:px-6 py-3 md:py-4 shadow-lg gap-4 max-w-4xl mx-auto" >
    <div className="w-12 h-12 min-w-[3rem] bg-white rounded-full flex items-center justify-center overflow-hidden"> 
      <img src="/rud beads.png" alt="Karungali Icon" className="w-7 h-7 object-contain" />
    </div>
     <p className="text-sm md:text-base font-medium"> All Karungali Products are made from <strong>100-Year-Old Sacred Trees</strong>.
      </p> 
      </motion.div>
       {/* Energized Products */} 
       <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-amber-500/90 text-black flex items-center rounded-full px-4 md:px-6 py-3 md:py-4 shadow-lg gap-4 max-w-4xl mx-auto" > 
       <div className="w-12 h-12 min-w-[3rem] bg-white rounded-full flex items-center justify-center overflow-hidden"> 
        <img src="public/linga.gif" alt="Linga Icon" className="w-7 h-7 object-contain" /> 
        </div> 
        <p className="text-sm md:text-base font-medium"> Spiritual products delivered after Pooja — <em className="ml-1 text-orange-800 font-semibold">“Energized Spiritual Products”</em>
         </p> 
         </motion.div> 
         </div>
      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-10 text-center px-6"
      >
        <p className="text-lg md:text-xl font-semibold text-yellow-800">
          Explore our spiritual collection and bring harmony & divine energy into your life 🌸
        </p>
        <a
          href="/category/karungali"
          className="inline-block mt-4 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full shadow-lg transition-all duration-300"
        >
          Browse Products
        </a>
      </motion.div>
    </div>
  );
};

export default memo(About);
