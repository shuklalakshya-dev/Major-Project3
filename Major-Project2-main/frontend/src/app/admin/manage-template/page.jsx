'use client';
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageTemplate = () => {

  const [templateList, settemplateList] = useState([]);

  const fetchTemplateData = async () => {
    const res = await axios.get('http://localhost:5000/template/getall');
    console.log(res.status);
    console.table(res.data);
    settemplateList(res.data);
  }

  useEffect(() => {
    fetchTemplateData();
  }, []);

  const deleteTemplate = (id) => {
    axios.delete('http://localhost:5000/template/delete/' + id)
      .then((result) => {
        toast.success('User Deleted successfully');
        fetchTemplateData();
      }).catch((err) => {
        console.log(err);
        toast.error('Error Failed to delete user');
      });
  }

  const displayTemplate = () => {
    if (templateList.length === 0) {
      return <p>Loading...Please Wait</p>

    } else {
      return <table className='w-full border-2 border-blue-500'>
        <thead className='text-left bg-blue-500 text-white'>
          <tr>
            <th className='p-3 text-lg'>Title</th>
            <th className='p-3 text-lg'>Description</th>
           
            <th className='p-3 text-lg'>Name</th>
            <th className='p-3 text-lg'>Price</th>
            <th className='p-3 text-lg'>Version</th>
            <th className='p-3 text-lg'>Code Snippet</th>
            <th colSpan={2}>Actions</th>

          </tr>
        </thead>
        <tbody className=''>
          {
            templateList.map((template) => {
              return <tr key={template._id} className='border border-blue-300'>

                <td className='p-3'>{template.title}</td>
                <td className='p-3'>{template.description}</td>
                <td className='p-3'>{template.name}</td>
                <td className='p-3'>{template.price}</td>
                <td className='p-3'>{template.version}</td>
                <td className='p-3'>{template.codeSnippet}</td>
                <td>
                  <button
                    onClick={() => { deleteTemplate(template._id) }}
                    className='px-3 py-1 bg-red-500 rounded-full text-white'>Delete</button>
                </td>
                <td>
                  <Link href={'/updateuser/' + template._id} className='px-3 py-1 bg-blue-500 rounded-full text-white'>Edit</Link>
                </td>

              </tr>
            })
          }
        </tbody>
      </table>
    }

  }
  return (
    <div>
      <div className='max-w-[80%] mx-auto shadow-lg rounded-lg p-5'>
        <h1 className='text-center font-bold text-3xl mt-5'>ManageTemplate</h1>

        {displayTemplate()}

      </div>
    </div>
  )
}

export default ManageTemplate;