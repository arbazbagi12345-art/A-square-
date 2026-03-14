/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Knob } from './components/Knob';
import { Slider } from './components/Slider';
import { Oscilloscope } from './components/Oscilloscope';
import { Power, Activity, Disc, Zap, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  const [isPowered, setIsPowered] = useState(true);
  const [activeTab, setActiveTab] = useState('synth');
  const [preset, setPreset] = useState('NEON_DREAMS_04');

  const presets = ['NEON_DREAMS_04', 'CYBER_BASS_X', 'RETRO_LEAD_88', 'GHOST_PAD_V2'];

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#E6E6E6]">
      <div className="max-w-5xl w-full">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-6 px-2">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-plugin-bg uppercase italic">
              SonicRack <span className="text-accent-orange">V1</span>
            </h1>
            <p className="text-[10px] font-mono text-plugin-bg/60 uppercase tracking-[0.2em] font-bold">
              Professional Audio Processing Unit // Model 2026
            </p>
          </div>
          
          <div className="flex gap-6 items-center">
            {/* Preset Selector */}
            <div className="flex flex-col items-start">
              <span className="text-[9px] font-mono text-plugin-bg/60 uppercase font-bold mb-1">Preset Browser</span>
              <div className="flex gap-2">
                <select 
                  value={preset}
                  onChange={(e) => setPreset(e.target.value)}
                  className="bg-white border border-plugin-bg/10 rounded px-3 py-1 text-[10px] font-mono font-bold text-plugin-bg uppercase outline-none focus:border-accent-orange transition-colors cursor-pointer"
                >
                  {presets.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[9px] font-mono text-plugin-bg/60 uppercase font-bold">System Status</span>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isPowered ? "bg-accent-green shadow-[0_0_5px_rgba(57,255,20,0.5)]" : "bg-plugin-bg/20"
                  )} />
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => setIsPowered(!isPowered)}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg border-2",
                isPowered 
                  ? "bg-accent-orange border-accent-orange text-white shadow-accent-orange/20" 
                  : "bg-white border-plugin-bg/10 text-plugin-bg/20"
              )}
            >
              <Power size={20} />
            </button>
          </div>
        </div>

        {/* Main Plugin Container */}
        <div className="plugin-card flex flex-col md:flex-row h-[600px] relative">
          {/* Subtle Screw Details */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/5 border border-white/10 shadow-inner" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/5 border border-white/10 shadow-inner" />
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-white/5 border border-white/10 shadow-inner" />
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-white/5 border border-white/10 shadow-inner" />
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-20 bg-[#0a0a0b] border-r border-plugin-border flex flex-row md:flex-col items-center py-6 gap-6 z-10">
            <NavIcon 
              icon={<Activity size={20} />} 
              active={activeTab === 'synth'} 
              onClick={() => setActiveTab('synth')}
              label="SYNTH"
            />
            <NavIcon 
              icon={<Disc size={20} />} 
              active={activeTab === 'filter'} 
              onClick={() => setActiveTab('filter')}
              label="FILTER"
            />
            <NavIcon 
              icon={<Zap size={20} />} 
              active={activeTab === 'fx'} 
              onClick={() => setActiveTab('fx')}
              label="FX"
            />
            <NavIcon 
              icon={<Layers size={20} />} 
              active={activeTab === 'layers'} 
              onClick={() => setActiveTab('layers')}
              label="MOD"
            />
            <div className="mt-auto hidden md:block">
              <div className="w-1 h-12 bg-accent-orange/20 rounded-full relative overflow-hidden">
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-1/3 bg-accent-orange"
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col p-8 relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <div className="flex justify-between items-start mb-12">
              <div>
                <h2 className="text-2xl font-mono font-bold tracking-tight text-white uppercase">
                  {activeTab} Module
                </h2>
                <div className="flex gap-2 mt-2">
                  <span className="lcd-display">PATCH: {preset}</span>
                  <span className="lcd-display">CPU: 12%</span>
                </div>
              </div>
              
              <Oscilloscope isActive={isPowered} className="w-48 h-16" />
            </div>

            {/* Tab Content */}
            <div className="flex-1 flex flex-col gap-10">
              {activeTab === 'synth' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-10"
                >
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-3 bg-accent-blue rounded-full" />
                      <h3 className="text-[10px] font-mono text-text-dim uppercase tracking-widest font-bold">Oscillator Engine</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <Knob label="Wave" color="blue" defaultValue={0} max={4} step={1} />
                      <Knob label="Shape" color="blue" defaultValue={50} unit="%" />
                      <Knob label="Tune" color="blue" defaultValue={0} min={-12} max={12} step={1} unit="st" />
                      <Knob label="PW" color="blue" defaultValue={50} unit="%" />
                    </div>
                  </section>
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-3 bg-accent-green rounded-full" />
                      <h3 className="text-[10px] font-mono text-text-dim uppercase tracking-widest font-bold">Amp Envelope</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <Knob label="Attack" color="green" defaultValue={10} unit="ms" />
                      <Knob label="Decay" color="green" defaultValue={45} unit="ms" />
                      <Knob label="Sustain" color="green" defaultValue={70} unit="%" />
                      <Knob label="Release" color="green" defaultValue={30} unit="ms" />
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'filter' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-10"
                >
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-3 bg-accent-orange rounded-full" />
                        <h3 className="text-[10px] font-mono text-text-dim uppercase tracking-widest font-bold">Filter Unit</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <Knob label="Cutoff" size="md" color="orange" defaultValue={65} unit="Hz" />
                        <Knob label="Res" size="md" color="orange" defaultValue={40} unit="%" />
                        <Knob label="Env Amt" size="md" color="orange" defaultValue={30} unit="%" />
                        <Knob label="Drive" size="md" color="orange" defaultValue={15} unit="dB" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-3 bg-accent-orange rounded-full" />
                        <h3 className="text-[10px] font-mono text-text-dim uppercase tracking-widest font-bold">Filter Env</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <Knob label="Attack" color="orange" defaultValue={5} unit="ms" />
                        <Knob label="Decay" color="orange" defaultValue={20} unit="ms" />
                        <Knob label="Sustain" color="orange" defaultValue={0} unit="%" />
                        <Knob label="Release" color="orange" defaultValue={15} unit="ms" />
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'fx' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-12"
                >
                  <Knob label="Reverb" color="blue" defaultValue={20} unit="%" />
                  <Knob label="Delay" color="blue" defaultValue={35} unit="%" />
                  <Knob label="Chorus" color="blue" defaultValue={15} unit="%" />
                  <Knob label="Phaser" color="blue" defaultValue={0} unit="%" />
                  <Knob label="Bitcrush" color="orange" defaultValue={0} unit="bit" />
                  <Knob label="Distort" color="orange" defaultValue={10} unit="%" />
                  <Knob label="Comp" color="green" defaultValue={40} unit="dB" />
                  <Knob label="Limit" color="green" defaultValue={90} unit="%" />
                </motion.div>
              )}

              {activeTab === 'layers' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-10"
                >
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-3 bg-accent-blue rounded-full" />
                        <h3 className="text-[10px] font-mono text-text-dim uppercase tracking-widest font-bold">LFO 1</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <Knob label="Wave" color="blue" defaultValue={0} max={4} step={1} />
                        <Knob label="Speed" color="blue" defaultValue={30} unit="Hz" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-3 bg-accent-blue rounded-full" />
                        <h3 className="text-[10px] font-mono text-text-dim uppercase tracking-widest font-bold">LFO 2</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <Knob label="Wave" color="blue" defaultValue={2} max={4} step={1} />
                        <Knob label="Speed" color="blue" defaultValue={15} unit="Hz" />
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-3 bg-accent-blue rounded-full" />
                      <h3 className="text-[10px] font-mono text-text-dim uppercase tracking-widest font-bold">Modulation Matrix</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <Knob label="LFO 1 Depth" color="blue" defaultValue={25} unit="%" />
                      <Knob label="LFO 2 Depth" color="blue" defaultValue={60} unit="%" />
                      <Knob label="Vibrato" color="blue" defaultValue={10} unit="%" />
                      <Knob label="Tremolo" color="blue" defaultValue={5} unit="%" />
                    </div>
                  </section>
                </motion.div>
              )}
            </div>

            {/* Bottom Sliders */}
            <div className="mt-auto flex justify-between items-end gap-8 pt-8 border-t border-white/5">
              <div className="flex-1 flex gap-8">
                <Slider label="LOW" color="blue" defaultValue={45} orientation="horizontal" />
                <Slider label="MID" color="blue" defaultValue={55} orientation="horizontal" />
                <Slider label="HIGH" color="blue" defaultValue={65} orientation="horizontal" />
              </div>
              <div className="flex gap-6">
                <Slider label="VOL" color="orange" defaultValue={75} />
                <Slider label="GAIN" color="orange" defaultValue={60} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 flex justify-between items-center px-4">
          <div className="flex gap-6">
            <FooterStat label="SAMPLE RATE" value="48.0 kHz" />
            <FooterStat label="BIT DEPTH" value="24 BIT" />
            <FooterStat label="LATENCY" value="2.4 ms" />
          </div>
          <div className="text-[10px] font-mono text-plugin-bg/40 font-bold">
            DESIGNED BY SONICLABS // TOKYO
          </div>
        </div>
      </div>
    </div>
  );
}

function NavIcon({ icon, active, onClick, label }: { icon: React.ReactNode, active: boolean, onClick: () => void, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all group",
        active ? "text-accent-orange" : "text-text-dim hover:text-white"
      )}
    >
      <div className={cn(
        "p-2 rounded-lg transition-all",
        active ? "bg-accent-orange/10 shadow-[0_0_15px_rgba(255,95,31,0.2)]" : "group-hover:bg-white/5"
      )}>
        {icon}
      </div>
      <span className="text-[8px] font-bold tracking-widest font-mono">{label}</span>
    </button>
  );
}

function FooterStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[8px] font-mono text-plugin-bg/40 font-bold uppercase">{label}</span>
      <span className="text-[11px] font-mono text-plugin-bg/80 font-bold">{value}</span>
    </div>
  );
}
