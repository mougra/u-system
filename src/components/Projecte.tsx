import { NavLink } from 'react-router-dom'
import projectList from '../assets/projectList.svg'

interface ProjecteProps {
  text: string
  link: string
}

function Projecte({ text, link }: ProjecteProps) {
  return (
    <div className='nav-container'>
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive ? 'active-link' : 'noactive-link'
        }
      >
        <img
          src={projectList}
          alt='Display card line'
          className='main-app-svg'
        />
        <span>{text}</span>
      </NavLink>
    </div>
  )
}

export default Projecte
