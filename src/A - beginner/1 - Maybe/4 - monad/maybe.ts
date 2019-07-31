import { fmap, Maybe, nothing } from '../1 - functor/maybe';
import { of } from '../2 - applicative/maybe';

export { Maybe, just, nothing } from '../1 - functor/maybe';

export const flatten = <A>(_mma: Maybe<Maybe<A>>): Maybe<A> => {
  if (_mma.tag === 'Nothing') {
    return nothing;
  }

  return _mma.value;
};

export const chain = <A, B>(_f: (a: A) => Maybe<B>) => (_ma: Maybe<A>): Maybe<B> => {
  if (_ma.tag === 'Nothing') {
    return nothing;
  }

  return _f(_ma.value);
};

// Monad instance for Maybe container:
export const maybe = {
  fmap,
  of,
  chain,
  flatten,
};
