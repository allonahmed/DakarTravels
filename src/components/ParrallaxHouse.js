import { DisplaySettings } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { Parallax } from "react-parallax";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import HouseGallery from "./HouseGallery";
import background from "../images/backgroundgallery.jpg";
import "../styles/housegallery.css";
import LandingGallery from "./landing/LandingGallery";
import {
  house1,
  house2,
  house3,
  house4,
  house5,
  house6,
  house7,
  house8,
  house9,
  house10,
  house11,
  house12,
  house13,
  house14,
  house15
} from "../images/houseimages/houseimages";
import { PortalWithState } from "react-portal";
import "swiper/css";
import "swiper/css/effect-cards";

const images = [
  house1,
  house2,
  house3,
  house4,
  house5,
  house6,
  house7,
  house8,
  house9,
  house10,
  house11,
  house12,
  house13,
  house14,
  house15
];

const r1 = parseInt(Math.random() * (14 - 1) + 1);
const r2 = parseInt(Math.random() * (14 - 1) + 1);
const r3 = parseInt(Math.random() * (14 - 1) + 1);
const r4 = parseInt(Math.random() * (14 - 1) + 1);
const r5 = parseInt(Math.random() * (14 - 1) + 1);

const ParallaxHouse = () => {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(0);
  return (
    <div className="house-container" id="house">
      <Parallax strength={300} bgImage={background}>
        <div className="lighten">
          <div className="house-content">
            <div className="gallery-container">
              <img
                className="home-slider-image"
                src={images[r1]}
                style={{ transform: "rotate(3deg)" }}
              />
              <img
                className="home-slider-image"
                src={images[r2]}
                style={{ transform: "rotate(7.5deg)" }}
              />
              <img
                className="home-slider-image"
                src={images[r3]}
                style={{ transform: "rotate(0deg)" }}
              />
              <img
                className="home-slider-image"
                src={images[r4]}
                style={{ transform: "rotate(-3deg)" }}
              />
              <PortalWithState
                closeOnOutsideClick
                closeOnEsc
                node={document && document.getElementById("modal")}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
              >
                {({ openPortal, closePortal, isOpen, portal }) => (
                  <React.Fragment>
                    <img
                      className="home-slider-image last"
                      id="last"
                      src={images[r5]}
                      style={
                        hovered
                          ? {
                              transform: "rotate(-7.5deg)",
                              filter: "grayscale(1)"
                            }
                          : { transform: "rotate(-7.5deg)" }
                      }
                      onMouseEnter={() => {
                        setHovered(true);
                      }}
                      onMouseLeave={() => {
                        setHovered(false);
                      }}
                      onClick={openPortal}
                    />
                    <div
                      className={hovered ? "hovered-gallery" : "click-gallery"}
                      style={{ transform: "rotate(-7.5deg)" }}
                      onMouseEnter={() => {
                        setHovered(true);
                      }}
                      onMouseLeave={() => {
                        setHovered(false);
                      }}
                      onClick={openPortal}
                    >
                      See more
                    </div>
                    {portal(
                      <LandingGallery onClose={closePortal} gallery={images} />
                    )}
                  </React.Fragment>
                )}
              </PortalWithState>
            </div>
            <div className="house-info">
              <h2>About Dakar's Rental</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Click <a>here</a> for directions
              </p>
              <button className="house-book-now">Book Now</button>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default ParallaxHouse;
