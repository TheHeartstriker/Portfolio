import { useState } from "react";
import Arrow from "../../../../out/icons/arrow";
import { Separator } from "@/components/forViews/seperator";
import { lorem } from "@/utils/text";

export function WorkCard({
  header,
  para1,
  para2,
  mediaArray,
  scopePara,
  rolePara,
  servicesArr,
  reverse,
  first,
  link,
  active,
  onMouseEnter,
}) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalMedia = mediaArray.length;

  const handleMediaChange = (newIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMediaIndex(newIndex);
      setIsTransitioning(false);
    }, 300); // Half of transition duration
  };

  const handlePrevious = () => {
    const newIndex = (currentMediaIndex - 1 + totalMedia) % totalMedia;
    handleMediaChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentMediaIndex + 1) % totalMedia;
    handleMediaChange(newIndex);
  };

  return (
    <div className="skill-past-item">
      {first && <Separator header="My Past Work" para={lorem} />}
      <div className={`skill-past-item-main ${reverse ? "reverse" : ""}`}>
        <div className="skill-past-item-main-text">
          <h3>{header}</h3>
          <p>{para1}</p>
          <p>{para2}</p>
        </div>
        <div className="skill-past-item-main-image">
          {mediaArray[currentMediaIndex].endsWith(".mp4") ||
          mediaArray[currentMediaIndex].endsWith(".webm") ||
          mediaArray[currentMediaIndex].endsWith(".mov") ? (
            <video
              src={mediaArray[currentMediaIndex]}
              autoPlay
              muted
              loop
              className={isTransitioning ? "fade-out" : "fade-in"}
            ></video>
          ) : (
            <img
              src={mediaArray[currentMediaIndex]}
              alt=""
              className={isTransitioning ? "fade-out" : "fade-in"}
            />
          )}
          <button className="skill-past-item-main-image-link">
            <a href={link} target="_blank" rel="noopener noreferrer" />
            <Arrow />
          </button>
          <div className="skill-past-item-main-image-con">
            <button onClick={handlePrevious}>
              <Arrow />
            </button>
            {mediaArray.map((imgVi, index) => (
              <span
                key={index}
                className={
                  currentMediaIndex === index
                    ? "skill-past-item-main-image-con-span"
                    : ""
                }
              ></span>
            ))}
            <button onClick={handleNext}>
              <Arrow />
            </button>
          </div>
        </div>
      </div>
      <div className={`skill-past-item-stats ${reverse ? "reverse" : ""}`}>
        <div
          className={`skill-past-item-stats-con ${active === 1 ? "active" : ""}`}
          onMouseEnter={() => onMouseEnter(1)}
        >
          <h4>Role</h4>
          <p>{rolePara}</p>
        </div>
        <div
          className={`skill-past-item-stats-con ${active === 2 ? "active" : ""}`}
          onMouseEnter={() => onMouseEnter(2)}
        >
          <h4>Scope</h4>
          <p>{scopePara}</p>
        </div>
        <div
          className="skill-past-item-stats-con-sq"
          onMouseEnter={() => onMouseEnter(3)}
        >
          {servicesArr.map((tag, index) => (
            <div
              className={`skill-past-item-stats-con-sq-it ${active === 3 ? "active" : ""}`}
              key={index}
            >
              <div className="skill-past-item-stats-con-sq-it-text">
                <h5>{tag}</h5>
                <h6>Services</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
