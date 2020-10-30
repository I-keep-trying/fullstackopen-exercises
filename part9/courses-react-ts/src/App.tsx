import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

import './App.css';

const App: React.FC = () => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const courseName = 'Half Stack application development';

  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];

/*   courseParts.forEach(part => {
      switch(part.name) {
        case "Fundamentals":
          break;
          case "Using props to pass data":
            break;
            case "Deeper type usage":
              break;
              default:
          break;
      }
  }) */

    return (
      <div>
        <Header courseName={courseName} />
        <Content courseParts={courseParts.forEach(part => {
      switch(part.name) {
        case "Fundamentals":
          break;
          case "Using props to pass data":
            break;
            case "Deeper type usage":
              break;
              default:
                return assertNever(part);
          break;
      }
  })} />
        <Total courseParts={courseParts.forEach(part => {
      switch(part.name) {
        case "Fundamentals":
          break;
          case "Using props to pass data":
            break;
            case "Deeper type usage":
              break;
              default:
                return assertNever(part);
          break;
      }
  })} />
      </div>
   
  );
}

export default App;
