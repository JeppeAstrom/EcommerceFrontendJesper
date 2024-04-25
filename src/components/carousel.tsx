'use client'
import ArrowLeft from '@/app/icons/arrowleft';
import EventHelper from '@/helpers/eventHelper';
import { createRef, useCallback, useEffect, useRef, useState } from 'react';


interface CalculationValues {
  startX: number;
  startY: number;
  startScrollLeft: number;
  isScrolling: boolean;
}

const defaultCalculationValues: CalculationValues = {
  startX: 0,
  startY: 0,
  startScrollLeft: 0,
  isScrolling: false,
};

interface Props {
  children: React.ReactNode[];
  visibleSlidesCountMobile: 1 | 2 | 3;
  visibleSlidesCountTablet: 1 | 2 | 3 | 4;
  visibleSlidesCountDesktop: 1 | 2 | 3 | 4 | 5 | 6;
  disableDrag?: boolean;
  useProgressBar?: boolean;
  hideArrows?:boolean;
  scrollByItself?:boolean;
}

const Carousel: React.FC<Props> = ({
  children: slides,
  visibleSlidesCountMobile,
  visibleSlidesCountTablet,
  visibleSlidesCountDesktop,
  disableDrag = false,
  useProgressBar = false,
  hideArrows = false,
  scrollByItself = false
}) => {
  // STATE
  const [calculationValues, setCalculationValues] =
    useState<CalculationValues>(defaultCalculationValues);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const [progressBar, setProgressbar] = useState<number>(0);
  // REFS
  const sliderRef = createRef<HTMLDivElement>();
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const [disableAutomatic, setDisableAutomatic] = useState<boolean>(false);
  // HANDLERS
  const handleDirectionClick = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>, carouselDirection?:'NEXT' | 'PREV') => {
      if(e){
        setDisableAutomatic(true);
      }
      const { current: slider } = sliderRef;
      const { current: slides } = slidesRef;
      if (!slider || slides.length <= 0) {
        return;
      }

      const direction = e ? e.currentTarget.dataset.direction : carouselDirection;
      const index = slides.findIndex((slide) => {
        if (direction === 'PREV') {
          return (
            slide.offsetLeft + slide.clientWidth >= slider.scrollLeft - slide.clientWidth &&
            slide.offsetLeft <= slider.scrollLeft
          );
        } else if (direction === 'NEXT') {
          return slide.offsetLeft >= slider.scrollLeft + slide.clientWidth;
        }
      });

      if (index <= -1) {
        return;
      }

      slider.scrollTo({ left: slides[index].offsetLeft, behavior: 'smooth' });
    },
    [sliderRef]
  );

  const initialLoadRef = useRef<boolean>(true);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);


  if(scrollByItself && initialLoadRef && !disableAutomatic){
    setTimeout(() => {
      handleDirectionClick(undefined, 'NEXT')
    }, 1500);
  }

  useEffect(() => {
    if(!disableAutomatic){

  
    let intervalId: any;
    // Initially set isAtEnd based on the first and last visible index
    const checkEnds = () => {
      if (visibleIndexes.length > 0) {
        if (
          visibleIndexes[0] === slides.length - 1 ||
          visibleIndexes[visibleIndexes.length - 1] === slides.length - 1
        ) {
          setIsAtEnd(true);
        } else if (visibleIndexes[0] === 0) {
          setIsAtEnd(false);
        }
      }
    };
  
    // Initialize end checks and set up interval
    checkEnds();
    if (scrollByItself) {
      intervalId = setInterval(() => {
        if (visibleIndexes.length > 0) {
          if (
            !visibleIndexes.includes(0) &&
            !visibleIndexes.includes(slides.length - 1) &&
            !isAtEnd
          ) {
            handleDirectionClick(undefined, 'NEXT');
          } else if (
            (isAtEnd && visibleIndexes[0] !== 0) ||
            (isAtEnd && visibleIndexes[visibleIndexes.length - 1] !== slides.length - 1)
          ) {
            // Ensure you are not at the first or last slide when moving PREV or NEXT
            handleDirectionClick(undefined, 'PREV');
          }
        }
      }, 1500);
    }
    return () => {
      clearInterval(intervalId);
    };
  }
  }, [scrollByItself, visibleIndexes]);

  
  

  useEffect(() => {
    const sliderPercentage =
      ((visibleIndexes[visibleIndexes.length - 1] + 1) / slides.length) * 100;
    setProgressbar(sliderPercentage);
  }, [visibleIndexes, slides.length]);


  useEffect(() => {
    const { current: slider } = sliderRef;
    const { current: slides } = slidesRef;
    if (!slider || !slides) {
      return;
    }
 
    const getCurrentXposition = (
      e:
        | React.MouseEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>
        | MouseEvent
        | TouchEvent
    ): number => {
      const { current: slider } = sliderRef;
      if (!slider) {
        return 0;
      }

      return EventHelper.isTouchEvent(e)
        ? e.targetTouches[0].pageX
        : (e as unknown as MouseEvent).pageX - slider.getBoundingClientRect().left;
    };

    const getCurrentYposition = (
      e:
        | React.MouseEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>
        | MouseEvent
        | TouchEvent
    ): number => (EventHelper.isTouchEvent(e) ? e.targetTouches[0].clientY : 0);

    const handleStart = (
      e:
        | React.MouseEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>
        | MouseEvent
        | TouchEvent
    ) => {
      const { current: slider } = sliderRef;
      if (!slider || calculationValues.isScrolling) {
        return;
      }

      setCalculationValues({
        startX: getCurrentXposition(e),
        startY: getCurrentYposition(e),
        startScrollLeft: slider.scrollLeft || 0,
        isScrolling: true,
      });
    };

    // scroll div when moving on mouse/touch move
    const handleMove = (
      e:
        | React.MouseEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>
        | MouseEvent
        | TouchEvent
    ): void => {
      const { current: slider } = sliderRef;
      if (!slider) {
        return;
      }
      setDisableAutomatic(true);
      const currentX = getCurrentXposition(e);
      // Determines if we're scrolling vertically, rather than horizontally and if so,
      // return without preventDefault to be able to scroll down
      if (
        EventHelper.isTouchEvent(e) &&
        Math.abs(getCurrentYposition(e) - calculationValues.startY) >
          Math.abs(currentX - calculationValues.startX)
      ) {
        return;
      }

      // Don't slide if more than one touch event. Makes the elements flicker
      if (
        calculationValues.isScrolling &&
        (EventHelper.isMouseEvent(e) ||
          (EventHelper.isTouchEvent(e) &&
            !(e.touches?.length == 2 && e.targetTouches?.length == 2)))
      ) {
        e.preventDefault();
        e.stopPropagation();
        slider.scrollTo({
          left: calculationValues.startScrollLeft - (currentX - calculationValues.startX),
        });
      }
    };

    // Scroll current slide into view on mouseup/mouseleave or touchend/touchcancel
    const handleEnd = (
      _:
        | React.MouseEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>
        | MouseEvent
        | TouchEvent
    ) => {
      const { current: slider } = sliderRef;
      const { current: slides } = slidesRef;
      if (!slider || !calculationValues.isScrolling) {
        return;
      }

      const { scrollLeft } = slider;

      const index = slides.findIndex((slide) => {
        const pos =
          // If true -> next image, else previous image
          scrollLeft > calculationValues.startScrollLeft
            ? scrollLeft + slide.clientWidth
            : scrollLeft;
        return pos >= slide.offsetLeft && pos <= slide.offsetLeft + slide.clientWidth;
      });

      setCalculationValues(defaultCalculationValues);

      if (index <= -1) {
        return;
      }

      slider.scrollTo({ left: slides[index].offsetLeft, behavior: 'smooth' });
    };

    const handleVisibleIndexes = () => {
      const visibleIndexes: number[] = [];
      slides.forEach((slide, index) => {
        if (
          slide.offsetLeft + slide.clientWidth >= slider.scrollLeft &&
          slide.offsetLeft <= slider.scrollLeft + slider.clientWidth
        ) {
          visibleIndexes.push(index);
        }
      });
      setVisibleIndexes(visibleIndexes);
    };

    // Set visible indexes on scroll. The timeout is to ensure that is happens when the scroll event has finished
    let timeout: number | undefined;
    const handleScroll = () => {
      timeout = window.setTimeout(handleVisibleIndexes, 10);
    };

    // Function that ensures a correct scroll position when resizing the window
    const handleResize = () => {
      const leftMostIndex = visibleIndexes[0];
      if (leftMostIndex <= -1) {
        return;
      }

      slider.scrollTo({ left: slides[leftMostIndex].offsetLeft });
      handleVisibleIndexes();
    };

    // Set visible slides after mount on initial load
    if (initialLoadRef.current) {
      handleVisibleIndexes();
      initialLoadRef.current = false;
    }

    // Only disable mouse events
    if (!disableDrag) {
      slider.addEventListener('mousedown', handleStart, { passive: false });
      slider.addEventListener('mousemove', handleMove, { passive: false });
      slider.addEventListener('mouseup', handleEnd, { passive: false });
      slider.addEventListener('mouseleave', handleEnd, { passive: false });
    }
    slider.addEventListener('touchstart', handleStart, { passive: false });
    slider.addEventListener('touchmove', handleMove, { passive: false });
    slider.addEventListener('touchend', handleEnd, { passive: false });
    slider.addEventListener('touchcancel', handleEnd, { passive: false });
    slider.addEventListener('scroll', handleScroll, { passive: false });
    window.addEventListener('resize', handleResize, { passive: false });

    return () => {
      slider.removeEventListener('mousedown', handleStart);
      slider.removeEventListener('touchstart', handleStart);
      slider.removeEventListener('mousemove', handleMove);
      slider.removeEventListener('touchmove', handleMove);
      slider.removeEventListener('mouseup', handleEnd);
      slider.removeEventListener('mouseleave', handleEnd);
      slider.removeEventListener('touchend', handleEnd);
      slider.removeEventListener('touchcancel', handleEnd);
      slider.removeEventListener('scroll', handleScroll);
      window.clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [disableDrag, sliderRef, slidesRef, initialLoadRef, calculationValues, visibleIndexes]);

  // STYLES
  let slideWidthClassMobile = '';
  let slideWidthClassTablet = '';
  let slideWidthClassDesktop = '';

  switch (visibleSlidesCountMobile) {
    case 1:
      slideWidthClassMobile = 'zero:max-md:flex-slides1';
      break;
    case 2:
      slideWidthClassMobile = 'zero:max-md:flex-slides2';
      break;
    case 3:
      slideWidthClassMobile = 'zero:max-md:flex-slides3';
      break;
  }

  switch (visibleSlidesCountTablet) {
    case 1:
      slideWidthClassTablet = 'md:max-lg:flex-slides1';
      break;
    case 2:
      slideWidthClassTablet = 'md:max-lg:flex-slides2';
      break;
    case 3:
      slideWidthClassTablet = 'md:max-lg:flex-slides3';
      break;
    case 4:
      slideWidthClassTablet = 'md:max-lg:flex-slides4';
      break;
  }

  switch (visibleSlidesCountDesktop) {
    case 1:
      slideWidthClassDesktop = 'lg:flex-slides1';
      break;
    case 2:
      slideWidthClassDesktop = 'lg:flex-slides2';
      break;
    case 3:
      slideWidthClassDesktop = 'lg:flex-slides3';
      break;
    case 4:
      slideWidthClassDesktop = 'lg:flex-slides4';
      break;
    case 5:
      slideWidthClassDesktop = 'lg:flex-[0_0_calc(20%-9.6px)]';
      break;
    case 6:
      slideWidthClassDesktop = 'lg:flex-[0_0_calc(16.666666%-10px)]';
      break;
  }

  // Outer wrapper
  return (
    <div className="relative">
      {/* Controls */}
      {visibleIndexes.length > 0 && !visibleIndexes.includes(0) && !hideArrows && (
        <button
          className="absolute w-10 h-10 bg-black top-1/2 left-0 -translate-y-1/2 z-[9]"
       
        
          data-direction="PREV"
          onClick={handleDirectionClick}
        >
          <ArrowLeft className='h-6 w-6 mx-auto' />
        </button>
      )}
      {visibleIndexes.length > 0 && !visibleIndexes.includes(slidesRef.current.length - 1) && !hideArrows && (
        <button
          className="absolute w-10 h-10 bg-black top-1/2 right-0 -translate-y-1/2 z-[9] rotate-180"
          
       
          data-direction="NEXT"
          onClick={handleDirectionClick}
        >
         <ArrowLeft  className='h-6 w-6 mx-auto'/>
        </button>
      )}
      {/* Inner wrapper (Slider) */}
      <div ref={sliderRef} className="flex overflow-x-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            draggable={false}
            key={`slide-${index}`}
            ref={(ref) => ref && !slidesRef.current.includes(ref) && slidesRef.current.push(ref)}
            className={`flex flex-col [&:not(:last-child)]:mr-[12px] ${slideWidthClassMobile} ${slideWidthClassTablet} ${slideWidthClassDesktop}`}
          >
            {slide}
          </div>
        ))}
      </div>
      {useProgressBar && (
        <div
          className={`inline-block w-full bg-border ${
            slides.length === visibleSlidesCountDesktop && 'lg:hidden'
          } ${slides.length === visibleSlidesCountTablet && 'md:max-lg:hidden'} ${
            slides.length === visibleSlidesCountMobile && 'zero:max-md:hidden'
          }`}
        >
          <div style={{ width: `${progressBar}%` }} className="h-[2px] bg-black"></div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
