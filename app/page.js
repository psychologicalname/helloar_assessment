'use client'

import { useState } from 'react'

import OtpVerify from '@/components/OtpVerify'
import SignIn from '@/components/SignIn'
import Songs from '@/components/Songs';
import AddSong from '@/components/AddSong';

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [phone, setPhone] = useState();
  const [requestId, setRequestId] = useState('')
  const [message, setMessage] = useState('')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {isSignedIn && isSignedIn
        ?
        <OtpVerify requestId={requestId} phone={phone} />
        :
        <SignIn setRequestId={setRequestId} isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} phone={phone} setPhone={setPhone} />}
      <AddSong />
    </main>
  )
}
