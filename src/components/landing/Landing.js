import React, { useState, useEffect, useRef } from "react";

import entrance from "../../images/entrance.jpg";
import livingRoom from "../../images/livingroom.jpg";
import kitchen from "../../images/kitchen.jpg";
import chefIll from "../../images/chef.svg";
import travelIll from "../../images/travel.svg";
import homeIll from "../../images/home.svg";

import "../../styles/landing.css";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

const images = [entrance, kitchen, livingRoom];
const color = ["#00853f", "#fdef42", "#e31b23"];

const delay = 8000;
const Landing = () => {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(0);
  const [animate, setAnimate] = useState(true);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    const landing = document.getElementById("landing");
    const dark = document.getElementById("darken");
    if (open) {
      dark.style.backgroundColor = "rgba(0,0,0,.9)";
      dark.style.zIndex = "101";
      landing.style.filter = "grayscale(90%)";
    } else {
      landing.style.filter = "grayscale(0)";
      dark.style.zIndex = "1";
      dark.style.backgroundColor = "inherit";
    }
  }, [open]);

  useEffect(() => {
    images.push(images[index]);

    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);
    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="landing" id="landing">
      <div className="landing-slide-container">
        <div className="darken" id="darken"></div>{" "}
        {[color[0], color[1], color[2]].map((color, idx) => (
          <div
            key={idx}
            className={`pagination${index % 3 === idx ? " active" : ""}`}
            style={{
              background: color,
              "--marginIndex": idx - 1
            }}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}vw, 0, 0)` }}
        >
          {images.map((image, i) => (
            <img
              className={(i === index) & 3 ? "slide grow" : "slide"}
              key={i}
              src={image}
            />
          ))}
        </div>
        <div className="landing-content">
          <div
            className="content-info animate-content"
            style={{ "--bg": color[index % 3] }}
          >
            {index % 3 === 0 && (
              <div className="info">
                <img
                  src={homeIll}
                  alt="home illustration"
                  className="info-illustration"
                />
                <div className="description">
                  {" "}
                  In the heart of Senegal, is our beautiful two floor house open
                  to anyone looking for a relaxing, luxarious vacation.
                </div>
                <Link
                  to="/book"
                  className={`info-button `}
                  style={{ "--bg": color[0] }}
                >
                  {" "}
                  Book Today
                </Link>
              </div>
            )}
            {index % 3 === 1 && (
              <div className="info">
                <img
                  src={travelIll}
                  alt="travel illustration"
                  className="info-illustration"
                />
                <div className="description">
                  {" "}
                  Located in a desirable location in Dakar, Senegal, you will
                  never be bored. We offer a tour guide that can help you
                  explore our beaches, safaris, and historical areas!
                </div>
                <HashLink
                  to="/#attractions"
                  className={`info-button`}
                  style={{ "--bg": color[1] }}
                >
                  View Options
                </HashLink>
              </div>
            )}
            {index % 3 === 2 && (
              <div className="info">
                <img
                  src={chefIll}
                  alt="cook illustration"
                  className="info-illustration"
                />
                <div className="description">
                  {" "}
                  Never worry about cooking when you stay with us! We offer
                  access to a personal chef who cooks and provides cooking
                  lessons of the most famous Senegalese cuisines!
                </div>
                <HashLink
                  className={`info-button `}
                  style={{ "--bg": color[2] }}
                  to="/#chef"
                >
                  {" "}
                  See more{" "}
                </HashLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
