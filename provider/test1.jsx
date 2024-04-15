const DataContext = React.createContext();

function App() {
  const data = {
    listItem: "Item 1",
    text: "Hello from Text component",
    title: "Welcome to Header",
  };

  return (
    <div>
      <DataContext.Provider value={data}>
        <SideBar />
        <Content />
      </DataContext.Provider>
    </div>
  );
}

const SideBar = () => <List />;
const List = () => <ListItem />;
const Content = () => (
  <div>
    <Header />
    <Block />
  </div>
);
const Block = () => <Text />;

function ListItem() {
  const { data } = React.useContext(DataContext);
  return <span>{data.listItem}</span>;
}

function Text() {
  const { data } = React.useContext(DataContext);
  return <h1>{data.text}</h1>;
}

function Header() {
  const { data } = React.useContext(DataContext);
  return <div>{data.title}</div>;
}
