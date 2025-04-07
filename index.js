// 變數定義
const upload = document.getElementById("upload");
const output = document.getElementById("output");

const cssButton = document.getElementById("CSS_generator");
const cssoutput = document.getElementById("CSS_output");

const htmlcopy = document.getElementById("copyButton_HTML");
const csscopy = document.getElementById("copyButton_CSS");

const htmlmessage = document.querySelector(".sucessMessage_HTML");
const cssmessage = document.querySelector(".sucessMessage_CSS");

// 根據選擇來決定要套用哪種模板
let selectedMode = "section";
const template = document.querySelector("#template");
template.addEventListener("change", (e) => {
  selectedMode = e.target.value;
  htmlcopy.disabled = true;
  if (selectedMode === "section") {
    cssButton.disabled = true;
    csscopy.disabled = true;
  }
});

// 上傳圖片後產生指定的模板文字
upload.addEventListener("change", function (event) {
  const files = event.target.files;
  if (!files.length) return;

  // 建立一個有index的陣列
  const result = Array(files.length);

  Array.from(files).forEach((file, index) => {
    const img = new Image();
    img.onload = function () {
      generateTemplateHTML(file, img, result, index);
    };
    img.src = URL.createObjectURL(file);
  });
});

function generateTemplateHTML(file, img, result, index) {
  // className使用檔名 BG_01.jpg => class="BG_01"
  const className = file.name.split(".").slice(0, -1).join(".");

  // 根據不同mode產生模板文字
  let formattedText;
  switch (selectedMode) {
    case "section":
      formattedText = `<section class="${className}">
  <div class="container relative">
    <img class="lazy" data-src="./images/BG/${file.name}" width="${img.width}" height="${img.height}" src="./images/BG/${file.name}">
  </div>
</section>`;
      break;

    case "component":
      formattedText = `<img class="lazy absolute ${className}" data-src="images/${file.name}" width="${img.width}" height="${img.height}">`;
      break;

    default:
      formattedText = "";
  }

  // 因為上傳是非同步操作，所以使用index來放到指定的陣列位置 => 正確排列順序
  result[index] = formattedText;

  // 產出結果放入output區並換行
  output.value = result.join("\n");

  // 控制複製HTML按鈕
  htmlcopy.disabled = false;

  // 控制CSS按鈕功能
  if (selectedMode === "component") {
    cssButton.disabled = false;
  } else {
    cssButton.disabled = true;
  }
}

// 產生CSS
cssButton.addEventListener("click", () => {
  const imagesArray = output.value.match(/<img[^>]+>/g);
  const result = imagesArray.map((img) => {
    const arr = img.split(" ");
    const className = arr[3].slice(0, -1);
    const width =
      Number(arr[5].slice(7, -1)) >= 1000
        ? "100"
        : (Number(arr[5].slice(7, -1)) / 10).toFixed(1);
    const format = `
.${className} {
  width: ${width}%;
  top: 0%;
  left: 0%;
}
        `;
    return format;
  });
  cssoutput.value = result.join("");
  csscopy.disabled = false;
});

// 複製HTML Clipboard API
htmlcopy.addEventListener("click", () => {
  navigator.clipboard.readText();
  navigator.clipboard.writeText(output.value);

  setTimeout(() => {
    htmlmessage.innerHTML = "複製成功😊";
  }, 500);

  setTimeout(() => {
    htmlmessage.innerHTML = "";
  }, 2000);
});

// 複製HTML Clipboard API
csscopy.addEventListener("click", () => {
  navigator.clipboard.readText();
  navigator.clipboard.writeText(cssoutput.value);

  setTimeout(() => {
    cssmessage.innerHTML = "複製成功😊";
  }, 500);

  setTimeout(() => {
    cssmessage.innerHTML = "";
  }, 2000);
});
