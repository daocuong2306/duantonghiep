// // ... (import statements)

// const PaymentOnline = (props: Props) => {
//     const { register, handleSubmit, watch } = useForm();
//     const [paymentP] = usePaymentOnlineMutation();
//     const { data: dataCart } = useGetCartQuery();

//     const onHandleSubmit = (dataUser: any) => {
//         console.log("Selected bankCode:", dataUser.bankCode);
//         console.log("Selected language:", dataUser.language);
//         paymentP({ amount: dataCart?.total_amount, language: dataUser.language, bankCode: dataUser.bankCode });
//     };

//     console.log(dataCart);

//     return (
//         <div className="container">
//             {/* ... (your existing code) */}
//             <div className="form-group">
//                 {/* ... (your existing radio buttons) */}
//             </div>
//             <div className="form-group">
//                 {/* ... (your existing radio buttons) */}
//                 <div>
//                     <button
//                         type="submit"
//                         className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                     >
//                         Thanh toán
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentOnline;
