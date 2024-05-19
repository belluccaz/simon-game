// Define as cores dos botões
var buttonColours = ["red", "blue", "green", "yellow"];

// Padrão do jogo e padrão do usuário
var gamePattern = [];
var userClickedPattern = [];

// Variáveis de controle para o estado do jogo
var started = false;
var level = 0;

// Função para iniciar o jogo
function startGame() {
  if (!started) {
    // Atualiza o título do nível quando o jogo começa
    $("#level-title").text("Level " + level);
    // Gera a próxima sequência
    nextSequence();
    // Altera o estado do jogo para iniciado
    started = true;
  }
}

// Detecta quando uma tecla é pressionada para iniciar o jogo
$(document).keydown(function () {
  startGame();
});

// Detecta toques na tela para iniciar o jogo (para dispositivos móveis)
$(document).on("touchstart", function () {
  startGame();
});

// Detecta cliques nos botões
$(".btn").click(function () {
  // Obtém a cor do botão clicado
  var userChosenColour = $(this).attr("id");
  // Adiciona a cor clicada ao padrão do usuário
  userClickedPattern.push(userChosenColour);

  // Reproduz o som correspondente à cor clicada
  playSound(userChosenColour);
  // Anima o clique do botão
  animatePress(userChosenColour);

  // Verifica a resposta do usuário
  checkAnswer(userClickedPattern.length - 1);
});

// Função para verificar a resposta do usuário
function checkAnswer(currentLevel) {
  // Verifica se a cor clicada pelo usuário corresponde ao padrão do jogo
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Verifica se o usuário completou a sequência
    if (userClickedPattern.length === gamePattern.length) {
      // Chama a próxima sequência após 1 segundo
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Reproduz o som de erro
    playSound("wrong");
    // Adiciona a classe de game over ao body
    $("body").addClass("game-over");
    // Atualiza o título para informar o game over
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Remove a classe de game over após 200ms
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Reinicia o jogo
    startOver();
  }
}

// Função para gerar a próxima sequência
function nextSequence() {
  // Reseta o padrão do usuário
  userClickedPattern = [];
  // Aumenta o nível
  level++;
  // Atualiza o título do nível
  $("#level-title").text("Level " + level);
  // Gera um número aleatório entre 0 e 3
  var randomNumber = Math.floor(Math.random() * 4);
  // Seleciona uma cor aleatória a partir do número gerado
  var randomChosenColour = buttonColours[randomNumber];
  // Adiciona a cor ao padrão do jogo
  gamePattern.push(randomChosenColour);

  // Reproduz a sequência do jogo
  playSequence();
}

// Função para reproduzir a sequência do jogo
function playSequence() {
  let i = 0;
  // Intervalo entre cada cor da sequência
  const interval = setInterval(function () {
    // Anima o botão e reproduz o som correspondente
    $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
    i++;
    // Quando a sequência estiver completa, limpa o intervalo
    if (i >= gamePattern.length) {
      clearInterval(interval);
    }
  }, 600); // Intervalo de 600ms entre as cores
}

// Função para animar o clique do botão
function animatePress(currentColor) {
  // Adiciona a classe de pressionado ao botão
  $("#" + currentColor).addClass("pressed");
  // Remove a classe de pressionado após 100ms
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Função para reproduzir o som do botão
function playSound(name) {
  // Cria um novo objeto de áudio e o reproduz
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Função para reiniciar o jogo
function startOver() {
  // Reseta o nível
  level = 0;
  // Reseta o padrão do jogo
  gamePattern = [];
  // Altera o estado do jogo para não iniciado
  started = false;
}
