import React from 'react';
import { CoursePart } from '../types';

interface Total {
  total: CoursePart[];
}

const Total: React.FC<Total> = ({total}) => {
  return (
    <p>
      Total Exercises:
      {total.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
