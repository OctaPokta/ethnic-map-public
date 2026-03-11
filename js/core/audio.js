// ==========================================
// 🔊 AUDIO ENGINE
// ==========================================
const SoundEngine = {
  ctx: null,
  isMuted: false, // 🔥 NEW: Mute state
  
  init() { 
      if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); 
  },
  
  play(type) {
    if (this.isMuted) return; // 🔥 NEW: Abort if muted
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const now = this.ctx.currentTime;

    if (type === 'tick') {
      const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(800, now); osc.frequency.exponentialRampToValueAtTime(100, now + 0.02);
      gain.gain.setValueAtTime(0.06, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      osc.connect(gain); gain.connect(this.ctx.destination); osc.start(now); osc.stop(now + 0.02);
    } else if (type === 'chime') {
      const freqs = [880, 1108.73, 1318.51]; 
      freqs.forEach(freq => {
          const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
          osc.type = 'sine'; osc.frequency.value = freq;
          gain.gain.setValueAtTime(0, now); gain.gain.linearRampToValueAtTime(0.02, now + 0.03); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8); 
          osc.connect(gain); gain.connect(this.ctx.destination); osc.start(now); osc.stop(now + 0.8);
      });
    } else if (type === 'swoosh') {
      const bufferSize = this.ctx.sampleRate * 0.3; const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0); for (let i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; } 
      const noiseSource = this.ctx.createBufferSource(); noiseSource.buffer = buffer;
      const filter = this.ctx.createBiquadFilter(); filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, now); filter.frequency.exponentialRampToValueAtTime(1500, now + 0.15); filter.frequency.exponentialRampToValueAtTime(300, now + 0.3); 
      const gain = this.ctx.createGain(); gain.gain.setValueAtTime(0, now); gain.gain.linearRampToValueAtTime(0.08, now + 0.1); gain.gain.linearRampToValueAtTime(0, now + 0.3);
      noiseSource.connect(filter); filter.connect(gain); gain.connect(this.ctx.destination); noiseSource.start(now);
    } else if (type === 'coffee-hover') {
      const bufferSize = this.ctx.sampleRate * 0.25; const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0); for (let i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; }
      const noise = this.ctx.createBufferSource(); noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter(); filter.type = 'highpass'; filter.frequency.value = 2500;
      const hissGain = this.ctx.createGain(); hissGain.gain.setValueAtTime(0, now); hissGain.gain.linearRampToValueAtTime(0.04, now + 0.05); hissGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      noise.connect(filter); filter.connect(hissGain); hissGain.connect(this.ctx.destination); noise.start(now);
      
      const osc = this.ctx.createOscillator(); const popGain = this.ctx.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(350, now); osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      popGain.gain.setValueAtTime(0, now); popGain.gain.linearRampToValueAtTime(0.15, now + 0.02); popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(popGain); popGain.connect(this.ctx.destination); osc.start(now); osc.stop(now + 0.1);
    }
  }
};