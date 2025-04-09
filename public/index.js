// 變數定義
const select_Template = document.querySelector("#select_Template");
const upload_IMG = document.getElementById("upload_IMG");
const generate_CSS = document.getElementById("generate_CSS");

const textarea_HTML = document.getElementById("textarea_HTML");
const textarea_CSS = document.getElementById("textarea_CSS");

const copy_HTML = document.getElementById("copy_HTML");
const copy_CSS = document.getElementById("copy_CSS");

const sucessMessage_HTML = document.querySelector(".sucessMessage_HTML");
const sucessMessage_CSS = document.querySelector(".sucessMessage_CSS");

// 根據選擇來決定要套用哪種模板
let selectedMode = "section";
select_Template.addEventListener("change", (e) => {
  selectedMode = e.target.value;
  if (selectedMode === "section") {
    generate_CSS.disabled = true;
    copy_CSS.disabled = true;
  }
});

// 上傳圖片後產生指定的模板文字
upload_IMG.addEventListener("change", function (event) {
  const files = event.target.files;
  if (!files.length) return;

  // 建立一個有index的陣列
  const result = Array(files.length);

  Array.from(files).forEach((file, index) => {
    const img = new Image();
    img.onload = function () {
      generateselect_TemplateHTML(file, img, result, index);
    };
    img.src = URL.createObjectURL(file);
  });
});

function generateselect_TemplateHTML(file, img, result, index) {
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
      formattedText = `<img class="lazy absolute ${className}" data-src="images/${file.name}" width="${img.width}" height="${img.height}" src="./images/${file.name}">`;
      break;

    default:
      formattedText = "";
  }

  // 因為上傳是非同步操作，所以使用index來放到指定的陣列位置 => 正確排列順序
  result[index] = formattedText;

  // 產出結果放入output區並換行
  textarea_HTML.value = result.join("\n");

  // 控制複製HTML按鈕
  copy_HTML.disabled = false;

  // 控制CSS按鈕功能
  if (selectedMode === "component") {
    generate_CSS.disabled = false;
  } else {
    generate_CSS.disabled = true;
  }
}

// 產生CSS
generate_CSS.addEventListener("click", () => {
  const imagesArray = textarea_HTML.value.match(/<img[^>]+>/g);
  const result = imagesArray.map((img) => {
    const arr = img.split(" ");
    const className = arr[3].slice(0, -1);
    const width = Number(arr[5].slice(7, -1) / 10).toFixed(1);
    const scale = Number(arr[5].slice(7, -1) / 1000).toFixed(3);

    const format =
      Number(width) * 10 > 1000
        ? `
.${className} {
  width: 100%;
  top: 0%;
  left: 0%;
  scale: ${scale};
}
`
        : `
.${className} {
  width: ${width}%;
  top: 0%;
  left: 0%;
}
`;

    return format;
  });
  textarea_CSS.value = result.join("");
  copy_CSS.disabled = false;
});

// 複製HTML Clipboard API
copy_HTML.addEventListener("click", async () => {
  await navigator.clipboard.writeText(textarea_HTML.value);
  try {
    setTimeout(() => {
      sucessMessage_HTML.innerHTML = "複製成功😊";
    }, 500);
  } catch (err) {
    console.error("複製失敗:", err);
    sucessMessage_HTML.innerHTML = "複製失敗😢";
  } finally {
    setTimeout(() => {
      sucessMessage_HTML.innerHTML = "";
    }, 2000);
  }
});

// 複製CSS Clipboard API
copy_CSS.addEventListener("click", async () => {
  await navigator.clipboard.writeText(textarea_CSS.value);
  try {
    setTimeout(() => {
      sucessMessage_CSS.innerHTML = "複製成功😊";
    }, 500);
  } catch (err) {
    console.error("複製失敗:", err);
    sucessMessage_CSS.innerHTML = "複製失敗😢";
  } finally {
    setTimeout(() => {
      sucessMessage_CSS.innerHTML = "";
    }, 2000);
  }
});
