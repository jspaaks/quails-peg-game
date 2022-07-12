import './peg.css';
import { PegDataType, PegMethodsType } from './types';

export const Peg = (props: PegDataType & PegMethodsType) => {
    const pegCircleJSX = (
        <circle
            cx={props.cx}
            cy={props.cy}
            r="10"
            className={`peg ${props.selected ? "selected" : ""} ${props.disabled ? "disabled" : ""}`}
        >
        </circle>
    );
    return (
        <g id={`peg${props.id}`} onClick={props.clickHandler} className="peg-group">
            <circle
                cx={props.cx}
                cy={props.cy}
                r="15"
                className="border"
            >
            </circle>
            <circle
                cx={props.cx}
                cy={props.cy}
                r="12"
                className="hole"
            >
            </circle>
            {props.occupied ? pegCircleJSX : ''}
            {/* <text x={props.cx} y={props.cy} transform="translate(0,5)" textAnchor='middle'>{props.id}</text> */}
        </g>
    );
}
