// Crea una instancia de un observador.
var observer = new MutationObserver(function (mutations) {
  // Itera sobre todas las mutaciones que acaban de suceder.
  mutations.forEach(function (mutation) {
    if (!mutation.target.classList.contains('hidden')) {
      addListeners();
      let setIntervalId = setInterval(() => {
        if (isMobile()) {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 0);
        }
        if (mutation.target.classList.contains('hidden')) {
          clearInterval(setIntervalId)
        }
      }, 100);
    } else {
      removeListeners();
    }
  });
});

let startY = 0;
const handleTouchMoveEvent = function (event) {
  const scrollableElements = document.querySelectorAll('.webchat__basic-transcript__scrollable');
  const isScrollableElement = Array.from(scrollableElements).some(element => element.contains(event.target));
  const scrollTop = scrollableElements[0]?.scrollTop || 0;
  if (!isScrollableElement || (scrollTop === 0)) {
    const deltaY = event.touches[0].clientY - startY;
    if (deltaY < 0 && event.cancelable) {
      event.preventDefault();
    }
    startY = event.touches[0].clientY;
  }
};

const handleTouchStartEvent = function (event) {
  startY = event.touches[0].clientY;
};

const handleTouchEndEvent = function (event) {
  if (!event.cancelable) {
    setTimeout(() => {
      window.scrollTo(0, 10);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 10);
    }, 10); //Workaround para hacerlo andar en chrome mobile
  }
}

// Add event listeners
const addListeners = function () {
  document.addEventListener('touchmove', handleTouchMoveEvent, { passive: false });
  document.addEventListener('touchstart', handleTouchStartEvent, { passive: false });
  document.addEventListener('touchend', handleTouchEndEvent, { passive: true });
};

// Remove event listeners
const removeListeners = function () {
  document.removeEventListener('touchmove', handleTouchMoveEvent);
  document.removeEventListener('touchstart', handleTouchStartEvent);
  document.removeEventListener('touchend', handleTouchEndEvent);
};

// Empieza a observar el div del chatbot
let intervalIdBotContainer = setInterval(() => {
  var chatbotDiv = document.querySelector('#webchat-container');
  if (chatbotDiv) {
    clearInterval(intervalIdBotContainer);
    observer.observe(chatbotDiv, { attributes: true, attributeFilter: ['class'] });
  }
}, 100)

const isMobile = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

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

new VVP();
