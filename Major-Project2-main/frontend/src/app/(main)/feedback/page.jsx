'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  rating: z.number().min(1, { message: 'Please provide a rating.' }).max(5, { message: 'Rating must be between 1 and 5.' }),
})

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false)
  const [rating, setRating] = useState(0)

  const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      rating: 0,  // Default value for the rating
    },
  })

  const onSubmit = (values) => {
    console.log(values)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Thank You!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-600">Thank you for your feedback, {getValues('name')}!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto p-6 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">Feedback Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Name field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Input placeholder="Your name" {...register('name')} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input type="email" placeholder="Your email" {...register('email')} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Message field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea 
              placeholder="Your message" 
              {...register('message')} 
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
          </div>

          {/* Rating field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`cursor-pointer ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  onClick={() => {
                    setRating(star)  // Update rating state for UI
                    setValue('rating', star)  // Sync with form field value
                  }}
                />
              ))}
            </div>
            {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
          </div>

          {/* Submit button */}
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">Submit Feedback</Button>
        </form>
      </CardContent>
    </Card>
  )
}
