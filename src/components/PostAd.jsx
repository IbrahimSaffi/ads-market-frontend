import React, { useRef, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import apiSlice, { getCategories, postAd, reset } from '../slices/apiSlice';
import { useEffect } from 'react';


export default function PostAd() {
    let img = useRef(null)
    let option = useRef(null)
    let [file,setFile] = useState(null)
    let dispatch = useDispatch(apiSlice)
    let apiState = useSelector(state => state.apiSlice)
    const PostSchema = Yup.object().shape({
        title: Yup.string().required('Required').max(50, "Should be less than 50 letter"),
        description: Yup.string().min(5, "Should be atlest 50 letters long").required('description is required'),
        price: Yup.number().required('Price is required'),
    });
    useEffect(()=>{
     dispatch(getCategories())
     dispatch(reset())
    },[])
    return (
        <div className='post-ad' >
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    price: '',
                }}
                validationSchema={PostSchema}
                onSubmit={
                    values => {
                        const formData = new FormData();
                        for (let key in values) {
                            formData.append(key, values[key])
                        }
                        console.log(apiState)
                        formData.append("seller", apiState.profile._id)
                        formData.append("img",file)
                        console.log(img.current)
                        let category = apiState.categories.find(ele=>{
                            return ele.name===option.current.value})
                        formData.append("category",category._id)
                        for (var key of formData.entries()) {
                            console.log(key[0] + ', ' + key[1])
                        }
                        dispatch(postAd(formData))
                    }
                }
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>Title</div>
                        <Field name="title" />
                        {errors.title && touched.title ? <div>{errors.title}</div> : null}
                        <div>Description</div>
                        <Field name="description" />
                        {errors.description && touched.description ? (
                            <div>{errors.description}</div>
                        ) : null}
                        <div>Price</div>
                        <Field name="price" />
                        {errors.price && touched.price ? <div>{errors.price}</div> : null}
                        <div>Category</div>
                        <select ref={option} name="categories" id="categories">
                            {apiState.categories.map(ele=>{
                                return <option value={ele.name}>{ele.name}</option>
                                
                            })}
                        </select>
                            <input onChange={(e)=>setFile(e.target.files[0])} type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                        <button className='signup-btn' type='submit' >Post Ad</button>
                    </Form>
                )}
            </Formik>
            <div>{apiState.error}</div>
        </div>

    )
}
