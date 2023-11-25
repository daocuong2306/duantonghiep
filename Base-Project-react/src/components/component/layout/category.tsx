import { useState } from 'react';
import { useGetDataQuery } from '@/api/home';
import { Link } from 'react-router-dom';

type Props = {};

const Category = (props: Props) => {
    const { data } = useGetDataQuery();
    console.log(data);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown" style={{paddingTop:"5%"}}>
            <button className="btn" onClick={toggleDropdown} style={{backgroundColor:"#00CCFF",color:"white", padding:"3% 20%",border:"solid 1%"}}>Danh mục</button>
            {isOpen && data?.data.categories.map((category) =>
                <div style={{padding:"2%"}}>
                    <Link to="" style={{color:"#00CCFF"}}>{category.name}</Link>
                </div>
            )}
        </div>
    );
}

export default Category;
