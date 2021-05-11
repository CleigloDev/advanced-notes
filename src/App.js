import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div style={{height: "85vh", width: "70vw"}} className="box-shadow">
      <div style={{height: "85%", backgroundColor: "black"}}></div>
      <div style={css["bottom-container"]}>
        <div className="input-container">
          <input placeholder="Enter note about the process" className="input"/>
        </div>
        <div className="button-container">
          <button type="button" className="button">Publish</button>
        </div>
      </div>
    </div>
  );
}

const css = {
  "bottom-container": {
    height: "15%", 
    backgroundColor: "#eff2f7", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center"
  }
}

export default App;
