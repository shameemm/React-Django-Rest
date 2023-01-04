import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate=useNavigate()
  const [data, setData] = useState({
    name: "",
    username: "",
    password:"",
    image: "",
  });
  const [errors, setErrors] = useState({
      name: "",
      email:"",
      phone:"",
      username: "",
      password:"",
      image: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    let newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
  }; 


  const handleImageChange = (e) => {
      let newData = { ...data };
      newData["image"] = e.target.files[0];
      setData(newData);
  };

  const doSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios.post('http://localhost:8000/api/user/', data,{
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  }).then((response)=>{
    console.log(response);
    if(response.status===201){
      navigate('/login')
    }
  })
  .catch((error) => {
      console.log(error);
      alert(error.response.data.message);
    })
  }


  return (
    <div>
        <div className='card'>
          <h3>Register</h3>
            <form>
              <input type="text" name="name" value={data.name} onChange={(e) => {
                            handleChange(e);
                        }}
                        maxLength={80} placeholder="Enter name" />
              <input type="text" name="email" value={data.email} onChange={(e) => {
                            handleChange(e);
                        }}
                        maxLength={80} placeholder="Enter Email" />
              <input type="text" name="phone" value={data.phone} onChange={(e) => {
                            handleChange(e);
                        }}
                        maxLength={80} placeholder="Enter Phone" />
            <input type="text" name="username" value={data.username} 
            onChange={(e) => {
              handleChange(e);
          }}
          maxLength={80} placeholder="Enter Username" />
            <br/>
            <input type="password" name="password" 
            onChange={(e) => {
              handleChange(e);
          }}
          maxLength={80} placeholder="Enter Password" />
            <br/>
            <input type="file" 
            name="image_url"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => {handleImageChange(e)}}/><br/>
            {data.image?<img alt="" width="200px" height="200px" src={data.image ? URL.createObjectURL(data.image) : ''}></img>:<br></br>}
            <br/>
            <button type="button"  onClick={(e) => doSubmit(e)}>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Register