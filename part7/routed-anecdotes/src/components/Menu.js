import { Link } from "react-router-dom"

const Menu = () => {
    const padding = {
      paddingRight: 5
    }

    return (
      <div> 
        <div>
          <Link style={padding} to = "/"> anecdotes</Link>
          <Link style={padding} to = "/create"> create </Link>
          <Link style={padding} to = "/about"> about </Link> 
        </div>
  
        
      </div>
    )
}

export default Menu