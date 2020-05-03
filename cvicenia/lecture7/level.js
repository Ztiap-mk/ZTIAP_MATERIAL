level = function() {
  var sceneObjects = []
  sceneObjects.push(new Background("crowd") );
  sceneObjects.push(new Button('menu',0,0,60,60, "home") );
	sceneObjects.push(new Button('sound',1200,0,60,60, "sound") );	
	for (let i = 0; i < 5; i++) {
            sceneObjects.push(new Virus());
        }
	sceneObjects.push(new Pointer() );	
  return sceneObjects;
};