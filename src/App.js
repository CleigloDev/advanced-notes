import logo from './images/images.jpg';
import './App.css';

function App() {
  return (
    <div style={{height: "85vh", width: "70vw"}} className="box-shadow">
      <div style={{height: "85%", backgroundColor: "red", display: "flex", flexDirection: "column", overflowY: "auto"}}>
        <dl>
          <div className="note-container">
            <div style={{backgroundColor: 'wheat', height: "auto", width: "70%", display: "flex", flexDirection: "row", marginRight: '1rem', marginLeft:'1rem'}}>
              <div className="image" style={{borderRadius: "3rem", borderColor: "blue", borderWidth: "1px", height: "5vh", width: "5vh", margin: "1vh"}} />
              <div style={{backgroundColor: 'blue', minHeight: "15vh", width: "93%", margin: '1vh'}}>
                <div style={{backgroundColor: 'white', display: 'flex', flexDirection: 'row', 
                  width: "auto", height: "5vh", justifyContent: 'space-between', alignItems: 'center'}}>
                  <text>Carlo Lunetta</text>
                  <text>12/05/2021</text>
                </div>
                <div style={{backgroundColor: 'pink', paddingTop: "3vh", paddingBottom: "3vh", paddingRight: "5vh", paddingLeft: "3vh", alignItems: 'center'}}>
                  <text>If a note is greater than three rows trim the rest of the content and show a “Read More” CTA that
  expands the note message with the whole text.If a note is greater than three rows trim the rest of the</text>
                </div>
              </div>          
            </div>
          </div>
        </dl>
      </div>

      
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
