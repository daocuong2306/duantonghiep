import React from 'react'
import Example from './ListProduct'

type Props = {}

const Conten = (props: Props) => {
    return (
        <div>
            <section className="overflow-hidden bg-gray-50 h-[200px]">
                <img
                    alt="Student"
                    src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="h-56 w-full object-cover sm:h-full"
                />
            </section>
            <section className="bg-white font-poppins">
                <Example />
            </section>
        </div>
    )
}

export default Conten