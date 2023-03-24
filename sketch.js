const player_width = 8;
const player_height = 110;
const player1_x = 10;
const player2_x = 790;
var player1_y = 300; 
var player2_y = 300;
var player_speed = 10;
var score1 = 0;
var score2 = 0;
const radius = 10;
var ball_x = 400;
var ball_y = 300;
var ball_speed_x = 0;
var ball_speed_y = 0;
var ball_accel_x = 0.5;
var start = 0; 
var win1 = 0;
var win2 = 0;

function draw_players(){
  // first player
  rectMode(CENTER);
  fill(255);
  rect(player1_x, player1_y, player_width, player_height);
  // second player
  rectMode(CENTER);
  fill(255);
  rect(player2_x, player2_y, player_width, player_height);
}

function move_players(){
  // first player
  if (keyIsDown(87)){ //w
    if (player1_y > 0 + player_height / 2){ // don't leave the screen
      player1_y -= player_speed;
    }
  }
  if (keyIsDown(83)){ //s
    if (player1_y < height - player_height / 2){ // don't leave the screen
      player1_y += player_speed;
    }
  }
  // second player
  if (keyIsDown(UP_ARROW)){
    if (player2_y > 0 + player_height / 2){ // don't leave the screen
      player2_y -= player_speed;
    }
  }
  if (keyIsDown(DOWN_ARROW)){
    if (player2_y < height - player_height / 2){ // don't leave the screen
      player2_y += player_speed;
    }
  }
}

function keyPressed() {
  if (start == 0 && keyCode == ENTER){
    start = 1;
  }
}

function start_ball() {
  if (start == 1){
    let sign1 = random([-1, 1]);
    let sign2 = random([-1, 1]);
    ball_speed_x = sign1 * random(3, 5);
    ball_speed_y = sign2 * random(3, 5);
    start = 2;
  }
}

function bounce_left(){
  let down = player1_y - player_height / 2;
  let top = player1_y + player_height / 2;
  if (ball_x - radius < player1_x + player_width / 2 && ball_y - radius > down && ball_y + radius < top){
    ball_speed_x = -ball_speed_x;
    ball_speed_x += ball_accel_x;
  }
  if (ball_x - radius < player1_x + player_width / 2 && (ball_y - radius < down || ball_y + radius > top)){
    score1++;
    reset();
  }
}

function bounce_right() {
  let down = player2_y - player_height / 2;
  let top = player2_y + player_height / 2;
  if (ball_x + radius > player2_x - player_width / 2 && ball_y - radius > down && ball_y + radius < top){
    ball_speed_x = -ball_speed_x; 
    ball_speed_x -= ball_accel_x;
  }
  if (ball_x + radius > player2_x - player_width / 2 && (ball_y - radius < down || ball_y + radius > top)){
    score2++;
    reset();
  }
}

function move_ball() {
  start_ball();
  bounce_left(); // horizontal bounce
  bounce_right(); // horizontal bounce
  if (ball_y - radius < 0 || ball_y + radius > height){
    ball_speed_y = -ball_speed_y; // vertical bounce
  }
  ball_x += ball_speed_x; 
  ball_y += ball_speed_y;
}

function reset() {
  ball_x = 400;
  ball_y = 300;

  let sign1 = random([-1, 1]);
  let sign2 = random([-1, 1]);
  ball_speed_x = sign1 * random(3, 5);
  ball_speed_y = sign2 * random(3, 5);

  start = 2;
  if (score1 == 3 || score2 == 3){
    start = 3;
  }
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  if (start < 3){
    if (start == 0){ 
      textSize(55);
      text("WELCOME TO PONG!", 110, 70);
      
      textSize(30);
      text("PRESS 'ENTER' TO START.", 195, 120);
    }
    if (start == 2){ 
      move_players();
      textSize(55);
      text(score1, 20, 60);
      text(score2, 750, 60);
    }
    move_ball();
    draw_players();
    ellipse(ball_x, ball_y, 2 * radius); // draw ball
  }
  else{
    let winner = "";
    if (score1 > score2)
      winner = "Player1";
    else
      winner = "Player2";

    fill(255);
    textSize(50);
    text("Player1: " + score1 + " points", 50, 180);
    fill(255);
    textSize(50);
    text("Player2: " + score2 + " points", 50, 240);

    fill(255);
    textSize(50);
    text(winner + " wins!", 220, 350);

    fill(255);
    textSize(40);
    text("Ctrl + R to restart.",  220, 500);
  }
}