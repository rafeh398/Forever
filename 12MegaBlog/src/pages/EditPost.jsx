import React,{useEffect,useState} from 'react'
import { Container,PostForm } from "../components/index"
import { useNavigate } from "react-router"
import { useParams } from "react-router"
import { service } from "../appwrite/config"


function EditPost() {

    const [post,setPost]=useState(null)
    const {slug}=useParams()
    const naviagte=useNavigate()

useEffect(()=>{
    if (slug){
        service.getPost(slug).then((post)=>{
            if (post){
                setPost(post)
            }
            else{
                naviagte("/")
            }
        })
    }
},[slug,naviagte])

return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
