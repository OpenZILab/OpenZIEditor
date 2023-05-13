import { PropertyMetadata } from "./PropertyMetadata";
export type verifyResult = {
    message?: string;
    valid: boolean;
    value?: any;
};
export declare const makeValidResult: (v: any) => verifyResult;
export declare const makeNotValidResult: (v: any, mes: any) => verifyResult;
export declare const checkValueValid: (target: any, metadata: PropertyMetadata, value: any) => verifyResult;
