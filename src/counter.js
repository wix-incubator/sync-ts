export default class Counter {
  _count = 1;

  increment(n = 1) {
    this._count += n;
  }
}
