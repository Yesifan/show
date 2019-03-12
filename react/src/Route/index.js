import React,{useState} from 'react';
import { Link } from "react-router-dom";
import style from './index.module.scss';

console.log(style)

const getContents = fetch('https://api.github.com/repos/Yesifan/Yesifan.github.io/contents/react/src/Route/')
.then(response=>response.json())
.then(res=>res.filter(file=>file.type==='dir'&&file.name!=="404"))
.then(res=>res.map(file=>{
  file.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
  return file
}));

export default ()=>{
  const [contents,setContents] = useState([]);
  getContents.then(res=>{
    setContents(res)
  })
  return (
    <div className={style.index}>
      <nav>
        {contents.map(file=>
          <Link to={`/${file.name}`} className={style.router} key={file.name} style={{backgroundColor:file.color}}>
            {file.name}
          </Link>
        )}
      </nav>
    </div>
  )
}