import React from 'react'
import Banner from '../layout/banner'
import Product from '../layout/product'
import Conten from '../layout/conten'
import Category from '../layout/category'
import Comment from '../layout/commen'
import Example from '../layout/ListProduct'
import NewProducts from '../layout/newProduct'

type Props = {}

const Home = (props: Props) => {
    return (
        <div>
            <Banner />
            <Example/>
            <Category />
            <Product />
            <NewProducts/>
            <Comment />
        </div>
    )
}

export default Home