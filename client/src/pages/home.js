import React from "react"
import { useRef } from "react"
import { Link } from "react-router-dom"
import '../style/home.css'
import image1 from "../images/1.1.jpg"
import image2 from "../images/2.2.jpg"
import image3 from "../images/3.3.jpg"
import image4 from "../images/4.4.jpg"
import image5 from "../images/5.5.jpg"
import image6 from "../images/6.6.jpg"

const Home = () => {

  const about = useRef(null)
  const customer = useRef(null)
  const employee = useRef(null)
  const manager = useRef(null)

  const scrollToDiv = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth"
    })
  }

  return (
    <div className="home-container">
      <div className="homeheader">
        <div className="home-links">
          <Link onClick={() => scrollToDiv(about)}>Rólunk</Link>
          <Link onClick={() => scrollToDiv(customer)}>Felhasználó</Link>
          <Link onClick={() => scrollToDiv(employee)}>Alkalmazott</Link>
          <Link onClick={() => scrollToDiv(manager)}>Vezetőség</Link>
        </div>
        <Link to="/" className="home-logo">Company</Link>
      </div>
        <div ref={customer} className="homelogincust">
          <div className="top-middle-link">
            <Link to="/">Felhasználó</Link>
          </div>
          <div className="homelogincust-links">
            <div className="login-box1">
                <Link to="/logincustomer">Jelentkezz be</Link>
              </div>
              <div className="login-box2">
                <Link to="/registercustomer">Hozz létre fiókot</Link>
            </div>
            <p>Ha velünk szeretnéd megélni a jövő kalandjait</p>
          </div>
      </div>
      <div ref={employee} className="homeloginemp">
          <div className="top-middle-link">
            <Link to="/">Alkalmazott</Link>
          </div>
        <div className="homeloginemp-links">
            <div className="login-box1">
                <Link to="/loginemployee">Jelentkezz be</Link>
              </div>
            </div>
            <p>Hogy velünk építhesd a jövőt</p>
      </div>
      <div ref={manager} className="homeloginman">
          <div className="top-middle-link">
            <Link to="/">Vezetőség</Link>
          </div>
        <div className="homeloginman-links">
            <div className="login-box1">
                <Link to="/loginmanager">Jelentkezz be</Link>
              </div>
            </div>
            <p>Hogy a jövő változásait együtt alapozzuk meg</p>
      </div>
      <div ref={about} className="homeabout">
          <h1><Link>Rólunk</Link></h1>
          <p>Deserunt laborum voluptate ea do amet nostrud occaecat culpa nostrud sunt. Consectetur labore sunt sint anim nulla sunt ad do magna minim do qui ad duis. Sit velit non excepteur ex aute minim cillum ex eu consequat anim nulla ex. Ut commodo proident nisi sit id aliquip mollit esse irure ea consequat consequat cillum cupidatat. Mollit commodo labore veniam ea occaecat deserunt consectetur voluptate commodo dolore. Qui dolore sunt quis dolor consectetur enim. Officia exercitation cillum irure incididunt anim nostrud sint.Do aliquip dolor fugiat cillum. Aliquip sunt voluptate do do velit et esse et. Nulla proident commodo velit enim laboris enim occaecat deserunt. Nulla incididunt aute dolore et nulla laborum Lorem ut dolore aliquip excepteur. Duis ut cillum in amet tempor consequat id quis consectetur eiusmod nostrud. Mollit dolor anim velit aute consequat ut.Lorem laborum irure ex deserunt id labore. Excepteur laboris ut dolor consectetur adipisicing adipisicing. Exercitation non cupidatat ullamco fugiat pariatur. Enim labore id mollit duis. Consectetur nisi veniam velit id nulla.Magna nisi dolore ut velit minim consequat officia. Culpa ad veniam aliquip irure. Magna mollit amet cillum ad consectetur magna culpa.</p>
          <div className="homegallery">
            <h1><Link>Galéria</Link></h1>
            <div className="gallery-container">
            <div className="box-container">
              <div className="box">
                <div className="image">
                  <img src={image1} alt="1" />
                </div>
              </div>
              <div className="box">
                <div className="image">
                  <img src={image2} alt="1" />
                </div>
              </div>
              <div className="box">
                <div className="image">
                  <img src={image3} alt="1" />
                </div>
              </div>
              <div className="box">
                <div className="image">
                  <img src={image4} alt="1" />
                </div>
              </div>
              <div className="box">
                <div className="image">
                  <img src={image5} alt="1" />
                </div>
              </div>
              <div className="box">
                <div className="image">
                  <img src={image6} alt="1" />
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  )
}

export default Home