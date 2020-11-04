import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

interface ContentProps {
  parts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({parts}) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <div key={part.name}>
            <div>
              <Part part={part} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Content;
