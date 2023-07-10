// let leo = document.getElementById("webchat-button");
// let pepe = document.documentElement;        

// leo.addEventListener("click", scrollToTop);
// Crea una instancia de un observador.
var observer = new MutationObserver(function (mutations) {
  // Itera sobre todas las mutaciones que acaban de suceder.
  mutations.forEach(function (mutation) {
    // Si la clase "hidden" no está presente, desactiva el scroll del body.
    const targetElement = document.querySelector('body');
    let setIntervalId = setInterval(() => {
      if (!mutation.target.classList.contains('hidden')) {
        scrollToTop();
      } else {
        clearInterval(setIntervalId);
      }

    }, 100);
    if (!mutation.target.classList.contains('hidden')) {
      bodyScrollLock.disableBodyScroll(targetElement, {
        allowTouchMove: el => {
          while (el && el !== document.body) {
            if (
              el.getAttribute('body-scroll-lock-ignore') !== null
              //  && el.getAttribute('id') !== 'eds-webchat-container' 
               && !(el.getAttribute('class')?.indexOf('webchat__send-box') > -1) 
            ) {
              return true;
            }

            el = el.parentElement;
          }
        },
      });
    } else {
      bodyScrollLock.enableBodyScroll(targetElement);
    }
  });
});

scrollToTop = () => {
  if (window.scrollY !== 0) {
    window.scrollTo(0, 0);
  }
}

// Empieza a observar el div del chatbot
setTimeout(() => {
  var chatbotDiv = document.querySelector('#webchat-container');
  observer.observe(chatbotDiv, { attributes: true, attributeFilter: ['class'] });
}, 1000)

class VVP {
  constructor() {
    this.enabled = typeof (window.visualViewport) === "object";
    if (!this.enabled) {
      console.error("Visual Viewport is not available in this browser.");
    }
    this.vvp = { w: 0, h: 0 };
    this.vp = { w: 0, h: 0 };
    this.create_style_element();
    this.refresh();

    window.visualViewport.addEventListener('resize', this.refresh.bind(this));
  }

  get style_element() {
    return document.getElementById("viewport_fix_variables");
  }

  get calculate_viewport() {
    return new Promise((resolve, reject) => {
      if (!this.enabled) {
        return reject("Could not calculate window.visualViewport");
      }
      this.vvp.w = window.visualViewport.width;
      this.vvp.h = window.visualViewport.height;

      this.vp.w = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      this.vp.h = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      return resolve();
    })
  }

  refresh() {
    return this.calculate_viewport.then(this.set_viewport()).catch((e) => console.error(e));
  }

  create_style_element() {
    const style_tag = document.createElement("style");
    style_tag.id = "viewport_fix_variables";
    return document.head.prepend(style_tag);
  }

  set_viewport() {
    return this.style_element.innerHTML = `
      :root {
        --100vvw: ${this.vvp.w}px;
        --100vvh: ${this.vvp.h}px;
        
        --offset-w: ${this.vp.w - this.vvp.w}px;
        --offset-h: ${this.vp.h - this.vvp.h}px;
      }
    `;
  }
}

