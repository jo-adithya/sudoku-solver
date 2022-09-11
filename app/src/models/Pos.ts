export class Pos {
  i: number;
  j: number;

  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
  }
}

Pos.prototype.valueOf = function() {
  return this.i * 9 + this.j;
}