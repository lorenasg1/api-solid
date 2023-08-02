import { UserAlreadyExistsError } from "@/errors/user-already-exists-error"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
})

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const {name, email, password} = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterUseCase()
  
  try {
    await registerUseCase.execute({name, email, password})
  } catch (error) {
    if(error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({message: error.message})
    }
    
    throw error
  }

  return reply.status(201).send()
}