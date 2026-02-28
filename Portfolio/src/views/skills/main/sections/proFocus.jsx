"use client";
import "./proFocus.css";

const client1 = "/skill/client1.webp";
const dynamicAnimations = "/DynamicShot.webp";
const fitShot = "/skill/FitShot.webp";
const todoShot = "/skill/todoShot.webp";
import UserGroup from "@/../public/icons/user-group";
import { Separator } from "@/components/forViews/seperator";

import { lorem, smallLorem } from "@/utils/text";

function ProFocus() {
  return (
    <>
      {/*  */}
      {/* Process container */}
      {/*  */}
      <div className="skill-process">
        <Separator header="My Process" para={lorem} />
        {/*  */}
        {/* Main container */}
        <div className="skill-process-main">
          {/* Leftside iamge */}
          <img src={dynamicAnimations} />
          {/* Main content */}
          <div className="skill-process-main-con">
            {/* Item1 */}
            <div className="skill-process-main-con-item">
              <div className="skill-process-main-con-item-num">
                <h4>01</h4>
              </div>
              <div className="skill-process-main-con-item-text">
                <h3>Discovery</h3>
                <p>{lorem}</p>
              </div>
            </div>
            {/* Item1 */}
            <div className="skill-process-main-con-item">
              <div className="skill-process-main-con-item-num">
                <h4>01</h4>
              </div>
              <div className="skill-process-main-con-item-text">
                <h3>Discovery</h3>
                <p>{lorem}</p>
              </div>
            </div>
            {/* Item1 */}
            <div className="skill-process-main-con-item">
              <div className="skill-process-main-con-item-num">
                <h4>01</h4>
              </div>
              <div className="skill-process-main-con-item-text">
                <h3>Discovery</h3>
                <p>{lorem}</p>
              </div>
            </div>
            {/* Item1 */}
            <div className="skill-process-main-con-item">
              <div className="skill-process-main-con-item-num">
                <h4>01</h4>
              </div>
              <div className="skill-process-main-con-item-text">
                <h3>Discovery</h3>
                <p>{lorem}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Process container */}
      {/*  */}
      <div className="skill-focus">
        {/*  */}
        {/* Image part */}
        <div className="skill-focus-image">
          <img src={fitShot} />
          <h2>My focuses</h2>
        </div>
        {/*  */}
        {/* card contianer */}
        <div className="skill-focus-con">
          {/* Item1 */}
          <div className="skill-focus-con-item">
            <div className="skill-focus-con-item-heading">
              <h3>
                User
                <br />
                experiance
              </h3>
              <UserGroup />
            </div>
            <p>{lorem}</p>
          </div>
          {/* Item1 */}
          <div className="skill-focus-con-item">
            <div className="skill-focus-con-item-heading">
              <h3>User experiance</h3>
              <UserGroup />
            </div>
            <p>{lorem}</p>
          </div>
          {/* Item1 */}
          <div className="skill-focus-con-item">
            <div className="skill-focus-con-item-heading">
              <h3>User experiance</h3>
              <UserGroup />
            </div>
            <p>{lorem}</p>
          </div>
          {/* Item1 */}
          <div className="skill-focus-con-item">
            <div className="skill-focus-con-item-heading">
              <h3>User experiance</h3>
              <UserGroup />
            </div>
            <p>{lorem}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProFocus;
