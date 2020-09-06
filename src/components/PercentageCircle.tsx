// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component } from 'react';

type MyProps = {
    circleSize: number;
    percent: number;
    duration: number;
    offset: number;
    fontColor: string;
    circleColor: string;
    circleInnerColor: string;
}

const defaultProps: MyProps = {
    circleSize: 40,
    percent: 100,
    duration: 1000,
    offset: 100,
    fontColor: 'rgba(75,56,50,.75)',
    circleColor: '#4b3832',
    circleInnerColor: '#fff4e6',
};

type MyState = {
    percent: number;
    percentText: number;
}

class PercnetageCircle extends Component<MyProps, MyState> {
    _circleSize: number = defaultProps.circleSize;
    _percent: number = defaultProps.percent;
    _duration: number = defaultProps.duration;
    _offset: number = defaultProps.offset;
    _fontColor: string = defaultProps.fontColor;
    _circleColor: string = defaultProps.circleColor;
    _circleInnerColor: string = defaultProps.circleInnerColor;
    constructor(props: MyProps) {
        super(props);
        const percent = Math.floor(Math.max(Math.min(this.props.percent, 100), 0));
        const percentText = percent;
        if (this.props.circleColor != "")
            this._circleColor = this.props.circleColor;
        if (this.props.circleInnerColor != "")
            this._circleInnerColor = this.props.circleInnerColor;
        if (this.props.circleSize != 0) {
            this._circleSize = this.props.circleSize;
        }
        if (this.props.duration != 0)
            this._duration = this.props.duration;
        if (this.props.fontColor != "")
            this._fontColor = this.props.fontColor;
        if (this.props.offset != 0)
            this._offset = this.props.offset;
        this.state = {
            percentText,
            percent,
        };
    }

    componentDidMount(): void {
        const divide = this.props.duration / this.state.percent;
        const unit = Math.ceil(this.props.offset / divide);
        const time = this.state.percent > 0 ? divide * unit : 0;
        if (time) {
            const addPer = () => {
                const { percent, percentText } = this.state;
                window.setTimeout(() => {
                    const newPercentText = percentText + unit > percent ? percent : percentText + unit;
                    return this.setState({ percentText: newPercentText }, () => {
                        if (newPercentText < percent) {
                            return addPer();
                        }
                        return clearTimeout;
                    });
                }, time);
            };
            addPer();
        }
    }

    componentWillUnmount(): void {
        clearTimeout();
    }

    timeout = null;

    render(): JSX.Element {
        const {
            state: { percent, percentText },
        } = this;
        const viewbox = `0 0 ${this._circleSize} ${this._circleSize}`;
        const strokeWidth = this._circleSize / 14;
        const diameter = this._circleSize - strokeWidth;
        const radius = diameter / 2;
        const circumference = 2 * Math.PI * radius;
        const fakePercent = percent === 98 || percent === 99 ? 97 : percent;
        const pCircumference = (circumference * fakePercent) / 100;
        const x = this._circleSize / 2;
        const y = (this._circleSize - diameter) / 2;
        const fontSize = this._circleSize / 3;
        const textX = this._circleSize / 2 - fontSize / 1.3;
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(
            `@-webkit-keyframes progress${this._circleSize}{0%{stroke-dasharray: 0 ${circumference};}}`,
            styleSheet.cssRules.length,
        );
        const d = `
        M ${x} ${y}
        a ${radius} ${radius} 0 0 1 0 ${diameter}
        a ${radius} ${radius} 0 0 1 0 ${diameter * -1}
      `;
        return (
            <div
                id="progress"
                style={{
                    position: 'relative',
                    width: this._circleSize,
                    height: this._circleSize,
                }}
            >
                <svg viewBox={viewbox} stroke={this._circleColor}>
                    <path
                        style={{
                            fill: 'none',
                            stroke: this._circleInnerColor,
                            strokeWidth,
                        }}
                        d={d}
                    />
                    {percent && (
                        <path
                            style={{
                                fill: 'none',
                                strokeWidth,
                                strokeLinecap: 'square',
                                animation: `progress${this._circleSize} ${this._duration}ms ease-out forwards`,
                            }}
                            d={d}
                            strokeDasharray={[pCircumference.toString(), circumference.toString()].join()}
                        />
                    )}
                </svg>
                <div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        textAlign: 'center',
                        color: this._fontColor,
                        fontWeight: "bold",
                        top: textX,
                        fontSize,
                    }}
                >
                    {percentText}
                    <span style={{ fontSize: fontSize / 2 }}>%</span>
                </div>
            </div>
        );
    }
}

export default PercnetageCircle;

