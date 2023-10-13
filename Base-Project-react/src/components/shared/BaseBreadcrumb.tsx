interface BaseBreadcrumb{
    title: string,
}
import image from "../../assets/assets/images/ChatBc.png"

const BaseBreadcrumb = (props:BaseBreadcrumb) => {
        return <div  className="bg-sky-100 shadow-md rounded-md mb-5 h-[80%] ">
            <div className="px-8 py-4 py-lg-0">
            <div className="flex justify-between items-center">
                <div className="flex py-0 align-center">
                        <p className="font-mono font-bold text-2xl" >{props.title}</p>
                </div>
                <div className="d-none py-0 lg-block overflow-hidden">
                    <div className="mb-n16 mt-3">
                    <img src={image} alt="breadcrumb" className="w-20"/>
                    </div>
                </div>
            </div>
        </div>
        </div>
      
}


export default BaseBreadcrumb