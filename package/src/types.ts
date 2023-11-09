import React from 'react';

export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

// eslint-disable-next-line no-unused-vars
export type Setter<T> = React.Dispatch<React.SetStateAction<T>> | ((value: T) => void);

export enum NavigationAction {
  // eslint-disable-next-line no-unused-vars
  Previous = -1,

  // eslint-disable-next-line no-unused-vars
  Next = 1
}

export type DefinedRange = {
  startDate: Date;
  endDate: Date;
  label: string;
};

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift'
export type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> =
  Pick<TObj, Exclude<keyof TObj, ArrayLengthMutationKeys>>
  & {
    readonly length: L
    [I: number]: T
    [Symbol.iterator]: () => IterableIterator<T>
  }
