import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'
import { NextResponse } from 'next/server'

export async function POST(req:Request){
    try{
        const currentUser=await serverAuth()
        const {body}=await req.json()
        if(!body){
            throw new Error("Please fill all the fields")
        }
        const newPost=await prisma.post.create({
            data:{
                userId:currentUser.id,
                body,
            },
        })
        if(!newPost){
            throw new Error("Error on database uploading")
        }

        return NextResponse.json({
            data:newPost,
            success:true,
            message:''
        })
    }catch(err){
        return NextResponse.json({data:{},success:false,message:(err as Error).message})
    }
}

export async function GET(req:Request){
    try{
        const {searchParams}=new URL(req.url)
        const userId=searchParams.get('userId')

        if(userId && userId.length>0 ){
            const posts=await prisma.post.findMany({
                where:{
                    userId:userId
                },
                include:{
                    user:true,
                    comments:true,
                }
            })
            return NextResponse.json({
                data:posts,
                success:true,
                message:''
            })
        }else{
            const posts=await prisma.post.findMany({
                orderBy:{
                    createdAt:'desc'
                },
                include:{
                    user:true,
                    comments:true,
                }
            })
            return NextResponse.json({
                data:posts,
                success:true,
                message:''
            })
        }
        
    }catch(err){
        return NextResponse.json({data:{},success:false,message:(err as Error).message})
    }
}