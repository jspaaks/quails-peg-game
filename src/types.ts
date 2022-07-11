export type PegDataType = {
    id: number;
    cx: number;
    cy: number;
    disabled: boolean;
    moves: {
        remove: number;
        target: number;
    }[];
    occupied: boolean;
    selected: boolean;
}

export type PegMethodsType = {
    clickHandler: () => void;
} 
