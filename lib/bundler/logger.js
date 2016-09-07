module.exports = class Logger {
  constructor() {
  }

  // TODO: create @logging decorator!
  log(...msgs) {
    console.error(...msgs);
  }

  error(...msgs) {
    console.error(...msgs);
  }    
}