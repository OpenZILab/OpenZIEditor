import { Sigleton } from "../Sigleton";
import { NoArgsClassType } from "../TsUtils/ClassUtils";
export type EggClass = NoArgsClassType<object>;
/**
 * Activator, which can generate the corresponding class according to the class name
 * The premise is that you need to register a class in it
 */
export declare class Activator extends Sigleton {
    private Incubator;
    private CreateDelegate;
    static Get(): Activator;
    OnInit(): void;
    private addAutoRegisterClasses;
    Register(eggClass: EggClass): void;
    RegisterCreateFunction(name: string, func: Function): Map<string, Function>;
    FindCreateDelegate(name: string): Function;
    FindClass(name: string): EggClass;
    Activate(data: any, object?: any): any;
}
