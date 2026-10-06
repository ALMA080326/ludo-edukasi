(() => {
  'use strict';
  const root = document.documentElement;
  const body = document.body;
  const isTouch = matchMedia('(pointer: coarse)').matches;

  // 3D pointer parallax: deliberately subtle so gameplay remains readable.
  const targets = ['.top','.mission-hero','.arena-board-shell','.arena-rail','.full-dashboard','.hud-card','.team-card','.activity-card','.learning-lab','.photo-panel','.footer-card','.quick-tools button'];
  const els = targets.flatMap(sel => [...document.querySelectorAll(sel)]);
  const setTilt = (x, y) => {
    if (body.classList.contains('motion-off')) return;
    root.style.setProperty('--mx3d', `${x}deg`);
    root.style.setProperty('--my3d', `${y}deg`);
  };
  if (!isTouch) {
    window.addEventListener('pointermove', e => {
      const x = (e.clientX / innerWidth - .5);
      const y = (e.clientY / innerHeight - .5);
      setTilt(y * -1.4, x * 1.4);
      els.forEach((el, i) => {
        const depth = Math.min(8, 2 + (i % 4));
        el.style.setProperty('--px', `${x * depth}px`);
        el.style.setProperty('--py', `${y * depth}px`);
      });
    }, {passive:true});
  }

  // Add semantic 3D depth layers to existing cards without changing game state.
  document.querySelectorAll('.card,.hud-card,.team-card,.activity-card,.edu-card,.material,.rank-row,.stat-box,.achievement-card,.photo-panel,.footer-card,.quick-tools button').forEach((el, i) => {
    el.classList.add('v18-3d');
    el.style.setProperty('--delay', `${(i % 10) * 45}ms`);
  });

  // Floating sparkle particles in the bright scene.
  const layer = document.createElement('div');
  layer.className = 'v18-particles';
  layer.setAttribute('aria-hidden','true');
  for(let i=0;i<28;i++){
    const p=document.createElement('i');
    p.textContent=['✦','✧','•','◆'][i%4];
    p.style.setProperty('--x', `${Math.random()*100}%`);
    p.style.setProperty('--y', `${Math.random()*100}%`);
    p.style.setProperty('--d', `${3.5 + Math.random()*5}s`);
    p.style.setProperty('--delay', `${-Math.random()*6}s`);
    layer.appendChild(p);
  }
  body.prepend(layer);

  // Give the board a living 3D camera motion, but pause while modal is open.
  const board = document.querySelector('.bd');
  if(board && !isTouch){
    board.addEventListener('pointermove', e => {
      if(body.classList.contains('motion-off')) return;
      const r=board.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-.5;
      const py=(e.clientY-r.top)/r.height-.5;
      board.style.setProperty('--bx', `${py*-3.2}deg`);
      board.style.setProperty('--by', `${px*3.2}deg`);
    }, {passive:true});
    board.addEventListener('pointerleave',()=>{board.style.setProperty('--bx','0deg');board.style.setProperty('--by','0deg');});
  }

  // Make the 3D die feel physical when clicked, without replacing roll().
  const dice=document.getElementById('dice');
  if(dice){
    dice.addEventListener('pointerdown',()=>dice.classList.add('v18-pressed'));
    ['pointerup','pointercancel','pointerleave'].forEach(ev=>dice.addEventListener(ev,()=>dice.classList.remove('v18-pressed')));
  }
})();
