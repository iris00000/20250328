let grasses = []; // 儲存水草屬性的陣列
let colors = ['#f595e', '#ffca3', '#8ac926', '#1982C4', '#6a4c93']; // 指定的五種顏色
let iframe; // 用於儲存 iframe 元素

function setup() {
  // 創建畫布
  let canvas = createCanvas(windowWidth, windowHeight); // 畫布大小設為視窗大小
  canvas.style('z-index', '1'); // 設定畫布的 z-index 為 1，確保在 iframe 上方
  canvas.style('background', 'transparent'); // 設定畫布背景為透明
  canvas.style('pointer-events', 'none'); // 讓滑鼠事件穿透畫布
  canvas.position(0, 0); // 將畫布置於視窗的頂層

  // 創建 iframe
  iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw'); // 設定 iframe 的來源
  iframe.style('border', 'none'); // 移除邊框
  iframe.style('position', 'absolute'); // 確保 iframe 使用絕對定位
  iframe.style('z-index', '-1'); // 設定 iframe 的 z-index 為 -1，確保在畫布下方
  iframe.position(0, 0); // 將 iframe 放置於視窗的左上角
  iframe.size(windowWidth, windowHeight); // 設定 iframe 的寬高為視窗的 100%

  initializeGrasses(); // 初始化水草屬性
}

function draw() {
  clear(); // 清除畫布，保留透明背景
  blendMode(BLEND); // 設定混合模式為 BLEND，允許顏色重疊

  let numOfGrass = grasses.length; // 水草數量
  for (let i = 0; i < numOfGrass; i++) {
    let baseX = (i + 0.5) * (width / numOfGrass); // 水草底部 X 座標，均勻分布
    let baseY = height; // 水草底部 Y 座標
    let heightOfLine = grasses[i].height; // 從陣列中取得水草高度
    let segments = 10; // 水草分段數量
    let segmentHeight = heightOfLine / segments; // 每段的高度

    strokeWeight(grasses[i].thickness); // 設定水草的粗細
    let grassColor = color(grasses[i].color); // 取得水草顏色
    grassColor.setAlpha(150); // 設定透明度 (0-255)
    stroke(grassColor); // 設定水草的顏色
    noFill(); // 確保沒有填充

    beginShape(); // 開始繪製水草形狀
    for (let j = 0; j <= segments; j++) {
      let y = baseY - j * segmentHeight; // 計算每段的 Y 座標
      let sway = sin(frameCount * grasses[i].frequency + grasses[i].phase + j * 0.5) * 10; // 波浪效果，振幅減小到 10
      let x = baseX + sway; // 計算每段的 X 座標
      vertex(x, y); // 添加頂點
    }
    endShape(); // 結束繪製水草形狀
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  initializeGrasses(); // 重新初始化水草屬性

  // 調整 iframe 的位置和大小
  iframe.position(0, 0);
  iframe.size(windowWidth, windowHeight);
}

function initializeGrasses() {
  grasses = []; // 清空水草陣列
  let numOfGrass = 40; // 水草數量
  for (let i = 0; i < numOfGrass; i++) {
    grasses.push({
      height: random(40, 120), // 水草高度
      color: colors[int(random(colors.length))], // 從指定顏色中隨機選擇
      thickness: random(5, 20), // 水草粗細
      frequency: random(0.02, 0.08), // 搖晃頻率
      phase: random(TWO_PI), // 初始相位，讓每條水草的波浪不同步
    });
  }
}
