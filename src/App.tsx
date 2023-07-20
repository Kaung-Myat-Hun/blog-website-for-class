import {useState, useEffect} from 'react'
import './App.css'
import axios from 'axios'
import AddPost from './AddPost'

export interface typeData  {
  _id : string;
  body: string;
  title : string;
  author : string;
  data: object;
}

function App() {
  const [data1, setData1] = useState<typeData[]>([])
  const getDataApi = () =>{
  //   axios.get("https://blog-express-api-z4h9.onrender.com/api/blogs", {
  //     headers: {
  //       accept: "application/json",
  //     }
  //   }).then((res)=>{
  //     console.log(res.data);
  //     const newData: typeData[] = res.data.data as typeData[];
  //     setData1(newData)
  // }).catch((err)=>{
  //   console.log(err);
  // })
  fetch("https://blog-express-api-z4h9.onrender.com/api/blogs",{
    method: "GET",
    headers: {
      accept: "application/json"
    }
  }).then((res)=> res.json()).then((data)=> {
    console.log(data, "fetchData");
    const resData  = data as typeData;
    const finalData = resData.data as typeData[]
    setData1(finalData)
  }).catch((err)=> console.log(err))
  }

  useEffect(()=>{
      getDataApi();
  },[])
  // console.log(data1, "this is blog data");

  const deletePost = (id: string) => {
    axios.delete(`https://blog-express-api-z4h9.onrender.com/api/blogs/${id}`, {
      headers: {
        accept: "application/json"
      }
    }).then((res)=>{
      console.log(res);
      if(res.status ===200){
        getDataApi();
      }
    }).catch((err)=>console.log(err))
  }

  return (
    <>
      {data1.length > 0 ? (<>
        {data1.map((item, index)=>(
          <div key={index}>
            <h3>{item?.title}</h3>
            <p>{item?.body}</p>
            <small>{item.author}</small> <br />
            <button onClick={() => deletePost(item._id)}>Delete</button>
          </div>
        ))}
      </>) : (<><h1>There is no blogs</h1></>)}
      <AddPost func={getDataApi}></AddPost>
    </>
  )
}

export default App;
