import React from 'react';

const appStyle = {
    display: 'flex',
    fontSize: '5rem'
};

const formStyle = {
    margin: 'auto',
    padding: '2rem',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '35rem',
    display: 'block'
};

const labelStyle = {
    margin: '3rem 0rem',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '2rem'
};

const inputStyle = {
    margin: '0.5rem 0rem 3rem 0rem',
    padding: '5px', 
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%',
    fontSize: '2rem'
};


const Field = React.forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label style={labelStyle} >{label}</label>
        <input ref={ref} type={type} style={inputStyle} />
      </div>
    );
});

const Form = (props) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        props.onSubmit(data);
    };

    const error = props.errorText.errorMessage;

    return (
      <form style={formStyle} onSubmit={handleSubmit} >
        <Field ref={usernameRef} label="Username:" type="text" />
        <Field ref={passwordRef} label="Password:" type="password" />
        <p>{error}</p>
        <div>
          <button className="submitBtn" type="submit">{props.buttonText}</button>
        </div>
      </form>
    );
};

export default Form