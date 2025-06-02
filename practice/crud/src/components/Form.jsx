import React, { useState,useEffect } from 'react'
import { postData, updateData } from "../api/PostAPI";

function Form({data,setData,updateDataApi,setUpdateDataApi}) {
const [addData,setAddData]=useState({
    title:"",
    body:""
})

const handleInputChange=(e)=>{
  const name=  e.target.name;
  const value=e.target.value
  setAddData((prev)=>({...prev,[name]:value}))
   
}

//addPostdata
async function addPostData() {
    const res=await postData(addData)
    console.log(res);
    
    if (res.status===201){
        setData([...data,res.data]);
        setAddData({ title: "", body: "" });
    }
    
}

//updatePostData
async function updatePostData() {
    const res=await updateData(updateDataApi.id,addData)
    console.log(res);
    
    if (res.status===200)
        {
            setData((prev)=>prev.map((curElem)=>(curElem.id===res.data.id? res.data:curElem)))
            setAddData({ title: "", body: "" });
            setUpdateDataApi({});
        }
   
}



function handleSubmit(e) {
    e.preventDefault();
      /// action dekho k form ki jo value ha wo kia ha
  const action=e.nativeEvent.submitter.value
  if(action==="Add")
    addPostData();
else if( action==="Edit")
    updatePostData();
   

}
  //get updated data in form

  useEffect(() => {
    if (updateDataApi && Object.keys(updateDataApi).length !== 0) {
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
    }
  }, [updateDataApi]);
  
  //updateDataApi is t o hold data of podt u clicked
  //jb ap edit pe click kro wo empty ni rhega us pe curElem a chuka huga
  //**ager empty ha iska mtlb edit pr click ni hua */

  //*********check empty */

  const isEmpty=Object.keys(updateDataApi).length===0



    return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title"></label>
            <input
              type="text"
              autoComplete="off"
              id="title"
              name="title"
              placeholder="Add Title"
              value={addData.title}
              onChange={handleInputChange}
            />
          </div>
    
          <div>
            <label htmlFor="body"></label>
            <input
              type="text"
              autoComplete="off"
              placeholder="Add Post"
              id="body"
              name="body"
              value={addData.body}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" value={isEmpty ? "Add": "Edit"} >
            {isEmpty ? "Add": "Edit"}
          </button>
        </form>
      );
}

export default Form
