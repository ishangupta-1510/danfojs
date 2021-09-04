/**
*  @license
* Copyright 2021, JsData. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ==========================================================================
*/
import DataFrame from '@base/core/frame';
import { Tensor } from '@tensorflow/tfjs-node';
import Series from '../core/series';
import { BaseUserConfig } from "table"
import Str from '@base/core/strings';
import { Dt } from '..';

export enum DTYPES {
    float32,
    int32,
    string,
    boolean,
    undefined
}

export type ArrayType2D = Array<
    number[]
    | string[]
    | boolean[]
    | (number | string | boolean)[]>

export type ArrayType1D = Array<
    number
    | string
    | boolean
    | (number | string | boolean)>

//Start of Config class types

export type ConfigsType = {
    tableDisplayConfig?: BaseUserConfig
    tableMaxRow: number;
    tableMaxColInConsole: number;
    dtypeTestLim?: number;
    lowMemoryMode?: boolean
    tfInstance?: any
}
//End of Config class types

//Start of Generic class types
export interface BaseDataOptionType {
    type?: number;
    index?: Array<string | number>
    columnNames?: string[]
    dtypes?: Array<string>
    config?: ConfigsType;
}
export interface NdframeInputDataType {
    data: any
    type?: number;
    index?: Array<string | number>
    columnNames?: string[]
    dtypes?: Array<string>
    config?: ConfigsType;
    isSeries: boolean;
}
export interface LoadArrayDataType {
    data: ArrayType1D | ArrayType2D
    index?: Array<string | number>
    columnNames?: string[]
    dtypes?: Array<string>
}

export interface LoadObjectDataType {
    data: object | Array<object>
    type?: number;
    index?: Array<string | number>
    columnNames?: string[]
    dtypes?: Array<string>
}

export type AxisType = {
    index: Array<string | number>
    columns: Array<string | number>
}

export interface NDframeInterface {
    config: ConfigsType;
    $setDtypes(dtypes: Array<string>, infer: boolean): void;
    $setIndex(index: Array<string | number>): void;
    $resetIndex(): void;
    $setColumnNames(columnNames: string[]): void

    get dtypes(): Array<string>;
    get ndim(): number;
    get axis(): AxisType;
    get index(): Array<string | number>;
    get columnNames(): string[]
    get shape(): Array<number>;
    get values(): ArrayType1D | ArrayType2D
    get tensor(): Tensor;
    get size(): number;
    toCsv(): Promise<String>;
    toJson(): Promise<String>;
    print(): void;
}
//End of Generic class types

//Start of Series class types
export interface SeriesInterface extends NDframeInterface {
    iloc(rows: Array<string | number>): Series;
    head(rows: number): Series
    tail(rows: number): Series
    sample(num: number, options?: { seed?: number }): Promise<Series>;
    add(other: Series | number | Array<number>, options?: { inplace?: boolean }): Series | void;
    sub(other: Series | number | Array<number>, options?: { inplace?: boolean }): Series | void;
    mul(other: Series | number | Array<number>, options?: { inplace?: boolean }): Series | void;
    div(other: Series | number | Array<number>, options?: { inplace?: boolean }): Series | void;
    pow(other: Series | number | Array<number>, options?: { inplace?: boolean }): Series | void;
    mod(other: Series | number | Array<number>, options?: { inplace?: boolean }): Series | void;
    mean(): number
    median(): number
    mode(): number
    min(): number
    max(): number
    sum(): number
    count(): number
    maximum(other: Series | number | Array<number>): Series
    minimum(other: Series | number | Array<number>): Series
    round(dp: number, options?: { inplace?: boolean }): Series | void
    std(): number
    var(): number
    isNa(): Series
    fillNa(value: number | string | boolean, options?: { inplace?: boolean }): Series | void
    sortValues(ascending: boolean, options?: { inplace?: boolean }): Series | void
    copy(): Series
    describe(): Series
    resetIndex(options?: { inplace?: boolean }): Series | void
    setIndex(index: Array<number | string | (number | string)>, options?: { inplace?: boolean }): Series | void
    map(
        callable: any,
        options?: { inplace?: boolean })
        : Series | void
    apply(
        callable: any,
        options?: { inplace?: boolean }): Series | void
    unique(): Series
    nUnique(): number
    valueCounts(): Series
    abs(options?: { inplace?: boolean }): Series | void
    cumSum(options?: { inplace?: boolean }): Series | void
    cumMin(options?: { inplace?: boolean }): Series | void
    cumMax(options?: { inplace?: boolean }): Series | void
    cumProd(options?: { inplace?: boolean }): Series | void
    lt(other: Series | number | Array<number>): Series
    gt(other: Series | number | Array<number>): Series
    le(other: Series | number | Array<number>): Series
    ge(other: Series | number | Array<number>): Series
    ne(other: Series | number | Array<number>): Series
    eq(other: Series | number | Array<number>): Series
    replace(oldValue: string | number | boolean, newValue: string | number | boolean, options?: { inplace?: boolean }): Series | void
    dropNa(options?: { inplace?: boolean }): Series | void
    argSort(): Series
    argMax(): number
    argMin(): number
    get dtype(): string
    dropDuplicates(keep: "first" | "last", options?: { inplace?: boolean }): Series | void
    asType(dtype: "float32" | "int32" | "string" | "boolean", options?: { inplace?: boolean }): Series | void
    get str(): Str
    get dt(): Dt
    append(values: Series | Array<number | string | boolean> | number | string | boolean,
        index: Array<number | string> | number | string,
        options?: { inplace?: boolean }): Series | void
    toString(): string;

}

//Start of Series class types
export interface DataFrameInterface extends NDframeInterface {
    drop(options:
        {
            columns: Array<string>,
            index?: Array<string | number>,
            inplace?: boolean,
            axis?: 0 | 1,
        }
    ): DataFrame
    loc(options:
        {
            rows?: Array<string | number>,
            columns?: Array<string>
        }): DataFrame;
    iloc(options:
        {
            rows?: Array<string | number>,
            columns?: Array<string | number>
        }): DataFrame;
    head(rows?: number): DataFrame
    tail(rows?: number): DataFrame
    sample(num: number, options?: { seed: number }): Promise<DataFrame>;
    add(other: DataFrame | Series | number, options?: { axis?: 0 | 1, inplace?: boolean }): DataFrame | void
    sub(other: DataFrame | Series | number, options?: { axis?: 0 | 1, inplace?: boolean }): DataFrame | void
    mul(other: DataFrame | Series | number, options?: { axis?: 0 | 1, inplace?: boolean }): DataFrame | void
    div(other: DataFrame | Series | number, options?: { axis?: 0 | 1, inplace?: boolean }): DataFrame | void
    pow(other: DataFrame | Series | number, options?: { axis?: 0 | 1, inplace?: boolean }): DataFrame | void
    mod(other: DataFrame | Series | number, options?: { axis?: 0 | 1, inplace?: boolean }): DataFrame | void
    mean(options?: { axis?: 0 | 1 }): Series
    median(options?: { axis?: 0 | 1 }): Series
    mode(options?: { axis?: 0 | 1, keep?: number }): Series
    min(options?: { axis?: 0 | 1 }): Series
    max(options?: { axis?: 0 | 1 }): Series
    std(options?: { axis?: 0 | 1 }): Series
    var(options?: { axis?: 0 | 1 }): Series
    sum(options?: { axis?: 0 | 1 }): Series
    count(options?: { axis?: 0 | 1 }): Series
    round(dp: number): DataFrame
    cumSum(options?: { axis?: 0 | 1 }): DataFrame
    cumMin(options?: { axis?: 0 | 1 }): DataFrame
    cumMax(options?: { axis?: 0 | 1 }): DataFrame
    cumProd(options?: { axis?: 0 | 1 }): DataFrame
    copy(): DataFrame
    resetIndex(options: { inplace?: boolean }): DataFrame
    setIndex(
        index: Array<number | string | (number | string)>,
        options?: { inplace?: boolean }
    ): DataFrame
    describe(): DataFrame
    selectDtypes(include: DTYPES): DataFrame
    abs(): DataFrame
    query(options: { column: string, is: string, to: string, inplace?: boolean }): DataFrame
    addColumn(options:
        {
            column: string,
            value: Series | ArrayType1D,
            inplace?: boolean
        }
    ): DataFrame
    groupby(column: [string, string]): any //Update to GroupBy class later
    column(columnName: string): Series
    fillNa(options:
        {
            columns: Array<string>,
            values: ArrayType2D,
            inplace?: boolean
        }
    ): DataFrame
    isNa(): DataFrame
    nanIndex(): Array<number>
    dropNa(axis?: 0 | 1, options?: { inplace?: boolean }): DataFrame | void
    apply(options:
        {
            axis?: 0 | 1,
            callable: (val: number | string | boolean) => number | string | boolean
        }
    ): DataFrame
    lt(other: DataFrame | Series | number, axis?: 0 | 1, options?: { inplace?: boolean }): DataFrame | void
    gt(other: DataFrame | Series | number, axis?: 0 | 1, options?: { inplace?: boolean }): DataFrame | void
    le(other: DataFrame | Series | number, axis?: 0 | 1, options?: { inplace?: boolean }): DataFrame | void
    ge(other: DataFrame | Series | number, axis?: 0 | 1, options?: { inplace?: boolean }): DataFrame | void
    ne(other: DataFrame | Series | number, axis?: 0 | 1, options?: { inplace?: boolean }): DataFrame | void
    eq(other: DataFrame | Series | number, axis?: 0 | 1, options?: { inplace?: boolean }): DataFrame | void
    replace(options:
        {
            replace: number | string | boolean,
            with: number | string | boolean,
            columns?: Array<string>
            inplace?: boolean
        }
    ): DataFrame
    transpose(): DataFrame
    get T(): DataFrame
    get ctypes(): Series
    asType(options:
        {
            column: string
            dtype: string,
            inplace?: boolean
        }
    ): DataFrame
    unique(axis: number): Series
    nUnique(): Series
    rename(options:
        {
            mapper: number | string | boolean,
            inplace?: boolean
            axis?: number
        }
    ): DataFrame
    sortIndex(options:
        {
            inplace?: boolean
            ascending?: boolean
        }
    ): DataFrame
    sortValues(options:
        {
            by: string,
            inplace?: boolean
            ascending?: boolean
        }
    ): DataFrame
    append(options:
        {
            value: ArrayType1D
            inplace?: boolean,
        }
    ): DataFrame
    toString(): string;

}

export interface DateTime {
    month(): Series
    day(): Series
    year(): Series
    monthName(): Series
    dayOfMonth(): Series
    hours(): Series
    seconds(): Series
    minutes(): Series
}