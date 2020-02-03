import Board from './board';
import * as Finders from './search/search_export';

window.Finders = Finders;

class View {
    constructor(stage) {
        this.stage = stage;
        this.board = new Board(stage, 16, 16);
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

    addListeners() {
        window.addEventListener('resize', this.resetDimensions.bind(this));

        $('#algo-controls input').on('change', this.setNewAlgo.bind(this));//寻路算法改变
        $('#run-search').on('click', this.runSearch.bind(this));//开始寻路
        $('#clear-search').on('click', this.clearSearch.bind(this));//清除寻路路线
        $('#compare-search').on('click', this.compareSearch.bind(this));//多种寻路算法进行对比

        $('#run-search_1').on('click', this.runSearch1.bind(this));//开始寻路
        $('#clear-search_1').on('click', this.clearSearch1.bind(this));//清除寻路路线
        $('#single-search').on('click', this.singleSearch.bind(this));//单个算法

        $('#set-obs').on('click', this.setObstaclePreset.bind(this));//障碍预置
        $('#clear-obs').on('click', this.clearObstacles.bind(this));//清空障碍

        $('#pixels-change').on('change', this.change_pixels.bind(this));//改变大小

        $('.instructions-hide').on('click', this.hideInstructions.bind(this));//隐藏对比结果
        $('.instructions-show').on('click', this.showInstructions.bind(this));//显示对比结果
    }

    setNewAlgo(e) {//开始
        e.preventDefault();
        const algoName = $('input[name=algo]:checked', '#algo-controls').val();
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

    runSearch(e) {
        e.preventDefault();
        this.board.allowPaint = false;
        this.finder.run(this.color);
    }

    runSearch1(e) {
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

    clearSearch(e) {
        e.preventDefault();
        this.finder.kill();
        this.board.clearSearch();
    }

    clearSearch1(e) {
        e.preventDefault();
        for (var i = 0; i < 4; i++)
            this.finders[i].kill();
        this.board.clearSearch();
    }

    compareSearch(e) {
        e.preventDefault();
        $('.algorithm').addClass('minimized');
        $('.algorithm_1').removeClass('minimized');
        this.clearSearch(e);
    }

    singleSearch(e) {
        e.preventDefault();
        $('.algorithm').removeClass('minimized');
        $('.algorithm_1').addClass('minimized');
        this.clearSearch1(e);
    }

    setObstaclePreset(e) {//预设障碍
        e.preventDefault();
        const preset = $('input[name=preset]:checked', '#obs-controls').val();
        this.finder.kill();
        this.board.clearSearch();
        if (preset === 'simple') {
            this.board.setupSimple();
        } else if (preset === 'maze') {
            this.board.setupMaze();
        }
    }

    clearObstacles(e) {
        e.preventDefault();
        this.board.clearObstacles();
        // also clear search
        this.finder.kill();
        this.board.clearSearch();
    }

    change_pixels(e) {
        e.preventDefault();
        const pix_val = $('#pixels-change').val();
        const temp_val = parseInt(8 + pix_val * 8 / 50);

        var c1 = document.getElementById('main-canvas');
        c1.remove();//用于清除canvas
        $('#Div1').before("<canvas id=\"main-canvas\" width=\"750\" height=\"500\"></canvas>");//添加canvas

        this.stage = new createjs.Stage('main-canvas');
        this.board = new Board(this.stage, temp_val, temp_val);
        this.board.init();

        this.finder.kill();
        this.finder = new Finders.AStar(this.board);

        for (var i = 0; i < 4; i++)
            this.finders[i].kill();

        this.finders = new Array(4);
        this.finders[0] = new Finders.AStar(this.board);
        this.finders[1] = new Finders.BestFirst(this.board);
        this.finders[2] = new Finders.Dijkstra(this.board);
        this.finders[3] = new Finders.BFS(this.board);
        this.resetDimensions();
    }

    hideInstructions(e) {
        e.preventDefault();
        $('.instructions').addClass('minimized');
        $('.instructions .content').addClass('hidden');
        $('.instructions .buttons').addClass('hidden');
        $('.instructions .instructions-show').removeClass('hidden');
    }

    showInstructions(e) {
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

    resetDimensions() {
        $('#main-canvas').width(window.innerWidth);
        $('#main-canvas').height(window.innerHeight);
        this.board.resetDimensions(this.board.dx, this.board.dy);
    }
}

export default View;
