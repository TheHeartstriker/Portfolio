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
}) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const totalMedia = mediaArray.length;

  const handlePrevious = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + totalMedia) % totalMedia);
  };

  const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % totalMedia);
  };
  return (
    <div className="skill-past-item">
      {first && <Separator header="My Past Work" para={lorem} />}
      {/*  */}
      {/* Main section both text and image*/}
      {/*  */}
      <div className={`skill-past-item-main ${reverse ? "reverse" : ""}`}>
        <div className="skill-past-item-main-text">
          <h3>{header}</h3>
          <p>{para1}</p>
          <p>{para2}</p>
        </div>
        <div className="skill-past-item-main-image">
          {/*  */}
          {/* Input our current element either image or vide */}
          {mediaArray[currentMediaIndex].endsWith(".mp4") ||
          mediaArray[currentMediaIndex].endsWith(".webm") ||
          mediaArray[currentMediaIndex].endsWith(".mov") ? (
            <video
              src={mediaArray[currentMediaIndex]}
              autoPlay
              muted
              loop
            ></video>
          ) : (
            <img src={mediaArray[currentMediaIndex]} alt="" />
          )}
          <button className="skill-past-item-main-image-link">
            <a href={link} target="_blank" rel="noopener noreferrer" />
            <Arrow />
          </button>
          <div className="skill-past-item-main-image-con">
            <button onClick={handlePrevious}>
              <Arrow />
            </button>
            {/* Iterate over mediaArray */}
            {mediaArray.map((imgVi, index) => (
              <span
                key={index}
                className={currentMediaIndex === index ? "active" : ""}
              ></span>
            ))}
            <button onClick={handleNext}>
              <Arrow />
            </button>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Bottom stats section */}
      <div className={`skill-past-item-stats ${reverse ? "reverse" : ""}`}>
        <div className="skill-past-item-stats-con">
          <h4>Role</h4>
          <p>{rolePara}</p>
        </div>
        <div className="skill-past-item-stats-con">
          <h4>Scope</h4>
          <p>{scopePara}</p>
        </div>
        <div className="skill-past-item-stats-con-sq">
          {servicesArr.map((tag, index) => (
            <div className="skill-past-item-stats-con-sq-it" key={index}>
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
