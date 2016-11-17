//NOTE: ANIMAÇÕES
new WOW().init();
//NOTE: CONTADOR PARA MCP
$("#contadorMCP")
  .countdown("2017/01/01", function (event) {
    $(this).text(
      event.strftime('%D Dias %H:%M:%S')
    );
  });

//NOTE: ANIMACÃO BACKGROUND 
(function () {
  //Constantes
  var canvas;
  var ctx;
  var dx = 1;
  var dy = 1;
  //Variaveis
  var WIDTH = 500;
  var HEIGHT = 150;
  var cores = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];
  var balls = new Array();
  var quantidadeBolinhas = 10;
  var tamanhoMinimo = 3;
  var tamanhoMaximo = 6;
  var velocidade = 50;

  function tamanhoAleatorioBolinha() {
    return Math.floor(Math.random() * (tamanhoMaximo - tamanhoMinimo + 1)) + tamanhoMinimo;
  }

  function posicaoInicialAleatoriaX() {
    return Math.floor(Math.random() * (WIDTH - 0 + 1));
  }

  function posicaoInicialAleatoriaY() {
    return Math.floor(Math.random() * (HEIGHT - 0 + 1));
  }

  function calculaRota(posicaoX, posicaoY, controleX, controleY) {
    var restaX = (WIDTH - 10) - posicaoX;
    var restaY = (HEIGHT - 10) - posicaoY;

    if (restaX > 0 && controleX)
      controleX = true;
    else
      controleX = false;

    if (controleX)
      posicaoX += dx;
    else {
      posicaoX -= dx;
      if (posicaoX == 0)
        controleX = true;
    }

    if (restaY > 0 && controleY)
      controleY = true;
    else
      controleY = false;

    if (controleY)
      posicaoY += dy;
    else {
      posicaoY -= dy;
      if (posicaoY == 0)
        controleY = true;
    }

    return {
      x: posicaoX,
      y: posicaoY,
      alternateX: controleX,
      alternateY: controleY
    }
  }

  function Desenhar() {

    for (var i = 0; i < quantidadeBolinhas; i++) {

      //Busca o elemento.
      var ball = balls.slice(i)[0];

      //Calcula a tracado.
      var rota = calculaRota(ball.x, ball.y, ball.alternateX, ball.alternateY);

      //Atualiza os valores do elemento.
      ball.x = rota.x;
      ball.y = rota.y;
      ball.alternateX = rota.alternateX;
      ball.alternateY = rota.alternateY;

      //Realiza o desenho.
      ctx.beginPath();
      ctx.fillStyle = ball.color;
      ctx.arc(rota.x, rota.y, ball.tamanho, 0, Math.PI * 2, true);
      ctx.fill();
    }
  }

  function LimparTela() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.rect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function criarBolinhas() {

    for (var i = 0; i < quantidadeBolinhas; i++) {
      var a = posicaoInicialAleatoriaX();
      var b = posicaoInicialAleatoriaY();
      var c = ((Math.floor(Math.random()) % 2) == 0);
      var d = cores[(Math.random() * cores.length) | 0];
      var e = tamanhoAleatorioBolinha();

      balls.push({
        x: a,
        y: b,
        alternateX: c,
        alternateY: c,
        color: d,
        tamanho: e
      });
    }
  }

  function Iniciar() {

    var body = document.getElementsByTagName("body")[0];
    WIDTH = body.clientWidth - 10;
    HEIGHT = body.clientHeight - 10;

    canvas = document.getElementById("canvas");
    canvas.width = body.clientWidth;
    canvas.height = body.clientHeight;
    ctx = canvas.getContext("2d");
    criarBolinhas();
    return setInterval(Atualizar, velocidade);
  }

  function Atualizar() {
    LimparTela();
    Desenhar();
  }

  Iniciar();

})();