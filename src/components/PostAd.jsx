import React, { useRef } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import apiSlice, { postAd } from '../slices/apiSlice';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function PostAd() {
    let img = useRef(null)
    //start here
    
    let dispatch = useDispatch(apiSlice)
    let apiState = useSelector(state => state.apiSlice)
    const PostSchema = Yup.object().shape({
        title: Yup.string().required('Required').max(50, "Should be less than 50 letter"),
        description: Yup.string().min(50, "Should be atlest 50 letters long").required('description is required'),
        price: Yup.number().required('Price is required'),
        category: Yup.string().required('Please provide category'),
    });
    return (
        <div>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    price: '',
                    category: '',
                }}
                validationSchema={PostSchema}
                onSubmit={
                    values => {
                        const formData = new FormData();
                        for (let key in values) {
                            formData.append(key, values[key])
                        }
                        formData.append("seller", apiState.user)
                        for (var key of formData.entries()) {
                            console.log(key[0] + ', ' + key[1])
                        }
                        // dispatch(postAd(values))
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
                        <div>category</div>
                        <Field name="category" type="name" />
                        {errors.category && touched.category ? (
                            <div>{errors.category}</div>
                        ) : null}
                        <input ref={img} type="file"  id="avatar" name="avatar" accept="image/png, image/jpeg" />

                        <button className='signup-btn' type='submit' >Post Ad</button>
                    </Form>
                )}
            </Formik>
        </div>

    )
}
