/* tslint:disable:no-console */

import rx = require('rxjs');

describe('rxjs', () => {
  it('fist example', done => {
    const o1 = rx.Observable.of('1', '2', '3').delay(500);
    const o2 = rx.Observable
      .create((observer: rx.Subscriber<string>) => {
        observer.next('a');
        observer.complete();
        return 'a';
      })
      .do(() => console.log('side effect, should only be called once'))
      .delay(300)
      .publishReplay(1)
      .refCount()
      .repeat();

    const o3 = o1.zip(o2, (a, b) => a + b);
    o3.subscribe(console.log, console.log, () => {
      console.log('all done');
      done();
    });
  });
});
