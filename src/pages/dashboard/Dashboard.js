import './Dashboard.css'
import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'
import ProjectList from '../../components/ProjectList'
import DashBoardFilter from './DashBoardFilter'
import { useAuthContext } from '../../hooks/useAuthContext'
export default function Dashboard() {
  const {documents,error} = useCollection("projects")
  const [currentFilter,setCurrentFilter] = useState("all")
  const {user} = useAuthContext()
  const changeFilter = (newFilter)=>{
    setCurrentFilter(newFilter)
  }
  const filteredProjects = documents?documents.filter((doc)=>{
      switch(currentFilter){
        case 'all':
          return true
        case 'mine':
          let assignedToMe=false
          doc.assignedUsersList.forEach((u)=>{
            if(user.uid === u.id)assignedToMe=true
          }) 
          return assignedToMe
        case 'development':
        case 'design':
        case 'sales':
        case 'marketing':
          return doc.category === currentFilter   
        default: 
          return true    
      }
  }):null
  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error&&<p className='error'>{error}</p>}
      {documents && <DashBoardFilter currentFilter={currentFilter} changeFilter={changeFilter}/>}
      {documents&&<ProjectList projects={filteredProjects}/>}

    </div>
  )
}
