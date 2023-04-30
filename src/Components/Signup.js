import React,{useState} from 'react'
import  {useHistory}  from 'react-router-use-history';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
  let history=useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password}=credentials;

    const response = await fetch('http://localhost:/api/auth/createuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      // Save the auth token and redirect
      localStorage.setItem("token",json.authToken);
      history.push("/");
      props.showAlert("Account Created Successfully","success");
  }
  else{
    props.showAlert("Invalid Details","danger");
  }
}
  const onChange=(e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
}
  return (
    <div className='mt-2'>
      <h2 className='my-3'>Create an account to use Notebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="my-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} required minLength={5} name="password"/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} required minLength={5} name="cpassword"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
