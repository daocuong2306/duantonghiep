import Banner from '../layout/banner'
import Category from '../layout/category'
import Comment from '../layout/commen'
import NewProducts from '../layout/newProduct'


const Home = () => {
    return (
        <div>
            <Banner />
            <Category />
            <NewProducts />
            <Comment />
        </div>
    )
}

export default Home