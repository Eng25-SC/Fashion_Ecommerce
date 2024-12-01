import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler = () => {
        event.preventDefault();
    }
    return (
        <div className='text-center p-8  max-w-2xl mx-auto'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</p>
            <p className="text-gray-500 mt-3">
                Join our family of smart shoppers and enjoy 20% off your first order! By subscribing, you’ll gain early access to exclusive discounts, special promotions, and product launches. Don’t miss the chance to save big and stay in the loop with all our exciting updates. Sign up today and start shopping smarter!            </p>

            <form
                className='w-full sm:w-3/4 lg:w-2/3 flex items-center gap-2 mx-auto my-6 border border-gray-300 rounded-full p-2'
                onSubmit={onSubmitHandler}
            >
                <input
                    type="email"
                    placeholder='Enter your email'
                    className='w-full px-4 py-2 text-sm text-gray-700 bg-transparent outline-none rounded-full'
                    required
                />
                <button
                    type='submit'
                    className="bg-black text-white text-xs font-semibold px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                    SUBSCRIBE
                </button>
            </form>
        </div>

    )
}

export default NewsLetterBox
