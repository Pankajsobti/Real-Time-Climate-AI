import { motion } from "framer-motion";
import {
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Factory,
} from "lucide-react";

// 🌞 Glow animation
const glow = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 8,
      ease: "linear",
    },
  },
};

// 🌧 Floating animation
const float = {
  animate: {
    y: [0, -6, 0],
    transition: {
      repeat: Infinity,
      duration: 2,
    },
  },
};

export const AnimatedIcons = {
  temp: (
    <motion.div {...glow} className="text-yellow-400 drop-shadow-[0_0_10px_#facc15]">
      <Sun size={22} />
    </motion.div>
  ),

  aqi: (
    <motion.div {...float} className="text-purple-400 drop-shadow-[0_0_8px_#a855f7]">
      <Factory size={22} />
    </motion.div>
  ),

  humidity: (
    <motion.div {...float} className="text-cyan-400 drop-shadow-[0_0_8px_#06b6d4]">
      <Droplets size={22} />
    </motion.div>
  ),

  rainfall: (
    <motion.div {...float} className="text-blue-400 drop-shadow-[0_0_10px_#3b82f6]">
      <CloudRain size={22} />
    </motion.div>
  ),

  urban: (
    <motion.div {...float} className="text-green-400 drop-shadow-[0_0_8px_#22c55e]">
      <Wind size={22} />
    </motion.div>
  ),
};