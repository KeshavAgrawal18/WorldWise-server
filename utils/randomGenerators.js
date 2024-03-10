export function randomNumGenerator(number) {
  let id = 0;
  for (let i = 0; i < number; i++) {
    id += 10 ** i * Math.ceil(Math.random() * 9);
  }
  return id;
}

export function randomStringGenerator(number) {
  let id = "";
  let string = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < number; i++) {
    id += string[Math.ceil(Math.random() * 36)];
  }
  return id;
}
