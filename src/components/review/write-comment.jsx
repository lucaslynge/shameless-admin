import { Field, Form, Formik } from 'formik';
import React from 'react'
import HoverRating from '../ratting';
import { Textarea } from '../ui/textarea';
import FormInput from "../form-input";

import { Button } from '../ui/button';
import { useCreateReviewMutation, useUpdateReviewMutation } from '@/lib/services/reviewApi';
import { Slide, toast } from 'react-toastify';
import Loader from '../loader';

export default function WriteComment({refetchReviews,review,isedit,setIsOpen}) {
  const [CreateReview, { isLoading }] = useCreateReviewMutation();
  const [UpdateReview, { isLoading:isLoadingUpdate }] = useUpdateReviewMutation();


  return (
  
    <Formik
      initialValues={{
        review: isedit ? review.review:"",
        name: isedit ? review.name:"",
        rating: isedit ? review.rating:"",
        user_id: '66ec11c5daeb0d285204ca6b',
      }}
      onSubmit={async (values, { resetForm }) => {
        if(!isedit){
          try {
              const response = await CreateReview(values).unwrap()
              if(response.success){
                resetForm()
                setIsOpen(false)
                toast.success(response.message,{
                  position:'top-center',
                  autoClose: 3000,
                  hideProgressBar: true,
                  transition: Slide,
                  type:'success',
               
  
                })
              }
            } catch (error) {
              toast.error(error.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                transition: Slide,
                type: "error",
              });
            } finally {
              refetchReviews()
              resetForm();
              setIsOpen(false)
            }
            return
      }
      if(isedit){
          try {
              const response = await UpdateReview({id:review._id,body:values}).unwrap()
              if(response.success){
                resetForm()
                refetchReviews()
                setIsOpen(false)
                toast.success(response.message,{
                  position:'top-center',
                  autoClose: 3000,
                  hideProgressBar: true,
                  transition: Slide,
                  type:'success',
                  
                })
              }
            } catch (error) {
              toast.error(error.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                transition: Slide,
                type: "error",
              });
            } finally {
              refetchReviews()
              resetForm();
              setIsOpen(false)

            }
      }
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <div className="grid grid-cols-1 my-4 gap-x-10 gap-y-5">
            <div>
              <label
                htmlFor={`email`}
                className="block mb-2 text-[#003939] text-sm font-bold "
              >
                Ratting
              </label>
              <Field name="rating">
                {({ field, form }) => (
                  <HoverRating field={field} preValue={field.value}  />
                )}
              </Field>
            </div>
            <div>
            <label
                htmlFor={`email`}
                className="block mb-2 text-[#003939] text-sm font-bold "
              >
                Name
              </label>
            <Field id="name" component={FormInput} type="text" placeholder="Name" name="name" />

            </div>
          

            <div>
              <label
                htmlFor={`review`}
                className="block mb-2 text-[#003939] text-sm font-bold "
              >
                Review
              </label>
              <Textarea
                rows={5}
                name="review"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.review}
                placeholder="Write a summary in 450 character or less"
              />
            </div>
          </div>

          <div className="flex flex-wrap mt-10 justify-center gap-4">
          {!isedit &&
            <Button 
            type="submit" className="text-base md:text-lg text-white font-semibold bg-red-500  rounded-md px-20 py-3 mt-5">
              {isLoading ? <Loader /> : 'Submit'}
            </Button>}
            {isedit &&
            <Button 
            type="submit" className="text-base md:text-lg text-white font-semibold bg-red-500  rounded-md px-20 py-3 mt-5">
              {isLoadingUpdate ? <Loader /> : 'Submit'}
            </Button>}
          </div>
        </Form>
      )}
    </Formik>
  )
}