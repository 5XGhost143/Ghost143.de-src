window.onload = () => {
    fetch("https://databox.ghost143.de")
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
                img.alt = "Image";
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
        console.error("error while loading data (either i messed up my json or my server is down u can check if my server is down when u go on the URL https://databox.ghost143.de)... error:", err);
        for (let i = 1; i <= 3; i++) {
          const box = document.getElementById(`box${i}`);
          if (box) box.textContent = "error while loading data (either i messed up my json or my server is down u can check if my server is down when u go on the URL https://databox.ghost143.de)...";
        }
      });
  };
