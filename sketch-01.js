const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const squareRatio = 0.1;

    const w = width * squareRatio;
    const h = height * squareRatio;
    const gap = 20;

    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = 100 + (w + gap) * i;
        y = 100 + (h + gap) * j;

        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(
            x + (width * squareRatio) / 10,
            y + (height * squareRatio) / 10,
            w - ((width * squareRatio) / 10) * 2,
            h - ((height * squareRatio) / 10) * 2
          );
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
