import { Alt2 } from 'fp-ts/lib/Alt';
import { Applicative2 } from 'fp-ts/lib/Applicative';
import { Bifunctor2 } from 'fp-ts/lib/Bifunctor';
import { Functor2 } from 'fp-ts/lib/Functor';
import { Kind2 } from 'fp-ts/lib/HKT';
import { Monad2 } from 'fp-ts/lib/Monad';

// Result container:
type Failure<E> = Readonly<{ tag: 'Failure', error: E }>;
type Success<A> = Readonly<{ tag: 'Success'; value: A }>;
export type Result<E, A> = Failure<E> | Success<A>;
export const failure = <E, A>(error: E): Result<E, A> => ({ tag: 'Failure', error });
export const success = <E, A>(value: A): Result<E, A> => ({ tag: 'Success', value });

declare module 'fp-ts/lib/HKT' {
    interface URItoKind2<E, A> {
        Result: Result<E, A>;
    }
}

export const URI = 'Result';
export type URI = typeof URI;

export const result: Functor2<URI> & Applicative2<URI> & Alt2<URI> & Monad2<URI> & Bifunctor2<URI> = {
    URI,
    map: <E, A, B>(fa: Kind2<URI, E, A>, f: (a: A) => B): Kind2<URI, E, B> => {
        if (fa.tag === 'Failure') {
            return fa;
        }

        return success(f(fa.value));
    },
    of: <E, A>(a: A): Kind2<URI, E, A> => {
        return success(a);
    },
    ap: <E, A, B>(fab: Kind2<URI, E, (a: A) => B>, fa: Kind2<URI, E, A>): Kind2<URI, E, B> => {
        if (fab.tag === 'Failure') {
            return fab;
        }
        if (fa.tag === 'Failure') {
            return fa;
        }

        return success(fab.value(fa.value));
    },
    alt: <E, A>(fx: Kind2<URI, E, A>, fy: () => Kind2<URI, E, A>): Kind2<URI, E, A> => {
        if (fx.tag === 'Success') {
            return fx;
        }

        return fy();
    },
    chain: <E, A, B>(fa: Kind2<URI, E, A>, f: (a: A) => Kind2<URI, E, B>): Kind2<URI, E, B> => {
        if (fa.tag === 'Failure') {
            return fa;
        }

        return f(fa.value);
    },
    bimap: <E, A, G, B>(fea: Kind2<URI, E, A>, f: (e: E) => G, g: (a: A) => B): Kind2<URI, G, B> => {
        if (fea.tag === 'Success') {
            return success(g(fea.value));
        }

        return failure(f(fea.error));
    },
    mapLeft: <E, A, G>(fea: Kind2<URI, E, A>, f: (e: E) => G): Kind2<URI, G, A> => {
        if (fea.tag === 'Success') {
            return fea;
        }

        return failure(f(fea.error));
    },
};
