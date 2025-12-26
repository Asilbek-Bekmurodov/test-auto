import React from "react";
import styled from "styled-components";

const CubesLoader: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="cubes">
          {/* 64 ta cube */}
          {Array.from({ length: 64 }).map((_, idx) => (
            <div className="cube" key={idx}>
              {Array.from({ length: 6 }).map((_, sideIdx) => (
                <div className="side" key={sideIdx} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 160px;
    height: 160px;
    margin-top: -80px;
    margin-left: -80px;
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  .cubes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateX(60deg) rotateZ(-135deg);
    animation: cubes 8s cubic-bezier(0, 0, 1, 1) infinite;
  }

  .cube {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    opacity: 0;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    animation: cube 2s cubic-bezier(0.64, 0.21, 0.42, 0.85) infinite;
  }

  @keyframes cube {
    0% {
      opacity: 0;
      transform: translateZ(100px);
    }
    40%,
    60% {
      opacity: 1;
      transform: translateZ(10px);
    }
    100% {
      opacity: 0;
      transform: translateZ(-100px);
    }
  }

  .side {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .side:nth-child(1) {
    transform: rotateX(-180deg) translateZ(10px);
    background-color: #1e3f57;
  }
  .side:nth-child(2) {
    transform: rotateY(-90deg) translateZ(10px);
    background-color: #6bb2cd;
  }
  .side:nth-child(3) {
    transform: rotateY(90deg) translateZ(10px);
    background-color: #6bb2cd;
  }
  .side:nth-child(4) {
    transform: rotateX(90deg) translateZ(10px);
    background-color: #3c617d;
  }
  .side:nth-child(5) {
    transform: rotateX(-90deg) translateZ(10px);
    background-color: #3c617d;
  }
  .side:nth-child(6) {
    transform: translateZ(10px);
    background-color: #1e3f57;
  }

  /* Cube positions va animatsiya delays */
  ${[...Array(64)]
    .map(
      (_, i) => `
    .cube:nth-child(${i + 1}) {
      left: ${20 * (i % 8)}px;
      top: ${20 * Math.floor(i / 8)}px;
      animation-delay: ${50 + i * 50}ms;
    }
  `
    )
    .join("\n")}

  @keyframes cubes {
    0% {
      transform: rotateX(60deg) rotateZ(-135deg);
    }
    100% {
      transform: rotateX(60deg) rotateZ(225deg);
    }
  }
`;

export default CubesLoader;
