

export default function index(canvas){
  const ctx = canvas.getContext('2d');
  const mix = 6000;   //会产生连线的极限距离的平方
  let width = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  let height = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const points = randomPoint(100,width,height);
  window.onresize = ()=>{
    width = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    height = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }
  draw();

  //绘制函数，用requestAnimationFrame调用实现动画
  function draw() {
    ctx.clearRect(0, 0, width, height);// 清屏
    ctx.fillStyle = "rgba(255,255,255,.8)";
    
    //遍历点集合绘制线条
    points.forEach((p, index) => {
      ctx.beginPath();
      p.x += p.xa;		//按指定速度移动
      p.y += p.ya;
      p.xa *= p.x > width || p.x < 0 ? -1 : 1;
      p.ya *= p.y > height || p.y < 0 ? -1 : 1;
      // ctx.arc(100,75,50,0,2*Math.PI);
      ctx.arc(p.x - 0.5, p.y - 0.5, p.radius,0,2*Math.PI,true);		//绘制点，其实是小方块
      ctx.fill();
      //类似于握手问题，两个点之间只绘制一次线
      for(let i = index + 1; i < points.length; i++) {
        const pi = points[i];
        const x_dist = p.x - pi.x;
        const y_dist = p.y - pi.y;
        const dist = x_dist * x_dist + y_dist * y_dist;// 距离
        //判断点之间的距离是否小于极限距离
        if(dist < mix) {
          ctx.strokeStyle  = `rgba(255,255,255,${1-dist/mix})`;
          ctx.beginPath();
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
  for(let i = 0; i < 100; i++ ) {
    const x = Math.random() * width,// 初始坐标
          y = Math.random() * height,
          xa = 2 * Math.random() - 1,// x速度
          ya = 2 * Math.random() - 1,// y速度
          radius = 2+Math.round(Math.random()*2);
    points[i] = {x, y, xa, ya, radius};
  };
  return points;
}