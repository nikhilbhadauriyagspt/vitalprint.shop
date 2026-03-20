import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const sliderImages = [
  "/category/all-in-one-printers.png",
  "/category/inkjet-printers.png",
  "/category/laser-printers.png",
  "/category/supertank-printers.png",
  "/category/photo-printers.png",
  "/category/large-format-printers.png",
];

const words = ["Printers", "Ink", "Toner Kits", "Supplies"];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

  // TYPING EFFECT
  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      const shouldDelete = isDeleting;
      
      setText(currentWord.substring(0, text.length + (shouldDelete ? -1 : 1)));

      if (!shouldDelete && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
        setTypeSpeed(100);
      } else if (shouldDelete && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        setTypeSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, typeSpeed]);

  // AUTO SLIDE
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#263238] relative overflow-hidden h-[550px] md:h-[700px] flex items-center border-b border-white/5 font-['Rubik']">
      {/* SUBTLE BACKGROUND TEXTURE */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          
          {/* LEFT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
              Everything You Need <br />
              For <span className="text-[#7EA1A1] border-r-4 border-[#7EA1A1] pr-2">{text}</span>
            </h1>
            
            <p className="text-lg md:text-xl opacity-80 mb-10 max-w-lg font-normal leading-relaxed mx-auto lg:mx-0">
              Shop high-quality printers, ink cartridges, and essential supplies all in one place. We provide expert advice and fast shipping for your home or business needs.
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to="/shop"
                className="px-10 py-4 bg-[#7EA1A1] text-white text-[15px] font-bold uppercase tracking-wider hover:bg-white hover:text-[#263238] transition-all rounded-lg flex items-center gap-2 shadow-2xl"
              >
                Start Shopping
                <ArrowRight size={18} />
              </Link>
              
              <Link
                to="/contact"
                className="px-10 py-4 border border-white/20 text-white text-[15px] font-bold uppercase tracking-wider hover:bg-white/5 transition-all rounded-lg"
              >
                Help & Support
              </Link>
            </div>
          </motion.div>

          {/* RIGHT SIDE: IMAGES SLIDING INSIDE A CIRCULAR SHAPE (NO DOTS) */}
          <div className="relative flex items-center justify-center h-[350px] md:h-[500px]">
            {/* THE CIRCULAR STAGE */}
            <div className="absolute w-[320px] h-[320px] md:w-[540px] md:h-[540px] bg-gradient-to-b from-white/[0.08] to-transparent rounded-full border border-white/10 flex items-center justify-center overflow-hidden shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  className="w-full h-full flex items-center justify-center p-12 md:p-20"
                >
                  <img
                    src={sliderImages[currentIndex]}
                    alt="Printer"
                    className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* DECORATIVE OUTER RING */}
            <div className="absolute w-[340px] h-[340px] md:w-[580px] md:h-[580px] border border-white/5 rounded-full pointer-events-none" />
          </div>

        </div>
      </div>
    </div>
  );
}
