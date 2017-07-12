function CoffeeMachine(rootEl, options, power) {
  this.rootEl = rootEl;
  this.options = Object.assign({}, CoffeeMachine.defaultButtons, options);
  this.btnStart = rootEl.querySelector(this.options.btnStart);
  this.btnStop = rootEl.querySelector(this.options.btnStop);
  this.timeField = rootEl.querySelector(this.options.timeField);
  this.power = power;
  this.waterAmount = 0;
  this.timerId;

  this.btnStart.addEventListener("click", this.run.bind(this));
  this.btnStop.addEventListener("click", this.stop.bind(this));
}


CoffeeMachine.prototype.run = function() {
    this.timerId = setTimeout(onReady.bind(this), getBoilTime.call(this));
    this.timeField.innerHTML = "Coffee will be ready in " + (getBoilTime.call(this)/1000).toFixed() + " sec";
  };
CoffeeMachine.prototype.stop = function(){
    clearTimeout(this.timerId);
    this.timeField.innerHTML = "Preparation stopped";
  };

   var getBoilTime = function() {
    const WATER_HEAT_CAPACITY = 4200;
    return this.waterAmount * WATER_HEAT_CAPACITY * 80 / this.power;
  };
  function onReady() {
    this.timeField.innerHTML = "Coffee is ready!"; //executed in x getBoilTime() minutes, not instanlty, as we use .bind
  };
  

CoffeeMachine.defaultButtons = {
  btnStart: ".btn-start",
  btnStop: ".btn-stop",
  timeField: ".timeField"
}

var first_coffeeMachine = document.getElementById("coffeemachine_1");
var myCoffee = new CoffeeMachine(first_coffeeMachine, {}, 9500);
myCoffee.waterAmount = 100;
