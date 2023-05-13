export declare enum PropertyType {
    None = "None",
    Array = "Array",
    Bool = "Bool",
    Color = "Color",
    Double = "Double",
    Enum = "Enum",
    Float = "Float",
    Integer = "Integer",
    Map = "Map",
    Object = "Object",
    String = "String",
    Struct = "Struct",
    Transform = "Transform",
    Vector2 = "Vector2",
    Vector3 = "Vector3",
    Vector4 = "Vector4"
}
export type ElementType = PropertyType.Float | PropertyType.Integer | PropertyType.Double | PropertyType.Bool | PropertyType.Color | PropertyType.Enum | PropertyType.String | PropertyType.Struct | PropertyType.Transform | PropertyType.Vector2 | PropertyType.Vector3 | PropertyType.Vector4 | PropertyType.Object;
export type QMapKeyElementType = Exclude<ElementType, PropertyType.Struct | PropertyType.Transform>;
