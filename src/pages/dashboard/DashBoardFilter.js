const filters = ["all","mine","development","sales","marketing","design"]
export default function DashBoardFilter({currentFilter,changeFilter}) {
    const handleClick = (f)=>{
        changeFilter(f)
    }
  return (
    <div className="project-filter">
        <nav>
            <p>Filter by:</p>
            {filters.map((f)=>(
                <button onClick={()=>handleClick(f)} className={f===currentFilter?'active':''} key={f}>
                    {f}
                </button>
            ))}
        </nav>
    </div>
  )
}
