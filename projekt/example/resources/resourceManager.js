const IMAGES = [
    {name: 'ball', src: 'assets/img/ball.png'},
    {name: 'virus', src: 'assets/img/virus.png'},
    {name: 'pointer2', src: 'assets/img/pointer2.png'},
    {name: 'bg', src: 'assets/img/crowd.png'},
    {name: 'soundOn', src: 'assets/img/soundon.png'},
    {name: 'soundOff', src: 'assets/img/soundoff.png'},
];

const SOUNDS = [
    {name: 'death', src: 'assets/sounds/death.ogg', count: 10},
    {name: 'bg', src: 'assets/sounds/bg.mp3'},
];

// toto sluzi na inicialne loadnutie vsetkych obrazkov... aby to nebolo ako hidden image v html
class ResourceManager {
    loadedImages = new Map();
    loadedSounds = new Map();

    async init() {
        await this.loadImages();
        await this.loadSounds();
    }

    async loadSounds() {
        
        await Promise.all(
            SOUNDS.map(sound => this.loadSound(sound)),
        )
    }

    async loadImages() {
        await Promise.all(
            IMAGES.map(image => this.loadImage(image)),
        )
    }

    // dynamicky vytvorenie Image objectov spolu s tym aby sa nacitali obrazky
    // pouzili sa promise a async/await -> lepsie sa pracuje s asynchronnymi operaciami pri nacitavani obrazkov
    // nejaky tutorial ako to funguje -> 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    async loadImage(imgResource) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imgResource.src;
            img.onload = () => {
                this.loadedImages.set(imgResource.name, img);
                resolve(img);
            }
            img.onerror = (err) => {
                reject(err);
            }
        });
    }

    async loadSound(imgResource) {
        return new Promise((resolve, reject) => {
            const sound = new Audio(imgResource.src);
            sound.setAttribute("preload", "auto");
            sound.setAttribute("controls", "none");
            sound.style.display = "none";
            sound.oncanplaythrough = () => {
                this.loadedSounds.set(imgResource.name, sound);
                resolve(sound);
            }
            sound.onerror = (err) => {
                reject(err);
            }
        });
    }

    // ziskat js object Image, ktory sa posle do canvas
    getImageSource(imageName) {
        const image = this.loadedImages.get(imageName);
        if (image == null) {
            throw new Error(`Image '${imageName}' not found`);
        }
        return image;
    }

    getAudioSource(audioName) {
        const audio = this.loadedSounds.get(audioName);
        if (audio == null) {
            throw new Error(`Audio '${audioName}' not found`);
        }
        return audio;
    }
}

const resourceManager = new ResourceManager();