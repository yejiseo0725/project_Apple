// 전역변수 사용 방지
(() => {
  let scrollY = 0; // window.scrollY 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(scrollY)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 씬이 시작된 순간 true

  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity: [0, 1, { start: 0.3, end: 0.4 }],
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

  function calcValues(values, currentScrollY) {
    let rv;
    // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentScrollY / sceneInfo[currentScene].scrollHeight;

    if (values.length === 3) {
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      // 특정 구간에서의 스크롤 비율 계산
      if (
        currentScrollY >= partScrollStart &&
        currentScrollY <= partScrollEnd
      ) {
        rv =
          ((currentScrollY - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentScrollY < partScrollStart) {
        rv = values[0];
      } else if (currentScrollY > partScrollEnd) {
        rv = values[1];
      }

      rv =
        ((currentScrollY - partScrollStart) / partScrollHeight) *
          (values[1] - values[0]) +
        values[0];
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  // 활성화된 씬에 해당하는 요소들만 애니메이션 처리
  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentScrollY = scrollY - prevScrollHeight;

    console.log(currentScene);

    switch (currentScene) {
      case 0:
        // console.log("0 play");
        let messageA_opacity_in = calcValues(
          values.messageA_opacity,
          currentScrollY
        );
        objs.messageA.style.opacity = messageA_opacity_in;

        console.log(messageA_opacity_in);

        break;

      case 1:
        // console.log("111 play");
        break;

      case 2:
        // console.log("2222222 play");
        break;

      case 3:
        // console.log("333333 play");
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    // 초기화 시켜 값이 누적되는 것을 방지
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    // 현재 스크롤 높이 > 이전 스크롤 위치값의 합 + 현재 활성화된 섹션의 높이
    if (scrollY > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      // 섹션 +1
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (scrollY < prevScrollHeight) {
      enterNewScene = true;
      // ios 브라우저 스크롤 바운스 효과 방지
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
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
