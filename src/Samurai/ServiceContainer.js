let ServiceContainer = new Object();

ServiceContainer.prototype.services = [];

ServiceContainer.prototype.add = function(name, constructor) {

};

ServiceContainer.prototype.has = function (name) {

};

ServiceContainer.prototype.remove = function (name) {
  if(!this.has(name)) {
      throw new Error("Service " + name + " not found");
  }

  this.services.
};

export defautlt ServiceContainer;