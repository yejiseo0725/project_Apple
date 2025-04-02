// 전역변수 사용 방지
(() => {
  let scrollY = 0; // window.scrollY 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(scrollY)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
      },
    },
    {
      // 1
      type: "normal",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      // 2
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      // 3
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    scrollY = window.scrollY;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= scrollY) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
    // console.log(sceneInfo);
  }

  function scrollLoop() {
    // 초기화 시켜 값이 누적되는 것을 방지
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    // 현재 스크롤 높이 > 이전 스크롤 위치값의 합 + 현재 활성화된 섹션의 높이
    if (scrollY > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      // 섹션 +1
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (scrollY < prevScrollHeight) {
      // ios 브라우저 스크롤 바운스 효과 방지
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }
    // console.log(currentScene);
  }

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
    scrollLoop();
  });

  // load: 전체 로드(이미지, 비디오 등 포함) 후 실행
  // DOMContentLoaded: DOM 구조만 로드 후 실행
  window.addEventListener("load", setLayout);
  // window.addEventListener("DOMContentLoaded", setLayout);
  window.addEventListener("resize", setLayout);

  setLayout();
})();
