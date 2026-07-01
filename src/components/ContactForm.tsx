import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, ShieldCheck, AlertCircle, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";
import GlitchHeading from "./GlitchHeading";
import RotatingSphereCanvas from "./RotatingSphereCanvas";
import { ShridharInfo } from "../data";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Job Opportunity",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: "success" | "error" }>({
    show: false,
    msg: "",
    type: "success"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic fields validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setToast({
        show: true,
        msg: "All fields are required. Please check your data.",
        type: "error"
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/shridhar.mathur@hotmail.com", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        // Fire confetti burst
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#00f5ff", "#8b00ff", "#39ff14"] // Matches Shridhar's cyber brand
        });

        // Show secure message toast
        setToast({
          show: true,
          msg: "Secure link established! Message transmitted directly to Shridhar's inbox.",
          type: "success"
        });

        // Clear fields
        setFormData({
          name: "",
          email: "",
          subject: "Job Opportunity",
          message: ""
        });
      } else {
        throw new Error("Formspree response not ok");
      }
    } catch (error) {
      setToast({
        show: true,
        msg: "Transmission disrupted. Please retry or connect via secure email directly.",
        type: "error"
      });
    } finally {
      setLoading(false);
      
      // Auto hide toast after delay
      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 5000);
    }
  };

  const contactItems = [
    { icon: Phone, label: "Phone Connection", val: ShridharInfo.phone, href: `tel:${ShridharInfo.phone.replace(/\s+/g, "")}` },
    { icon: Mail, label: "Secure Email", val: ShridharInfo.email, href: `mailto:${ShridharInfo.email}` },
    { icon: Linkedin, label: "LinkedIn Core", val: ShridharInfo.linkedin, href: "https://www.linkedin.com/in/shridharkumarmathur/" },
    { icon: Github, label: "GitHub Repos", val: ShridharInfo.github, href: "https://github.com/ItsShridharMathur" },
    { icon: MapPin, label: "Location Node", val: "Lucknow, Uttar Pradesh, India", href: "#" }
  ];

  return (
    <section id="contact" className="py-24 relative select-none overflow-hidden bg-[#020205] border-t border-[#1a1a2e]">
      
      {/* Absolute background 3D rotating wireframe sphere */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 md:w-[450px] aspect-square pointer-events-none opacity-20 md:opacity-30 z-0">
        <RotatingSphereCanvas />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <GlitchHeading 
          title="Contact Labs" 
          subtitle="Open direct pipelines for job placements, engineering collaborations, or general technical inquiries." 
          color="cyan"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 md:mt-16 items-start">
          
          {/* Left Column: Direct info nodes & text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-wider">
                Direct Handshake Coordinates
              </h3>
              <p className="font-sans text-sm text-white/50 leading-relaxed font-medium">
                Transmit your network request via the console interface, or engage directly through authenticated workspace nodes. Active responses will execute within a 12-hour window.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target={item.href !== "#" ? "_blank" : undefined}
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-[#05050a]/60 border border-[#1a1a2e] hover:border-ai-cyan/20 p-4 rounded-lg group transition-all duration-300"
                  >
                    <div className="p-2.5 rounded bg-[#05050a] border border-[#1a1a2e] group-hover:border-ai-cyan/40 group-hover:text-ai-cyan text-white/70 transition-all duration-300">
                      <Icon size={16} />
                    </div>
                    <div className="text-left space-y-0.5">
                      <div className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                        {item.label}
                      </div>
                      <div className="font-mono text-xs text-white/80 group-hover:text-ai-cyan transition-colors">
                        {item.val}
                      </div>
                    </div>
                  </a>
                );
              })}

              {/* Google Drive Resume Link */}
              <div className="pt-2 flex justify-start">
                <a
                  href={ShridharInfo.resumeDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-transparent text-white border border-accent-purple/50 hover:border-accent-purple transition-all duration-300 font-mono text-xs tracking-widest uppercase hover:scale-[1.02] active:scale-95 neon-shadow-purple cursor-pointer purple-hover"
                >
                  <ExternalLink size={14} className="text-accent-purple animate-pulse" />
                  <span>[View Resume]</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-xl bg-[#05050a] backdrop-blur-xl border border-[#1a1a2e] neon-shadow-cyan text-left space-y-6 relative overflow-hidden">
              {/* Scanline layer */}
              <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />

              <div className="border-b border-[#1a1a2e] pb-4">
                <h4 className="font-display font-black text-sm text-white tracking-wider uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan animate-pulse" />
                  SKM_COMMS_FORM.PY
                </h4>
              </div>

              {/* Form elements */}
              <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                
                {/* Row: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-white/40 uppercase">
                      Sender Name:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Neo Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#020205] border border-[#1a1a2e] hover:border-white/20 focus:border-ai-cyan focus:ring-1 focus:ring-ai-cyan rounded p-3 text-white placeholder-white/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-white/40 uppercase">
                      Sender Email:
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. neo@cyber.net"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#020205] border border-[#1a1a2e] hover:border-white/20 focus:border-ai-cyan focus:ring-1 focus:ring-ai-cyan rounded p-3 text-white placeholder-white/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Dropdown: Subject selection */}
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-white/40 uppercase">
                    Communication Subject:
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#020205] border border-[#1a1a2e] focus:border-ai-cyan rounded p-3 text-white/80 outline-none transition-all"
                  >
                    <option value="Job Opportunity">Job Placement / Recruitment</option>
                    <option value="Collaboration">Open-Source Collaboration</option>
                    <option value="General">General Dialogue</option>
                  </select>
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-white/40 uppercase">
                    Message Payload:
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter your transmission content..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#020205] border border-[#1a1a2e] hover:border-white/20 focus:border-ai-cyan focus:ring-1 focus:ring-ai-cyan rounded p-3 text-white placeholder-white/20 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-transparent hover:bg-ai-cyan/5 text-white border border-ai-cyan/50 hover:border-ai-cyan py-3.5 rounded font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer neon-shadow-cyan"
                >
                  <Send size={12} className={loading ? "animate-ping text-ai-cyan" : ""} />
                  <span>{loading ? "TRANSMITTING..." : "[TRANSMIT REQUEST]"}</span>
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Animated Toast Alert */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-50 px-5 py-3.5 rounded-lg font-mono text-xs flex items-center gap-3 backdrop-blur-xl border select-none"
            style={{
              backgroundColor: toast.type === "success" ? "rgba(3, 10, 3, 0.9)" : "rgba(15, 3, 3, 0.9)",
              borderColor: toast.type === "success" ? "#39ff14" : "#ef4444",
              boxShadow: toast.type === "success" ? "0 0 15px rgba(57, 255, 20, 0.25)" : "0 0 15px rgba(239, 68, 68, 0.25)",
              color: toast.type === "success" ? "#39ff14" : "#ef4444"
            }}
          >
            {toast.type === "success" ? <ShieldCheck size={16} /> : <AlertCircle size={16} />}
            <span>{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
