import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress loader simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timer1 = setTimeout(() => setStage(1), 100); // Show Logo
    const timer2 = setTimeout(() => setStage(2), 2500); // Fade out
    const timer3 = setTimeout(() => onComplete(), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#000000', backgroundImage: 'url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhMVFRUXFRUVFRUVFxgVFRUVFRUWFxUYFxUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBKwMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAAAQIDBAUH/8QANhAAAgADBQgCAQIGAgMBAAAAAAECEfAhMUFRYQNxgZGhscHREuHxcqITIjJSYpJC0rLC4oL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+LAIaABoAAAGACGAAMAGAxpiGA2A0ICkNMlMa+wKmRO0pshgWr+KFMMeKEmBcxVXUVVwB1VXgAADYCAEMBEjEwExDkJgIkqQAITGkDsAUgBrPkJgATAACY5CQAA0A5AA5CGmAxNFSmOQEjQfEAAaAJAMcRIJgCZUyIhTAuZMTCZLYGk7eQkyJ+AmBomBExpgWgREykBUuQnaAwEKRUhAQwlWZbUqs+xKFvTWrgIeVcR/HF1uWJcv7bs3d98SImlq82AnyXVkzyKcLd/XH2JpL7v5YATIKt9A3WIgBimAwAEOQSAKpDlx78hSrArhy9ACY5L6fsE+O/2VKnaua+wE1X37KhirEdq3c1zw6FSW7qvoA+OQnCP4u/rPz75lKLP75AZNSvA1llaq5GcUGXICRMZLAGTMGyWwKmS2KYNgNMcyAmBcxpkTGmBomUmZplwgWhoSKQBIEsEq19FqDPglfywKclfdkn3i9AQoP/0+i9VcTG1i56f8V7q82+Dx/lSwulww3uRM4Vdbr9u7guIGThbvsyz4Qq3sS5K6/m/S6lxTc8scFxxfEhpb9Fd99QIcTq18WS4eBp0IcgJEUyWACAJgA0wHIBqIpNEDVYAayn92/gahlnwt6O0yUNfguGNrHn9gaJW66fyvkylLj/q/T3tCW1zXrrYaQxwteHc+66AChlp072PmNwaVu8oqHZ5dPVq6IFNYcrOlsPUDL4vCqpks3bq7u/JEUIHPEiGaRIyiAlksbJAAEAAAAADTEAGiLhMkzSEDWF/k1hVY/RnBVYG0MUtO9cwLhgst/lWOb36jTS/pVuds+lv/AI8Sders+5aA3ZjLT+Vc3eAo1m+GT0hVie8l7uMV/BeLSlPD9qb6kvZu+xaxOfazmBnE55vdVhDe5dzWJZtvovK6ojcvPvuBlKeDeopPTgaNN1+SIlm/PcCGq/AinIUwEAAA5gmAwGmNSpCSQ0kBUljXcuGHJ10IS16sr4a9gLWzeEuVv7Svhmuq82iUDz6/ZpDDFg+QE/Deua62lwxPOe/7tKSiyn18FW4qdbwIcWa43dzNy3aOzobSlhLj6M4lvAwimYxs2jRjGBmySmSAAAAAAAAAAA0aQmaNIUBrAzaBOqmZQG8Ms30QFww0qmXJLBb3b3uJUSqJ+EP5Q/48p+QCLaLOtGjNvSLt1Rb2ur5LyiItqv8ALnLomBLhiwh89UZxzxiS4r8ji2i/tW8h7bdXABRQZufMj4rCY3td3CZEW0YDa0FPcL5VcKYDAgJgWMQIByKQkOQDrH0NSqfoEWp69QHClX4LhgqkKHe+fstKvwBUOy0fX0V/D0irgEOz05JlSWa/b7An4/q5pERLV/7L2byX4T9ExQ6c7PLA5I+PNGEZ17RbjnjQGDJLiRICAAAAAAAAABo0gRCRpABtBDobQQadyNkdOzW/nZzAlbPTq/YODTqbJY2yzkpc2CeUnrKfYDmih3ft9ERQ7uS9HS29Oq8mcTeXV+UBzNadPolqqRtE9H+0zcteQGTRLLchMCGhFCAkBgAxkjAoJiQ5gUnvL4c2RMqF5dPoDRT05eWaQ73w+jOCBu732NYYVi+VvafdAVKHHq59bTWB5Ljd+64mCSwW938lb+41h2jr+Xta+LYDcDxaXflZMmKBa9k/JaVXT8ti/Fem56Ac8ar2c20R3xbLOzSvzmjCOADgiRk0dccBhFCBkA2gAQAAANAkXCgCFG0CFBAdGzgAvZwU/ZqoM0OCCrjeBUv+vhXgZSec3hi+CiCO2+T33/umkbuCeE91vOF3vdNIj4ZOen0/AHPG9/dd5dDKLeny/wDk3jhq7v7Mo4adj6+wMYpqmvHkzdXGkUMs1uM4lTXsCG6uJZT3cn7mQwExDqpiABAADABpgBShq4UwQGiSr7KUW7uzKZcKA0+U/v0aQusDOFVh67micvF65YvpuA1gX3u1ndxs1NoYpVjlN3vRTMtnA3ZlbhZrKxQ72dGz+MN1rzm5f7XvcpLeBcGzbvsWM+z9Nz/xNE0rub8LLktDOFty6YS/SlYjaCDn0WrYGThn2zb01Mo9nL17z7b2dj64u6zdgtL3jJTlnFDhW96AedtIDDabM9SPZy7/AGc0eyA82KAhwnftNkZPZAcnxD4nV/CD+EBhDCXDAbrZGsOyAz2cB1bPZiggOiCGq3AEENXfh9DT4fea3ryi0p1U120doSlwtUnatYXys9AYum3Z/t4dmjDaRTsam7rbIlx+1+k0jlKd3+Su3RrDf5ZhGpWWSwT/AKeD/wCO67RgTFFfbOV6isa3vDjIyjlc5wvJ3MbwXJO9fpiXiW4zcWHRyVvKTe9J6gRFDVWSMYlV30aNLCaeX07eUyIos5NZqrwMolVXks0csK9kNAZsRTEwEIchAAANACKSEOdY8wKVVeypqvV3chcu7NFClfZ1f0BUM26cX0bQJLfo7eMWHDmY/PBWLLF72XAvwBuo52YZKxL3v7m2zhMYbL6qpG8GvL/t6A6Nno5LPF6Qzx1w4GnzwVi5yek74tXYuj5XtZ42cm1plDSmy4Yrui+sFW8N1hLgvLn+W+CWqhSWfl57kRslKbfF5vJFznbSVVcBnFDWpH8Kqq83SquZW0VlVd1YHnvZY1VxD2VvBvkehDB731aZ/wAP+rRS6y8AcX8Hx2F/Cs4+0eg9nav1NdCFB/K9LeTTA5Vsa3FQQV39nSoK6eOovhJtcVXPkBl8Coaquilp8a7ejN2Vz9/lICpytX43VaX8k11s0xhy7rmY/KVd9Oz4kOKVWp+GBpG5Wp8bk9Ilhvu3SZk3grM4H/S/0v8A41deP5zuv6RZ2Z2XfgxjdmnVY2ZrTriBESnNLjBFXbgneYxRcdG7eEWW+aNI4p323yiV6zwrFGW0edq/uXSfvqBDyVv+LXj0Q4teb/8AbwxxriiW+Pf74gKJ5rw+dz6EvTlcw3cvr0S3V6AJiG3X2TIAYhsUwAAGkAJlJcO5MwmBaiys1xGiUWgLhRrC8FbVVYYTmX8pVawOiGKVs+Pr2HynfdlnPF1aYfKsvvQtMDoUXF1edOyXPF5HJs+pvDFhTA6lFPcrqrM0UVeJV2OeGKqq41gqqwA6dmq787FqEd9YX9ZLgELsrhWrEnjVmPNoDSFVnK2fR8zPZw/yvWJemaYVY5yfZ8x7JWQrOKfOXpgTErV+uLwTsYJprOa/aaf2fqfgNhe9/ewDCC5PTup90xbVXPJ11lzKV25uXBz7MI1eqrEDOKt2KrIx2leGWouaruZxOtAM3FVVyM3FXjf4CMzbAInydLiJxz353T+yHFXkzirUC4n9rB+t/YyniuKqsxuL8+zNsAenFOvoh8mNvnVxLedegE3mJv8AIMQC3VwEMTYAEwEAwmAAAwACpjQABUxqvoQAUmawAAGqf2awMAA2hdVV50bKqrEAA3nXYE6zlP7XAYAVHdKrLEzWD/jpbzm/IwAn+z9T8E7N2uswACYv6ot/0yG66AAGEVjrd65mcYgAwjMWAAZxMhsAAhkzAAJZLYAAhAACAAASAAA//9k=)', backgroundSize: '115% 115%', backgroundPosition: '50% 50%' }}
      initial={{ opacity: 1 }}
      animate={{ backgroundPosition: ["50% 50%", "56% 44%", "50% 50%"] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >

      {/* Background Deep Glows */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-900/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen">
        {/* Background Ambient Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-600/20 to-cyan-600/20 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={stage >= 1 ? {
            scale: 1,
            opacity: 1,
            rotate: 360,
            x: [0, 20, -20, 0],
            y: [0, 20, -20, 0]
          } : {}}
          transition={{
            scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 1.2 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            x: { duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
            y: { duration: 12, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
          }}
          className="relative z-10 mb-12"
        >
          <div className="relative">
            <img
              src="/splash-logo.png"
              alt="Splash Logo"
              className="w-48 h-48 md:w-64 md:h-64 object-contain"
            />
          </div>

          {/* Subtle Shine Effect over Logo */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            animate={{
              left: ["-100%", "200%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>

        {/* Animation Loader */}
        <div className="relative z-10 w-48 h-[2px] bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-white/40 text-[10px] font-light tracking-[0.4em] uppercase"
        >
          Initializing Experience
        </motion.p>
      </div>
    </motion.div>
  );
}
