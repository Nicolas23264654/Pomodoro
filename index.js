import express from 'express';
import chalk from 'chalk';
import figlet from 'figlet';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br.js';
dayjs.locale('pt-br');

import readline from 'readline';

const app = express();
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function showClock() {
  setInterval(() => {
    console.clear();
    console.log(chalk.cyan(" ⏰ RELÓGIO"));
    console.log(chalk.yellow(dayjs().format("dddd, DD/MM/YYYY")));
    console.log(chalk.green(dayjs().format("HH:mm:ss")));
  }, 1000);
}

function startPomodoro(workMin, breakMin) {
  let time = workMin * 60;
  let onBreak = false;

  const interval = setInterval(() => {
    console.clear();

    if (time === 0 && !onBreak) {
      onBreak = true;
      time = breakMin * 60;
      console.log(chalk.magenta(`✅ Foco finalizado! Pausa de ${breakMin} min iniciada.`));
    } else if (time === 0 && onBreak) {
      clearInterval(interval);
      console.log(chalk.green("🎅 Pomodoro concluído!"));
      return;
    }

    const label = onBreak ? chalk.blue("☕ PAUSA") : chalk.red("🍅 FOCO");
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    console.log(label);
    console.log(chalk.yellow(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`));
    time--;
  }, 1000);
}

console.log(chalk.green('Seja bem-vindo ao seu relógio digital!'));
console.log(chalk.white('\nEscolha uma opção:'));
console.log(chalk.white('1 - Relógio'));
console.log(chalk.white('2 - Pomodoro (25 min foco + 5 min pausa)'));
console.log(chalk.white('3 - Pomodoro (25 min foco + 15 min pausa)'));

rl.question(chalk.cyan('\nOpção: '), (answer) => {
  rl.close();
  if (answer === '1') {
    showClock();
  } else if (answer === '2') {
    startPomodoro(25, 5);
  } else if (answer === '3') {
    startPomodoro(25, 15);
  } else {
    console.log(chalk.red('Opção inválida!'));
  }
});