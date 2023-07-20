import React from 'react'
import axios from 'axios'
import {useState} from 'react'

export interface PropsAddPost {
  func: ()=> void ;
}

function AddPost({func} : PropsAddPost) {
  const [body, setBody] = useState<string>("")
  const [title, settitle] = useState<string>("")
  const submitHandler = (e: React.SyntheticEvent) =>{
    e.preventDefault();
    console.log("submited");
    if(body !== "" && title !== ""){
      axios.post("https://blog-express-api-z4h9.onrender.com/api/blogs",{
      body:body,
      title : title,
      author: "Bate Thar"
    },{
      headers: {
        accept: "application/json"
      }
    }).then((res)=>{
      console.log(res);
      if(res.status === 200){
        setBody("");
        settitle('');
        func()
      }
    }).catch((err)=> {
      console.log(err);
    })
    }else{
      alert("please fill all data")
    }
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='Title' value={title} onChange={(e: React.FormEvent<HTMLInputElement>)=> settitle(e.currentTarget.value)} />
        <input type="text" placeholder='Body' value={body} onChange={(e:React.FormEvent<HTMLInputElement>)=> setBody(e.currentTarget.value) } />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddPost