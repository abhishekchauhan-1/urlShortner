import "./Style.css";
import backGroundImg from "./assets/illustration-working.svg";

function HomePage() {
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="navbar-container">
            <div className="navbar">
              <div className="logo">
                <h1>Shortly</h1>
              </div>
              <div className="nav-links">
                <ul>
                  <li>
                    <a href="#">Features</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                </ul>
              </div>
              <button>Get Started</button>
            </div>
            <div className="textImageDiv">
              <div className="textDiv">
                <h1>More Than Just <br/>Shorter Links</h1>
                <h4>
                  Build your brand’s recognition and get detailed insights on
                  how your links are performing.
                </h4>
                <button className="textButton">Get Started</button>
              </div>
              <div className="imgDiv">
                <img src={backGroundImg} alt="background Image" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bodySection">

        </div> */}
      </div>
    </>
  );
}
export default HomePage;
