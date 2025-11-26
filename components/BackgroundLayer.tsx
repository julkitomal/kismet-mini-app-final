import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeConfig } from '../types';

interface BackgroundLayerProps {
  activeTheme: ThemeConfig | null;
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ activeTheme }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {!activeTheme ? (
          // DEFAULT VOID STATE
          <motion.div
            key="void"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0 bg-black"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black" />
          </motion.div>
        ) : (
          // ARTIST SPECIFIC ATMOSPHERE
          <motion.div
            key={activeTheme.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed inset-0 z-0 overflow-hidden ${activeTheme.bgClass}`}
            style={activeTheme.customStyle}
          >
            {/* Simplified Ambient Elements */}
            
            {activeTheme.id === 'alva' && (
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-blue-900/30 blur-[80px]" />
            )}

            {activeTheme.id === 'kathonejo' && (
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/50 via-black to-black" />
            )}

            {activeTheme.id === 'gressie' && (
                 <div className="absolute inset-0 bg-white/5" /> // Removed blur for performance
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};