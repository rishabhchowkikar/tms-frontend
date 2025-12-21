"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from "@/store/store"

const page = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    return (
        <div>
            <h1>Welcome to HR Dashboard</h1>
            <p>
                {user?.adminname}
            </p>
        </div>
    )
}

export default page