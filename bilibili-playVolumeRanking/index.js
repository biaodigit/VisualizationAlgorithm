let createData = () => {
    let ret = [];
    for (let i = 0; i < 10; i++) {
        const item = {
            rank: `第${i + 1}号`,
            count: parseInt(Math.random() * 600)
        };
        ret[i] = item
    }

    return ret
};

class playRankingAnimate {
    constructor() {
        this.data = [];
        this.ele = [];
        this.init = false;
    }

    bindData(data) {
        if (data instanceof Array) {
            this.data = data
        } else {
            throw new Error('data is not Array')
        }
    }

    action() {
        this.bindData(createData());
        this.createAnimation();
        setInterval(() => {
            this.bindData(createData());
            this.animationLoop()
        }, 3000);
    }

    //创建dom函数
    createAnimation() {
        this.data.sort((prev, next) => next.count - prev.count);

        this.data.forEach((item, index) => {
            const ele = document.createElement('div');
            ele.classList.add('row');
            ele.style.top = `${index * 40 + 50}px`;

            const rank = document.createElement('div');
            rank.classList.add('rank');
            rank.textContent = item.rank;
            ele.appendChild(rank);

            const content = document.createElement('div');
            content.classList.add('content');

            const graph = document.createElement('span');
            graph.classList.add('graph');
            graph.style.width = `${item.count}px`;
            content.appendChild(graph);

            const count = document.createElement('span');
            count.classList.add('count');
            count.textContent = item.count;
            content.appendChild(count);
            ele.appendChild(content);

            document.getElementById('box').appendChild(ele);

            this.ele.push({
                item: item,
                el: {
                    row: ele,
                    graph: graph,
                    count: count
                }
            })
        })
    }

    //核心函数
    animationLoop() {
        this.data.sort((prev, next) => next.count - prev.count);

        this.data.forEach((next, index) => {
            this.ele.forEach((prev) => {
                if (prev.item.rank === next.rank) {
                    const ele = prev.el;
                    ele.row.style.top = `${index * 40 + 50}px`;
                    ele.graph.style.width = `${next.count}px`;
                    this.digitalAnimation(ele, prev.item.count, next.count)
                }
            })
        })
    }

    //数值动画
    digitalAnimation(el, prevDigit, nextDigit) {
        let timer;
        if (prevDigit > nextDigit) {
            timer = setInterval(() => {
                if (prevDigit > nextDigit) {
                    el.count.textContent = --prevDigit
                } else {
                    timer = null
                }
            }, 5);
        } else {
            timer = setInterval(() => {
                if (prevDigit < nextDigit) {
                    el.count.textContent = ++prevDigit
                } else {
                    timer = null
                }
            }, 5);
        }
    }
}

let playRank = new playRankingAnimate();

playRank.action();