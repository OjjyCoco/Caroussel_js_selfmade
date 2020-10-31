
// On mettra un transform scaleX(0.82) au container pour qu'on voir les éléments suivants. Des problèmes de overflow peuvent survenir. Pour cela, fixer les valeurs de overflow comme fait dans le CSS (body)

function caroussel_slide_back_on_thend(slidesVisible, slideToScroll = 1){
    /* Besoin d'un container de vw avec overflow hidden, et dedans un wrapper contenant les élements à faire défiler. C'est le wrapper qu'on fait bouger pour faire défiler les élements. Nécessite le bouton gauche en display block.
    Il faut que initSlide et slideToScroll soient divisible entre eux, sinon ça rend mal
    */

   const button_left = document.getElementById("buttonleft");
   const button_right = document.getElementById("buttonright");
   const wrapper = document.getElementById("wrapper");
   const slides = document.querySelectorAll(".slide");
   const btns_container = document.getElementById("btns_container")

   // On def le nbr de boutons pagination
   let b = slides.length - initSlide + 1 
   for(let i = 0; i < b; i++){
       let btn = document.createElement("div")
       btn.setAttribute("class", "btn_caroussel")
       btns_container.appendChild(btn)
   }

   const buttons = document.querySelectorAll(".btn_caroussel");
    
    const wrapper_width = (100 / slidesVisible) * slides.length /* for 100vw */
    wrapper.style.width = wrapper_width + "vw"
    let index = 0;

    function toSlide(){
        return (100 / slides.length) * index
    }
    
    button_left.addEventListener("click", function(){
        index = index - slideToScroll
        if(index > 0){
            wrapper.style.transform = "translateX(-" + toSlide() + "%)"
        }
        else{
            wrapper.style.transform = "translateX(0)"
            index = 0
        }
        //Grossir boutons :
        for(btn of buttons){
            btn.style.transform = "scale(1)"
        }
        buttons[index].style.transform = scaleBtnVal
    })
    
    button_right.addEventListener("click", function(){   
        index = index + slideToScroll
        if(index <= slides.length - slidesVisible /* slides.lenght - slidesVisible */){
            wrapper.style.transform = "translateX(-" + toSlide() + "%)"
        }
        else{
            wrapper.style.transform = "translateX(0)"
            index = 0
        }
        for(btn of buttons){
            btn.style.transform = "scale(1)"
        }
        buttons[index].style.transform = scaleBtnVal
    })

    let scaleBtnVal = "scale(1.5)"
    buttons[0].style.transform = scaleBtnVal
    let buttons_len = buttons.length
    for(let i = 0; i < buttons_len; i++){
        ((i) => {
            buttons[i].addEventListener("click", function(){
                index = i
                for(btn of buttons){
                    btn.style.transform = "scale(1)"
                }
                buttons[i].style.transform = scaleBtnVal
                wrapper.style.transform = "translateX(-" + toSlide(index) + "%)"
            })
        })(i)
    }
}





caroussel_infini(4)

function caroussel_infini(slidesVisible, slideToScroll = 1){
    /* Besoin d'un container de vw avec overflow hidden, et dedans un wrapper contenant les élements à faire défiler. C'est le wrapper qu'on fait bouger pour faire défiler les élements. 
    Il faut que initSlide et slideToScroll soient divisible entre eux, sinon ça rend mal
    Nombre de boutons pagination = slides.length - initSlide + 1
    */


   const button_left = document.getElementById("buttonleft");
   const button_right = document.getElementById("buttonright");
   const wrapper = document.getElementById("wrapper");
   const slides = document.querySelectorAll(".slide");
   const btns_container = document.getElementById("btns_container")

   // On def le nbr de boutons pagination
   let b = slides.length
   for(let i = 0; i < b; i++){
       let btn = document.createElement("div")
       btn.setAttribute("class", "btn_caroussel")
       btns_container.appendChild(btn)
   }

   const buttons = document.querySelectorAll(".btn_caroussel");

   
    for(let elem of slides){
        wrapper.appendChild((elem.cloneNode(true)))
        wrapper.insertBefore(elem.cloneNode(true), slides[0])
    }

    const wrapper_width = (100 / slidesVisible) * slides.length*3 /* for 100vw */
    wrapper.style.width = wrapper_width + "vw"
    let index = slides.length
    let transitionVal = "all 400ms"
    let scaleBtnVal = "scale(1.5)"
    buttons[0].style.transform = scaleBtnVal

    function toSlide(i = index){
        return (100 / (slides.length*3)) * i
    }

    wrapper.style.transform = "translateX(-" + toSlide() + "%)"
    
    button_left.addEventListener("click", function(){

        // Evite le beug et le spam sur le bouton
        if(index < 3){
            button_left.style.display = "none"
            button_right.style.display = "none"
            setTimeout(() => {
                button_left.style.display = "block"
                button_right.style.display = "block"
            }, 400);
        }

        index = index - slideToScroll
        if(index > 0){
            wrapper.style.transition = transitionVal
            wrapper.style.transform = "translateX(-" + toSlide() + "%)"
        }
        else if(index < 0){
            wrapper.style.transition = transitionVal
            wrapper.style.transform = "translateX(" + toSlide(index * -1) + "%)"
        }
        else{
            wrapper.style.transition = transitionVal
            wrapper.style.transform = "translateX(" + toSlide() + "%)"
        }

        (function infiniteEffectLeft(){
            wrapper.addEventListener("transitionend", function(){
                if(index <= slides.length - slidesVisible){
                    index += slides.length
                    wrapper.style.transitionDuration = "0s"
                    wrapper.style.transform = "translateX(-" + toSlide() + "%)"
                }
            })
        })()

        // Pour faire grossir les btns en fonctions du caroussel
        for(btn of buttons){
            btn.style.transform = "scale(1)"
        }
        if(index < slides.length){
            buttons[index].style.transform = scaleBtnVal
        }
        else{
            buttons[index - slides.length].style.transform = scaleBtnVal
        }
    })
    
    button_right.addEventListener("click", function(){

        //Evite le bug et le spam sur le bouton
        if(index >= slides.length*2){
            button_left.style.display = "none"
            button_right.style.display = "none"
            setTimeout(() => {
                button_left.style.display = "block"
                button_right.style.display = "block"
            }, 400);
        }

        index = index + slideToScroll
        if(index > 0){
            wrapper.style.transition = transitionVal
            wrapper.style.transform = "translateX(-" + toSlide() + "%)"
        }
        else if(index < 0){
            wrapper.style.transition = transitionVal
            wrapper.style.transform = "translateX(" + toSlide(index * -1) + "%)"
        }
        else{
            wrapper.style.transition = transitionVal
            wrapper.style.transform = "translateX(-" + toSlide() + "%)"
        }

        (function infiniteEffectRight(){
            wrapper.addEventListener("transitionend", function(){
                if(index >= slides.length * 2){
                    index -= slides.length
                    wrapper.style.transitionDuration = "0s"
                    wrapper.style.transform = "translateX(-" + toSlide() + "%)"
                }
            })
        })()

        // Pour faire grossir les btns en fonctions du caroussel
        for(btn of buttons){
            btn.style.transform = "scale(1)"
        }
        if(index >= slides.length*2){
            buttons[index - slides.length*2].style.transform = scaleBtnVal
        }
        else{
            buttons[index - slides.length].style.transform = scaleBtnVal
        }
    })
    
    let buttons_len = buttons.length
    for(let i = 0; i < buttons_len; i++){
        ((i) => {
            buttons[i].addEventListener("click", function(){
                index = slides.length + i
                wrapper.style.transition = transitionVal
                for(btn of buttons){
                    btn.style.transform = "scale(1)"
                }
                buttons[i].style.transform = scaleBtnVal
                wrapper.style.transform = "translateX(-" + toSlide(slides.length + i) + "%)"
            })
        })(i)
    }


    (function autoSliding(){
        let autocar = setInterval(() => {
            wrapper.style.transition = transitionVal
            index++
            wrapper.style.transform = "translateX(-" + toSlide() + "%)"
            for(btn of buttons){
                btn.style.transform = "scale(1)"
            }
            if(index >= slides.length*2){
                buttons[index - slides.length*2].style.transform = scaleBtnVal
            }
            else{
                buttons[index - slides.length].style.transform = scaleBtnVal
            }
            (function infiniteEffectRight(){
                wrapper.addEventListener("transitionend", function(){
                    if(index >= slides.length * 2){
                        index -= slides.length
                        wrapper.style.transitionDuration = "0s"
                        wrapper.style.transform = "translateX(-" + toSlide() + "%)"
                    }
                })
            })()
        }, 13000)
        
        for(let btn of buttons){
            btn.addEventListener("click", function(){
                clearInterval(autocar)
            })
        }


    })()
    

}















function caroussel_fleche_discrete(slidesVisible, slideToScroll = 1){
    /* Besoin d'un container de vw avec overflow hidden, et dedans un wrapper contenant les élements à faire défiler. C'est le wrapper qu'on fait bouger pour faire défiler les élements. Nécessite le bouton gauche en display none.
    Il faut que initSlide et slideToScroll soient divisible entre eux, sinon ça rend mal.
    Besoin d'un transition 300ms au wrapper.
    Nombre de boutons pagination = slides.length - initSlide + 1
    */

    

   const button_left = document.getElementById("buttonleft");
   const button_right = document.getElementById("buttonright");
   const wrapper = document.getElementById("wrapper");
   const slides = document.querySelectorAll(".slide");
   const btns_container = document.getElementById("btns_container")

   let b = slides.length - initSlide + 1
   for(let i = 0; i < b; i++){
       let btn = document.createElement("div")
       btn.setAttribute("class", "btn_caroussel")
       btns_container.appendChild(btn)
   }

   const buttons = document.querySelectorAll(".btn_caroussel");


    const wrapper_width = (100 / slidesVisible) * slides.length /* for 100vw */
    wrapper.style.width = wrapper_width + "vw"
    let index = 0;

    function toSlide(i = index){
        return (100 / slides.length) * i
    }
    
    button_left.addEventListener("click", function(){
        index = index - slideToScroll
        if(index > 0){
            button_right.style.display = "block"
            wrapper.style.transform = "translateX(-" + toSlide() + "%)"
        }
        else{
            button_left.style.display = "none"
            button_right.style.display = "block"
            wrapper.style.transform = "translateX(0)"
            index = 0
        }
        //Grossir boutons :
        for(btn of buttons){
            btn.style.transform = "scale(1)"
        }
        buttons[index].style.transform = scaleBtnVal
    })
    
    button_right.addEventListener("click", function(){   
        index = index + slideToScroll
        if(index <= slides.length - slidesVisible){
            button_left.style.display = "block"
            wrapper.style.transform = "translateX(-" + toSlide() + "%)"
        }
        else{
            index = slides.length - slidesVisible
        }

        if(index == slides.length - slidesVisible){
            button_right.style.display = "none"
        }

        // Pour faire grossir les btns en fonctions du caroussel
        for(btn of buttons){
            btn.style.transform = "scale(1)"
        }
        buttons[index].style.transform = scaleBtnVal
    })

    let scaleBtnVal = "scale(1.5)"
    buttons[0].style.transform = scaleBtnVal
    let buttons_len = buttons.length
    for(let i = 0; i < buttons_len; i++){
        ((i) => {
            buttons[i].addEventListener("click", function(){
                index = i
                for(btn of buttons){
                    btn.style.transform = "scale(1)"
                }
                buttons[i].style.transform = scaleBtnVal
                wrapper.style.transform = "translateX(-" + toSlide(index) + "%)"
                if(index == slides.length - slidesVisible){
                    button_right.style.display = "none"
                    button_left.style.display = "block"
                }
                else if(index == 0){
                    button_right.style.display = "block"
                    button_left.style.display = "none"
                }
                else{
                    button_right.style.display = "block"
                    button_left.style.display = "block"
                }
            })
        })(i)
    }
}