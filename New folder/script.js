
const schedule=[
 {title:"MST 1",date:"2026-09-28",info:"Units 1-2. Check seating list a day before."},
 {title:"MST 2",date:"2026-11-16",info:"Units 3-4."},
 {title:"End Semester Exam",date:"2026-12-07",info:"Full syllabus. Admit card from portal."}
];
const resources=[
 {subject:"Mathematics",type:"Previous MST 1 Paper",url:"#"},
 {subject:"Electrical Engineering",type:"Previous MST 1 Paper",url:"#"},
 {subject:"Physics",type:"Previous MST 1 Paper",url:"#"},
 {subject:"Programming",type:"Previous MST 1 Paper",url:"#"},
 {subject:"Civil Engineering",type:"Previous MST 1 Paper",url:"#"}
];
const links=[
 {name:"College Website",url:"https://www.medicaps.ac.in/",desc:"Official homepage"},
 {name:"Student Portal / ERP",url:"https://pod.ai/",desc:"Attendance, marks, admit card"},
 {name:"Notices",url:"https://www.medicaps.ac.in/quick-links/important-notices",desc:"Official circulars"}
];
const faqs=[
{q:"How do I prepare for MSTs?",a:"Start five to seven days earlier. Solve previous exam papers first, then cover your weak units. Seniors suggest not skipping any questions, even if you do not know the exact answers."},
{q:"Where can I find seating arrangements?",a:"Teachers will send the room numbers a few days before the exams, and the seating arrangements will be revealed at the time of the examination."},
{q:"How do clubs and hackathons work?",a:"You can clear interviews to be selected as a lead, or you can become a member after registering and paying ₹200 at the pod. Hackathons are team-based events where at least one female teammate is required; just gather six friends and join one, even as a beginner."},
{q:"What should freshers know?",a:"Keep your attendance above 75%, save the notes your teachers provide, make friends in other branches, and network with seniors early on."},
{q:"When does the library usually open?",a:"From Monday to Saturday, it opens at 8:00 AM and closes at 10:00 PM. On Sundays, it closes at 5:00 PM."}
];
const quick=[
 ["schedule","📅","Exam Schedule","MSTs and end-sems"],
 ["resources","📚","Papers","By subject"],
 ["campus","🗺️","Lab Finder","Rooms and buildings"],
 ["senior","💬","Ask any Query","Real student advice"]
];

const tabs=[["home","Home"],["schedule","Schedule"],["resources","Papers"],["campus","Campus"],["links","Links"],["senior","Ask a Senior"]];
const $=id=>document.getElementById(id);
function show(id){
 document.querySelectorAll("section").forEach(s=>s.classList.toggle("on",s.id===id));
 document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.id===id));
 window.scrollTo(0,0);
}
$("nav").innerHTML=tabs.map(t=>`<button data-id="${t[0]}" onclick="show('${t[0]}')">${t[1]}</button>`).join("");
$("quick").innerHTML=quick.map(q=>`<div class="card" style="cursor:pointer" onclick="show('${q[0]}')"><h3>${q[1]} ${q[2]}</h3><div class="muted">${q[3]}</div></div>`).join("");

function daysLeft(d){return Math.ceil((new Date(d)-new Date())/864e5)}
function schedCard(s){
 const n=daysLeft(s.date);
 const when=n>0?n+" days left":n===0?"Today!":"Done";
 return `<div class="card"><span class="tag">${when}</span><h3>${s.title}</h3><div>${new Date(s.date).toDateString()}</div><div class="muted">${s.info}</div></div>`;
}
$("scheduleList").innerHTML=schedule.map(schedCard).join("");
$("upcoming").innerHTML=schedule.filter(s=>daysLeft(s.date)>=0).slice(0,2).map(schedCard).join("")||'<p class="muted">Nothing coming up.</p>';

function renderRes(f=""){
 const r=resources.filter(x=>(x.subject+x.type).toLowerCase().includes(f));
 $("resList").innerHTML=r.map(x=>`<div class="card"><span class="tag">${x.type}</span><h3>${x.subject}</h3><a href="${x.url}" target="_blank" rel="noopener">Open</a></div>`).join("")||'<p class="muted">No results.</p>';
}
function renderFaq(f=""){
 const r=faqs.filter(x=>(x.q+x.a).toLowerCase().includes(f));
 $("faqList").innerHTML=r.map(x=>`<details><summary>${x.q}</summary><p>${x.a}</p></details>`).join("")||'<p class="muted">No results.</p>';
}
$("resSearch").oninput=e=>renderRes(e.target.value.toLowerCase());
$("faqSearch").oninput=e=>renderFaq(e.target.value.toLowerCase());
$("linkList").innerHTML=links.map(l=>`<div class="card"><h3>${l.name}</h3><div class="muted">${l.desc}</div><a href="${l.url}" target="_blank" rel="noopener">Visit</a></div>`).join("");
renderRes();renderFaq();show("home");
function openMap(){$("mapView").classList.add("on")}
function closeMap(){$("mapView").classList.remove("on")}