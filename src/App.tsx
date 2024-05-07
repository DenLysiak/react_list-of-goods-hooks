import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { List } from './components/listOfGoods';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  default = '',
  length = 'length',
  alphabetically = 'alphabetically',
  reverse = 'reverse',
}

function getPreparedGoods(
  goods: string[],
  sortField: string,
  reverseField: string,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.length:
          return good1.length - good2.length;

        case SortType.alphabetically:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return reverseField === SortType.reverse
    ? preparedGoods.reverse()
    : preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>('');
  const [sortFieldReverse, setSortFieldReverse] = useState<string>('');

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    sortFieldReverse,
  );

  const buttonReset = (
    <button
      type="button"
      className="button is-danger is-light"
      onClick={() => {
        setSortField('');
        setSortFieldReverse('');
      }}
    >
      Reset
    </button>
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
          onClick={() => {
            setSortField(SortType.alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => {
            setSortField(SortType.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': sortFieldReverse !== SortType.reverse,
          })}
          onClick={() => {
            if (sortFieldReverse === SortType.default) {
              setSortFieldReverse(SortType.reverse);
            } else {
              setSortFieldReverse(SortType.default);
            }
          }}
        >
          Reverse
        </button>

        {sortField === '' && sortFieldReverse === '' ? null : buttonReset}
      </div>

      <ul>
        <ul>
          <List goods={visibleGoods} />
        </ul>
      </ul>
    </div>
  );
};
