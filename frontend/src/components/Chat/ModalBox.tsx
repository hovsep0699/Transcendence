import React, { useEffect } from "react";
import Modal from "./Modal";
import { Field, Form, Formik, FormikProps } from 'formik'; 
import { useState } from "react";

const ModalBox = ({create = null, join = null, footer = null, children = null, handleSelectUser = null, setSearchQuery = null, suggestions = null, createChannel = null, joinChannel = null}) => {
const [openModal, setOpenModal] = useState(false)
const [channel, setChannel] = useState(null)
const [initValues, setInitValues] = useState({
    channelName: '',
    type: '1',
    password: ''
});
useEffect(()=>{
    console.log("inits: ", initValues);
    
}, [channel, openModal, initValues])

const handleSubmit = (values, {resetForm}) =>{
    console.log(values);
    
    createChannel ? createChannel(values) : joinChannel(channel, values)
    resetForm();
    setOpenModal(false);

    handleSelectUser && handleSelectUser(channel)
    
    setSearchQuery && setSearchQuery('')

}
    return (
        <>
        {create ? (
            <>
            <div className="flex justify-start">
                  Channels

            </div>
            <div className="flex justify-end">
                <button className="flex justify-center mt-0 bg-transparent text-white hover:bg-[#36323270] px-3 py-1" onClick={()=>setOpenModal(true)}>+</button>
            </div>
            </>
        ) : (join ? (
            <>
            {suggestions &&
                    suggestions.map((elem, key) => (
                      // <div>
                      //   {console.log(elem)}
                      // </div>
                      <div 
                      className="flex flex-row py-4 px-4 justify-center items-center hover:cursor-pointer hover:bg-[#36323270] hover:rounded-xl"
                      key={key}
                      >
                        <div
                          className="flex w-full  justify-start"
                          onClick={() => {
                            // handleSelectUser(elem);
                            setOpenModal(true);
                            setChannel(elem)
                            console.log("elem: ", elem);
                            
                            setInitValues({
                                channelName: elem ? elem.channelname : '',
                                type: elem ? elem.channeltype : '1',
                                password: ''
                            });
                            console.log("okkkkkk");
                          }}
                        >
                          <div className="w-1/4">
                            {elem.channelpictureurl ? (
                            <img
                              src={elem.channelpictureurl}
                              alt=""
                              srcSet=""
                              className="object-cover h-12 w-12 rounded-full"
                            />
                            ) : (
                              <div className="object-cover h-12 w-12 justify-center flex items-center rounded-full bg-gray-800">
                                  {elem.channelname.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-row">
                            <div className="ml-3 text-lg break-all font-semibold">
                              {elem.channelname}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
            </>
        ) : (
            <></>
        ))
    }
        <Modal
        open={openModal}
        className={"backdrop-blur"}
        onClose={()=>setOpenModal(false)}
        contentClassName={"bg-[#2d232330] backdrop-blur-2xl max-w-fit"}
        
        
        >
        <div className="flex flex-col h-full p-5">
            <Formik 
            
            initialValues={initValues}
            onSubmit={handleSubmit}
            validate={(values)=>{
                
                console.log(values);
                
                const errors = {}
                if (values.channelName == '')
                    errors.channelName = 'Required'
                if (values.password == '' && values.type == '2')
                    errors.password = 'Required'
                return errors;
            }}
            >
            {({values, errors, touched} : FormikProps<any>)=>(
                <Form
                    // id={`${create ? "create-channel-form" : "join-channel-form"}`}
                    className="flex flex-col text-sm justify-center h-full p-2"
                    
                >
                <div className={`${(errors.channelName && touched.channelName && errors.channelName) ? "text-red-800" : ""}`}>
                    {errors.channelName && touched.channelName && errors.channelName}
                </div>
                <Field
                    disabled={join}
                    className="p-2 outline-none"
                    name="channelName"
                    placeholder="Channel Name"
                    type="text"
                >
                </Field>
                <Field 
                    disabled={join}
                    name="type" as="select"
                    className="mt-2 bg-[#181818] p-2 rounded "
                >
                    <option value="1" >Public</option>
                    <option value="2" >Protected</option>
                    <option value="3" >Private</option>
                </Field>
                {/* {errors.password && touched.password && errors.password} */}
                {values.type == "2" ? (
                    <>
                    <div className={`${(errors.password && touched.password && errors.password) ? "text-red-800" : ""}`}>
                    {errors.password && touched.password && errors.password}
                </div>
                <Field
                    name="password"
                    className="p-2 outline-none"
                    type="text"
                    placeholder="Channel Password"
                >
                    </Field>
                    </>
                )
                    : (<></>
                )}
                    <button 
                    type="submit"
                    disabled={(errors && Object.keys(errors).length != 0)}
                    className={`p-2 bg-[#181818] ${!(errors && Object.keys(errors).length != 0) ? "hover:bg-[#313131]" : ""} rounded text-white`}
                    >
                    {create ? "Create" : "Join"}
                    </button>
                </Form>
            )}
            </Formik>
            
        </div>
        </Modal>
        </>
    )
}


export default ModalBox;