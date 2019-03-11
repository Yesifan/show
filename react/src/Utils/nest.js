export default function index(canvas){
  const ctx = canvas.getContext('2d');
  const mix = 10000;   //会产生连线的极限距离的平方
  let width = canvas.width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)*window.devicePixelRatio;
  let height = canvas.height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)*window.devicePixelRatio;
  const points = randomPoint(10+width*height/10000,width,height);
  let mousePoint = [];
  // canvas.
  canvas.addEventListener('mousemove', (event)=>{
    mousePoint = [{x:event.clientX, y:event.clientY}]
  },false);
  canvas.addEventListener('touchmove',(event)=>{

    const touchs = event.changedTouches;
    const point = [];
    for(let i = 0;i<touchs.length;i++){
      point.push({x:touchs[i].clientX,y:touchs[i].clientY})
    }
    mousePoint = point
    // mousePoint = event.changedTouches.map(touch => ({x:touch.clientX,y:touch.clientY}));
  },false)

  window.onresize = ()=>{
    width = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    height = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }
  draw();

  //绘制函数，用requestAnimationFrame调用实现动画
  function draw() {
    ctx.clearRect(0, 0, width, height);// 清屏
    ctx.fillStyle = "rgba(255,255,255,.4)";
    
    //遍历点集合绘制线条
    points.forEach((p, index) => {
      ctx.beginPath();
      p.x += p.xa;		//按指定速度移动
      p.y += p.ya;
      p.xa *= p.x > width || p.x < 0 ? -1 : 1;
      p.ya *= p.y > height || p.y < 0 ? -1 : 1;
      // ctx.arc(100,75,50,0,2*Math.PI);
      ctx.arc(p.x, p.y, p.radius,0,2*Math.PI,true);		//绘制点，其实是小方块
      ctx.fill();

      // 连接鼠标所在位置
      mousePoint.forEach((point)=>line(point));
      // 类似于握手问题，两个点之间只绘制一次线
      points.forEach((point,i)=>{
        if(i<=index) return false;
        line(point)
      })
      // for(let i = index + 1; i < points.length; i++) {
      //   line(points[i])
      // }

      function line(pi){
        if(!pi) return false;
        const x_dist = p.x - pi.x;
        const y_dist = p.y - pi.y;
        const dist = x_dist * x_dist + y_dist * y_dist;// 距离
        //判断点之间的距离是否小于极限距离
        if(dist < mix) {
          ctx.strokeStyle  = `rgba(255,255,255,${(1-dist/mix)*0.6})`;
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pi.x, pi.y);
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }
}

function randomPoint(num,width,height){
  const points = [];
  for(let i = 0; i < num; i++ ) {
    const x = Math.random() * width,// 初始坐标
          y = Math.random() * height,
          xa = 2 * Math.random() - 1,// x速度
          ya = 2 * Math.random() - 1,// y速度
          radius = 2+Math.round(Math.random()*2);
    points[i] = {x, y, xa, ya, radius};
  };
  return points;
}