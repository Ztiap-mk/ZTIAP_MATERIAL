const IMAGES = [
    {name: 'virus', src: 'img/virus.png'},
    {name: 'pointer2', src: 'img/pointer2.png'},
    {name: 'crowd', src: 'img/crowd.png'},
	{name: 'background', src: 'img/background.png'},
	{name: 'play', src: 'img/play.png'},
	{name: 'background2', src: 'img/background2.png'},
	{name: 'instructions', src: 'img/instructions.png'},
	{name: 'home', src: 'img/home.png'},
	{name: 'sound', src: 'img/sound-btn.png'},
	
];
// toto sluzi na inicialne loadnutie vsetkych obrazkov... aby to nebolo ako hidden image v html
class ResourceManager {
    loadedImages = new Map();

    async init() {
        await this.loadImages();
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

    // ziskat js object Image, ktory sa posle do canvas
    getImageSource(imageName) {
        const image = this.loadedImages.get(imageName);
        if (image == null) {
            throw new Error(`Image '${imageName}' not found`);
        }
        return image;
    }
}