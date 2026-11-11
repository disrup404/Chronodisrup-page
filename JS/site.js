const menuButton=document.querySelector(".menu-button"),nav=document.querySelector(".nav");
if(menuButton&&nav){menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");}));}
document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
const form=document.querySelector("#contact-form");
if(form){form.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(form);const subject=encodeURIComponent(`Chronodisrup enquiry: ${d.get("interest")}`);const body=encodeURIComponent(`Name: ${d.get("name")}\nEmail: ${d.get("email")}\nInterest: ${d.get("interest")}\n\n${d.get("message")}`);window.location.href=`mailto:REPLACE-WITH-COMPANY-EMAIL?subject=${subject}&body=${body}`;document.querySelector("#form-note").textContent="Your email application should open with the enquiry prepared. Configure the company email in site.js before launch.";});}
