const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};

// 上述のインスタンスpersonを直接渡している。ProxyクラスがJSで標準で提供されていて、それに対して二つの引数を以下のようにして渡すことでプロキシとしてインスタンスが作用するようになっている、Proxy内でReflectを使用することが推奨されている
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(
        "hmm...this property doesn't seem to exist on the target object"
      );
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log("Sorry, you can only pass numeric values for age.");
    } else if (prop === "name" && value.length < 2) {
      console.log("You need to provide a valid name");
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
      // obj[prop] = value; // ここで代入が失敗する可能性に対しての何の対策もしていない
      // 代わりにReflectの利用、内部でエラーハンドリングなどしてくれる
      return Reflect.set(obj, prop, value);
    }
  },
});

// 上記で用意したインスタンス本体とプロキシを用いて実際の処理パターンとしての挙動を確認
// まず失敗するテストスイート
personProxy.nonExistentProperty; // personProxyのnonExistentPropertyにアクセスしようとしているが、ないため、Proxyのgetトラップのl:10行目がトリガーされる
personProxy.age = "44";
personProxy.name = "";

// 成功するテストスイートと確認の出力
personProxy.age = 20;
personProxy.name = "カピバラ";
// personのメンバが変更されたことを確認
personProxy.age;
personProxy.name;
