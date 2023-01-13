import {Schema, model} from "mongoose";

export interface TestDoc {
    name: string,
    email: string
}

const testSchema = new Schema<TestDoc>({
    name: {
      type: String,
      required: true
    },
    email: {
       type: String,
       required: true
   }
})

export const testDocument = model<TestDoc>('Test', testSchema);