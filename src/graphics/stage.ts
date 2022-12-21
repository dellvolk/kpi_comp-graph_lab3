import {IAffine, IFigurePoint, IPoint, IProjective, IRotation, ITransformMatrix} from "./types"


interface IStage {
    width: number
    height: number
    padding: number
    px_per_sm: number
    ox: (x: number) => number
    oy: (x: number) => number
    pos: (x: number, y: number, grid?: boolean) => [number, number]
    grid_width: number
    setTransformMatrix: (matrix: ITransformMatrix) => void
    transform: (matrix: ITransformMatrix) => (x: number, y: number) => [number, number]
    ctx: CanvasRenderingContext2D
    shift: IPoint
    rotation: IRotation
    affine: IAffine
    projective: IProjective,
    showPoints: boolean,
    figure_points: IFigurePoint[],
    init: boolean
    activePointIndex: number,
    isInflectionPoints: boolean
}

const INITIAL_A_PARAM = 2
// @ts-ignore
export var stage: IStage = {
    init: true,
    width: 1500,
    height: window.outerHeight - 135,
    padding: 20,
    px_per_sm: 16,
    grid_width: 1200,
    showPoints: false,
    activePointIndex: 0,
    figure_points: [
        {"wa":1,"wc":1,"f":0.49,"u":[0,1],"ax":-31,"ay":20,"bx":-29,"by":24.5,"cx":-25,"cy":20.5},{"wa":1,"wc":1,"f":0.2,"u":[0,1],"ax":-31,"ay":20,"bx":-31,"by":18,"cx":-32,"cy":18},{"wa":1,"wc":1,"f":0.3,"u":[0,1],"ax":-34.6,"ay":13,"bx":-35,"by":15,"cx":-32,"cy":18},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-34.6,"ay":13,"bx":-36,"by":11,"cx":-36.5,"cy":7.6},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-38.4,"ay":7.3,"bx":-37,"by":7,"cx":-33,"cy":9},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-38.4,"ay":7.3,"bx":-37,"by":5.7,"cx":-31.4,"cy":8},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-38.4,"ay":8.7,"bx":-38,"by":8.7,"cx":-36.3,"cy":9},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-38.4,"ay":8.7,"bx":-38,"by":8,"cx":-36.5,"cy":8.5},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-36.4,"ay":6,"bx":-39,"by":-11,"cx":-32.6,"cy":-12},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-33,"ay":6.2,"bx":-35.3,"by":-7,"cx":-33.6,"cy":-10},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-32.6,"ay":-10,"bx":-32.3,"by":-10,"cx":-31.6,"cy":-9.6},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-32.2,"ay":-11,"bx":-32.3,"by":-10,"cx":-31.6,"cy":-9.6},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-32.2,"ay":-11,"bx":-32.5,"by":-10.5,"cx":-31,"cy":-11.4},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-33,"ay":9,"bx":-31.5,"by":9,"cx":-31.4,"cy":8},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-28.7,"ay":11,"bx":-29,"by":9,"cx":-31.4,"cy":8},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-25.7,"ay":9,"bx":-29,"by":9,"cx":-30.4,"cy":8},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-27,"ay":8.5,"bx":-27.5,"by":7,"cx":-27.4,"cy":6},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-27.6,"ay":5.5,"bx":-27,"by":6,"cx":-27.4,"cy":6},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-22.8,"ay":13,"bx":-27,"by":8,"cx":-25,"cy":5.5},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-25.8,"ay":6.9,"bx":-26,"by":6,"cx":-27,"cy":5.8},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-20,"ay":6.9,"bx":-23,"by":6,"cx":-24.7,"cy":4.8},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-20,"ay":6.9,"bx":-12,"by":11,"cx":-16,"cy":20.8},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-17.8,"ay":1.8,"bx":-21.8,"by":4,"cx":-21.7,"cy":6.2},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-20.2,"ay":-3.2,"bx":-19.8,"by":2,"cx":-21.5,"cy":4.2},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-20.2,"ay":-3.2,"bx":-20.6,"by":-5,"cx":-19.1,"cy":-7.5},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-18.5,"ay":-8.6,"bx":-17.2,"by":-12.6,"cx":-20.8,"cy":-14.7},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-13,"ay":-13.6,"bx":-17.2,"by":-18.8,"cx":-20.8,"cy":-14.7},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-13,"ay":-13.6,"bx":-14.2,"by":-13.8,"cx":-14.6,"cy":-11.9},{"wa":1,"wc":1,"f":0.4,"u":[0.1,1],"ax":-18.5,"ay":-7.6,"bx":-13.2,"by":-2,"cx":-18.6,"cy":5.6},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-17.7,"ay":-6.6,"bx":-17.2,"by":-8.8,"cx":-14.6,"cy":-9.5},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-10,"ay":-14,"bx":-9.6,"by":-14.5,"cx":-9,"cy":-13.9},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-10,"ay":-14,"bx":-10.2,"by":-12.8,"cx":-12.1,"cy":-10.9},
        {"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-9,"ay":-13.9,"bx":-5.2,"by":-8.8,"cx":-9.1,"cy":-6.6},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-11,"ay":-7.5,"bx":-10.2,"by":-6.8,"cx":-9.1,"cy":-6.6},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-11,"ay":-7.5,"bx":-12.2,"by":-8,"cx":-13.6,"cy":-6.9},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-8.5,"ay":1,"bx":-13.2,"by":-4,"cx":-13.2,"cy":-6.1},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-8.5,"ay":1,"bx":-10.2,"by":3,"cx":-10.4,"cy":7.3},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-7.7,"ay":0.3,"bx":-5.2,"by":-2,"cx":-0.4,"cy":-2.1},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":2.3,"ay":6.3,"bx":2.4,"by":1,"cx":0.3,"cy":-0.5},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":1.1,"ay":-4.7,"bx":-0.1,"by":-2,"cx":0.3,"cy":-0.5},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":1.1,"ay":-4.7,"bx":0.9,"by":-10,"cx":-3.7,"cy":-11.5},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":1.7,"ay":-15,"bx":-4.1,"by":-17,"cx":-4.7,"cy":-11.5},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":1.7,"ay":-15,"bx":1.6,"by":-13,"cx":5,"cy":-9},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":6.7,"ay":-3,"bx":6.3,"by":-7,"cx":5,"cy":-9},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":6.7,"ay":-3,"bx":6.3,"by":-2,"cx":10,"cy":1.5},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":12.5,"ay":10.5,"bx":12.3,"by":4,"cx":10,"cy":1.5},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":6.7,"ay":-3,"bx":14.3,"by":-10,"cx":9,"cy":-14},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":12.7,"ay":-15,"bx":6.8,"by":-15.5,"cx":9,"cy":-14},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":14.2,"ay":-15,"bx":15.8,"by":-15,"cx":14.2,"cy":-13},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":13.7,"ay":-6,"bx":13.2,"by":-11,"cx":14.2,"cy":-13},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":13.7,"ay":-6,"bx":14.2,"by":-3,"cx":12.8,"cy":-2},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":12,"ay":5,"bx":11.2,"by":-1,"cx":12.8,"cy":-2},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":13.5,"ay":1.2,"bx":13.2,"by":-1,"cx":13.8,"cy":-1},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":13.9,"ay":2.2,"bx":15.2,"by":7,"cx":13,"cy":10.5},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":14.3,"ay":1.6,"bx":16.7,"by":8,"cx":13,"cy":12.3},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-6.5,"ay":17,"bx":10.2,"by":23,"cx":13,"cy":12.3},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-17.5,"ay":20.3,"bx":-15,"by":22,"cx":-10,"cy":17.8},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-24,"ay":20,"bx":-20,"by":23.5,"cx":-16,"cy":21.2},
        {"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-24.2,"ay":17.4,"bx":-23.5,"by":21.2,"cx":-21,"cy":17.2},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-29.7,"ay":16.4,"bx":-29.5,"by":16.5,"cx":-29,"cy":16.7},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-29.7,"ay":15.4,"bx":-29.5,"by":16,"cx":-28.7,"cy":15.7},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-29.7,"ay":15.4,"bx":-29.5,"by":15,"cx":-28.7,"cy":15.7},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-29.7,"ay":14,"bx":-29.5,"by":14,"cx":-27.9,"cy":14.7},{"wa":1,"wc":1,"f":0.4,"u":[0,1],"ax":-29,"ay":13.8,"bx":-28.5,"by":13.9,"cx":-27.9,"cy":14.3}
    ],
    shift: {
        x: 0,
        y: 0,
    },
    rotation: {
        x: 0,
        y: 0,
        angle: 0,
    },
    affine: {
        xx: 1,
        xy: 0,
        yx: 0,
        yy: 1,
        ox: 0,
        oy: 0,
    },
    projective: {
        xx: 35,
        xy: 0,
        yy: 35,
        yx: 0,
        ox: 0,
        oy: 0,
        wx: 0,
        wy: 0,
        wo: 35
    }
}

stage.ox = (x: number) => stage.padding + (stage.width / 2) + x;
stage.oy = (y: number) => (stage.height / 2) - y - stage.padding;

stage.pos = (x: number, y: number) => [stage.padding + x, stage.height - y - stage.padding]


stage.setTransformMatrix = (m: ITransformMatrix) => {
    stage.pos = (x: number, y: number, grid = false) => {

        if (!grid) {

            const rtx = stage.rotation.x * stage.px_per_sm;
            const rty = stage.rotation.y * stage.px_per_sm;

            [x, y] = stage.transform([ // rotation
                [Math.cos(stage.rotation.angle), Math.sin(stage.rotation.angle), 0],
                [-Math.sin(stage.rotation.angle), Math.cos(stage.rotation.angle), 0],
                [
                    -rtx * (Math.cos(stage.rotation.angle) - 1) + rty * Math.sin(stage.rotation.angle),
                    -rtx * Math.sin(stage.rotation.angle) - rty * (Math.cos(stage.rotation.angle) - 1),
                    1],
            ])(x, y);

            [x, y] = stage.transform([ // translate
                [1, 0, 0],
                [0, 1, 0],
                [stage.shift.x * stage.px_per_sm, stage.shift.y * stage.px_per_sm, 1],
            ])(x, y);

            // console.log({x, y, m})
        }

        // console.log(x,y,m)

        // x *= stage.px_per_sm
        // y *= stage.px_per_sm

        return [
            stage.ox((x * m[0][0] + y * m[1][0] + m[2][0]) / (x * m[0][2] + y * m[1][2] + m[2][2])),
            stage.oy((x * m[0][1] + y * m[1][1] + m[2][1]) / (x * m[0][2] + y * m[1][2] + m[2][2])),
        ]
    }
}

stage.transform = (m: ITransformMatrix) => (x: number, y: number) => [
    ((x * m[0][0] + y * m[1][0] + m[2][0]) / (x * m[0][2] + y * m[1][2] + m[2][2])),
    ((x * m[0][1] + y * m[1][1] + m[2][1]) / (x * m[0][2] + y * m[1][2] + m[2][2])),
]


console.log(stage)
