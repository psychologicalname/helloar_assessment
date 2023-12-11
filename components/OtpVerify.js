import { useState } from 'react';
import OtpInput from 'react-otp-input';

const OtpVerify = ({ phone, requestId }) => {

    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://dev.api.goongoonalo.com/v1/auth/verify_otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "phoneNumber": phone.replace(' ', ''), requestId, otp })
        })
            .then(res => res.json())
            .then((res) => {
                if (res.user) {
                    alert('Logged in')
                }
                else {
                    alert(res?.message || 'Something went wrong! Try again...')
                }
            })
    }

    return (
        <div>
            <div className='flex flex-col items-start w-[90%] gap-1'>
                <h1 className='text-[#552583] font-medium text-[38px]'>OTP Verification</h1>
                <p className='text-[12px] text-[#101920]'>We have sent and OTP to {phone}. Please enter the code received to verify.</p>
                <div className='w-full'>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-between mt-6'>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderInput={(props) => <input {...props} className='text-[18px] w-20 h-20 mr-4 text-center text-[#101920] outline-none rounded-lg border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 mb-8' />}
                        />

                        <button type="submit" className='bg-[#552583] w-full text-white rounded-xl px-6 py-3 font-bold text-[18px]'>Verify</button>
                    </form>
                </div>
            </div>
            <div className='mt-8 text-[#101920] underline font-light text-[16px] flex flex-col items-center justify-center gap-4 w-[90%]'>
                <button>Resend OTP</button>
                <button>Use another number</button>
            </div>
        </div>
    )
}

export default OtpVerify
