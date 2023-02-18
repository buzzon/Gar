const complects = [
  {
    title: "Комплект света №1",
    equipment: [
      {
        object: {
          title: "Led par 18*18",
          description: "Приборы заливного света RGBWA+UF",
          price: 700,
          // quantity: 10
        },
        count: 4,
      },
      {
        object: {
          title: "Стойки для приборов",
          description: "Стойки раздвижные высота от 2 до 3 метров",
          price: 100,
          // quantity: 10
        },
        count: 2,
      },
    ],
    aditional: [
      {
        title: "Доставка по Екатеринбургу",
        price: 500
      },
      {
        title: "Монтаж и демонтаж",
        price: 500
      },
    ]
  },
  {
    title: "Комплект света №2",
    equipment: [
      {
        object: {
          title: "Led par 18*18",
          description: "Приборы заливного света RGBWA+UF",
          price: 700,
          // quantity: 10
        },
        count: 8,
      },
      {
        object: {
          title: "Стойки для приборов",
          description: "Стойки раздвижные высота от 2 до 3 метров",
          price: 100,
          // quantity: 10
        },
        count: 3,
      },
    ],
    aditional: [
      {
        title: "Монтаж и демонтаж",
        price: 500
      },
    ]
  },
  {
    title: "Комплект света №3",
    equipment: [
      {
        object: {
          title: "Led par 18*18",
          description: "Приборы заливного света RGBWA+UF",
          price: 700,
          // quantity: 10
        },
        count: 8,
      },
      {
        object: {
          title: "Стойки для приборов",
          description: "Стойки раздвижные высота от 2 до 3 метров",
          price: 100,
          // quantity: 10
        },
        count: 3,
      },
    ],
    aditional: [
      {
        title: "Доставка по Екатеринбургу",
        price: 500
      },
      {
        title: "Монтаж и демонтаж",
        price: 500
      },
      {
        title: "Чупачупс",
        price: 10
      },
    ]
  }
];

function calcPrice(equipment) {
  return equipment.reduce((a, v) => a.object.price * a.count + v.object.price * v.count)
}

let timerId;
var m_ = {
  pages: complects.length,
  title: ko.observable(),
  price: ko.observable(),
  equipment: ko.observableArray(),
  aditional: ko.observableArray(),
  activeIndex: ko.observable(0),

  init() {
    m_.setActive(0);
    document.addEventListener("wheel", m_.onScroll);
    // document.addEventListener('touchstart', handleTouchStart, false);
    // document.addEventListener('touchmove', handleTouchMove, false);
  },
  setActive(index) {
    m_.title(complects[index].title);
    m_.equipment(complects[index].equipment);
    m_.aditional(complects[index].aditional);
    m_.price(calcPrice(m_.equipment()));
    m_.activeIndex(index);
  },
  onScroll(e) {
    if (timerId) return;
    m_.setActive((m_.activeIndex() + complects.length + Math.sign(e.deltaY)) % complects.length)
    timerId = setTimeout(function () {
      timerId = undefined;
    }, 100)
  },
  getPageClass(index) {
    return this.activeIndex() === index ? "active" : "";
  },
  priceChanged(obj, event){
    if (event.srcElement.checked)
      m_.price(parseInt(m_.price()) + obj.price);
    else
      m_.price(parseInt(m_.price()) - obj.price);
  }
};

m_.init();
ko.applyBindings(m_);

// function getTouches(evt) {
//   return evt.touches ||             // browser API
//     evt.originalEvent.touches; // jQuery
// }


// function handleTouchStart(evt) {
//   const firstTouch = getTouches(evt)[0];
//   xDown = firstTouch.clientX;
//   yDown = firstTouch.clientY;
// };

// function handleTouchMove(evt) {
//   if (!xDown || !yDown) {
//     return;
//   }

//   var xUp = evt.touches[0].clientX;
//   var yUp = evt.touches[0].clientY;

//   var yDiff = yDown - yUp;

//   if (timerId) return;
//   m_.setActive((m_.activeIndex() + complects.length + Math.sign(yDiff)) % complects.length)
//   timerId = setTimeout(function () {
//     timerId = undefined;
//   }, 100)

//   xDown = null;
//   yDown = null;
// };