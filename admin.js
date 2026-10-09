const DEFAULT_PRODUCTS=[
{id:1,name:"هدفون بی‌سیم",category:"دیجیتال",price:1250000,icon:"🎧",desc:"صدای شفاف، طراحی راحت"},
{id:2,name:"چراغ رومیزی",category:"خانه",price:680000,icon:"💡",desc:"نور ملایم برای میز کار"},
{id:3,name:"ساعت مینیمال",category:"اکسسوری",price:940000,icon:"⌚",desc:"ساده و مناسب هر روز"},
{id:4,name:"اسپیکر کوچک",category:"دیجیتال",price:890000,icon:"🔊",desc:"جمع‌وجور و کاربردی"},
{id:5,name:"ماگ سرامیکی",category:"خانه",price:280000,icon:"☕",desc:"برای لحظه‌های آرام"},
{id:6,name:"کیف روزمره",category:"اکسسوری",price:760000,icon:"🎒",desc:"سبک و مناسب استفاده روزانه"},
{id:7,name:"پایه موبایل",category:"دیجیتال",price:190000,icon:"📱",desc:"مناسب میز کار و مطالعه"},
{id:8,name:"گلدان دکوراتیو",category:"خانه",price:350000,icon:"🪴",desc:"جزئیات کوچک، حس بهتر"}
];
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const fmt=n=>Number(n).toLocaleString("fa-IR")+" تومان";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let products=read("sadra_products",DEFAULT_PRODUCTS),orders=read("sadra_orders",[]),messages=read("sadra_support_messages",[]),admins=read("sadra_admins",[]);
function toast(s){let t=document.getElementById("toast");t.textContent=s;t.classList.remove("hidden");setTimeout(()=>t.classList.add("hidden"),2200)}
function render(){products=read("sadra_products",DEFAULT_PRODUCTS);orders=read("sadra_orders",[]);messages=read("sadra_support_messages",[]);admins=read("sadra_admins",[]);document.getElementById("statProducts").textContent=products.length.toLocaleString("fa-IR");document.getElementById("statOrders").textContent=orders.length.toLocaleString("fa-IR");document.getElementById("statMessages").textContent=messages.length.toLocaleString("fa-IR");
document.getElementById("adminProducts").innerHTML=products.map(p=>`<div class="admin-row"><span>${esc(p.icon)} ${esc(p.name)} <small>(${esc(p.category)})</small></span><b>${fmt(p.price)}</b><button class="danger" data-del-product="${p.id}">حذف</button></div>`).join("")||'<p class="hint">محصولی وجود ندارد.</p>';
document.getElementById("adminOrders").innerHTML=orders.map(o=>`<div class="admin-row"><span><b>${esc(o.customer?.name||"مشتری")}</b><small> · ${esc(o.customer?.phone||"")} · ${esc(o.customer?.address||"")}</small></span><select data-status="${o.id}"><option ${o.status==="در انتظار بررسی"?"selected":""}>در انتظار بررسی</option><option ${o.status==="در حال آماده‌سازی"?"selected":""}>در حال آماده‌سازی</option><option ${o.status==="ارسال شد"?"selected":""}>ارسال شد</option><option ${o.status==="لغو شد"?"selected":""}>لغو شد</option></select></div>`).join("")||'<p class="hint">هنوز سفارشی ثبت نشده.</p>';
document.getElementById("adminMessages").innerHTML=messages.map((m,i)=>`<div class="admin-row"><span>${esc(m.text)} <small>${esc(m.at||"")}</small></span><button class="danger" data-del-message="${i}">حذف</button></div>`).join("")||'<p class="hint">پیامی ثبت نشده.</p>';
document.getElementById("adminList").innerHTML=admins.map((a,i)=>`<div class="admin-row"><span>${esc(a.name)} <small>(${a.role==="support"?"پشتیبانی":"مدیر فروشگاه"})</small></span><button class="danger" data-del-admin="${i}">حذف</button></div>`).join("")||'<p class="hint">فهرست داخلی مدیران خالی است.</p>'}
document.getElementById("productForm").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);products=read("sadra_products",DEFAULT_PRODUCTS);products.push({id:Date.now(),name:f.get("name"),category:f.get("category"),price:Number(f.get("price")),icon:f.get("icon")||"✦",desc:f.get("desc")||""});write("sadra_products",products);e.target.reset();render();toast("محصول اضافه شد")});
document.body.addEventListener("click",e=>{const p=e.target.closest("[data-del-product]");if(p&&confirm("این محصول حذف شود؟")){write("sadra_products",read("sadra_products",DEFAULT_PRODUCTS).filter(x=>x.id!==Number(p.dataset.delProduct)));render();toast("محصول حذف شد")}const m=e.target.closest("[data-del-message]");if(m){messages=read("sadra_support_messages",[]);messages.splice(Number(m.dataset.delMessage),1);write("sadra_support_messages",messages);render()}const a=e.target.closest("[data-del-admin]");if(a){admins=read("sadra_admins",[]);admins.splice(Number(a.dataset.delAdmin),1);write("sadra_admins",admins);render()}});
document.body.addEventListener("change",e=>{const s=e.target.closest("[data-status]");if(s){orders=read("sadra_orders",[]);const o=orders.find(x=>x.id===Number(s.dataset.status));if(o)o.status=s.value;write("sadra_orders",orders);render();toast("وضعیت سفارش به‌روزرسانی شد")}});
document.getElementById("adminForm").addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);admins=read("sadra_admins",[]);admins.push({name:f.get("adminName"),role:f.get("role")});write("sadra_admins",admins);e.target.reset();render();toast("به فهرست داخلی اضافه شد")});
render();