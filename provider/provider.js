// 複数の子コンポーネントからデータを利用できるようにする。コンポーネントツリーのずっと下の方に props を渡していく、prop のバケツリレー (prop drilling) と呼ばれる事態については、データを使う必要のないコンポーネントのレイヤーをすべてスキップできれば最善
// Context:Reactの機能、プロパティ(props)をコンポーネントツリーの各階層に手動で渡すことなくコンポーネント間でデータを共有できるようにするもの、ProviderはContextで定義されたデータを供給するコンポーネント
import React, { useState, createContext, useContext, useEffect } from "react"; // ReactとそのHooksをインポート
import ReactDOM from "react-dom"; // domレンダリング機能を提供
import moment from "moment"; // 日付、時間の操作を提供するライブラリ

import "./styles.css";

// Context;コンテキストを作成
const CountContext = createContext(null);

// CountContextをリセットする関数
function Reset() {
  const { setCount } = useCountContext(); // useCountContext:l:36に定義

  return (
    <div className="app-col">
      <button onClick={() => setCount(0)}>Reset count</button>
      <div>Last reset:{moment().format("h:mm:ss a")}</div>
    </div>
  );
}

// ぼたん？
function Button() {
  const { count, setCount } = useCountContext();

  return (
    <div className="app-col">
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <div>Current count:{count}</div>
    </div>
  );
}

function useCountContext() {
  const context = useContext(CountContext);
  if (!context)
    throw new Error(
      "useCountContext has to be used within CountContextProvider"
    );
  return context;
}

function CountContextProvider({ children }) {
  // useState:状態変数を関数コンポ―ネントに追加するためのフック、これにより以前はクラスコンポーネントでしか使えなかったreactの機能(状態管理、ライフサイクルイベントのハンドリング)を関数コンポーネントでもしようできるようになる
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

function App() {
  return (
    <div className="App">
      <CountContextProvider>
        <Button />
        <Reset />
      </CountContextProvider>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
