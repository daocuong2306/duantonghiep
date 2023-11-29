import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetDataQuery } from '@/api/home';

const NewProducts = () => {
    const { data } = useGetDataQuery();
    console.log(data);

    const [showMore, setShowMore] = useState(false);

    // Display 4 products initially
    const initialProducts = data?.data.productNew.slice(0, 4);

    return (
        <div className="container py-5">
            <div className="row pb-5 mb-4">
                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">

                    <div className="card rounded shadow-sm border-0">
                        <div className="card-body p-4"><img src="https://bootstrapious.com/i/snippets/sn-cards/shoes-1_gthops.jpg" alt="" className="img-fluid d-block mx-auto mb-3" />
                            <h5> <a href="#" className="text-dark">Awesome product</a></h5>
                            <p className="small text-muted font-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            <ul className="list-inline small">
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star-o text-success"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">

                    <div className="card rounded shadow-sm border-0">
                        <div className="card-body p-4"><img src="https://bootstrapious.com/i/snippets/sn-cards/shoes-2_g4qame.jpg" alt="" className="img-fluid d-block mx-auto mb-3" />
                            <h5> <a href="#" className="text-dark">Awesome product</a></h5>
                            <p className="small text-muted font-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            <ul className="list-inline small">
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star-o text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star-o text-success"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">

                    <div className="card rounded shadow-sm border-0">
                        <div className="card-body p-4"><img src="https://bootstrapious.com/i/snippets/sn-cards/shoes-3_rk25rt.jpg" alt="" className="img-fluid d-block mx-auto mb-3" />
                            <h5> <a href="#" className="text-dark">Awesome product</a></h5>
                            <p className="small text-muted font-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            <ul className="list-inline small">
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">

                    <div className="card rounded shadow-sm border-0">
                        <div className="card-body p-4"><img src="https://bootstrapious.com/i/snippets/sn-cards/shoes-4_vgfjy9.jpg" alt="" className="img-fluid d-block mx-auto mb-3" />
                            <h5> <a href="#" className="text-dark">Awesome product</a></h5>
                            <p className="small text-muted font-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            <ul className="list-inline small">
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                                <li className="list-inline-item m-0"><i className="fa fa-star-o text-success"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <h2 className="font-weight-bold mb-2">Our Team</h2>
            <p className="font-italic text-muted mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>

            <div className="row pb-5 mb-4">
                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">

                    <div className="card shadow-sm border-0 rounded">
                        <div className="card-body p-0"><img src="https://bootstrapious.com/i/snippets/sn-cards/profile-1_dewapk.jpg" alt="" className="w-100 card-img-top" />
                            <div className="p-4">
                                <h5 className="mb-0">Mark Rockwell</h5>
                                <p className="small text-muted">CEO - Consultant</p>
                                <ul className="social mb-0 list-inline mt-3">
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">

                    <div className="card shadow-sm border-0 rounded">
                        <div className="card-body p-0"><img src="https://bootstrapious.com/i/snippets/sn-cards/profile-3_ybnq8v.jpg" alt="" className="w-100 card-img-top" />
                            <div className="p-4">
                                <h5 className="mb-0">Mark Rockwell</h5>
                                <p className="small text-muted">CEO - Consultant</p>
                                <ul className="social mb-0 list-inline mt-3">
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">

                    <div className="card shadow-sm border-0 rounded">
                        <div className="card-body p-0"><img src="https://bootstrapious.com/i/snippets/sn-cards/profile-2_ujssbj.jpg" alt="" className="w-100 card-img-top" />
                            <div className="p-4">
                                <h5 className="mb-0">Mark Rockwell</h5>
                                <p className="small text-muted">CEO - Consultant</p>
                                <ul className="social mb-0 list-inline mt-3">
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">

                    <div className="card shadow-sm border-0 rounded">
                        <div className="card-body p-0"><img src="https://res.cloudinary.com/mhmd/image/upload/v1570799922/profile-2_ujssbj.jpg" alt="" className="w-100 card-img-top" />
                            <div className="p-4">
                                <h5 className="mb-0">Mark Rockwell</h5>
                                <p className="small text-muted">CEO - Consultant</p>
                                <ul className="social mb-0 list-inline mt-3">
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                    <li className="list-inline-item m-0"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default NewProducts;
