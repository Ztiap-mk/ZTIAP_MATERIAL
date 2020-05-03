menu = function() {
  var sceneObjects = []
  sceneObjects.push(new Background("background") );
   sceneObjects.push(new Button('level', 200,100,130,87, "play") );
   sceneObjects.push(new Button('instructions', 200,200,270,61, "instructions") );

  return sceneObjects;
};