export declare enum MethodFlags {
    Visiable = 0,
    NotSave = 1
}
/**
 * method decorator
 */
export declare namespace MethodUtils {
    function Flags(flags: MethodFlags[]): <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => void;
}
