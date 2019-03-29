import React,{ useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import style from './index.module.scss';
import RESPONSE_FILES from '../model/response-files.json';

const MAX_LENGTH = 3;
const ITEM_SIZE = 150;
const ITEM_MARGIN = 5;

const getContents = fetch('https://api.github.com/repos/Yesifan/Yesifan.github.io/contents/react/src/Route/')
  .then(response=>response.json())
  .then(res=>{
    if(res.message) res = RESPONSE_FILES;
    return res.filter(file=>file.type === 'dir' && file.name !== '404');
  })
  .then(res=>res.map((file,index)=>{
    file.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    file.width = `${ITEM_SIZE}px`;
    file.height = `${ITEM_SIZE}px`;
    file.position = position(index);
    return file;
  }));

export default ()=>{
  const [contents,setContents] = useState([]);
  const row = contents.length ? contents[contents.length - 1].position.row : 0;
  useEffect(() => {
    getContents.then(res=>{
      setContents(res);
    });
  },[]);

  return (
    <div className={style.index}>
      <h1>导航</h1>
      <section className={style.navs}>
        <nav style={{
          width:`${MAX_LENGTH * ITEM_SIZE + (MAX_LENGTH - 1) * ITEM_MARGIN}px`,
          height:`${row * ITEM_SIZE + (row - 1) * ITEM_MARGIN}px`
        }}>
          {contents.map(file=>
            <Link className={style.router}
              style={{
                width:file.width,
                height:file.width,
                top:file.position.top,
                left:file.position.left,
                backgroundColor:file.color
              }}
              to={`/${file.name}`} key={file.name}>
              {file.name}
            </Link>
          )}
        </nav>
      </section>
    </div>
  );
};

function position (i) {
  const index = i + 1;
  const row = Math.ceil(index / MAX_LENGTH);
  const col = index % MAX_LENGTH || MAX_LENGTH;
  const { top, left } = distance(row,col);
  return { top, left, row, col };
}

function distance (row,col) {
  const top = `${(row - 1) * (ITEM_SIZE + ITEM_MARGIN)}px`;
  const left = `${(col - 1) * (ITEM_SIZE + ITEM_MARGIN)}px`;
  return { top, left };
}