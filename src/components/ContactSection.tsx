import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageCircle, Send } from "lucide-react";

export function ContactSection() {
const handleWhatsAppClick = () => {
window.open("https://wa.me/918129534377", "_blank");
};

return ( <section
   id="contact"
   className="py-28 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
 >
{/* Large soft gradient circle */}
<motion.div
className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full blur-3xl"
animate={{
scale: [1, 1.1, 1],
opacity: [0.5, 0.7, 0.5],
}}
transition={{
duration: 8,
repeat: Infinity,
ease: "easeInOut",
}}
/>

```
  <div className="max-w-4xl mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20"
      >
        <span className="text-sm">Get in Touch</span>
      </motion.div>

      <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
        Start Your Project
      </h2>

      <p className="text-xl text-gray-600 leading-relaxed">
        Let's create something exceptional together
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="liquid-glass-card rounded-3xl shadow-2xl p-10 md:p-14 relative overflow-hidden refraction edge-glow-hover"
    >
      {/* Micro liquid movement */}
      <div className="absolute inset-0 pointer-events-none z-10 micro-liquid">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-50"></div>
      </div>

      <form
        action="https://formspree.io/f/xdawkvje"
        method="POST"
        className="space-y-7 relative z-10"
      >
        {/* Hidden fields */}
        <input type="hidden" name="_subject" value="New Cirqle Inquiry" />
        <input type="text" name="_gotcha" style={{ display: "none" }} />

        <div className="grid md:grid-cols-2 gap-7">
          <div>
            <label htmlFor="name" className="block mb-3 text-sm">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="block mb-3 text-sm">
              WhatsApp Number
            </label>
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              placeholder="+91 8129 5343 77"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block mb-3 text-sm">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="farooq@cirqle.work"
            required
          />
        </div>

        <div>
          <label htmlFor="requirement" className="block mb-3 text-sm">
            Project Details
          </label>
          <Textarea
            id="requirement"
            name="message"
            placeholder="Tell us about your project..."
            rows={6}
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 transition-opacity py-7 rounded-full shadow-xl shadow-[#A259FF]/30 cursor-hover edge-glow"
            >
              <Send className="mr-2 w-5 h-5" />
              Send Inquiry
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all py-7 rounded-full cursor-hover liquid-glass-card"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              WhatsApp
            </Button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  </div>
</section>
```

);
}
