import {HTMLProps} from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            slot: HTMLProps<HTMLSlotElement>;
        }
    }
}