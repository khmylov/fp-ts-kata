import { just, Maybe, nothing } from '../1 - functor/maybe';
export { Maybe, just, nothing } from '../1 - functor/maybe';

export const of = <A>(_a: A): Maybe<A> => just(_a);

export const ap = <A, B>(_fab: Maybe<(a: A) => B>) => (_ma: Maybe<A>): Maybe<B> => {
  if (_ma.tag === 'Nothing' || _fab.tag === 'Nothing') {
    return nothing;
  }

  return just(_fab.value(_ma.value));
};

export const maybe = {
  of,
  ap,
};
