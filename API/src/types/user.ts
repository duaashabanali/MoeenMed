export interface SignUpUserTypeInput {
    email: string;
    password: string;
}

export  interface RecordingInput {
    transcription: string;
    patient:string
    summary: string
    soap: string
}


export  interface PatientInput {
    id:string
    fullName:string
    date:string
    gender:string
    phoneNumber:string
    address:string
    streetAddress:string
    city:string
    state:string
    zipcode:string
    userId:string
}