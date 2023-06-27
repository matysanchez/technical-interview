import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';
export type JobDocument = HydratedDocument<Job>;





const edulevels_schema = new MongoSchema({
    type: [{ value: { type: String, required: true }, id: String }],

});

interface locationInterface {
    lat: number;
    lon: number;
    coordinates: [number, number];
}

const pointSchema = new MongoSchema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true,
        default: [0, 0], // longitude latitude
    }
});

export const locationSchema = new MongoSchema({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    coordinates: { type: pointSchema, required: true, index: '2dsphere' }
});


export const remoteSchema = new MongoSchema({
    remote_type: {
        type: Number,
        enum: [0, 1, 2],
        default: 2
    }
});





@Schema({ timestamps: true })
export class Job {

    // constructor(data: Partial<Job>) {
    //     Object.assign(this, data);
    //     this._id = this.getExternalId(); // Llamada a la función para obtener el _id externo
    // }

    @Prop()
    _id: string;

    @Prop({ required: true, index: 'text' })
    body: string;

    @Prop({ required: true })
    career_area_name: string;

    @Prop({ required: true })
    city_name: string;

    @Prop({ required: true, index: true })
    company_name: string;

    @Prop({ required: true })
    company_raw: string; //

    @Prop({ type: edulevels_schema, required: true })
    edulevels_name: Array<{ value: string, id?: string }>;

    @Prop({ required: true })
    employment_type_name: string;

    @Prop({ type: locationSchema, required: true })
    location: locationInterface

    @Prop({ required: true })
    max_salary: number;

    @Prop({ required: true })
    min_edulevels_name: string;

    @Prop({ required: true })
    min_salary: number;

    @Prop()
    min_years_experience: number;

    @Prop({ required: true })
    onet: string;

    @Prop({ required: true })
    onet_name: string;

    @Prop({ type: Date, required: true })
    posted: Date;

    @Prop({ type: remoteSchema })
    remote_type: number;

    @Prop()
    remote_type_name: string; // 

    @Prop({ type: [String], required: true })
    riasec: string[];

    @Prop({ required: true })
    salary: number;

    @Prop({ type: [{ value: String }], required: true })
    skills_name: { value: string }[];

    @Prop({ required: true, index: true })
    title_name: string;

    @Prop({ required: true, index: true })
    title_raw: string;

    @Prop({ required: true, type: Boolean, default: false })
    is_earn_and_learn: boolean;

    @Prop({ required: true, type: Boolean, default: false })
    is_gateway_job: boolean;

    @Prop({ type: [{ value: String }], required: true })
    url: { value: string }[];

    @Prop()
    score: number;

    @Prop({ default: null, index: true })
    expiredAt: Date | null;

}

export const JobSchema = SchemaFactory.createForClass(Job);

// add index to createdAt
JobSchema.index({ createdAt: 1 });



//this middleware should get id from external site
// JobSchema.pre('save', function (next) {
//     if (!this._id) {
//         this._id = await axios.get('get id from external site')
//       }
//       next();
// });
