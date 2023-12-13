import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"

export default function ProjectComments() {
    const [newComment,setNewComment] = useState('')
    const {user} = useAuthContext()
    const handleSubmit = (e)=>{
        e.preventDefault()
        const comment = {
            displayName:user.displayName,
            photoURL:user.photoURL,
            content:newComment,
            createdAt:timestamp.fromDate(new Date()),
            id:Math.random()
        }
        console.log(comment)
    }
    return (
    <div className="project-comments">
        <h4>Project Comments</h4>
        <form className="add-comment" onSubmit={handleSubmit}>
            <label>
                <span>Add New Comment:</span>
                <textarea 
                    required
                    onChange={(e)=>setNewComment(e.target.value)}
                    value={newComment}    
                ></textarea>
            </label>
            <button className="btn">Add Comment</button>
        </form>
    </div>
  )
}