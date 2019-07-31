// Maybe container:
type Nothing = Readonly<{ tag: 'Nothing' }>;
type Just<A> = Readonly<{ tag: 'Just'; value: A }>;
export type Maybe<A> = Nothing | Just<A>;
export const nothing: Maybe<never> = { tag: 'Nothing' };
export const just = <A>(value: A): Maybe<A> => ({ tag: 'Just', value });

// Functorial `map` function (fmap):
export const fmap = <A, B>(_f: (a: A) => B) => (_ma: Maybe<A>): Maybe<B> => {
  if (_ma.tag === 'Nothing') {
    return nothing;
  }

  return just(_f(_ma.value));
};

// Functor instance for Maybe container:
export const maybe = {
  map: fmap,
};
