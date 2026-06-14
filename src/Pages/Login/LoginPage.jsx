
// LoginPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { loginAdmin } from "../../Api/authApi.js";
import { logoutAdmin } from "../../Api/authApi.js";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";



const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // LOGIN HANDLER
 const handleLogin = async (e) => {
  e.preventDefault();

  try {

    setLoading(true);

    const data = await loginAdmin({
      email,
      password,
    });

    console.log(data);

    if (data.accessToken) {

      localStorage.setItem(
        "token",
        data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );

      // STORE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // OPTIONAL
      localStorage.setItem(
        "adminAuth",
        "true"
      );

      navigate("/");
    }

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );

  } finally {

    setLoading(false);

  }
};

const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#8B0000]/25 blur-[100px] lg:h-[500px] lg:w-[500px] lg:blur-[160px]" />

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#F96B00]/15 blur-[100px] lg:h-[500px] lg:w-[500px] lg:blur-[160px]" />

      {/* MAIN CONTAINER */}
      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          items-center
          justify-center
          px-3
          py-3
          sm:px-4
          sm:py-4
          md:px-6
          md:py-6
          lg:p-8
        "
      >
        <div
          className="
            grid
            min-h-screen
            w-full
            max-w-7xl
            overflow-hidden
            rounded-[24px]
            border
            border-white/10
            bg-[#0A0A0A]
            shadow-[0_0_80px_rgba(0,0,0,0.6)]
            sm:rounded-[28px]
            lg:min-h-[92vh]
            lg:rounded-[36px]
            lg:grid-cols-2
          "
        >
          {/* LEFT SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="
              relative
              hidden
              flex-col
              justify-between
              overflow-hidden
              p-8
              md:p-10
              xl:p-14
              lg:flex
            "
          >
            {/* BACKGROUND IMAGE */}
            <div
              className="
                absolute
                inset-0
                bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')]
                bg-cover
                bg-center
              "
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/70" />

            <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/40 via-black/40 to-black" />

            {/* CONTENT */}
            <div className="relative z-10">
              {/* LOGO */}
              <div className="flex items-center gap-4 xl:gap-5">
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/40
                    backdrop-blur-xl
                    sm:h-20
                    sm:w-20
                    xl:h-24
                    xl:w-24
                    xl:rounded-3xl
                  "
                >
                  <img
                    src="https://res.cloudinary.com/dl58sdjnk/image/upload/v1781027063/ChatGPT_Image_Jun_9_2026_11_13_48_PM_cpas14.png"
                    alt="logo"
                    className="w-24 scale-150 object-contain xl:w-32"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50 sm:text-sm">
                    Admin Console
                  </p>

                  <h1
                    className="
                      mt-1
                      text-2xl
                      font-black
                      leading-none
                      sm:text-3xl
                      xl:mt-2
                      xl:text-5xl
                    "
                  >
                    BHARAT
                    <br />
                    FITNESS DEN
                  </h1>
                </div>
              </div>

              {/* HERO */}
              <div className="mt-12 md:mt-16 xl:mt-28">
                <div
                  className="
                    inline-flex
                    rounded-full
                    border
                    border-[#F96B00]/20
                    bg-[#F96B00]/10
                    px-4
                    py-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#F96B00]
                    sm:px-5
                    sm:py-3
                    sm:text-xs
                  "
                >
                  Elite Gym Administration
                </div>

                <h2
                  className="
                    mt-8
                    max-w-xl
                    text-5xl
                    font-black
                    leading-[0.9]
                    sm:text-6xl
                    md:text-7xl
                    2xl:text-8xl
                  "
                >
                  Train Hard.
                  <br />

                  <span className="bg-gradient-to-r from-[#8B0000] to-[#F96B00] bg-clip-text text-transparent">
                    Lead Strong.
                  </span>
                </h2>

                <p
                  className="
                    mt-8
                    max-w-xl
                    text-base
                    leading-relaxed
                    text-white/65
                    sm:text-lg
                    xl:text-xl
                  "
                >
                  Centralized gym management system for
                  Bharat Fitness Den administrators.
                  Manage members, trainers, schedules,
                  and operations from one secure platform.
                </p>
              </div>
            </div>

            
          </motion.div>

          {/* RIGHT SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="
              relative
              flex
              min-h-screen
              items-center
              justify-center
              bg-[#0B0B0B]
              px-5
              py-8
              sm:px-8
              md:px-10
              lg:min-h-full
              lg:border-l
              lg:border-white/10
              lg:px-14
              xl:px-16
            "
          >
            <div className="w-full max-w-xl">
              {/* MOBILE BRAND */}
              <div className="mb-10 flex items-center gap-4 lg:hidden">
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border border-white/10
                    bg-black/40
                  "
                >
                  <img
                    src="https://res.cloudinary.com/dl58sdjnk/image/upload/v1781027063/ChatGPT_Image_Jun_9_2026_11_13_48_PM_cpas14.png"
                    alt="logo"
                    className="w-24 scale-150 object-contain"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Bharat Fitness Den
                  </p>

                  <h1 className="text-2xl font-black">
                    Admin Panel
                  </h1>

                  <p className="mt-1 text-sm text-white/45">
                    Train Hard. Lead Strong.
                  </p>
                </div>
              </div>

              {/* BADGE */}
              <div
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border border-[#F96B00]/20
                  bg-[#F96B00]/10
                  px-4
                  py-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-[#F96B00]
                  sm:px-5
                  sm:py-3
                  sm:text-xs
                "
              >
                Secure Access
              </div>

              {/* TITLE */}
              <div className="mt-8 sm:mt-10">
                <h2
                  className="
                    text-4xl
                    font-black
                    leading-[0.95]
                    sm:text-5xl
                    md:text-6xl
                    xl:text-7xl
                  "
                >
                  Welcome
                  <br />
                  Back
                </h2>

                <p
                  className="
                    mt-4
                    text-base
                    text-white/55
                    sm:mt-6
                    sm:text-lg
                    xl:text-xl
                  "
                >
                  Sign in to continue to your admin
                  dashboard.
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleLogin}
                className="
                  mt-10
                  space-y-6
                  sm:mt-12
                  sm:space-y-7
                  xl:mt-14
                  xl:space-y-8
                "
              >
                {/* EMAIL */}
                <div>
                  <label className="mb-3 block text-sm text-white/70 sm:mb-4 sm:text-lg">
                    Email Address
                  </label>

                  <div
                    className="
                      flex
                      h-14
                      items-center
                      gap-3
                      rounded-xl
                      border border-white/10
                      bg-white/[0.03]
                      px-4
                      transition-all
                      focus-within:border-[#F96B00]
                      focus-within:shadow-[0_0_30px_rgba(249,107,0,0.18)]
                      sm:h-16
                      sm:gap-4
                      sm:rounded-2xl
                      sm:px-5
                    "
                  >
                    <Mail className="h-5 w-5 text-white/40" />

                    <input
  type="email"
  required
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  placeholder="Email"
  className="
    w-full
    bg-transparent
    text-sm
    text-white
    outline-none
    placeholder:text-white/25
    sm:text-base
  "
/>
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-3 block text-sm text-white/70 sm:mb-4 sm:text-lg">
                    Password
                  </label>

                  <div
                    className="
                      flex
                      h-14
                      items-center
                      gap-3
                      rounded-xl
                      border border-white/10
                      bg-white/[0.03]
                      px-4
                      transition-all
                      focus-within:border-[#F96B00]
                      focus-within:shadow-[0_0_30px_rgba(249,107,0,0.18)]
                      sm:h-16
                      sm:gap-4
                      sm:rounded-2xl
                      sm:px-5
                    "
                  >
                    <Lock className="h-5 w-5 text-white/40" />

                    <input
  type={
    showPassword
      ? "text"
      : "password"
  }
  required
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  placeholder="••••••••"
  className="
    w-full
    bg-transparent
    text-sm
    text-white
    outline-none
    placeholder:text-white/25
    sm:text-base
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
                        <EyeOff className="h-5 w-5 text-white/40" />
                      ) : (
                        <Eye className="h-5 w-5 text-white/40" />
                      )}
                    </button>
                  </div>
                </div>

                {/* OPTIONS */}
                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="
                        h-4
                        w-4
                        accent-[#F96B00]
                      "
                    />

                    <span className="text-sm text-white/55 sm:text-base">
                      Remember me
                    </span>
                  </label>

                  
                </div>

                {/* BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="
                    group
                    relative
                    flex
                    h-14
                    w-full
                    items-center
                    justify-center
                    gap-3
                    overflow-hidden
                    rounded-xl
                    bg-gradient-to-r
                    from-[#8B0000]
                    to-[#F96B00]
                    text-base
                    font-bold
                    shadow-[0_0_45px_rgba(249,107,0,0.25)]
                    sm:h-16
                    sm:gap-4
                    sm:rounded-2xl
                    sm:text-lg
                    xl:text-xl
                  "
                >
                  <span className="relative z-10">
                    {loading
  ? "Signing In..."
  : "Access Dashboard"}
                  </span>

                  <ArrowRight
                    className="
                      relative
                      z-10
                      h-5
                      w-5
                      transition-transform
                      group-hover:translate-x-1
                      sm:h-6
                      sm:w-6
                    "
                  />
                </motion.button>
              </form>

              {/* FOOTER */}
              <div className="mt-10 sm:mt-12 xl:mt-14">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10" />

                  <ShieldCheck className="h-5 w-5 text-white/30" />

                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <p className="mt-5 text-center text-xs text-white/35 sm:mt-6 sm:text-sm">
                  Restricted to authorised administrators.
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

