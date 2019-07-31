import { fmap, Maybe, nothing } from '../1 - functor/maybe';
import { ap } from '../2 - applicative/maybe';

export { Maybe, just, nothing } from '../1 - functor/maybe';

export const zero = <A>(): Maybe<A> => nothing;

export const alt = <A>(_ma: Maybe<A>) => (_elseA: Maybe<A>): Maybe<A> => {
  if (_ma.tag === 'Nothing') {
    return _elseA;
  }

  return _ma;
};

// Alternative instance for Maybe:
export const maybe = {
  zero,
  alt,

  // Applicative & functor:
  ap,
  fmap,
};
