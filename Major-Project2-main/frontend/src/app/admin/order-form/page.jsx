"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFormik } from 'formik';
import { Button } from "@/components/ui/button"

export default function OrderForm() {

  const orderForm = useFormik({
    initialValues: {
      order: '',
      description: '',
      name: '',
      email: '',
      date: '',
      phone: '',
      address: '',
      payment: '',
      amount: '',

    },
    onSubmit: (values) => {
      console.log(values);

      axios.post('http://localhost:5000/order/add', values)
        .then((result) => {
          console.log(result.status);

          toast.success('Order placed Successfully')
        }).catch((err) => {
          toast.error('Some Error Occured')
        });
    },
  })

  const [items, setItems] = useState([{ description: "", qty: "", unitPrice: "", totalPrice: "" }])
  const [total, setTotal] = useState(0)
  const [taxes, setTaxes] = useState(0)
  

  const calculateTotal = () => {
    return (total + taxes ).toFixed(2)
  }

  const addItem = () => {
    setItems([...items, { description: "", qty: "", unitPrice: "", totalPrice: "" }])
  }

  return (
    
    <Card className="w-full max-w-4xl mx-auto">
      
      <CardHeader>
        
        <CardTitle className="text-2xl font-bold">ORDER FORM</CardTitle>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Date:</Label>
            <Input 
            name="date"
            placeholder="date"
            id="date" 
            type="date"
            className="w-full mt-2 p-2 border rounded-2xl focus:outline-none bg-white border-gray-300  focus:ring-2 focus:ring-indigo-500"
            value={orderForm.values.date}
            onChange={orderForm.handleChange}
            required />
          </div>
          <div>
            <Label htmlFor="order">Order :</Label>
            <Input name="order"
            placeholder="order"
            id="order" 
            type="order"
            className="w-full mt-2 p-2 border rounded-2xl focus:outline-none bg-white border-gray-300  focus:ring-2 focus:ring-indigo-500"
            value={orderForm.values.order}
            onChange={orderForm.handleChange}
            required/>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer Details */}
        <div className="space-y-4">
          <h2 className="font-semibold">Customer Details</h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name:</Label>
              <Input name="name"
              placeholder="name"
              id="name" 
              type="name"
              className="w-full mt-2 p-2 border rounded-2xl focus:outline-none bg-white border-gray-300  focus:ring-2 focus:ring-indigo-500"
              value={orderForm.values.name}
              onChange={orderForm.handleChange}
              required  />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email:</Label>
                <Input name="email"
                placeholder="email"
                id="email" 
                type="email"
                className="w-full mt-2 p-2 border rounded-2xl focus:outline-none bg-white border-gray-300  focus:ring-2 focus:ring-indigo-500"
              value={orderForm.values.email}
              onChange={orderForm.handleChange}
              required/>
              </div>
              <div>
                <Label htmlFor="phone">Phone :</Label>
                <Input name="phone"
                placeholder="phone"
                id="phone"
                type="tel"
                className="w-full mt-2 p-2 border rounded-2xl focus:outline-none bg-white border-gray-300  focus:ring-2 focus:ring-indigo-500"
              value={orderForm.values.phone}
              onChange={orderForm.handleChange}
              required/>
              </div>
            </div>

          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-6">
          <h2 className="font-semibold">Order Details</h2>
          <div className="space-y-6">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-2">
                <Input placeholder="Description" />
              </div>
            ))}

          </div>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-3 gap-4">

          {/* Payment */}
          <div className="space-y-2">
            <h3 className="font-semibold">Payment</h3>
            <RadioGroup defaultValue="cash">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <label htmlFor="cash">Cash</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <label htmlFor="card">Card</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paytm" id="paytm" />
                <label htmlFor="paypal">Paytm</label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <label htmlFor="other">Other</label>
              </div>
            </RadioGroup>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <h3 className="font-semibold">Amount</h3>
            <div className="space-y-2">

              <div>
                <Label htmlFor="taxes">Taxes:</Label>
                <Input
                  id="taxes"
                  type="number"
                  step="0.01"
                  value={taxes}
                  onChange={(e) => setTaxes(parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label htmlFor="total">Total:</Label>
                <Input id="total" type="number" step="0.01" value={calculateTotal()} />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-2xl font-bold mt-6">
          Thank you
        </div>

        <Button className="w-full py-3 px-6 rounded-2xl text-lg font-semibold text-white  bg-lime-600 hover:bg-lime-700 transition-all duration-300 ">Submit Order</Button>
      </CardContent>
    </Card>
  )
}
