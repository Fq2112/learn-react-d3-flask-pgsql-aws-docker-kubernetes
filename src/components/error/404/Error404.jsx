import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { titleScroller } from "../../../utils/utils";
import { t } from "i18next";
import { path } from "../../../utils/const";
import "./Error404.css";

const AstronautAntena = ({ antena }) => {
  return (
    <div className={`astronaut-antena antena--${antena}`}>
      <div className="ear-down"></div>
      <div className="ear-up"></div>
      <div className="antena"></div>
      <div className="antena-tip"></div>
    </div>
  );
};

const AstronautHand = ({ hand }) => {
  return (
    <div className={`astronaut-hand hand--${hand}`}>
      <svg width="35" height="75">
        <path
          d="M30.23 17.209c-7.925 5.118-11.657 12.786-11.226 22.975-7.113.934-12.948 4.345-18.44 5.117C-1.951 26.539 3.92 9.346 18.635 1.369 30.66-4.39 39.53 9.398 30.23 17.209z"
          fill="#D2D2D2"
        />
        <g fill="none" stroke="#999" strokeLinecap="round">
          <path d="M11.78 6.977c7.983.129 13.547 3.968 16.308 11.111M4.67 17.161c7.307-.379 13.1 1.924 17.93 6.94" />
          <path
            d="M.816 31.334c6.439-2.441 12.295-1.746 18.149 2.488"
            strokeLinejoin="round"
          />
        </g>
        <g fill="#fff">
          <path d="M7.721 37.171c5.875-1.994 12.264 1.156 14.258 7.031l1.218 3.588c1.995 5.875-1.156 12.264-7.03 14.258-5.875 1.995-12.264-1.156-14.259-7.031L.69 51.429c-1.994-5.875 1.156-12.263 7.031-14.258z" />
          <path d="M7.829 38.159c5.794-1.967 12.094 1.14 14.061 6.934l5.044 14.855c1.967 5.794-1.14 12.095-6.934 14.062-5.794 1.967-12.095-1.14-14.062-6.934L.895 52.221c-1.967-5.794 1.14-12.095 6.934-14.062z" />
          <path d="M16.863 39.472l12.879 7.384a3.876 3.876 0 0 1 1.433 5.287 3.875 3.875 0 0 1-5.286 1.433l-12.878-7.384a3.874 3.874 0 0 1-1.434-5.286 3.874 3.874 0 0 1 5.286-1.434z" />
        </g>
      </svg>
    </div>
  );
};

export default function Error404() {
  const navigate = useNavigate();

  useEffect(() => titleScroller(t("error.404.title")), []);

  useEffect(() => {
    const oh = document.querySelector(".circle.oh");

    const handleMouseMove = (event) => {
      const domainX = [0, document.body.clientWidth];
      const domainY = [0, document.body.clientHeight];
      const range = [-10, 10];
      const translate = {
        x:
          range[0] +
          ((event.clientX - domainX[0]) * (range[1] - range[0])) /
            (domainX[1] - domainX[0]),
        y:
          range[0] +
          ((event.clientY - domainY[0]) * (range[1] - range[0])) /
            (domainY[1] - domainY[0]),
      };

      oh.style.animation = "none";
      oh.style.transform = `translate(${translate.x}px, ${translate.y}px)`;
    };

    const handleMouseLeave = () =>
      (oh.style.animation = "floating 3s linear infinite");

    document.addEventListener("mousemove", (event) => handleMouseMove(event));
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", (event) =>
        handleMouseMove(event)
      );
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="error-wrapper">
      <div className="stars">
        {Array.from({ length: 80 }, (_, idx) => (
          <div className="star" key={idx} />
        ))}
      </div>
      <div className="center">
        <div className="circle circle--outer"></div>
        <div className="circle circle--inner">
          <div className="four four--1">4</div>
          <div className="four four--2">4</div>
          <div className="circle oh">
            <div className="astronaut">
              <div className="astronaut-backpack"></div>
              <div className="astronaut-head"></div>
              {["left", "right"].map((antena, idx) => (
                <AstronautAntena
                  key={`astronaut-antena-${idx}`}
                  antena={antena}
                />
              ))}
              <div className="astronaut-helmet">
                <div className="astronaut-glass"></div>
                <div className="glow glow--1"></div>
                <div className="glow glow--2"></div>
              </div>
              <div className="astronaut-body"></div>
            </div>
            <svg
              className="astronaut-wire"
              viewBox="-9 -9 259 823"
              width="259"
              height="823"
            >
              <path
                d="M241 0c-24 54-30 113-78 148S63 159 27 215c-35 55 32 102 73 141s103 94 98 166c-6 97-169 66-192 157-10 43-8 84 9 126"
                fill="none"
                strokeWidth="6"
                stroke="#FFF"
              />
            </svg>
            <div className="circle planet">
              <div className="craters">
                {[1, 2, 3, 4, 5, 6].map((v, idx) => (
                  <div
                    key={`crater-${idx}`}
                    className={`crater crater--${v}`}
                  />
                ))}
              </div>
            </div>
            <div className="astronaut-hands">
              {["left", "right"].map((hand, idx) => (
                <AstronautHand key={`astronaut-hand-${idx}`} hand={hand} />
              ))}
            </div>
          </div>
          <button onClick={() => navigate(path.home)}>
            {t("error.404.button")}
          </button>
        </div>
        <div className="sorry">{t("error.404.message")}</div>
      </div>
    </div>
  );
}
