'use strict';
const slides=[...document.querySelectorAll('.slide')];
let current=0,spellLevel=0,toastTimer,speakerWindow,spellDay=1;
const $=id=>document.getElementById(id);
const titles=slides.map(s=>s.dataset.name);
const names=['使用者','使用情境','核心功能','介面風格','限制條件','驗收條件'];
const parts=[
'使用者：我和家人，以手機查看。',
'使用情境：安排日本岡山 5 天 4 夜家庭旅遊；出發日期尚未決定。',
'核心功能：切換 Day 1～Day 5、查看景點卡片與支出明細，依當日 expenses 加總支出，以 JPY 顯示。',
'介面風格：手機優先；字體清楚、卡片簡潔，使用柔和綠色。',
'限制條件：只使用 HTML、CSS、JavaScript；不連接外部 API。',
'驗收條件：切換五天後只顯示當天行程；日圓支出依日期正確加總，手機不需左右滑動。'
];
function resize(){const deck=$('deck');if(innerWidth<=760){deck.style.transform='none';return;}deck.style.transform=`scale(${Math.min(innerWidth/1280,innerHeight/720)})`;}
function show(n,updateHash=true){current=Math.max(0,Math.min(8,n));slides.forEach((s,i)=>{s.classList.toggle('active',i===current);s.setAttribute('aria-hidden',i===current?'false':'true');s.inert=i!==current;});$('chapter').textContent=titles[current];$('timing').textContent=slides[current].dataset.time;$('page').innerHTML=`${String(current+1).padStart(2,'0')} <i>/ 09</i>`;$('prev').disabled=current===0;$('next').disabled=current===8;$('bottom-progress').style.width=`${(current+1)/9*100}%`;document.querySelectorAll('.slide-progress button').forEach((b,i)=>{b.classList.toggle('active',i===current);b.setAttribute('aria-current',i===current?'step':'false');});const stage=current<=3?0:current<=5?1:current===6?2:3;document.querySelectorAll('.journey span').forEach((s,i)=>{s.classList.toggle('current',i===stage);s.classList.toggle('passed',i<stage);});if(updateHash)history.replaceState(null,'',`#${current+1}`);if(innerWidth<=760)window.scrollTo({top:0,behavior:'instant'});sendSpeaker();}
slides.forEach((s,i)=>{const b=document.createElement('button');b.setAttribute('aria-label',`第 ${i+1} 頁：${titles[i]}`);b.onclick=()=>show(i);$('slide-progress').append(b);const o=document.createElement('button');o.innerHTML=`<small>${String(i+1).padStart(2,'0')} / ${s.dataset.time}</small>${titles[i]}<i>${['開場與伏筆','從語法走向需求','模糊指令示範','六項需求補充','提出具體修正','半成品與現場操作','分清三種工具','提交、推送、發布','手機驗收與收尾'][i]}</i>`;o.onclick=()=>{show(i);$('overview').close();};$('overview-list').append(o);});
function openOverview(){document.querySelectorAll('#overview-list button').forEach((b,i)=>b.classList.toggle('selected',i===current));$('overview').showModal();}
function toast(msg){clearTimeout(toastTimer);$('toast').textContent=msg;$('toast').classList.add('visible');toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),2500);}
async function copy(text){try{await navigator.clipboard.writeText(text);toast('已複製，可以貼到 Codex');}catch{const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();let ok=false;try{ok=document.execCommand('copy');}catch{}t.remove();toast(ok?'已複製，可以貼到 Codex':'無法自動複製，請選取文字手動複製');}}
$('home').onclick=()=>show(0);$('prev').onclick=()=>show(current-1);$('next').onclick=()=>show(current+1);document.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>show(current+1));$('overview-button').onclick=openOverview;
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{toast('目前瀏覽器不支援全螢幕，請使用瀏覽器全螢幕功能');}}
$('fullscreen').onclick=fullscreen;document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).close());document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
window.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select')||document.querySelector('dialog[open]'))return;if(['ArrowRight','PageDown'].includes(e.key)||(e.key===' '&&e.target===document.body)){e.preventDefault();show(current+1);}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(current-1);}if(e.key==='Home'){e.preventDefault();show(0);}if(e.key==='End'){e.preventDefault();show(8);}if(e.key.toLowerCase()==='f')fullscreen();if(e.key.toLowerCase()==='o')openOverview();if(e.key.toLowerCase()==='s')openSpeaker();});window.addEventListener('resize',resize);window.addEventListener('hashchange',()=>{const n=parseInt(location.hash.slice(1),10);if(n>=1&&n<=9)show(n-1,false);});
$('cast-vague').onclick=()=>{$('vague-empty').hidden=true;$('vague-result').hidden=false;$('cast-vague').innerHTML='再次觀看範例 <span>✧</span>';$('vague-result').animate([{opacity:0},{opacity:1}],{duration:350});};
names.forEach((name,i)=>{const b=document.createElement('button');b.className='spell-chip';b.textContent=`${i+1} ${name}`;b.onclick=()=>{spellLevel=i+1;updateSpell();};$('spell-parts').append(b);});
function getPrompt(){return '請幫我做一個旅遊網頁。'+(spellLevel?'\n'+parts.slice(0,spellLevel).join('\n'):'');}
function updateSpell(){
  $('spell-count').textContent=`${spellLevel} / 6`;
  $('prompt-box').textContent=getPrompt();
  $('prompt-box').scrollTop=$('prompt-box').scrollHeight;
  document.querySelectorAll('.spell-chip').forEach((b,i)=>{b.classList.toggle('on',i<spellLevel);b.setAttribute('aria-pressed',i<spellLevel?'true':'false');});
  $('enhance').disabled=spellLevel===6;
  $('enhance').innerHTML=spellLevel===6?'需求已補齊 <span>✓</span>':'補充下一項 <span>＋</span>';
  let html='<div class="mini-empty"><span>✧</span><p>你的想法<br>從一句話開始</p></div>';
  if(spellLevel>0){
    html='<div class="app-tag">OKAYAMA / FAMILY TRAVEL</div><h3>'+(spellLevel>1?'岡山，慢慢玩':'我們的旅行')+'</h3><p>'+(spellLevel>1?'日本岡山 · 5 天 4 夜':'和家人一起，出發吧。')+'</p>';
    if(spellLevel>=3){
      const today=okayamaTrip.days.find(day=>day.day===spellDay);
      const total=today.expenses.reduce((sum,item)=>sum+item.amount,0);
      html+='<div class="mini-dates">'+okayamaTrip.days.map(day=>`<button data-mini-day="${day.day}" class="${day.day===spellDay?'selected':''}" aria-pressed="${day.day===spellDay}">D${day.day}</button>`).join('')+'</div>';
      html+=`<div class="mini-total"><span>當日總支出</span><b>JPY ${total.toLocaleString('zh-TW')}</b></div><p class="mini-day-title">DAY ${today.day} · ${today.title}</p>`;
      html+=today.activities.slice(0,2).map(item=>`<div class="mini-card"><span>${item.time} · ${item.category}</span><b>${item.name}</b></div>`).join('');
    }
    if(spellLevel>=5)html+='<p style="font-size:8px">教學假資料 · 離線可用</p>';
    if(spellLevel>=6)html+='<p style="font-size:8px;color:#315a41">驗收目標：五天切換、日圓加總、手機閱讀</p>';
  }
  $('spell-preview').innerHTML=html;
  document.querySelectorAll('[data-mini-day]').forEach(button=>button.onclick=()=>{spellDay=Number(button.dataset.miniDay);updateSpell();});
  $('spell-phone').style.boxShadow=spellLevel>=4?'0 20px 60px #b69a4125':'0 25px 50px #0005';
}
$('enhance').onclick=()=>{spellLevel=Math.min(6,spellLevel+1);updateSpell();};$('reset-spell').onclick=()=>{spellLevel=0;spellDay=1;updateSpell();};$('copy-prompt').onclick=()=>copy(getPrompt());
const feedback=[['先提出最小需求','「先讓我可以切換日期，查看每天要去的景點。」','第一版先確認核心流程，再逐步加入支出等功能。'],['自己操作，找出差距','「第二天還看到第一天的景點；金額也沒有跟著日期改。」','先重現問題：點第二天，再查看卡片與金額。把實際結果告訴 AI。'],['補充明確的修正','「切換日期時，只顯示當天行程並重新加總。保留現有卡片版型。」','修改後再切換五個日期，核對景點與日圓金額。確認既有功能仍能操作。']];
function setLoop(i){document.querySelectorAll('[data-loop]').forEach((b,n)=>{b.classList.toggle('selected',i===n);b.setAttribute('aria-pressed',i===n?'true':'false');});$('feedback-label').textContent=feedback[i][0];$('feedback-text').textContent=feedback[i][1];$('feedback-detail').textContent=feedback[i][2];}document.querySelectorAll('[data-loop]').forEach(b=>b.onclick=()=>setLoop(Number(b.dataset.loop)));
$('copy-live').onclick=()=>copy($('live-prompt').textContent);
function setDemo(after){$('show-before').classList.toggle('selected',!after);$('show-after').classList.toggle('selected',after);$('show-before').setAttribute('aria-pressed',!after);$('show-after').setAttribute('aria-pressed',after);$('travel-frame').src=after?'demo/index.html':'starter/index.html';}$('show-before').onclick=()=>setDemo(false);$('show-after').onclick=()=>setDemo(true);
const deploy=[`<span class="small-label gold">檢查這次要上傳的內容</span><h3>先確認，再留下版本。</h3><pre>git status\ngit diff\ngit add index.html\ngit diff --cached</pre><p>確認 staged 內容只有練習檔案，沒有密碼、API Key 或內部資料。若另有 CSS / JS，請明確加入對應檔案。</p>`,`<span class="small-label gold">MAIN 分支與 ORIGIN 已設定</span><h3>提交版本，再推送到遠端。</h3><pre>git commit -m "Add daily expense total"\ngit push -u origin main</pre><p>推送後到 GitHub 儲存庫查看最新 commit。若認證或權限失敗，先處理登入與儲存庫權限，再重新推送。</p><p>提醒：push 成功不代表網站已完成發布。</p>`,`<span class="small-label gold">GITHUB REPOSITORY → SETTINGS → PAGES</span><h3>指定你的網站發布來源。</h3><div class="settings"><b>Source</b><span>Deploy from a branch</span><b>Branch</b><span>main</span><b>Folder</b><span>/ (root)</span><b>最後一步</b><span>Save → 等待發布 → 開啟網址</span></div><p>使用 GitHub 顯示的正式網址；發布可能需數分鐘，最長約 10 分鐘。若尚未完成，先展示預備成果，再回來驗收。</p>`];
function setDeploy(i){document.querySelectorAll('[data-deploy]').forEach((b,n)=>{b.classList.toggle('selected',i===n);b.setAttribute('aria-pressed',i===n?'true':'false');});$('deploy-content').innerHTML=deploy[i];}document.querySelectorAll('[data-deploy]').forEach(b=>b.onclick=()=>setDeploy(Number(b.dataset.deploy)));
const defaultUrl='https://ai-spellcasting-academy-jingya.karenl9014.chatgpt.site';let courseUrl=defaultUrl;try{courseUrl=localStorage.getItem('spellcasting-course-url')||defaultUrl;}catch{}
function updateQR(){try{const url=new URL(courseUrl);if(url.protocol!=='https:')throw Error('https required');const svg=window.createQR(courseUrl);$('qr-code').innerHTML=svg;$('qr-link').href=courseUrl;$('qr-link').textContent=courseUrl;$('qr-caption').textContent=courseUrl===defaultUrl?'講師預覽網址 · 需登入擁有者帳號':'課堂網址 · 請先以學員裝置測試存取';}catch{courseUrl=defaultUrl;$('qr-code').textContent='請設定有效的 HTTPS 網址';}}
$('configure-url').onclick=()=>{$('course-url').value=courseUrl;$('url-status').textContent='';$('url-dialog').showModal();};$('url-form').onsubmit=e=>{e.preventDefault();const v=$('course-url').value.trim();try{const u=new URL(v);if(u.protocol!=='https:')throw Error();if(v.length>500)throw Error();courseUrl=u.href;try{localStorage.setItem('spellcasting-course-url',courseUrl);}catch{}updateQR();$('url-dialog').close();toast('QR Code 已更新，請實際掃碼驗收');}catch{$('url-status').textContent='請輸入 500 字元內、以 https:// 開頭的完整網址。';}};$('reset-url').onclick=()=>{courseUrl=defaultUrl;try{localStorage.removeItem('spellcasting-course-url');}catch{}updateQR();$('url-dialog').close();toast('已還原講師預覽網址');};
function sendSpeaker(){if(speakerWindow&&!speakerWindow.closed)speakerWindow.postMessage({type:'spellcasting-slide',index:current},'*');}
function openSpeaker(){speakerWindow=window.open('speaker.html','spellcasting-speaker','width=920,height=730');if(!speakerWindow)toast('請允許此網站開啟講者視窗');else{speakerWindow.focus();setTimeout(sendSpeaker,600);}}
$('speaker-button').onclick=openSpeaker;window.addEventListener('message',e=>{if(e.source!==speakerWindow)return;if(e.data?.type==='speaker-ready')sendSpeaker();if(e.data?.type==='speaker-navigate')show(current+Number(e.data.direction));});
resize();updateSpell();setLoop(0);setDeploy(0);updateQR();const initial=parseInt(location.hash.slice(1),10);show(initial>=1&&initial<=9?initial-1:0);
