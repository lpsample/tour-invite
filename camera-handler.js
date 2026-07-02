// ===================================
// CAMERA HANDLER - Reflection System
// ===================================

class CameraHandler {
    constructor() {
        this.stream = null;
        this.videoElement = document.getElementById('camera-feed');
        this.cameraLayer = document.getElementById('camera-layer');
        this.placeholder = document.getElementById('placeholder-reflection');
        this.hasCamera = false;
        this.distortionLevel = 0;
    }

    async requestCamera() {
        try {
            // Request camera with specific constraints
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            });

            // Set video source
            this.videoElement.srcObject = this.stream;
            this.hasCamera = true;

            // Hide placeholder, show camera
            this.placeholder.classList.add('hidden');
            this.videoElement.style.display = 'block';

            return true;
        } catch (error) {
            console.log('Camera access denied or unavailable:', error);
            this.showPlaceholder();
            return false;
        }
    }

    showPlaceholder() {
        this.placeholder.classList.remove('hidden');
        this.placeholder.style.opacity = '0.3';
        this.videoElement.style.display = 'none';
        this.hasCamera = false;
    }

    applyDistortion(level) {
        // level: 0 (none) to 1 (maximum distortion)
        this.distortionLevel = level;

        if (this.hasCamera) {
            const brightness = 0.8 - (level * 0.4); // 0.8 to 0.4
            const contrast = 1.1 + (level * 0.3); // 1.1 to 1.4
            const saturate = 1 - (level * 0.6); // 1 to 0.4
            const blur = level * 5; // 0 to 5px

            this.videoElement.style.filter = `
                brightness(${brightness})
                contrast(${contrast})
                saturate(${saturate})
                blur(${blur}px)
            `;

            // Add glitch effect at high distortion
            if (level > 0.7) {
                this.videoElement.classList.add('cracking');
            }
        } else {
            // Distort placeholder text
            const opacity = 0.3 - (level * 0.2);
            this.placeholder.style.opacity = opacity;
        }
    }

    fadeToBlack(duration = 1000) {
        const startTime = Date.now();
        
        const fade = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            if (this.hasCamera) {
                this.videoElement.style.opacity = 1 - progress;
            } else {
                this.placeholder.style.opacity = 0.3 * (1 - progress);
            }

            if (progress < 1) {
                requestAnimationFrame(fade);
            } else {
                // Hide camera layer completely
                this.cameraLayer.style.display = 'none';
            }
        };

        requestAnimationFrame(fade);
    }

    cleanup() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }

    reset() {
        // Reset for replay
        this.cameraLayer.style.display = 'block';
        
        if (this.hasCamera) {
            this.videoElement.style.opacity = 1;
            this.videoElement.style.filter = 'brightness(0.8) contrast(1.1)';
            this.videoElement.classList.remove('cracking');
        } else {
            this.placeholder.style.opacity = 0.3;
        }

        this.distortionLevel = 0;
    }
}

// Export for use in main script
window.CameraHandler = CameraHandler;

// Made with Bob
