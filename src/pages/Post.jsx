import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/conf';
import { Button, Container } from '../components/index';
import parse from 'html-react-parser'

function Post() {
    const [post,setPost]=useState(null);
    const navigate=useNavigate()
    const userData=useSelector(state=>state.auth.userData)
    const {slug} =useParams()
    const isAuthor=post && userData ? userData.$id===post.userId : false;

    useEffect(() => {
        if(slug)
        {
            service.getPost(slug).then((post)=>{
                if(post)
                {
                    setPost(post)
                }
                else{
                    navigate('/')
                }
            })
        }
        else{
            navigate("/")
        }
    }, [slug,navigate]);

    const deletePost=async ()=>{
        try {
            if(post.featuredImage)
            {
                await service.deleteFile(post.featuredImage)
            }
            const dltpost=service.deletePost(post.$id)
            if(dltpost)
            {
                navigate("/")
            }
        } catch (error) {
            console.log("delete post error::".error)
        }
    }
  return post ? (
    <div className='py-8'>
        <Container>
            <div className='w-full justify-center flex mb-4 relative border rounded-xl p-2'>
                <img src={service.previewFile(post.featuredImage)} alt={post.title} className='rounded-xl' />

                {isAuthor && (
                    <div className='absolute right-6 top-6'>
                        <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor='bg-green-500' className='mr-3'>
                        Edit
                        </Button>
                        </Link>
                        <Button className='bg-red-600' onClick={deletePost} >Delete</Button>
                    </div>
                )}
            </div>
            <div className='w-full mb-6'>
                <h1 className='text-2xl font-bold'>{post.title}</h1>
            </div>
            <div className='browser-css'>
                {parse(post.description)}
            </div>
        </Container>
    </div>
  ): null
}

export default Post
