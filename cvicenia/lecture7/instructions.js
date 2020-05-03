instructions = function() {
  var sceneObjects = []
  sceneObjects.push(new Background("background2") );
   sceneObjects.push(new Button('menu',1200,0,60,60, "home") );

  return sceneObjects;
};