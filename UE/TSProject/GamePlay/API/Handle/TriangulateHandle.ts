///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/21 17:52
///

import * as UE from "ue";

export function TriangulationOfPolygon(Vertices): any{
    let centerValue = UE.KismetMathLibrary.GetVectorArrayAverage(Vertices)
    let center = new UE.Vector(centerValue.X,centerValue.Y,centerValue.Z)
    let curnormal = new UE.Vector(0,0,0)
    let vert : any[] = []
    for (let i = 0; i < Vertices.Num(); i++){
        let curindex = LoopArrayIndex(i , 1 , Vertices.Num())
        let temp0 = new UE.Vector(Vertices.Get(i).X,Vertices.Get(i).Y,Vertices.Get(i).Z)
        let temp1 = UE.KismetMathLibrary.Subtract_VectorVector(temp0 , center)
        let temp2 = UE.KismetMathLibrary.Subtract_VectorVector(Vertices.Get(curindex) , center)
        let temp3 = UE.KismetMathLibrary.Cross_VectorVector(temp1,temp2)
        let temp4 = UE.KismetMathLibrary.Add_VectorVector(temp3,curnormal)
        curnormal = temp4
    }
    let normal = UE.KismetMathLibrary.Normal(curnormal,0.0001)
    curnormal = normal
    let rot = UE.KismetMathLibrary.MakeRotFromZ(normal)
    for (let i = 0; i < Vertices.Num(); i++){
        let temp = UE.KismetMathLibrary.Subtract_VectorVector(Vertices.Get(i) , center)
        temp =  UE.KismetMathLibrary.LessLess_VectorRotator(temp,rot)
        let tempV = new UE.Vector2D(temp.X,temp.Y)
        let vertStr: [number,UE.Vector2D] = [i,tempV]
        vert.push(vertStr)
    }
    let CurVertReturn = FlipPoligon(vert)
    let Triangles = RecursiveTriangulate(CurVertReturn,CurVertReturn,undefined,0)
    let R : [any,any] = [Triangles,curnormal]
    return R
}

export function LoopArrayIndex(Index,Shift,ArrayLength): number{
    let num = Index + Shift
    let Return = num % ArrayLength
    return Return
}

export function FlipPoligon(Vert): any{
    let CurValue = 0.0
    let Returnvalue : any[] = []
    for (let i = 0; i < Vert.length; i++){
        let index1 = LoopArrayIndex(i,1,Vert.length);
        let temp1 = new UE.Vector2D(0,0)
        let tempValue1 = new UE.Vector2D(Vert[index1][1].X,Vert[index1][1].Y)
        let tempValue2 = new UE.Vector2D(Vert[i][1].X,Vert[i][1].Y)
        let tempValue3 = UE.KismetMathLibrary.Subtract_Vector2DVector2D(tempValue1, tempValue2)
        temp1 = UE.KismetMathLibrary.Normal2D(tempValue3)
        let index2 = LoopArrayIndex(i,2,Vert.length)
        let temp2 = new UE.Vector2D(0,0)
        let tempValue4 = new UE.Vector2D(Vert[index2][1].X,Vert[index2][1].Y)
        tempValue3 = UE.KismetMathLibrary.Subtract_Vector2DVector2D(tempValue4,tempValue1)
        temp2 = UE.KismetMathLibrary.Normal2D(tempValue3)
        let num1 = UE.KismetMathLibrary.CrossProduct2D(temp1,temp2)
        let num2 = UE.KismetMathLibrary.DotProduct2D(temp1,temp2)
        let tempnum1 = UE.KismetMathLibrary.DegAcos(num2)
        let tempnum2 = 360 - tempnum1
        let temp
        if (num1 >= 0){
            temp = tempnum2
        }
        else{
            temp = tempnum1
        }
        CurValue = CurValue + temp
        let tempv = new UE.Vector2D(1,-1)
        let V2D = UE.KismetMathLibrary.Multiply_Vector2DVector2D(tempValue2,tempv)
        let vertStr: [number,UE.Vector2D] = [Vert[i][0],V2D]
        Returnvalue.push(vertStr)
    }
    CurValue = CurValue / 1
    if (CurValue > 0){
        CurValue = Math.floor(CurValue)
    }
    else if (CurValue < 0){
        CurValue = Math.ceil(CurValue)
    }
    if (CurValue % 180 <= 1  || CurValue % 180 >= 179){
        return Vert
    }
    else{
        return Returnvalue
    }
}

export function RecursiveTriangulate(Vert,FullSetVert,BuiltSeg,Thread): any{
    let Seq : any[] = []
    let TempIs
    let Tri = UE.NewArray(UE.BuiltinInt);
    if (Thread < 32  &&  Vert.length > 0){
        if (BuiltSeg !== undefined){
            Seq = BuiltSeg
        }
        let CurV = Vert
        for (let i = 0; i < CurV.length ; i++){
            let P1 = LoopArrayIndex(i,0,CurV.length);
            let P2 = LoopArrayIndex(i,1,CurV.length);
            let P3 = LoopArrayIndex(i,2,CurV.length);
            let temp1 = new UE.Vector2D(CurV[P1][1].X,CurV[P1][1].Y)
            let temp2 = new UE.Vector2D(CurV[P2][1].X,CurV[P2][1].Y)
            let temp3 = new UE.Vector2D(CurV[P3][1].X,CurV[P3][1].Y)
            let num1 = UE.KismetMathLibrary.CrossProduct2D(UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp2,temp1),UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp3,temp2))
            let NumArray = UE.NewArray(UE.BuiltinInt);
            NumArray.Add(CurV[P1][0])
            NumArray.Add(CurV[P2][0])
            NumArray.Add(CurV[P3][0])
            if (num1 >= 0){
                TempIs = true
                for (let i = 0;i < FullSetVert.length;i++){
                    if(NumArray.FindIndex(FullSetVert[i][0]) === -1){
                       let p4 = LoopArrayIndex(i,1,FullSetVert.length)
                       let IsBool = LineSegIntersectionTest(temp1,temp3,FullSetVert[i][1],FullSetVert[p4][1],true)
                       if (IsBool){
                           TempIs =false
                           break
                       }
                       else {
                           let IsBool2 = PointInTriangle(FullSetVert[i][1],temp1,temp2,temp3,true)
                           if (IsBool2){
                               TempIs =false
                               break
                           }
                       }
                   }
                }
                if(TempIs === true){
                    if (Seq.length > 0){
                        for (let i = 0;i < Seq.length;i++){
                            let IsBool = LineSegIntersectionTest(temp1,temp3,Seq[i][0],Seq[i][1],true)
                            if (IsBool === true){
                                TempIs = false
                                break
                            }
                        }
                    }
                    if (TempIs === true){
                        let SeqStr : [UE.Vector2D,UE.Vector2D] =  [temp1,temp3]
                        Seq.push(SeqStr)
                        Tri = NumArray
                        CurV.splice(P2,1)
                        let Triangles
                        Triangles = RecursiveTriangulate(CurV,FullSetVert,Seq,Thread + 1)
                        let IsBool
                        if (Tri.Get(0) === 0 && Tri.Get(1) === 0 && Tri.Get(2) === 0){
                            IsBool = false
                        }
                        else {
                            IsBool = true
                        }
                        if (Tri.Num() === 3 && IsBool){
                            if (Triangles !== undefined){
                                if (Triangles.Num() > 0){
                                    for (let j = 0; j < Triangles.Num(); j++){
                                        Tri.Add(Triangles.Get(j))
                                    }
                                }
                            }
                        }
                        else{
                            Tri = Triangles
                        }
                        return Tri
                    }
                }
            }
        }
    }
    else {
        return Tri
    }
}

export function LineSegIntersectionTest(Poi1,Poi2,Poi3,Poi4,IgnoreSide): boolean{
    let tamp1 = new UE.Vector2D(Poi1.X,Poi1.Y)
    let tamp2 = new UE.Vector2D(Poi2.X,Poi2.Y)
    let tamp3 = new UE.Vector2D(Poi3.X,Poi3.Y)
    let tamp4 = new UE.Vector2D(Poi4.X,Poi4.Y)
    let num1 = UE.KismetMathLibrary.CrossProduct2D(UE.KismetMathLibrary.Subtract_Vector2DVector2D(tamp3,tamp1),UE.KismetMathLibrary.Subtract_Vector2DVector2D(tamp2,tamp1))
    let num2 = UE.KismetMathLibrary.CrossProduct2D(UE.KismetMathLibrary.Subtract_Vector2DVector2D(tamp4,tamp1),UE.KismetMathLibrary.Subtract_Vector2DVector2D(tamp2,tamp1))
    let num3 = UE.KismetMathLibrary.CrossProduct2D(UE.KismetMathLibrary.Subtract_Vector2DVector2D(tamp1,tamp3),UE.KismetMathLibrary.Subtract_Vector2DVector2D(tamp4,tamp3))
    let num4 = UE.KismetMathLibrary.CrossProduct2D(UE.KismetMathLibrary.Subtract_Vector2DVector2D(tamp2,tamp3),UE.KismetMathLibrary.Subtract_Vector2DVector2D(tamp4,tamp3))
    if (IgnoreSide){
        if (num2 * num1 > -0.000001){
            return false
        }
        else{
            if (num3 * num4 > -0.000001){
                return false
            }
            else{
                return true
            }
        }
    }
    else{
        if (num2 * num1 > 0){
            return false
        }
        else{
            if (num3 * num4 > 0){
                return false
            }
            else{
                return true
            }
        }
    }
}

export function PointInTriangle(Poi1,Poi2,Poi3,Poi4,IgnoreSide): boolean{
    let temp1 = new UE.Vector2D(Poi1.X,Poi1.Y)
    let temp2 = new UE.Vector2D(Poi2.X,Poi2.Y)
    let temp3 = new UE.Vector2D(Poi3.X,Poi3.Y)
    let temp4 = new UE.Vector2D(Poi4.X,Poi4.Y)
    let num1 = UE.KismetMathLibrary.CrossProduct2D(UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp1,temp2),UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp3,temp2))
    let num2 = UE.KismetMathLibrary.CrossProduct2D(UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp1,temp2),UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp4,temp2))
    let num3 = UE.KismetMathLibrary.CrossProduct2D(UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp1,temp3),UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp2,temp3))
    let num4 = UE.KismetMathLibrary.CrossProduct2D(UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp1,temp3),UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp4,temp3))
    let num5 = UE.KismetMathLibrary.CrossProduct2D(UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp1,temp4),UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp2,temp4))
    let num6 = UE.KismetMathLibrary.CrossProduct2D(UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp1,temp4),UE.KismetMathLibrary.Subtract_Vector2DVector2D(temp3,temp4))
    if (true){
        if (num1 * num2 < -0.000001){
            if (num3 * num4 < -0.000001){
                if (num5 * num6 < -0.000001){
                    return true
                }
                else {
                    return false
                }
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    }
    else {
        if (num1 * num2 <= 0){
            if (num3 * num4 <= 0){
                if (num5 * num6 <= 0){
                    return true
                }
                else {
                    return false
                }
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    }
}

export function VertexConversionUVs(Vertices,Normal,UVszie,UVRot,UVOffset): any{
    let out = UE.NewArray(UE.Vector2D);
    if(Vertices.Num() >= 3){
        let temp = UE.KismetMathLibrary.Subtract_VectorVector(Vertices.Get(1) , Vertices.Get(0))
        temp = UE.KismetMathLibrary.Normal(temp,0.0001)
        let temp2 = UE.KismetMathLibrary.Cross_VectorVector(Normal, temp)
        temp2 = UE.KismetMathLibrary.Multiply_VectorInt(temp2 , 1)
        let temp3 = UE.KismetMathLibrary.MakeRotationFromAxes(temp,temp2,Normal)
        for (let i = 0; i < Vertices.Num(); i++){
            let tempV = new UE.Vector(0,0,0)
            let tempS = new UE.Vector(1,1,1)
            let temptransform = new UE.Transform(temp3,tempV,tempS)
            let temp4 = temptransform
            let temp6 = UE.KismetMathLibrary.Subtract_VectorVector(Vertices.Get(i) , Vertices.Get(0))
            let temp5 = UE.KismetMathLibrary.InverseTransformLocation(temp4,temp6)
            let temp7 = UE.KismetMathLibrary.Conv_VectorToVector2D(temp5)
            let temp8 = UE.KismetMathLibrary.Divide_Vector2DFloat(temp7, UVszie)
            temp8 = UE.KismetMathLibrary.Add_Vector2DVector2D(temp8,UVOffset)
            let temp9 = UE.KismetMathLibrary.GetRotated2D(temp8,UVRot)
            let temp10 = new UE.Vector2D(temp9.X,temp9.Y)
            out.Add(temp10)
        }
    }
    return out
}

export function PolygonTriangulationAreaSum(Points,Tri,UnitScale): number{
    let Scale
    if (UnitScale === 0){
        Scale = 1
    }
    else{
        Scale = UnitScale
    }
    let CurSize = 0
    if (Tri !== undefined){
        for (let i = 0; i < Tri.Num(); i++){
            if (i % 3 === 0){
                let temp1 = Points.Get(Tri.Get(i))
                let temp2 = Points.Get(Tri.Get(i + 1))
                let temp3 = Points.Get(Tri.Get(i + 2))
                let num1 = UE.KismetMathLibrary.Subtract_VectorVector(temp2 , temp1)
                let num1_1 = UE.KismetMathLibrary.Divide_VectorInt(num1, Scale)
                let num2 = UE.KismetMathLibrary.Subtract_VectorVector(temp3 , temp1)
                let num2_2 = UE.KismetMathLibrary.Divide_VectorInt(num2, Scale)
                let num = UE.KismetMathLibrary.Cross_VectorVector(num1_1, num2_2)
                let leng = UE.KismetMathLibrary.VSize(num)
                CurSize = CurSize + Math.abs(leng) * 0.5
            }
        }
    }
    return CurSize
}