import React, { useState } from 'react'
import { Button, Input, Rate } from 'antd';
type Props = {}

const Showcomt = ({ data }: Props) => {
    const [latestCmt, setLatestCmt] = useState()
    console.log("props", data);
    return (
        <div>
            <section className="bg-white">
                <div className="app container mx-auto p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">Discussion (20)</h2>
                    </div>
                    {data ? [...data].reverse()?.map((value: any) => {
                        return <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg ">
                            < footer className="flex justify-between items-center mb-2" >
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold"><img
                                        className="mr-2 w-6 h-6 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                        alt="Jese Leos" />{value.name_user}</p>
                                    <p className="text-sm text-gray-600 "><time
                                        title="February 12th, 2022">{value.created_at}</time></p>
                                </div>
                                <Rate disabled defaultValue={value.evaluate} />
                            </footer>
                            <p className="text-gray-500 ">{value.comments}</p>

                        </article>

                    }) : ""}
                </div>
            </section >
        </div >
    )
}

export default Showcomt