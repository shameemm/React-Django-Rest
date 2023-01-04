import React,{useContext, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EditContext } from '../../Context/EditContext';

function EditUser() {
    const {editData} = useContext(EditContext)
  const navigate=useNavigate()
  const [data, setData] = useState({
    name: "",
    email:"",
    phone:"",
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

  const onUpdate = (e)=>{
    e.preventDefault()

     const name= e.target.name.value
     const email= e.target.email.value
     const phone= e.target.phone.value
     const image = data.image
     axios.put(`http://localhost:8000/api/user/${editData.id}/`,{name,email,phone,image},{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
     })
     .then((response)=>{
        console.log(response.data);
        if(response.status ===200){
            alert("Update Successfully")
            navigate('/admin-home')
        }
     })

  }


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
          <h3>Edit User</h3>
            <form onSubmit={onUpdate}>
              <input type="text" name="name"  onChange={(e) => {
                    let newData = { ...editData };
                    newData[e.target.name] = e.target.value;
                    setData(newData);
              }}
                        maxLength={80} placeholder={ editData.name} />
              <input type="text" name="email" value={editData.email} onChange={(e) => {
                    let newData = { ...editData };
                    newData[e.target.email] = e.target.value;
                    setData(newData);
              }}
                        maxLength={80} placeholder={editData.email} />
              <input type="text" name="phone" value={editData.phone} onChange={(e) => {
                    let newData = { ...editData };
                    newData[e.target.phone] = e.target.value;
                    setData(newData);}} 
                        maxLength={80} placeholder="Enter Phone" />
            
            <br/>
            {/* <input type="file" 
            name="image_url"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => {handleImageChange(e)}}/><br/>
            {data.image?<img alt="" width="200px" height="200px" src={data.image ? URL.createObjectURL(data.image) : ""}></img>:<br></br>} */}
            <br/>
            <button type="submit"  >Submit</button>
            </form>
        </div>
    </div>
  )
}

export default EditUser