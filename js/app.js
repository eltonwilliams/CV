/*
==================================================
    DIGITAL CV
    app.js
==================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeAnimations();
    initializeSkillBars();
    initializeBackToTop();
    initializeScrollProgress();
    initializeTypingEffect();
    initializeDownloadButton();
    initializeCurrentYear();

});


/*==================================================
    FADE IN ANIMATION
==================================================*/

function initializeAnimations(){

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("fade-in");

            }

        });

    },{
        threshold:0.15
    });

    document.querySelectorAll("section,.job,.project")
        .forEach(item=>observer.observe(item));

}


/*==================================================
    ANIMATE SKILL BARS
==================================================*/

function initializeSkillBars() {

    const bars = document.querySelectorAll(".skill-fill");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            bars.forEach((bar, index) => {

                const width = bar.dataset.width;

                setTimeout(() => {

                    bar.style.width = width + "%";

                }, index * 180);

            });

            observer.disconnect();

        });

    }, {
        threshold: 0.4
    });

    const skillsSection = document.querySelector(".sidebar-section:nth-of-type(3)");

    if (skillsSection) {
        observer.observe(skillsSection);
    }

}


/*==================================================
    BACK TO TOP BUTTON
==================================================*/

function initializeBackToTop(){

    const button = document.createElement("button");

    button.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

    button.className="back-to-top no-print";

    document.body.appendChild(button);

    Object.assign(button.style,{

        position:"fixed",
        bottom:"30px",
        right:"30px",
        width:"48px",
        height:"48px",
        borderRadius:"50%",
        border:"none",
        cursor:"pointer",
        background:"#e67e22",
        color:"#fff",
        fontSize:"18px",
        display:"none",
        zIndex:"999",
        boxShadow:"0 10px 25px rgba(0,0,0,.2)",
        transition:"0.3s"

    });

    window.addEventListener("scroll",()=>{

        button.style.display =
            window.scrollY > 300 ? "block" : "none";

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}


/*==================================================
    SCROLL PROGRESS BAR
==================================================*/

function initializeScrollProgress(){

    const progress=document.createElement("div");

    progress.id="scroll-progress";

    document.body.appendChild(progress);

    Object.assign(progress.style,{

        position:"fixed",
        top:"0",
        left:"0",
        height:"5px",
        width:"0%",
        background:"#e67e22",
        zIndex:"9999"

    });

    window.addEventListener("scroll",()=>{

        const scrollTop=document.documentElement.scrollTop;

        const height=
            document.documentElement.scrollHeight-
            document.documentElement.clientHeight;

        progress.style.width=(scrollTop/height)*100+"%";

    });

}


/*==================================================
    HERO TYPING EFFECT
==================================================*/

function initializeTypingEffect(){

    const heading=document.querySelector(".hero h1");

    if(!heading) return;

    const original=heading.innerHTML;

    heading.innerHTML="";

    let index=0;

    const timer=setInterval(()=>{

        heading.innerHTML=original.slice(0,index);

        index++;

        if(index>original.length){

            clearInterval(timer);

        }

    },100);

}


/*==================================================
    DOWNLOAD BUTTON
==================================================*/

function initializeDownloadButton(){

    const button=document.getElementById("downloadCV");

    if(!button) return;

    button.addEventListener("click",()=>{

        window.print();

    });

}


/*==================================================
    CURRENT YEAR
==================================================*/

function initializeCurrentYear(){

    const year=document.getElementById("currentYear");

    if(year){

        year.textContent=new Date().getFullYear();

    }

}


/*==================================================
    ACTIVE SECTION
==================================================*/

const sections=document.querySelectorAll("section");

const options={

    threshold:.35

};

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            document
                .querySelectorAll("nav a")
                .forEach(link=>{

                    link.classList.remove("active");

                });

            const id=entry.target.id;

            const active=document.querySelector(
                `nav a[href="#${id}"]`
            );

            if(active){

                active.classList.add("active");

            }

        }

    });

},options);

sections.forEach(section=>observer.observe(section));


/*==================================================
    SMOOTH ANCHOR LINKS
==================================================*/

document.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const target=document.querySelector(
            this.getAttribute("href")
        );

        if(!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior:"smooth"

        });

    });

});


/*==================================================
    REDUCED MOTION SUPPORT
==================================================*/

if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){

    document.documentElement.style.scrollBehavior="auto";

}


/*==================================================
    CONSOLE MESSAGE
==================================================*/

console.log(
"%cDigital CV Loaded Successfully",
"color:#e67e22;font-size:16px;font-weight:bold;"
);