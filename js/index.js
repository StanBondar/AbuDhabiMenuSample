(function () {
  function logElementEvent(eventName, element) {
    // console.log(Date.now(), eventName, element.getAttribute("data-src"));
  }

  const callback_enter = function (element) {
    logElementEvent("🔑 ENTERED", element);
  };
  const callback_exit = function (element) {
    logElementEvent("🚪 EXITED", element);
  };
  const callback_loading = function (element) {
    logElementEvent("⌚ LOADING", element);
  };
  const callback_loaded = function (element) {
    logElementEvent("👍 LOADED", element);
  };
  const callback_error = function (element) {
    logElementEvent("💀 ERROR", element);
    element.src = "https://via.placeholder.com/440x560/?text=Error+Placeholder";
  };
  const callback_finish = function () {
    logElementEvent("✔️ FINISHED", document.documentElement);
  };
  const callback_cancel = function (element) {
    logElementEvent("🔥 CANCEL", element);
  };

  const ll = new LazyLoad({
    // Assign the callbacks defined above
    callback_enter: callback_enter,
    callback_exit: callback_exit,
    callback_cancel: callback_cancel,
    callback_loading: callback_loading,
    callback_loaded: callback_loaded,
    callback_error: callback_error,
    callback_finish: callback_finish,
  });
})();

const goToTop = document.querySelector(".go-to-top");
goToTop.addEventListener("click", function (e) {
  e.preventDefault();

  // document.querySelector("#top").scrollIntoView({
  //   behavior: "smooth",
  //   block: "start",
  // });

  $("body,html").animate(
    {
      scrollTop: 0,
    },
    400
  );
});

goToTop.style.display = "none";
document.addEventListener("scroll", () => {
  if (window.scrollY > window.outerHeight) {
    $(".go-to-top").show(300);
  }
  if (window.scrollY <= window.outerHeight) {
    $(".go-to-top").hide(300);
  }
});

const navbar = document.querySelector("#navbar");

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-60px";
  }
  prevScrollpos = currentScrollPos;
};

navbar.addEventListener("click", () => {
  navbar.style.top = "0";
});

const menuFolders = document.querySelectorAll(".menuElement");

const headMenu = document.querySelector(".head_menu");
headMenu.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    e.target.classList.contains("head_menu-item") ||
    e.target.classList.contains("head_menu-link")
  ) {
    menuFolders.forEach((el) => {
      el.classList.remove("activeMenu");
    });
    Array.from(headMenu.children).forEach((el) => {
      el.classList.remove("activeMenuLink");
    });
    if (e.target.classList.contains("head_menu-item")) {
      e.target.classList.add("activeMenuLink");
      document
        .querySelector(
          `div.menuElement[data-menu-link="${e.target.firstChild.getAttribute(
            "href"
          )}"]`
        )
        .classList.add("activeMenu");
    } else if (
      e.target.classList.contains("head_menu-link") &&
      e.target.parentNode.classList.contains("head_menu-item")
    ) {
      e.target.parentNode.classList.add("activeMenuLink");
      document
        .querySelector(
          `div.menuElement[data-menu-link="${e.target.getAttribute("href")}"]`
        )
        .classList.add("activeMenu");
    }
  }
});
