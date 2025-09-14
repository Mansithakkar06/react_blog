import React, { useState,useEffect } from 'react'
import service from '../appwrite/conf'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from '../components'

function EditPost() {
    const [post,setPost]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()

    useEffect(() => {
        if(slug){
            service.getPost(slug).then((post)=>{
                setPost(post)
            })
        }
        else{
            navigate("/")
        }
    }, [slug,navigate]);
  return post?(
    <div className='py-8'>
        <Container>
            <PostForm post={[post]}/>
        </Container>
    </div>
  ):null
}

export default EditPost
