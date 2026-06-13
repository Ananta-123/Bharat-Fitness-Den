// LoginPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  // LOGIN HANDLER
  const handleLogin = (e) => {
    e.preventDefault();

    // DEMO AUTH
    localStorage.setItem("adminAuth", "true");

    // REDIRECT TO DASHBOARD
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#8B0000]/30 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F96B00]/20 blur-[140px] rounded-full" />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div
          className="
            w-full
            max-w-7xl
            grid
            grid-cols-1
            lg:grid-cols-2
            rounded-[32px]
            overflow-hidden
            border border-white/10
            bg-[#0B0B0B]/90
            backdrop-blur-xl
            shadow-[0_0_80px_rgba(249,107,0,0.08)]
          "
        >
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="
              relative
              flex
              flex-col
              justify-between
              p-6
              sm:p-10
              lg:p-14
              min-h-[520px]
              lg:min-h-[850px]
            "
          >
            {/* IMAGE OVERLAY */}
            <div
              className="
                absolute inset-0
                bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')]
                bg-cover
                bg-center
                opacity-20
              "
            />

            <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/40 via-black/60 to-black" />

            {/* CONTENT */}
            <div className="relative z-10">
              {/* LOGO */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div
                  className="
                    w-20 h-20
                    rounded-2xl
                    bg-black/60
                    border border-white/10
                    flex items-center justify-center
                    overflow-hidden
                    backdrop-blur-xl
                    shadow-lg
                  "
                >
                  <img
                    src="https://res.cloudinary.com/dl58sdjnk/image/upload/v1781027063/ChatGPT_Image_Jun_9_2026_11_13_48_PM_cpas14.png"
                    alt="logo"
                    className="w-28 scale-150 object-contain"
                  />
                </div>

                <div>
                  <p className="text-xs sm:text-sm tracking-[0.3em] text-white/60 uppercase">
                    Admin Console
                  </p>

                  <h1 className="text-2xl sm:text-3xl font-black leading-tight">
                    BHARAT <br /> FITNESS DEN
                  </h1>
                </div>
              </motion.div>

              {/* HERO TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-16"
              >
                <p className="uppercase tracking-[0.35em] text-[#F96B00] text-sm font-semibold">
                  Operations Dashboard
                </p>

                <h2
                  className="
                    mt-5
                    text-5xl
                    sm:text-6xl
                    xl:text-7xl
                    font-black
                    leading-[0.95]
                  "
                >
                  Command
                  <br />

                  <span className="bg-gradient-to-r from-[#8B0000] to-[#F96B00] bg-clip-text text-transparent">
                    Every Rep.
                  </span>
                </h2>

                <p className="mt-8 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
                  Full control over members, trainers,
                  schedules, billing, and analytics —
                  all in one secure admin panel.
                </p>

                <div className="mt-8 w-20 h-1 rounded-full bg-gradient-to-r from-[#8B0000] to-[#F96B00]" />
              </motion.div>
            </div>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="
                relative z-10
                grid grid-cols-1
                sm:grid-cols-3
                gap-4
                mt-10
              "
            >
              {[
                {
                  title: "Active Members",
                  value: "2,847",
                  growth: "+12%",
                },
                {
                  title: "Sessions Today",
                  value: "138",
                  growth: "+4",
                },
                {
                  title: "Monthly Revenue",
                  value: "₹4.8L",
                  growth: "+18%",
                },
              ].map((item, index) => (
                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  key={index}
                  className="
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.04]
                    backdrop-blur-xl
                    p-5
                  "
                >
                  <p className="text-sm text-white/60">
                    {item.title}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold">
                    {item.value}
                  </h3>

                  <div
                    className="
                      mt-3
                      inline-flex
                      rounded-full
                      bg-green-500/15
                      px-3 py-1
                      text-sm
                      font-semibold
                      text-green-400
                    "
                  >
                    {item.growth}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="
              flex items-center justify-center
              p-6 sm:p-10 lg:p-14
              bg-[#070707]
              border-t lg:border-t-0 lg:border-l
              border-white/10
            "
          >
            <div
              className="
                w-full
                max-w-md
                rounded-[30px]
                border border-white/10
                bg-[#09090F]
                p-6 sm:p-8
                shadow-[0_0_80px_rgba(249,107,0,0.08)]
              "
            >
              {/* BADGE */}
              <div
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border border-[#F96B00]/30
                  bg-[#F96B00]/10
                  px-4 py-2
                  text-xs
                  sm:text-sm
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#F96B00]
                "
              >
                Secure Admin Access
              </div>

              {/* HEADING */}
              <div className="mt-8">
                <h2 className="text-4xl font-black">
                  Welcome back
                </h2>

                <p className="mt-3 text-white/60">
                  Sign in to your administrator account
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleLogin}
                className="mt-10 space-y-6"
              >
                {/* EMAIL */}
                <div>
                  <label className="text-sm uppercase tracking-[0.2em] text-white/50">
                    Admin Email
                  </label>

                  <div
                    className="
                      mt-3
                      flex items-center
                      gap-3
                      rounded-2xl
                      border border-white/10
                      bg-white/[0.03]
                      px-4 py-4
                      transition-all
                      focus-within:border-[#F96B00]
                      focus-within:shadow-[0_0_25px_rgba(249,107,0,0.2)]
                    "
                  >
                    <Mail className="w-5 h-5 text-white/50" />

                    <input
                      type="email"
                      placeholder="admin@bharatfitnessden.com"
                      required
                      className="
                        w-full
                        bg-transparent
                        outline-none
                        text-white
                        placeholder:text-white/35
                      "
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="text-sm uppercase tracking-[0.2em] text-white/50">
                    Password
                  </label>

                  <div
                    className="
                      mt-3
                      flex items-center
                      gap-3
                      rounded-2xl
                      border border-white/10
                      bg-white/[0.03]
                      px-4 py-4
                      transition-all
                      focus-within:border-[#F96B00]
                      focus-within:shadow-[0_0_25px_rgba(249,107,0,0.2)]
                    "
                  >
                    <Lock className="w-5 h-5 text-white/50" />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="••••••••••••"
                      required
                      className="
                        w-full
                        bg-transparent
                        outline-none
                        text-white
                        placeholder:text-white/35
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-white/50" />
                      ) : (
                        <Eye className="w-5 h-5 text-white/50" />
                      )}
                    </button>
                  </div>
                </div>

                {/* OPTIONS */}
                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="
                        w-4 h-4
                        rounded
                        border-white/20
                        bg-transparent
                        accent-[#F96B00]
                      "
                    />

                    <span className="text-white/60 text-sm">
                      Keep me signed in
                    </span>
                  </label>

                  <button
                    type="button"
                    className="
                      text-sm
                      text-[#F96B00]
                      hover:text-[#ff8d37]
                      transition-colors
                    "
                  >
                    Forgot password?
                  </button>
                </div>

                {/* BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="
                    group
                    relative
                    w-full
                    overflow-hidden
                    rounded-2xl
                    bg-gradient-to-r
                    from-[#8B0000]
                    to-[#F96B00]
                    px-6 py-4
                    font-bold
                    text-lg
                    shadow-[0_0_35px_rgba(249,107,0,0.35)]
                    transition-all
                  "
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Access Dashboard

                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </form>

              {/* FOOTER */}
              <div
                className="
                  mt-8
                  rounded-2xl
                  border border-[#02045D]/50
                  bg-[#02045D]/20
                  p-4
                "
              >
                <p className="text-sm text-white/55 leading-relaxed">
                  Restricted to authorised administrators.
                  All access is logged and monitored.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;