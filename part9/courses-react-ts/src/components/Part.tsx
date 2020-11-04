import React from 'react';
import { CoursePart } from '../types';

interface Part {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<Part> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          Part Name: {part.name}
          <br></br>
          Number of Part Exercises: {part.exerciseCount}
          <br></br>
          Description: {part.description}
          <br></br>
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          Part Name: {part.name}
          <br></br>
          Number of Part Exercises: {part.exerciseCount}
          <br></br>
          Group Project Count: {part.groupProjectCount}
          <br></br>
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          Part Name: {part.name}
          <br></br>
          Number of Part Exercises: {part.exerciseCount}
          <br></br>
          Description: {part.description}
          <br></br>
          Link: {part.exerciseSubmissionLink}
          <br></br>
        </div>
      );
    case 'Fundamentals, Advanced':
      return (
        <div>
          Part Name: {part.name}
          <br></br>
          Number of Part Exercises: {part.exerciseCount}
          <br></br>
          Description: {part.description}
          <br></br>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
