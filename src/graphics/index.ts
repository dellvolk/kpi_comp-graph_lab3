import {stage} from './stage'
import Grid from './grid'
import Circle from './circle'
import {ICore, IPoint} from "./types";
import Line, {LineDeg, LinePoint} from "./line";
import line from './line';

const point = (x: number, y: number): IPoint => ({x, y})

export default function (): ICore {

    const canvas = document.getElementById('stage') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.beginPath();

    let historyInflectionPoints:number[] = []

    stage.ctx = ctx;

    const {height: HEIGHT, width: WIDTH} = stage

    canvas.width = WIDTH
    canvas.height = HEIGHT

    const grid = Grid(ctx)

    // @ts-ignore
    window.ctx = ctx

    stage.setTransformMatrix([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ])

    function drawPoints() {
        ctx.strokeStyle = 'blue' // pivot point
        Circle(stage.rotation.x, stage.rotation.y, .1)

        // ctx.strokeStyle = 'green' // active point
        // const {activePointIndex, figure: {a}} = stage;
        // const x = 2 * a * Math.cos(activePointIndex) * (1 + Math.cos(activePointIndex)),
        //     y = 2 * a * Math.sin(activePointIndex) * (1 + Math.cos(activePointIndex));
        // Circle(x, y, .1)

        ctx.strokeStyle = 'black'
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        grid.draw()

        ctx.beginPath()

        figure()

        ctx.closePath()

        stage.init = false;
    }

    const calculateArcPoint = (a:IPoint, b:IPoint, c:IPoint, wa:number, wb:number, wc: number, u:number):IPoint => {
        const divider = wa * Math.pow(1-u, 2) + 2 * wb * u * (1 - u) + wc * Math.pow(u, 2)
        return point(
            (a.x * wa * Math.pow(1-u, 2) + 2 * b.x * wb * u * (1-u) + c.x * wc * Math.pow(u, 2)) / divider,
            (a.y * wa * Math.pow(1-u, 2) + 2 * b.y * wb * u * (1-u) + c.y * wc * Math.pow(u, 2)) / divider,
        )
    }

    function figure() {
        const figure_points = stage.figure_points

        if (!figure_points || figure_points?.length === 0) return void 0;

        // console.log('figure', stage.figure_points)
        // console.log(JSON.stringify(stage.figure_points))

        figure_points?.forEach(({ax, ay, bx, by, cx, cy, wa, wc, f, u:[from, to]}) => {
            const a = point(ax,ay)
            const b = point(bx,by)
            const c = point(cx,cy)

            if (stage.showPoints) {
                ctx.strokeStyle = 'blue'
                Circle(ax, ay, .1)
                ctx.strokeStyle = 'green'
                Circle(bx, by, .1)
                ctx.strokeStyle = 'red'
                Circle(cx, cy, .1)
                ctx.strokeStyle = 'black'
                LinePoint(a,b,1)
                LinePoint(b,c,1)
            }

            let wb = f / (1 - f)

            let prevPoint:IPoint | undefined;
            for (let u = from; u <= to; u += .01) {
                let p = calculateArcPoint(a,b,c,wa,wb,wc,u)
                if (prevPoint) {
                    LinePoint(prevPoint, p)
                }
                prevPoint = p;
            }
        })
    }

    function set(changed: string, value: number) {
        const [type, key] = changed.split('.')
        if (!key) {
            // @ts-ignore
            stage[changed] = value
            // draw()
            // return void 0;
        } else {
            // @ts-ignore
            stage[type][key] = value
        }

        if (type === 'affine') {

            let {xx, xy, yx, yy, ox, oy} = stage.affine

            // xx /= stage.px_per_sm
            // xy /= stage.px_per_sm
            // yx /= stage.px_per_sm
            // yy /= stage.px_per_sm
            // ox *= stage.px_per_sm
            // oy *= stage.px_per_sm

            // console.log([
            //     [xx, xy, 0],
            //     [yx, yy, 0],
            //     [ox, oy, 1],
            // ])

            stage.setTransformMatrix([
                [xx, xy, 0],
                [yx, yy, 0],
                [ox, oy, 1],
            ])
        } else if (type === 'projective') {
            let {xx, xy, yx, yy, ox, oy, wx, wy, wo} = stage.projective

            // xx /= stage.px_per_sm
            // xy /= stage.px_per_sm
            // yx /= stage.px_per_sm
            // yy /= stage.px_per_sm
            // wx /= stage.px_per_sm * 100
            // wy /= stage.px_per_sm * 100
            // wo /= stage.px_per_sm
            // ox *= stage.px_per_sm
            // oy *= stage.px_per_sm

            xx *= stage.px_per_sm
            xy *= stage.px_per_sm
            yx *= stage.px_per_sm
            yy *= stage.px_per_sm

            ox *= stage.px_per_sm
            oy *= stage.px_per_sm
            // xx *= stage.px_per_sm

            // console.log([
            //     [xx, xy, wx],
            //     [yx, yy, wy],
            //     [ox, oy, wo],
            // ])

            stage.setTransformMatrix([
                [xx * wx, xy * wx, wx],
                [yx * wy, yy * wy, wy],
                [ox * wo, oy * wo, wo],
            ])
        }

        // switch (type) {
        //     case 'shift':
        //
        //
        //         break;
        //     default:
        //         break;
        // }

        draw()

    }

    // draw()

    return {
        draw,
        set,
    }
}


