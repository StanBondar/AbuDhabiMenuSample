(function () {
  function logElementEvent(eventName, element) {
    console.log(Date.now(), eventName, element.getAttribute("data-src"));
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

  document.querySelector("#top").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

goToTop.style.display = "none";
document.addEventListener("scroll", () => {
  if (window.scrollY > window.outerHeight) {
    goToTop.style.display = "block";
  }
  if (window.scrollY <= window.outerHeight) {
    goToTop.style.display = "none";
  }
});
