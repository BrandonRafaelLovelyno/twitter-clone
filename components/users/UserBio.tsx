"use client"

import React from 'react'
import {AiOutlineCalendar} from 'react-icons/ai'
import Button from '../Button';
import useCurrent from '@/hooks/useCurrent';
import UserDocument from '@/libs/UserDocument';
import {format} from 'date-fns'
import useEditModal from '@/hooks/useEditModal';

interface UserBioProps{
    user:UserDocument
}

const UserBio:React.FC<UserBioProps> = ({user}) => {
    const {data}=useCurrent()
    const useEdit=useEditModal()
    const toggleFollow=()=>{}
    const toggleEdit=()=>{
      useEdit.onOpen()
    }
    const isCurrentUser=data?.data.id===user.id
    const createdAt=format(new Date(user.createdAt),'MMMM yyyy')
  return (
    <div className='flex flex-col'>
      <div className='flex justify-end p-2'>
        {
          isCurrentUser?<Button label='Edit' onClick={toggleEdit} secondary className='px-8 py-2'/>:<Button label='Follow' onClick={toggleFollow} className='px-5 py-2'/>
        }
      </div>
      <div className='mt-1 px-10'>
        <p className='text-2xl font-bold text-white'>{user.name}</p>
        <p className='text-xl text-neutral-500 font-bold'>{'@'+user.username}</p>
        <div className='mt-3 flex flex-row text-neutral-500 items-center gap-x-3'>
          <AiOutlineCalendar size={15}/>
          <p>{createdAt}</p>
        </div>
        <div className='my-5'>
          {
            user.bio?(<p className='text-white text-md'>{user.bio}</p>):(<p className='text-neutral-500 text-md'>This user has no bio</p>)
          }
        </div>
        <div className='flex flex-row gap-x-3 mt-5'>
          <div className='flex flex-row gap-x-2'>
            {user.followingIDs.length}
            <p className='text-neutral-500'>Following</p>
          </div>
          <div className='flex flex-row gap-x-2'>
            {user.followersIDs.length}
            <p className='text-neutral-500'>Followers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBio
