import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getLatestMapLocation } from "../../api/appointment";

const { kakao } = window;

let container, options, map, rectangle, marker;

const Map = ({
  readOnly,
  sendLocation,
  selectedLat,
  selectedLng,
  movedLat,
  movedLng,
  movedZoomLevel,
  movedMarker,
  disableMapLat,
  disableMapLng,
  path,
  hopeAreaLat,
  hopeAreaLng,
  chatRoomId,
}) => {
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(-10);
  const [isMarker, setIsMarker] = useState(false);
  const [markerFlag, setMarkerFlag] = useState(false);
  const [flag, setFlag] = useState(true);

  const areaLat = window.localStorage.getItem("areaLat");
  const areaLng = window.localStorage.getItem("areaLng");

  function initMap() {
    // 지도를 표시할 공간과 초기 중심좌표, 레벨 세팅
    container = document.getElementById("map");
    marker = new kakao.maps.Marker();

    if (path === "regist" || path === "modify") {
      options = {
        center: new kakao.maps.LatLng(areaLat, areaLng),
        level: 7,
      };

      map = new kakao.maps.Map(container, options);
    } else if (path === "detail") {
      options = {
        center: new kakao.maps.LatLng(areaLat, areaLng),
        level: 2,
      };

      map = new kakao.maps.Map(container, options);
    } else {
      options = {
        center: new kakao.maps.LatLng(areaLat, areaLng),
        level: 3,
      };

      map = new kakao.maps.Map(container, options);

      getLatestMapLocation(chatRoomId).then((res) => {
        if (res) {
          res = res[0];

          const latlng = new kakao.maps.LatLng(res.lat, res.lng);

          if (res.isMarker) {
            marker.setMap(map);
            marker.setPosition(latlng);
          }

          map.panTo(latlng);
          // map.setLevel(res.zoomLevel); // 지도 레벨 동기화
        }
      });
    }
  }

  function eventDragEnd() {
    // 드래그 이동
    kakao.maps.event.addListener(map, "dragend", function () {
      if (markerFlag) {
        setMarkerFlag(false);
        return;
      }

      const center = map.getCenter();

      setLocation("dragend");
      setLat(center.getLat());
      setLng(center.getLng());
      setZoomLevel(map.getLevel());
      setIsMarker(false);
    });
  }

  function eventZoomChanged() {
    // 지도 레벨 변경
    kakao.maps.event.addListener(map, "zoom_changed", () => {
      const center = map.getCenter();

      setLat(center.getLat());
      setLng(center.getLng());
      setZoomLevel(map.getLevel());
      setIsMarker(false);
    });
  }

  function eventSetMarker() {
    // 마커 찍기
    kakao.maps.event.addListener(map, "rightclick", function (mouseEvent) {
      const latlng = mouseEvent.latLng;

      if (path === "regist" || path === "modify") {
        if (
          latlng.getLat() > parseFloat(areaLat) - 0.03 &&
          latlng.getLat() < parseFloat(areaLat) + 0.03 &&
          latlng.getLng() < parseFloat(areaLng) + 0.045 &&
          latlng.getLng() > parseFloat(areaLng) - 0.045
        ) {
          setLat(latlng.getLat());
          setLng(latlng.getLng());
          setIsMarker(true);

          if (marker) {
            marker.setMap(null);
          }

          marker.setPosition(latlng);
          marker.setMap(map);
          map.panTo(latlng);
        } else {
          alert("현재 위치를 기반으로 가능한 범위내의 장소를 선택해야해요!");
          return;
        }
      } else {
        if (marker) {
          marker.setMap(null);
        }

        marker.setPosition(latlng);
        marker.setMap(map);

        setLocation("marker");
        setLat(latlng.getLat());
        setLng(latlng.getLng());
        setZoomLevel(map.getLevel());
        setIsMarker(true);

        setMarkerFlag(true);
        map.panTo(latlng);
      }
    });
  }

  function searchDetailAddrFromCoords(coords, callback) {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  function makeRectangle() {
    if (rectangle) rectangle.setMap(null);

    var sw = new kakao.maps.LatLng(parseFloat(areaLat) - 0.03, parseFloat(areaLng) - 0.045), // 사각형 영역의 남서쪽 좌표
      ne = new kakao.maps.LatLng(parseFloat(areaLat) + 0.03, parseFloat(areaLng) + 0.045); // 사각형 영역의 북동쪽 좌표

    // 사각형을 구성하는 영역정보를 생성
    var rectangleBounds = new kakao.maps.LatLngBounds(sw, ne);

    // 지도에 표시할 사각형을 생성
    rectangle = new kakao.maps.Rectangle({
      bounds: rectangleBounds, // 그려질 사각형의 영역정보
      strokeWeight: 2, // 선의 두께
      strokeColor: "#66DD9C", // 선의 색깔
      strokeOpacity: 0.3, // 선의 불투명도 (1에서 0 사이의 값이며 0에 가까울수록 투명)
      strokeStyle: "shortdashdot", // 선의 스타일
      fillColor: "#ACF0CB", // 채우기 색깔
      fillOpacity: 0.45, // 채우기 불투명도
    });

    // 지도에 사각형을 표시
    rectangle.setMap(map);
  }

  useEffect(() => {
    initMap();

    if (path === "regist") {
      makeRectangle();
    }

    if (path === "regist" || path === "modify" || path === "stomp") {
      eventSetMarker();
      eventZoomChanged();
      eventDragEnd();
    }
  }, []);

  /** 지도 데이터 보내기 */
  useEffect(() => {
    if (!readOnly) {
      if (path === "stomp") {
        if (flag) {
          setFlag(false);
          return;
        }
        sendLocation(location, lat, lng, zoomLevel, isMarker);
      } else {
        sendLocation(location, lat, lng, zoomLevel, isMarker);
      }
    }
  }, [lat, lng, zoomLevel, isMarker]);

  /** 게시글 수정 map */
  useEffect(() => {
    if (path === "modify" && hopeAreaLat && hopeAreaLng && map) {
      makeRectangle();
      const latlng = new kakao.maps.LatLng(hopeAreaLat, hopeAreaLng);

      marker.setPosition(latlng);
      marker.setMap(map);
    }
  }, [hopeAreaLat, hopeAreaLng, map]);

  /** 게시글 디테일 map */
  useEffect(() => {
    if (path === "detail" && selectedLat && selectedLng && map) {
      marker = new kakao.maps.Marker();

      const latlng = new kakao.maps.LatLng(selectedLat, selectedLng);

      marker.setMap(map);
      map.setCenter(latlng);
      marker.setPosition(latlng);
      map.setDraggable(false);
      map.setZoomable(false);
    }
  }, [selectedLat, selectedLng, map]);

  /** 공유 지도 map 데이터 받기 */
  useEffect(() => {
    if (path === "stomp" && movedLat && movedLng && movedZoomLevel && map) {
      const locPosition = new kakao.maps.LatLng(movedLat, movedLng);

      map.setLevel(movedZoomLevel); // 지도 레벨 동기화

      if (movedMarker) {
        marker.setPosition(locPosition);
        marker.setMap(map);
        setMarkerFlag(true);
        map.panTo(locPosition);

        searchDetailAddrFromCoords(locPosition, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            setLocation(result[0].address.address_name);
          }
        });
      } else {
        // dragend, zoomchange 이벤트의 경우
        map.panTo(locPosition);
        setMarkerFlag(true);
      }
    }
  }, [movedLat, movedLng, movedZoomLevel, movedMarker, map]);

  /** 공유지도 map block */
  useEffect(() => {
    if (path === "block" && disableMapLat && disableMapLng && map) {
      const latlng = new kakao.maps.LatLng(disableMapLat, disableMapLng);

      marker.setMap(map);
      map.setCenter(latlng);
      map.setDraggable(false);
      map.setZoomable(false);
    }
  }, [disableMapLat, disableMapLng, map]);

  return <div id="map" css={mapWrapper}></div>;
};

const mapWrapper = css`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

export default Map;
