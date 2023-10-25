import fetcher from '@/libs/fetcher'
import { UserApiResponse } from '@/libs/userApiResponse'
import useSWR from 'swr'

const useCurrent=()=>{
    const {data,isLoading,error,mutate}=useSWR<UserApiResponse>('/api/current',fetcher,{
        revalidateOnFocus:true,
    })
    return {data,isLoading,error,mutate}
}

export default useCurrent