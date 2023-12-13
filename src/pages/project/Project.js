import { useDocument } from '../../hooks/useDocument'
import './Project.css'
import {useParams} from 'react-router-dom'
import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'
export default function Project() {
  const {id} = useParams()
  const {error,document} = useDocument("projects",id)
  if(error){
    return <div className='error'>{error}</div>
  }
  if(!document){
    return <div className='loading'>loading...</div>
  }
  return (
    <div className='project-details'>
      <ProjectSummary project={document}/>
      <ProjectComments/>
    </div>
  )
}
