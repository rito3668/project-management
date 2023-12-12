import './Create.css'
import { useState } from 'react'
import Select from 'react-select'
const categoris = [
    {value:'development',label:'Development'},
    {value:'design',label:'Design'},
    {value:'sales',label:'Sales'},
    {value:'marketing',label:'Marketing'}
]
export default function Create() {
    const [name,setName] = useState('')
    const [details,setDetails] = useState('')
    const [dueDate,setDueDate] = useState('')
    const [category,setCategory] = useState('')
    const [assignedUsers,setAssignedUsers] = useState([])
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(name,details.dueDate,category)
    }
  return (
    <div className='create-form'>
        <h2 className='page-title'>Create a new project</h2>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Project Name:</span>
                <input 
                    required
                    type="text"
                    onChange={(e)=>setName(e.target.value)}
                    value={name} 
                />
            </label>
            <label>
                <span>Project Details:</span>
                <textarea 
                    required
                    onChange={(e)=>setDetails(e.target.value)}
                    value={details} 
                ></textarea>
            </label>
            <label>
                <span>Set Due Date:</span>
                <input 
                    required
                    type="date"
                    onChange={(e)=>setDueDate(e.target.value)}
                    value={dueDate} 
                />
            </label>
            <label>
                <span>Project Category:</span>
                <Select
                    options={categoris}
                    onChange={option=>setCategory(option)}
                />
            </label>
            <label>
                <span>Assign to:</span>
                {/* select here later */}
            </label>
            <button className='btn'>Add Project</button>
        </form>
    </div>
  )
}
