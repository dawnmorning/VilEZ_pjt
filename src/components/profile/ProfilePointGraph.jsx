import React, { useState, useEffect, useRef } from "react";

const ProfilePointGraph = ({ data }) => {
  const [plusPoint, setPlusPoint] = useState(0);
  const [minusPoint, setMinusPoint] = useState(0);
  const [totalPoint, setTotalPoint] = useState(0);
  const [currentPoint, setCurrentPoint] = useState(0);
  const graph = useRef();

  // var ctx = graph.current.getContext("2d");

  // ctx.moveTo(50, 60);
  // ctx.arc(50, 60, 60, 0, (90 * Math.PI) / 180, false);
  // ctx.closePath();
  // ctx.stroke();

  // ctx.moveTo(180, 60);
  // ctx.arc(180, 60, 60, 0, (90 * Math.PI) / 180, true);
  // ctx.closePath();
  // ctx.stroke();

  useEffect(() => {
    let [plus, minus, total, current] = [0, 0, 0];
    data.forEach((d) => {
      if (d > 0) {
        plus += d;
        total += d;
      } else {
        minus += d;
        total -= d;
      }
      current += d;
    });
    setPlusPoint(plus);
    setMinusPoint(minus);
    setTotalPoint(total);
    setCurrentPoint(current);
  }, [data]);

  return (
    <div>
      <div ref={graph}></div>
      <div>{plusPoint}</div>
      <div>{minusPoint}</div>
      <div>{totalPoint}</div>
      <div>{currentPoint}</div>
    </div>
  );
};

export default ProfilePointGraph;
