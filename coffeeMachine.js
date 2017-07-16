function CoffeeMachine(rootEl, options) {
  this.rootEl = rootEl;
  this.options = Object.assign({}, CoffeeMachine.defaultButtons, options);
  this.capacity = 1000;
  this.power = 9500;
  this.waterAmount = 0;
  var progress = false;
  this.btnStart = rootEl.querySelector(this.options.btnStart);
  this.btnStop = rootEl.querySelector(this.options.btnStop);
  this.timeField = rootEl.querySelector(this.options.timeField);
  this.btnStart.addEventListener("click", this.run.bind(this));
  this.btnStop.addEventListener("click", this.stop.bind(this));
  var timer;
}


CoffeeMachine.prototype.run = function() {
  if(this.waterAmount > 0 && this.waterAmount <= this.capacity){
      progress = true;
      console.log(this);
      countDown.call(this, getBoilTime.call(this));
    }
  };


var countDown = function(sec){
    if (sec < 0){
    clearTimeout(timer);
    onReady.call(this);
  } else{
  console.log(this);
   console.log(sec);
  this.timeField.innerHTML = "Coffee will be ready in " + sec + " sec";
  sec --;
  var timer = setTimeout(countDown.bind(this, sec), 1000);
  }
};

CoffeeMachine.prototype.stop = function(){
    clearTimeout(this.timer); //1 clear  timer
    this.timeField.innerHTML = "Preparation stopped";
    progress = false;
  };

  CoffeeMachine.prototype.isRunning = function(){
    if(progress == false){
      console.log("Machine is in sleep mode");
    }else{
      console.log("Machine is running");
    }
  }

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
    return ((this.waterAmount * WATER_HEAT_CAPACITY * 80 / this.power)/1000).toFixed();
  };
  function onReady() {
    this.timeField.innerHTML = "Coffee is ready!"; //executed in x getBoilTime() minutes, not instanlty, as we use .bind
    progress = false;
  };
  

CoffeeMachine.defaultButtons = {
  btnStart: ".btn-start",
  btnStop: ".btn-stop",
  timeField: ".timeField"
}

var first_coffeeMachine = document.getElementById("coffeemachine_1");
var myCoffee = new CoffeeMachine(first_coffeeMachine, {});
myCoffee.setWaterAmount(140);

