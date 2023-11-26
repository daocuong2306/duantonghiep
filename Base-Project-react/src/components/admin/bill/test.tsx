import React from 'react';

interface ProductProps {
    name: string;
    ratings: number;
    description: string;
    price: number;
    discountedPrice: number;
    imageUrl: string;
}

export const Product: React.FC<ProductProps> = ({
    name,
    ratings,
    description,
    price,
    discountedPrice,
    imageUrl,
}) => {
    return (
        <div className="row p-2 bg-white border rounded mt-2">
            <div className="col-md-3 mt-1">
                <img className="img-fluid img-responsive rounded product-image" src={imageUrl} alt={name} />
            </div>
            <div className="col-md-6 mt-1">
                <h5>{name}</h5>
                <div className="d-flex flex-row">
                    <div className="ratings mr-2">
                        {[...Array(ratings)].map((_, index) => (
                            <i key={index} className="fa fa-star"></i>
                        ))}
                    </div>
                    <span>{ratings}</span>
                </div>
                <p className="text-justify text-truncate para mb-0">{description}<br /><br /></p>
            </div>
            <div className="col-md-3 border-left mt-1">
                    <h4 className="mr-1">${discountedPrice}</h4>
            </div>
        </div>
    );
};


