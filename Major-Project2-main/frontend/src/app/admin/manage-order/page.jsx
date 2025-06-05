'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Eye } from 'lucide-react'
  
  
  // Mock data for demonstration
  const orders = [
    {
      id: "ORD001",
      customer: "John Doe",
      date: "2023-05-01",
      total: "$150.00",
      status: "Completed",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      date: "2023-05-02",
      total: "$75.50",
      status: "Processing",
    },
    {
      id: "ORD003",
      customer: "Bob Johnson",
      date: "2023-05-03",
      total: "$200.00",
      status: "Shipped",
    },
    {
      id: "ORD004",
      customer: "Alice Brown",
      date: "2023-05-04",
      total: "$50.25",
      status: "Pending",
    },
  ]
  
  export default function ManageOrderTable() {
    return (
      <Table>
        <TableCaption>A list of recent orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    order.status === "Completed" ? "default" :
                    order.status === "Processing" ? "secondary" :
                    order.status === "Shipped" ? "outline" : "destructive"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => console.log(`View order ${order.id}`)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  