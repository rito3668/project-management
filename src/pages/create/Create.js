import './Create.css'
import { useEffect, useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import Select from 'react-select'
import { projectFirestore, timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
const categories = [
    {value:'development',label:'Development'},
    {value:'design',label:'Design'},
    {value:'sales',label:'Sales'},
    {value:'marketing',label:'Marketing'}
]
export default function Create() {
    const {documents} = useCollection("users")
    const {user} = useAuthContext()
    const [users,setUsers] = useState([])
    const {addDocument,response} = useFirestore("projects")
    useEffect(()=>{
        if(documents){
            setUsers(documents.map((user)=>{
                return {value:{...user,id:user.id},label:user.displayName}
            }))
        }
    },[documents])
    const [name,setName] = useState('')
    const [details,setDetails] = useState('')
    const [dueDate,setDueDate] = useState('')
    const [category,setCategory] = useState('')
    const [assignedUsers,setAssignedUsers] = useState([])
    const [formError,setFormError] = useState(null)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setFormError(null)
        if(!category){
            setFormError("please select a category")
            return
        }
        if(assignedUsers.length < 1){
            setFormError("please assign to atleast one user")
            return
        }
        const createdBy = {
            displayName:user.displayName,
            photoURL:user.photoURL,
            id:user.uid
        }
        const assignedUsersList = assignedUsers.map((u)=>{
            return {
                displayName:u.value.displayName,
                photoURL:u.value.photoURL,
                id:u.value.id
            }
        })
        const project ={
            name,
            details,
            category:category.value,
            dueDate:timestamp.fromDate(new Date(dueDate)),
            assignedUsersList,
            createdBy,
            comments:[]
        }
        await addDocument(project)
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
                    options={categories}
                    onChange={option=>setCategory(option)}
                />
            </label>
            <label>
                <span>Assign to:</span>
                <Select
                    options={users}
                    onChange={option=>setAssignedUsers(option)}
                    isMulti    
                />
            </label>
            <button className='btn'>Add Project</button>
            {formError && <p className='error'>{formError}</p>}
        </form>
    </div>
  )
}
