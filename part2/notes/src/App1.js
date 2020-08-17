import React from "react";
function App() {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: ""
  })

  function handleChange(evt) {
    const value = evt.target.value;
    console.log('evt.target.name',evt.target.name)
  setState({
    ...state,
    [evt.target.name]: value
  });
  }


  return (
    <form>
      <label>
        First name
        <input
          type="text"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
        {state.firstName}
      </label>
      <br />
      <label>
        Last name
        <input
          type="text"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
        {state.lastName}
      </label>
    </form>
  );
}

export default App