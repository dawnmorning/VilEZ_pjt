import mannerPoint1 from "../../assets/images/mannerPoint1.png";
import mannerPoint2 from "../../assets/images/mannerPoint2.png";
import mannerPoint3 from "../../assets/images/mannerPoint3.png";
import mannerPoint4 from "../../assets/images/mannerPoint4.png";
import mannerPoint5 from "../../assets/images/mannerPoint5.png";

const MannerPoint = (point) => {
  if (point <= 10) return mannerPoint1;
  else if (point > 10 && point <= 20) return mannerPoint2;
  else if (point > 20 && point <= 30) return mannerPoint3;
  else if (point > 30 && point <= 40) return mannerPoint4;
  else return mannerPoint5;
};

export default MannerPoint;
