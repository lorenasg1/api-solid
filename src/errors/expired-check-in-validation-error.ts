export class ExpiredCheckInValidationError extends Error {
  constructor() {
    super('Time to checkIn expired')
  }
}
