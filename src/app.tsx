import './app.css';
import pegData from './pegs.json';
import { Peg } from './peg';
import { useState } from 'react';
import { PegDataType } from './types';

export const App = () => {
    const [pegs, setPegs] = useState(pegData);

    const clickHandler = (id: number) => {
        return () => {
            console.log(`clicked ${id}`);

            const selected = (peg: PegDataType) => {
                if (peg.id === id && peg.occupied === true ) {
                    return {...peg, selected: true};
                }
                return {...peg, selected: false};
            }

            const disabled = (peg: PegDataType) => {
                const validTargets = pegs
                    .filter(peg => peg.id === id)
                    .flatMap(peg => peg.moves)
                    .map(move => move.target);
                if (validTargets.includes(peg.id) || peg.id === id) {
                    return {...peg, disabled: false};
                }
                return {...peg, disabled: true};
            }

            const noneSelected = pegs.every(peg => peg.selected === false);
            if (noneSelected === true) {
                console.log("none selected")
                const newPegs = pegs.map(selected).map(disabled);
                setPegs(newPegs);
                return
            }
            return    
        }
    };
    
    const toPegJSX = (peg: PegDataType) => {
        return (
            <Peg
                key={peg.id}
                id={peg.id}
                cx={peg.cx}
                cy={peg.cy}
                moves={peg.moves}
                occupied={peg.occupied}
                selected={peg.selected}
                disabled={peg.disabled}
                clickHandler={clickHandler(peg.id)}
            />
        )
    }
    
    return (
        <div className="app">
            <svg className="">
                { pegs.map(toPegJSX) }
            </svg>
        </div>
    );
}
