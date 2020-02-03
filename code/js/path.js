class Path {

    constructor(path, stage, color, dx, dy) {
        this.stage = stage;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
        this.processStringPath(path);
    }

    processStringPath(stringPath) {
        this.path = new createjs.Shape();
        this.path.graphics.setStrokeStyle(this.dx / 8).beginStroke(this.color);

        stringPath.forEach(
            function (strCoords) {
                let [x, y] = strCoords.split(',').map(s => parseInt(s));
                x += this.dx / 2;
                y += this.dy / 2; // center on square, refactor this!
                this.path.graphics.lineTo(x, y);
            }.bind(this)
        );
        this.path.graphics.endStroke();
        this.stage.addChild(this.path);
    }

    reset() {
        this.stage.removeChild(this.path);
    }
}

export default Path;
