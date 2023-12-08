import Banner from '../layout/banner'
import Category from '../layout/category'
import Comment from '../layout/commen'
import Example from '../layout/ListProduct'
import NewProducts from '../layout/newProduct'


const Home = () => {
    return (
        <div>
            <Banner />
            <Example />
            <Category />
            <NewProducts />
            <Comment />
        </div>
    )
}

export default Home