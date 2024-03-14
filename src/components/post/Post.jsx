
import Npost from "../Npost/Npost"
import "./post.css"

export default function Post({posts}) {
  return (
    <div className='Post'>
      {posts.map(p=>(
        <Npost post={p}/>
      ))}

    </div>
  )
}
