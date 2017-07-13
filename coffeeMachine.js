function CoffeeMachine(rootEl, options) {
  this.rootEl = rootEl;
  this.options = Object.assign({}, CoffeeMachine.defaultButtons, options);
  this.capacity = 1000;
  this.power = 9500;
  this.waterAmount = 0;
  var progress = false;
  this.timerId;
  this.btnStart = rootEl.querySelector(this.options.btnStart);
  this.btnStop = rootEl.querySelector(this.options.btnStop);
  this.timeField = rootEl.querySelector(this.options.timeField);
  
  this.btnStart.addEventListener("click", this.run.bind(this));
  this.btnStop.addEventListener("click", this.stop.bind(this));
}

CoffeeMachine.prototype.isRunning = function(){
    if(progress == false){
      console.log("Machine is in sleep mode");
    }else{
      console.log("Machine is running");
    }
  }

CoffeeMachine.prototype.run = function() {
  if(this.waterAmount > 0 && this.waterAmount <= this.capacity){
      progress = true;
      this.timerId = setTimeout(onReady.bind(this), getBoilTime.call(this));
      countDown(getBoilTime.call(this));
      // this.timeField.innerHTML = "Coffee will be ready in " + (getBoilTime.call(this)/1000).toFixed() + " sec";
    }
  };

var countDown = function(sec){
  console.log(this);
  this.timeField.innerHTML = "Coffee will be ready in " + (sec/1000).toFixed() + " sec";
};

CoffeeMachine.prototype.stop = function(){
    clearTimeout(this.timerId);
    this.timeField.innerHTML = "Preparation stopped";
  };

  CoffeeMachine.prototype.setWaterAmount = function(amount) {
    this.waterAmount = amount;
    if (amount < 0) {
      this.timeField.innerHTML = "Not enough water";
    }
    if (amount > this.capacity) {
      this.timeField.innerHTML = "You cannot put more than " + this.capacity + " ml";
    }
  };
  CoffeeMachine.prototype.getWaterAmount = function(){
    return this.waterAmount;
  }

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
var myCoffee = new CoffeeMachine(first_coffeeMachine, {});
myCoffee.setWaterAmount(1000);
