// ===================================
// MIRROR BREAK - Main Interaction Logic
// ===================================

class MirrorBreak {
    constructor() {
        // Core systems
        this.camera = new CameraHandler();
        this.audio = new AudioEngine();
        
        // DOM elements
        this.mirrorFrame = document.querySelector('.mirror-frame');
        this.canvas = document.getElementById('crack-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.tapInstruction = document.getElementById('tap-instruction');
        this.easterEggEl = document.getElementById('easter-egg');
        this.shatterContainer = document.getElementById('shatter-container');
        this.revealedContent = document.getElementById('revealed-content');
        this.cameraPrompt = document.getElementById('camera-prompt');
        this.audioInit = document.getElementById('audio-init');
        
        // Tap tracking
        this.tapCount = 0;
        this.requiredTaps = 10 + Math.floor(Math.random() * 6); // 10-15 random
        this.cracks = [];
        this.isShattered = false;
        
        // Easter eggs
        this.easterEggs = [
            "Look in the mirror and beg",
            "Homecoming awaits...",
            "The tour begins...",
            "Come home",
            "Break free",
            "Don't stop",
            "Almost there...",
            "Look in the mirror and beg"
        ];
        this.easterEggShown = [];
        
        // Configuration
        this.config = {
            ticketURL: 'https://www.submithub.com/link/sam-sample-homecoming-tour',
            showDate: 'TBA',
            showTime: 'TBA',
            showVenue: 'TBA'
        };
        
        this.init();
    }
    
    init() {
        // Setup canvas
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Show audio init screen first
        this.audioInit.classList.remove('hidden');
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Update show details
        this.updateShowDetails();
    }
    
    setupEventListeners() {
        // Audio initialization
        document.getElementById('start-experience').addEventListener('click', () => {
            this.audio.initialize();
            this.audioInit.classList.add('hidden');
            this.showCameraPrompt();
        });
        
        // Camera prompt
        document.getElementById('allow-camera').addEventListener('click', async () => {
            this.cameraPrompt.classList.add('hidden');
            await this.camera.requestCamera();
        });
        
        document.getElementById('skip-camera').addEventListener('click', () => {
            this.cameraPrompt.classList.add('hidden');
            this.camera.showPlaceholder();
        });
        
        // Mirror tapping - both click and touch
        this.mirrorFrame.addEventListener('click', (e) => {
            console.log('Click event');
            this.handleTap(e);
        });
        
        this.mirrorFrame.addEventListener('touchstart', (e) => {
            e.preventDefault();
            console.log('Touch event');
            const touch = e.touches[0];
            this.handleTap(touch);
        }, { passive: false });
        
        // Replay button
        document.getElementById('replay-button').addEventListener('click', () => {
            this.reset();
        });
        
        // Ticket button with Meta Pixel tracking
        const ticketButton = document.getElementById('ticket-button');
        ticketButton.href = this.config.ticketURL;
        ticketButton.addEventListener('click', () => {
            // Track ticket button click with Meta Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', 'InitiateCheckout', {
                    content_name: 'Album Preview Show Ticket',
                    content_category: 'Event Ticket',
                    value: 0,
                    currency: 'USD'
                });
                console.log('Meta Pixel: Ticket click tracked');
            }
        });
        
        // Mobile shake detection
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', (e) => this.handleShake(e));
        }
    }
    
    showCameraPrompt() {
        this.cameraPrompt.classList.remove('hidden');
    }
    
    resizeCanvas() {
        const rect = this.mirrorFrame.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.redrawCracks();
    }
    
    handleTap(e) {
        if (this.isShattered) return;
        
        // Get tap position relative to canvas
        const rect = this.canvas.getBoundingClientRect();
        // Handle both mouse and touch events
        const clientX = e.clientX !== undefined ? e.clientX : (e.touches ? e.touches[0].clientX : e.pageX);
        const clientY = e.clientY !== undefined ? e.clientY : (e.touches ? e.touches[0].clientY : e.pageY);
        const x = (clientX - rect.left) / rect.width;
        const y = (clientY - rect.top) / rect.height;
        
        this.tapCount++;
        const intensity = this.tapCount / this.requiredTaps;
        
        console.log(`Tap ${this.tapCount}/${this.requiredTaps} at (${x.toFixed(2)}, ${y.toFixed(2)})`);
        
        // Play tap sound
        this.audio.playTapSound(intensity);
        
        // Add shake effect
        this.mirrorFrame.classList.add('shaking');
        setTimeout(() => this.mirrorFrame.classList.remove('shaking'), 300);
        
        // Create crack from tap point
        this.createCrack(x, y, intensity);
        
        // Apply camera distortion
        this.camera.applyDistortion(intensity);
        
        // Play ambient tension at higher intensities
        if (intensity > 0.5) {
            this.audio.playAmbientTension(intensity);
        }
        
        // Play creak sound occasionally
        if (Math.random() < intensity * 0.5) {
            this.audio.playCreakSound(intensity);
        }
        
        // Show easter egg occasionally
        if (Math.random() < 0.3 && this.easterEggShown.length < this.easterEggs.length) {
            this.showEasterEgg();
        }
        
        // Hide instruction after first tap
        if (this.tapCount === 1) {
            this.tapInstruction.classList.add('hidden');
        }
        
        // Check if should shatter
        if (this.tapCount >= this.requiredTaps) {
            setTimeout(() => this.shatter(), 200);
        }
    }
    
    createCrack(x, y, intensity) {
        const crack = {
            startX: x,
            startY: y,
            branches: []
        };
        
        // Create multiple crack branches
        const numBranches = 3 + Math.floor(intensity * 5); // 3-8 branches
        
        for (let i = 0; i < numBranches; i++) {
            const angle = (Math.PI * 2 * i / numBranches) + (Math.random() - 0.5) * 0.5;
            const length = 0.1 + (Math.random() * 0.2 * (1 + intensity));
            
            const branch = {
                angle: angle,
                length: length,
                segments: []
            };
            
            // Create jagged segments
            const numSegments = 5 + Math.floor(Math.random() * 5);
            let currentX = x;
            let currentY = y;
            
            for (let j = 0; j < numSegments; j++) {
                const segmentLength = length / numSegments;
                const jitter = (Math.random() - 0.5) * 0.3;
                const segmentAngle = angle + jitter;
                
                const endX = currentX + Math.cos(segmentAngle) * segmentLength;
                const endY = currentY + Math.sin(segmentAngle) * segmentLength;
                
                branch.segments.push({
                    startX: currentX,
                    startY: currentY,
                    endX: endX,
                    endY: endY
                });
                
                currentX = endX;
                currentY = endY;
            }
            
            crack.branches.push(branch);
        }
        
        this.cracks.push(crack);
        this.drawCrack(crack, intensity);
    }
    
    drawCrack(crack, intensity) {
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 + intensity * 0.4})`;
        this.ctx.lineWidth = 1 + intensity * 2;
        this.ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        this.ctx.shadowBlur = 3 + intensity * 5;
        
        crack.branches.forEach(branch => {
            branch.segments.forEach(segment => {
                this.ctx.beginPath();
                this.ctx.moveTo(
                    segment.startX * this.canvas.width,
                    segment.startY * this.canvas.height
                );
                this.ctx.lineTo(
                    segment.endX * this.canvas.width,
                    segment.endY * this.canvas.height
                );
                this.ctx.stroke();
            });
        });
    }
    
    redrawCracks() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cracks.forEach((crack, index) => {
            const intensity = (index + 1) / this.requiredTaps;
            this.drawCrack(crack, intensity);
        });
    }
    
    showEasterEgg() {
        // Get random unused easter egg
        const available = this.easterEggs.filter((_, i) => !this.easterEggShown.includes(i));
        if (available.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * available.length);
        const easterEgg = available[randomIndex];
        const originalIndex = this.easterEggs.indexOf(easterEgg);
        
        this.easterEggShown.push(originalIndex);
        
        // Display easter egg
        this.easterEggEl.textContent = easterEgg;
        this.easterEggEl.classList.remove('hidden');
        
        setTimeout(() => {
            this.easterEggEl.classList.add('hidden');
        }, 500);
    }
    
    shatter() {
        if (this.isShattered) return;
        this.isShattered = true;
        
        // Play shatter sound
        this.audio.playShatterSound();
        
        // Fade camera to black
        this.camera.fadeToBlack(800);
        
        // Create explosion of shards
        this.createShardExplosion();
        
        // Reveal content after shards start flying
        setTimeout(() => {
            this.revealedContent.classList.remove('hidden');
            this.revealedContent.classList.add('visible');
            
            // Play reveal music starting at 2:47 (167 seconds)
            const revealMusic = document.getElementById('reveal-music');
            if (revealMusic) {
                revealMusic.currentTime = 167; // 2:47 in seconds
                revealMusic.volume = 0.3; // 30% volume
                revealMusic.play().catch(err => {
                    console.log('Audio playback failed:', err);
                });
            }
        }, 1000);
    }
    
    createShardExplosion() {
        const numShards = 60 + Math.floor(Math.random() * 40); // 60-100 shards
        const rect = this.mirrorFrame.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        for (let i = 0; i < numShards; i++) {
            const shard = document.createElement('div');
            shard.className = 'glass-shard';
            
            // Random size
            const size = 10 + Math.random() * 40;
            shard.style.width = size + 'px';
            shard.style.height = size + 'px';
            
            // Start from random position near center
            const startX = centerX + (Math.random() - 0.5) * rect.width * 0.6;
            const startY = centerY + (Math.random() - 0.5) * rect.height * 0.6;
            shard.style.left = startX + 'px';
            shard.style.top = startY + 'px';
            
            // Random shape (using clip-path)
            const points = [];
            const numPoints = 5 + Math.floor(Math.random() * 4);
            for (let j = 0; j < numPoints; j++) {
                const angle = (j / numPoints) * Math.PI * 2;
                const radius = 30 + Math.random() * 40;
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;
                points.push(`${x}% ${y}%`);
            }
            shard.style.clipPath = `polygon(${points.join(', ')})`;
            
            this.shatterContainer.appendChild(shard);
            
            // Animate explosion
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = 500 + Math.random() * 700;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                const rotation = Math.random() * 1440 - 720;
                
                shard.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                shard.style.transform = `translate(${tx}px, ${ty}px) rotate(${rotation}deg) scale(0.1)`;
                shard.style.opacity = '0';
            }, 50);
        }
    }
    
    updateShowDetails() {
        document.getElementById('show-date').textContent = this.config.showDate;
        document.getElementById('show-time').textContent = this.config.showTime;
        document.getElementById('show-venue').textContent = this.config.showVenue;
    }
    
    handleShake(event) {
        if (this.isShattered) return;
        
        const acceleration = event.accelerationIncludingGravity;
        const threshold = 15;
        
        if (Math.abs(acceleration.x) > threshold || 
            Math.abs(acceleration.y) > threshold || 
            Math.abs(acceleration.z) > threshold) {
            
            // Trigger a tap at random position
            const fakeEvent = {
                clientX: this.mirrorFrame.getBoundingClientRect().left + 
                         Math.random() * this.mirrorFrame.getBoundingClientRect().width,
                clientY: this.mirrorFrame.getBoundingClientRect().top + 
                         Math.random() * this.mirrorFrame.getBoundingClientRect().height
            };
            
            this.handleTap(fakeEvent);
        }
    }
    
    reset() {
        // Reset all state
        this.tapCount = 0;
        this.requiredTaps = 10 + Math.floor(Math.random() * 6);
        this.cracks = [];
        this.isShattered = false;
        this.easterEggShown = [];
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Clear shards
        this.shatterContainer.innerHTML = '';
        
        // Reset camera
        this.camera.reset();
        
        // Stop reveal music
        const revealMusic = document.getElementById('reveal-music');
        if (revealMusic) {
            revealMusic.pause();
            revealMusic.currentTime = 0;
        }
        
        // Hide revealed content
        this.revealedContent.classList.remove('visible');
        setTimeout(() => {
            this.revealedContent.classList.add('hidden');
        }, 300);
        
        // Show mirror frame and canvas again
        this.mirrorFrame.style.opacity = '1';
        this.mirrorFrame.style.pointerEvents = 'auto';
        this.canvas.style.opacity = '1';
        
        // Show instruction again
        this.tapInstruction.classList.remove('hidden');
        this.tapInstruction.style.opacity = '1';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const mirrorBreak = new MirrorBreak();
    window.mirrorBreak = mirrorBreak; // For debugging
});

// Prevent double-tap zoom on mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Made with Bob
