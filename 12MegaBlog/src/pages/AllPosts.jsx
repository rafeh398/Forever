import React, { useEffect, useState } from 'react'
import  {service}  from "../appwrite/config"
import {Container, PostCard} from "../components/index"

function AllPosts() {
const [posts,setposts]=useState([]

)
useEffect(()=>{
    service.getPosts().then((posts)=>{
        if (posts){
            setposts(posts.documents)
        }
    }
      
    )
},[])

  return (
    <div className="w-full py-8">
      <div className="flex flex-wrap">
    {posts.map((post)=>(
        <div key={post.$id} className="p-2 w-1/4">
            <PostCard  {...post}/>

        </div>
    ))}
      </div>
    </div>
  )
}

export default AllPosts
