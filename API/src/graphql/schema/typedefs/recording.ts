export const Recording = `
type Recording {
    id: String,
    transcription: String,
    summary: String,
    soap: String,
    userId: User,
    patient:Patient
    createdAt: DateTime,
    UpdatedAt: DateTime,
}`;
