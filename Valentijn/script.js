document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper");
  const buttonNo = document.getElementById("no");
  const buttonYes = document.getElementById("yes");
  const image = document.querySelector(".cappy");
  const text = document.querySelector(".question");

  let isAbsolute = false;

  function moveButtonAwayFrom(x, y) {
    const rect = buttonNo.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    const buttonX = rect.left + rect.width / 2;
    const buttonY = rect.top + rect.height / 2;

    const dx = x - buttonX;
    const dy = y - buttonY;

    if (!isAbsolute) {
      buttonNo.style.position = "absolute";
      buttonNo.style.left = rect.left - wrapperRect.left + "px";
      buttonNo.style.top = rect.top - wrapperRect.top + "px";
      isAbsolute = true;
    }

    let newLeft = buttonNo.offsetLeft - dx * 0.4;
    let newTop = buttonNo.offsetTop - dy * 0.4;

    const padding = 20; 
    const maxX = wrapper.clientWidth - rect.width - padding;
    const maxY = wrapper.clientHeight - rect.height - padding;

    newLeft = Math.max(padding, Math.min(maxX, newLeft));
    newTop = Math.max(padding, Math.min(maxY, newTop));

    const stuckOnEdge =
      newLeft === padding || newLeft === maxX || newTop === padding || newTop === maxY;

    if (stuckOnEdge) {
      newLeft = padding + Math.random() * (maxX - padding);
      newTop = padding + Math.random() * (maxY - padding);
    }

    buttonNo.style.left = newLeft + "px";
    buttonNo.style.top = newTop + "px";
  }

  function spawnHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "❤️";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 16 + Math.random() * 24 + "px";
  heart.style.animationDuration = 2 + Math.random() * 2 + "s";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 4000);
}

  document.addEventListener("mousemove", (e) => {
    const rect = buttonNo.getBoundingClientRect();
    const buttonX = rect.left + rect.width / 2;
    const buttonY = rect.top + rect.height / 2;

    const dx = e.clientX - buttonX;
    const dy = e.clientY - buttonY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 120) moveButtonAwayFrom(e.clientX, e.clientY);
  });

    buttonYes.addEventListener("click", () => {
    image.src = "rescources/yes.gif";
    text.innerText = "Ik hou van je cappy!";
    buttonNo.remove();
    buttonYes.remove();

    for (let i = 0; i < 40; i++) {
        setTimeout(spawnHeart, i * 50);
  }
    });

  buttonNo.addEventListener("mouseenter", (e) => {
    moveButtonAwayFrom(e.clientX, e.clientY);
  });
});


