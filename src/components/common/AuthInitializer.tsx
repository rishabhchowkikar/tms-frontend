'use client'
import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { checkAuth } from '@/store/authSlice'



const AuthInitializer = ({children}: {children: React.ReactNode}) => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=> {
        dispatch(checkAuth());
    }, [dispatch])
  return (
    <div>{children}</div>
  )
}

export default AuthInitializer