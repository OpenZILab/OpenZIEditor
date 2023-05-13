export declare enum ParameterFlags {
}
/**
 * parameter decorator
 */
export declare namespace ParameterUtils {
    function Flags(flags: ParameterFlags[]): (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
}
