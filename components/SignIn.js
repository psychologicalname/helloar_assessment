import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react';

const SignIn = ({ phone, setPhone, isSignedIn, setIsSignedIn, setRequestId }) => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch('https://dev.api.goongoonalo.com/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "phoneNumber": phone.replace(' ', '') })
        })
            .then(res => res.json())
            .then((res) => {
                if (res.requestId) {
                    setRequestId(res.requestId)
                    setIsSignedIn(!isSignedIn);
                }
                else {
                    alert(res?.message || 'Something went wrong! Try again...')
                }
            })
    }

    return (
        <div>
            <div className='flex flex-col items-start w-[90%] gap-1'>
                <h1 className='text-[#552583] font-medium text-[38px]'>Sign In</h1>
                <p className='text-[12px] text-[#101920]'>Please enter your mobile number to login. We will send an OTP to verify your number.</p>
                <div className='w-full'>
                    <form onSubmit={handleSubmit} className='flex flex-col mt-6'>
                        <PhoneInput
                            placeholder='Phone number'
                            className='border border-[#D0D3D4] rounded-lg px-6 py-4 focus:outline-none placeholder:text-[#E4E8F0] mb-8 text-[18px] text-[#101820]'
                            value={phone}
                            onChange={setPhone}
                            name="phone"
                        />
                        <button type='submit' className={`bg-[#552583] text-white rounded-xl px-6 py-3 font-bold text-[18px] ${loading ? 'disabled opacity-75': ''}`}>{loading ? 'Signing In' : 'Sign In'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
