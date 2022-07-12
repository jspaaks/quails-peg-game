import './app.css';
import pegData from './pegs.json';
import { Peg } from './peg';
import { useState } from 'react';
import { PegDataType } from './types';

export const App = () => {
    const [pegs, setPegs] = useState(pegData);

    const clickHandler = (idClicked: number) => {
        return () => {
            console.log(`clicked ${idClicked}`);

            const markClickedPegSelected = (peg: PegDataType) => {
                const cond = peg.id === idClicked && peg.occupied === true;
                return cond ? {...peg, selected: true} : {...peg, selected: false};
            }

            const unmarkAllPegsSelected = (peg: PegDataType) => {
                return {...peg, selected: false};
            }

            const markOtherPegsDisabled = (peg: PegDataType) => {
                const targets = pegs[idClicked].moves.map(move => move.target);                
                const cond = targets.includes(peg.id) && peg.occupied === false;
                return cond ? {...peg, disabled: false} : {...peg, disabled: true};
            }

            const unmarkAllPegsDisabled = (peg: PegDataType) => {
                return {...peg, disabled: false};
            }

            const unmarkSelectedPegOccupied = (peg: PegDataType) => {
                const cond = peg.id === idSelected;
                return cond ? {...peg, occupied: false} : {...peg};
            }

            const unmarkIntermediatePegOccupied = (peg: PegDataType) => {
                const idIntermediate = pegs[idSelected].moves
                    .filter(move => move.target === idClicked)[0].remove
                const cond = peg.id === idIntermediate;
                return cond ? {...peg, occupied: false} : {...peg};
            }

            const markClickedPegOccupied = (peg: PegDataType) => {
                const cond = peg.id === idClicked;
                return cond ? {...peg, occupied: true} : {...peg};
            }

            const noneSelected = pegs.every(peg => peg.selected === false);
            if (noneSelected === true) {
                console.log("no pegs were previously selected")
                const newPegs = pegs
                    .map(markClickedPegSelected)
                    .map(markOtherPegsDisabled);
                setPegs(newPegs);
                return
            }
            const idSelected = pegs.filter(peg => peg.selected === true)[0].id;
            console.log(`selected ${idSelected}`);
            if (idSelected === idClicked) {
                const newPegs = pegs
                .map(unmarkAllPegsSelected)
                .map(unmarkAllPegsDisabled);
                setPegs(newPegs)
                return    
            }
            if (pegs[idClicked].disabled === true) {
                return
            }
            const targets = pegs[idSelected].moves.map(move => move.target);
            if (targets.includes(idClicked)) {
                const newPegs = pegs
                    .map(unmarkAllPegsSelected)
                    .map(unmarkAllPegsDisabled)
                    .map(unmarkSelectedPegOccupied)
                    .map(unmarkIntermediatePegOccupied)
                    .map(markClickedPegOccupied)
                console.log('unmarking source selected');
                console.log('unmarking source occupied');
                console.log('unmarking intermediate occupied');
                console.log('marking target occupied');
                setPegs(newPegs);
                return
            }
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
            <svg className="flip">
                { pegs.map(toPegJSX) }
            </svg>
        </div>
    );
}
