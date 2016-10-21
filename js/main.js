$(function () {
  var cores = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];
  var minSpeed = .02;
  var maxSpeed = .09;
  var varSpeed = .01;
  var counter = 0;
  var counter2 = 2;

  function startBounce(element) {
    var container = element.parent();
    var width = container.innerWidth() - element.outerWidth();
    var height = container.innerHeight() - element.outerHeight();
    var vertSpeed = ((Math.random() * (maxSpeed - minSpeed)) + minSpeed);
    var horzSpeed = ((Math.random() * (maxSpeed - minSpeed)) + minSpeed);
    bounce(element, vertSpeed, height, 'top');
    bounce(element, horzSpeed, width, 'left');
  }

  function bounce(element, speed, max, dir) {
    speed += ((Math.random() * varSpeed) - (varSpeed / 2));
    speed = speed < minSpeed ? minSpeed : (speed > maxSpeed ? maxSpeed : speed)
    var time = max / speed;
    var position = element.position();
    if (position[dir] < 10) {
      target = max;
    }
    else {
      target = 0;
    }
    var style = {
      queue: false
    };
    style[dir] = target;
    element.animate(style, {
      duration: time
      , queue: false
      , easing: "linear"
      , complete: function () {
        counter2 = counter2 + 1;
        if (counter2 <= 50000) bounce(element, time, max, dir);
      }
    });
  }

  function criarBolinha() {
    counter = counter + 1;
    var left = ($("body").innerWidth() * Math.random()) - 50;
    var top = ($("body").innerHeight() * Math.random()) - 50;
    var body = $("body");
    var ball = document.createElement("span");
    ball.style.backgroundColor = cores[(Math.random() * cores.length) | 0];
    ball.className = "circle animated fadeIn";
    ball.style.left = left;
    ball.style.top = top;
    body.append(ball);
    startBounce($(ball));
    if (counter <= 10) {
      setTimeout(function () {
        criarBolinha();
      }, 20);
    }
  }
  criarBolinha();
});