// 複数の同じ型のオブジェクトの間でプロパティを共有する
// 今回はdogのプロパティをそれを継承する形でpet1などを宣言するjsの仕様を利用することで共通のプロパティとして利用できる→メソッドやプロパティの重複を避けられる
const dog = {
  bark() {
    console.log(`Woof!`);
  },
};

const pet1 = Object.create(dog);

pet1.bark(); // Woof!
console.log("Direct properties on pet1: ", Object.keys(pet1));
console.log("Properties on pet1's prototype: ", Object.keys(pet1.__proto__));

// console.log("Direct properties on pet1: ", Object.keys(pet1));

// この行は、pet1 オブジェクトに直接定義されているプロパティのキーを表示します。Object.keys() メソッドは、オブジェクトの自身の列挙可能なプロパティ（プロトタイプチェーンを通じて継承されたプロパティは含まれない）の配列を返します。
// このケースでは、pet1 は Object.create(dog) によって生成され、dog オブジェクトのプロパティをプロトタイプとして継承しますが、自身に直接追加されたプロパティはありません。したがって、出力は空の配列 [] になります。
// console.log("Properties on pet1's prototype: ", Object.keys(pet1.__proto__));

// こちらの行は、pet1 オブジェクトのプロトタイプ（__proto__ プロパティを介してアクセスされる）に存在するプロパティのキーを表示します。ここでも Object.keys() メソッドが使われ、列挙可能なプロパティのみがリストされます。
// pet1 のプロトタイプは dog オブジェクトであり、dog には bark メソッドが定義されています。これが列挙可能なプロパティとして設定されているため、出力には ['bark'] が含まれます。
// この２行の出力は、JavaScriptのオブジェクトのプロトタイプ継承とプロパティの列挙に関する振る舞いを示しています。Object.keys() はそのオブジェクトに直接存在する列挙可能なプロパティのみを取り出すため、プロトタイプにあるプロパティはリストされません。
