import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function GET(req:Request,{params}:{params:{postId:string}}){
    try{
        const posts=await prisma.post.findMany({
            where:{
                id:params.postId,
            },
            include:{
                comments:true,
                user:true,
            }
        })
    }catch(err){
        return NextResponse.json({data:{},success:false,message:(err as Error).message})
    }
}