import React from 'react'
import Banner from '../layout/banner'
import Product from '../layout/product'
import Conten from '../layout/conten'
import Category from '../layout/category'
import Comment from '../layout/commen'

type Props = {}

const Home = (props: Props) => {
    return (
        <div>
            <Banner />
            <Product />
            <Conten />
            <Category />
            <Comment />
        </div>
    )
}

export default Home