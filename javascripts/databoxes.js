window.onload = () => {
  fetch("http://127.0.0.1:8902")
    .then(response => response.json())
    .then(data => {
      for (let i = 1; i <= 3; i++) {
        const box = document.getElementById(`box${i}`);
        const boxData = data[`box${i}`];

        if (boxData) {
          const title = document.createElement("h2");
          title.textContent = boxData.title;

          const message = document.createElement("p");

          const regex = /\[(https?:\/\/[^\]]+)\](.*)/;
          const match = boxData.message.match(regex);

          if (match) {
            const linkUrl = match[1];
            const restText = match[2].trim();

            if (linkUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
              const img = document.createElement("img");
              img.src = linkUrl;
              img.alt = "Bild";
              img.style.maxWidth = "100%";
              img.style.borderRadius = "8px";
              img.style.marginBottom = "10px";
              box.appendChild(img);
            } else {
              const link = document.createElement("a");
              link.href = linkUrl;
              link.target = "_blank";
              link.textContent = linkUrl;
              link.style.color = "#00ffff";
              link.style.textDecoration = "underline";
              message.appendChild(link);
            }

            if (restText) {
              message.append(" " + restText);
            }
          } else {
            message.textContent = boxData.message;
          }
          box.innerHTML = "";  
          box.appendChild(title);
          box.appendChild(message);
        }
      }
    })
    .catch(err => {
      console.error("error while loading data:", err);
      for (let i = 1; i <= 3; i++) {
        const box = document.getElementById(`box${i}`);
        if (box) box.textContent = "error while loading data.";
      }
    });
};
