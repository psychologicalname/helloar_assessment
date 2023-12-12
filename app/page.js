'use client'

import { useEffect, useState } from 'react'

import OtpVerify from '@/components/OtpVerify'
import SignIn from '@/components/SignIn'
import Songs from '@/components/Songs';
import AddSong from '@/components/AddSong';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [phone, setPhone] = useState();
  const [requestId, setRequestId] = useState('')

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
    setIsReady(true);
  }, [])

  return (isReady ? (
    user ? <Songs /> : <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {isSignedIn && isSignedIn
        ?
        <OtpVerify requestId={requestId} phone={phone} setIsSignedIn={setIsSignedIn} />
        :
        <SignIn setRequestId={setRequestId} isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} phone={phone} setPhone={setPhone} />}
    </main>) : null
  )
}
