class SoundManager {
    _isMuted = false;
    /** @type {HTMLAudioElement} */
    currentMusic = null;

    /** @type {HTMLAudioElement[]} */
    playingSounds = [];

    playMusic() {
        this.stopMusic();

        this.currentMusic = resourceManager.getAudioSource('bg');
        this.currentMusic.muted = this._isMuted;
        this.currentMusic.currentTime = 0;
        this.currentMusic.loop = true;
        this.currentMusic.volume = 1;
        this.currentMusic.play();
    }

    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
    }

    toggleSound() {
        this._isMuted = !this._isMuted;

        for (let index = 0; index < this.playingSounds.length; index++) {
            const sound = this.playingSounds[index];
            sound.muted = this._isMuted;
        }
        this.currentMusic.muted = this._isMuted;
    }

    playSound() {
        const deathSound = resourceManager.getAudioSource('death');
        deathSound.play();
    }

    

    isMuted() {
        return this._isMuted;
    }
}

const soundManager = new SoundManager();