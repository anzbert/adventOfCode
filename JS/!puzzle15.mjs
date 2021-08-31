const input = `Sugar: capacity 3, durability 0, flavor 0, texture -3, calories 2
Sprinkles: capacity -3, durability 3, flavor 0, texture 0, calories 9
Candy: capacity -1, durability 0, flavor 4, texture 0, calories 1
Chocolate: capacity 0, durability 0, flavor -2, texture 2, calories 8`;

const test = `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`;

const split1 = input.split("\n");
// console.table(split1);

const justNumbers = split1
  .map((line) => line.match(/-*\d/g))
  .map((array) => array.map((number) => parseInt(number)));
// console.log("props", justNumbers);

// this could have easily been an object literal... haha:
class Base100 {
  constructor(size) {
    this.b100 = [];
    this.combos = [];
    this.size = size;
    for (let i = 0; i < size; i++) {
      this.b100[i] = 0;
    }
  }
  add1() {
    this.b100[0]++;
    for (let i = 0; i < this.size - 1; i++) {
      if (this.b100[i] > 100) {
        this.b100[i] = 0;
        this.b100[i + 1]++;
      }
    }
  }
  make() {
    while (this.b100[this.size - 1] !== 100) {
      let sum = this.b100.reduce((acc, current) => acc + current);
      if (sum === 100) {
        this.combos.push([...this.b100]);
      }
      this.add1();
    }
  }
  mix(props) {
    let highest = 0;

    this.combos.forEach((combo) => {
      let capa = 0;
      let dura = 0;
      let flav = 0;
      let text = 0;
      let cal = 0;
      combo.forEach((spoons, index) => {
        capa += props[index][0] * spoons;
        dura += props[index][1] * spoons;
        flav += props[index][2] * spoons;
        text += props[index][3] * spoons;
        cal += props[index][4] * spoons;
      });
      if (capa < 0) capa = 0;
      if (dura < 0) dura = 0;
      if (flav < 0) flav = 0;
      if (text < 0) text = 0;
      let result = capa * dura * flav * text || 0;

      // PART TWO:
      //   if (cal !== 500) result = 0; // result: 117936

      if (result > highest) highest = result;
    });

    return highest;
  }
}

let b = new Base100(4);
b.make();
console.log("highest score cookie:", b.mix(justNumbers)); // result : 222870
