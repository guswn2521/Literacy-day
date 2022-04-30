import React, { useState } from "react";
import useWindowSize from "../useWindowSize";
import {
  OverFlow,
  SlideContainer,
  SlideInner,
  SlideItem,
  BottonContainer,
  PrevBtn,
  NextBtn,
} from "../../styles/SlideStyle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const initTransition = "transform 0.5s";
export default function Slide({ elements }) {
  const [curIndex, setCurIndex] = useState(1);
  const [curTransition, setCurTransition] = useState(initTransition);
  const [isSwiping, setIsSwiping] = useState(false);
  const [slideX, setSlideX] = useState(null);
  const [prevSlideX, setPrevSlideX] = useState(false);
  const [windowWidth, windowHeight] = useWindowSize();
  const ORIGINSIZE = elements.length;
  const infiniteElements = [elements[ORIGINSIZE - 1], ...elements, elements[0]];
  const NEWSIZE = infiniteElements.length;

  const getNewItemWidth = () => {
    let itemWidth = windowWidth;
    itemWidth = itemWidth > 1024 ? 1024 : itemWidth;
    return itemWidth;
  };
  const getClientX = (event) => {
    return event._reactName === "onTouchStart"
      ? event.touches[0].clientX
      : event._reactName === "onTouchMove" || event._reactName === "onTouchEnd"
      ? event.changedTouches[0].clientX
      : event.clientX;
  };

  const handleTouchStart = (e) => {
    setPrevSlideX((prevSlideX) => getClientX(e));
  };

  const handleTouchMove = (e) => {
    if (prevSlideX) {
      setSlideX((slideX) => getClientX(e) - prevSlideX);
    }
  };

  const handleMouseSwipe = (e) => {
    if (slideX) {
      const currentTouchX = getClientX(e);
      if (prevSlideX > currentTouchX + 100) {
        handleSlide(curIndex + 1);
      } else if (prevSlideX < currentTouchX - 100) {
        handleSlide(curIndex - 1);
      }
      setSlideX((slideX) => null);
    }
    setPrevSlideX((prevSlideX) => null);
  };

  const handleSwipe = (direction) => {
    setIsSwiping(true);
    handleSlide(curIndex + direction);
  };

  const replaceSlide = (index) => {
    setTimeout(() => {
      setCurTransition("0s");
      setCurIndex(index);
    }, 500);
  };

  const handleSlide = (index) => {
    setCurIndex(index);
    if (index <= 0) {
      index += ORIGINSIZE;
      replaceSlide(index);
    } else if (index - 2 >= ORIGINSIZE - 1) {
      index -= ORIGINSIZE;
      replaceSlide(index);
    }
    setCurTransition(initTransition);
  };

  return (
    <>
      <OverFlow>
        <SlideContainer
          width={`${NEWSIZE * 1024}px`}
          transform={`translate(${-1024 * curIndex}px)`}
          transition={curTransition}
          onMouseOver={() => setIsSwiping(true)}
          onMounseOut={() => setIsSwiping(false)}
        >
          {infiniteElements.map((e, index) => (
            <SlideInner
              key={index}
              onMouseDown={handleTouchStart}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onMouseMove={handleTouchMove}
              onMouseUp={handleMouseSwipe}
              onTouchEnd={handleMouseSwipe}
              onMouseLeave={handleMouseSwipe}
            >
              <SlideItem width={getNewItemWidth}>{e}</SlideItem>
            </SlideInner>
          ))}
        </SlideContainer>
      </OverFlow>
      <BottonContainer>
        <PrevBtn onClick={() => handleSwipe(-1)}>
          <ArrowBackIosIcon fontSize="large" />
        </PrevBtn>
        <NextBtn onClick={() => handleSwipe(1)}>
          <ArrowForwardIosIcon fontSize="large" />
        </NextBtn>
      </BottonContainer>
    </>
  );
}
