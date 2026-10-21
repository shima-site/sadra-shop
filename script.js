const projects=[
{t:"۱. لومینا شاپ — فروشگاه فرانت‌اندی",c:"فروشگاهی • فقط فرانت‌اند",g:"linear-gradient(135deg,#4c1d95,#be185d)",d:"سبد خرید، فیلتر قیمت، جست‌وجوی زنده و ذخیره سبد در LocalStorage. همه با JS خالص، بدون سرور.",f:["🛒 سبد خرید JS","🔍 جست‌وجوی زنده","💾 LocalStorage","🎨 گرید ریسپانسیو"],s:["HTML5","CSS Grid","Vanilla JS"]},
{t:"۲. رستوران ناردون — لندینگ تک‌صفحه‌ای",c:"لندینگ • فقط فرانت‌اند",g:"linear-gradient(135deg,#451a03,#b45309)",d:"منوی تب‌دار، اسلایدر تصاویر، انیمیشن هنگام اسکرول و فرم رزرو با اعتبارسنجی JS.",f:["🍽️ تب منو","🖼️ اسلایدر","✨ Scroll Animation","📝 اعتبارسنجی فرم"],s:["HTML5","Flexbox","JS"]},
{t:"۳. داشبورد مدیریت فروش",c:"داشبورد • فقط فرانت‌اند",g:"linear-gradient(135deg,#0c4a6e,#0284c7)",d:"داشبورد مدیریتی با سایدبار، نمودار Canvas، دارک‌مود و جدول مرتب‌شونده.",f:["📊 نمودار Canvas","🌙 دارک‌مود","📑 جدول sortable","📱 سایدبار موبایل"],s:["HTML5","CSS Variables","Chart JS-like"]},
{t:"۴. پورتفولیو شخصی آرش",c:"شخصی • فقط فرانت‌اند",g:"linear-gradient(135deg,#111,#475569)",d:"سایت شخصی با افکت تایپینگ، فیلتر نمونه‌کارها، لایت‌باکس و دکمه شب و روز.",f:["⌨️ تایپ‌افکت","🌓 شب و روز","🔎 فیلتر گالری","💡 لایت‌باکس"],s:["HTML5","Animations","Vanilla JS"]},
{t:"۵. موزیک‌پلیر نوا",c:"وب‌اپ • فقط فرانت‌اند",g:"linear-gradient(135deg,#4c1d95,#06b6d4)",d:"وب‌اپ پخش موسیقی با پلی، شافل، پروگرس‌بار و لیست پخش. ساخته‌شده با Audio API.",f:["▶️ پلی و پاز","🔀 شافل","🎚️ ولوم و پروگرس","📃 پلی‌لیست"],s:["HTML Audio","CSS","JS API"]},
{t:"۶. فیلم‌نت — لندینگ فیلم",c:"لندینگ • فقط فرانت‌اند",g:"linear-gradient(135deg,#7f1d1d,#111827)",d:"لندینگ سینمایی با هیرو فول‌اسکرین، کاروسل فیلم‌ها، جست‌وجو و مودال جزئیات.",f:["🎬 کاروسل","🔍 جست‌وجوی زنده","🪟 مودال جزئیات","⭐ امتیاز ستاره‌ای"],s:["HTML5","Slider JS","CSS Grid"]},
{t:"۷. اپ روزانه — ToDo + هوا",c:"وب‌اپ • فقط فرانت‌اند",g:"linear-gradient(135deg,#134e4a,#0ea5e9)",d:"تسک‌لیست با درگ‌ان‌دراپ و ذخیره محلی + کارت هواشناسی با آیکون‌های CSS.",f:["✅ درگ‌ان‌دراپ","💾 ذخیره محلی","☁️ ویجت هوا","📅 تسک روزانه"],s:["HTML5","LocalStorage","Drag API"]}
];
function openDemo(i){
const p=projects[i];
document.getElementById("modalContent").innerHTML=
`<div class="demo-hero" style="background:${p.g}"><h2>${p.t}</h2><p style="margin-top:8px;opacity:.9">${p.c}</p><div class="stack">${p.s.map(x=>`<span>${x}</span>`).join("")}</div></div>
<p style="color:#cbd5e1;line-height:2">${p.d}</p>
<div class="demo-feats">${p.f.map(x=>`<div>${x}</div>`).join("")}</div>
<div style="background:#22c55e15;border:1px solid #22c55e44;padding:10px;border-radius:10px;font-size:13px;color:#bbf7d0">✔ این دمو ۱۰۰٪ فرانت‌اند است و بدون نیاز به سرور اجرا می‌شود.</div>
<a class="demo-btn" href="#" onclick="closeDemo();return false;">سفارش مثل این ➜</a>`;
document.getElementById("modal").classList.add("open");
}
function closeDemo(){document.getElementById("modal").classList.remove("open");}
document.querySelectorAll(".filter").forEach(btn=>{
btn.addEventListener("click",()=>{
document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
const f=btn.dataset.f;
document.querySelectorAll(".card").forEach(card=>{
card.style.display=(f==="all"||card.dataset.cat===f)?"block":"none";
});
});
});
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeDemo();});