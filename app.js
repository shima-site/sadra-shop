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
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const products=()=>read("sadra_products",DEFAULT_PRODUCTS);
let cart=read("sadra_cart",[]);
const faNum=n=>Number(n).toLocaleString("fa-IR");
const money=n=>faNum(n)+" تومان";
const grid=document.getElementById("productGrid");
let activeCategory="همه";
function renderProducts(){const q=(document.getElementById("searchInput")?.value||"").trim().toLowerCase();const list=products().filter(p=>(activeCategory==="همه"||p.category===activeCategory)&&p.name.toLowerCase().includes(q));grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-art">${p.icon||"✦"}</div><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.desc||p.category||"محصول منتخب")}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}" aria-label="افزودن ${escapeHTML(p.name)} به سبد">+</button></div></article>`).join("");document.getElementById("emptyState").classList.toggle("hidden",list.length>0)}
function escapeHTML(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function saveCart(){localStorage.setItem("sadra_cart",JSON.stringify(cart));document.getElementById("cartCount").textContent=faNum(cart.reduce((n,x)=>n+x.qty,0))}
function toast(s){const t=document.getElementById("toast");t.textContent=s;t.classList.remove("hidden");setTimeout(()=>t.classList.add("hidden"),2200)}
function show(id){document.getElementById(id).classList.remove("hidden")}
function hide(id){document.getElementById(id).classList.add("hidden")}
function renderCart(){const list=products();const host=document.getElementById("cartItems");host.innerHTML=cart.map(c=>{const p=list.find(x=>x.id===c.id);return p?`<div class="cart-row"><span>${escapeHTML(p.name)} × ${faNum(c.qty)}</span><b>${money(p.price*c.qty)}</b><button data-remove="${p.id}">حذف</button></div>`:""}).join("")||'<p class="hint">سبد خریدت هنوز خالیه.</p>';document.getElementById("cartTotal").textContent=money(cart.reduce((sum,c)=>{const p=list.find(x=>x.id===c.id);return sum+(p?p.price*c.qty:0)},0))}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;const id=Number(b.dataset.add),item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});saveCart();toast("به سبد خرید اضافه شد")});
document.getElementById("cartBtn").onclick=()=>{renderCart();show("cartModal")};
document.getElementById("cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;cart=cart.filter(x=>x.id!==Number(b.dataset.remove));saveCart();renderCart()});
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>hide(b.dataset.close));
document.querySelectorAll(".overlay").forEach(o=>o.addEventListener("click",e=>{if(e.target===o)hide(o.id)}));
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.querySelectorAll(".category").forEach(b=>b.onclick=()=>{document.querySelectorAll(".category").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeCategory=b.dataset.category;renderProducts()});
document.getElementById("checkoutForm").addEventListener("submit",e=>{e.preventDefault();if(!cart.length)return toast("سبد خرید خالیه");const orders=read("sadra_orders",[]);orders.push({id:Date.now(),customer:Object.fromEntries(new FormData(e.target)),items:cart,createdAt:new Date().toISOString(),status:"در انتظار بررسی"});localStorage.setItem("sadra_orders",JSON.stringify(orders));cart=[];saveCart();e.target.reset();renderCart();toast("سفارش نمایشی ثبت شد");});
document.getElementById("supportBtn").onclick=()=>show("supportModal");
const chatKey="sadra_support_messages";function renderChat(){const msgs=read(chatKey,[]);document.getElementById("chatMessages").innerHTML='<div class="chat-msg">سلام! چطور می‌تونیم کمکت کنیم؟</div>'+msgs.map(m=>`<div class="chat-msg mine">${escapeHTML(m.text)}</div>`).join("");document.getElementById("chatMessages").scrollTop=99999}
document.getElementById("supportForm").addEventListener("submit",e=>{e.preventDefault();const data=new FormData(e.target);const msgs=read(chatKey,[]);msgs.push({text:data.get("message"),at:new Date().toISOString()});localStorage.setItem(chatKey,JSON.stringify(msgs));e.target.reset();renderChat();toast("پیام در همین مرورگر ذخیره شد")});
document.getElementById("menuBtn").onclick=()=>document.getElementById("nav").classList.toggle("open");
saveCart();renderProducts();renderChat();