// ===================================
// AUDIO ENGINE - Sound Synthesis
// ===================================

class AudioEngine {
    constructor() {
        this.audioContext = null;
        this.isInitialized = false;
        this.masterGain = null;
    }

    initialize() {
        if (this.isInitialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = 0.7; // Master volume
            this.isInitialized = true;
        } catch (error) {
            console.error('Audio initialization failed:', error);
            // Set initialized anyway so the experience works without audio
            this.isInitialized = true;
        }
    }

    playTapSound(intensity) {
        if (!this.isInitialized || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        
        // Create oscillator for tap sound
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        // Frequency based on intensity (0 to 1)
        // Higher intensity = lower, heavier sound
        const baseFreq = 1000 - (intensity * 600); // 1000Hz to 400Hz
        oscillator.frequency.value = baseFreq;
        oscillator.type = 'square';
        
        // Volume based on intensity
        const volume = 0.2 + (intensity * 0.3); // 0.2 to 0.5
        gainNode.gain.setValueAtTime(volume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        
        oscillator.start(now);
        oscillator.stop(now + 0.15);

        // Add impact noise
        this.playImpactNoise(intensity, now);
    }

    playImpactNoise(intensity, startTime) {
        if (!this.isInitialized || !this.audioContext) return;

        // Create white noise for impact
        const bufferSize = this.audioContext.sampleRate * 0.1;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * intensity;
        }
        
        const noise = this.audioContext.createBufferSource();
        const noiseGain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        noise.buffer = buffer;
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        
        // Filter settings based on intensity
        filter.type = 'bandpass';
        filter.frequency.value = 800 - (intensity * 400); // 800Hz to 400Hz
        filter.Q.value = 1;
        
        const noiseVolume = 0.15 + (intensity * 0.2);
        noiseGain.gain.setValueAtTime(noiseVolume, startTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
        
        noise.start(startTime);
        noise.stop(startTime + 0.1);
    }

    playCreakSound(intensity) {
        if (!this.isInitialized || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        
        // Low frequency creak
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.frequency.value = 100 + (Math.random() * 100);
        oscillator.type = 'sawtooth';
        
        const volume = 0.1 * intensity;
        gainNode.gain.setValueAtTime(volume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        
        oscillator.start(now);
        oscillator.stop(now + 0.5);
    }

    playShatterSound() {
        if (!this.isInitialized || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        
        // Main crash - multiple overlapping sounds
        for (let i = 0; i < 12; i++) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            // Random high frequencies for glass
            oscillator.frequency.value = 800 + Math.random() * 2500;
            oscillator.type = 'square';
            
            const delay = i * 0.015;
            gainNode.gain.setValueAtTime(0.4, now + delay);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.4);
            
            oscillator.start(now + delay);
            oscillator.stop(now + delay + 0.4);
        }
        
        // Add massive white noise burst
        this.playShatterNoise(now);
        
        // Low frequency rumble
        this.playRumble(now);
    }

    playShatterNoise(startTime) {
        if (!this.isInitialized || !this.audioContext) return;

        const bufferSize = this.audioContext.sampleRate * 0.8;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            // Decay over time
            const decay = 1 - (i / bufferSize);
            data[i] = (Math.random() * 2 - 1) * decay;
        }
        
        const noise = this.audioContext.createBufferSource();
        const noiseGain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        noise.buffer = buffer;
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        
        filter.type = 'highpass';
        filter.frequency.value = 500;
        
        noiseGain.gain.setValueAtTime(0.5, startTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.8);
        
        noise.start(startTime);
        noise.stop(startTime + 0.8);
    }

    playRumble(startTime) {
        if (!this.isInitialized || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.frequency.value = 60;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 1.2);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 1.2);
    }

    playAmbientTension(intensity) {
        if (!this.isInitialized || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        
        // Low drone that builds tension
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.frequency.value = 80 + (intensity * 40);
        oscillator.type = 'sine';
        
        const volume = 0.05 + (intensity * 0.1);
        gainNode.gain.setValueAtTime(volume, now);
        gainNode.gain.linearRampToValueAtTime(volume * 1.2, now + 0.5);
        gainNode.gain.linearRampToValueAtTime(0.01, now + 1);
        
        oscillator.start(now);
        oscillator.stop(now + 1);
    }

    cleanup() {
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
            this.isInitialized = false;
        }
    }
}

// Export for use in main script
window.AudioEngine = AudioEngine;

// Made with Bob
