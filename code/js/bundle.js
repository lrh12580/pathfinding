/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = __webpack_require__(10);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Search = function () {
    function Search(board) {
        _classCallCheck(this, Search);

        this.board = board;
        this.iterateTime = 0;
    }

    _createClass(Search, [{
        key: 'initializeFrontier',
        value: function initializeFrontier() {
            this.reset();
            this.processNeighbors(this.board.start);
        }
    }, {
        key: 'reset',
        value: function reset() {
            if (this.path) this.path.reset();
            this.cameFrom = {};
            this.cameFrom[this.board.start] = null;
        }
    }, {
        key: 'kill',
        value: function kill() {
            clearInterval(this.updateInterval);
            this.reset();
        }
    }, {
        key: 'run',
        value: function run(color) {
            var _this = this;

            this.initializeFrontier();

            this.updateInterval = setInterval(function () {
                var current = _this.frontier.dequeue();
                if (!current || current === _this.board.goal) {
                    clearInterval(_this.updateInterval);
                    _this.path = new _path2.default(_this.buildPath(), _this.board.stage, color, _this.board.dx, _this.board.dy);
                }
                _this.iterateTime += 1;
                _this.processNeighbors(current);
                _this.board.grid[current].setType('visited');
            }, 20);
        }
    }, {
        key: 'buildPath',
        value: function buildPath() {
            if (!this.cameFrom[this.board.goal]) {
                return null;
            }

            var current = this.board.goal;
            var path = [];

            while (current) {
                path.unshift(current);
                current = this.cameFrom[current];
            }

            return path;
        }
    }, {
        key: 'manhattan',
        value: function manhattan(coords1, coords2) {
            //l1范式
            var _coords1$split$map = coords1.split(',').map(function (s) {
                return parseInt(s);
            }),
                _coords1$split$map2 = _slicedToArray(_coords1$split$map, 2),
                x1 = _coords1$split$map2[0],
                y1 = _coords1$split$map2[1];

            var _coords2$split$map = coords2.split(',').map(function (s) {
                return parseInt(s);
            }),
                _coords2$split$map2 = _slicedToArray(_coords2$split$map, 2),
                x2 = _coords2$split$map2[0],
                y2 = _coords2$split$map2[1];

            return Math.abs(x1 - x2) + Math.abs(y1 - y2);
        }
    }, {
        key: 'euclidean',
        value: function euclidean(coords1, coords2) {
            //l2范式
            var _coords1$split$map3 = coords1.split(',').map(function (s) {
                return parseInt(s);
            }),
                _coords1$split$map4 = _slicedToArray(_coords1$split$map3, 2),
                x1 = _coords1$split$map4[0],
                y1 = _coords1$split$map4[1];

            var _coords2$split$map3 = coords2.split(',').map(function (s) {
                return parseInt(s);
            }),
                _coords2$split$map4 = _slicedToArray(_coords2$split$map3, 2),
                x2 = _coords2$split$map4[0],
                y2 = _coords2$split$map4[1];

            return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        }
    }]);

    return Search;
}();

exports.default = Search;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queue = exports.Queue = function Queue() {
    var _this = this;

    _classCallCheck(this, Queue);

    this.store = [];

    this.dequeue = function () {
        return _this.store.pop();
    };
    this.enqueue = function (item) {
        return _this.store.unshift(item);
    };
    this.isEmpty = function () {
        return _this.store.length === 0;
    };
};

var PriorityQueue = exports.PriorityQueue = function () {
    function PriorityQueue() {
        _classCallCheck(this, PriorityQueue);

        this.store = [{ item: null, priority: 0 }];
        // use array to represent filled bst
        // el at i has parent at Math.floor(i/2) and children at 2i, 2i+1
    }

    _createClass(PriorityQueue, [{
        key: "insert",
        value: function insert(item, priority) {
            this.store.push({ item: item, priority: priority });
            this._percolateUp();

            return this.store.length;
        }
    }, {
        key: "dequeue",
        value: function dequeue() {
            if (this.isEmpty()) {
                return null;
            } else if (this.store.length === 2) {
                return this.store.pop().item;
            } else {
                var min = this.store[1];
                this.store[1] = this.store.pop();
                this._percolateDown();

                return min.item;
            }
        }
    }, {
        key: "_percolateUp",
        value: function _percolateUp() {
            var childIdx = this.store.length - 1;
            var parentIdx = Math.floor(childIdx / 2);
            while (this.store[childIdx].priority < this.store[parentIdx].priority) {
                var _ref = [this.store[parentIdx], this.store[childIdx]];
                this.store[childIdx] = _ref[0];
                this.store[parentIdx] = _ref[1];


                childIdx = parentIdx;
                parentIdx = Math.floor(childIdx / 2);
            }
        }
    }, {
        key: "isEmpty",
        value: function isEmpty() {
            return this.store.length === 1;
        }
    }, {
        key: "_percolateDown",
        value: function _percolateDown() {
            var idx = 1;
            var minChildIdx = this._getMinChildIdx(idx);

            while (minChildIdx && this.store[idx].priority > this.store[minChildIdx].priority) {
                var _ref2 = [this.store[minChildIdx], this.store[idx]];
                this.store[idx] = _ref2[0];
                this.store[minChildIdx] = _ref2[1];


                idx = minChildIdx;
                minChildIdx = this._getMinChildIdx(idx);
            }
        }
    }, {
        key: "_getMinChildIdx",
        value: function _getMinChildIdx(idx) {
            var leftChild = this.store[2 * idx];
            var rightChild = this.store[2 * idx + 1];
            var minChildIdx = void 0,
                minPriority = void 0;
            if (rightChild) {
                minPriority = Math.min(leftChild.priority, rightChild.priority);
            } else if (leftChild) {
                minPriority = leftChild.priority;
            } else {
                return false;
            }
            return leftChild.priority === minPriority ? 2 * idx : 2 * idx + 1;
        }
    }]);

    return PriorityQueue;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(14);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _view = __webpack_require__(4);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
    var stage = new createjs.Stage('main-canvas');
    var view = new _view2.default(stage);
    window.view = view;
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(5);

var _board2 = _interopRequireDefault(_board);

var _search_export = __webpack_require__(8);

var Finders = _interopRequireWildcard(_search_export);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.Finders = Finders;

var View = function () {
    function View(stage) {
        _classCallCheck(this, View);

        this.stage = stage;
        this.board = new _board2.default(stage, 16, 16);
        this.board.init();
        this.finder = new Finders.AStar(this.board);
        this.color = '#212121';
        this.finders = new Array(4);
        this.colors = new Array(4);

        this.finders[0] = new Finders.AStar(this.board);
        this.finders[1] = new Finders.BestFirst(this.board);
        this.finders[2] = new Finders.Dijkstra(this.board);
        this.finders[3] = new Finders.BFS(this.board);
        this.colors[0] = '#212121';
        this.colors[1] = '#e91e63';
        this.colors[2] = '#757575';
        this.colors[3] = '#BDBDBD';

        this.addListeners();
        this.resetDimensions();
    }

    _createClass(View, [{
        key: 'addListeners',
        value: function addListeners() {
            window.addEventListener('resize', this.resetDimensions.bind(this));

            $('#algo-controls input').on('change', this.setNewAlgo.bind(this)); //寻路算法改变
            $('#run-search').on('click', this.runSearch.bind(this)); //开始寻路
            $('#clear-search').on('click', this.clearSearch.bind(this)); //清除寻路路线
            $('#compare-search').on('click', this.compareSearch.bind(this)); //多种寻路算法进行对比

            $('#run-search_1').on('click', this.runSearch1.bind(this)); //开始寻路
            $('#clear-search_1').on('click', this.clearSearch1.bind(this)); //清除寻路路线
            $('#single-search').on('click', this.singleSearch.bind(this)); //单个算法

            $('#set-obs').on('click', this.setObstaclePreset.bind(this)); //障碍预置
            $('#clear-obs').on('click', this.clearObstacles.bind(this)); //清空障碍

            $('#pixels-change').on('change', this.change_pixels.bind(this)); //改变大小

            $('.instructions-hide').on('click', this.hideInstructions.bind(this)); //隐藏对比结果
            $('.instructions-show').on('click', this.showInstructions.bind(this)); //显示对比结果
        }
    }, {
        key: 'setNewAlgo',
        value: function setNewAlgo(e) {
            //开始
            e.preventDefault();
            var algoName = $('input[name=algo]:checked', '#algo-controls').val();
            this.finder.kill();
            this.finder = new Finders[algoName](this.board);
            switch (algoName) {
                case 'AStar':
                    this.color = this.colors[0];
                    break;
                case 'BestFirst':
                    this.color = this.colors[1];
                    break;
                case 'Dijkstra':
                    this.color = this.colors[2];
                    break;
                case 'BFS':
                    this.color = this.colors[3];
                    break;
            }
            this.board.clearSearch();
        }
    }, {
        key: 'runSearch',
        value: function runSearch(e) {
            e.preventDefault();
            this.board.allowPaint = false;
            this.finder.run(this.color);
        }
    }, {
        key: 'runSearch1',
        value: function runSearch1(e) {
            e.preventDefault();
            this.board.allowPaint = false;

            var isChecked = [0, 0, 0, 0];
            $("input:checkbox:checked").each(function () {
                switch ($(this).val()) {
                    case "AStar":
                        isChecked[0] = 1;
                        break;
                    case "BestFirst":
                        isChecked[1] = 1;
                        break;
                    case "Dijkstra":
                        isChecked[2] = 1;
                        break;
                    case "BFS":
                        isChecked[3] = 1;
                        break;
                }
            });

            for (var i = 0; i < 4; i++) {
                this.finders.iterateTime = 0;
                if (isChecked[i] == 1) {
                    this.finders[i].run(this.colors[i]);
                }
            }
        }
    }, {
        key: 'clearSearch',
        value: function clearSearch(e) {
            e.preventDefault();
            this.finder.kill();
            this.board.clearSearch();
        }
    }, {
        key: 'clearSearch1',
        value: function clearSearch1(e) {
            e.preventDefault();
            for (var i = 0; i < 4; i++) {
                this.finders[i].kill();
            }this.board.clearSearch();
        }
    }, {
        key: 'compareSearch',
        value: function compareSearch(e) {
            e.preventDefault();
            $('.algorithm').addClass('minimized');
            $('.algorithm_1').removeClass('minimized');
            this.clearSearch(e);
        }
    }, {
        key: 'singleSearch',
        value: function singleSearch(e) {
            e.preventDefault();
            $('.algorithm').removeClass('minimized');
            $('.algorithm_1').addClass('minimized');
            this.clearSearch1(e);
        }
    }, {
        key: 'setObstaclePreset',
        value: function setObstaclePreset(e) {
            //预设障碍
            e.preventDefault();
            var preset = $('input[name=preset]:checked', '#obs-controls').val();
            this.finder.kill();
            this.board.clearSearch();
            if (preset === 'simple') {
                this.board.setupSimple();
            } else if (preset === 'maze') {
                this.board.setupMaze();
            }
        }
    }, {
        key: 'clearObstacles',
        value: function clearObstacles(e) {
            e.preventDefault();
            this.board.clearObstacles();
            // also clear search
            this.finder.kill();
            this.board.clearSearch();
        }
    }, {
        key: 'change_pixels',
        value: function change_pixels(e) {
            e.preventDefault();
            var pix_val = $('#pixels-change').val();
            var temp_val = parseInt(8 + pix_val * 8 / 50);

            var c1 = document.getElementById('main-canvas');
            c1.remove(); //用于清除canvas
            $('#Div1').before("<canvas id=\"main-canvas\" width=\"750\" height=\"500\"></canvas>"); //添加canvas

            this.stage = new createjs.Stage('main-canvas');
            this.board = new _board2.default(this.stage, temp_val, temp_val);
            this.board.init();

            this.finder.kill();
            this.finder = new Finders.AStar(this.board);

            for (var i = 0; i < 4; i++) {
                this.finders[i].kill();
            }this.finders = new Array(4);
            this.finders[0] = new Finders.AStar(this.board);
            this.finders[1] = new Finders.BestFirst(this.board);
            this.finders[2] = new Finders.Dijkstra(this.board);
            this.finders[3] = new Finders.BFS(this.board);
            this.resetDimensions();
        }
    }, {
        key: 'hideInstructions',
        value: function hideInstructions(e) {
            e.preventDefault();
            $('.instructions').addClass('minimized');
            $('.instructions .content').addClass('hidden');
            $('.instructions .buttons').addClass('hidden');
            $('.instructions .instructions-show').removeClass('hidden');
        }
    }, {
        key: 'showInstructions',
        value: function showInstructions(e) {
            e.preventDefault();

            // for (var i = 0; i < 4; i++) {
            //     if (this.isChecked[i] == 1) {
            //         this.finders[i].run(this.colors[i]);
            //     }
            // }

            console.log(this.finders[0].iterateTime);

            $('#AStar_color_result').html(this.finders[0].iterateTime + " iterate times");
            $('#BestFirst_color_result').html(this.finders[1].iterateTime + " iterate times");
            $('#Dijkstra_color_result').html(this.finders[2].iterateTime + " iterate times");
            $('#BFS_color_result').html(this.finders[3].iterateTime + " iterate times");

            $('.instructions').removeClass('minimized');
            $('.instructions .content').removeClass('hidden');
            $('.instructions .buttons').removeClass('hidden');
            $('.instructions .instructions-show').addClass('hidden');
        }
    }, {
        key: 'resetDimensions',
        value: function resetDimensions() {
            $('#main-canvas').width(window.innerWidth);
            $('#main-canvas').height(window.innerHeight);
            this.board.resetDimensions(this.board.dx, this.board.dy);
        }
    }]);

    return View;
}();

exports.default = View;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _graph_node = __webpack_require__(6);

var _graph_node2 = _interopRequireDefault(_graph_node);

var _board_presets = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board(stage, dx, dy) {
        _classCallCheck(this, Board);

        this.stage = stage;

        this.resetDimensions(dx, dy);
        this.grid = this.buildGrid();
        this.addListeners();
        this.allowPaint = true;
    }

    _createClass(Board, [{
        key: 'resetDimensions',
        value: function resetDimensions(dx, dy) {
            this.DIM_X = this.stage.canvas.width;
            this.DIM_Y = this.stage.canvas.height;
            this.dx = dx;
            this.dy = dy;
        }
    }, {
        key: 'buildGrid',
        value: function buildGrid() {
            //建立网格,宽高为整个canvas的宽高
            var grid = {};

            for (var i = 0; i < this.DIM_X; i += this.dx) {
                for (var j = 0; j < this.DIM_Y; j += this.dy) {
                    var node = new _graph_node2.default(i, j, this.dx, this.dy);
                    grid[node.coords] = node;
                    this.stage.addChild(node.easelCell);
                }
            }

            return grid;
        }
    }, {
        key: 'addListeners',
        value: function addListeners() {
            var _this = this;

            this.stage.on('click', this.handleClick.bind(this));
            this.stage.on('pressmove', this.handleMouseMove.bind(this));
            this.stage.on('pressup', function () {
                _this.handleMouseMove.prevCoords = null;
            });
        }
    }, {
        key: 'init',
        value: function init() {
            this.setStart(this._localToGrid(_board_presets.simple.start));
            this.setGoal(this._localToGrid(_board_presets.simple.goal));
            createjs.Ticker.addEventListener('tick', this.stage);
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            //点击事件,添加为障碍物,若本来就为障碍物,那么删除该障碍物
            console.log([Math.floor(e.stageX / this.dx), Math.floor(e.stageY / this.dy)].toString());

            if (this.allowPaint) {
                var node = this.grid[this._getCoordsFromEvent(e)];
                node.toggleIsObstacle();
            }
        }
    }, {
        key: 'handleMouseMove',
        value: function handleMouseMove(e) {
            //按住鼠标拖动的区域都变为障碍物,起始点和目标点也可以拖动移动位置
            var currCoords = this._getCoordsFromEvent(e);
            if (!this.grid[currCoords]) return false;

            var prevCoords = this.handleMouseMove.prevCoords;
            //现在的node不同于之前的
            if (currCoords !== prevCoords) {
                if (this.start === prevCoords) {
                    this.setStart(currCoords);
                } else if (this.goal === prevCoords) {
                    this.setGoal(currCoords);
                } else {
                    if (this.start !== currCoords && this.goal !== currCoords && this.allowPaint) {
                        var node = this.grid[currCoords];
                        node.toggleIsObstacle();
                    }
                }

                this.handleMouseMove.prevCoords = currCoords;
            }
        }
    }, {
        key: 'setStart',
        value: function setStart(coords) {
            //设置起始点坐标
            if (this.start) this.grid[this.start].setType('empty');
            this.start = coords;
            this.grid[coords].setType('start');
        }
    }, {
        key: 'setGoal',
        value: function setGoal(coords) {
            //设置目标点坐标
            if (this.goal) this.grid[this.goal].setType('empty');
            this.goal = coords;
            this.grid[coords].setType('goal');
        }
    }, {
        key: 'clearSearch',
        value: function clearSearch() {
            //清空搜索路线
            for (var coords in this.grid) {
                this.grid[coords].clearIfSearch();
            }
            this.allowPaint = true;
        }
    }, {
        key: 'clearObstacles',
        value: function clearObstacles() {
            //清空障碍物
            for (var coords in this.grid) {
                this.grid[coords].clearIfObstacle();
            }
        }
    }, {
        key: 'setupSimple',
        value: function setupSimple() {
            var _this2 = this;

            //设置默认障碍
            this.clearObstacles();
            this.setStart(this._localToGrid(_board_presets.simple.start));
            this.setGoal(this._localToGrid(_board_presets.simple.goal));
            _board_presets.simple.obstacles.forEach(function (coords) {
                return _this2.grid[_this2._localToGrid(coords)].toggleIsObstacle();
            });
        }
    }, {
        key: 'setupMaze',
        value: function setupMaze() {
            var _this3 = this;

            //设置迷宫
            this.clearObstacles();
            this.setStart(this._localToGrid(_board_presets.maze.start));
            this.setGoal(this._localToGrid(_board_presets.maze.goal));
            _board_presets.maze.obstacles.forEach(function (coords) {
                return _this3.grid[_this3._localToGrid(coords)].toggleIsObstacle();
            });
        }
    }, {
        key: 'neighbors',
        value: function neighbors(coords) {
            //获取相邻节点
            var _coords$split$map = coords.split(',').map(function (str) {
                return parseInt(str);
            }),
                _coords$split$map2 = _slicedToArray(_coords$split$map, 2),
                x = _coords$split$map2[0],
                y = _coords$split$map2[1];

            //array of coords that are neighbors


            var neighbors = [];
            for (var dx = -1; dx < 2; dx++) {
                for (var dy = -1; dy < 2; dy++) {
                    if (dx === dy || dx === -dy) continue;

                    var testCoords = [x + this.dx * dx, y + this.dy * dy].toString();
                    if (this.grid[testCoords]) {
                        neighbors.push(testCoords);
                    }
                }
            }
            return neighbors;
        }
    }, {
        key: '_localToGrid',
        value: function _localToGrid(localCoords) {
            //映射到网格坐标
            var _localCoords$split$ma = localCoords.split(',').map(function (str) {
                return parseInt(str);
            }),
                _localCoords$split$ma2 = _slicedToArray(_localCoords$split$ma, 2),
                i = _localCoords$split$ma2[0],
                j = _localCoords$split$ma2[1];

            return [i * this.dx, j * this.dy].toString();
        }
    }, {
        key: '_getCoordsFromEvent',
        value: function _getCoordsFromEvent(e) {
            return [Math.floor(e.stageX / this.dx) * this.dx, Math.floor(e.stageY / this.dy) * this.dy].toString();
        }
    }, {
        key: '_generateCoords',
        value: function _generateCoords() {
            //随机生成坐标
            var x = Math.random() * this.DIM_X;
            var y = Math.random() * this.DIM_Y;
            x = Math.floor(x / this.dx) * this.dx;
            y = Math.floor(y / this.dy) * this.dy;
            return [x, y].toString();
        }
    }]);

    return Board;
}();

exports.default = Board;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var graphNode = function () {
    function graphNode(x, y, dx, dy) {
        _classCallCheck(this, graphNode);

        this.easelCell = new createjs.Shape();
        this.dx = dx;
        this.dy = dy;
        this.setType('empty');
        this.setCoords(x, y);
    }

    _createClass(graphNode, [{
        key: 'setType',
        value: function setType(type) {
            if (['visited', 'frontier'].includes(type) && ['start', 'goal', 'obstacle'].includes(this.type)) {
                return;
            }

            this.type = type;
            this._fill(graphNode.COLORS[type]);
        }
    }, {
        key: 'setCoords',
        value: function setCoords(x, y) {
            this.coords = [x, y].toString();
            this.easelCell.x = x;
            this.easelCell.y = y;
        }
    }, {
        key: 'toggleIsObstacle',
        value: function toggleIsObstacle() {
            //交换状态
            if (this.type === 'obstacle') {
                this.setType('empty');
            } else if (this.type === 'empty') {
                this.setType('obstacle');
            }
        }
    }, {
        key: 'clearIfSearch',
        value: function clearIfSearch() {
            if (['frontier', 'visited'].includes(this.type)) {
                this.setType('empty');
            }
        }
    }, {
        key: 'clearIfObstacle',
        value: function clearIfObstacle() {
            if (this.type === 'obstacle') this.setType('empty');
        }
    }, {
        key: '_fill',
        value: function _fill(color) {
            this.easelCell.graphics.clear();
            this.drawBorder();
            this.easelCell.graphics.beginFill(color).drawRect(1, 1, this.dx - 2, this.dy - 2).endFill();
        }
    }, {
        key: 'drawBorder',
        value: function drawBorder() {
            this.easelCell.graphics.setStrokeStyle(1).beginStroke('#fff').drawRect(0, 0, this.dx, this.dy).endStroke();
        }
    }]);

    return graphNode;
}();

graphNode.COLORS = {
    'empty': '#e8e8e8',
    'start': '#f00',
    'goal': '#00f',
    'obstacle': '#c1c1c1',
    'visited': '#98fb98',
    'frontier': '#0ff'
};

exports.default = graphNode;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var simple = {
  start: '10,15',
  goal: '28,15',
  obstacles: ['27,12', '27,13', '27,14', '27,15', '27,16', '27,17', '27,18', '26,11', '26,12', '26,13', '26,14', '26,15', '26,16', '26,17', '26,18', '26,19', '25,10', '25,11', '25,12', '25,13', '25,20', '25,19', '25,18', '25,17', '24,18', '24,19', '24,20', '24,21', '24,12', '24,11', '24,10', '24,9', '23,9', '23,10', '23,11', '22,9', '22,10', '22,11', '21,9', '21,10', '21,11', '20,10', '20,11', '19,11', '23,19', '23,20', '23,21', '22,19', '22,20', '22,21', '21,19', '21,20', '21,21', '20,19', '20,20', '19,19']
};

var maze = {
  start: '35,29',
  goal: '0,0',
  obstacles: []
};
for (var i = 0; i < 47; i++) {
  for (var j = 0; j < 31; j++) {
    if (i % 2 === 0 || j % 2 === 0) {
      maze.obstacles.push(i + ',' + j);
    }
  }
}
// correct path
maze.obstacles = maze.obstacles.concat(['0,1', '1,2', '2,3', '3,4', '4,5', '6,5', '8,5', '9,6', '10,7', '12,7', '13,8', '13,10', '13,12', '14,13', '16,13', '17,14', '17,16', '17,18', '17,20', '17,22', '18,23', '20,23', '21,22', '21,20', '22,19', '23,20', '23,22', '24,23', '25,24', '26,25', '27,24', '27,22', '27,20', '27,18', '27,16', '28,17', '29,18', '30,19', '32,19', '31,20', '32,21', '33,22', '33,24', '34,25', '32,25', '31,26', '32,27', '33,28', '34,29', '16,19', '14,19', '12,19', '11,18', '10,17', '9,16', '8,15', '10,15', '12,15', '17,14', '17,16', '13,13', '13,14', '13,13', '12,9', '10,9', '8,9', '7,8', '7,6', '5,4', '4,3', '4,5', '3,4', '3,2', '2,1', '0,1', '1,0', '0,1', '1,0', '14,9', '16,9', '17,8', '17,6', '16,5', '15,4', '14,3', '12,3', '11,4', '10,5', '10,7', '10,9', '7,8']);

// fake paths on left
maze.obstacles = maze.obstacles.concat(['28,21', '29,22', '30,23', '30,27', '29,26', '31,28', '30,29', '34,21', '36,23', '33,18', '34,17', '32,17', '31,16', '31,14', '31,12', '32,11', '34,11', '33,12', '33,14', '34,15', '35,14', '30,13', '29,12', '29,10', '30,9', '32,9', '33,8', '33,6', '34,5', '35,6', '29,14', '36,5', '1,2', '2,3', '1,2', '1,4', '2,5', '3,6', '2,7', '1,8', '2,9', '4,9', '5,10', '4,11', '3,12', '4,13', '5,14', '1,12', '1,14', '2,15', '2,11', '3,16', '2,17', '1,18', '2,19', '4,19', '6,19', '8,19', '9,20', '9,22', '10,23', '12,23', '13,24', '13,26', '12,27', '11,26', '10,25', '9,26', '9,28', '8,29', '7,28', '6,27', '5,26', '6,25', '6,21', '6,23', '4,21', '3,22', '7,22', '2,25', '3,24', '1,24', '2,21', '1,26', '1,28', '2,29', '3,28', '4,29', '12,29', '14,29', '15,28', '16,27', '18,27', '19,28', '17,28', '16,29', '17,28', '16,29', '18,29', '13,20', '14,21', '15,22', '15,24', '16,25', '17,26', '11,20', '20,27', '22,27', '23,25', '23,26', '23,25', '22,25', '21,24', '23,28', '20,29', '14,23', '1,2', '27,26', '27,28', '26,29', '25,28', '11,10', '11,12', '10,13', '9,12', '8,11', '7,12', '9,8', '36,29', '38,29', '37,28', '6,1', '8,1', '9,2', '8,3', '12,1', '14,1', '16,1', '17,2', '18,3', '20,3', '19,4', '19,6', '20,7', '21,8', '22,9', '23,10', '22,11', '20,11', '19,10', '23,12', '23,14', '22,15', '21,14', '20,13', '19,14', '19,20', '19,18', '20,17', '14,17', '15,16', '16,15', '18,15', '17,10', '16,11', '15,6', '13,6', '21,2', '22,1', '24,1', '25,2', '24,3', '23,4', '24,5', '26,5', '28,5', '30,5', '29,4', '29,2', '30,1', '32,1', '31,2', '32,1', '32,3', '33,2', '28,1', '27,2', '27,6', '26,7', '24,7', '25,8', '26,9', '26,11', '25,12', '26,13', '25,14', '28,13', '31,8', '30,7', '26,19', '25,18', '24,17', '24,21', '4,17', '5,16', '4,17', '5,16', '6,17', '7,18', '23,16', '23,12', '24,11']);

// fake paths on right
maze.obstacles = maze.obstacles.concat(['36,1', '37,2', '38,3', '39,4', '40,5', '42,5', '44,5', '45,6', '44,7', '42,7', '41,8', '42,9', '43,10', '44,11', '45,12', '45,14', '44,15', '43,14', '41,16', '42,17', '43,18', '44,19', '45,18', '43,20', '44,21', '45,22', '45,24', '44,25', '43,24', '42,25', '41,26', '42,27', '43,28', '44,29', '45,28', '39,26', '39,28', '40,25', '40,27', '41,28', '41,26', '40,25', '41,28', '42,29', '34,25', '36,25', '35,26', '37,24', '38,23', '39,22', '39,20', '40,19', '41,20', '42,23', '38,19', '37,18', '37,16', '38,15', '39,16', '36,19', '35,20', '34,21', '36,21', '37,10', '37,12', '38,13', '40,11', '39,10', '41,12', '39,12', '36,9', '39,6', '37,6', '38,5', '37,6', '38,7', '43,4', '43,2', '44,1', '45,2', '42,3', '32,19', '36,27', '36,15', '26,13']);

exports.simple = simple;
exports.maze = maze;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AStar = exports.BestFirst = exports.Dijkstra = exports.BFS = undefined;

var _bfs = __webpack_require__(9);

var _bfs2 = _interopRequireDefault(_bfs);

var _dijkstra = __webpack_require__(11);

var _dijkstra2 = _interopRequireDefault(_dijkstra);

var _best_first = __webpack_require__(12);

var _best_first2 = _interopRequireDefault(_best_first);

var _a_star = __webpack_require__(13);

var _a_star2 = _interopRequireDefault(_a_star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.BFS = _bfs2.default;
exports.Dijkstra = _dijkstra2.default;
exports.BestFirst = _best_first2.default;
exports.AStar = _a_star2.default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _search = __webpack_require__(0);

var _search2 = _interopRequireDefault(_search);

var _data_structures = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BFS = function (_Search) {
    _inherits(BFS, _Search);

    function BFS() {
        _classCallCheck(this, BFS);

        return _possibleConstructorReturn(this, (BFS.__proto__ || Object.getPrototypeOf(BFS)).apply(this, arguments));
    }

    _createClass(BFS, [{
        key: 'initializeFrontier',
        value: function initializeFrontier() {
            this.frontier = new _data_structures.Queue();
            _get(BFS.prototype.__proto__ || Object.getPrototypeOf(BFS.prototype), 'initializeFrontier', this).call(this);
        }
    }, {
        key: 'processNeighbors',
        value: function processNeighbors(current) {
            this.board.neighbors(current).forEach(function (neighbor) {
                if (!(neighbor in this.cameFrom)) {
                    var type = this.board.grid[neighbor].type;
                    if (type !== 'obstacle') {
                        this.frontier.enqueue(neighbor);
                        this.cameFrom[neighbor] = current;
                        this.board.grid[neighbor].setType('frontier');
                    }
                }
            }.bind(this));
        }
    }]);

    return BFS;
}(_search2.default);

exports.default = BFS;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Path = function () {
    function Path(path, stage, color, dx, dy) {
        _classCallCheck(this, Path);

        this.stage = stage;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
        this.processStringPath(path);
    }

    _createClass(Path, [{
        key: 'processStringPath',
        value: function processStringPath(stringPath) {
            this.path = new createjs.Shape();
            this.path.graphics.setStrokeStyle(this.dx / 8).beginStroke(this.color);

            stringPath.forEach(function (strCoords) {
                var _strCoords$split$map = strCoords.split(',').map(function (s) {
                    return parseInt(s);
                }),
                    _strCoords$split$map2 = _slicedToArray(_strCoords$split$map, 2),
                    x = _strCoords$split$map2[0],
                    y = _strCoords$split$map2[1];

                x += this.dx / 2;
                y += this.dy / 2; // center on square, refactor this!
                this.path.graphics.lineTo(x, y);
            }.bind(this));
            this.path.graphics.endStroke();
            this.stage.addChild(this.path);
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.stage.removeChild(this.path);
        }
    }]);

    return Path;
}();

exports.default = Path;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _search = __webpack_require__(0);

var _search2 = _interopRequireDefault(_search);

var _data_structures = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dijkstra = function (_Search) {
    _inherits(Dijkstra, _Search);

    function Dijkstra() {
        _classCallCheck(this, Dijkstra);

        return _possibleConstructorReturn(this, (Dijkstra.__proto__ || Object.getPrototypeOf(Dijkstra)).apply(this, arguments));
    }

    _createClass(Dijkstra, [{
        key: 'initializeFrontier',
        value: function initializeFrontier() {
            this.frontier = new _data_structures.PriorityQueue();
            _get(Dijkstra.prototype.__proto__ || Object.getPrototypeOf(Dijkstra.prototype), 'initializeFrontier', this).call(this);
        }
    }, {
        key: 'reset',
        value: function reset() {
            _get(Dijkstra.prototype.__proto__ || Object.getPrototypeOf(Dijkstra.prototype), 'reset', this).call(this);
            this.costSoFar = {};
            this.costSoFar[this.board.start] = 0;
        }
    }, {
        key: 'processNeighbors',
        value: function processNeighbors(current) {
            this.board.neighbors(current).forEach(function (neighbor) {
                var type = this.board.grid[neighbor].type;
                var cost = type === 'obstacle' ? 20000 : 34; //如果是障碍的话边权接近正无穷
                var newCost = this.costSoFar[current] + cost;

                if (!(neighbor in this.costSoFar) || newCost < this.costSoFar[neighbor]) {
                    this.frontier.insert(neighbor, newCost);
                    this.cameFrom[neighbor] = current;
                    this.costSoFar[neighbor] = newCost;
                    this.board.grid[neighbor].setType('frontier');
                }
            }.bind(this));
        }
    }]);

    return Dijkstra;
}(_search2.default);

exports.default = Dijkstra;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _search = __webpack_require__(0);

var _search2 = _interopRequireDefault(_search);

var _data_structures = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BestFirst = function (_Search) {
    _inherits(BestFirst, _Search);

    function BestFirst() {
        _classCallCheck(this, BestFirst);

        return _possibleConstructorReturn(this, (BestFirst.__proto__ || Object.getPrototypeOf(BestFirst)).apply(this, arguments));
    }

    _createClass(BestFirst, [{
        key: 'initializeFrontier',
        value: function initializeFrontier() {
            this.frontier = new _data_structures.PriorityQueue();
            _get(BestFirst.prototype.__proto__ || Object.getPrototypeOf(BestFirst.prototype), 'initializeFrontier', this).call(this);
        }
    }, {
        key: 'processNeighbors',
        value: function processNeighbors(current) {
            this.board.neighbors(current).forEach(function (neighbor) {
                if (!(neighbor in this.cameFrom)) {
                    var type = this.board.grid[neighbor].type;
                    if (type !== 'obstacle') {
                        var priority = this.euclidean(neighbor, this.board.goal);

                        this.frontier.insert(neighbor, priority);
                        this.cameFrom[neighbor] = current;
                        this.board.grid[neighbor].setType('frontier');
                    }
                }
            }.bind(this));
        }
    }]);

    return BestFirst;
}(_search2.default);

exports.default = BestFirst;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _search = __webpack_require__(0);

var _search2 = _interopRequireDefault(_search);

var _data_structures = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AStar = function (_Search) {
    _inherits(AStar, _Search);

    function AStar() {
        _classCallCheck(this, AStar);

        return _possibleConstructorReturn(this, (AStar.__proto__ || Object.getPrototypeOf(AStar)).apply(this, arguments));
    }

    _createClass(AStar, [{
        key: 'initializeFrontier',
        value: function initializeFrontier() {
            this.frontier = new _data_structures.PriorityQueue();
            _get(AStar.prototype.__proto__ || Object.getPrototypeOf(AStar.prototype), 'initializeFrontier', this).call(this);
        }
    }, {
        key: 'reset',
        value: function reset() {
            _get(AStar.prototype.__proto__ || Object.getPrototypeOf(AStar.prototype), 'reset', this).call(this);
            this.costSoFar = {};
            this.costSoFar[this.board.start] = 0;
        }
    }, {
        key: 'processNeighbors',
        value: function processNeighbors(current) {
            this.board.neighbors(current).forEach(function (neighbor) {
                var type = this.board.grid[neighbor].type;
                var cost = type === 'obstacle' ? 20000 : 6;
                var newCost = this.costSoFar[current] + cost;

                if (!(neighbor in this.costSoFar) || newCost < this.costSoFar[neighbor]) {
                    var priority = newCost + this.euclidean(neighbor, this.board.goal);

                    this.frontier.insert(neighbor, priority);
                    this.cameFrom[neighbor] = current;
                    this.costSoFar[neighbor] = newCost;
                    this.board.grid[neighbor].setType('frontier');
                }
            }.bind(this));
        }
    }]);

    return AStar;
}(_search2.default);

exports.default = AStar;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var path = __webpack_require__(15);

module.exports = {
  context: __dirname,
  entry: "./js/pathfinder",
  output: {
    filename: "./js/bundle.js"
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["*", ".js"]
  },
  module: {
    loaders: [{
      test: [/\.js?$/],
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map