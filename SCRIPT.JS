/* ============================================
   NAMIRA — ONE LAST CHANCE
   NEXT LEVEL INTERACTIVE ENGINE
============================================ */


/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("loader")
            .classList.add("hide");

    }, 1800);

});


/* =========================
   CANVAS SPACE
========================= */

const space =
    document.getElementById("space");

const ctx =
    space.getContext("2d");

let width;
let height;

function resize(){

    width =
        space.width =
        window.innerWidth *
        devicePixelRatio;

    height =
        space.height =
        window.innerHeight *
        devicePixelRatio;

    space.style.width =
        window.innerWidth + "px";

    space.style.height =
        window.innerHeight + "px";

    ctx.scale(
        devicePixelRatio,
        devicePixelRatio
    );

}

resize();

window.addEventListener(
    "resize",
    resize
);


const stars = [];

for(let i=0;i<220;i++){

    stars.push({

        x:
            Math.random() *
            window.innerWidth,

        y:
            Math.random() *
            window.innerHeight,

        radius:
            Math.random()*1.6+.2,

        speed:
            Math.random()*.35+.05,

        alpha:
            Math.random()*.8+.1

    });

}


function drawSpace(){

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    stars.forEach(star => {

        star.y -= star.speed;

        if(star.y < 0){

            star.y =
                window.innerHeight;

            star.x =
                Math.random() *
                window.innerWidth;

        }

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(255,180,210,${star.alpha})`;

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI*2
        );

        ctx.fill();

    });

    requestAnimationFrame(drawSpace);

}

drawSpace();


/* =========================
   CURSOR
========================= */

const glow =
    document.querySelector(".cursor-glow");

document.addEventListener(
    "pointermove",
    e => {

        glow.style.left =
            e.clientX + "px";

        glow.style.top =
            e.clientY + "px";

    }
);


/* =========================
   PAGE NAVIGATION
========================= */

const pages =
    document.querySelectorAll(".page");

function goTo(id){

    pages.forEach(page => {

        page.classList.remove(
            "active"
        );

    });

    setTimeout(() => {

        const target =
            document.getElementById(id);

        if(target){

            target.classList.add(
                "active"
            );

        }

    },100);

    createExplosion(
        window.innerWidth/2,
        window.innerHeight/2,
        15
    );

}


/* =========================
   INTRO
========================= */

document
    .getElementById("enterButton")
    .addEventListener(
        "click",
        () => {

            startMusic();

            goTo("apology");

            startTyping();

        }
    );


/* =========================
   BUTTON NAVIGATION
========================= */

document
    .querySelectorAll("[data-next]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const next =
                    button.dataset.next;

                goTo(next);

            }
        );

    });


/* =========================
   TYPEWRITER
========================= */

const text = `
I know you're angry with me.

And I know that simply saying
"Sorry" doesn't magically make
everything okay.

I'm not here to make excuses.

I'm here because I care about
how you feel.

If I hurt you,
I genuinely regret it.

You mean too much to me
for me to just ignore that.

So...

this time,

I'm listening.
`;

let typingStarted = false;

function startTyping(){

    if(typingStarted)
        return;

    typingStarted = true;

    const element =
        document.getElementById(
            "typingText"
        );

    let index = 0;

    function type(){

        if(index < text.length){

            element.textContent +=
                text[index];

            index++;

            setTimeout(
                type,
                text[index-1] === "\n"
                    ? 180
                    : 25
            );

        }

    }

    type();

}


/* =========================
   MEMORY CARDS
========================= */

const memories =
    document.querySelectorAll(
        ".memory"
    );

let opened = 0;

memories.forEach(memory => {

    memory.addEventListener(
        "click",
        () => {

            if(
                memory.classList.contains(
                    "open"
                )
            ){

                return;

            }

            memory.classList.add(
                "open"
            );

            opened++;

            const message =
                memory.dataset.message;

            memory.querySelector(
                "span"
            ).textContent =
                message;

            createExplosion(
                window.innerWidth/2,
                window.innerHeight/2,
                30
            );

            if(opened === 3){

                document
                    .getElementById(
                        "memoryContinue"
                    )
                    .classList.remove(
                        "hidden"
                    );

            }

        }
    );

});


/* =========================
   HEART REPAIR
========================= */

const repairHeart =
    document.getElementById(
        "repairHeart"
    );

const progressBar =
    document.getElementById(
        "progress"
    );

const progressText =
    document.getElementById(
        "progressText"
    );

let progress = 0;

let holding = false;

let repairTimer;


function startRepair(){

    if(holding)
        return;

    holding = true;

    repairTimer =
        setInterval(
            () => {

                progress += 1.5;

                if(progress > 100)
                    progress = 100;

                progressBar.style.width =
                    progress + "%";

                progressText.textContent =
                    Math.floor(progress) + "%";

                if(progress >= 100){

                    clearInterval(
                        repairTimer
                    );

                    repairHeart.classList.add(
                        "repaired"
                    );

                    progressText.textContent =
                        "HEALING COMPLETE ♥";

                    createExplosion(
                        window.innerWidth/2,
                        window.innerHeight/2,
                        100
                    );

                    setTimeout(
                        () => {

                            goTo("truth");

                        },
                        1800
                    );

                }

            },
            30
        );

}


function stopRepair(){

    holding = false;

    clearInterval(
        repairTimer
    );

}


repairHeart.addEventListener(
    "pointerdown",
    startRepair
);

repairHeart.addEventListener(
    "pointerup",
    stopRepair
);

repairHeart.addEventListener(
    "pointerleave",
    stopRepair
);

repairHeart.addEventListener(
    "pointercancel",
    stopRepair
);


/* =========================
   MUSIC
========================= */

const music =
    document.getElementById(
        "music"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );

let musicPlaying = false;


function startMusic(){

    music.volume = .35;

    music.play()
        .then(() => {

            musicPlaying = true;

            musicButton.textContent =
                "♫";

        })
        .catch(() => {

            console.log(
                "Music requires user interaction."
            );

        });

}


musicButton.addEventListener(
    "click",
    () => {

        if(musicPlaying){

            music.pause();

            musicPlaying = false;

            musicButton.textContent =
                "🔇";

        }else{

            startMusic();

        }

    }
);


/* =========================
   CHOICE MODAL
========================= */

const choiceModal =
    document.getElementById(
        "choiceModal"
    );

const choiceButton =
    document.getElementById(
        "choiceButton"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );


choiceButton.addEventListener(
    "click",
    () => {

        choiceModal.classList.add(
            "show"
        );

    }
);


closeModal.addEventListener(
    "click",
    () => {

        choiceModal.classList.remove(
            "show"
        );

    }
);


/* =========================
   RESPONSES
========================= */

const response =
    document.getElementById(
        "response"
    );

const responseEmoji =
    document.getElementById(
        "responseEmoji"
    );

const responseTitle =
    document.getElementById(
        "responseTitle"
    );

const responseMessage =
    document.getElementById(
        "responseMessage"
    );

const responseClose =
    document.getElementById(
        "responseClose"
    );


document
    .querySelectorAll(
        ".choice-list button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const type =
                    button.dataset.choice;

                choiceModal.classList.remove(
                    "show"
                );

                if(type === "forgive"){

                    responseEmoji.textContent =
                        "❤️";

                    responseTitle.textContent =
                        "Thank you, Namira.";

                    responseMessage.textContent =
                        "I promise I won't treat your forgiveness like something I deserve. I'll value it.";

                    setTimeout(
                        () => {

                            response.classList.add(
                                "show"
                            );

                            createExplosion(
                                window.innerWidth/2,
                                window.innerHeight/2,
                                180
                            );

                        },
                        300
                    );

                }


                if(type === "time"){

                    responseEmoji.textContent =
                        "🥺";

                    responseTitle.textContent =
                        "Take your time.";

                    responseMessage.textContent =
                        "You don't have to rush anything. Whenever you're ready, I'll be here.";

                    response.classList.add(
                        "show"
                    );

                }


                if(type === "angry"){

                    responseEmoji.textContent =
                        "😔";

                    responseTitle.textContent =
                        "That's okay.";

                    responseMessage.textContent =
                        "You don't have to stop being angry just because I apologized. Your feelings are valid.";

                    response.classList.add(
                        "show"
                    );

                }

            }
        );

    });


responseClose.addEventListener(
    "click",
    () => {

        response.classList.remove(
            "show"
        );

    }
);


/* =========================
   PARTICLE EXPLOSION
========================= */

const particleCanvas =
    document.getElementById(
        "particles"
    );

const pctx =
    particleCanvas.getContext("2d");


function resizeParticles(){

    particleCanvas.width =
        window.innerWidth *
        devicePixelRatio;

    particleCanvas.height =
        window.innerHeight *
        devicePixelRatio;

    particleCanvas.style.width =
        window.innerWidth + "px";

    particleCanvas.style.height =
        window.innerHeight + "px";

    pctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
    );

}

resizeParticles();

window.addEventListener(
    "resize",
    resizeParticles
);


const particles = [];


function createExplosion(
    x,
    y,
    amount = 50
){

    for(
        let i=0;
        i<amount;
        i++
    ){

        const angle =
            Math.random() *
            Math.PI *
            2;

        const speed =
            Math.random()*7 + 2;

        particles.push({

            x:x,

            y:y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life:
                1,

            size:
                Math.random()*5 + 2,

            char:
                Math.random() > .35
                    ? "♥"
                    : "✦"

        });

    }

}


function drawParticles(){

    pctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    for(
        let i=particles.length-1;
        i>=0;
        i--
    ){

        const p =
            particles[i];

        p.x += p.vx;

        p.y += p.vy;

        p.vy += .08;

        p.life -= .015;

        pctx.globalAlpha =
            Math.max(
                p.life,
                0
            );

        pctx.fillStyle =
            "#ff6c9f";

        pctx.font =
            `${p.size*5}px serif`;

        pctx.fillText(
            p.char,
            p.x,
            p.y
        );

        if(p.life <= 0){

            particles.splice(
                i,
                1
            );

        }

    }

    pctx.globalAlpha = 1;

    requestAnimationFrame(
        drawParticles
    );

}

drawParticles();


/* =========================
   FLOATING HEARTS
========================= */

const heartContainer =
    document.getElementById(
        "floatingHearts"
    );


function floatingHeart(){

    const heart =
        document.createElement(
            "div"
        );

    heart.textContent =
        Math.random() > .5
            ? "♥"
            : "♡";

    heart.style.position =
        "fixed";

    heart.style.left =
        Math.random()*100 + "vw";

    heart.style.bottom =
        "-30px";

    heart.style.color =
        "#ff6c9f";

    heart.style.fontSize =
        10 + Math.random()*25 + "px";

    heart.style.opacity =
        .3 + Math.random()*.5;

    heart.style.pointerEvents =
        "none";

    heart.style.zIndex =
        "5";

    const duration =
        5 + Math.random()*6;

    heart.style.transition =
        `transform ${duration}s linear,
         opacity ${duration}s linear`;

    heartContainer.appendChild(
        heart
    );

    requestAnimationFrame(
        () => {

            heart.style.transform =
                `translateY(-${window.innerHeight+100}px)
                 rotate(${Math.random()*360}deg)`;

            heart.style.opacity =
                "0";

        }
    );

    setTimeout(
        () => {

            heart.remove();

        },
        duration*1000
    );

}

setInterval(
    floatingHeart,
    800
);


/* =========================
   CLICK PARTICLES
========================= */

document.addEventListener(
    "pointerdown",
    e => {

        if(
            e.target.tagName ===
            "BUTTON"
        ){

            createExplosion(
                e.clientX,
                e.clientY,
                12
            );

        }

    }
);
