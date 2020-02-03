import graphNode from './graph_node';
import {simple, maze} from './board_presets';

class Board {
    constructor(stage, dx, dy) {
        this.stage = stage;

        this.resetDimensions(dx, dy);
        this.grid = this.buildGrid();
        this.addListeners();
        this.allowPaint = true;
    }

    resetDimensions(dx, dy) {
        this.DIM_X = this.stage.canvas.width;
        this.DIM_Y = this.stage.canvas.height;
        this.dx = dx;
        this.dy = dy;
    }

    buildGrid() {//建立网格,宽高为整个canvas的宽高
        let grid = {};

        for (let i = 0; i < this.DIM_X; i += this.dx) {
            for (let j = 0; j < this.DIM_Y; j += this.dy) {
                const node = new graphNode(i, j, this.dx, this.dy);
                grid[node.coords] = node;
                this.stage.addChild(node.easelCell);
            }
        }

        return grid;
    }

    addListeners() {
        this.stage.on('click', this.handleClick.bind(this));
        this.stage.on('pressmove', this.handleMouseMove.bind(this));
        this.stage.on('pressup', () => {
            this.handleMouseMove.prevCoords = null;
        });
    }

    init() {
        this.setStart(this._localToGrid(simple.start));
        this.setGoal(this._localToGrid(simple.goal));
        createjs.Ticker.addEventListener('tick', this.stage);
    }

    handleClick(e) {//点击事件,添加为障碍物,若本来就为障碍物,那么删除该障碍物
        console.log([
            Math.floor(e.stageX / this.dx),
            Math.floor(e.stageY / this.dy),
        ].toString());

        if (this.allowPaint) {
            const node = this.grid[this._getCoordsFromEvent(e)];
            node.toggleIsObstacle();
        }
    }

    handleMouseMove(e) {//按住鼠标拖动的区域都变为障碍物,起始点和目标点也可以拖动移动位置
        const currCoords = this._getCoordsFromEvent(e);
        if (!this.grid[currCoords]) return false;

        const prevCoords = this.handleMouseMove.prevCoords;
        //现在的node不同于之前的
        if (currCoords !== prevCoords) {
            if (this.start === prevCoords) {
                this.setStart(currCoords);
            } else if (this.goal === prevCoords) {
                this.setGoal(currCoords);
            } else {
                if (this.start !== currCoords &&
                    this.goal !== currCoords &&
                    this.allowPaint) {
                    const node = this.grid[currCoords];
                    node.toggleIsObstacle();
                }
            }

            this.handleMouseMove.prevCoords = currCoords;
        }
    }

    setStart(coords) {//设置起始点坐标
        if (this.start) this.grid[this.start].setType('empty');
        this.start = coords;
        this.grid[coords].setType('start');
    }

    setGoal(coords) {//设置目标点坐标
        if (this.goal) this.grid[this.goal].setType('empty');
        this.goal = coords;
        this.grid[coords].setType('goal');
    }

    clearSearch() {//清空搜索路线
        for (let coords in this.grid) {
            this.grid[coords].clearIfSearch();
        }
        this.allowPaint = true;
    }

    clearObstacles() {//清空障碍物
        for (let coords in this.grid) {
            this.grid[coords].clearIfObstacle();
        }
    }

    setupSimple() {//设置默认障碍
        this.clearObstacles();
        this.setStart(this._localToGrid(simple.start));
        this.setGoal(this._localToGrid(simple.goal));
        simple.obstacles.forEach(coords => (
            this.grid[this._localToGrid(coords)].toggleIsObstacle()
        ));
    }

    setupMaze() {//设置迷宫
        this.clearObstacles();
        this.setStart(this._localToGrid(maze.start));
        this.setGoal(this._localToGrid(maze.goal));
        maze.obstacles.forEach(coords => (
            this.grid[this._localToGrid(coords)].toggleIsObstacle()
        ));
    }

    neighbors(coords) {//获取相邻节点
        const [x, y] = coords.split(',').map(str => parseInt(str));

        //array of coords that are neighbors
        let neighbors = [];
        for (let dx = -1; dx < 2; dx++) {
            for (let dy = -1; dy < 2; dy++) {
                if (dx === dy || dx === -dy) continue;

                const testCoords = [x + this.dx * dx, y + this.dy * dy].toString();
                if (this.grid[testCoords]) {
                    neighbors.push(testCoords);
                }
            }
        }
        return neighbors;
    }

    _localToGrid(localCoords) {//映射到网格坐标
        let [i, j] = localCoords.split(',').map(str => parseInt(str));
        return [i * this.dx, j * this.dy].toString();
    }

    _getCoordsFromEvent(e) {
        return [
            Math.floor(e.stageX / this.dx) * this.dx,
            Math.floor(e.stageY / this.dy) * this.dy,
        ].toString();
    }

    _generateCoords() {//随机生成坐标
        let x = Math.random() * this.DIM_X;
        let y = Math.random() * this.DIM_Y;
        x = Math.floor(x / this.dx) * this.dx;
        y = Math.floor(y / this.dy) * this.dy;
        return [x, y].toString();
    }
}

export default Board;
